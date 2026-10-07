#!/bin/bash

# Change all rounded-sm to rounded-none for a stark, editorial look
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/rounded-sm/rounded-none/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/rounded-md/rounded-none/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/rounded-full/rounded-none/g'

