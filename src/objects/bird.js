"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bird extends Phaser.GameObjects.Graphics {
    constructor(scene, params) {
        super(scene, { x: 0, y: 0, lineStyle: params.lineStyle });
        this.shape = new Phaser.Geom.Rectangle(params.x, params.y, 50, 50);
        this.strokeRectShape(this.shape);
        scene.add.existing(this);
        this.acceleration = 2;
    }
    update() {
        this.y += this.acceleration;
        if (this.acceleration < 5) {
            this.acceleration += 0.2;
        }
        this.shape.y = this.y;
    }
    jump() {
        this.acceleration = -5;
    }
}
exports.Bird = Bird;
