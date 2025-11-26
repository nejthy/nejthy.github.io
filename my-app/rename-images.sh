#!/bin/bash

cd "/Users/kuza/.cursor/worktrees/nejthy.github.io/jglAZ/my-app/public/images"

# Najít všechny obrázky (kromě těch, které už začínají na "day")
files=$(find . -maxdepth 1 -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) ! -name "day*.png" | sort)

counter=1

for file in $files; do
    if [ $counter -le 24 ]; then
        filename=$(basename "$file")
        newname="day${counter}.png"
        
        # Pokud soubor není PNG, zkopírujeme ho jako PNG
        if [[ ! "$filename" =~ \.png$ ]]; then
            # Použijeme sips pro konverzi (macOS nástroj)
            sips -s format png "$file" --out "$newname" 2>/dev/null || cp "$file" "$newname"
        else
            mv "$file" "$newname" 2>/dev/null || cp "$file" "$newname"
        fi
        
        echo "✓ Přejmenováno: $filename -> $newname"
        counter=$((counter + 1))
    fi
done

echo ""
echo "Hotovo! Přejmenováno $((counter - 1)) souborů."


