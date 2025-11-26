const fs = require('fs');
const path = require('path');

const sourceDir = '/Users/kuza/Desktop/fotky kalendar';
const targetDir = path.join(__dirname, 'public', 'images');

// Získat seznam souborů a seřadit je
try {
  const files = fs.readdirSync(sourceDir)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg'].includes(ext);
    })
    .sort();

  console.log(`Našel jsem ${files.length} obrázků`);

  // Zkopírovat a přejmenovat soubory
  files.slice(0, 24).forEach((file, index) => {
    const dayNumber = index + 1;
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, `day${dayNumber}.png`);
    
    // Pokud je soubor JPEG, zkopírujeme ho jako PNG (nebo můžeme převést)
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpeg' || ext === '.jpg') {
      // Pro jednoduchost zkopírujeme a přejmenujeme příponu
      const tempPath = path.join(targetDir, `day${dayNumber}${ext}`);
      fs.copyFileSync(sourcePath, tempPath);
      // Pokud chceme PNG, můžeme použít sharp nebo jen přejmenovat
      // Pro teď zkopírujeme jako je
      if (fs.existsSync(tempPath)) {
        fs.renameSync(tempPath, targetPath);
      }
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
    
    console.log(`✓ Zkopírováno: ${file} -> day${dayNumber}.png`);
  });

  console.log('\nHotovo! Všechny obrázky byly zkopírovány.');
} catch (error) {
  console.error('Chyba:', error.message);
  console.error('\nMožná řešení:');
  console.error('1. Zkontrolujte, že máte oprávnění k adresáři Desktop');
  console.error('2. Zkuste zkopírovat soubory ručně přes Finder:');
  console.error(`   Z: ${sourceDir}`);
  console.error(`   Do: ${targetDir}`);
  console.error('   A přejmenujte je na day1.png, day2.png, ..., day24.png');
}



