import "phaser";

import { BootScene } from "./scenes/BootScene";
import { MainMenuScene } from "./scenes/MainMenuScene";
import { GameScene } from "./scenes/GameScene";

export class Game extends Phaser.Game {
    game: Phaser.Game;

    constructor(config: GameConfig) {
        super(config);
    }
}

window.onload = () => {
    const config: GameConfig = {
        title: "Flappy Bird Clone",
        width: 500,
        height: 600,
        type: Phaser.AUTO,
        parent: "game",
        scene: [BootScene, MainMenuScene, GameScene],
        input: {
            keyboard: true,
            mouse: true,
            touch: false,
            gamepad: false
        }
    };

    let game: Game = new Game(config);
};