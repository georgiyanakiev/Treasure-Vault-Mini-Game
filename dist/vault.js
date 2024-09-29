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
exports.Vault = void 0;
const PIXI = __importStar(require("pixi.js"));
const gsap_1 = require("gsap");
class Vault {
    constructor(app) {
        this.app = app;
        this.vault = new PIXI.Sprite(PIXI.Texture.from('preview/vault.jpg')); // Placeholder path
        this.handle = new PIXI.Sprite(PIXI.Texture.from('assets/handle.png')); // Placeholder path
        this.treasure = new PIXI.Sprite(PIXI.Texture.from('assets/bg.png')); // Placeholder path
        this.secretCombination = this.generateSecretCombination();
        this.currentInput = [];
        this.isLocked = true;
    }
    setup() {
        this.createVault();
        this.app.stage.addChild(this.vault);
        this.app.stage.addChild(this.handle);
        this.app.stage.addChild(this.treasure);
        console.log('Secret Combination:', this.secretCombination); // Log the secret combination
    }
    createVault() {
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
    onHandleClick(event) {
        if (!this.isLocked)
            return; // Ignore clicks if vault is unlocked
        // Get the clicked position relative to the handle
        const clickedSide = event.data.getLocalPosition(this.handle);
        const direction = clickedSide.x < this.handle.x + this.handle.width / 2 ? 'counterclockwise' : 'clockwise';
        const number = 1; // Each click represents a displacement of 1 position
        this.currentInput.push({ number, direction });
        console.log(`Input: ${number}, Direction: ${direction}`);
        this.rotateHandle(direction);
        this.checkCombination();
    }
    rotateHandle(direction) {
        const rotationAmount = direction === 'clockwise' ? Math.PI / 3 : -Math.PI / 3; // 60 degrees in radians
        // Animate handle rotation using GSAP
        gsap_1.gsap.to(this.handle, {
            rotation: this.handle.rotation + rotationAmount,
            duration: 0.3 // Duration in seconds
        });
    }
    checkCombination() {
        // Check if current input matches the secret combination
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
        this.isLocked = false; // Vault is now unlocked
        this.treasure.visible = true; // Show the treasure
        // Animate the vault opening using GSAP
        gsap_1.gsap.to(this.vault, {
            x: this.vault.x - 50,
            rotation: Math.PI / 2,
            duration: 0.5 // Duration in seconds
        });
        // Glitter animation for the treasure
        this.animateTreasure();
    }
    animateTreasure() {
        this.treasure.alpha = 0;
        // Animate treasure using GSAP
        gsap_1.gsap.to(this.treasure, {
            alpha: 1,
            duration: 0.5,
            repeat: -1,
            yoyo: true // Fade out then in
        });
    }
    resetGame() {
        console.log('Incorrect combination. Game resetting...');
        this.currentInput = []; // Reset input
        this.secretCombination = this.generateSecretCombination(); // Generate a new combination
        this.isLocked = true; // Lock the vault
        // Make the handle spin wildly
        this.spinHandle();
        // Hide the treasure
        this.treasure.visible = false;
    }
    spinHandle() {
        const spinAmount = Math.PI * 2 * 3; // Spin 3 full rotations
        gsap_1.gsap.to(this.handle, {
            rotation: this.handle.rotation + spinAmount,
            duration: 1 // Duration for spinning
        });
    }
    generateSecretCombination() {
        const combination = [];
        for (let i = 0; i < 3; i++) { // Generate 3 pairs
            combination.push({
                number: Math.floor(Math.random() * 9) + 1,
                direction: Math.random() < 0.5 ? 'clockwise' : 'counterclockwise'
            });
        }
        return combination;
    }
}
exports.Vault = Vault;
