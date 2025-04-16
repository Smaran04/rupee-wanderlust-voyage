
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Travel Ease</h3>
            <p className="text-gray-300 mb-4">
              Discover incredible destinations and book your perfect stay with Travel Ease, 
              your trusted partner in travel since 2023.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-travel-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-travel-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-travel-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" className="text-gray-300 hover:text-travel-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-travel-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/hotels" className="text-gray-300 hover:text-travel-400 transition-colors">Hotels</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-travel-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-travel-400 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-travel-400 transition-colors">Sign Up</Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-xl font-bold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations/1" className="text-gray-300 hover:text-travel-400 transition-colors">Taj Mahal, Agra</Link>
              </li>
              <li>
                <Link to="/destinations/2" className="text-gray-300 hover:text-travel-400 transition-colors">Goa Beaches</Link>
              </li>
              <li>
                <Link to="/destinations/3" className="text-gray-300 hover:text-travel-400 transition-colors">Jaipur, Rajasthan</Link>
              </li>
              <li>
                <Link to="/destinations/4" className="text-gray-300 hover:text-travel-400 transition-colors">Varanasi, Uttar Pradesh</Link>
              </li>
              <li>
                <Link to="/destinations/5" className="text-gray-300 hover:text-travel-400 transition-colors">Munnar, Kerala</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-travel-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Travel Street, Tourism District, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-travel-400 flex-shrink-0" />
                <span className="text-gray-300">+91 9703503111</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-travel-400 flex-shrink-0" />
                <a href="mailto:travel09ease@gmail.com" className="text-gray-300 hover:text-travel-400 transition-colors">
                  travel09ease@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Travel Ease. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
