import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Navigation } from 'lucide-react';

const Location = () => {
  return (
    <section id="location" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">

        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Left: Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-[400px]">
              {/* Fake Google Map embed for demonstration */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5349.241507616455!2d96.11791701161512!3d4.145162298351462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303ec3ba1c3efd1b%3A0x266ed939b7fb9019!2sSeulawah.Co!5e1!3m2!1sid!2sid!4v1775637424146!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Seulawah Cafe Location Map"
              ></iframe>
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-block bg-red-100 text-red-600 font-poppins font-bold px-4 py-1.5 rounded-full mb-6">
              Rame setiap malam 🔥
            </div>

            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Gampang Dicari, <br /><span className="text-ocean-600 dark:text-ocean-400">Dekat Banget!</span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Langsung arahkan maps kamu ke pinggir laut Meulaboh. Parkiran luas, akses gampang, dan pastinya view-nya juara.
            </p>

            <div className="space-y-6 mb-10 text-gray-800 dark:text-gray-200">
              <div className="flex items-start gap-4">
                <MapPin className="text-ocean-500 mt-1" size={24} />
                <div>
                  <p className="font-poppins font-semibold text-lg">Alamat Lengkap</p>
                  <p className="text-gray-600 dark:text-gray-400">Jl. Pesisir Rantai No. 12, Panggong, Meulaboh, Aceh Barat, Indonesia.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-sunset-500 mt-1" size={24} />
                <div>
                  <p className="font-poppins font-semibold text-lg">Jam Operasional</p>
                  <p className="text-gray-600 dark:text-gray-400">Buka Setiap Hari: 15:00 - 23:00</p>
                </div>
              </div>
            </div>

            <a href="#" className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-poppins font-semibold text-lg transition-all w-full sm:w-auto text-center shrink-0">
              <Navigation size={20} />
              Buka Google Maps
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Location;
