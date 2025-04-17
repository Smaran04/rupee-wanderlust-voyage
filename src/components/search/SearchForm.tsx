import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { CalendarIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { destinations } from '@/data/mockData';

interface SearchFormProps {
  isHorizontal?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ isHorizontal = false }) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the search parameters
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (checkInDate) params.set('checkIn', checkInDate.toISOString());
    if (checkOutDate) params.set('checkOut', checkOutDate.toISOString());
    params.set('adults', adults);
    params.set('children', children);
    
    // Navigate to hotels page with search params
    navigate(`/hotels?${params.toString()}`);
  };

  const containerClasses = isHorizontal 
    ? "flex flex-col md:flex-row gap-4 items-end" 
    : "space-y-4";

  return (
    <form onSubmit={handleSearch} className={cn("w-full", containerClasses)}>
      <div className={isHorizontal ? "w-full md:w-1/3" : "w-full"}>
        <label htmlFor="destination" className="block text-sm font-medium mb-2">
          Destination
        </label>
        <Select value={destination} onValueChange={setDestination}>
          <SelectTrigger id="destination">
            <SelectValue placeholder="Where are you going?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Destinations</SelectItem>
            {destinations.map(dest => (
              <SelectItem key={dest.id} value={dest.id.toString()}>
                {dest.name}, {dest.country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={isHorizontal ? "w-full md:w-1/4" : "w-full"}>
        <label className="block text-sm font-medium mb-2">
          Check-in Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !checkInDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkInDate ? format(checkInDate, "PPP") : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkInDate}
              onSelect={setCheckInDate}
              initialFocus
              disabled={(date) => date < new Date()}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className={isHorizontal ? "w-full md:w-1/4" : "w-full"}>
        <label className="block text-sm font-medium mb-2">
          Check-out Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !checkOutDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkOutDate ? format(checkOutDate, "PPP") : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkOutDate}
              onSelect={setCheckOutDate}
              initialFocus
              disabled={(date) => date < (checkInDate || new Date())}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className={isHorizontal ? "w-full md:w-1/4 flex gap-4" : "w-full flex gap-4"}>
        <div className="w-1/2">
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
        <div className="w-1/2">
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

      <Button 
        type="submit" 
        className={cn(
          "w-full", 
          isHorizontal && "md:w-auto mt-4 md:mt-0",
          "bg-travel-600 text-white"
        )}
      >
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
