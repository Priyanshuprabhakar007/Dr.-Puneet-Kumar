const fs = require('fs');
const path = require('path');

const filesToAnimate = [
  'QualificationsSection.tsx',
  'HealthVideosSection.tsx',
  'LatestBlogsSection.tsx',
  'FaqSection.tsx',
  'LocationSection.tsx',
  'FinalCtaSection.tsx'
];

const dir = path.join(__dirname, 'src/components/home');

for (const file of filesToAnimate) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes("import { motion }")) {
    content = content.replace("import React", "import React from 'react';\nimport { motion } from 'motion/react';\n//");
    content = content.replace("import React from 'react';\n// from 'react';", ""); // cleanup if we double-imported
  }

  // Find mapping loops and add motion
  // Specifically look for <div className="bg-white rounded-2xl... or similar and make it <motion.div
  // Since each file has a main map loop we can do:
  
  content = content.replace(/<div(\s+key=\{[^\}]+\}\s+className="bg-white rounded-[^>]+)/g, `<motion.div\n              initial={{ opacity: 0, y: 20 }}\n              whileInView={{ opacity: 1, y: 0 }}\n              viewport={{ once: false, margin: '-20px' }}\n              transition={{ duration: 0.4 }}\n              $1`);
  content = content.replace(/<\/div>(\s*)\}\)\}/g, `</motion.div>$1})}`);

  // In Qualifications: 
  content = content.replace(/<div\s+key=\{item\.id \|\| idx\}\s+className="bg-white/, `<motion.div\n              initial={{ opacity: 0, y: 20 }}\n              whileInView={{ opacity: 1, y: 0 }}\n              viewport={{ once: false, margin: '-20px' }}\n              transition={{ duration: 0.4, delay: (idx % 6) * 0.1 }}\n              key={item.id || idx}\n              className="bg-white`);

  // In HealthVideos:
  content = content.replace(/<div\s+key=\{video\.id\}\s+className="bg-white/, `<motion.div\n              initial={{ opacity: 0, y: 20 }}\n              whileInView={{ opacity: 1, y: 0 }}\n              viewport={{ once: false, margin: '-20px' }}\n              transition={{ duration: 0.4, delay: (idx % 6) * 0.1 }}\n              key={video.id}\n              className="bg-white`);

  // In Blogs:
  content = content.replace(/<div\s+key=\{post\.id\}\s+className="bg-white/, `<motion.div\n              initial={{ opacity: 0, y: 20 }}\n              whileInView={{ opacity: 1, y: 0 }}\n              viewport={{ once: false, margin: '-20px' }}\n              transition={{ duration: 0.4, delay: (idx % 6) * 0.1 }}\n              key={post.id}\n              className="bg-white`);

  // In Faq:
  content = content.replace(/<div\s+key=\{item\.id\}\s+className="bg-white/, `<motion.div\n              initial={{ opacity: 0, y: 15 }}\n              whileInView={{ opacity: 1, y: 0 }}\n              viewport={{ once: false, margin: '-20px' }}\n              transition={{ duration: 0.3, delay: (idx % 6) * 0.05 }}\n              key={item.id}\n              className="bg-white`);

  // In Location:
  // Not mapped usually, let's just replace `<div className="bg-white rounded-3xl`
  content = content.replace(/<div className="bg-white rounded-3xl/, `<motion.div\n            initial={{ opacity: 0, y: 20 }}\n            whileInView={{ opacity: 1, y: 0 }}\n            viewport={{ once: false, margin: '-20px' }}\n            transition={{ duration: 0.5 }}\n            className="bg-white rounded-3xl`);
  content = content.replace(/<\/div>\s*<\/div>\s*<\/section>/, `</motion.div>\n      </div>\n    </section>`);

  // Final CTA:
  content = content.replace(/<div className="bg-slate-900 rounded-3xl/, `<motion.div\n          initial={{ opacity: 0, scale: 0.95 }}\n          whileInView={{ opacity: 1, scale: 1 }}\n          viewport={{ once: false, margin: '-20px' }}\n          transition={{ duration: 0.5 }}\n          className="bg-slate-900 rounded-3xl`);
  content = content.replace(/<\/div>\s*<\/div>\s*<\/section>/, `</motion.div>\n      </div>\n    </section>`);

  // Change matching closing tags
  if (content.includes("key={item.id || idx}") && content.includes("Qualifications")) content = content.replace(/<\/div>(\s*)\}\)\}/g, `</motion.div>$1})}`);
  if (content.includes("key={video.id}") && content.includes("HealthVideos")) content = content.replace(/<\/div>(\s*)\}\)\}/g, `</motion.div>$1})}`);
  if (content.includes("key={post.id}") && content.includes("LatestBlogs")) content = content.replace(/<\/div>(\s*)\}\)\}/g, `</motion.div>$1})}`);
  if (content.includes("key={item.id}") && content.includes("Faq")) content = content.replace(/<\/div>(\s*)\}\)\}/g, `</motion.div>$1})}`);
  
  // also add header animations:
  content = content.replace(/<div className="text-center max-w-2xl/, `<motion.div\n          initial={{ opacity: 0, y: -20 }}\n          whileInView={{ opacity: 1, y: 0 }}\n          viewport={{ once: false, margin: '-20px' }}\n          transition={{ duration: 0.5 }}\n          className="text-center max-w-2xl`);
  // close header tag (it's closed before grid)
  content = content.replace(/<\/div>\s*<div className="grid/, `</motion.div>\n        <div className="grid`);

  fs.writeFileSync(filePath, content);
}
console.log("Done");
