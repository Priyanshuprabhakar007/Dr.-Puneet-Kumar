import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useScrollDirection } from '../../hooks/useScrollDirection';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade' | 'slide' | 'clip' | 'stagger-container' | 'stagger-item';
  delay?: number;
  duration?: number;
  className?: string;
  staggerChildren?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  animation = 'slide', 
  delay = 0,
  duration = 0.6,
  className = '',
  staggerChildren = 0.1
}) => {
  const { scrollDirection } = useScrollDirection();
  const shouldReduceMotion = useReducedMotion();
  
  // Base distance for mobile/desktop. Using typical premium motion values.
  const yOffset = scrollDirection === 'down' ? 30 : -20;

  // If user prefers reduced motion, fallback to simple fade without movement
  const fallbackToFade = shouldReduceMotion && animation !== 'stagger-container';
  const activeAnimation = fallbackToFade ? 'fade' : animation;

  const variants = {
    slide: {
      hidden: { opacity: 0, y: yOffset },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration, ease: [0.22, 1, 0.36, 1], delay } 
      }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        transition: { duration, ease: 'easeOut', delay } 
      }
    },
    clip: {
      hidden: { opacity: 0, scale: 1.04, clipPath: 'inset(8% 0 8% 0)' },
      visible: { 
        opacity: 1, 
        scale: 1, 
        clipPath: 'inset(0% 0 0% 0)',
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay } 
      }
    },
    'stagger-container': {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : staggerChildren,
          delayChildren: delay
        }
      }
    },
    'stagger-item': {
      hidden: { opacity: 0, y: yOffset },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
      }
    }
  };

  // For reduced motion clip fallback
  if (shouldReduceMotion && animation === 'clip') {
     variants.clip.hidden = { opacity: 0, scale: 1, clipPath: 'inset(0% 0 0% 0)' };
  }
  // For reduced motion slide fallback
  if (shouldReduceMotion && (animation === 'slide' || animation === 'stagger-item')) {
     variants[animation].hidden = { opacity: 0, y: 0 };
  }

  return (
    <motion.div
      className={className}
      variants={variants[activeAnimation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
};
