"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bird {
    constructor(scene) {
        this.bird = scene.add.graphics();
        this.shape = new Phaser.Geom.Rectangle(scene.sys.canvas.width / 2 - 25, scene.sys.canvas.height / 2 - 25, 50, 50);
        this.acceleration = 2;
    }
    // Элементарная обработка физики
    update() {
        this.shape.y += this.acceleration;
        if (this.acceleration < 5) {
            this.acceleration += 0.2;
        }
        this.bird.clear();
        this.bird.lineStyle(4, 0xFFFFFF, 1); // надо вызывать по новой, т.к. clear() сбрасывает
        this.bird.strokeRectShape(this.shape);
    }
    getBounds() {
        return this.shape;
    }
    jump() {
        this.acceleration = -5;
    }
}
exports.Bird = Bird;
