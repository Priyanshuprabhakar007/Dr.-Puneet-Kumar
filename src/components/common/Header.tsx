import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useActiveSection } from '../../hooks/useActiveSection';
import {
  Phone,
  Calendar,
  Menu,
  X,
  Stethoscope,
  ChevronRight,
  Lock
} from 'lucide-react';

export const Header: React.FC = () => {
  const { data, currentPath, navigate, openAppointmentModal, isAdminAuthenticated } = useSite();
  const { isScrolled, scrollDirection } = useScrollDirection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Progressive scroll indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { label: 'Home', path: '/', id: 'hero' },
    { label: 'About Dr. Puneet', path: '/about', id: 'about-doctor' },
    { label: 'Treatments', path: '/treatments', id: 'treatments' },
    { label: 'Diabetes Care', path: '/diabetes-care', id: 'diabetes-care' },
    { label: 'Blogs', path: '/blog', id: 'blogs' },
    { label: 'Testimonials', path: '/testimonials', id: 'testimonials' },
    { label: 'Contact', path: '/contact', id: 'locations' },
  ];

  const activeSectionId = useActiveSection(navLinks.map(l => l.id).filter(Boolean) as string[], 120);

  const handleNavClick = (path: string, id?: string) => {
    setIsMobileMenuOpen(false);

    if (id) {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 100; // Account for sticky header offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        return;
      }
    }

    navigate(path);
  };

  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] md:h-[3px] bg-blue-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Main Header */}
      <header
        className={`fixed top-0 z-50 w-full overflow-x-hidden transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-2.5 md:py-3'
            : 'bg-transparent bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-transparent py-4 md:py-5 lg:py-6'
        } ${scrollDirection === 'down' && isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between w-full">
          
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handleNavClick('/', 'hero')}
            className="flex items-center gap-2 md:gap-3 lg:gap-4 text-left group cursor-pointer focus:outline-none min-w-0"
          >
            {/* Exact Aggarwal Clinic Logo Image */}
            <div className={`relative flex items-center justify-center shrink-0 transition-all duration-500 rounded-md md:rounded-lg overflow-hidden ${
              !isScrolled ? 'bg-white/95 px-1.5 py-1 md:px-2 md:py-1.5 shadow-sm' : 'bg-transparent'
            }`}>
              <img 
                src="/aggarwal-clinic-logo.png" 
                alt="Aggarwal Clinic"
                className="w-[105px] md:w-[120px] lg:w-[140px] h-auto max-h-[36px] md:max-h-[40px] lg:max-h-[48px] object-contain"
              />
            </div>

            {/* Subtle Divider */}
            <div className={`h-8 md:h-10 w-px shrink-0 transition-colors duration-300 ${
              isScrolled ? 'bg-slate-300' : 'bg-white/30'
            }`} />

            {/* Doctor Identity */}
            <div className="flex flex-col min-w-0 shrink">
              <span className={`text-base md:text-[1.1rem] lg:text-xl font-extrabold tracking-tighter leading-none font-display truncate transition-colors duration-300 ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}>
                Dr. Puneet <span className="text-teal-400 italic font-serif">Kumar</span>
              </span>
              <span className={`text-[9px] md:text-[10px] lg:text-xs font-bold uppercase tracking-wider md:tracking-[0.2em] whitespace-nowrap mt-1 transition-colors duration-300 ${
                isScrolled ? 'text-slate-500' : 'text-slate-200'
              }`}>
                Internal Medicine Specialist
              </span>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <nav 
            className={`hidden lg:flex items-center p-1 rounded-full border shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] relative transition-all duration-300 ${
              isScrolled ? 'bg-slate-100/80 border-slate-200/60 backdrop-blur-md' : 'bg-white/70 backdrop-blur-md border-white/50'
            }`}
            onMouseLeave={() => setHoveredPath(null)}
          >
            {navLinks.map((link) => {
              // Active state considers both path and the active section scroll ID
              const isActive =
                (currentPath === '/' && activeSectionId === link.id) ||
                (link.path === '/'
                  ? currentPath === '/' && (!activeSectionId || activeSectionId === 'hero')
                  : currentPath.startsWith(link.path));
              
              const isSelected = hoveredPath ? hoveredPath === link.path : isActive;

              return (
                <button
                  key={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onClick={() => handleNavClick(link.path, link.id)}
                  className={`relative px-4 xl:px-5 py-2.5 rounded-full text-[13px] font-bold transition-colors duration-300 whitespace-nowrap focus:outline-none ${
                    isSelected
                      ? 'text-blue-700'
                      : isActive
                      ? 'text-slate-800'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="navCapsule"
                      className="absolute inset-0 rounded-full bg-white shadow-[0_2px_12px_-3px_rgba(0,0,0,0.12)] border border-slate-100/60"
                      initial={false}
                      transition={{ 
                        type: "spring", 
                        stiffness: 450, 
                        damping: 35,
                        mass: 0.8
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openAppointmentModal()}
              className="inline-flex items-center gap-2 px-6 xl:px-7 py-3 md:py-3.5 rounded-2xl text-[13px] xl:text-sm font-extrabold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-[0_10px_20px_-5px_rgba(37,99,235,0.3)]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <button
              onClick={() => openAppointmentModal()}
              className="hidden md:flex px-4 py-2 text-sm font-black bg-[#0d9488] text-white rounded-xl sm:px-6 shadow-sm"
            >
              Book
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -mr-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-6 mt-3 shadow-lg"
            >
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive =
                    link.path === '/'
                      ? currentPath === '/'
                      : currentPath.startsWith(link.path);
                  return (
                    <button
                      key={link.path}
                      onClick={() => handleNavClick(link.path)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 text-blue-500" />}
                    </button>
                  );
                })}
                
                {/* Admin Link in Mobile Menu */}
                <button
                  onClick={() => handleNavClick('/admin')}
                  className="w-full flex items-center gap-3 px-4 py-4 mt-4 rounded-xl text-sm font-black text-slate-400 bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  <span>Physician Portal</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
