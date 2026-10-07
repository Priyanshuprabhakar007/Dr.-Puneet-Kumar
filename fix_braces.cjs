const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/home');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix: transition={ type: "spring" } to transition={{ type: "spring" }}
  content = content.replace(/transition={ type: "spring"(.*?)}/g, 'transition={{ type: "spring"$1}}');
  content = content.replace(/transition={ ease: "easeOut"(.*?)}/g, 'transition={{ ease: "easeOut"$1}}');

  fs.writeFileSync(filePath, content);
}
console.log("Done fixing braces");
