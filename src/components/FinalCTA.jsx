import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-ocean-600 to-ocean-900 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sunset-500/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-poppins font-bold text-white mb-8 leading-tight drop-shadow-md"
        >
          Tunggu Apa Lagi? Ayo Nongkrong di Seulawah.Co Hari Ini! 🌊
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-ocean-100 mb-12"
        >
          Bawa teman, pacar, atau keluarga. Makin sore makin seru!
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#location" className="group flex items-center justify-center gap-2 bg-sunset-500 hover:bg-sunset-600 text-white px-10 py-5 rounded-full font-poppins font-bold text-xl transition-all transform hover:scale-105 shadow-xl shadow-sunset-500/30">
            Gas ke Lokasi 🔥
          </a>
          
          <a href="#menu" className="group flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-10 py-5 rounded-full font-poppins font-bold text-xl transition-all">
            Lihat Menu
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
