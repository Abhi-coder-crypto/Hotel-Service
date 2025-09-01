import QRDisplay from "@/components/qr-display";
import Header from "@/components/header";

export default function QRCodes() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <QRDisplay hotelId="68a0500df0d37587696090c6" showStoredQRs={true} showGeneratedQR={false} />
    </div>
  );
}