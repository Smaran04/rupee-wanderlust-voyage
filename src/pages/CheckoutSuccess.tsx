
import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, User, Receipt, Download, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/layout/Layout';
import { toast } from "@/hooks/use-toast";
import { sendEmail, sendSMS } from '@/services/NotificationService';

const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;
  const [emailSent, setEmailSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!bookingDetails) {
      navigate('/');
      return;
    }
    
    // Send booking confirmation email
    const sendNotifications = async () => {
      try {
        // Format booking details for email
        const emailMessage = `
          Dear ${bookingDetails.guestName},
          
          Thank you for booking with Travel Ease!
          
          Booking Reference: ${bookingDetails.bookingId}
          Hotel: ${bookingDetails.hotelName}
          Room Type: ${bookingDetails.roomType}
          Check-in: ${format(new Date(bookingDetails.checkIn), 'EEEE, MMMM d, yyyy')}
          Check-out: ${format(new Date(bookingDetails.checkOut), 'EEEE, MMMM d, yyyy')}
          Guests: ${bookingDetails.adults} Adults, ${bookingDetails.children} Children
          Total Amount: ₹${bookingDetails.grandTotal.toLocaleString()}
          
          We look forward to welcoming you!
          
          Best regards,
          Travel Ease Team
        `;
        
        // Format booking details for SMS
        const smsMessage = `
          Travel Ease: Your booking #${bookingDetails.bookingId} for ${bookingDetails.hotelName} is confirmed. Check-in: ${format(new Date(bookingDetails.checkIn), 'MMM d')}. Total: ₹${bookingDetails.grandTotal.toLocaleString()}
        `;

        // Send email notification with the specified sender address
        const emailResult = await sendEmail({
          from: 'travel09ease@gmail.com',
          to: bookingDetails.guestEmail,
          subject: `Travel Ease Booking Confirmation #${bookingDetails.bookingId}`,
          message: emailMessage
        });
        
        if (emailResult) {
          setEmailSent(true);
          toast({
            title: "Email sent",
            description: `Booking confirmation email has been sent to ${bookingDetails.guestEmail} from travel09ease@gmail.com`,
          });
        }
        
        // Send SMS notification
        if (bookingDetails.guestPhone) {
          const smsResult = await sendSMS({
            to: bookingDetails.guestPhone,
            message: smsMessage
          });
          
          if (smsResult) {
            setSmsSent(true);
            toast({
              title: "SMS sent",
              description: `Booking confirmation SMS has been sent to ${bookingDetails.guestPhone}`,
            });
          }
        }
      } catch (error) {
        console.error("Failed to send notifications:", error);
        toast({
          title: "Notification error",
          description: "We couldn't send booking notifications. Please contact customer support.",
          variant: "destructive",
        });
      }
    };
    
    sendNotifications();
  }, [bookingDetails, navigate]);
  
  if (!bookingDetails) {
    return null;
  }
  
  const checkInDate = new Date(bookingDetails.checkIn);
  const checkOutDate = new Date(bookingDetails.checkOut);
  const bookingDate = new Date(bookingDetails.bookingDate);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Booking Confirmed!</h1>
            <p className="text-gray-600 mt-2">
              Your reservation has been successfully completed.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {emailSent && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600">
                  <Mail className="h-3.5 w-3.5 mr-1" />
                  Email notification sent
                </div>
              )}
              {smsSent && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-50 text-green-600">
                  <Phone className="h-3.5 w-3.5 mr-1" />
                  SMS notification sent
                </div>
              )}
            </div>
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold">{bookingDetails.hotelName}</h2>
                  <p className="text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {bookingDetails.hotelAddress || "Hotel Address"}
                    </span>
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="text-gray-600 text-sm">Booking Reference</div>
                  <div className="text-xl font-bold">{bookingDetails.bookingId}</div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Stay Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Check-in</div>
                        <div className="text-gray-600">
                          {format(checkInDate, 'EEEE, MMMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Check-out</div>
                        <div className="text-gray-600">
                          {format(checkOutDate, 'EEEE, MMMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <User className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Guests</div>
                        <div className="text-gray-600">
                          {bookingDetails.adults} Adults, {bookingDetails.children} Children
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Receipt className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Room Type</div>
                        <div className="text-gray-600">
                          {bookingDetails.roomType}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Payment Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Room charges</span>
                        <span>₹{bookingDetails.totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taxes</span>
                        <span>₹{bookingDetails.taxes.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between border-t pt-3 font-bold">
                      <span>Total paid</span>
                      <span>₹{bookingDetails.grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold mb-3">Guest Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        <span>{bookingDetails.guestName}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{bookingDetails.guestEmail}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{bookingDetails.guestPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold mb-2">Important Information</h3>
                <ul className="list-disc list-inside text-gray-600 ml-2 space-y-1">
                  <li>Please present your booking ID upon arrival at the hotel</li>
                  <li>Check-in time typically starts at 2:00 PM</li>
                  <li>Check-out time is usually by 12:00 PM</li>
                  <li>Free cancellation available up to 24 hours before check-in</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Download Booking Voucher
            </Button>
            <Button variant="outline" onClick={() => {
              // Resend notifications manually
              const emailMessage = `Travel Ease Booking Confirmation #${bookingDetails.bookingId}`;
              const smsMessage = `Travel Ease: Your booking #${bookingDetails.bookingId} is confirmed.`;
              
              toast({
                title: "Resending notifications",
                description: "We're sending your booking details again...",
              });
              
              sendEmail({
                to: bookingDetails.guestEmail,
                subject: "Your Travel Ease Booking (Resent)",
                message: emailMessage
              });
              
              if (bookingDetails.guestPhone) {
                sendSMS({
                  to: bookingDetails.guestPhone,
                  message: smsMessage
                });
              }
            }}>
              <Mail className="h-4 w-4 mr-2" />
              Resend Confirmations
            </Button>
            <Link to="/">
              <Button variant="outline">Return to Homepage</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutSuccess;
