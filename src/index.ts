import * as PIXI from 'pixi.js';

export class Game {
    private app: PIXI.Application;

    constructor() {
        // Initialize the PIXI application with a background color
        this.app = new PIXI.Application({ 
            width: 800, 
            height: 600,
            backgroundColor: 0x1099bb // Set the background color here
        });

        // Append the PIXI canvas (app.view) to the HTML body
        document.body.appendChild(this.app.view);

        // Start the game setup
        this.setup();
    }

    private setup() {
        // Create graphics and add them to the stage
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xff0000); // Red color
        graphics.drawRect(50, 50, 100, 100); // Draw a rectangle
        graphics.endFill();

        // Add the graphics to the stage
        this.app.stage.addChild(graphics);
    }
}

// Start the game
const game = new Game();
