import * as PIXI from 'pixi.js';
import { Vault } from './vault'; // Import the Vault class

export class Game {
    private app: PIXI.Application;
    private vault!: Vault; // Use the definite assignment assertion

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
        // Create an instance of the Vault class and set it up
        this.vault = new Vault(this.app);
        this.vault.setup(); // Call the setup method for the vault
    }
}

// Start the game
const game = new Game();
