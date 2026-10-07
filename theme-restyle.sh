#!/bin/bash

# Change the background of the main body in index.html to slate-50 instead of slate-50/50
sed -i 's/bg-stone-50\/50/bg-slate-50/g' index.html
sed -i 's/bg-slate-50\/50/bg-slate-50/g' index.html

# Replace teal colors in Header with amber and slate-950
sed -i 's/from-teal-600 via-teal-700 to-stone-900/from-amber-500 to-amber-700/g' src/components/common/Header.tsx
sed -i 's/bg-teal-50/bg-amber-500\/10/g' src/components/common/Header.tsx
sed -i 's/text-teal-800/text-amber-500/g' src/components/common/Header.tsx
sed -i 's/border-teal-200/border-amber-500\/30/g' src/components/common/Header.tsx
sed -i 's/text-teal-600/text-amber-500/g' src/components/common/Header.tsx
sed -i 's/from-teal-700 via-teal-600 to-teal-700/bg-amber-600 hover:bg-amber-500/g' src/components/common/Header.tsx
sed -i 's/text-teal-200/text-white/g' src/components/common/Header.tsx
sed -i 's/text-teal-700/text-amber-600/g' src/components/common/Header.tsx
sed -i 's/bg-gradient-to-r from-teal-700 to-teal-700/bg-amber-600 hover:bg-amber-500/g' src/components/common/Header.tsx

# Make Header dark slate-950
sed -i "s/bg-white\/95 backdrop-blur-md/bg-slate-950\/95 backdrop-blur-md border-white\/10 text-white/g" src/components/common/Header.tsx
sed -i "s/bg-white\/90 backdrop-blur-sm/bg-slate-950\/90 backdrop-blur-sm border-white\/5 text-white/g" src/components/common/Header.tsx
sed -i "s/text-stone-900/text-white/g" src/components/common/Header.tsx
sed -i "s/text-stone-600/text-slate-300/g" src/components/common/Header.tsx
sed -i "s/hover:text-stone-900/hover:text-white/g" src/components/common/Header.tsx
sed -i "s/hover:bg-stone-50/hover:bg-white\/5/g" src/components/common/Header.tsx
sed -i "s/bg-stone-100/bg-white\/5/g" src/components/common/Header.tsx
sed -i "s/text-stone-700/text-white/g" src/components/common/Header.tsx
sed -i "s/text-stone-800/text-white/g" src/components/common/Header.tsx
sed -i "s/border-stone-200/border-white\/10/g" src/components/common/Header.tsx
sed -i "s/border-stone-100/border-white\/5/g" src/components/common/Header.tsx
sed -i "s/bg-white\/98/bg-slate-950\/98/g" src/components/common/Header.tsx
sed -i "s/text-stone-500/text-slate-400/g" src/components/common/Header.tsx
sed -i "s/text-stone-400/text-slate-500/g" src/components/common/Header.tsx

# Update fonts in index.html to Playfair Display
sed -i "s/Outfit/Playfair+Display/g" src/index.css
sed -i "s/Plus Jakarta Sans/Inter/g" src/index.css

