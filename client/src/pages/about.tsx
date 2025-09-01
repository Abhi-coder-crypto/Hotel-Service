import { Star, Users, Award, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/header";

export default function About() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 py-12 relative">
        {/* Luxury hotel background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-12 w-40 h-40 bg-gradient-to-r from-gold-200 to-amber-200 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-1/3 right-16 w-32 h-32 bg-gradient-to-r from-rose-200 to-pink-200 rounded-lg opacity-15 animate-bounce" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-1/4 w-36 h-36 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-lg opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        {/* Heritage pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M40 0C62.091 0 80 17.909 80 40S62.091 80 40 80 0 62.091 0 40 17.909 0 40 0zm0 8C22.327 8 8 22.327 8 40s14.327 32 32 32 32-14.327 32-32S57.673 8 40 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        {/* Floating award icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-24 right-8 text-4xl opacity-10 animate-float">🏆</div>
          <div className="absolute top-1/2 left-8 text-3xl opacity-15 animate-bounce" style={{animationDuration: '3s'}}>⭐</div>
          <div className="absolute bottom-1/3 right-12 text-5xl opacity-10 animate-pulse">🎖️</div>
          <div className="absolute top-40 left-1/3 text-3xl opacity-15 animate-float" style={{animationDelay: '1s'}}>👑</div>
        </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Grand Hotel</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the story behind our commitment to exceptional hospitality and luxury service that has made Grand Hotel a premier destination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-yellow-500" />
                Our Heritage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Since 1950, Grand Hotel has been synonymous with luxury, elegance, and impeccable service. Our rich heritage spans over seven decades of hospitality excellence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our dedicated team of hospitality professionals is committed to ensuring every guest experiences the highest level of comfort and satisfaction.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-green-500" />
                Awards & Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Winner of multiple hospitality awards, including "Best Luxury Hotel" and "Excellence in Customer Service" for three consecutive years.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-red-500" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                To create unforgettable experiences through personalized service, luxurious accommodations, and attention to every detail that matters to our guests.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-gray-600">Luxury Rooms & Suites</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-gray-600">Concierge Service</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">75+</div>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}