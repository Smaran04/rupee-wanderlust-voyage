
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { Destination } from '@/data/mockData';
import { Button } from '@/components/ui/button';

interface DestinationCardProps {
  destination: Destination;
  featured?: boolean;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, featured = false }) => {
  return (
    <div className={`
      bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow card-hover
      ${featured ? 'flex flex-col lg:flex-row h-full' : ''}
    `}>
      <div className={`
        relative overflow-hidden
        ${featured ? 'h-64 lg:h-auto lg:w-1/2' : 'h-48'}
      `}>
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-lg">{destination.name}</h3>
            <div className="flex items-center bg-white/90 px-2 py-1 rounded text-xs font-semibold">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{destination.rating}</span>
            </div>
          </div>
          <div className="flex items-center text-white/90 text-sm mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{destination.country}</span>
          </div>
        </div>
      </div>
      
      <div className={`p-4 flex flex-col ${featured ? 'lg:w-1/2' : ''}`}>
        {!featured ? (
          <>
            <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
            <div className="mt-auto flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {destination.hotspots.length} Attractions
              </div>
              <Link to={`/destinations/${destination.id}`}>
                <Button>Explore</Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-2 hidden lg:block">{destination.name}</h3>
            <p className="text-gray-600 mb-4">{destination.description}</p>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Popular Attractions:</h4>
              <ul className="space-y-2">
                {destination.hotspots.map(hotspot => (
                  <li key={hotspot.id} className="flex items-start space-x-2">
                    <span className="text-travel-600 font-bold">•</span>
                    <span>{hotspot.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto">
              <Link to={`/destinations/${destination.id}`} className="w-full">
                <Button className="w-full">Explore {destination.name}</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DestinationCard;
