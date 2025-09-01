import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Contact() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 py-12 relative overflow-hidden">
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-slate-100/25"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-gray-50/30 via-transparent to-cyan-50/15"></div>
        
        {/* Large communication themed backgrounds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-88 h-88 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full opacity-45 animate-pulse"></div>
          <div className="absolute top-1/4 -right-28 w-[400px] h-[400px] bg-gradient-to-r from-slate-200/15 to-gray-200/15 rounded-full opacity-35 animate-float" style={{animationDuration: '9s'}}></div>
          <div className="absolute -bottom-28 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-violet-200/20 rounded-full opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/3 -right-16 w-64 h-64 bg-gradient-to-r from-green-200/25 to-emerald-200/25 rounded-full opacity-40 animate-float" style={{animationDelay: '3s'}}></div>
        </div>
        {/* Communication pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        {/* Contact icons floating */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-16 text-4xl opacity-10 animate-float">📞</div>
          <div className="absolute top-1/2 left-12 text-3xl opacity-15 animate-bounce" style={{animationDuration: '4s'}}>✉️</div>
          <div className="absolute bottom-32 right-8 text-5xl opacity-10 animate-pulse">📍</div>
          <div className="absolute top-40 left-1/3 text-3xl opacity-15 animate-float" style={{animationDelay: '2s'}}>🕐</div>
        </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with Grand Hotel. We're here to help make your stay memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary" />
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">+1 (555) 123-4567</p>
              <p className="text-gray-600">Available 24/7 for your convenience</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">info@grandhotel.com</p>
              <p className="text-gray-600">We'll respond within 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">123 Luxury Avenue</p>
              <p className="text-lg">Hotel District, City 12345</p>
              <p className="text-gray-600">Prime location in the heart of the city</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">24/7 Service</p>
              <p className="text-gray-600">Front desk always available</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
      <Footer />
    </div>
  );
}