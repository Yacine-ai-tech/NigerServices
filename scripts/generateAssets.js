const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir);

const images = [
  {
    name: 'icon.png',
    // 512x512 orange square placeholder
    base64:
      'iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAD8GO2jAAABtUlEQVR4nO3QsQnCMBBAURbO/6d0s5hQyqjxg5zFYp9z9uI+g0vwgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8G7w8+2v2X8z8n8qv8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/wn+9AAABk0lEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4G2QAAQABJREFUeJztwQENAAAAwqD3T20PBxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwG9gABdD5T4wAAAABJRU5ErkJggg==',
  },
  {
    name: 'adaptive-icon.png',
    base64:
      'iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAD8GO2jAAABtUlEQVR4nO3QsQnCMBBAURbO/6d0s5hQyqjxg5zFYp9z9uI+g0vwgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8G7w8+2v2X8z8n8qv8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/wn+9AAABk0lEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwG9gABdD5T4wAAAABJRU5ErkJggg==',
  },
  {
    name: 'splash.png',
    base64:
      'iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAD8GO2jAAABtUlEQVR4nO3QsQnCMBBAURbO/6d0s5hQyqjxg5zFYp9z9uI+g0vwgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8G7w8+2v2X8z8n8qv8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/yn/Kf8p/wn+9AAABk0lEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwG9gABdD5T4wAAAABJRU5ErkJggg==',
  },
  {
    name: 'favicon.png',
    base64:
      'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAI0lEQVR4AWP4//8/AxJgYGBg+M8wUjAwMDAwMDAwMAD3eQH6D3VgZQAAAABJRU5ErkJggg==',
  },
];

images.forEach((img) => {
  const filePath = path.join(assetsDir, img.name);
  fs.writeFileSync(filePath, Buffer.from(img.base64, 'base64'));
  console.log('Created', filePath);
});

console.log('Assets generated. Replace placeholders with proper images before publishing.');
