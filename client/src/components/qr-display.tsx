import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Download, RefreshCw, Scan } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface QRCodeData {
  name?: string;
  room?: string;
  qrCode: string;
}

interface QRDisplayProps {
  hotelId?: string;
  showStoredQRs?: boolean;
  showGeneratedQR?: boolean;
}

export default function QRDisplay({ hotelId = "default", showStoredQRs = true, showGeneratedQR = true }: QRDisplayProps) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Fetch stored QR codes from MongoDB
  const { data: storedQRs, isLoading: loadingStored, refetch: refetchStored, isFetching: fetchingStored } = useQuery({
    queryKey: ['/api/qr-codes', hotelId],
    enabled: showStoredQRs,
    staleTime: 0, // Always refetch when refetch is called
    gcTime: 0 // Don't cache for immediate refresh
  });

  // Generate QR code for this website
  const { data: generatedQR, isLoading: loadingGenerated, refetch: refetchGenerated } = useQuery({
    queryKey: ['/api/generate-qr'],
    queryFn: async () => {
      const response = await fetch('/api/generate-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      if (!response.ok) throw new Error('Failed to generate QR code');
      return response.json();
    },
    enabled: showGeneratedQR
  });

  const downloadQR = (qrCode: string, filename: string) => {
    try {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = `${filename}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "QR Code Downloaded",
        description: `${filename}.png has been saved to your downloads.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download the QR code. Please try again.",
        variant: "destructive"
      });
    }
  };

  const scanQRCode = async (qrCode: string, guestName: string, roomNumber: string) => {
    try {
      // Fetch guest details from the database
      const response = await fetch(`/api/guest/${roomNumber}`);
      
      if (response.ok) {
        const guestData = await response.json();
        
        // Navigate to guest profile page instead of services
        setLocation(`/guest-profile?room=${roomNumber}&name=${encodeURIComponent(guestData.name)}`);
        
        toast({
          title: "QR Code Scanned Successfully",
          description: `Welcome ${guestData.name}! Taking you to your profile...`,
        });
      } else {
        toast({
          title: "Guest Not Found",
          description: "Could not find guest information for this QR code.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Scanner Error",
        description: "Could not process the QR code. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <QrCode className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Quick Access QR Codes</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Scan any QR code below to quickly access our hotel service system from your mobile device.
          </p>
          {showStoredQRs && (
            <div className="mb-4">
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Refresh button clicked');
                  
                  toast({
                    title: "Refreshing QR Codes",
                    description: "Fetching latest QR codes from database...",
                  });
                  
                  try {
                    await refetchStored();
                    toast({
                      title: "QR Codes Refreshed",
                      description: "Successfully loaded latest QR codes from database.",
                    });
                  } catch (error) {
                    toast({
                      title: "Refresh Failed",
                      description: "Could not refresh QR codes. Please try again.",
                      variant: "destructive"
                    });
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white cursor-pointer z-10 relative pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-refresh-all-qr"
                disabled={loadingStored || fetchingStored}
                type="button"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${(loadingStored || fetchingStored) ? 'animate-spin' : ''}`} />
                {(loadingStored || fetchingStored) ? 'Refreshing...' : 'Refresh QR Codes'}
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Generated QR Code for this website */}
          {showGeneratedQR && (
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300" data-testid="card-generated-qr">
              <CardHeader className="text-center">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-center">
                  <QrCode className="w-5 h-5 mr-2 text-blue-600" />
                  Hotel Services Access
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {loadingGenerated ? (
                  <div className="flex items-center justify-center h-64" data-testid="loading-generated">
                    <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                  </div>
                ) : generatedQR ? (
                  <div>
                    <img 
                      src={generatedQR.qrCode} 
                      alt="Hotel Services QR Code" 
                      className="mx-auto mb-4 rounded-lg shadow-md"
                      data-testid="img-generated-qr"
                    />
                    <p className="text-sm text-gray-600 mb-4" data-testid="text-generated-url">
                      Redirects to: {generatedQR.url}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={() => downloadQR(generatedQR.qrCode, 'hotel-services-qr')}
                        variant="outline"
                        size="sm"
                        data-testid="button-download-generated"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        onClick={() => refetchGenerated()}
                        variant="outline"
                        size="sm"
                        data-testid="button-refresh-generated"
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Refresh
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8" data-testid="error-generated">
                    <p className="text-gray-500">Failed to generate QR code</p>
                    <Button
                      onClick={() => refetchGenerated()}
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      data-testid="button-retry-generated"
                    >
                      Try Again
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Stored QR Codes from MongoDB */}
          {showStoredQRs && (
            <>
              {loadingStored ? (
                <Card className="bg-white shadow-lg" data-testid="card-loading-stored">
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center" data-testid="loading-stored">
                      <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                      <p className="text-gray-600">Loading stored QR codes...</p>
                    </div>
                  </CardContent>
                </Card>
              ) : storedQRs && Array.isArray(storedQRs) && storedQRs.length > 0 ? (
                storedQRs.map((qr: QRCodeData, index: number) => (
                  <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300" data-testid={`card-stored-qr-${index}`}>
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        {qr.name ? `${qr.name} - Room ${qr.room}` : `Guest QR Code ${index + 1}`}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <img 
                        src={qr.qrCode} 
                        alt={`QR Code for ${qr.name || 'Guest'}`}
                        className="mx-auto mb-4 rounded-lg shadow-md max-w-full h-auto"
                        data-testid={`img-stored-qr-${index}`}
                      />
                      <div className="flex gap-2 justify-center flex-wrap">
                        <Button
                          onClick={() => scanQRCode(qr.qrCode, qr.name || 'Guest', qr.room || '')}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          size="sm"
                          data-testid={`button-scan-stored-${index}`}
                        >
                          <Scan className="w-4 h-4 mr-1" />
                          Scan QR
                        </Button>
                        <Button
                          onClick={() => downloadQR(qr.qrCode, `qr-${qr.name || 'guest'}-room-${qr.room || index}`)}
                          variant="outline"
                          size="sm"
                          data-testid={`button-download-stored-${index}`}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-white shadow-lg" data-testid="card-no-stored">
                  <CardContent className="text-center py-8">
                    <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4" data-testid="text-no-stored">No guest QR codes found</p>
                    <Button
                      onClick={() => refetchStored()}
                      variant="outline"
                      size="sm"
                      data-testid="button-refresh-stored"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Refresh
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Scan with your phone's camera to quickly access hotel services</p>
        </div>
      </div>
    </div>
  );
}