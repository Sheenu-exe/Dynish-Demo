
'use client'
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Heart, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const MenuPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get restaurant info from URL params
  const restaurantName = searchParams.get('name') || '';
  const initialVegOnly = searchParams.get('isVeg') === 'true';

  const categories = [
    { id: 1, name: "All Items", icon: "🍽️" },
    { id: 2, name: "Recommended", icon: "⭐" },
    { id: 3, name: "Idly", icon: "🍚" },
    { id: 4, name: "Dosa", icon: "🥞" },
    { id: 5, name: "Snacks", icon: "🥨" },
    { id: 6, name: "Non-Veg", icon: "🍗" },
    { id: 7, name: "Desserts", icon: "🍨" }
  ];

  const menuItems = [
    {
      id: 1,
      categoryId: 3,
      name: "Plain Idly",
      price: 40,
      isVeg: true,
      description: "Soft and fluffy steamed rice cakes served with chutney and sambar",
      image: "/idli.webp",
      isRecommended: true,
      rating: 4.5,
      customization: ["Extra Sambar", "Extra Chutney"]
    },
    {
      id: 2,
      categoryId: 3,
      name: "Ghee Karam Idly",
      price: 60,
      isVeg: true,
      description: "Idly tossed in ghee and spicy karam powder",
      image: "/ghee-karam-idli.webp",
      isRecommended: true,
      rating: 4.3,
      customization: ["Extra Ghee", "Extra Karam"]
    },
    {
      id: 3,
      categoryId: 4,
      name: "Masala Dosa",
      price: 80,
      isVeg: true,
      description: "Crispy dosa with spiced potato filling, served with chutney and sambar",
      image: "/masala-dosa.webp",
      isRecommended: true,
      rating: 4.6,
      customization: ["Extra Potato", "Extra Chutney"]
    },
    {
      id: 4,
      categoryId: 6,
      name: "Chicken Biryani",
      price: 200,
      isVeg: false,
      description: "Aromatic rice cooked with tender chicken and special spices",
      image: "/biryani.webp",
      isRecommended: true,
      rating: 4.4,
      customization: ["Extra Raita", "Extra Gravy"]
    }
  ];

  const handleBack = () => {
    router.back();
  };

  // Filter menu items based on category, veg/non-veg, and search
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 1 || 
                          (selectedCategory === 2 && item.isRecommended) || 
                          item.categoryId === selectedCategory;
    const matchesVegFilter = !isVegOnly || item.isVeg;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesVegFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen Inter-Reg bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 bg-white z-20 shadow-sm">
        <div className="flex items-center px-4 h-16">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={handleBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 ml-4">
            <h1 className="font-semibold text-gray-900">{restaurantName}</h1>
            <p className="text-sm text-gray-500">South Indian, Chinese</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Veg Only</span>
              <button 
                className={`w-12 h-6 rounded-full transition-colors ${isVegOnly ? 'bg-green-500' : 'bg-gray-200'}`}
                onClick={() => setIsVegOnly(!isVegOnly)}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                  isVegOnly ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="border-t border-gray-100">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 py-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center min-w-[72px] ${
                  selectedCategory === category.id ? 'text-yellow-600' : 'text-gray-500'
                }`}
              >
                <div className={`w-14 h-14 rounded-full mb-1 flex items-center justify-center bg-white shadow-sm
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

      {/* Menu Items */}
      <div className="pb-20 px-4">
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {item.isVeg ? (
                      <div className="w-4 h-4 border-2 border-green-600 p-0.5 rounded-full">
                        <div className="w-full h-full bg-green-600 rounded-full" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 border-2 border-red-600 p-0.5 rounded-full">
                        <div className="w-full h-full bg-red-600 rounded-full" />
                      </div>
                    )}
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    {item.rating && (
                      <span className="bg-green-50 text-green-600 text-xs px-2 py-0.5 rounded-full">
                        ⭐ {item.rating}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                  <p className="text-base font-semibold">₹{item.price}</p>
                  {item.customization && (
                    <p className="text-xs text-gray-400 mt-1">
                      Customizable
                    </p>
                  )}
                </div>
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <button className="absolute bottom-2 right-2 bg-white text-gray-900 px-4 py-1 rounded-lg text-sm font-medium shadow-sm">
                    ADD
                  </button>
                </div>
              </div>
              {item.customization && (
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                  <div className="flex gap-2">
                    {item.customization.map((option, index) => (
                      <span key={index} className="text-xs text-gray-500">
                        {option} {index < item.customization.length - 1 ? '•' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cart Preview (if needed) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button className="w-full bg-yellow-400 text-gray-900 font-medium py-3 rounded-lg">
          View Cart
        </button>
      </div>
    </div>
  );
};

export default MenuPage;