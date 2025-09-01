import mongoose from 'mongoose';

// MongoDB connection
const mongoUri = 'mongodb+srv://abhijeet18012001:SCeJSjgqac7DmdS5@hotel.d1juzfe.mongodb.net/?retryWrites=true&w=majority&appName=Hotel';

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

// Function to get QR by room and guest name
export async function getQRByRoomAndGuest(roomNumber: string, guestName: string) {
  try {
    await connectToMongoDB();
    const customer = await Customer.findOne({ 
      roomNumber: roomNumber, 
      name: guestName,
      isActive: true 
    });
    return customer?.qrCode || null;
  } catch (error) {
    console.error('Error fetching QR:', error);
    return null;
  }
}

// Function to get all QR codes for a hotel
export async function getAllQRsForHotel(hotelId: string) {
  try {
    await connectToMongoDB();
    const customers = await Customer.find({ 
      hotelId: hotelId,
      isActive: true 
    });
    return customers.map(customer => ({
      name: customer.name,
      room: customer.roomNumber,
      qrCode: customer.qrCode
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
    const customer = await Customer.findById(customerId);
    return customer?.qrCode || null;
  } catch (error) {
    console.error('Error fetching QR:', error);
    return null;
  }
}