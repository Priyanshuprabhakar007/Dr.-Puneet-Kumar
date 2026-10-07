const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/home');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Set once: true for all viewports to prevent "irregular" popping during scroll
  content = content.replace(/viewport={{ once: false/g, 'viewport={{ once: true');
  
  // Also fix cases where viewport might be missing once: false but we want once: true
  content = content.replace(/viewport={{ amount: 0.1 }}/g, 'viewport={{ once: true, amount: 0.1 }}');

  fs.writeFileSync(filePath, content);
}

console.log("Done fixing home viewport settings");
