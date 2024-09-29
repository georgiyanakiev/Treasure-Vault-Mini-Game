import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';

export class Vault {
    private app: PIXI.Application;
    private vault: PIXI.Sprite;
    private handle: PIXI.Sprite;
    private treasure: PIXI.Sprite;
    private currentInput: Array<{ number: number; direction: string }>;
    private isLocked: boolean;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.vault = new PIXI.Sprite(PIXI.Texture.from('vault.jpg')); // Placeholder path
        this.handle = new PIXI.Sprite(PIXI.Texture.from('handle.png')); // Placeholder path
        this.treasure = new PIXI.Sprite(PIXI.Texture.from('bg.png')); // Placeholder path
        this.currentInput = [];
        this.isLocked = true;
    }

    

 
    

    

  

 

   

    
}
