"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenuScene" });
    }
    init() {
    }
    preload() {
    }
    create() {
        let testText = this.add.text(30, 30, 'Hello World!', {
            fonFamily: "Times New Roman",
            fontSize: 40
        });
    }
    update() {
    }
}
exports.MainMenuScene = MainMenuScene;
