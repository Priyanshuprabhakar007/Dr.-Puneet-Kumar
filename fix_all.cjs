const fs = require('fs');
const path = require('path');

// 1. HeroSection.tsx
const heroPath = path.join(__dirname, 'src/components/home/HeroSection.tsx');
if (fs.existsSync(heroPath)) {
  let content = fs.readFileSync(heroPath, 'utf8');
  
  // Remove blur animation from variants
  content = content.replace(/filter:\s*'blur\(10px\)'/g, '');
  content = content.replace(/filter:\s*'blur\(0px\)',?/g, '');
  
  // Remove backdrop-blur from large card to improve performance
  content = content.replace(/bg-white\/80 backdrop-blur-xl/g, 'bg-white');
  
  // Remove backdrop-blur from small floating card
  content = content.replace(/bg-white\/95 backdrop-blur-md/g, 'bg-white');
  
  // Ensure the bubbles don't have laggy hover transitions if they do
  content = content.replace(/transition-transform duration-300 shadow-\[0_8px_30px_rgb\(0,0,0,0\.04\)\] border border-slate-200\/60 flex flex-col justify-center h-full group hover:border-blue-200 transition-colors/g, 'transition-transform duration-200 shadow-md border border-slate-200/60 flex flex-col justify-center h-full group hover:border-blue-300');
  content = content.replace(/hover:-translate-y-1 transition-transform duration-300 shadow-\[0_8px_30px_rgb\(0,0,0,0\.04\)\] border border-slate-200\/60 flex flex-col justify-center h-full group hover:border-green-200 transition-colors/g, 'hover:-translate-y-1 transition-transform duration-200 shadow-md border border-slate-200/60 flex flex-col justify-center h-full group hover:border-green-300');

  fs.writeFileSync(heroPath, content);
}

// 2. Header.tsx
const headerPath = path.join(__dirname, 'src/components/common/Header.tsx');
if (fs.existsSync(headerPath)) {
  let content = fs.readFileSync(headerPath, 'utf8');
  // Remove backdrop blur entirely from header, just use solid background
  content = content.replace(/bg-white\/90 backdrop-blur-md/g, 'bg-white');
  content = content.replace(/bg-white\/90 backdrop-blur-lg/g, 'bg-white');
  
  fs.writeFileSync(headerPath, content);
}

// 3. TestimonialsSection.tsx
const testPath = path.join(__dirname, 'src/components/home/TestimonialsSection.tsx');
if (fs.existsSync(testPath)) {
  let content = fs.readFileSync(testPath, 'utf8');
  // Ensure the buttons have onClick attached properly, and pointer-events aren't blocked
  // The issue could be that z-20 is not high enough because the parent might not establish a stacking context, or the parent motion.div has a z-index issue.
  // Let's make the buttons super clickable
  content = content.replace(/className="relative z-20 cursor-pointer/g, 'className="relative z-50 cursor-pointer');
  
  // Let's also check if the buttons are wrapped in a container that needs pointer-events-auto
  content = content.replace(/className="flex items-center gap-2 mt-8 md:mt-0 md:absolute md:bottom-12 md:right-12"/g, 'className="flex items-center gap-2 mt-8 md:mt-0 md:absolute md:bottom-12 md:right-12 z-50 pointer-events-auto"');

  fs.writeFileSync(testPath, content);
}

console.log("Fixed all");
