import * as PIXI from 'pixi.js';

export class Vault {
    private app: PIXI.Application;
    private vaultSprite!: PIXI.Sprite;

    constructor(app: PIXI.Application) {
        this.app = app;
    }

    // Method to load assets and set up the vault
    public async setup() {
        try {
            await this.loadAssets();
            this.createVault();
        } catch (error) {
            console.error('Failed to load assets:', error);
        }
    }

    // Load assets using promises
    private loadAssets(): Promise<void> {
        return new Promise((resolve, reject) => {
            const loader = PIXI.loader; // Access the shared loader instance
            loader
                .add('bg', 'bg.png')
                .add('blink', 'blink.png')
                .add('door', 'door.png')
                .add('doorOpen', 'doorOpen.png')
                .add('doorOpenShadow', 'doorOpenShadow.png')
                .add('handle', 'handle.png')
                .add('handleShadow', 'handleShadow.png')
                .add('vault', 'vault.jpg') // Preview
                .add('vaultOpen', 'vaultOpen.jpg') // Preview
                .load((_, resources) => { // Loader instance and resources
                    // Check if all resources are loaded
                    if (
                        resources.bg &&
                        resources.blink &&
                        resources.door &&
                        resources.doorOpen &&
                        resources.doorOpenShadow &&
                        resources.handle &&
                        resources.handleShadow &&
                        resources.vault &&
                        resources.vaultOpen
                    ) {
                        resolve();
                    } else {
                        reject('Failed to load one or more assets');
                    }
                });
        });
    }

    // Method to create the vault sprite and add it to the stage
    private createVault() {
        const texture = PIXI.Texture.from('vault'); // Use the loaded resource
        this.vaultSprite = new PIXI.Sprite(texture);
        this.vaultSprite.x = 300; // Position X
        this.vaultSprite.y = 200; // Position Y
        this.vaultSprite.width = 200; // Set width of the vault
        this.vaultSprite.height = 200; // Set height of the vault
        this.app.stage.addChild(this.vaultSprite); // Add to the stage
    }
}
