import { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, X, Scan } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

interface QRScannerProps {
  onClose?: () => void;
  onScanSuccess?: (data: string) => void;
}

export default function QRScannerComponent({ onClose, onScanSuccess }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if camera is available
    QrScanner.hasCamera().then(setHasCamera).catch(() => setHasCamera(false));
  }, []);

  const startScanning = async () => {
    if (!videoRef.current || !hasCamera) return;

    try {
      setError(null);
      setIsScanning(true);

      qrScannerRef.current = new QrScanner(
        videoRef.current,
        async (result) => {
          console.log('QR Code scanned:', result.data);
          await handleScanResult(result.data);
        },
        {
          preferredCamera: 'environment', // Use back camera on mobile
          highlightScanRegion: true,
          highlightCodeOutline: true,
          maxScansPerSecond: 5,
        }
      );

      await qrScannerRef.current.start();
      
      toast({
        title: "Camera Started",
        description: "Point your camera at a QR code to scan it.",
      });
    } catch (err) {
      console.error('Failed to start QR scanner:', err);
      setError('Failed to access camera. Please check permissions.');
      setIsScanning(false);
      
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions and try again.",
        variant: "destructive"
      });
    }
  };

  const stopScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
      qrScannerRef.current.destroy();
      qrScannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleScanResult = async (qrData: string) => {
    console.log('Processing QR data:', qrData);
    
    try {
      // First stop scanning
      stopScanning();
      
      // Check if it's a URL that contains room and hotel parameters
      const url = new URL(qrData);
      const roomNumber = url.searchParams.get('room');
      const hotelId = url.searchParams.get('hotel');
      
      if (roomNumber) {
        // Fetch guest details from the database
        const response = await fetch(`/api/guest/${roomNumber}`);
        
        if (response.ok) {
          const guestData = await response.json();
          
          // Navigate to services page with guest information
          setLocation(`/services?room=${roomNumber}&name=${encodeURIComponent(guestData.name)}`);
          
          toast({
            title: "QR Code Scanned Successfully",
            description: `Welcome ${guestData.name}! Taking you to services...`,
          });
          
          if (onScanSuccess) {
            onScanSuccess(qrData);
          }
        } else {
          toast({
            title: "Guest Not Found",
            description: "Could not find guest information for this QR code.",
            variant: "destructive"
          });
        }
      } else {
        // If it's just a regular URL, navigate to it
        if (qrData.startsWith('http')) {
          window.open(qrData, '_blank');
          toast({
            title: "QR Code Scanned",
            description: "Opening link in new tab...",
          });
        } else {
          toast({
            title: "QR Code Scanned",
            description: `Data: ${qrData}`,
          });
        }
        
        if (onScanSuccess) {
          onScanSuccess(qrData);
        }
      }
    } catch (error) {
      console.error('Error processing QR code:', error);
      toast({
        title: "Processing Error",
        description: "Could not process the QR code data.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopScanning();
    };
  }, []);

  if (!hasCamera) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            QR Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-4">
            No camera detected. Please make sure you have a camera available and permissions are granted.
          </p>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            QR Scanner
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full rounded-lg bg-black"
              style={{ aspectRatio: '1' }}
              playsInline
              muted
            />
            {isScanning && (
              <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none">
                <div className="absolute inset-4 border border-white/50 rounded"></div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 justify-center">
            {!isScanning ? (
              <Button onClick={startScanning} className="flex items-center">
                <Scan className="w-4 h-4 mr-2" />
                Start Scanning
              </Button>
            ) : (
              <Button onClick={stopScanning} variant="outline">
                Stop Scanning
              </Button>
            )}
          </div>
          
          <p className="text-sm text-gray-600 text-center">
            Point your camera at a QR code to scan it automatically.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}