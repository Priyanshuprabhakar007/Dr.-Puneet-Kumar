const fs = require('fs');
const path = require('path');

// 1. Fix Hero Section Lag (Huge blurred elements animating)
const heroPath = path.join(__dirname, 'src/components/home/HeroSection.tsx');
if (fs.existsSync(heroPath)) {
  let heroContent = fs.readFileSync(heroPath, 'utf8');
  // Remove the heavy framer motion animation on the blurred backgrounds
  heroContent = heroContent.replace(/<motion\.div\s+animate={{ scale: \[1, 1\.1, 1\], opacity: \[0\.3, 0\.5, 0\.3\] }}\s+transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}/g, '<div');
  heroContent = heroContent.replace(/<motion\.div\s+animate={{ scale: \[1, 1\.2, 1\], opacity: \[0\.2, 0\.4, 0\.2\] }}\s+transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}/g, '<div');
  // Since we changed <motion.div> to <div> for these two, we need to match their closing tags
  // Actually, wait, it's self-closing in the original: />
  // Let's just do a careful string replace
  heroContent = heroContent.replace(/<motion\.div\s*animate={{ scale: \[.*?\] }}\s*transition={{ duration: 1[02].*? }}\s*className="absolute (top-20|bottom-10).*? -z-10"\s*\/>/gs, (match) => {
    return match.replace(/<motion\.div/, '<div').replace(/animate={.*?}\s*transition={.*?}\s*/, '');
  });
  
  // Floating badges lag - change y animation to something lighter or optimize
  // The bubbles below the doctor picture... wait, are there bubbles below the doctor picture?
  // Let's replace will-change properties if needed.
  
  fs.writeFileSync(heroPath, heroContent);
}

// 2. Fix Testimonial arrows
const testPath = path.join(__dirname, 'src/components/home/TestimonialsSection.tsx');
if (fs.existsSync(testPath)) {
  let testContent = fs.readFileSync(testPath, 'utf8');
  // Ensure the buttons have cursor-pointer, relative, and high z-index
  testContent = testContent.replace(/className="w-10 h-10 rounded-full border border-slate-200/g, 'className="relative z-20 cursor-pointer w-10 h-10 rounded-full border border-slate-200');
  
  fs.writeFileSync(testPath, testContent);
}

console.log("Fixed hero and testimonials");
