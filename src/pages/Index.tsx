
import React from 'react';
import { ArrowRight, Plane, Building, Umbrella, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import SearchForm from '@/components/search/SearchForm';
import DestinationCard from '@/components/destinations/DestinationCard';
import HotelCard from '@/components/hotels/HotelCard';
import { destinations, hotels } from '@/data/mockData';

const Index = () => {
  // Get featured destinations (first 3)
  const featuredDestinations = destinations.slice(0, 3);
  // Get top-rated hotels (first 4)
  const topRatedHotels = [...hotels].sort((a, b) => b.rating - a.rating).slice(0, 4);
  // Get featured destination (first one)
  const featuredDestination = destinations[0];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-travel-700">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1770" 
            alt="Travel" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-travel-900/90 to-travel-700/70" />
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in text-black">
              Discover the Beauty of India
            </h1>
            <p className="text-lg md:text-xl text-black mb-8 max-w-2xl animate-fade-in">
              From ancient landmarks to pristine beaches, explore the incredible diversity of 
              India with our curated collection of destinations and premium accommodations.
            </p>
            
            <div className="bg-white rounded-lg p-6 shadow-xl animate-slide-up">
              <h2 className="text-gray-800 font-bold text-xl mb-6">Find Your Perfect Stay</h2>
              <SearchForm />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Destinations</h2>
              <p className="text-gray-600">Explore the most visited places in India</p>
            </div>
            <Link to="/destinations">
              <Button variant="link" className="text-travel-600">
                View all destinations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map(destination => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destination */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Featured Destination</h2>
            <p className="text-gray-600">Discover our handpicked highlight of the week</p>
          </div>
          
          <DestinationCard destination={featuredDestination} featured={true} />
        </div>
      </section>

      {/* Top Rated Hotels */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Top Rated Hotels</h2>
              <p className="text-gray-600">Stay at the finest accommodations in India</p>
            </div>
            <Link to="/hotels">
              <Button variant="link" className="text-travel-600">
                View all hotels
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topRatedHotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Why Choose Travel Ease</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer the best travel experiences with unmatched service and exceptional value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-travel-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-travel-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Curated Destinations</h3>
              <p className="text-gray-600">
                We handpick the most exceptional destinations across India for authentic experiences.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-travel-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-travel-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Accommodations</h3>
              <p className="text-gray-600">
                Enjoy stays at the finest hotels and resorts with world-class amenities.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-travel-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Umbrella className="h-8 w-8 text-travel-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Festival Insights</h3>
              <p className="text-gray-600">
                Stay informed about local festivals and special events during your travels.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-travel-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-travel-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Hotspots</h3>
              <p className="text-gray-600">
                Discover hidden gems and must-visit attractions with our expert guides.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-travel-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-black">
            Book your next adventure today and create memories that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/hotels">
              <Button size="lg" variant="secondary">Browse Hotels</Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-white hover:text-travel-600">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
