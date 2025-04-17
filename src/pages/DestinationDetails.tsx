
import React from 'react';
import { useParams } from 'react-router-dom';
import { destinations } from '@/data/mockData';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Star, ImagePlus, Users } from 'lucide-react';
import OpenStreetMap from '@/components/maps/OpenStreetMap';

// Add missing properties to match the destination structure
interface ExtendedDestination {
  id: number;
  name: string;
  location?: string; // Make optional
  description: string;
  image: string;
  rating: number;
  reviews?: number; // Make optional
  country: string;
  highlights?: string[]; // Make optional
  activities?: string[]; // Make optional
  latitude?: number; // Make optional
  longitude?: number; // Make optional
}

const DestinationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const destination = destinations.find((d) => d.id === Number(id)) as ExtendedDestination;

  if (!destination) {
    return (
      <Layout>
        <div>Destination not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-4">{destination.name}</h1>
            {destination.location && (
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {destination.location}
              </div>
            )}
            <div className="flex items-center text-gray-600 mb-4">
              <Star className="h-4 w-4 mr-1" />
              {destination.rating} ({destination.reviews || 0} reviews)
            </div>
            <img
              src={destination.image}
              alt={destination.name}
              className="rounded-md mb-4"
            />
            <p className="text-gray-700 mb-4">{destination.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {destination.highlights && destination.highlights.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Highlights</h2>
                  <ul className="list-disc list-inside text-gray-600">
                    {destination.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {destination.activities && destination.activities.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Activities</h2>
                  <ul className="list-disc list-inside text-gray-600">
                    {destination.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {destination.latitude && destination.longitude && (
              <OpenStreetMap
                latitude={destination.latitude}
                longitude={destination.longitude}
                zoom={13}
                markerTitle={destination.name}
                height="400px"
                className="mt-6"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DestinationDetails;
