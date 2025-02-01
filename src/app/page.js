'use client'
import React, { useState } from 'react'
import { Home, Navigation, Plus, MoreVertical, Search, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const restaurants = [
  {
    id: 1,
    name: "Beverage/Water bottle (Unos)",
    img: "/hotel.webp",
    rating: "4.5",
    time: "20-25",
    veg: false,
    tags: ["Beverages", "Water"],
    hasOrdering: true,
  },
  {
    id: 2,
    name: "Konaseema Kitchen",
    img: "/hotel.webp",
    rating: "4.2", 
    time: "25-30",
    veg: true,
    tags: ["South Indian", "Andhra"],
    hasOrdering: true,
  },
  {
    id: 3,
    name: "99 Pancakes",
    img: "/hotel.webp",
    rating: "4.3",
    time: "15-20",
    veg: true,
    tags: ["Desserts", "Beverages"],
    hasOrdering: false,
  },
  {
    id: 4,
    name: "Wow Coco",
    img: "/hotel.webp", 
    rating: "4.4",
    time: "20-25",
    veg: true,
    tags: ["Ice Cream", "Beverages"],
    hasOrdering: true,
  },
  {
    id: 5,
    name: "Malabaris",
    img: "/hotel.webp",
    rating: "4.1",
    time: "30-35",
    veg: false,
    tags: ["Kerala", "South Indian"],
    hasOrdering: false,
  },
  {
    id: 6,
    name: "Shasha Shawarma",
    img: "/hotel.webp",
    rating: "4.0",
    time: "25-30",
    veg: false,
    tags: ["Arabian", "Lebanese"],
    hasOrdering: true,
  },
]

const categories = [
  { id: 1, name: "All", emoji: "🍽️" },
  { id: 2, name: "South Indian", emoji: "🥘" },
  { id: 3, name: "Fast Food", emoji: "🍔" },
  { id: 4, name: "Desserts", emoji: "🍨" }, 
  { id: 5, name: "Beverages", emoji: "🥤" },
]

function HomePage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState(1)

  const goToMenu = (rest) => {
    router.push(`/menu/${rest.id}?n=${rest.name}&v=${rest.veg}&o=${rest.hasOrdering}`)
  }

  const filterRestaurants = (type) => {
    return restaurants.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
        r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      return type === 'order' ? (r.hasOrdering && matchesSearch) : (!r.hasOrdering && matchesSearch)
    })
  }

  return (
    <div className="min-h-screen bg-yellow-50">
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
              <h1 className="font-bold text-gray-800">Unos Food</h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Location</p>
                <button className="text-yellow-600">
                  <Navigation className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-full px-6 py-2 text-sm shadow-sm">
            Dine In
          </button>
        </div>
      </header>

      <div className="bg-white p-4 border-b border-yellow-100">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Find food or restaurants..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-yellow-50"
            />
          </div>
        </div>
      </div>

      <div className="bg-white py-4 border-b border-yellow-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center min-w-[76px] ${
                  activeCategory === cat.id ? 'text-yellow-600' : 'text-gray-500'
                }`}
              >
                <div className={`w-16 h-16 rounded-xl mb-2 flex items-center justify-center bg-white shadow-sm
                  ${activeCategory === cat.id ? 'ring-2 ring-yellow-400' : ''}`}>
                  <span className="text-2xl">{cat.emoji}</span>
                </div>
                <span className="text-xs font-medium whitespace-nowrap">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Order Now</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {filterRestaurants('order').map(rest => (
            <div 
              key={rest.id}
              onClick={() => goToMenu(rest)}
              className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg cursor-pointer"
            >
              <div className="aspect-square relative">
                <Image
                  src={rest.img}
                  alt={rest.name}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg leading-tight mb-2">
                  {rest.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                    ★ {rest.rating}
                  </span>
                  <span className="text-white text-xs">
                    {rest.time} mins
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {rest.tags.map((tag, i) => (
                    <span key={i} className="text-xs text-white/90">
                      {i > 0 && "•"} {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Menu Only</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {filterRestaurants('menu').map(rest => (
            <div 
              key={rest.id}
              onClick={() => goToMenu(rest)}
              className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg cursor-pointer"
            >
              <div className="aspect-square relative">
                <Image
                  src={rest.img}
                  alt={rest.name}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg leading-tight mb-2">
                  {rest.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded">
                    Menu Only
                  </span>
                  <span className="text-white text-xs">
                    ★ {rest.rating}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {rest.tags.map((tag, i) => (
                    <span key={i} className="text-xs text-white/90">
                      {i > 0 && "•"} {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
  )
}

export default HomePage