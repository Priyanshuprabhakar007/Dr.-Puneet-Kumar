const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/home/TestimonialsSection.tsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes("import { motion }")) {
  content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { motion } from 'motion/react';");
}

content = content.replace(/<div className="text-center max-w-3xl/, `<motion.div\n          initial={{ opacity: 0, y: -20 }}\n          whileInView={{ opacity: 1, y: 0 }}\n          viewport={{ once: false, margin: '-20px' }}\n          transition={{ duration: 0.5 }}\n          className="text-center max-w-3xl`);
content = content.replace(/<\/p>\s*<\/div>\s*<div className="max-w-4xl mx-auto">/, `</p>\n        </motion.div>\n\n        <div className="max-w-4xl mx-auto">`);

content = content.replace(/<div className="bg-white rounded-3xl/, `<motion.div\n          key={currentIndex}\n          initial={{ opacity: 0, scale: 0.95 }}\n          whileInView={{ opacity: 1, scale: 1 }}\n          viewport={{ once: false, margin: '-20px' }}\n          transition={{ duration: 0.5 }}\n          className="bg-white rounded-3xl`);
content = content.replace(/<\/div>\s*<\/div>\s*\{\/\* Small thumbnail cards \*\/\}/, `</motion.div>\n        </div>\n\n        {/* Small thumbnail cards */}`);

fs.writeFileSync(filePath, content);
console.log("Done testimonials");
