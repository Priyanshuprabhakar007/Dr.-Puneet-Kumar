const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/home');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const animationTypes = [
  '{ type: "spring", bounce: 0.2, duration: 0.8 }',
  '{ type: "spring", bounce: 0.15, duration: 0.9 }',
  '{ type: "spring", bounce: 0.25, duration: 0.7 }',
  '{ ease: "easeOut", duration: 0.6 }'
];

let counter = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We want to replace standard whileInView attributes to make them smoother.
  // Instead of viewport={{ once: false, margin: '-20px' }}, we use amount: 0.1, margin: "0px"
  content = content.replace(/viewport={{ once: false, margin: '-20px' }}/g, 'viewport={{ once: false, amount: 0.1 }}');
  
  // Replace transition={{ duration: 0.5 }} with spring transitions for variety
  content = content.replace(/transition={{ duration: 0\.5 }}/g, () => `transition=${animationTypes[counter++ % animationTypes.length]}`);
  content = content.replace(/transition={{ duration: 0\.4 }}/g, () => `transition=${animationTypes[counter++ % animationTypes.length]}`);
  
  // Also fix transitions with delays
  content = content.replace(/transition={{ duration: 0\.4, delay: (.*?) }}/g, 'transition={{ type: "spring", bounce: 0.2, duration: 0.8, delay: $1 }}');
  content = content.replace(/transition={{ duration: 0\.3, delay: (.*?) }}/g, 'transition={{ type: "spring", bounce: 0.15, duration: 0.7, delay: $1 }}');
  content = content.replace(/transition={{ duration: 0\.5, delay: (.*?) }}/g, 'transition={{ type: "spring", bounce: 0.25, duration: 0.9, delay: $1 }}');
  
  // Replace some y: -20 with x: -20 or scale
  if (file === 'WhyChooseDrPuneet.tsx') {
    content = content.replace(/initial={{ opacity: 0, y: 20 }}/g, 'initial={{ opacity: 0, x: -20, scale: 0.95 }}');
    content = content.replace(/whileInView={{ opacity: 1, y: 0 }}/g, 'whileInView={{ opacity: 1, x: 0, scale: 1 }}');
  } else if (file === 'TreatmentsSection.tsx') {
    content = content.replace(/initial={{ opacity: 0, y: 20 }}/g, 'initial={{ opacity: 0, scale: 0.9 }}');
    content = content.replace(/whileInView={{ opacity: 1, y: 0 }}/g, 'whileInView={{ opacity: 1, scale: 1 }}');
  } else if (file === 'ExperienceTimeline.tsx') {
    content = content.replace(/initial={{ opacity: 0, x: -20 }}/g, 'initial={{ opacity: 0, x: -30, rotate: -2 }}');
    content = content.replace(/whileInView={{ opacity: 1, x: 0 }}/g, 'whileInView={{ opacity: 1, x: 0, rotate: 0 }}');
  } else if (file === 'TestimonialsSection.tsx') {
    content = content.replace(/initial={{ opacity: 0, scale: 0.95 }}/g, 'initial={{ opacity: 0, scale: 0.9, rotate: 1 }}');
    content = content.replace(/whileInView={{ opacity: 1, scale: 1 }}/g, 'whileInView={{ opacity: 1, scale: 1, rotate: 0 }}');
  }

  fs.writeFileSync(filePath, content);
}
console.log("Done updating home animations");
