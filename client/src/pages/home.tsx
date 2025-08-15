import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, Clock, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInDown !opacity-100">
              Welcome to <span className="text-accent animate-pulse-glow">Grand Hotel</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fadeInUp !opacity-90" style={{animationDelay: '0.3s'}}>
              Experience luxury and comfort with our premium hotel services. Your satisfaction is our priority.
            </p>
            <div className="animate-zoomIn !opacity-100" style={{animationDelay: '0.6s'}}>
              <Link href="/services">
                <Button className="bg-accent hover:bg-yellow-500 text-black font-bold py-6 px-12 text-xl transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-3xl animate-float border-4 border-white">
                  <span className="mr-2">🛎️</span>
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeInUp">Why Choose Grand Hotel?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              We provide exceptional hospitality services designed to make your stay memorable and comfortable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-slideInLeft" style={{animationDelay: '0.4s'}}>
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-float">
                <Star className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Top-tier services and amenities for the ultimate luxury experience.</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <div className="bg-accent text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-float" style={{animationDelay: '1s'}}>
                <Clock className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Service</h3>
              <p className="text-gray-600">Round-the-clock availability to meet all your hospitality needs.</p>
            </div>
            <div className="text-center p-6 rounded-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-slideInRight" style={{animationDelay: '0.8s'}}>
              <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 animate-float" style={{animationDelay: '2s'}}>
                <Smartphone className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Convenient service requests through our intuitive platform.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
