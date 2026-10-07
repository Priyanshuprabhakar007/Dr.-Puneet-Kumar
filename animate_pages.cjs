const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && !f.includes('AdminPage'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add import if not exists
  if (!content.includes("from 'motion/react'")) {
    // Find the first import statement and add motion import after it
    content = content.replace(/import React(.*?);\n/, "import React$1;\nimport { motion } from 'motion/react';\n");
  }

  // Find all <section tags and replace with <motion.section
  // We'll use a variety of animations to make it unique
  let sectionCounter = 0;
  content = content.replace(/<section (className="[^"]+")/g, (match, p1) => {
    sectionCounter++;
    
    // Vary the animation per section for uniqueness
    let initial, whileInView, transition;
    
    if (sectionCounter % 3 === 1) {
       initial = `initial={{ opacity: 0, y: 40 }}`;
       whileInView = `whileInView={{ opacity: 1, y: 0 }}`;
       transition = `transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}`;
    } else if (sectionCounter % 3 === 2) {
       initial = `initial={{ opacity: 0, scale: 0.95 }}`;
       whileInView = `whileInView={{ opacity: 1, scale: 1 }}`;
       transition = `transition={{ type: "spring", bounce: 0.15, duration: 0.9 }}`;
    } else {
       initial = `initial={{ opacity: 0, x: -30 }}`;
       whileInView = `whileInView={{ opacity: 1, x: 0 }}`;
       transition = `transition={{ type: "spring", bounce: 0.25, duration: 0.7 }}`;
    }
    
    return `<motion.section ${initial} ${whileInView} viewport={{ once: false, amount: 0.1 }} ${transition} ${p1}`;
  });

  // Ensure closing tags are updated
  content = content.replace(/<\/section>/g, '</motion.section>');

  fs.writeFileSync(filePath, content);
}

console.log("Done adding animations to pages");
