import * as PIXI from 'pixi.js';
import { Vault } from './vault';

export class Game {
    private app: PIXI.Application;
    private vault: Vault;

    constructor() {
        this.app = new PIXI.Application({ width: 800, height: 600 });
        document.getElementById('game-container')?.appendChild(this.app.view);
        this.vault = new Vault(this.app);
    }

    public start() {
        this.vault.setup();
    }
}
