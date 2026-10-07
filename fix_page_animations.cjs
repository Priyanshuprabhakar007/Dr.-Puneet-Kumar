const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && !f.includes('AdminPage'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We find the first <motion.section and remove its vertical offset/scale
  // so it just fades in with the page container.
  // This prevents the "jumping" effect on initial navigation.
  
  let sectionIndex = 0;
  content = content.replace(/<motion\.section (initial={{ opacity: 0, [^}]+ }}) (whileInView={{ opacity: 1, [^}]+ }}) (viewport={{ [^}]+ }}) (transition={{ [^}]+ }})/g, (match, initial, whileInView, viewport, transition) => {
    sectionIndex++;
    if (sectionIndex === 1) {
      // First section: remove movement, make it purely opacity and simple
      return `<motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: "easeOut" }}`;
    }
    // Subsequent sections: keep them as is or make them more consistent
    return match;
  });

  fs.writeFileSync(filePath, content);
}

console.log("Done fixing page entrance animations");
