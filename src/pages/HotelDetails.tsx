
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { MapPin, Star, Calendar, Users, Wifi, Coffee, Shield, BadgeAlert, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Layout from '@/components/layout/Layout';
import { hotels, destinations } from '@/data/mockData';
import ImageGallery from '@/components/hotel/ImageGallery';
import { useAuth } from '@/context/AuthContext';
import HotelCard from '@/components/hotels/HotelCard';

const HotelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const hotel = hotels.find(h => h.id === Number(id));
  
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(addDays(new Date(), 2));
  const [selectedRoom, setSelectedRoom] = useState<string>(hotel?.rooms[0].type || '');
  const [adults, setAdults] = useState<string>('2');
  const [children, setChildren] = useState<string>('0');
  const [similarHotels, setSimilarHotels] = useState<typeof hotels>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!hotel) {
      navigate('/hotels');
      return;
    }
    
    // Set default selected room
    if (hotel.rooms.length > 0) {
      setSelectedRoom(hotel.rooms[0].type);
    }
    
    // Find similar hotels (same destination, excluding current hotel)
    const similar = hotels
      .filter(h => h.destinationId === hotel.destinationId && h.id !== hotel.id)
      .slice(0, 3);
    setSimilarHotels(similar);
  }, [id, hotel, navigate]);
  
  if (!hotel) {
    return null;
  }
  
  const destination = destinations.find(d => d.id === hotel.destinationId);
  
  const isFestival = hotel.festivalsNearby && hotel.festivalsNearby.length > 0;
  const basePrice = isFestival && hotel.pricePerNight.festival 
    ? hotel.pricePerNight.festival 
    : hotel.pricePerNight.regular;
  
  const selectedRoomDetails = hotel.rooms.find(room => room.type === selectedRoom);
  const roomMultiplier = selectedRoomDetails ? selectedRoomDetails.priceMultiplier : 1;
  const finalPrice = Math.round(basePrice * roomMultiplier);
  
  const durationInDays = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = finalPrice * durationInDays;
  
  const handleBooking = () => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectAfterLogin: `/booking/${hotel.id}` } });
      return;
    }
    
    // Prepare booking parameters
    const bookingParams = new URLSearchParams();
    bookingParams.set('hotelId', hotel.id.toString());
    bookingParams.set('roomType', selectedRoom);
    bookingParams.set('checkIn', checkInDate.toISOString());
    bookingParams.set('checkOut', checkOutDate.toISOString());
    bookingParams.set('adults', adults);
    bookingParams.set('children', children);
    bookingParams.set('price', finalPrice.toString());
    bookingParams.set('nights', durationInDays.toString());
    
    navigate(`/booking/${hotel.id}?${bookingParams.toString()}`);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-travel-600">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to="/hotels" className="text-gray-600 hover:text-travel-600">Hotels</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500 truncate">{hotel.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        {/* Hotel Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-travel-500 mr-1" />
                  <span className="text-gray-600">{hotel.address}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{hotel.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}>
                View Rooms
              </Button>
              <Button onClick={handleBooking}>Book Now</Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Hotel Images & Details */}
          <div className="lg:col-span-2">
            <ImageGallery images={hotel.images} name={hotel.name} />
            
            <div className="mt-8">
              <Tabs defaultValue="details">
                <TabsList className="w-full">
                  <TabsTrigger value="details" className="w-full">Details</TabsTrigger>
                  <TabsTrigger value="amenities" className="w-full">Amenities</TabsTrigger>
                  <TabsTrigger value="location" className="w-full">Location</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="mt-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">About {hotel.name}</h2>
                    <p className="text-gray-700">{hotel.description}</p>
                    
                    {isFestival && (
                      <div className="mt-6 bg-red-50 border border-red-100 rounded-lg p-4">
                        <div className="flex items-start">
                          <BadgeAlert className="text-red-500 h-6 w-6 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h3 className="font-bold text-red-800">Festival Season Alert</h3>
                            <p className="text-red-700 mt-1">
                              During the following festivals, prices may be higher due to increased demand:
                            </p>
                            <ul className="mt-2 space-y-1">
                              {hotel.festivalsNearby?.map((festival, index) => (
                                <li key={index} className="flex items-center text-red-700">
                                  <span className="mr-2">•</span> {festival}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Room Types Available</h3>
                      <div className="space-y-4">
                        {hotel.rooms.map((room, index) => (
                          <div 
                            key={index} 
                            className={`p-4 border rounded-lg ${
                              selectedRoom === room.type ? 'border-travel-500 bg-travel-50' : ''
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h4 className="font-semibold">{room.type}</h4>
                                <p className="text-sm text-gray-600">
                                  Max Occupancy: {room.occupancy.adults} adults, {room.occupancy.children} children
                                </p>
                                <p className="text-sm text-gray-600">
                                  {room.availability} rooms available
                                </p>
                              </div>
                              <div className="mt-3 sm:mt-0">
                                <div className="text-right">
                                  <p className="text-sm text-gray-500">Price per night</p>
                                  <p className="font-bold text-lg">
                                    ₹{Math.round(basePrice * room.priceMultiplier).toLocaleString()}
                                  </p>
                                </div>
                                {selectedRoom === room.type ? (
                                  <Badge className="mt-2">Selected</Badge>
                                ) : (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="mt-2"
                                    onClick={() => setSelectedRoom(room.type)}
                                  >
                                    Select
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities" className="mt-6">
                  <h2 className="text-xl font-bold mb-4">Amenities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="text-green-500 mr-2 h-5 w-5" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="location" className="mt-6">
                  <h2 className="text-xl font-bold mb-4">Location</h2>
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <p className="font-medium">{hotel.address}</p>
                    {destination && (
                      <p className="text-gray-600 mt-1">Located in {destination.name}, {destination.country}</p>
                    )}
                  </div>
                  
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBMH_02-CmHwzaN9HA7c3lyAA6qZ1rM86k&q=${encodeURIComponent(hotel.address)}`}
                    ></iframe>
                  </div>
                  
                  {destination && destination.hotspots.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold mb-3">Nearby Attractions</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {destination.hotspots.map((hotspot, index) => (
                          <div key={index} className="border rounded-lg overflow-hidden">
                            <div className="h-40">
                              <img 
                                src={hotspot.image} 
                                alt={hotspot.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium">{hotspot.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{hotspot.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Book Your Stay</h2>
                
                {isFestival && (
                  <div className="mb-4">
                    <Badge variant="destructive" className="mb-2">Festival Season</Badge>
                    <p className="text-sm text-red-600">
                      Higher rates apply during {hotel.festivalsNearby?.join(', ')}
                    </p>
                  </div>
                )}
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkInDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={checkInDate}
                          onSelect={(date) => {
                            if (date) {
                              setCheckInDate(date);
                              // If check-out date is before or same as check-in date, update it
                              if (checkOutDate <= date) {
                                setCheckOutDate(addDays(date, 1));
                              }
                            }
                          }}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-out Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOutDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {checkOutDate ? format(checkOutDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={checkOutDate}
                          onSelect={(date) => date && setCheckOutDate(date)}
                          initialFocus
                          disabled={(date) => date <= checkInDate}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="adults" className="block text-sm font-medium mb-2">
                        Adults
                      </label>
                      <Select value={adults} onValueChange={setAdults}>
                        <SelectTrigger id="adults">
                          <SelectValue placeholder="Adults" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(10)].map((_, i) => (
                            <SelectItem key={i} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="children" className="block text-sm font-medium mb-2">
                        Children
                      </label>
                      <Select value={children} onValueChange={setChildren}>
                        <SelectTrigger id="children">
                          <SelectValue placeholder="Children" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(11)].map((_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="room-type" className="block text-sm font-medium mb-2">
                      Room Type
                    </label>
                    <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                      <SelectTrigger id="room-type">
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        {hotel.rooms.map((room, index) => (
                          <SelectItem key={index} value={room.type}>
                            {room.type} (₹{Math.round(basePrice * room.priceMultiplier).toLocaleString()})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">₹{finalPrice.toLocaleString()} x {durationInDays} nights</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleBooking}
                >
                  {isAuthenticated ? 'Book Now' : 'Sign in to Book'}
                </Button>
                
                <div className="mt-4 text-sm text-gray-600">
                  <div className="flex items-center mb-1">
                    <Shield className="h-4 w-4 mr-1 text-green-500" />
                    <span>Secure booking process</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Coffee className="h-4 w-4 mr-1 text-green-500" />
                    <span>Free cancellation available</span>
                  </div>
                  <div className="flex items-center">
                    <Wifi className="h-4 w-4 mr-1 text-green-500" />
                    <span>Free Wi-Fi in all rooms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Similar Hotels Section */}
        {similarHotels.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Similar Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HotelDetails;
