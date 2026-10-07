const fs = require('fs');
const path = require('path');

const heroPath = path.join(__dirname, 'src/components/home/HeroSection.tsx');
if (fs.existsSync(heroPath)) {
  let heroContent = fs.readFileSync(heroPath, 'utf8');
  
  // Remove the framer motion floating animation
  heroContent = heroContent.replace(/variants={floatVariants}\s*animate="animate"/g, '');
  heroContent = heroContent.replace(/variants={floatVariantsDelayed}\s*animate="animate"/g, '');
  
  // Replace with a simple CSS hover effect instead, which doesn't drain battery/CPU
  heroContent = heroContent.replace(/className="bg-white p-5 rounded-3xl/g, 'className="bg-white p-5 rounded-3xl hover:-translate-y-1 transition-transform duration-300');

  fs.writeFileSync(heroPath, heroContent);
}

// Fix Header Lag (usually caused by heavy transitions on the entire header or layout shifts)
const headerPath = path.join(__dirname, 'src/components/common/Header.tsx');
if (fs.existsSync(headerPath)) {
  let headerContent = fs.readFileSync(headerPath, 'utf8');
  // Remove backdrop-blur-lg as it can be laggy on some devices, use a solid color or small blur
  headerContent = headerContent.replace(/backdrop-blur-lg/g, 'backdrop-blur-md');
  // Avoid heavy transition-all on header if it causes lag, just transition colors and shadow
  headerContent = headerContent.replace(/transition-all duration-200/g, 'transition-colors shadow-sm duration-300');
  
  fs.writeFileSync(headerPath, headerContent);
}

console.log("Fixed bubbles and header");
