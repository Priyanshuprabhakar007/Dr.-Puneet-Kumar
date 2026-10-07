const fs = require('fs');
const path = require('path');

const files = [
  'ConditionFinder.tsx',
  'ExperienceTimeline.tsx',
  'FaqSection.tsx',
  'HealthVideosSection.tsx',
  'LatestBlogsSection.tsx',
  'LocationSection.tsx',
  'QualificationsSection.tsx',
  'TestimonialsSection.tsx',
  'TreatmentsSection.tsx'
];

for (const file of files) {
  const filePath = path.join(__dirname, 'src/components/home', file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // ConditionFinder
  content = content.replace(/data\.treatments\.filter/g, '(data.treatments || []).filter');
  
  // ExperienceTimeline
  content = content.replace(/experience\s*\n\s*\.filter/g, '(experience || [])\n    .filter');

  // FaqSection
  content = content.replace(/faqs\s*\n\s*\.filter/g, '(faqs || [])\n    .filter');
  
  // HealthVideosSection
  content = content.replace(/healthVideos\s*\n\s*\.filter/g, '(healthVideos || [])\n    .filter');
  
  // LatestBlogsSection
  content = content.replace(/blogs\s*\n\s*\.filter/g, '(blogs || [])\n    .filter');
  
  // TestimonialsSection
  content = content.replace(/testimonials\s*\n\s*\.filter/g, '(testimonials || [])\n    .filter');
  
  // TreatmentsSection
  content = content.replace(/treatments\.filter/g, '(treatments || []).filter');

  // Also some map operations on undefined
  content = content.replace(/locations\.map/g, '(locations || []).map');
  content = content.replace(/\[\.\.\.qualifications\]/g, '[...(qualifications || [])]');

  fs.writeFileSync(filePath, content);
}
console.log("Done");
