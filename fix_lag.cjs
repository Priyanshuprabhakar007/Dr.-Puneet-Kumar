const fs = require('fs');
const path = require('path');

const diabetesPath = path.join(__dirname, 'src/components/home/DiabetesCareSection.tsx');
if (fs.existsSync(diabetesPath)) {
  let content = fs.readFileSync(diabetesPath, 'utf8');
  
  // Remove continuous rotation of massive blurred element
  content = content.replace(/animate={{ rotate: 360 }}\s*transition={{ duration: 150, repeat: Infinity, ease: "linear" }}/g, '');
  
  // Remove the shimmer effect that repeats infinitely just in case
  content = content.replace(/animate={{ x: \['-100%', '200%'\] }}\s*transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "linear" }}/g, '');
  
  fs.writeFileSync(diabetesPath, content);
}

const heroPath = path.join(__dirname, 'src/components/home/HeroSection.tsx');
if (fs.existsSync(heroPath)) {
  let content = fs.readFileSync(heroPath, 'utf8');
  // Remove the shimmer effect that repeats infinitely
  content = content.replace(/animate={{ x: '200%' }}\s*transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "linear" }}/g, '');
  fs.writeFileSync(heroPath, content);
}

console.log("Fixed lag");
