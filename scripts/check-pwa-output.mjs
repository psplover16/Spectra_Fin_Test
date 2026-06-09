import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { cwd, exit } from 'node:process';

const distDir = join(cwd(), 'dist');
const requiredFiles = ['manifest.webmanifest', 'sw.js'];
const missingFiles = requiredFiles.filter((fileName) => !existsSync(join(distDir, fileName)));

if (missingFiles.length > 0) {
  console.error(`Missing PWA build output: ${missingFiles.join(', ')}`);
  exit(1);
}

console.log('PWA build output exists.');
