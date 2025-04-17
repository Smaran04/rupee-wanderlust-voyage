
import React from 'react';
import { 
  Wifi, 
  Coffee, 
  Utensils, 
  Car, 
  Dumbbell, 
  Waves, 
  Wind, 
  Tv, 
  Snowflake
} from 'lucide-react';

interface AmenitiesProps {
  amenities: string[];
  className?: string;
}

const Amenities: React.FC<AmenitiesProps> = ({ amenities, className = '' }) => {
  // Map of amenity names to their respective icons
  const amenityIcons: Record<string, React.ReactNode> = {
    'Free WiFi': <Wifi className="h-4 w-4" />,
    'Breakfast': <Coffee className="h-4 w-4" />,
    'Restaurant': <Utensils className="h-4 w-4" />,
    'Parking': <Car className="h-4 w-4" />,
    'Fitness Center': <Dumbbell className="h-4 w-4" />,
    'Swimming Pool': <Waves className="h-4 w-4" />,
    'Air Conditioning': <Wind className="h-4 w-4" />,
    'TV': <Tv className="h-4 w-4" />,
    'AC': <Snowflake className="h-4 w-4" />
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${className}`}>
      {amenities.map((amenity, index) => (
        <div 
          key={index} 
          className="flex items-center p-2 bg-gray-50 rounded-md"
        >
          <div className="mr-2 text-gray-600">
            {amenityIcons[amenity] || <div className="h-4 w-4" />}
          </div>
          <span>{amenity}</span>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
