const fs = require('fs');
const path = require('path');

// Valid 1x1 orange PNG as base64
const orangePNGBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

// Valid 1x1 transparent PNG as base64
const transparentPNGBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77AAAAAABJRU5ErkJggg==';

const assetsDir = path.join(__dirname, 'assets');

// Create directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Decode base64 and write files
fs.writeFileSync(path.join(assetsDir, 'icon.png'), Buffer.from(orangePNGBase64, 'base64'));
fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.png'), Buffer.from(orangePNGBase64, 'base64'));
fs.writeFileSync(path.join(assetsDir, 'splash.png'), Buffer.from(orangePNGBase64, 'base64'));
fs.writeFileSync(path.join(assetsDir, 'favicon.png'), Buffer.from(transparentPNGBase64, 'base64'));

console.log('✅ Created all PNG assets from valid base64 data!');