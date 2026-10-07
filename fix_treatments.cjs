const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/home/TreatmentsSection.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/treatmentCategories\.map/g, '(treatmentCategories || []).map');
content = content.replace(/treatmentCategories\.find/g, '(treatmentCategories || []).find');

fs.writeFileSync(filePath, content);
console.log("Done treatments");
