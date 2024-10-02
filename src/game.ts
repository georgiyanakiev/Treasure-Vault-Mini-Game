import * as PIXI from 'pixi.js';

export class Game {
    private app: PIXI.Application;
    private handle!: PIXI.Graphics;
    private vault!: PIXI.Graphics; // Define vault as a class property
    private vaultOpen: boolean = false;
    private secretCombination: Array<{ number: number; direction: 'clockwise' | 'counterclockwise' }> = [];
    private userInput: Array<{ number: number; direction: 'clockwise' | 'counterclockwise' }> = [];

    constructor() {
        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x1099bb,
        });

        document.body.appendChild(this.app.view);
        this.generateSecretCombination();
        this.createVault();
        this.createHandle();
        this.setupInteractions();
        this.startAnimation();
        this.start();
    }

    private generateSecretCombination() {
        for (let i = 0; i < 3; i++) {
            const number = Math.floor(Math.random() * 9) + 1;
            const direction = Math.random() < 0.5 ? 'clockwise' : 'counterclockwise';
            this.secretCombination.push({ number, direction });
        }
        console.log('Secret Combination:', this.secretCombination);
    }

    private createVault() {
        this.vault = new PIXI.Graphics(); // Initialize the vault
        this.vault.beginFill(0x444444); // Vault color
        this.vault.drawRect(300, 200, 200, 200); // Draw vault door
        this.vault.endFill();
        this.app.stage.addChild(this.vault);
    }

    private createHandle() {
        this.handle = new PIXI.Graphics();
        this.handle.beginFill(0x888888); // Handle color
        this.handle.drawRect(370, 280, 60, 10); // Draw handle
        this.handle.endFill();
        this.app.stage.addChild(this.handle);
    }

    private setupInteractions() {
        this.app.view.addEventListener('click', this.handleClick.bind(this));
    }

    private handleClick(event: MouseEvent) {
        if (this.vaultOpen) return; // Do nothing if vault is already open
        const localPosition = this.app.renderer.plugins.interaction.mouse.global;
        const isLeftSide = localPosition.x < this.handle.x + this.handle.width / 2;

        // Rotate handle
        const direction = isLeftSide ? 'counterclockwise' : 'clockwise';
        this.rotateHandle(direction);

        // Record user input
        const number = 1; // Each click is treated as 1 for now
        this.userInput.push({ number, direction });

        // Check if input matches the secret combination
        if (this.userInput.length === this.secretCombination.length) {
            this.checkCombination();
        }
    }

    private rotateHandle(direction: 'clockwise' | 'counterclockwise') {
        const rotationAmount = direction === 'clockwise' ? Math.PI / 3 : -Math.PI / 3; // 60 degrees in radians
        this.handle.rotation += rotationAmount;
        this.handle.scale.x = 1.1; // Slight scale up for animation
        this.handle.scale.y = 0.9;

        // Reset scale for next rotation
        setTimeout(() => {
            this.handle.scale.x = 1;
            this.handle.scale.y = 1;
        }, 100);
    }

    private checkCombination() {
        const isCorrect = this.userInput.every((input, index) => 
            input.number === this.secretCombination[index].number && 
            input.direction === this.secretCombination[index].direction
        );

        if (isCorrect) {
            this.openVault();
        } else {
            this.resetGame();
        }
    }

    private openVault() {
        this.vaultOpen = true;
        this.vault.alpha = 0; // Fade out vault door

        // Show treasure
        const treasure = new PIXI.Graphics();
        treasure.beginFill(0xffd700); // Gold color
        treasure.drawRect(350, 200, 100, 100); // Draw treasure
        treasure.endFill();
        this.app.stage.addChild(treasure);

        // Glitter effect
        this.glitterEffect(treasure);
    }

    private glitterEffect(treasure: PIXI.Graphics) {
        const glitter = new PIXI.Graphics();
        glitter.beginFill(0xffffff, 0.5); // White color for glitter
        glitter.drawCircle(400, 250, 20); // Draw glitter
        glitter.endFill();
        this.app.stage.addChild(glitter);

        // Animation for glitter
        this.app.ticker.add(() => {
            glitter.scale.x = Math.abs(Math.sin(Date.now() * 0.002));
            glitter.scale.y = Math.abs(Math.sin(Date.now() * 0.002));
            glitter.alpha = Math.abs(Math.sin(Date.now() * 0.005));
        });
    }

    private resetGame() {
        this.userInput = [];
        this.secretCombination = [];
        this.generateSecretCombination();
        this.handle.rotation = 0; // Reset handle rotation
        this.vaultOpen = false;
        console.log('Game Reset! New Secret Combination:', this.secretCombination);
    }

    private startAnimation() {
        this.app.ticker.add(() => {
            // Make the vault pulse gently to attract attention
            if (!this.vaultOpen) {
                gsap.to(this.vault.scale, {
                    x: 1.05,
                    y: 1.05,
                    duration: 1,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1,
                    paused: !this.vaultOpen // Pause when the vault is open
                });
            }
        });
    }

    public start() {
        console.log('Game has started!');
    }
}

// Start the game
const game = new Game();
game.start(); 
