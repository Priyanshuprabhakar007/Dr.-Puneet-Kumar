#!/bin/bash

find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/rounded-3xl/rounded-sm/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/rounded-2xl/rounded-sm/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/rounded-xl/rounded-sm/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/rounded-lg/rounded-sm/g'

