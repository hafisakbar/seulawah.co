import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Arief R.",
    text: "View pantai top, rame selalu sore ke malam. Vibesnya dapet banget!",
    rating: 5
  },
  {
    name: "Siti F.",
    text: "Pelayanan cepat dan ramah, Ayam Bakarnya juara. Tempat nongkrong terbaik.",
    rating: 5
  },
  {
    name: "Dian P.",
    text: "Live musicnya asik, ngopi sambil liat sunset bener-bener rileks.",
    rating: 4
  },
  {
    name: "Rizky K.",
    text: "Wajib coba Strawberry Yakult-nya. Tempat favorit anak muda di Meulaboh.",
    rating: 5
  },
  {
    name: "Rontz A.",
    text: "Kopi nya sangat enak, juara dehh pokoknya seulawah.Co.",
    rating: 5
  }
];

const SocialProof = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-4">Ribuan Orang Sudah Ke Sini 🔥</h2>
        <div className="flex items-center justify-center gap-3">
          <div className="flex text-sunset-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} fill="currentColor" className={i === 4 ? 'text-sunset-500/50' : ''} />
            ))}
          </div>
          <span className="text-lg font-medium text-gray-600">4.4 / 5.0 (100+ Ulasan Google)</span>
        </div>
      </div>

      {/* Auto Sliding Ticker */}
      <div className="relative w-full flex">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />

        <motion.div
          className="flex gap-6 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {/* We duplicate the reviews array to make it continuous */}
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[350px] bg-sand/30 dark:bg-gray-800 border border-sand-dark dark:border-gray-700 p-6 rounded-2xl shadow-sm">
              <Quote className="text-ocean-500/30 mb-4" size={32} />
              <p className="text-gray-800 dark:text-gray-200 font-medium text-lg leading-relaxed mb-6">"{review.text}"</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-poppins font-semibold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">Google Reviewer</p>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />
      </div>
    </section>
  );
};

export default SocialProof;
