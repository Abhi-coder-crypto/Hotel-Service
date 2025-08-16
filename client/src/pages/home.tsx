import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, Clock, Smartphone, Building2 } from "lucide-react";

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
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30">
                <Building2 className="w-16 h-16 text-white" strokeWidth={1.5} />
              </div>
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

    </div>
  );
}
