'use client'
import React, { useState } from 'react';
import { Home, Search, Heart, User, ShoppingBag, Bell, Map, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showSheet, setShowSheet] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [cartCount, setCartCount] = useState(2);

  const navItems = [
    {
      id: 'home',
      icon: <Home className="w-6 h-6" />,
      label: 'Home',
      color: '#f4bc28',
    },
    {
      id: 'search',
      icon: <Search className="w-6 h-6" />,
      label: 'Search',
      color: '#ff6b6b',
    },
    {
      id: 'orders',
      icon: <ShoppingBag className="w-6 h-6" />,
      label: 'Orders',
      color: '#4ecdc4',
      badge: cartCount,
    },
    {
      id: 'favorites',
      icon: <Heart className="w-6 h-6" />,
      label: 'Saved',
      color: '#ff6b6b',
    },
    {
      id: 'notifications',
      icon: <Bell className="w-6 h-6" />,
      label: 'Alerts',
      color: '#4ecdc4',
      badge: notificationCount,
    },
    {
      id: 'more',
      icon: <Menu className="w-6 h-6" />,
      label: 'More',
      color: '#6c5ce7',
    },
  ];

  const MoreSheet = () => (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">More Options</SheetTitle>
        </SheetHeader>
        <div className="py-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl mb-6">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/avatar.jpg" alt="User" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-gray-600">Premium Member</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <Map className="w-6 h-6" />, label: 'Address' },
              { icon: <Bell className="w-6 h-6" />, label: 'Notifications' },
              { icon: <ShoppingBag className="w-6 h-6" />, label: 'Orders' },
              { icon: <Heart className="w-6 h-6" />, label: 'Favorites' },
              { icon: <User className="w-6 h-6" />, label: 'Profile' },
              { icon: <Menu className="w-6 h-6" />, label: 'Settings' },
            ].map((item, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex flex-col items-center gap-2 h-24 p-4"
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-100 
                   shadow-lg pb-safe-area-inset-bottom z-50"
      >
        <div className="max-w-lg mx-auto px-4">
          <div className="flex justify-between py-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  if (item.id === 'more') {
                    setShowSheet(true);
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className="relative flex flex-col items-center gap-1 px-3 py-2"
                whileTap={{ scale: 0.9 }}
              >
                {/* Animated Background Circle */}
                <AnimatePresence>
                  {activeTab === item.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute inset-0 bg-gray-100 rounded-full"
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <div className="relative">
                  <motion.div
                    animate={{
                      color: activeTab === item.id ? item.color : '#94a3b8',
                    }}
                    className="relative z-10"
                  >
                    {item.icon}
                  </motion.div>

                  {/* Badge */}
                  {item.badge && (
                    <Badge
                      className="absolute -top-2 -right-2 bg-red-500 text-white 
                               min-w-[10px] h-auto flex items-center justify-center 
                               rounded-full z-10 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>

                {/* Label */}
                <motion.span
                  animate={{
                    color: activeTab === item.id ? item.color : '#94a3b8',
                  }}
                  className="text-xs relative z-10"
                >
                  {item.label}
                </motion.span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* More Options Sheet */}
      <MoreSheet />
    </>
  );
};

export default BottomNavigation;