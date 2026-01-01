const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Niger flag colors
const ORANGE = '#E05206';
const WHITE = '#FFFFFF';
const GREEN = '#0D9F4F';

const androidResDir = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res');

// Density configurations for Android
const densities = [
  { folder: 'drawable-mdpi', size: 100 },
  { folder: 'drawable-hdpi', size: 150 },
  { folder: 'drawable-xhdpi', size: 200 },
  { folder: 'drawable-xxhdpi', size: 300 },
  { folder: 'drawable-xxxhdpi', size: 400 },
];

async function createSplashLogo(size) {
  const innerSize = Math.floor(size * 0.8);
  const padding = (size - innerSize) / 2;
  const stripeHeight = innerSize / 3;
  const circleRadius = Math.floor(innerSize * 0.08);
  
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Transparent background -->
      <rect width="${size}" height="${size}" fill="transparent"/>
      
      <!-- Flag design centered with rounded corners -->
      <defs>
        <clipPath id="flagClip">
          <rect x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}" rx="${innerSize * 0.15}" ry="${innerSize * 0.15}"/>
        </clipPath>
      </defs>
      
      <g clip-path="url(#flagClip)">
        <!-- Orange stripe -->
        <rect x="${padding}" y="${padding}" width="${innerSize}" height="${stripeHeight}" fill="${ORANGE}"/>
        <!-- White stripe -->
        <rect x="${padding}" y="${padding + stripeHeight}" width="${innerSize}" height="${stripeHeight}" fill="${WHITE}"/>
        <!-- Green stripe -->
        <rect x="${padding}" y="${padding + stripeHeight * 2}" width="${innerSize}" height="${stripeHeight}" fill="${GREEN}"/>
        <!-- Orange circle -->
        <circle cx="${size/2}" cy="${size/2}" r="${circleRadius}" fill="${ORANGE}"/>
      </g>
      
      <!-- White border -->
      <rect x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}" 
            fill="none" stroke="${WHITE}" stroke-width="${Math.max(2, size * 0.02)}" rx="${innerSize * 0.15}" ry="${innerSize * 0.15}"/>
      
      <!-- NS text -->
      <text x="${size/2}" y="${size/2 + innerSize * 0.05}" 
            font-family="Arial, Helvetica, sans-serif" 
            font-size="${Math.floor(innerSize * 0.35)}" 
            font-weight="bold" 
            fill="${WHITE}" 
            text-anchor="middle" 
            dominant-baseline="middle"
            stroke="${ORANGE}" 
            stroke-width="${Math.floor(innerSize * 0.015)}">NS</text>
    </svg>
  `;
  
  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function main() {
  console.log('🎨 Generating Android splash screen assets...\n');
  
  for (const density of densities) {
    const outputDir = path.join(androidResDir, density.folder);
    
    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'splashscreen_logo.png');
    const buffer = await createSplashLogo(density.size);
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`✓ ${density.folder}/splashscreen_logo.png (${density.size}x${density.size})`);
  }
  
  console.log('\n✅ All splash screen assets generated!');
}

main().catch(console.error);
