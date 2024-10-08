import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
export class Vault {
    constructor(app) {
        this.app = app;
        this.secretCombination = this.generateSecretCombination();
        this.currentInput = [];
        this.isLocked = true;
        // Initialize sprites (ensure you have all the paths correct)
        this.background = new PIXI.Sprite(PIXI.Texture.from('bg.jpg'));
        this.vault = new PIXI.Sprite(PIXI.Texture.from('vault.jpg'));
        this.vaultOpen = new PIXI.Sprite(PIXI.Texture.from('vaultOpen.png'));
        this.handle = new PIXI.Sprite(PIXI.Texture.from('handle.png'));
        this.handleShadow = new PIXI.Sprite(PIXI.Texture.from('handleShadow.png'));
        this.treasure = new PIXI.Sprite(PIXI.Texture.from('treasure.png'));
        this.door = new PIXI.Sprite(PIXI.Texture.from('door.png'));
        this.doorOpen = new PIXI.Sprite(PIXI.Texture.from('doorOpen.png'));
        this.doorOpenShadow = new PIXI.Sprite(PIXI.Texture.from('doorOpenShadow.png'));
        this.blinkEffect = new PIXI.Sprite(PIXI.Texture.from('blinkEffect.png'));
    }
    setup() {
        this.createBackground();
        this.createVault();
        this.addSpritesToStage();
        this.hideOpenComponents();
        console.log('Secret Combination:', this.secretCombination);
    }
    createBackground() {
        this.background.width = this.app.renderer.width;
        this.background.height = this.app.renderer.height;
    }
    createVault() {
        // Vault and door positioning
        const centerX = this.app.renderer.width / 2;
        const centerY = this.app.renderer.height / 2;
        this.vault.x = centerX - this.vault.width / 2;
        this.vault.y = centerY - this.vault.height / 2;
        this.door.x = this.vault.x;
        this.door.y = this.vault.y;
        this.handle.x = this.vault.x + this.vault.width / 2 - this.handle.width / 2;
        this.handle.y = this.vault.y + this.vault.height - this.handle.height;
        this.handle.interactive = true;
        this.handle.buttonMode = true;
        // Shadow for the handle
        this.handleShadow.x = this.handle.x;
        this.handleShadow.y = this.handle.y;
        this.handle.on('pointerdown', this.onHandleClick.bind(this));
        // Position treasure off-screen initially
        this.treasure.x = centerX - this.treasure.width / 2;
        this.treasure.y = centerY - this.treasure.height / 2;
        this.treasure.visible = false;
    }
    addSpritesToStage() {
        this.app.stage.addChild(this.background);
        this.app.stage.addChild(this.door);
        this.app.stage.addChild(this.vault);
        this.app.stage.addChild(this.handleShadow);
        this.app.stage.addChild(this.handle);
        this.app.stage.addChild(this.treasure);
        this.app.stage.addChild(this.blinkEffect);
        this.app.stage.addChild(this.doorOpen);
        this.app.stage.addChild(this.doorOpenShadow);
    }
    hideOpenComponents() {
        this.doorOpen.visible = false;
        this.doorOpenShadow.visible = false;
        this.blinkEffect.visible = false;
    }
    onHandleClick(event) {
        if (!this.isLocked)
            return;
        const clickedSide = event.data.getLocalPosition(this.handle);
        const direction = clickedSide.x < this.handle.x + this.handle.width / 2 ? 'counterclockwise' : 'clockwise';
        const number = 1;
        this.currentInput.push({ number, direction });
        console.log(`Input: ${number}, Direction: ${direction}`);
        this.rotateHandle(direction);
        this.checkCombination();
    }
    rotateHandle(direction) {
        const rotationAmount = direction === 'clockwise' ? Math.PI / 3 : -Math.PI / 3;
        gsap.to(this.handle, {
            rotation: this.handle.rotation + rotationAmount,
            duration: 0.3
        });
    }
    checkCombination() {
        if (this.currentInput.length === this.secretCombination.length) {
            const isCorrect = this.currentInput.every((input, index) => input.number === this.secretCombination[index].number &&
                input.direction === this.secretCombination[index].direction);
            if (isCorrect) {
                this.openVault();
            }
            else {
                this.resetGame();
            }
        }
    }
    openVault() {
        console.log('Vault opened!');
        this.isLocked = false;
        this.treasure.visible = true;
        this.animateDoorOpen();
        gsap.to(this.vault, {
            x: this.vault.x - 50,
            rotation: Math.PI / 2,
            duration: 0.5
        });
        this.animateTreasure();
    }
    animateDoorOpen() {
        this.doorOpen.visible = true;
        this.doorOpenShadow.visible = true;
        this.door.visible = false;
        gsap.to(this.doorOpen, {
            x: this.doorOpen.x - 50,
            duration: 0.5,
        });
    }
    animateTreasure() {
        this.treasure.alpha = 0;
        gsap.to(this.treasure, {
            alpha: 1,
            duration: 0.5,
            repeat: -1,
            yoyo: true
        });
        this.blinkEffect.visible = true;
        gsap.to(this.blinkEffect, {
            alpha: 1,
            duration: 0.5,
            repeat: -1,
            yoyo: true
        });
    }
    resetGame() {
        console.log('Incorrect combination. Game resetting...');
        this.currentInput = [];
        this.secretCombination = this.generateSecretCombination();
        this.isLocked = true;
        this.spinHandle();
        this.treasure.visible = false;
        this.blinkEffect.visible = false;
    }
    spinHandle() {
        const spinAmount = Math.PI * 2 * 3;
        gsap.to(this.handle, {
            rotation: this.handle.rotation + spinAmount,
            duration: 1
        });
    }
    generateSecretCombination() {
        const combination = [];
        for (let i = 0; i < 3; i++) {
            combination.push({
                number: Math.floor(Math.random() * 9) + 1,
                direction: Math.random() < 0.5 ? 'clockwise' : 'counterclockwise'
            });
        }
        return combination;
    }
}
