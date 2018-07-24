"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bird_1 = require("../objects/bird");
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }
    init() {
    }
    preload() {
    }
    create() {
        // Создание игрока
        this.player = new bird_1.Bird(this, {
            x: this.sys.canvas.width / 2 - 25,
            y: this.sys.canvas.height / 2 - 25,
            lineStyle: { width: 4, color: 0xFFFFFF, alpha: 1 },
        });
        // Обработка нажатия левой клавиши по всему полю
        this.input.on('pointerdown', () => this.player.jump());
    }
    update() {
        this.player.update();
    }
}
exports.GameScene = GameScene;
