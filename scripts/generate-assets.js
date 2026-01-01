// Icon Generation Script for Niger Services
// Run this script to generate app icons using Sharp library
// npm install sharp

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Niger flag colors
const ORANGE = '#E05206';
const WHITE = '#FFFFFF';
const GREEN = '#0D9F4F';

// Create SVG icon with Niger flag colors
const createIconSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${ORANGE};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#B84000;stop-opacity:1" />
    </linearGradient>
  </defs>
  <!-- Background circle -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 10}" fill="url(#grad)"/>
  <!-- Sun symbol (from Niger flag) -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/5}" fill="${WHITE}"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/8}" fill="${ORANGE}"/>
  <!-- Text NS -->
  <text x="${size/2}" y="${size/2 + size/15}" 
        font-family="Arial Black, Arial" 
        font-size="${size/4}" 
        font-weight="bold" 
        fill="${WHITE}" 
        text-anchor="middle">NS</text>
</svg>`;

// Create splash screen SVG
const createSplashSVG = () => `
<svg width="1284" height="2778" viewBox="0 0 1284 2778" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1284" height="2778" fill="${ORANGE}"/>
  
  <!-- Flag stripes at top -->
  <rect x="442" y="900" width="133" height="200" fill="${ORANGE}"/>
  <rect x="575" y="900" width="134" height="200" fill="${WHITE}"/>
  <rect x="709" y="900" width="133" height="200" fill="${GREEN}"/>
  
  <!-- Main icon circle -->
  <circle cx="642" cy="1300" r="180" fill="${WHITE}" opacity="0.2"/>
  <circle cx="642" cy="1300" r="140" fill="${WHITE}"/>
  
  <!-- NS text in circle -->
  <text x="642" y="1340" 
        font-family="Arial Black, Arial" 
        font-size="100" 
        font-weight="bold" 
        fill="${ORANGE}" 
        text-anchor="middle">NS</text>
  
  <!-- App name -->
  <text x="642" y="1550" 
        font-family="Arial" 
        font-size="64" 
        font-weight="bold" 
        fill="${WHITE}" 
        text-anchor="middle">Niger Services</text>
  
  <!-- Tagline -->
  <text x="642" y="1620" 
        font-family="Arial" 
        font-size="32" 
        fill="${WHITE}" 
        opacity="0.8"
        text-anchor="middle">Votre assistant quotidien</text>
</svg>`;

async function generateAssets() {
  const assetsDir = path.join(__dirname, 'assets');
  
  // Ensure assets directory exists
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Generate icon.png (1024x1024)
  console.log('Generating icon.png...');
  await sharp(Buffer.from(createIconSVG(1024)))
    .png()
    .toFile(path.join(assetsDir, 'icon.png'));

  // Generate adaptive-icon.png (1024x1024)
  console.log('Generating adaptive-icon.png...');
  await sharp(Buffer.from(createIconSVG(1024)))
    .png()
    .toFile(path.join(assetsDir, 'adaptive-icon.png'));

  // Generate favicon.png (48x48)
  console.log('Generating favicon.png...');
  await sharp(Buffer.from(createIconSVG(48)))
    .png()
    .toFile(path.join(assetsDir, 'favicon.png'));

  // Generate splash.png (1284x2778)
  console.log('Generating splash.png...');
  await sharp(Buffer.from(createSplashSVG()))
    .png()
    .toFile(path.join(assetsDir, 'splash.png'));

  console.log('All assets generated successfully!');
}

generateAssets().catch(console.error);
