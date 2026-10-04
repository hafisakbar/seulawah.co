import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, MapPin } from 'lucide-react';

const PeakHours = () => {
  const [visitorCount, setVisitorCount] = useState(23);

  // Fake live visitor count simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
        const newValue = prev + change;
        return newValue < 15 ? 15 : (newValue > 50 ? 50 : newValue);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-ocean-900 border-t border-ocean-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-ocean-800/50 p-6 md:p-8 rounded-3xl border border-ocean-700">
          
          <div className="flex items-center gap-4">
            <div className="bg-red-500/20 p-4 rounded-full">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.6)]" />
            </div>
            <div>
              <p className="text-ocean-100 font-poppins font-medium">Jam Ramai 🔥</p>
              <h3 className="text-2xl text-white font-bold">18:00 - 22:00</h3>
            </div>
          </div>

          <div className="hidden md:block w-[2px] h-16 bg-ocean-700" />

          <div className="flex items-center gap-4">
            <div className="bg-ocean-700 p-4 rounded-xl text-white">
              <Users size={28} />
            </div>
            <div>
              <p className="text-ocean-100 font-poppins font-medium">Live Visitors</p>
              <h3 className="text-2xl text-white font-bold">{visitorCount} orang sedang di sini</h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PeakHours;
