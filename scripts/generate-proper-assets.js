const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');

// Niger flag colors
const ORANGE = '#E05206';
const WHITE = '#FFFFFF';
const GREEN = '#0D9F4F';

// Create a Niger-themed icon with the flag colors and "NS" letters
async function createIcon(size, filename, isAdaptive = false) {
  const padding = isAdaptive ? Math.floor(size * 0.2) : Math.floor(size * 0.1);
  const innerSize = size - (padding * 2);
  const stripeHeight = Math.floor(innerSize / 3);
  const circleRadius = Math.floor(innerSize * 0.15);
  const circleY = Math.floor(innerSize / 2);
  const circleX = Math.floor(innerSize / 2);
  
  // Create SVG for the icon
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="roundedRect">
          <rect x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}" rx="${isAdaptive ? 0 : Math.floor(innerSize * 0.22)}" ry="${isAdaptive ? 0 : Math.floor(innerSize * 0.22)}"/>
        </clipPath>
      </defs>
      
      <!-- Background -->
      <rect width="${size}" height="${size}" fill="${isAdaptive ? 'transparent' : ORANGE}"/>
      
      <!-- Flag stripes clipped to rounded rect -->
      <g clip-path="url(#roundedRect)">
        <!-- Orange stripe -->
        <rect x="${padding}" y="${padding}" width="${innerSize}" height="${stripeHeight}" fill="${ORANGE}"/>
        <!-- White stripe -->
        <rect x="${padding}" y="${padding + stripeHeight}" width="${innerSize}" height="${stripeHeight}" fill="${WHITE}"/>
        <!-- Green stripe -->
        <rect x="${padding}" y="${padding + stripeHeight * 2}" width="${innerSize}" height="${stripeHeight + (innerSize - stripeHeight * 3)}" fill="${GREEN}"/>
        <!-- Orange circle in center -->
        <circle cx="${padding + circleX}" cy="${padding + circleY}" r="${circleRadius}" fill="${ORANGE}"/>
      </g>
      
      <!-- NS text -->
      <text x="${size/2}" y="${size/2 + innerSize * 0.08}" 
            font-family="Arial, Helvetica, sans-serif" 
            font-size="${Math.floor(innerSize * 0.35)}" 
            font-weight="bold" 
            fill="${WHITE}" 
            text-anchor="middle" 
            dominant-baseline="middle"
            stroke="${ORANGE}" 
            stroke-width="${Math.floor(innerSize * 0.02)}">NS</text>
    </svg>
  `;
  
  const outputPath = path.join(assetsDir, filename);
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
  
  console.log(`✓ Created ${filename} (${size}x${size})`);
  return outputPath;
}

// Create splash screen
async function createSplash(width, height, filename) {
  const centerY = height / 2;
  const flagHeight = Math.floor(height * 0.3);
  const flagWidth = Math.floor(width * 0.6);
  const flagX = (width - flagWidth) / 2;
  const flagY = centerY - flagHeight / 2 - height * 0.05;
  const stripeHeight = flagHeight / 3;
  const circleRadius = Math.floor(flagHeight * 0.12);
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background with Niger orange -->
      <rect width="${width}" height="${height}" fill="${ORANGE}"/>
      
      <!-- Flag container with rounded corners -->
      <defs>
        <clipPath id="flagClip">
          <rect x="${flagX}" y="${flagY}" width="${flagWidth}" height="${flagHeight}" rx="20" ry="20"/>
        </clipPath>
      </defs>
      
      <g clip-path="url(#flagClip)">
        <!-- Orange stripe -->
        <rect x="${flagX}" y="${flagY}" width="${flagWidth}" height="${stripeHeight}" fill="${ORANGE}"/>
        <!-- White stripe -->
        <rect x="${flagX}" y="${flagY + stripeHeight}" width="${flagWidth}" height="${stripeHeight}" fill="${WHITE}"/>
        <!-- Green stripe -->
        <rect x="${flagX}" y="${flagY + stripeHeight * 2}" width="${flagWidth}" height="${stripeHeight}" fill="${GREEN}"/>
        <!-- Orange circle -->
        <circle cx="${flagX + flagWidth/2}" cy="${flagY + flagHeight/2}" r="${circleRadius}" fill="${ORANGE}"/>
      </g>
      
      <!-- Border around flag -->
      <rect x="${flagX}" y="${flagY}" width="${flagWidth}" height="${flagHeight}" 
            fill="none" stroke="${WHITE}" stroke-width="4" rx="20" ry="20"/>
      
      <!-- App name -->
      <text x="${width/2}" y="${flagY + flagHeight + 80}" 
            font-family="Arial, Helvetica, sans-serif" 
            font-size="48" 
            font-weight="bold" 
            fill="${WHITE}" 
            text-anchor="middle">Niger Services</text>
      
      <!-- Tagline -->
      <text x="${width/2}" y="${flagY + flagHeight + 130}" 
            font-family="Arial, Helvetica, sans-serif" 
            font-size="24" 
            fill="${WHITE}" 
            opacity="0.9"
            text-anchor="middle">Vos services essentiels au quotidien</text>
    </svg>
  `;
  
  const outputPath = path.join(assetsDir, filename);
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
  
  console.log(`✓ Created ${filename} (${width}x${height})`);
  return outputPath;
}

