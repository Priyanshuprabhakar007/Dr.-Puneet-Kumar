const fs = require('fs');
const path = require('path');

const files = [
  'AboutDoctor.tsx',
  'DiabetesCareSection.tsx',
  'TrustIndicators.tsx',
  'WhyChooseDrPuneet.tsx'
];

for (const file of files) {
  const filePath = path.join(__dirname, 'src/components/home', file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // AboutDoctor
  content = content.replace(/doctorProfile\.clinicalFocus\?\.slice/g, '(doctorProfile.clinicalFocus || []).slice');
  
  // DiabetesCareSection
  content = content.replace(/diabetesServices\.map/g, '(diabetesServices || []).map');
  content = content.replace(/service\.keyHighlights\.map/g, '(service.keyHighlights || []).map');
  
  // TrustIndicators
  content = content.replace(/heroSection\?\.trustBadges\.map/g, '(heroSection?.trustBadges || []).map');
  content = content.replace(/hero\.trustBadges\?\.map/g, '(hero.trustBadges || []).map');
  content = content.replace(/const metrics = hero\?\.trustBadges \|\| \[\];/g, 'const metrics = hero?.trustBadges || [];');

  fs.writeFileSync(filePath, content);
}
console.log("Done more");
