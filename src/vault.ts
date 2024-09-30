import * as PIXI from 'pixi.js'; 
import { gsap } from 'gsap';

declare module 'pixi.js' {
    interface Sprite {
      buttonMode: boolean;
    }
  }

export class Vault {
    private app: PIXI.Application;
    private vault: PIXI.Sprite;
    private vaultOpen: PIXI.Sprite; // Open vault sprite
    private handle: PIXI.Sprite;
    private handleShadow: PIXI.Sprite; // Shadow for the handle
    private treasure: PIXI.Sprite;
    private door: PIXI.Sprite; // Closed door
    private doorOpen: PIXI.Sprite; // Open door
    private doorOpenShadow: PIXI.Sprite; // Shadow of the open door
    private background: PIXI.Sprite; // Background
    private blinkEffect: PIXI.Sprite; // Glitter effect
    private secretCombination: Array<{ number: number; direction: string }>;
    private currentInput: Array<{ number: number; direction: string }>;
    private isLocked: boolean;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.background = new PIXI.Sprite(PIXI.Texture.from('assets/bg.jpg')); // Placeholder path for background
        this.vault = new PIXI.Sprite(PIXI.Texture.from('preview/vault.jpg')); // Placeholder path
        this.vaultOpen = new PIXI.Sprite(PIXI.Texture.from('preview/vaultOpen.png')); // Placeholder path for open vault
        this.handle = new PIXI.Sprite(PIXI.Texture.from('assets/handle.png')); // Placeholder path
        this.handleShadow = new PIXI.Sprite(PIXI.Texture.from('assets/handleShadow.png')); // Placeholder path
        this.treasure = new PIXI.Sprite(PIXI.Texture.from('assets/treasure.png')); // Placeholder path
        this.door = new PIXI.Sprite(PIXI.Texture.from('assets/door.png')); // Placeholder path
        this.doorOpen = new PIXI.Sprite(PIXI.Texture.from('assets/doorOpen.png')); // Placeholder path
        this.doorOpenShadow = new PIXI.Sprite(PIXI.Texture.from('assets/doorOpenShadow.png')); // Placeholder path
        this.blinkEffect = new PIXI.Sprite(PIXI.Texture.from('assets/blink.png')); // Placeholder path for glitter effect
        this.secretCombination = this.generateSecretCombination();
        this.currentInput = [];
        this.isLocked = true;
    }

    public setup() {
        this.createBackground();
        this.createVault();
        this.app.stage.addChild(this.background);
        this.app.stage.addChild(this.door);
        this.app.stage.addChild(this.vault);
        this.app.stage.addChild(this.handleShadow);
        this.app.stage.addChild(this.handle);
        this.app.stage.addChild(this.treasure);
        this.app.stage.addChild(this.blinkEffect);
        this.app.stage.addChild(this.doorOpen);
        this.app.stage.addChild(this.doorOpenShadow);
        
        // Initially hide open door and blink effect
        this.doorOpen.visible = false;
        this.doorOpenShadow.visible = false;
        this.blinkEffect.visible = false;

        console.log('Secret Combination:', this.secretCombination); // Log the secret combination
    }

    private createBackground() {
        // Set background position and size
        this.background.width = this.app.renderer.width;
        this.background.height = this.app.renderer.height;
        this.background.x = 0;
        this.background.y = 0;
    }

    private createVault() {
        // Set vault position
        this.vault.x = this.app.renderer.width / 2 - this.vault.width / 2;
        this.vault.y = this.app.renderer.height / 2 - this.vault.height / 2;

        // Set door position
        this.door.x = this.vault.x; 
        this.door.y = this.vault.y;

        // Set handle position
        this.handle.x = this.vault.x + this.vault.width / 2 - this.handle.width / 2;
        this.handle.y = this.vault.y + this.vault.height - this.handle.height; // Position at the bottom of the vault
        this.handle.interactive = true;
        this.handle.buttonMode = true;

        // Set handle shadow position
        this.handleShadow.x = this.handle.x;
        this.handleShadow.y = this.handle.y;

        // Allow clicking on left/right sides of the handle for rotation
        this.handle.on('pointerdown', this.onHandleClick.bind(this));

        // Position treasure off-screen initially
        this.treasure.x = this.app.renderer.width / 2 - this.treasure.width / 2;
        this.treasure.y = this.app.renderer.height / 2 - this.treasure.height / 2;
        this.treasure.visible = false; // Hide treasure initially
    }

    private onHandleClick(event: PIXI.FederatedPointerEvent) {
        if (!this.isLocked) return; // Ignore clicks if vault is unlocked

        // Get the clicked position relative to the handle
        const clickedSide = event.data.getLocalPosition(this.handle);
        const direction = clickedSide.x < this.handle.x + this.handle.width / 2 ? 'counterclockwise' : 'clockwise';
        const number = 1; // Each click represents a displacement of 1 position

        this.currentInput.push({ number, direction });
        console.log(`Input: ${number}, Direction: ${direction}`);

        this.rotateHandle(direction);
        this.checkCombination();
    }

    private rotateHandle(direction: string) {
        const rotationAmount = direction === 'clockwise' ? Math.PI / 3 : -Math.PI / 3; // 60 degrees in radians

        // Animate handle rotation using GSAP
        gsap.to(this.handle, {
            rotation: this.handle.rotation + rotationAmount,
            duration: 0.3 // Duration in seconds
        });
    }

    private checkCombination() {
        // Check if current input matches the secret combination
        if (this.currentInput.length === this.secretCombination.length) {
            const isCorrect = this.currentInput.every((input, index) =>
                input.number === this.secretCombination[index].number &&
                input.direction === this.secretCombination[index].direction
            );

            if (isCorrect) {
                this.openVault();
            } else {
                this.resetGame();
            }
        }
    }

    private openVault() {
        console.log('Vault opened!');
        this.isLocked = false; // Vault is now unlocked
        this.treasure.visible = true; // Show the treasure

        // Animate door opening
        this.animateDoorOpen();

        // Animate the vault opening using GSAP
        gsap.to(this.vault, {
            x: this.vault.x - 50,
            rotation: Math.PI / 2, // Rotate to open
            duration: 0.5 // Duration in seconds
        });

        // Glitter animation for the treasure
        this.animateTreasure();
    }

    private animateDoorOpen() {
        this.doorOpen.visible = true;
        this.doorOpenShadow.visible = true;
        this.door.visible = false; // Hide the closed door
        
        // Animate door opening
        gsap.to(this.doorOpen, {
            x: this.doorOpen.x - 50, // Move to the left
            duration: 0.5,
            onComplete: () => {
                // After door opens, you can add more animations or effects here
            }
        });
    }

    private animateTreasure() {
        this.treasure.alpha = 0;

        // Animate treasure using GSAP
        gsap.to(this.treasure, {
            alpha: 1,
            duration: 0.5, // Fade in
            repeat: -1, // Repeat indefinitely
            yoyo: true // Fade out then in
        });

        // Add glitter effect
        this.blinkEffect.visible = true;
        gsap.to(this.blinkEffect, {
            alpha: 1,
            duration: 0.5, // Fade in
            repeat: -1, // Repeat indefinitely
            yoyo: true // Fade out then in
        });
    }

    private resetGame() {
        console.log('Incorrect combination. Game resetting...');
        this.currentInput = []; // Reset input
        this.secretCombination = this.generateSecretCombination(); // Generate a new combination
        this.isLocked = true; // Lock the vault

        // Make the handle spin wildly
        this.spinHandle();

        // Hide the treasure and glitter effect
        this.treasure.visible = false;
        this.blinkEffect.visible = false;
    }

    private spinHandle() {
        const spinAmount = Math.PI * 2 * 3; // Spin 3 full rotations
        gsap.to(this.handle, {
            rotation: this.handle.rotation + spinAmount,
            duration: 1 // Duration for spinning
        });
    }

    private generateSecretCombination(): Array<{ number: number; direction: string }> {
        const combination = [];
        for (let i = 0; i < 3; i++) { // Generate 3 pairs
            combination.push({
                number: Math.floor(Math.random() * 9) + 1, // Random number (1-9)
                direction: Math.random() < 0.5 ? 'clockwise' : 'counterclockwise'
            });
        }
        return combination;
    }

}
