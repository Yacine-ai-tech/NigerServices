const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, 'assets');

// Create a simple orange square as base image
async function generateAssets() {
  try {
    // Create a 1024x1024 orange image for icon
    const iconBuffer = await sharp({
      create: {
        width: 1024,
        height: 1024,
        channels: 3,
        background: { r: 224, g: 82, b: 6 } // Orange (#E05206)
      }
    })
    .png()
    .toBuffer();

    // Write icon
    fs.writeFileSync(path.join(assetsDir, 'icon.png'), iconBuffer);
    console.log('✓ Created icon.png (1024x1024)');

    // Create adaptive icon (foreground) - 1024x1024
    const adaptiveBuffer = await sharp({
      create: {
        width: 1024,
        height: 1024,
        channels: 3,
        background: { r: 224, g: 82, b: 6 }
      }
    })
    .png()
    .toBuffer();

    fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.png'), adaptiveBuffer);
    console.log('✓ Created adaptive-icon.png (1024x1024)');

    // Create splash screen - 1080x1920
    const splashBuffer = await sharp({
      create: {
        width: 1080,
        height: 1920,
        channels: 3,
        background: { r: 224, g: 82, b: 6 }
      }
    })
    .png()
    .toBuffer();

    fs.writeFileSync(path.join(assetsDir, 'splash.png'), splashBuffer);
    console.log('✓ Created splash.png (1080x1920)');

    // Create favicon - 192x192
    const faviconBuffer = await sharp({
      create: {
        width: 192,
        height: 192,
        channels: 3,
        background: { r: 224, g: 82, b: 6 }
      }
    })
    .png()
    .toBuffer();

    fs.writeFileSync(path.join(assetsDir, 'favicon.png'), faviconBuffer);
    console.log('✓ Created favicon.png (192x192)');

    console.log('\n✅ All assets generated successfully with proper PNG encoding!');
  } catch (error) {
    console.error('❌ Error generating assets:', error.message);
    process.exit(1);
  }
}

generateAssets();
