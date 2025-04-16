
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from "@/hooks/use-toast";
import Layout from '@/components/layout/Layout';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible!",
    });
    
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setIsSubmitting(false);
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-travel-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="max-w-2xl mx-auto text-travel-100">
            Have questions about your booking, need travel advice, or want to partner with us?
            Our team is here to help you every step of the way.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help you?"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message here..."
                    rows={5}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-travel-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg">Email Us</h3>
                      <p className="text-gray-600 mt-1">
                        Our team will respond within 24 hours
                      </p>
                      <a 
                        href="mailto:travel09ease@gmail.com"
                        className="text-travel-600 hover:underline mt-2 inline-block"
                      >
                        travel09ease@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-travel-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg">Call Us</h3>
                      <p className="text-gray-600 mt-1">
                        Available Monday-Friday, 9am-6pm IST
                      </p>
                      <a 
                        href="tel:+919703503111"
                        className="text-travel-600 hover:underline mt-2 inline-block"
                      >
                        +91 9703503111
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-travel-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg">Visit Us</h3>
                      <p className="text-gray-600 mt-1">
                        123 Travel Street, Tourism District<br />
                        Bangalore, Karnataka 560001<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden h-64 md:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.6309395!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1650450826126!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">How can I modify or cancel my booking?</h3>
                <p className="mt-2 text-gray-600">
                  You can modify or cancel your booking by logging into your account and navigating to the "My Bookings" section. 
                  Alternatively, you can contact our customer support team with your booking reference.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">What payment methods do you accept?</h3>
                <p className="mt-2 text-gray-600">
                  We accept credit cards, UPI payments, and various cryptocurrency options for booking payments. 
                  All transactions are secure and encrypted.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">How do I get my booking confirmation?</h3>
                <p className="mt-2 text-gray-600">
                  Once your booking is confirmed, we'll send a confirmation email and SMS to the contact details provided during booking. 
                  You can also view and download your booking details from your account.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">Is my personal information secure?</h3>
                <p className="mt-2 text-gray-600">
                  Yes, we take data protection seriously. Your personal information is encrypted and securely stored 
                  in accordance with industry standards and privacy regulations.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">How can I become a hotel partner?</h3>
                <p className="mt-2 text-gray-600">
                  If you're interested in listing your property on our platform, please send an email to 
                  partners@travelease.com with details about your property, and our partnership team will get in touch with you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
