
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SearchForm from '@/components/search/SearchForm';
import HotelCard from '@/components/hotels/HotelCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { hotels, destinations } from '@/data/mockData';
import { Filter, SortAsc, BadgeDollarSign, BadgeCheck, Bed, Search } from 'lucide-react';

const HotelListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // State for filters
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [searchParams, setSearchParams] = useState({
    destination: queryParams.get('destination') || '',
    checkIn: queryParams.get('checkIn') || '',
    checkOut: queryParams.get('checkOut') || '',
    adults: queryParams.get('adults') || '2',
    children: queryParams.get('children') || '0',
  });
  
  // Filter state
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  // Get all available amenities from hotels
  const allAmenities = Array.from(
    new Set(hotels.flatMap(hotel => hotel.amenities))
  ).sort();

  useEffect(() => {
    applyFilters();
  }, [searchParams, priceRange, selectedRating, selectedAmenities]);

  const applyFilters = () => {
    let result = [...hotels];
    
    // Filter by destination
    if (searchParams.destination) {
      result = result.filter(
        hotel => hotel.destinationId === parseInt(searchParams.destination)
      );
    }
    
    // Filter by price range
    result = result.filter(hotel => {
      const price = hotel.festivalsNearby && hotel.pricePerNight.festival 
        ? hotel.pricePerNight.festival 
        : hotel.pricePerNight.regular;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Filter by rating
    if (selectedRating.length > 0) {
      result = result.filter(hotel => 
        selectedRating.some(rating => Math.floor(hotel.rating) === rating)
      );
    }
    
    // Filter by amenities
    if (selectedAmenities.length > 0) {
      result = result.filter(hotel => 
        selectedAmenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }
    
    setFilteredHotels(result);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(prev => {
      if (prev.includes(rating)) {
        return prev.filter(r => r !== rating);
      } else {
        return [...prev, rating];
      }
    });
  };

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(a => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };
  
  const resetFilters = () => {
    setPriceRange([0, 50000]);
    setSelectedRating([]);
    setSelectedAmenities([]);
  };

  const getDestinationName = (id: string) => {
    const destination = destinations.find(d => d.id === parseInt(id));
    return destination ? destination.name : 'All Destinations';
  };

  return (
    <Layout>
      {/* Search banner */}
      <section className="bg-travel-700">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-black">
            {searchParams.destination 
              ? `Hotels in ${getDestinationName(searchParams.destination)}` 
              : 'Find Your Perfect Hotel'}
          </h1>
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <SearchForm isHorizontal={true} />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Mobile */}
          <div className="lg:hidden mb-4">
            <Button 
              onClick={() => setShowFilters(!showFilters)} 
              variant="outline" 
              className="w-full flex items-center justify-center"
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            
            {showFilters && (
              <div className="mt-4 border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <Button variant="ghost" onClick={resetFilters} size="sm">
                    Reset
                  </Button>
                </div>
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <BadgeDollarSign className="mr-2 h-4 w-4" />
                    Price Range
                  </h3>
                  <Slider
                    defaultValue={[0, 50000]}
                    max={50000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
                
                {/* Rating Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <BadgeCheck className="mr-2 h-4 w-4" />
                    Star Rating
                  </h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center">
                        <Checkbox 
                          id={`rating-${rating}-mobile`} 
                          checked={selectedRating.includes(rating)}
                          onCheckedChange={() => handleRatingChange(rating)}
                        />
                        <label 
                          htmlFor={`rating-${rating}-mobile`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                        >
                          {Array(rating).fill(0).map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                          {Array(5 - rating).fill(0).map((_, i) => (
                            <span key={i} className="text-gray-300">★</span>
                          ))}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Amenities Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Bed className="mr-2 h-4 w-4" />
                    Amenities
                  </h3>
                  <div className="space-y-2">
                    {allAmenities.map(amenity => (
                      <div key={amenity} className="flex items-center">
                        <Checkbox 
                          id={`amenity-${amenity}-mobile`} 
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => handleAmenityChange(amenity)}
                        />
                        <label 
                          htmlFor={`amenity-${amenity}-mobile`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-1/4">
            <div className="border rounded-lg p-6 bg-white sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <Button variant="ghost" onClick={resetFilters} size="sm">
                  Reset
                </Button>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BadgeDollarSign className="mr-2 h-4 w-4" />
                  Price Range
                </h3>
                <Slider
                  defaultValue={[0, 50000]}
                  max={50000}
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
              
              {/* Rating Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  Star Rating
                </h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center">
                      <Checkbox 
                        id={`rating-${rating}`} 
                        checked={selectedRating.includes(rating)}
                        onCheckedChange={() => handleRatingChange(rating)}
                      />
                      <label 
                        htmlFor={`rating-${rating}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                      >
                        {Array(rating).fill(0).map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                        {Array(5 - rating).fill(0).map((_, i) => (
                          <span key={i} className="text-gray-300">★</span>
                        ))}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Amenities Filter */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Bed className="mr-2 h-4 w-4" />
                  Amenities
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {allAmenities.map(amenity => (
                    <div key={amenity} className="flex items-center">
                      <Checkbox 
                        id={`amenity-${amenity}`} 
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityChange(amenity)}
                      />
                      <label 
                        htmlFor={`amenity-${amenity}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Hotel Listings */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">
                  {filteredHotels.length} Hotels Found
                </h2>
                {searchParams.destination && (
                  <p className="text-gray-600">
                    in {getDestinationName(searchParams.destination)}
                  </p>
                )}
              </div>
              
              <Button 
                variant="ghost" 
                className="hidden md:flex items-center"
                onClick={() => {
                  // Sort by price (low to high)
                  setFilteredHotels([...filteredHotels].sort((a, b) => {
                    const priceA = a.pricePerNight.festival || a.pricePerNight.regular;
                    const priceB = b.pricePerNight.festival || b.pricePerNight.regular;
                    return priceA - priceB;
                  }));
                }}
              >
                <SortAsc className="mr-2 h-4 w-4" />
                Price: Low to High
              </Button>
            </div>
            
            {filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHotels.map(hotel => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search for a different destination.
                </p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HotelListing;
