
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-travel-600">
              Travel Ease
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-travel-600 transition-colors">
              Home
            </Link>
            <Link to="/hotels" className="text-gray-700 hover:text-travel-600 transition-colors">
              Hotels
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-travel-600 transition-colors">
              Contact
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-travel-100 text-travel-700">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user?.name && <p className="font-medium">{user.name}</p>}
                      {user?.email && <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer flex w-full items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Sign up
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 mt-2 bg-white border-t animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="px-4 py-2 text-gray-700 hover:bg-travel-50 hover:text-travel-600 rounded"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/hotels" 
                className="px-4 py-2 text-gray-700 hover:bg-travel-50 hover:text-travel-600 rounded"
                onClick={() => setIsOpen(false)}
              >
                Hotels
              </Link>
              <Link 
                to="/contact" 
                className="px-4 py-2 text-gray-700 hover:bg-travel-50 hover:text-travel-600 rounded"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className="px-4 py-2 text-gray-700 hover:bg-travel-50 hover:text-travel-600 rounded flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 text-gray-700 hover:bg-travel-50 hover:text-travel-600 rounded flex items-center w-full text-left"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Button variant="outline" onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}>
                    Login
                  </Button>
                  <Button onClick={() => {
                    navigate('/signup');
                    setIsOpen(false);
                  }}>
                    Sign up
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
