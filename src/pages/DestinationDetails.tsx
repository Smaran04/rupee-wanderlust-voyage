
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Globe, Navigation } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import HotelCard from '@/components/hotels/HotelCard';
import { destinations, hotels } from '@/data/mockData';
import OpenStreetMap from '@/components/maps/OpenStreetMap';

const DestinationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destinationHotels, setDestinationHotels] = useState<typeof hotels>([]);
  
  const destination = destinations.find(d => d.id === Number(id));
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!destination) {
      navigate('/');
      return;
    }
    
    // Find hotels in this destination
    const relatedHotels = hotels.filter(hotel => hotel.destinationId === destination.id);
    setDestinationHotels(relatedHotels);
  }, [id, destination, navigate]);
  
  if (!destination) {
    return null;
  }
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-travel-800">
        <div className="absolute inset-0 z-0">
          <img 
            src={destination.image} 
            alt={destination.name}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-travel-900/80 to-travel-800/90" />
        </div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{destination.name}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-travel-300 mr-1" />
              <span>{destination.country}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="font-medium">{destination.rating} Rating</span>
            </div>
          </div>
          <p className="text-xl max-w-3xl text-gray-100">
            {destination.description}
          </p>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="hotspots">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
            <TabsTrigger value="hotels">Where to Stay</TabsTrigger>
          </TabsList>
          
          {/* Hotspots Tab */}
          <TabsContent value="hotspots" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Popular Attractions in {destination.name}</h2>
              <p className="text-gray-600">Discover the must-visit places in this stunning destination</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {destination.hotspots.map((hotspot, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-60 md:h-72">
                    <img 
                      src={hotspot.image} 
                      alt={hotspot.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{hotspot.name}</h3>
                    <p className="text-gray-600 mb-4">{hotspot.description}</p>
                    <Button variant="outline" className="w-full">
                      <Globe className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Map Section */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{destination.name} on Map</h2>
                <Button variant="ghost" className="flex items-center">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </div>
              
              <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
                <OpenStreetMap 
                  latitude={destination.mapLocation.lat}
                  longitude={destination.mapLocation.lng}
                  markerTitle={destination.name}
                  zoom={12}
                  height="500px"
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Hotels Tab */}
          <TabsContent value="hotels" className="mt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Hotels in {destination.name}</h2>
              <p className="text-gray-600">
                {destinationHotels.length} accommodations available
              </p>
            </div>
            
            {destinationHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinationHotels.map(hotel => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any hotels in {destination.name} at the moment.
                </p>
                <Link to="/hotels">
                  <Button>Browse All Hotels</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* CTA Section */}
      <section className="bg-travel-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore {destination.name}?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Book your stay now and discover the beauty of this incredible destination.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/hotels">
              <Button size="lg">Find Hotels</Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline">Explore More Destinations</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DestinationDetails;
