
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Users, Calendar } from 'lucide-react';
import { Hotel } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const isFestival = hotel.festivalsNearby && hotel.festivalsNearby.length > 0;
  const price = isFestival && hotel.pricePerNight.festival 
    ? hotel.pricePerNight.festival 
    : hotel.pricePerNight.regular;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow card-hover">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={hotel.images[0]} 
          alt={hotel.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {isFestival && (
            <Badge variant="destructive" className="px-2 py-1 text-xs font-semibold">
              Festival Price
            </Badge>
          )}
          <Badge variant="secondary" className="px-2 py-1 bg-white/90 text-xs font-semibold flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {hotel.rating}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{hotel.name}</h3>
        
        <div className="flex items-center mb-2 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{hotel.address}</span>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{hotel.description}</p>
        
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>Up to {Math.max(...hotel.rooms.map(r => r.occupancy.adults))} guests</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{hotel.rooms.length} room types</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-sm">Starts from</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">₹{price.toLocaleString()}</span>
              <span className="text-xs text-gray-500">/night</span>
            </div>
          </div>
          
          <Link to={`/hotels/${hotel.id}`}>
            <Button>View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
