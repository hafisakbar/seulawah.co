import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Experience from './components/Experience';
import MenuHighlight from './components/MenuHighlight';
import AtmosphereGallery from './components/AtmosphereGallery';
import Location from './components/Location';
import PeakHours from './components/PeakHours';
import FinalCTA from './components/FinalCTA';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CartDrawer from './components/CartDrawer';

function AppInner() {
  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? 'dark' : ''} relative min-h-screen overflow-x-hidden max-w-[100vw]`}>
      <div className="bg-sand dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300 min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <SocialProof />
          <Experience />
          <MenuHighlight />
          <AtmosphereGallery />
          <Location />
          <PeakHours />
          <FinalCTA />
        </main>
        <FloatingWhatsApp />
        <CartDrawer />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
