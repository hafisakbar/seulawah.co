import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTextClass = isScrolled
    ? 'text-gray-700 dark:text-gray-200 hover:text-ocean-600 dark:hover:text-ocean-400'
    : 'text-white hover:text-sunset-100';

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border-b border-white/20 dark:border-gray-700/30 py-3'
          : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-poppins font-bold tracking-tight ${
              isScrolled ? 'text-gray-900 dark:text-white' : 'text-white drop-shadow-md'
            }`}>
              Seulawah<span className="text-sunset-500">.Co</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#experience" className={`font-medium transition-colors ${navTextClass}`}>Experience</a>
            <a href="#menu"       className={`font-medium transition-colors ${navTextClass}`}>Menu</a>
            <a href="#gallery"    className={`font-medium transition-colors ${navTextClass}`}>Suasana</a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              className={`relative p-2.5 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-white/15 backdrop-blur-md text-white border border-white/30 hover:bg-white/25'
              }`}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-sunset-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-300 ${
                isScrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-white/15 backdrop-blur-md text-white border border-white/30 hover:bg-white/25'
              }`}
            >
              <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
              <span className="text-sm">{isDark ? 'Light' : 'Dark'}</span>
            </button>
          </div>

          {/* Mobile: cart + theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              className={`relative p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                  : 'bg-white/15 text-white'
              }`}
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-sunset-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className={`p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                  : 'bg-white/15 text-white'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen
                ? <X className={isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'} size={28} />
                : <Menu className={isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'} size={28} />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-gray-950 pt-24 px-6 flex flex-col gap-6 md:hidden"
          >
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-xl font-poppins font-medium border-b border-gray-100 dark:border-gray-800 pb-4 dark:text-white">Experience</a>
            <a href="#menu"       onClick={() => setMobileMenuOpen(false)} className="text-xl font-poppins font-medium border-b border-gray-100 dark:border-gray-800 pb-4 dark:text-white">Menu</a>
            <a href="#gallery"    onClick={() => setMobileMenuOpen(false)} className="text-xl font-poppins font-medium border-b border-gray-100 dark:border-gray-800 pb-4 dark:text-white">Suasana</a>

            {/* Mobile theme toggle full-width */}
            <button
              onClick={toggleTheme}
              className="mt-4 flex items-center justify-center gap-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-6 py-4 rounded-xl font-poppins font-medium w-full text-lg"
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
              {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
