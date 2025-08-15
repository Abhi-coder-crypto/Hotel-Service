import { Hotel, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Hotel className="text-accent text-2xl mr-3" />
              <h3 className="text-xl font-bold">Grand Hotel</h3>
            </div>
            <p className="text-blue-200">
              Experience luxury and comfort with our premium hotel services. Your satisfaction is our priority.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-200">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-blue-200">
              <p className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                +1 (555) 123-4567
              </p>
              <p className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                info@grandhotel.com
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                123 Luxury Avenue, Hotel District
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; 2024 Grand Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
