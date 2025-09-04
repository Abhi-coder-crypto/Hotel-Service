import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, MapPin, Phone, Mail, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useToast } from "@/hooks/use-toast";

interface GuestDetails {
  name: string;
  roomNumber: string;
  roomTypeName: string;
  phone: string;
  email: string;
  hotelName: string;
}

interface ServiceRequest {
  _id: string;
  service: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  requestedAt: string;
  completedAt?: string;
  assignedTo?: string;
}

interface GuestServiceResponse {
  guestName: string;
  roomNumber: string;
  requests: ServiceRequest[];
}

export default function GuestProfile() {
  const [location] = useLocation();
  const { toast } = useToast();
  
  // Get room number from URL parameters
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const roomNumber = urlParams.get('room');
  const guestName = urlParams.get('name');

  if (!roomNumber) {
    return (
      <div className="w-full overflow-x-hidden">
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="text-center py-8">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Invalid Access</h2>
              <p className="text-gray-600">Room number not found. Please scan a valid QR code.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Fetch guest details
  const { data: guestDetails, isLoading: loadingDetails, error: detailsError } = useQuery<GuestDetails>({
    queryKey: ['/api/guest', roomNumber],
    queryFn: async () => {
      const response = await fetch(`/api/guest/${roomNumber}`);
      if (!response.ok) {
        throw new Error('Guest not found');
      }
      return response.json();
    }
  });

  // Fetch service history
  const { data: serviceData, isLoading: loadingServices, error: servicesError } = useQuery<GuestServiceResponse>({
    queryKey: ['/api/guest-service-requests', roomNumber],
    queryFn: async () => {
      const response = await fetch(`/api/guest-service-requests/${roomNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch service history');
      }
      return response.json();
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (loadingDetails || loadingServices) {
    return (
      <div className="w-full overflow-x-hidden">
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading guest profile...</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (detailsError || !guestDetails) {
    return (
      <div className="w-full overflow-x-hidden">
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="text-center py-8">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Guest Not Found</h2>
              <p className="text-gray-600">Could not find guest information for room {roomNumber}.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome, {guestDetails.name}!
            </h1>
            <p className="text-gray-600">
              {guestDetails.hotelName} • Room {guestDetails.roomNumber}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Guest Details Card */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 text-gray-500 mr-3" />
                  <span className="font-medium">{guestDetails.name}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-500 mr-3" />
                  <span>Room {guestDetails.roomNumber} • {guestDetails.roomTypeName}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-500 mr-3" />
                  <span>{guestDetails.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-500 mr-3" />
                  <span>{guestDetails.email}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.location.href = `/services?room=${roomNumber}&name=${encodeURIComponent(guestDetails.name)}`}
                >
                  Request New Service
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/qr-codes'}
                >
                  View QR Codes
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/contact'}
                >
                  Contact Hotel
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Service History */}
          <Card className="bg-white shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Your Service History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingServices ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading service history...</p>
                </div>
              ) : servicesError || !serviceData?.requests || serviceData.requests.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No service requests found.</p>
                  <p className="text-sm text-gray-500 mt-2">Your service history will appear here after you make requests.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {serviceData.requests.map((request) => (
                    <div key={request._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-800">{request.service}</h3>
                            <Badge className={`${getStatusColor(request.status)} flex items-center gap-1`}>
                              {getStatusIcon(request.status)}
                              {request.status}
                            </Badge>
                          </div>
                          {request.notes && (
                            <p className="text-gray-600 text-sm mb-2">{request.notes}</p>
                          )}
                          <div className="text-xs text-gray-500">
                            Requested: {new Date(request.requestedAt).toLocaleDateString()} at {new Date(request.requestedAt).toLocaleTimeString()}
                            {request.completedAt && (
                              <span className="ml-4">
                                Completed: {new Date(request.completedAt).toLocaleDateString()} at {new Date(request.completedAt).toLocaleTimeString()}
                              </span>
                            )}
                          </div>
                          {request.assignedTo && (
                            <div className="text-xs text-gray-500 mt-1">
                              Assigned to: {request.assignedTo}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}