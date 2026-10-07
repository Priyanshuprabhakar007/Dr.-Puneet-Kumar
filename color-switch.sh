#!/bin/bash

# Change all remaining teal colors to amber
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/teal-/amber-/g'

