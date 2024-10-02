// src/main.ts

import * as PIXI from 'pixi.js';

// Game Class Definition
class Game {
    private app: PIXI.Application; // Declare a variable to hold the PIXI application

    constructor(app: PIXI.Application) { // Constructor receives the app instance
        this.app = app; // Assign the app instance to the class variable
        this.setup(); // Call the setup method
    }

    private setup() {
        // Log the canvas to ensure it's defined
        console.log(this.app.view); 

        // Additional setup code can go here, like loading assets, creating sprites, etc.
    }
}

// 1. Initialize the PIXI Application
const app = new PIXI.Application({
    width: 800, // Width of the canvas
    height: 600, // Height of the canvas
    backgroundColor: 0x1099bb, // Background color
});

// 2. Append the view (canvas) to the DOM
document.body.appendChild(app.view); // Adds the canvas to the document body after app initialization

// 3. Instantiate the Game Class
const game = new Game(app); // Pass the app instance to the Game class
