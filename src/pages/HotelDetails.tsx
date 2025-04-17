
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, MapPin, Star, ImagePlus, Loader2 } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import Layout from '@/components/layout/Layout';
import Gallery from '@/components/gallery/Gallery';
import Amenities from '@/components/amenities/Amenities';
import OpenStreetMap from '@/components/maps/OpenStreetMap';
import { hotels } from '@/data/mockData';
import { Calendar } from '@/components/ui/calendar';

const HotelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });
  const [roomType, setRoomType] = useState('Standard');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!id) {
      navigate('/hotels');
      return;
    }
    
    const hotelId = parseInt(id);
    const foundHotel = hotels.find(hotel => hotel.id === hotelId);
    
    if (!foundHotel) {
      navigate('/hotels');
      return;
    }
    
    setHotel(foundHotel);
    setLoading(false);
  }, [id, navigate]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-48">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Loading hotel details...
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!hotel) {
    return null;
  }
  
  const handleBooking = () => {
    if (!date?.from || !date?.to) {
      toast({
        title: "No dates selected",
        description: "Please select check-in and check-out dates.",
      });
      return;
    }
    
    const checkIn = date.from;
    const checkOut = date.to;
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
    const price = 100;
    
    const searchParams = new URLSearchParams({
      roomType,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      adults: adults.toString(),
      children: children.toString(),
      price: price.toString(),
      nights: nights.toString(),
    });
    
    navigate(`/booking/${hotel.id}?${searchParams.toString()}`);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/hotels" className="text-travel-600 hover:underline mb-2 inline-block">
            &larr; Back to hotels
          </Link>
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <div className="flex items-center text-gray-600 mt-2">
            <Star className="h-4 w-4 mr-1" />
            <span>{hotel.rating} ({hotel.reviews} reviews)</span>
          </div>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{hotel.address}</span>
          </div>
        </div>
        
        <Gallery images={hotel.images} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About This Hotel</h2>
                <p className="text-gray-700 leading-relaxed">
                  {hotel.description}
                </p>
                
                <Separator className="my-6" />
                
                <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                <Amenities amenities={hotel.amenities} />
              </CardContent>
            </Card>
            
            <Card className="mt-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <OpenStreetMap
                  latitude={hotel.latitude}
                  longitude={hotel.longitude}
                  zoom={14}
                  markerTitle={hotel.name}
                  height="400px"
                  className="mt-6"
                />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Book Your Stay</h2>
                
                <div className="mb-4">
                  <Label htmlFor="roomType">Room Type</Label>
                  <Input
                    type="text"
                    id="roomType"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="mb-4">
                  <Label>
                    Check In - Check Out
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date?.from ? (
                            date.to ? (
                              `${format(date.from, "MMM dd, yyyy")} - ${format(
                                date.to,
                                "MMM dd, yyyy"
                              )}`
                            ) : (
                              format(date.from, "MMM dd, yyyy")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="sm:max-w-md">
                        <SheetHeader className="space-y-2 text-left">
                          <SheetTitle>Select your dates</SheetTitle>
                          {date?.from && date?.to ? (
                            date.from && date.to && isSameDay(date.from, date.to) ? (
                              <p>
                                Selected: {format(date.from, "MMM dd, yyyy")}
                              </p>
                            ) : (
                              <p>
                                Selected: {format(date.from, "MMM dd, yyyy")} to{" "}
                                {format(date.to, "MMM dd, yyyy")}
                              </p>
                            )
                          ) : (
                            <p>Please select check-in and check-out dates.</p>
                          )}
                        </SheetHeader>
                        <div className="react-day-picker">
                          <Calendar
                            defaultMonth={date?.from}
                            mode="range"
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>
                  </Label>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="adults">Adults</Label>
                  <Input
                    type="number"
                    id="adults"
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="children">Children</Label>
                  <Input
                    type="number"
                    id="children"
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <Button className="w-full bg-travel-600 text-white" onClick={handleBooking}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HotelDetails;
