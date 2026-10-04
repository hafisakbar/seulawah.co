import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.png"
          alt="Seulawah.Co Beachfront"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto flex flex-col items-center mt-16">

        {/* Floating Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-xl"
        >
          <div className="flex text-yellow-400">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" className="text-yellow-400/50" />
          </div>
          <span className="text-white text-sm font-medium">4.4 | 100+ Reviews</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-white mb-6 leading-tight drop-shadow-lg"
        >
          Ngopi Santai dengan View Laut Terbaik di Meulaboh
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl font-inter drop-shadow-md"
        >
          Nikmati sunset, live music, dan menu mulai Rp25.000 dengan vibes paling asik.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <a href="#menu" className="group flex items-center justify-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-sunset-500/30">
            Lihat Menu
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a href="#location" className="group flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/50 px-8 py-4 rounded-full font-poppins font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
            <MapPin size={20} />
            Rute ke Lokasi
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-white/50 flex justify-center p-2">
          <div className="w-1.5 h-3 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
