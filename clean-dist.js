import fs from 'fs';
import path from 'path';

const distLibrary = path.join(process.cwd(), 'dist', 'library');

if (fs.existsSync(distLibrary)) {
  const files = fs.readdirSync(distLibrary);
  for (const file of files) {
    if (file.endsWith('.pdf') || file.endsWith('.mp3')) {
      fs.unlinkSync(path.join(distLibrary, file));
      console.log(`Removed heavy asset from dist: ${file}`);
    }
  }
}
