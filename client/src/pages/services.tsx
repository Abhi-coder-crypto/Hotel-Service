import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ServiceRequestModal from "../components/service-request-modal";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import Header from "@/components/header";
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
  Wifi,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
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

function ServiceCard({ service, index, onServiceRequest }: { service: typeof services[0], index: number, onServiceRequest: (name: string) => void }) {
  const { ref, isVisible } = useScrollAnimation(0.1, '50px');
  const IconComponent = service.icon;
  
  const animationClasses = [
    'scroll-reveal-left',
    'scroll-reveal',
    'scroll-reveal-right',
    'scroll-reveal-scale'
  ];
  
  const animationClass = animationClasses[index % animationClasses.length];
  
  return (
    <div 
      ref={ref}
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col ${animationClass} ${isVisible ? 'revealed' : ''}`}
      style={{ transitionDelay: `${(index % 4) * 150}ms` }}
    >
      <img 
        src={service.image} 
        alt={service.name} 
        className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-3">
          <IconComponent className="text-primary text-lg sm:text-xl mr-2 sm:mr-3 animate-float flex-shrink-0" style={{animationDelay: `${index * 0.5}s`}} />
          <h3 className="text-lg sm:text-xl font-semibold leading-tight">{service.name}</h3>
        </div>
        <p className="text-gray-600 mb-4 flex-grow text-sm sm:text-base leading-relaxed">{service.description}</p>
        <Button 
          onClick={() => onServiceRequest(service.name)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 sm:px-5 rounded-lg transition-all duration-300 transform hover:scale-102 shadow-md hover:shadow-lg text-sm sm:text-base min-h-[44px]"
          data-testid={`button-request-${service.id}`}
        >
          <span className="text-sm sm:text-base">🛎️ Request Service</span>
        </Button>
      </div>
    </div>
  );
}

// Service Request Status Component
function ServiceRequestStatus({ requests }: { requests: any[] }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'in-progress':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'completed':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'cancelled':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!requests || requests.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Your Service Requests</h3>
        <p className="text-gray-600 text-center py-4">No service requests yet. Request a service below to see it here!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border" data-testid="service-requests-status">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Your Service Requests</h3>
      <div className="space-y-3">
        {requests.map((request, index) => (
          <div 
            key={request._id || index} 
            className={`p-4 rounded-lg border-2 ${getStatusColor(request.status)}`}
            data-testid={`request-${request._id}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(request.status)}
                <span className="font-medium">{request.service}</span>
              </div>
              <span className="text-xs font-medium uppercase tracking-wide">
                {request.status.replace('-', ' ')}
              </span>
            </div>
            {request.notes && (
              <p className="text-sm opacity-80 mb-2">{request.notes}</p>
            )}
            <div className="flex justify-between items-center text-xs opacity-70">
              <span>Requested: {formatDate(request.requestedAt)}</span>
              {request.completedAt && (
                <span>Completed: {formatDate(request.completedAt)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestInfo, setGuestInfo] = useState<any>(null);
  const [roomNumber, setRoomNumber] = useState<string | null>(null);
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);

  // Function to fetch service requests for the guest
  const fetchServiceRequests = async (roomNum: string) => {
    setLoadingRequests(true);
    try {
      const response = await fetch(`/api/guest/${roomNum}/requests`);
      if (response.ok) {
        const data = await response.json();
        setServiceRequests(data.requests || []);
      }
    } catch (error) {
      console.error('Error fetching service requests:', error);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    // Get room number and guest name from URL (when QR code is scanned)
    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get('room');
    const name = urlParams.get('name');
    
    if (room) {
      setRoomNumber(room);
      
      // Fetch guest information from our backend
      fetch(`/api/guest/${room}`)
        .then(response => response.json())
        .then(data => {
          if (data.name) {
            setGuestInfo(data);
          }
        })
        .catch(error => {
          console.log('Could not fetch guest info:', error);
          // If we have name from URL but can't fetch from DB, create basic guest info
          if (name) {
            setGuestInfo({
              name: decodeURIComponent(name),
              roomNumber: room,
              roomTypeName: "Standard Room",
              hotelName: "Grand Hotel"
            });
          }
        });

      // Fetch service requests for this guest
      fetchServiceRequests(room);
    }
  }, []);

  // Refresh service requests when modal closes (new request might have been added)
  useEffect(() => {
    if (!isModalOpen && roomNumber) {
      fetchServiceRequests(roomNumber);
    }
  }, [isModalOpen, roomNumber]);

  const handleServiceRequest = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <section className="py-12 bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative w-full">
        {/* Enhanced background with multiple layers */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}></div>
        {/* Animated service icons background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-8 text-6xl opacity-10 animate-float">🛎️</div>
          <div className="absolute top-32 right-12 text-5xl opacity-15 animate-bounce" style={{animationDuration: '3s'}}>🧹</div>
          <div className="absolute bottom-40 left-16 text-4xl opacity-10 animate-pulse">🍽️</div>
          <div className="absolute bottom-24 right-20 text-6xl opacity-15 animate-float" style={{animationDelay: '2s'}}>🏊</div>
          <div className="absolute top-1/2 left-1/4 text-5xl opacity-10 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>🧴</div>
          <div className="absolute top-1/3 right-1/3 text-4xl opacity-15 animate-pulse" style={{animationDelay: '3s'}}>🏋️</div>
        </div>
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpolygon points='50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div ref={headerRef} className={`text-center mb-8 sm:mb-12 scroll-reveal ${headerVisible ? 'revealed' : ''}`}>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">Hotel Services</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Discover our comprehensive range of premium hotel services designed for your comfort and convenience.
            </p>
          </div>

          {/* Personalized Welcome Section */}
          {guestInfo && (
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-6 mb-8 mx-4 sm:mx-0">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-emerald-800 mb-2">
                  🏨 Welcome {guestInfo.name}!
                </h2>
                <p className="text-emerald-700 text-lg">
                  Room {guestInfo.roomNumber} - {guestInfo.roomTypeName}
                </p>
                <p className="text-emerald-600 text-sm mt-1">
                  {guestInfo.hotelName}
                </p>
                <p className="text-emerald-600 text-sm mt-2">
                  ✨ Select any service below to place your request
                </p>
              </div>
            </div>
          )}

          {/* Service Request Status Section */}
          {guestInfo && (
            <div className="mb-8 mx-4 sm:mx-0">
              {loadingRequests ? (
                <div className="bg-white rounded-xl p-6 shadow-md border">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Your Service Requests</h3>
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                    <span className="ml-2 text-gray-600">Loading your requests...</span>
                  </div>
                </div>
              ) : (
                <ServiceRequestStatus requests={serviceRequests} />
              )}
            </div>
          )}

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id}
                service={service}
                index={index}
                onServiceRequest={handleServiceRequest}
              />
            ))}
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