// Create favicon
async function createFavicon(size, filename) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${ORANGE}" rx="8" ry="8"/>
      <text x="${size/2}" y="${size/2 + 4}" 
            font-family="Arial, Helvetica, sans-serif" 
            font-size="${Math.floor(size * 0.5)}" 
            font-weight="bold" 
            fill="${WHITE}" 
            text-anchor="middle" 
            dominant-baseline="middle">NS</text>
    </svg>
  `;
  
  const outputPath = path.join(assetsDir, filename);
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
  
  console.log(`✓ Created ${filename} (${size}x${size})`);
  return outputPath;
}

// Create Android adaptive icon foreground (just the content, transparent background)
async function createAdaptiveIconForeground(size, filename) {
  const innerSize = Math.floor(size * 0.6); // Content takes 60% of the safe zone
  const padding = (size - innerSize) / 2;
  const stripeHeight = innerSize / 3;
  const circleRadius = Math.floor(innerSize * 0.1);
  
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Transparent background for adaptive icon -->
      <rect width="${size}" height="${size}" fill="transparent"/>
      
      <!-- Flag design centered -->
      <defs>
        <clipPath id="innerClip">
          <rect x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}" rx="${innerSize * 0.15}" ry="${innerSize * 0.15}"/>
        </clipPath>
      </defs>
      
      <g clip-path="url(#innerClip)">
        <!-- Orange stripe -->
        <rect x="${padding}" y="${padding}" width="${innerSize}" height="${stripeHeight}" fill="${ORANGE}"/>
        <!-- White stripe -->
        <rect x="${padding}" y="${padding + stripeHeight}" width="${innerSize}" height="${stripeHeight}" fill="${WHITE}"/>
        <!-- Green stripe -->
        <rect x="${padding}" y="${padding + stripeHeight * 2}" width="${innerSize}" height="${stripeHeight}" fill="${GREEN}"/>
        <!-- Orange circle -->
        <circle cx="${size/2}" cy="${size/2}" r="${circleRadius}" fill="${ORANGE}"/>
      </g>
      
      <!-- NS text overlay -->
      <text x="${size/2}" y="${size/2 + innerSize * 0.05}" 
            font-family="Arial, Helvetica, sans-serif" 
            font-size="${Math.floor(innerSize * 0.4)}" 
            font-weight="bold" 
            fill="${WHITE}" 
            text-anchor="middle" 
            dominant-baseline="middle"
            stroke="${ORANGE}" 
            stroke-width="${Math.floor(innerSize * 0.02)}">NS</text>
    </svg>
  `;
  
  const outputPath = path.join(assetsDir, filename);
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
  
  console.log(`✓ Created ${filename} (${size}x${size})`);
  return outputPath;
}

async function main() {
  console.log('🇳🇪 Generating Niger Services assets...\n');
  
  // Ensure assets directory exists
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  
  try {
    // Standard app icon (1024x1024 for iOS, will be resized)
    await createIcon(1024, 'icon.png', false);
    
    // Adaptive icon for Android (1024x1024 foreground)
    await createAdaptiveIconForeground(1024, 'adaptive-icon.png');
    
    // Splash screen (1284x2778 for modern devices)
    await createSplash(1284, 2778, 'splash.png');
    
    // Favicon for web (48x48)
    await createFavicon(48, 'favicon.png');
    
    console.log('\n✅ All assets generated successfully!');
    console.log('\nAsset sizes:');
    
    const files = ['icon.png', 'adaptive-icon.png', 'splash.png', 'favicon.png'];
    for (const file of files) {
      const filePath = path.join(assetsDir, file);
      const stats = fs.statSync(filePath);
      const metadata = await sharp(filePath).metadata();
      console.log(`  ${file}: ${metadata.width}x${metadata.height} (${(stats.size / 1024).toFixed(1)} KB)`);
    }
    
  } catch (error) {
    console.error('❌ Error generating assets:', error);
    process.exit(1);
  }
}

main();
