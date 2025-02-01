'use client'
import React, { useState } from 'react'
import { ArrowLeft, Search, Share2, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

function MenuPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [vegOnly, setVegOnly] = useState(false)
  const [activeTab, setActiveTab] = useState(1)
  const [search, setSearch] = useState('')
  
  const name = params.get('n') || ''

  const tabs = [
    { id: 1, name: "All", emoji: "🍽️" },
    { id: 2, name: "Popular", emoji: "⭐" },
    { id: 3, name: "Idly", emoji: "🍚" },
    { id: 4, name: "Dosa", emoji: "🥞" },
    { id: 5, name: "Snacks", emoji: "🥨" },
    { id: 6, name: "Non-Veg", emoji: "🍗" },
    { id: 7, name: "Desserts", emoji: "🍨" }
  ]

  const menu = [
    {
      id: 1,
      tab: 3,
      name: "Plain Idly",
      price: 40,
      veg: true,
      desc: "Soft and fluffy steamed rice cakes served with chutney and sambar",
      img: "/idli.webp",
      popular: true,
      rating: 4.5,
      extras: ["Extra Sambar", "Extra Chutney"]
    },
    {
      id: 2, 
      tab: 3,
      name: "Ghee Karam Idly",
      price: 60,
      veg: true,
      desc: "Idly tossed in ghee and spicy karam powder",
      img: "/ghee-karam-idli.webp",
      popular: true,
      rating: 4.3,
      extras: ["Extra Ghee", "Extra Karam"]
    },
    {
      id: 3,
      tab: 4, 
      name: "Masala Dosa",
      price: 80,
      veg: true,
      desc: "Crispy dosa with spiced potato filling, served with chutney and sambar",
      img: "/masala-dosa.webp",
      popular: true,
      rating: 4.6,
      extras: ["Extra Potato", "Extra Chutney"]
    },
    {
      id: 4,
      tab: 6,
      name: "Chicken Biryani",
      price: 200,
      veg: false,
      desc: "Aromatic rice cooked with tender chicken and special spices",
      img: "/biryani.webp",
      popular: true,
      rating: 4.4,
      extras: ["Extra Raita", "Extra Gravy"]
    }
  ]

  const filterMenu = () => {
    return menu.filter(item => {
      const matchesTab = activeTab === 1 || 
                        (activeTab === 2 && item.popular) || 
                        item.tab === activeTab
      const matchesVeg = !vegOnly || item.veg
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.desc.toLowerCase().includes(search.toLowerCase())
      return matchesTab && matchesVeg && matchesSearch
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 left-0 right-0 bg-white z-20 shadow-sm">
        <div className="flex items-center px-4 h-16">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 ml-4">
            <h1 className="font-semibold text-gray-900">{name}</h1>
            <p className="text-sm text-gray-500">South Indian, Chinese</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-4 py-2 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search menu items..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Veg Only</span>
              <button 
                onClick={() => setVegOnly(!vegOnly)}
                className={`w-12 h-6 rounded-full transition-colors ${vegOnly ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${
                  vegOnly ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100">
          <div className="flex gap-4 overflow-x-auto px-4 py-3 no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center min-w-[72px] ${
                  activeTab === tab.id ? 'text-yellow-600' : 'text-gray-500'
                }`}
              >
                <div className={`w-14 h-14 rounded-full mb-1 flex items-center justify-center bg-white shadow-sm
                  ${activeTab === tab.id ? 'ring-2 ring-yellow-400' : ''}`}>
                  <span className="text-2xl">{tab.emoji}</span>
                </div>
                <span className="text-xs font-medium whitespace-nowrap">
                  {tab.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-20 px-4">
        <div className="space-y-4">
          {filterMenu().map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {item.veg ? (
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
                  <p className="text-sm text-gray-500 mb-2">{item.desc}</p>
                  <p className="text-base font-semibold">₹{item.price}</p>
                  {item.extras?.length > 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      Customizable
                    </p>
                  )}
                </div>
                <div className="relative w-24 h-24">
                  <Image
                    src={item.img}
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
              {item.extras?.length > 0 && (
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                  <div className="flex gap-2">
                    {item.extras.map((opt, i) => (
                      <span key={i} className="text-xs text-gray-500">
                        {opt} {i < item.extras.length - 1 ? '•' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button className="w-full bg-yellow-400 text-gray-900 font-medium py-3 rounded-lg">
          View Cart
        </button>
      </div>
    </div>
  )
}

export default MenuPage