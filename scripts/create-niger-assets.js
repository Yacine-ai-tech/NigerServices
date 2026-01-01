const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '..', 'assets');

// Niger flag colors: Orange (top), White (middle), Green (bottom) with orange sun
const ORANGE = { r: 231, g: 120, b: 23 }; // #E77817
const WHITE = { r: 255, g: 255, b: 255 };
const GREEN = { r: 13, g: 176, b: 43 }; // #0DB02B

async function createNigerFlagIcon(size, filename) {
  // Create an SVG with Niger flag design
  const svgIcon = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="rounded">
          <rect width="${size}" height="${size}" rx="${size * 0.2}" ry="${size * 0.2}"/>
        </clipPath>
      </defs>
      <g clip-path="url(#rounded)">
        <!-- Orange stripe -->
        <rect x="0" y="0" width="${size}" height="${size / 3}" fill="#E77817"/>
        <!-- White stripe -->
        <rect x="0" y="${size / 3}" width="${size}" height="${size / 3}" fill="#FFFFFF"/>
        <!-- Green stripe -->
        <rect x="0" y="${(size * 2) / 3}" width="${size}" height="${size / 3}" fill="#0DB02B"/>
        <!-- Orange sun circle in center -->
        <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.12}" fill="#E77817"/>
      </g>
    </svg>
  `;

  await sharp(Buffer.from(svgIcon))
    .resize(size, size)
    .png()
    .toFile(path.join(assetsDir, filename));
  
  console.log(`✓ Created ${filename} (${size}x${size})`);
}

async function createSplashScreen() {
  const width = 1284;
  const height = 2778;
  
  // Create splash with Niger flag gradient and app name
  const svgSplash = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Orange stripe -->
      <rect x="0" y="0" width="${width}" height="${height / 3}" fill="#E77817"/>
      <!-- White stripe -->
      <rect x="0" y="${height / 3}" width="${width}" height="${height / 3}" fill="#FFFFFF"/>
      <!-- Green stripe -->
      <rect x="0" y="${(height * 2) / 3}" width="${width}" height="${height / 3}" fill="#0DB02B"/>
      
      <!-- Central white circle background -->
      <circle cx="${width / 2}" cy="${height / 2}" r="300" fill="white" opacity="0.95"/>
      
      <!-- Orange sun symbol -->
      <circle cx="${width / 2}" cy="${height / 2 - 50}" r="80" fill="#E77817"/>
      
      <!-- App name text -->
      <text x="${width / 2}" y="${height / 2 + 100}" 
            font-family="Arial, sans-serif" 
            font-size="72" 
            font-weight="bold" 
            fill="#E77817" 
            text-anchor="middle">Niger Services</text>
      
      <!-- Subtitle -->
      <text x="${width / 2}" y="${height / 2 + 170}" 
            font-family="Arial, sans-serif" 
            font-size="36" 
            fill="#333333" 
            text-anchor="middle">Votre assistant quotidien</text>
    </svg>
  `;

  await sharp(Buffer.from(svgSplash))
    .resize(width, height)
    .png()
    .toFile(path.join(assetsDir, 'splash.png'));
  
  console.log(`✓ Created splash.png (${width}x${height})`);
}

async function createAdaptiveIcon() {
  const size = 1024;
  
  // Adaptive icon with Niger flag background and sun
  const svgAdaptive = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Orange stripe -->
      <rect x="0" y="0" width="${size}" height="${size / 3}" fill="#E77817"/>
      <!-- White stripe -->
      <rect x="0" y="${size / 3}" width="${size}" height="${size / 3}" fill="#FFFFFF"/>
      <!-- Green stripe -->
      <rect x="0" y="${(size * 2) / 3}" width="${size}" height="${size / 3}" fill="#0DB02B"/>
      <!-- Orange sun in center -->
      <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.15}" fill="#E77817"/>
    </svg>
  `;

  await sharp(Buffer.from(svgAdaptive))
    .resize(size, size)
    .png()
    .toFile(path.join(assetsDir, 'adaptive-icon.png'));
  
  console.log(`✓ Created adaptive-icon.png (${size}x${size})`);
}

async function createFavicon() {
  const size = 196;
  
  const svgFavicon = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="roundedFav">
          <rect width="${size}" height="${size}" rx="20" ry="20"/>
        </clipPath>
      </defs>
      <g clip-path="url(#roundedFav)">
        <!-- Orange stripe -->
        <rect x="0" y="0" width="${size}" height="${size / 3}" fill="#E77817"/>
        <!-- White stripe -->
        <rect x="0" y="${size / 3}" width="${size}" height="${size / 3}" fill="#FFFFFF"/>
        <!-- Green stripe -->
        <rect x="0" y="${(size * 2) / 3}" width="${size}" height="${size / 3}" fill="#0DB02B"/>
        <!-- Orange sun -->
        <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.12}" fill="#E77817"/>
      </g>
    </svg>
  `;

  await sharp(Buffer.from(svgFavicon))
    .resize(size, size)
    .png()
    .toFile(path.join(assetsDir, 'favicon.png'));
  
  console.log(`✓ Created favicon.png (${size}x${size})`);
}

async function main() {
  try {
    // Ensure assets directory exists
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    console.log('Creating Niger flag themed assets...\n');
    
    await createNigerFlagIcon(1024, 'icon.png');
    await createAdaptiveIcon();
    await createSplashScreen();
    await createFavicon();
    
    console.log('\n✅ All Niger-themed assets created successfully!');
  } catch (error) {
    console.error('❌ Error creating assets:', error);
    process.exit(1);
  }
}

main();
