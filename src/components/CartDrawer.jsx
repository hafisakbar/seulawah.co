import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = '6285372753431'; // ← ganti dengan nomor WA Seulawah.Co

function buildWhatsAppMsg(cartItems, totalPrice, formatPrice) {
  const lines = cartItems.map(
    (i) => `• ${i.name} x${i.qty} — ${formatPrice(
      parseInt(i.price.replace(/[^0-9]/g, ''), 10) * i.qty
    )}`
  );
  const body = [
    'Halo Seulawah.Co! 👋',
    'Saya ingin memesan:',
    '',
    ...lines,
    '',
    `*Total: ${formatPrice(totalPrice)}*`,
    '',
    'Mohon konfirmasi pesanan ya, terima kasih! 🙏',
  ].join('\n');
  return encodeURIComponent(body);
}

export default function CartDrawer() {
  const {
    cartItems, removeFromCart, updateQty, clearCart,
    totalItems, totalPrice, formatPrice, isCartOpen, setIsCartOpen,
  } = useCart();

  const handleCheckout = () => {
    const msg = buildWhatsAppMsg(cartItems, totalPrice, formatPrice);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[70] flex flex-col bg-white dark:bg-gray-900 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-ocean-500" size={22} />
                <h2 className="text-xl font-poppins font-bold text-gray-900 dark:text-white">
                  Keranjang
                  {totalItems > 0 && (
                    <span className="ml-2 text-sm bg-sunset-500 text-white rounded-full px-2 py-0.5">
                      {totalItems}
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close cart"
              >
                <X size={22} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence initial={false}>
                {cartItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-4 py-20 text-center"
                  >
                    <ShoppingBag size={56} className="text-gray-200 dark:text-gray-700" />
                    <p className="text-gray-400 dark:text-gray-500 font-poppins text-lg">
                      Keranjang masih kosong
                    </p>
                    <p className="text-gray-300 dark:text-gray-600 text-sm">
                      Yuk tambahkan menu favoritmu! 🍽️
                    </p>
                  </motion.div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-poppins font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-1 line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-ocean-600 font-bold text-sm mb-3">{item.price}</p>
                        <div className="flex items-center justify-between">
                          {/* Qty controls */}
                          <div className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-1">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus size={14} className="text-gray-600 dark:text-gray-300" />
                            </button>
                            <span className="w-6 text-center font-bold text-gray-900 dark:text-white text-sm">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-ocean-500"
                              aria-label="Increase"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} className="text-red-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Total</span>
                  <span className="text-xl font-poppins font-bold text-gray-900 dark:text-white">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-poppins font-bold py-4 rounded-2xl transition-colors duration-200 shadow-lg shadow-green-500/30 text-lg"
                >
                  <MessageCircle size={22} />
                  Pesan via WhatsApp
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-sm text-gray-400 dark:text-gray-500 hover:text-red-400 transition-colors"
                >
                  Kosongkan keranjang
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
