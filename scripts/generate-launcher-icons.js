const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Niger flag colors
const ORANGE = '#E05206';
const WHITE = '#FFFFFF';
const GREEN = '#0D9F4F';

const androidResDir = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res');

// Android mipmap density configurations
const mipmapSizes = [
  { folder: 'mipmap-mdpi', size: 48 },
  { folder: 'mipmap-hdpi', size: 72 },
  { folder: 'mipmap-xhdpi', size: 96 },
  { folder: 'mipmap-xxhdpi', size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
];

// Create launcher icon SVG
function createIconSvg(size, isRound = false) {
  const innerSize = Math.floor(size * 0.75);
  const padding = (size - innerSize) / 2;
  const stripeHeight = innerSize / 3;
  const circleRadius = Math.floor(innerSize * 0.1);
  const borderRadius = isRound ? size / 2 : innerSize * 0.2;
  
  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${size}" height="${size}" fill="${ORANGE}" rx="${borderRadius}" ry="${borderRadius}"/>
      
      <!-- Flag design centered -->
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
        <!-- Orange circle in center -->
        <circle cx="${size/2}" cy="${size/2}" r="${circleRadius}" fill="${ORANGE}"/>
      </g>
      
      <!-- NS text -->
      <text x="${size/2}" y="${size/2 + innerSize * 0.05}" 
            font-family="Arial, Helvetica, sans-serif" 
            font-size="${Math.floor(innerSize * 0.4)}" 
            font-weight="bold" 
            fill="${WHITE}" 
            text-anchor="middle" 
            dominant-baseline="middle"
            stroke="${ORANGE}" 
            stroke-width="${Math.max(1, Math.floor(innerSize * 0.02))}">NS</text>
    </svg>
  `;
}

async function main() {
  console.log('🎨 Generating Android launcher icons...\n');
  
  for (const density of mipmapSizes) {
    const outputDir = path.join(androidResDir, density.folder);
    
    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate regular icon (PNG)
    const iconSvg = createIconSvg(density.size, false);
    const iconPath = path.join(outputDir, 'ic_launcher.png');
    await sharp(Buffer.from(iconSvg)).png().toFile(iconPath);
    console.log(`✓ ${density.folder}/ic_launcher.png (${density.size}x${density.size})`);
    
    // Generate round icon (PNG)
    const roundSvg = createIconSvg(density.size, true);
    const roundPath = path.join(outputDir, 'ic_launcher_round.png');
    await sharp(Buffer.from(roundSvg)).png().toFile(roundPath);
    console.log(`✓ ${density.folder}/ic_launcher_round.png (${density.size}x${density.size})`);
  }
  
  console.log('\n✅ All launcher icons generated!');
}

main().catch(console.error);
