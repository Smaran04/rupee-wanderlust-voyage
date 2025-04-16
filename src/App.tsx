
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HotelListing from "./pages/HotelListing";
import HotelDetails from "./pages/HotelDetails";
import DestinationDetails from "./pages/DestinationDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import { AuthProvider } from "./context/AuthContext";
import Chatbot from "./components/chatbot/Chatbot";

// Create a new QueryClient outside of the component to avoid recreation on renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hotels" element={<HotelListing />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
            <Route path="/destinations/:id" element={<DestinationDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/booking/:hotelId" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/success" element={<CheckoutSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
