import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertServiceRequestSchema } from "@shared/schema";
import { z } from "zod";

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
      
      res.status(201).json({ 
        message: "Service request submitted successfully",
        request: serviceRequest 
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

  const httpServer = createServer(app);
  return httpServer;
}
