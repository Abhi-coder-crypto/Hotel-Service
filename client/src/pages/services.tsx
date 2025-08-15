import { useState } from "react";
import { Button } from "@/components/ui/button";
import ServiceRequestModal from "../components/service-request-modal";
import { 
  Utensils, 
  Fan, 
  Shirt, 
  Plane, 
  Bell, 
  Sparkles, 
  Dumbbell, 
  Waves, 
  Briefcase, 
  Wifi 
} from "lucide-react";

const services = [
  {
    id: "room-service",
    name: "Room Service",
    description: "Delicious meals delivered directly to your room, available 24/7.",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    id: "housekeeping",
    name: "Housekeeping",
    description: "Professional room cleaning and maintenance services.",
    icon: Fan,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    id: "laundry-service",
    name: "Laundry Service",
    description: "Professional cleaning and pressing of your garments.",
    icon: Shirt,
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    id: "airport-shuttle",
    name: "Airport Shuttle",
    description: "Convenient transportation to and from the airport.",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    id: "concierge",
    name: "Concierge",
    description: "Personal assistance for reservations and recommendations.",
    icon: Bell,
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    id: "spa-wellness",
    name: "Spa & Wellness",
    description: "Rejuvenating spa treatments and wellness services.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    id: "gym",
    name: "Gym",
    description: "State-of-the-art fitness center with modern equipment.",
    icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    id: "swimming-pool",
    name: "Swimming Pool",
    description: "Refreshing pool area with poolside service available.",
    icon: Waves,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    id: "business-center",
    name: "Business Center",
    description: "Fully equipped business facilities for your work needs.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  },
  {
    id: "free-wifi",
    name: "Free Wi-Fi",
    description: "High-speed internet access throughout the hotel.",
    icon: Wifi,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceRequest = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  return (
    <div>
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Hotel Services</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of premium hotel services designed for your comfort and convenience.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={service.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <IconComponent className="text-primary text-xl mr-3" />
                      <h3 className="text-xl font-semibold">{service.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Button 
                      onClick={() => handleServiceRequest(service.name)}
                      className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Request Service
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedService}
      />
    </div>
  );
}
