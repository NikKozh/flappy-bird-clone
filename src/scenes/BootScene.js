"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: "BootScene" });
    }
    update() {
        this.scene.start("MainMenuScene");
    }
}
exports.BootScene = BootScene;
