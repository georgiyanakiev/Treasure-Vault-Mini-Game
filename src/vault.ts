import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';

export class Vault {
    private app: PIXI.Application;
    private vault: PIXI.Sprite;
    private handle: PIXI.Sprite;
    private treasure: PIXI.Sprite;
    private secretCombination: Array<{ number: number; direction: string }>;
    private currentInput: Array<{ number: number; direction: string }>;
    private isLocked: boolean;

    constructor(app: PIXI.Application) {
        this.app = app;
        this.vault = new PIXI.Sprite(PIXI.Texture.from('preview/vault.jpg')); // Placeholder path
        this.handle = new PIXI.Sprite(PIXI.Texture.from('assets/handle.png')); // Placeholder path
        this.treasure = new PIXI.Sprite(PIXI.Texture.from('assets/bg.png')); // Placeholder path
        this.secretCombination = this.generateSecretCombination();
        this.currentInput = [];
        this.isLocked = true;
    }

    public setup() {
        this.createVault();
        this.app.stage.addChild(this.vault);
        this.app.stage.addChild(this.handle);
        this.app.stage.addChild(this.treasure);
        console.log('Secret Combination:', this.secretCombination); // Log the secret combination
    }

    private createVault() {
        // Set vault position
        this.vault.x = this.app.renderer.width / 2 - this.vault.width / 2;
        this.vault.y = this.app.renderer.height / 2 - this.vault.height / 2;

        // Set handle position
        this.handle.x = this.vault.x + this.vault.width / 2 - this.handle.width / 2;
        this.handle.y = this.vault.y + this.vault.height - this.handle.height; // Position at the bottom of the vault
        this.handle.interactive = true;
        this.handle.buttonMode = true;

        // Allow clicking on left/right sides of the handle for rotation
        this.handle.on('pointerdown', this.onHandleClick.bind(this));
        
        // Position treasure off-screen initially
        this.treasure.x = this.app.renderer.width / 2 - this.treasure.width / 2;
        this.treasure.y = this.app.renderer.height / 2 - this.treasure.height / 2;
        this.treasure.visible = false; // Hide treasure initially
    }

    private onHandleClick(event: PIXI.interaction.InteractionEvent) { // Use PIXI.InteractionEvent directly
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

        // Animate the vault opening using GSAP
        gsap.to(this.vault, {
            x: this.vault.x - 50,
            rotation: Math.PI / 2, // Rotate to open
            duration: 0.5 // Duration in seconds
        });

        // Glitter animation for the treasure
        this.animateTreasure();
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
    }

    private resetGame() {
        console.log('Incorrect combination. Game resetting...');
        this.currentInput = []; // Reset input
        this.secretCombination = this.generateSecretCombination(); // Generate a new combination
        this.isLocked = true; // Lock the vault

        // Make the handle spin wildly
        this.spinHandle();

        // Hide the treasure
        this.treasure.visible = false;
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
