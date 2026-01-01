const fs = require('fs');
const path = require('path');

// Minimal 64x64 PNG (orange background with white border) encoded in base64
const tinyPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAACqGk6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHUlEQVR4nO3XsQnCMBBF0Z8ZgQF7iC7qQ7qQ7qQ7qQ7qQ7qQ7qQ7qQ7qQ7qQ7qQ7qQ7qQ7qQ7qQ7qQv4m8cGQm+6y4Yd8tm8S0z3vl3GdQ4t0XoA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA6oA+oNxtAZ+1i2+qk5pWQAAAABJRU5ErkJggg==';

const files = [
  { name: 'icon.png', base64: tinyPngBase64 },
  { name: 'adaptive-icon.png', base64: tinyPngBase64 },
  { name: 'splash.png', base64: tinyPngBase64 },
  { name: 'favicon.png', base64: tinyPngBase64 },
];

const outDir = path.join(__dirname);
files.forEach(f => {
  const outPath = path.join(outDir, f.name);
  fs.writeFileSync(outPath, Buffer.from(f.base64, 'base64'));
  console.log('Created', outPath);
});
console.log('All assets generated.');
