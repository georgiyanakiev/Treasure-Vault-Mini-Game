import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { Assets } from '@pixi/assets'; 

export class Game {
    private app: PIXI.Application;
    private assets: { [key: string]: PIXI.Texture } = {}; // Store loaded textures

    constructor(app: PIXI.Application) {
        // Initialize the PIXI application
        this.app = app;
        this.setup();

        const door = document.getElementById('door');
        if (door) {
            door.appendChild(this.app.view);
        }
        // Append the PIXI canvas to the HTML body
        document.body.appendChild(this.app.view);
        
        // Start loading assets
        this.setup();
    }

    private async setup() {
        try {
            await this.loadAllAssets(); // Load all assets
            this.createPreviewScene(); // Show the preview images
            this.animatePreview(); // Animate the preview images with GSAP
        } catch (error) {
            console.error('Error loading assets:', error);
        }
        console.log(this.app.view); 
    }

    // Load all game assets using Assets from '@pixi/assets'
    private async loadAllAssets(): Promise<void> {
        try {
            const assetsToLoad = [
                { name: 'bg', url: 'bg.png' },
                { name: 'blink', url: 'blink.png' },
                { name: 'door', url: 'door.png' },
                { name: 'doorOpen', url: 'doorOpen.png' },
                { name: 'doorOpenShadow', url: 'doorOpenShadow.png' },
                { name: 'handle', url: 'handle.png' },
                { name: 'handleShadow', url: 'handleShadow.png' },
                { name: 'vault', url: 'vault.jpg' }, // Preview
                { name: 'vaultOpen', url: 'vaultOpen.jpg' } // Preview
            ];

            for (const asset of assetsToLoad) {
                this.assets[asset.name] = await Assets.load(asset.url);
            }
        } catch (error) {
            console.error('Error loading assets:', error);
            throw error;
        }
    }

    private createPreviewScene() {
        // Create vault preview sprite
        const vaultPreview = new PIXI.Sprite(this.assets['vault']);
        vaultPreview.x = 150;
        vaultPreview.y = 100;
        vaultPreview.width = 200;
        vaultPreview.height = 200;
        vaultPreview.name = "vault"; // Set name for future reference
        this.app.stage.addChild(vaultPreview);

        // Create vault open preview sprite
        const vaultOpenPreview = new PIXI.Sprite(this.assets['vaultOpen']);
        vaultOpenPreview.x = 450;
        vaultOpenPreview.y = 100;
        vaultOpenPreview.width = 200;
        vaultOpenPreview.height = 200;
        vaultOpenPreview.name = "vaultOpen"; // Set name for future reference
        this.app.stage.addChild(vaultOpenPreview);
    }

    // Animate the preview images using GSAP
    private animatePreview() {
        const vaultPreview = this.app.stage.getChildByName("vault");
        const vaultOpenPreview = this.app.stage.getChildByName("vaultOpen");

        if (vaultPreview && vaultOpenPreview) {
            // GSAP animation for vaultPreview
            gsap.to(vaultPreview.scale, {
                x: 1.1,
                y: 1.1,
                duration: 1,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
            });

            // GSAP animation for vaultOpenPreview
            gsap.to(vaultOpenPreview, {
                rotation: Math.PI * 2, // 360-degree rotation
                duration: 3,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
            });
        }
    }
}

// Start the game
const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);
const game = new Game(app);
