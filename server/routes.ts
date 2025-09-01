import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertServiceRequestSchema } from "@shared/schema";
import { z } from "zod";
import { sendServiceRequestEmail } from "./email";
import { getAllQRsForHotel, getQRByRoomAndGuest } from "./mongodb";
import QRCode from 'qrcode';

export async function registerRoutes(app: Express): Promise<Server> {
  // Service request endpoint
  app.post("/api/request-service", async (req, res) => {
    try {
      const validatedData = insertServiceRequestSchema.parse(req.body);
      
      const serviceRequest = await storage.createServiceRequest(validatedData);
      
      // Log the request details to console as specified
      console.log("Service Request Details:", {
        name: serviceRequest.name,
        roomNumber: serviceRequest.roomNumber,
        service: serviceRequest.service,
        notes: serviceRequest.notes,
        timestamp: serviceRequest.createdAt
      });
      
      // Send email notification
      const emailSent = await sendServiceRequestEmail({
        guestName: serviceRequest.name,
        roomNumber: serviceRequest.roomNumber,
        service: serviceRequest.service,
        notes: serviceRequest.notes || undefined,
        timestamp: serviceRequest.createdAt ? new Date(serviceRequest.createdAt).toLocaleString() : new Date().toLocaleString()
      });
      
      if (!emailSent) {
        console.warn("Failed to send email notification for service request");
      }
      
      res.status(201).json({ 
        message: "Service request submitted successfully",
        request: serviceRequest,
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

  // Get all service requests endpoint (optional, for admin purposes)
  app.get("/api/service-requests", async (req, res) => {
    try {
      const requests = await storage.getServiceRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching service requests:", error);
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

  const httpServer = createServer(app);
  return httpServer;
}
