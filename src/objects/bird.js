"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bird extends Phaser.GameObjects.Graphics {
    constructor(scene, params) {
        super(scene, params);
        this.fillRect(params.x, params.y, 32, 32);
        scene.add.existing(this);
    }
}
exports.Bird = Bird;
