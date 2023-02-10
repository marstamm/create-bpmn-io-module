import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function copyToModule(localPath) {
  fs.copySync(
    getSourcePath(localPath),
    process.cwd(),
    { overwrite: false });
}

// TODO: allow to replace placeholders in files

export function copyAndReplace(localPath, placeholders) {

  fs.readdirSync(getSourcePath(localPath), 'utf8')
    .forEach(file => {

      // TODO: recursively copy
      const filePath = getSourcePath(path.join(localPath, file));

      if (fs.statSync(filePath).isDirectory()) {
        return;
      }

      let content = fs.readFileSync(filePath, 'utf8');

      for (const placeholder in placeholders) {
        const replacer = placeholders[placeholder];

        content = content.replaceAll(placeholder, replacer);
      }

      fs.writeFileSync(file, content);
    });

}


function getSourcePath(localPath) {
  return path.join(__dirname, '../../', localPath);
}