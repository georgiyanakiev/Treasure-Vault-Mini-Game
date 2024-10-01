import * as PIXI from 'pixi.js';

export class Game {
    private app: PIXI.Application;

    constructor() {
        // Initialize the PIXI application
        this.app = new PIXI.Application({
            width: 800, 
            height: 600,
            backgroundColor: 0x1099bb // Optional: Set a background color
        });

        // Append the PIXI canvas (app.view) to the HTML body or a specific container
        document.body.appendChild(this.app.view);

        // Start the game setup
        this.setup();
    }

    private setup() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xff0000);
        graphics.drawRect(50, 50, 100, 100);
        graphics.endFill();
        
        // Add the graphics to the stage
        this.app.stage.addChild(graphics);
    
        // Simple animation - rotate the rectangle
        this.app.ticker.add((delta) => {
            graphics.rotation += 0.01 * delta;
        }); // Closing parentheses for the add function
    }
}

// Start the game
const game = new Game(); // Make sure this is outside the class body
