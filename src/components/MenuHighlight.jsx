import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const menuItems = [
  {
    id: 1,
    name: "Strawberry Yakult",
    price: "Rp 25.000",
    image: "/images/yakult.png",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Pisang Coklat Lumer",
    price: "Rp 25.000",
    image: "/images/pisang.jpg",
    badge: "Favorit"
  },
  {
    id: 3,
    name: "Ayam Bakar Seulawah",
    price: "Rp 35.000",
    image: "/images/ayam.png",
    badge: "Rekomendasi"
  },
  {
    id: 4,
    name: "Soto Ayam",
    price: "Rp 22.000",
    image: "/images/sotoayam.jpg",
    badge: "Rekomendasi",
  }
];

const MenuHighlight = () => {
  const { addToCart, cartItems } = useCart();

  const getQtyInCart = (id) => {
    const found = cartItems.find((i) => i.id === id);
    return found ? found.qty : 0;
  };

  return (
    <section id="menu" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-poppins font-bold text-gray-900 dark:text-white mb-4"
          >
            Menu Wajib Coba!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Dari seger-seger sampai yang bikin kenyang, semua harga ramah di kantong dan rasanya juara.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {menuItems.map((item, index) => {
            const qty = getQtyInCart(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-sand/20 dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-sunset-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    {item.badge}
                  </div>
                  {/* In-cart badge */}
                  {qty > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 left-4 bg-ocean-500 text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full shadow-lg"
                    >
                      {qty}
                    </motion.div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-poppins font-bold text-gray-900 dark:text-white line-clamp-2">{item.name}</h3>
                    <span className="text-ocean-600 font-bold whitespace-nowrap ml-2">{item.price}</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => addToCart(item)}
                    className="w-full flex items-center justify-center gap-2 bg-ocean-500 hover:bg-ocean-600 text-white py-3 rounded-xl font-semibold transition-colors duration-300 shadow-md shadow-ocean-500/20"
                  >
                    <Plus size={18} />
                    Tambah ke Keranjang
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <a href="#" className="inline-flex items-center gap-2 text-ocean-600 font-poppins font-semibold text-lg hover:text-ocean-700 transition-colors group">
            Lihat Menu Lengkapnya
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default MenuHighlight;
