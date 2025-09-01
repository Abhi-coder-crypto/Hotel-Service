import QRDisplay from "@/components/qr-display";
import Header from "@/components/header";

export default function QRCodes() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-lg opacity-35 animate-bounce" style={{animationDuration: '4s', animationDelay: '2s'}}></div>
        </div>
        <div className="relative z-10">
          <QRDisplay hotelId="68a0500df0d37587696090c6" showStoredQRs={true} showGeneratedQR={false} />
        </div>
      </div>
    </div>
  );
}