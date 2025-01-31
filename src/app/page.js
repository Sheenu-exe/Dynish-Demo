'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Clock, MapPin, ChevronRight, Heart, Filter, TrendingUp, Award, Zap, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BottomNavigation from '@/components/dock';

const PremiumRestaurantUI = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [isScrolled, setIsScrolled] = useState(false);

  const restaurants = [
    {
      name: "Sample Ruthuvu",
      rating: 4.5,
      time: "25-30 min",
      distance: "1.2 km",
      image: "/hotel.webp",
      cuisine: "Indian",
      priceRange: "$$",
      isPromoted: true,
      tags: ["Trending", "Popular"],
      deliveryFee: "Free",
      minOrder: "₹200",
      offers: ["50% off up to ₹100", "Free delivery"]
    },
    {
      name: "Hyderabad Chef's",
      rating: 4.2,
      time: "35-40 min",
      distance: "2.5 km",
      image: "/hotel.webp",
      cuisine: "Indian",
      priceRange: "$$$",
      isPromoted: false,
      tags: ["Premium"],
      deliveryFee: "₹40",
      minOrder: "₹300",
      offers: ["20% off on orders above ₹500"]
    },
    {
      name: "KFC India",
      rating: 4.0,
      time: "20-25 min",
      distance: "0.8 km",
      image: "/hotel.webp",
      cuisine: "Fast Food",
      priceRange: "$$",
      isPromoted: true,
      tags: ["Fast Delivery"],
      deliveryFee: "₹30",
      minOrder: "₹200",
      offers: ["Buy 1 Get 1 Free"]
    },
    {
      name: "Pizza Palace",
      rating: 4.3,
      time: "30-35 min",
      distance: "1.5 km",
      image: "/hotel.webp",
      cuisine: "Italian",
      priceRange: "$$",
      isPromoted: false,
      tags: ["New"],
      deliveryFee: "₹50",
      minOrder: "₹400",
      offers: ["15% off on first order"]
    }
  ];

  const cuisineTypes = ["Indian", "Chinese", "Italian", "Fast Food", "Thai", "Mexican"];
  const sortOptions = ["recommended", "rating", "delivery-time", "distance"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = (restaurantName) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(restaurantName)) {
        newFavorites.delete(restaurantName);
      } else {
        newFavorites.add(restaurantName);
      }
      return newFavorites;
    });
  };

  const FilterDialog = () => (
    <Dialog open={showFilters} onOpenChange={setShowFilters}>
      <DialogContent className="w-[90%] h-[60vh] rounded-lg'">
        <DialogHeader>
          <DialogTitle>Filter & Sort</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 rounded-md  py-2 w-[90%] ">
          <div>
            <h3 className="text-lg font-semibold mb-3">Cuisines</h3>
            <div className="flex flex-wrap gap-2">
              {cuisineTypes.map((cuisine) => (
                <Button
                  key={cuisine}
                  variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
                  onClick={() => {
                    setSelectedCuisines(prev =>
                      prev.includes(cuisine)
                        ? prev.filter(c => c !== cuisine)
                        : [...prev, cuisine]
                    );
                  }}
                  className="rounded-full"
                >
                  {cuisine}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Price Range</h3>
            <Tabs value={priceRange} onValueChange={setPriceRange}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="$">$</TabsTrigger>
                <TabsTrigger value="$$">$$</TabsTrigger>
                <TabsTrigger value="$$$">$$$</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Sort By</h3>
            <Tabs value={sortBy} onValueChange={setSortBy}>
              <TabsList className="grid grid-cols-2 gap-2">
                {sortOptions.map((option) => (
                  <TabsTrigger key={option} value={option} className="capitalize">
                    {option.replace('-', ' ')}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen Inter-Reg bg-gradient-to-b from-[#1a1a1a] to-gray-900">
    {/* Clean Header */}
    <header className="bg-[#f4bc28] py-6">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-4xl md:text-6xl font-bold mb-2"
        >
          Hungry?
          <br />
          We've got you!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/90 text-lg"
        >
          Order food from the best restaurants near you
        </motion.p>
      </div>
    </header>

    {/* Main Content */}
    
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
    
        {/* Search Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurants, cuisines, or dishes..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-2 border-gray-100 
                         focus:outline-none focus:border-[#f4bc28] focus:ring-2 focus:ring-[#f4bc28]/20
                         transition-all duration-200 text-gray-800"
              />
            </div>
            <Button
              onClick={() => setShowFilters(true)}
              className="bg-[#f4bc28] hover:bg-[#e5ad19] text-white px-6 rounded-2xl"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mt-6">
            {['All', 'Trending', 'Nearby', 'Fast Delivery', 'Top Rated'].map((filter) => (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                variant={activeFilter === filter ? "default" : "outline"}
                className={`rounded-2xl transition-all duration-200 ${
                  activeFilter === filter 
                    ? 'bg-[#f4bc28] hover:bg-[#e5ad19] text-white shadow-md' 
                    : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {filter === 'Trending' && <TrendingUp className="w-4 h-4 mr-2" />}
                {filter === 'Top Rated' && <Award className="w-4 h-4 mr-2" />}
                {filter === 'Fast Delivery' && <Zap className="w-4 h-4 mr-2" />}
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden rounded-3xl hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-60">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Button
                      onClick={() => toggleFavorite(restaurant.name)}
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md
                               ${favorites.has(restaurant.name) 
                                 ? 'bg-red-500 text-white' 
                                 : 'bg-white/30 text-white hover:bg-white/50'}`}
                    >
                      <Heart 
                        className={`w-5 h-5 ${favorites.has(restaurant.name) ? 'fill-current' : ''}`} 
                      />
                    </Button>

                    {restaurant.isPromoted && (
                      <Badge className="absolute top-4 left-4 bg-[#f4bc28] text-white">
                        Promoted
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{restaurant.name}</h3>
                        <p className="text-gray-600">{restaurant.cuisine} • {restaurant.priceRange}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-green-600 fill-current" />
                        <span className="text-green-600 font-semibold">{restaurant.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-6 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{restaurant.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{restaurant.distance}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-[#f4bc28] hover:bg-[#e5ad19] text-white rounded-2xl 
                               shadow-lg shadow-[#f4bc28]/20 group"
                    >
                      Order Now
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
   

      {/* Filter Dialog */}
      <FilterDialog />

{/* Bottom Navigation */}
<BottomNavigation />
</div>
);
};

// Utility components
const FilterTag = ({ children, active, onClick }) => (
<motion.button
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
onClick={onClick}
className={`px-4 py-2 rounded-full text-sm transition-colors duration-200
        ${active 
          ? 'bg-[#f4bc28] text-white' 
          : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
>
{children}
</motion.button>
);

// Export the component
export default PremiumRestaurantUI;