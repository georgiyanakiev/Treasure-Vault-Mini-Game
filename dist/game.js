import * as PIXI from 'pixi.js';
import { Vault } from './vault';
var Game = /** @class */ (function () {
    function Game() {
        var _a;
        this.app = new PIXI.Application({ width: 800, height: 600 });
        (_a = document.getElementById('game-container')) === null || _a === void 0 ? void 0 : _a.appendChild(this.app.view);
        this.vault = new Vault(this.app);
    }
    Game.prototype.start = function () {
        this.vault.setup();
    };
    return Game;
}());
export { Game };
