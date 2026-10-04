import React from 'react';
import { motion } from 'framer-motion';

const AtmosphereGallery = () => {
  return (
    <section id="gallery" className="py-20 bg-sand-dark/20 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-poppins font-bold text-gray-900 dark:text-white mb-4"
          >
            Vibes Malam Ini
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Tempat paling asik berbaur dengan suasana Meulaboh.</p>
        </div>

        {/* Masonry or Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 row-span-2 rounded-2xl overflow-hidden relative group"
          >
            <img loading="lazy" src="/images/hero.png" alt="Pantai" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative group"
          >
            <img loading="lazy" src="/images/yakult.png" alt="Makanan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative group"
          >
            <img loading="lazy" src="/images/ayam.png" alt="Live Music" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AtmosphereGallery;
