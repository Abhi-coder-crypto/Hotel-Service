import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, Clock, Smartphone } from "lucide-react";
import hotelLogo from "@assets/image_1755267222169.png";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="mb-8 animate-fadeInDown !opacity-100">
              <img 
                src={hotelLogo} 
                alt="Grand Hotel Logo" 
                className="w-32 h-32 object-contain mx-auto shadow-2xl"
                style={{ filter: 'brightness(1.1) contrast(1.2)' }}
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInDown !opacity-100 text-white" style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,1)' }}>
              Welcome to <span className="text-yellow-400 animate-pulse-glow">Grand Hotel</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fadeInUp !opacity-100 font-semibold text-white" style={{animationDelay: '0.3s', textShadow: '2px 2px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,1)'}}>
              Experience luxury and comfort with our premium hotel services. Your satisfaction is our priority.
            </p>
            <div className="animate-zoomIn !opacity-100" style={{animationDelay: '0.6s'}}>
              <Link 
                href="/services"
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
              >
                <Button className="bg-gradient-to-r from-slate-800 via-slate-700 to-gray-800 hover:from-slate-900 hover:via-slate-800 hover:to-gray-900 text-white font-bold py-4 px-10 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl border-2 border-white/30" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  <span className="mr-2">🛎️</span>
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 animate-fadeInUp">Why Choose Grand Hotel?</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              We provide exceptional hospitality services designed to make your stay memorable and comfortable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-800 hover:bg-gray-700 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-slideInLeft" style={{animationDelay: '0.4s'}}>
              <img 
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150" 
                alt="Premium Quality" 
                className="w-20 h-16 object-cover rounded-lg mx-auto mb-4 animate-float"
              />
              <h3 className="text-xl font-semibold mb-2 text-white">Premium Quality</h3>
              <p className="text-gray-300">Top-tier services and amenities for the ultimate luxury experience.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-800 hover:bg-gray-700 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <img 
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150" 
                alt="24/7 Service" 
                className="w-20 h-16 object-cover rounded-lg mx-auto mb-4 animate-float" 
                style={{animationDelay: '1s'}}
              />
              <h3 className="text-xl font-semibold mb-2 text-white">24/7 Service</h3>
              <p className="text-gray-300">Round-the-clock availability to meet all your hospitality needs.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-800 hover:bg-gray-700 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-slideInRight" style={{animationDelay: '0.8s'}}>
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=150" 
                alt="Easy Booking" 
                className="w-20 h-16 object-cover rounded-lg mx-auto mb-4 animate-float" 
                style={{animationDelay: '2s'}}
              />
              <h3 className="text-xl font-semibold mb-2 text-white">Easy Booking</h3>
              <p className="text-gray-300">Convenient service requests through our intuitive platform.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
