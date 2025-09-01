import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertServiceRequestSchema } from "@shared/schema";
import { z } from "zod";
import { sendServiceRequestEmail } from "./email";
import { getAllQRsForHotel, getQRByRoomAndGuest, Customer, ServiceRequest, connectToMongoDB } from "./mongodb";
import QRCode from 'qrcode';

export async function registerRoutes(app: Express): Promise<Server> {
  // Service request endpoint
  app.post("/api/request-service", async (req, res) => {
    try {
      await connectToMongoDB();
      const validatedData = insertServiceRequestSchema.parse(req.body);
      
      // Store in local storage (existing functionality)
      const localServiceRequest = await storage.createServiceRequest(validatedData);
      
      // Find the customer in MongoDB to get hotel ID and customer ID
      const customer = await Customer.findOne({ 
        roomNumber: validatedData.roomNumber,
        name: validatedData.name,
        isActive: true 
      });
      
      // Store in MongoDB for admin panel access
      const mongoServiceRequest = new ServiceRequest({
        guestName: validatedData.name,
        roomNumber: validatedData.roomNumber,
        service: validatedData.service,
        notes: validatedData.notes,
        status: 'pending',
        hotelId: customer?.hotelId || '68a0500df0d37587696090c6', // Use your hotel ID as fallback
        customerId: customer?._id || null,
        requestedAt: new Date()
      });
      
      const savedMongoRequest = await mongoServiceRequest.save();
      
      // Log the request details to console as specified
      console.log("Service Request Details:", {
        id: savedMongoRequest._id,
        name: validatedData.name,
        roomNumber: validatedData.roomNumber,
        service: validatedData.service,
        notes: validatedData.notes,
        hotelId: savedMongoRequest.hotelId,
        timestamp: savedMongoRequest.requestedAt
      });
      
      // Send email notification
      const emailSent = await sendServiceRequestEmail({
        guestName: validatedData.name,
        roomNumber: validatedData.roomNumber,
        service: validatedData.service,
        notes: validatedData.notes || undefined,
        timestamp: savedMongoRequest.requestedAt.toLocaleString()
      });
      
      if (!emailSent) {
        console.warn("Failed to send email notification for service request");
      }
      
      res.status(201).json({ 
        message: "Service request submitted successfully",
        request: {
          ...localServiceRequest,
          mongoId: savedMongoRequest._id,
          hotelId: savedMongoRequest.hotelId
        },
        emailSent 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid request data", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating service request:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get all service requests endpoint (for admin purposes)
  app.get("/api/service-requests", async (req, res) => {
    try {
      // Get from local storage (existing functionality)
      const localRequests = await storage.getServiceRequests();
      res.json(localRequests);
    } catch (error) {
      console.error("Error fetching service requests:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get MongoDB service requests for admin panel
  app.get("/api/mongo-service-requests/:hotelId", async (req, res) => {
    try {
      await connectToMongoDB();
      const { hotelId } = req.params;
      const { status, page = 1, limit = 50 } = req.query;
      
      const query: any = { hotelId };
      if (status && status !== 'all') {
        query.status = status;
      }
      
      const skip = (Number(page) - 1) * Number(limit);
      
      const requests = await ServiceRequest.find(query)
        .sort({ requestedAt: -1 }) // Most recent first
        .skip(skip)
        .limit(Number(limit))
        .lean();
      
      const total = await ServiceRequest.countDocuments(query);
      
      res.json({
        requests,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      });
    } catch (error) {
      console.error("Error fetching MongoDB service requests:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update service request status (for admin panel)
  app.patch("/api/service-request/:requestId", async (req, res) => {
    try {
      await connectToMongoDB();
      const { requestId } = req.params;
      const { status, assignedTo } = req.body;
      
      const updateData: any = {};
      if (status) updateData.status = status;
      if (assignedTo) updateData.assignedTo = assignedTo;
      if (status === 'completed') updateData.completedAt = new Date();
      
      const updatedRequest = await ServiceRequest.findByIdAndUpdate(
        requestId,
        updateData,
        { new: true }
      );
      
      if (!updatedRequest) {
        return res.status(404).json({ message: "Service request not found" });
      }
      
      res.json({
        message: "Service request updated successfully",
        request: updatedRequest
      });
    } catch (error) {
      console.error("Error updating service request:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // QR Code endpoints
  app.get("/api/qr-codes/:hotelId", async (req, res) => {
    try {
      const { hotelId } = req.params;
      const qrCodes = await getAllQRsForHotel(hotelId);
      res.json(qrCodes);
    } catch (error) {
      console.error("Error fetching QR codes:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/qr-code/:roomNumber/:guestName", async (req, res) => {
    try {
      const { roomNumber, guestName } = req.params;
      const qrCode = await getQRByRoomAndGuest(roomNumber, guestName);
      
      if (!qrCode) {
        return res.status(404).json({ message: "QR code not found" });
      }
      
      res.json({ qrCode });
    } catch (error) {
      console.error("Error fetching QR code:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Generate a new QR code for the hotel service website
  app.post("/api/generate-qr", async (req, res) => {
    try {
      const { url } = req.body;
      const websiteUrl = url || `${req.protocol}://${req.get('host')}`;
      
      const qrCodeDataUrl = await QRCode.toDataURL(websiteUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      res.json({ qrCode: qrCodeDataUrl, url: websiteUrl });
    } catch (error) {
      console.error("Error generating QR code:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get guest details by room number
  app.get("/api/guest/:roomNumber", async (req, res) => {
    try {
      await connectToMongoDB();
      const { roomNumber } = req.params;
      const customer = await Customer.findOne({ 
        roomNumber: roomNumber,
        isActive: true 
      });
      
      if (!customer) {
        return res.status(404).json({ message: "Guest not found" });
      }
      
      res.json({
        name: customer.name,
        roomNumber: customer.roomNumber,
        roomTypeName: customer.roomTypeName,
        phone: customer.phone,
        email: customer.email,
        hotelName: "Grand Hotel"
      });
    } catch (error) {
      console.error("Error fetching guest details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
