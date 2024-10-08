"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = __importStar(require("pixi.js"));
// Game Class Definition
class Game {
    constructor(app) {
        this.app = app; // Assign the app instance to the class variable
        this.setup(); // Call the setup method
    }
    setup() {
        // Log the canvas to ensure it's defined
        console.log(this.app.view);
        // Additional setup code can go here, like loading assets, creating sprites, etc.
    }
}
// 1. Initialize the PIXI Application
const app = new PIXI.Application({
    width: 1800, // Width of the canvas
    height: 1600, // Height of the canvas
});
// 2. Append the view (canvas) to the DOM
document.body.appendChild(app.view); // Adds the canvas to the document body after app initialization
// 3. Instantiate the Game Class
const game = new Game(app); // Pass the app instance to the Game class
