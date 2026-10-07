#!/bin/bash

# Fix colors
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/amber-/blue-/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/teal-/blue-/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/stone-/slate-/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/emerald-/green-/g'

# Fix rounded-none back to rounded-2xl
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/rounded-none/rounded-2xl/g'

