import * as PIXI from 'pixi.js';
import { Vault } from './vault';
const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);
// Create a new instance of the Vault game
const vaultGame = new Vault(app);
// Call the setup method to initialize the game
vaultGame.setup();
