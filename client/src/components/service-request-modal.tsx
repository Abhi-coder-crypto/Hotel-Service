import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Send, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const serviceRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  roomNumber: z.string().min(1, "Room number is required"),
  service: z.string().min(1, "Service is required"),
  notes: z.string().optional(),
});

type ServiceRequestForm = z.infer<typeof serviceRequestSchema>;

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
}

export default function ServiceRequestModal({
  isOpen,
  onClose,
  selectedService,
}: ServiceRequestModalProps) {
  const [location] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Extract room number from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const roomFromUrl = urlParams.get("room");
  const isRoomAutoFilled = Boolean(roomFromUrl);

  const form = useForm<ServiceRequestForm>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      name: "",
      roomNumber: roomFromUrl || "",
      service: selectedService,
      notes: "",
    },
  });

  // Update form when selectedService changes
  useEffect(() => {
    form.setValue("service", selectedService);
  }, [selectedService, form]);

  // Update room number when URL changes or modal opens
  useEffect(() => {
    if (roomFromUrl) {
      form.setValue("roomNumber", roomFromUrl);
    }
  }, [roomFromUrl, form, isOpen]);

  const submitServiceRequest = useMutation({
    mutationFn: async (data: ServiceRequestForm) => {
      return await apiRequest("POST", "/api/request-service", data);
    },
    onSuccess: () => {
      toast({
        title: "Service Request Submitted",
        description: "Your service request has been submitted successfully. Our staff will assist you shortly.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/service-requests"] });
      onClose();
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit service request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ServiceRequestForm) => {
    submitServiceRequest.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
            Request Service
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              {...form.register("name")}
              className="mt-1"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Room Number Field */}
          <div>
            <Label htmlFor="roomNumber">Room Number</Label>
            <Input
              id="roomNumber"
              placeholder="Enter room number"
              {...form.register("roomNumber")}
              readOnly={isRoomAutoFilled}
              className={`mt-1 ${isRoomAutoFilled ? "bg-gray-100" : ""}`}
            />
            {isRoomAutoFilled && (
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <Info className="mr-1 h-3 w-3" />
                Room number auto-filled from QR code
              </p>
            )}
            {form.formState.errors.roomNumber && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.roomNumber.message}
              </p>
            )}
          </div>

          {/* Selected Service Field */}
          <div>
            <Label htmlFor="service">Selected Service</Label>
            <Input
              id="service"
              {...form.register("service")}
              readOnly
              className="mt-1 bg-gray-50"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="Any special requests or additional information..."
              {...form.register("notes")}
              className="mt-1 resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={submitServiceRequest.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-blue-700"
              disabled={submitServiceRequest.isPending}
            >
              {submitServiceRequest.isPending ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
