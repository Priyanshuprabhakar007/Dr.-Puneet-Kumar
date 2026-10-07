#!/bin/bash

# Replace sky with teal
find src -type f -name "*.tsx" -o -name "*.ts" -o -name "*.css" | xargs sed -i 's/sky-/teal-/g'
find src -type f -name "*.tsx" -o -name "*.ts" -o -name "*.css" | xargs sed -i 's/slate-/stone-/g'

