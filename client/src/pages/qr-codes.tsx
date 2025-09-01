import QRDisplay from "@/components/qr-display";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function QRCodes() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-purple-100/20"></div>
        
        {/* Multiple layered patterns */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='1'%3E%3Cpath d='M60 0L120 60L60 120L0 60z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}></div>
        </div>
        
        {/* Tech-themed floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large background shapes */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-1/4 -right-20 w-80 h-80 bg-gradient-to-r from-cyan-200/15 to-indigo-200/15 rounded-full opacity-50 animate-float" style={{animationDuration: '8s'}}></div>
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Medium floating shapes */}
          <div className="absolute top-32 left-16 w-40 h-40 bg-gradient-to-r from-green-200/25 to-blue-200/25 rounded-lg opacity-40 animate-bounce" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-40 right-20 w-36 h-36 bg-gradient-to-r from-yellow-200/30 to-orange-200/30 rounded-lg opacity-45 animate-float" style={{animationDelay: '1s'}}></div>
          
          {/* QR code themed elements */}
          <div className="absolute top-1/3 left-8 text-6xl opacity-10 animate-float">📱</div>
          <div className="absolute bottom-1/3 right-12 text-5xl opacity-15 animate-bounce" style={{animationDuration: '3s'}}>🔲</div>
          <div className="absolute top-1/2 right-1/4 text-4xl opacity-10 animate-pulse">📷</div>
        </div>
        <div className="relative z-10">
          <QRDisplay hotelId="68a0500df0d37587696090c6" showStoredQRs={true} showGeneratedQR={false} />
        </div>
      </div>
      <Footer />
    </div>
  );
}