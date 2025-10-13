#!/bin/bash

# Console.log Cleanup für Production
# Entfernt DEBUG-Logs, behält ERROR/WARN

echo "🧹 Cleaning console.log statements..."

# Backup erstellen
for file in js/main.js js/cookie-banner.js js/auth.js; do
  if [ -f "$file" ]; then
    cp "$file" "${file}.backup"
    echo "  ✅ Backup: ${file}.backup"
  fi
done

# Debug console.logs kommentieren (nicht error/warn)
sed -i '' 's/^  console\.log(/  \/\/ console.log(/g' js/main.js
sed -i '' 's/^      console\.log(/      \/\/ console.log(/g' js/main.js
sed -i '' 's/^    console\.log(/    \/\/ console.log(/g' js/cookie-banner.js
sed -i '' 's/^  console\.log(/  \/\/ console.log(/g' js/auth.js

echo "✅ Console cleanup complete!"
echo ""
echo "📊 Remaining console statements:"
grep -rn "console\." js/ --include="*.js" | grep -v "^js/.*\.backup" | wc -l

