import React from 'react';
import { motion } from 'motion/react';

interface AnimatedScrollProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'zoomIn' | 'flip';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const AnimatedScroll: React.FC<AnimatedScrollProps> = ({
  children,
  animation = 'slideUp',
  delay = 0,
  duration = 0.6,
  className = '',
  once = false, // Set to false to trigger on both scroll up and down
}) => {
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration, delay, ease: 'easeOut' } },
    },
    slideUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.2, duration, delay } },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0, transition: { type: 'spring', bounce: 0.1, duration, delay } },
    },
    slideRight: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0, transition: { type: 'spring', bounce: 0.1, duration, delay } },
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { type: 'spring', bounce: 0.3, duration, delay } },
    },
    zoomIn: {
      hidden: { opacity: 0, scale: 1.1 },
      visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: 'easeOut' } },
    },
    flip: {
      hidden: { opacity: 0, rotateX: 45 },
      visible: { opacity: 1, rotateX: 0, transition: { type: 'spring', bounce: 0.4, duration, delay } },
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '0px 0px -10% 0px' }} // triggers slightly before it hits the bottom
      variants={variants[animation]}
    >
      {children}
    </motion.div>
  );
};
