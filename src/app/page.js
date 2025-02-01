// app/page.js

'use client'
import React, { useState } from 'react';
import { Home, Navigation, Plus, MoreVertical, Search, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HomePage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const restaurants = [
    {
      id: 1,
      name: "Beverage/Water bottle (Unos)",
      image: "/images/hotel.webp",
      type: "dark",
      rating: "4.5",
      deliveryTime: "20-25",
      isVeg: false,
      cuisines: ["Beverages", "Water"]
    },
    {
      id: 2,
      name: "Konaseema Kitchen",
      image: "/images/hotel.webp",
      type: "sunset",
      rating: "4.2",
      deliveryTime: "25-30",
      isVeg: true,
      cuisines: ["South Indian", "Andhra"]
    },
    {
      id: 3,
      name: "99 Pancakes",
      image: "/images/hotel.webp",
      type: "gradient",
      rating: "4.3",
      deliveryTime: "15-20",
      isVeg: true,
      cuisines: ["Desserts", "Beverages"]
    },
    {
      id: 4,
      name: "Wow Coco",
      image: "/images/hotel.webp",
      type: "mascot",
      rating: "4.4",
      deliveryTime: "20-25",
      isVeg: true,
      cuisines: ["Ice Cream", "Beverages"]
    },
    {
      id: 5,
      name: "Malabaris The Kerala Kitchen",
      image: "/images/hotel.webp",
      type: "light",
      rating: "4.1",
      deliveryTime: "30-35",
      isVeg: false,
      cuisines: ["Kerala", "South Indian"]
    },
    {
      id: 6,
      name: "Shasha Shandaar Shawarma",
      image: "/images/hotel.webp",
      type: "dark",
      rating: "4.0",
      deliveryTime: "25-30",
      isVeg: false,
      cuisines: ["Arabian", "Lebanese"]
    }
  ];

  const categories = [
    { id: 1, name: "All", icon: "🍽️" },
    { id: 2, name: "South Indian", icon: "🥘" },
    { id: 3, name: "Fast Food", icon: "🍔" },
    { id: 4, name: "Desserts", icon: "🍨" },
    { id: 5, name: "Beverages", icon: "🥤" }
  ];

  const handleRestaurantClick = (restaurant) => {
    router.push(`/menu/${restaurant.id}?name=${encodeURIComponent(restaurant.name)}&isVeg=${restaurant.isVeg}`);
  };

  const [selectedCategory, setSelectedCategory] = useState(1);

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-md z-10">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 rounded-lg p-2">
              <Image 
                src="/images/unos-logo.png" 
                alt="Unos" 
                width={32}
                height={32}
                className="rounded-md"
              />
            </div>
            <div>
              <h1 className="font-bold text-gray-800">Unos Food Market</h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Location</p>
                <button className="text-yellow-600">
                  <Navigation className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 transition-colors text-gray-800 font-medium rounded-full px-6 py-2 text-sm shadow-sm">
            Dine In
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white p-4 border-b border-yellow-100">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurants, dishes..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-yellow-50"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white py-4 border-b border-yellow-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center min-w-[76px] ${
                  selectedCategory === category.id ? 'text-yellow-600' : 'text-gray-500'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl mb-2 flex items-center justify-center bg-white shadow-sm
                  ${selectedCategory === category.id ? 'ring-2 ring-yellow-400' : ''}`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <span className="text-xs font-medium whitespace-nowrap">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {restaurants
            .filter(restaurant => 
              restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              restaurant.cuisines.some(cuisine => 
                cuisine.toLowerCase().includes(searchQuery.toLowerCase())
              )
            )
            .map((restaurant) => (
              <div 
                key={restaurant.id}
                onClick={() => handleRestaurantClick(restaurant)}
                className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <div className="aspect-square relative">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-opacity" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg leading-tight mb-2">
                    {restaurant.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {restaurant.cuisines.map((cuisine, index) => (
                      <span key={index} className="text-xs text-white/90">
                        {index > 0 && "•"} {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-yellow-100 py-2">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-around items-center">
            <button className="p-2 text-yellow-600">
              <Home className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-400">
              <Navigation className="w-6 h-6" />
            </button>
            <button className="bg-yellow-400 p-3 rounded-full shadow-lg -mt-8">
              <Plus className="w-6 h-6 text-gray-800" />
            </button>
            <button className="p-2 text-gray-400">
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-400">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;