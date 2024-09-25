import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb
});

// Append the PIXI canvas to the document body.
document.body.appendChild(app.view);

// Create a simple rectangle.
const graphics = new PIXI.Graphics();
graphics.beginFill(0xde3249);
graphics.drawRect(50, 50, 100, 100);
graphics.endFill();

app.stage.addChild(graphics);
