"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("phaser");
const BootScene_1 = require("./scenes/BootScene");
const MainMenuScene_1 = require("./scenes/MainMenuScene");
const GameScene_1 = require("./scenes/GameScene");
class Game extends Phaser.Game {
    constructor(config) {
        super(config);
    }
}
exports.Game = Game;
window.onload = () => {
    const config = {
        title: "Flappy Bird Clone",
        width: 500,
        height: 600,
        type: Phaser.AUTO,
        parent: "game",
        scene: [BootScene_1.BootScene, MainMenuScene_1.MainMenuScene, GameScene_1.GameScene],
        input: {
            keyboard: false,
            mouse: true,
            touch: false,
            gamepad: false
        }
    };
    let game = new Game(config);
};
