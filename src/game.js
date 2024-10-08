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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const PIXI = __importStar(require("pixi.js"));
const gsap_1 = require("gsap");
const assets_1 = require("@pixi/assets");
class Game {
    constructor(app) {
        this.assets = {}; // Store loaded textures
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
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.loadAllAssets(); // Load all assets
                this.createPreviewScene(); // Show the preview images
                this.animatePreview(); // Animate the preview images with GSAP
            }
            catch (error) {
                console.error('Error loading assets:', error);
            }
            console.log(this.app.view);
        });
    }
    // Load all game assets using Assets from '@pixi/assets'
    loadAllAssets() {
        return __awaiter(this, void 0, void 0, function* () {
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
                    this.assets[asset.name] = yield assets_1.Assets.load(asset.url);
                }
            }
            catch (error) {
                console.error('Error loading assets:', error);
                throw error;
            }
        });
    }
    createPreviewScene() {
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
    animatePreview() {
        const vaultPreview = this.app.stage.getChildByName("vault");
        const vaultOpenPreview = this.app.stage.getChildByName("vaultOpen");
        if (vaultPreview && vaultOpenPreview) {
            // GSAP animation for vaultPreview
            gsap_1.gsap.to(vaultPreview.scale, {
                x: 1.1,
                y: 1.1,
                duration: 1,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
            });
            // GSAP animation for vaultOpenPreview
            gsap_1.gsap.to(vaultOpenPreview, {
                rotation: Math.PI * 2, // 360-degree rotation
                duration: 3,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
            });
        }
    }
}
exports.Game = Game;
// Start the game
const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);
const game = new Game(app);
