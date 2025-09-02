import mongoose from 'mongoose';
import QRCode from 'qrcode';

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://abhijeet18012001:SCeJSjgqac7DmdS5@hotel.d1juzfe.mongodb.net/?retryWrites=true&w=majority&appName=Hotel';

let isConnected = false;

export async function connectToMongoDB() {
  if (isConnected) return;
  
  try {
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

// Customer schema for QR codes
const customerSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  hotelId: { type: String, required: true },
  name: { type: String, required: true },
  email: String,
  phone: { type: String, required: true },
  roomNumber: { type: String, required: true },
  roomTypeId: { type: String, required: true },
  roomTypeName: { type: String, required: true },
  roomPrice: { type: Number, required: true },
  checkinTime: { type: Date, default: Date.now },
  checkoutTime: Date,
  expectedStayDays: Number,
  isActive: { type: Boolean, default: true },
  qrCode: String, // This stores the base64 QR code
}, { timestamps: true });

export const Customer = mongoose.model('Customer', customerSchema);

// Service Request schema for MongoDB
const serviceRequestSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true }, // Add explicit id field
  guestName: { type: String, required: true },
  roomNumber: { type: String, required: true },
  service: { type: String, required: true },
  notes: String,
  status: { type: String, default: 'pending', enum: ['pending', 'in-progress', 'completed', 'cancelled'] },
  hotelId: { type: String, required: true },
  customerId: String, // Reference to the customer who made the request
  requestedAt: { type: Date, default: Date.now },
  completedAt: Date,
  assignedTo: String, // Staff member assigned to handle the request
}, { timestamps: true });

export const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

// Room schema for room-specific QR codes
const roomSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  hotelId: { type: String, required: true },
  roomNumber: { type: String, required: true },
  roomTypeId: { type: String, required: true },
  roomTypeName: { type: String, required: true },
  qrCode: String, // This stores the base64 QR code - ROOM SPECIFIC
  qrCodeUrl: String, // The URL that the QR code points to
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Create compound index for hotelId + roomNumber
roomSchema.index({ hotelId: 1, roomNumber: 1 }, { unique: true });

export const Room = mongoose.model('Room', roomSchema);

// Function to get QR by room number (room-specific, not guest-specific)
export async function getQRByRoomNumber(roomNumber: string, hotelId: string = '68a0500df0d37587696090c6') {
  try {
    await connectToMongoDB();
    const room = await Room.findOne({ 
      roomNumber: roomNumber,
      hotelId: hotelId,
      isActive: true 
    });
    return room?.qrCode || null;
  } catch (error) {
    console.error('Error fetching QR by room:', error);
    return null;
  }
}

// Function to get QR by room and guest name (kept for backward compatibility)
export async function getQRByRoomAndGuest(roomNumber: string, guestName: string) {
  try {
    await connectToMongoDB();
    // Now we just get the QR by room, regardless of guest
    const room = await Room.findOne({ 
      roomNumber: roomNumber,
      isActive: true 
    });
    return room?.qrCode || null;
  } catch (error) {
    console.error('Error fetching QR:', error);
    return null;
  }
}

// Function to get all QR codes for a hotel (now room-based)
export async function getAllQRsForHotel(hotelId: string) {
  try {
    await connectToMongoDB();
    const rooms = await Room.find({ 
      hotelId: hotelId,
      isActive: true 
    }).sort({ roomNumber: 1 });
    
    return rooms.map(room => ({
      roomNumber: room.roomNumber,
      roomType: room.roomTypeName,
      qrCode: room.qrCode,
      qrCodeUrl: room.qrCodeUrl
    }));
  } catch (error) {
    console.error('Error fetching QRs:', error);
    return [];
  }
}

// Function to get QR by customer ID
export async function getQRByCustomerId(customerId: string) {
  try {
    await connectToMongoDB();
    const customer = await Customer.findOne({
      _id: customerId,
      isActive: true,
      $or: [
        { checkoutTime: { $exists: false } },
        { checkoutTime: null },
        { checkoutTime: { $gt: new Date() } }
      ]
    });
    return customer?.qrCode || null;
  } catch (error) {
    console.error('Error fetching QR:', error);
    return null;
  }
}

// Function to create or update room QR code
export async function createOrUpdateRoomQR(roomData: {
  roomNumber: string;
  hotelId: string;
  roomTypeId: string;
  roomTypeName: string;
  qrCode: string;
  qrCodeUrl: string;
}) {
  try {
    await connectToMongoDB();
    
    const existingRoom = await Room.findOne({
      roomNumber: roomData.roomNumber,
      hotelId: roomData.hotelId
    });
    
    if (existingRoom) {
      // Update existing room
      existingRoom.qrCode = roomData.qrCode;
      existingRoom.qrCodeUrl = roomData.qrCodeUrl;
      existingRoom.roomTypeId = roomData.roomTypeId;
      existingRoom.roomTypeName = roomData.roomTypeName;
      existingRoom.isActive = true;
      return await existingRoom.save();
    } else {
      // Create new room
      const newRoom = new Room({
        id: `${roomData.hotelId}_${roomData.roomNumber}_${Date.now()}`,
        ...roomData,
        isActive: true
      });
      return await newRoom.save();
    }
  } catch (error) {
    console.error('Error creating/updating room QR:', error);
    throw error;
  }
}