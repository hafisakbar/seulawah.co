import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Music, Sun } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-sand dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-video lg:aspect-square">
              <img 
                src="/images/hero.png" 
                alt="Seulawah.Co Sunset View" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-poppins font-semibold text-xl md:text-2xl drop-shadow-md">Tempat nongkrong paling chill di pinggir laut</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Bukan Sekadar Cafe — <br/><span className="text-ocean-600 dark:text-ocean-400">Ini Experience</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 font-inter">
              Di Seulawah.Co, kami nggak cuma jual makanan. Kami tau kamu butuh tempat lepo untuk melepas penat, ngobrol santai bareng teman, ditemani suasana yang bener-bener rileks.
            </p>

            <div className="flex flex-col gap-8">
              <div className="flex gap-4 items-start">
                <div className="bg-ocean-100 p-4 rounded-2xl text-ocean-600">
                  <Waves size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-poppins font-bold text-gray-900 dark:text-white mb-2">Suara Ombak Langsung</h3>
                  <p className="text-gray-600 dark:text-gray-400">Lokasi persis di depan pantai. Angin sepoi-sepoi dan gemuruh ombak bikin pikiran tenang seketika.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-sunset-100 p-4 rounded-2xl text-sunset-600">
                  <Sun size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-poppins font-bold text-gray-900 dark:text-white mb-2">Golden Hour Terbaik</h3>
                  <p className="text-gray-600 dark:text-gray-400">Nikmati pemandangan sunset memukau di Meulaboh langsung dari meja kamu. Sangat instagramable!</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-purple-100 p-4 rounded-2xl text-purple-600">
                  <Music size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-poppins font-bold text-gray-900 dark:text-white mb-2">Live Music Asik</h3>
                  <p className="text-gray-600 dark:text-gray-400">Ada live music buat nemenin malam minggu atau hari libur kamu makin seru dan bernyawa.</p>
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
