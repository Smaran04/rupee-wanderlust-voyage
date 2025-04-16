
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { CreditCard, Wallet, QrCode, Check, ShieldCheck, File, Map, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from "@/hooks/use-toast";
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { hotels } from '@/data/mockData';

const Booking = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const roomType = queryParams.get('roomType') || '';
  const checkInStr = queryParams.get('checkIn') || '';
  const checkOutStr = queryParams.get('checkOut') || '';
  const adults = queryParams.get('adults') || '2';
  const children = queryParams.get('children') || '0';
  const pricePerNight = Number(queryParams.get('price')) || 0;
  const nights = Number(queryParams.get('nights')) || 1;
  
  const checkInDate = checkInStr ? new Date(checkInStr) : new Date();
  const checkOutDate = checkOutStr ? new Date(checkOutStr) : new Date();
  
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const hotel = hotels.find(h => h.id === Number(hotelId));
  
  // Calculate totals
  const totalPrice = pricePerNight * nights;
  const taxes = Math.round(totalPrice * 0.18); // 18% tax
  const grandTotal = totalPrice + taxes;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectAfterLogin: `/booking/${hotelId}${location.search}` } });
      return;
    }
    
    if (!hotel) {
      navigate('/hotels');
      return;
    }
    
    // Pre-fill user info if available
    if (user) {
      setFullName(user.name);
      setEmail(user.email);
      if (user.phone) setPhone(user.phone);
    }
  }, [hotel, hotelId, navigate, user, isAuthenticated, location.search]);
  
  if (!hotel) {
    return null;
  }
  
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a booking summary to pass to success page
    const bookingDetails = {
      bookingId: `BK${Date.now().toString().slice(-8)}`,
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomType,
      checkIn: checkInDate.toISOString(),
      checkOut: checkOutDate.toISOString(),
      adults,
      children,
      pricePerNight,
      nights,
      totalPrice,
      taxes,
      grandTotal,
      guestName: fullName,
      guestEmail: email,
      guestPhone: phone,
      specialRequests,
      paymentMethod,
      bookingDate: new Date().toISOString(),
    };
    
    // Store booking details in localStorage (in a real app, this would be stored in a database)
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(bookingDetails);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Navigate to success page with booking ID
    navigate('/success', { state: { bookingDetails } });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to={`/hotels/${hotelId}`} className="text-travel-600 hover:underline mb-2 inline-block">
            &larr; Back to hotel
          </Link>
          <h1 className="text-3xl font-bold">Complete Your Booking</h1>
          <p className="text-gray-600 mt-2">
            You're just a few steps away from confirming your stay at {hotel.name}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/*  Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleBooking}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                          <Textarea
                            id="specialRequests"
                            placeholder="Any special requests or requirements?"
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            className="resize-none"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                      <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                        <TabsList className="grid grid-cols-3 w-full">
                          <TabsTrigger value="card">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Credit Card
                          </TabsTrigger>
                          <TabsTrigger value="upi">
                            <QrCode className="h-4 w-4 mr-2" />
                            UPI
                          </TabsTrigger>
                          <TabsTrigger value="crypto">
                            <Wallet className="h-4 w-4 mr-2" />
                            Crypto
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="card" className="mt-4">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input id="expiryDate" placeholder="MM/YY" />
                              </div>
                              <div>
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="cardName">Name on Card</Label>
                              <Input id="cardName" placeholder="John Doe" />
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="upi" className="mt-4">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="upiId">UPI ID</Label>
                              <Input
                                id="upiId"
                                placeholder="yourname@bank"
                              />
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg text-center">
                              <p className="text-gray-600 mb-2">
                                Or scan this QR code to pay directly
                              </p>
                              <div className="w-48 h-48 bg-gray-200 mx-auto flex items-center justify-center">
                                <span className="text-sm text-gray-500">QR Code Placeholder</span>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="crypto" className="mt-4">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="walletAddress">Select Cryptocurrency</Label>
                              <select
                                id="crypto"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="btc">Bitcoin (BTC)</option>
                                <option value="eth">Ethereum (ETH)</option>
                                <option value="usdt">Tether (USDT)</option>
                                <option value="usdc">USD Coin (USDC)</option>
                              </select>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-600 mb-2">
                                Send <span className="font-semibold">0.0043 BTC</span> to the following address:
                              </p>
                              <div className="flex items-center justify-between bg-white p-2 rounded border">
                                <code className="text-xs md:text-sm truncate">
                                  3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5
                                </code>
                                <Button size="sm" variant="ghost">
                                  Copy
                                </Button>
                              </div>
                              <p className="text-xs text-gray-500 mt-2">
                                Payment will be confirmed after 1 network confirmation
                              </p>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    <div className="flex items-start space-x-2 mt-6">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-gray-600">
                        By clicking "Confirm Booking", you agree to our{' '}
                        <a href="#" className="text-travel-600 hover:underline">Terms and Conditions</a>{' '}
                        and acknowledge that you have read our{' '}
                        <a href="#" className="text-travel-600 hover:underline">Privacy Policy</a>.
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Confirm Booking'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{hotel.name}</h3>
                      <p className="text-sm text-gray-600">{hotel.address}</p>
                    </div>
                    <img 
                      src={hotel.images[0]} 
                      alt={hotel.name} 
                      className="w-20 h-16 object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mt-4">
                    <Map className="h-4 w-4 mr-1" />
                    <a 
                      href={`https://maps.google.com/?q=${hotel.address}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      View on map
                    </a>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3 mb-6">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Room Type</p>
                      <p className="font-medium">{roomType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Guests</p>
                      <p className="font-medium">{adults} Adults, {children} Children</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Nights</p>
                      <p className="font-medium">{nights}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Check-in</p>
                      <p className="font-medium">{format(checkInDate, 'EEE, MMM d, yyyy')}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Check-out</p>
                      <p className="font-medium">{format(checkOutDate, 'EEE, MMM d, yyyy')}</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">₹{pricePerNight.toLocaleString()} x {nights} nights</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes (18%)</span>
                    <span>₹{taxes.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-start space-x-2 text-sm">
                    <ShieldCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Your payment is secured with industry-standard encryption</span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <File className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">You will receive a booking confirmation email and voucher</span>
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <Info className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Customer support is available 24/7 for any queries</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
