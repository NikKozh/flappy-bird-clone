"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const/const");
class Bird {
    constructor(scene) {
        this.graphics = scene.add.graphics();
        this.shape = new Phaser.Geom.Rectangle(scene.sys.canvas.width / 2 - const_1.PLAYER.BIRD_WIDTH / 2, 60, const_1.PLAYER.BIRD_WIDTH, const_1.PLAYER.BIRD_HEIGHT);
        this.acceleration = 2;
        this.score = 0;
        this.isGameOver = false;
    }
    // Элементарная обработка физики
    update() {
        this.shape.y += this.acceleration;
        if (this.acceleration < 7) {
            this.acceleration += 0.2;
        }
        this.graphics.clear();
        // lineStyle() надо вызывать по новой, т.к. clear() сбрасывает
        if (!this.isGameOver) {
            this.graphics.lineStyle(4, 0xFFFFFF, 1);
        }
        else {
            this.graphics.lineStyle(4, 0x8B0000, 1); // красим игрока в красный, если проигрыш
        }
        this.graphics.strokeRectShape(this.shape);
    }
    getBounds() {
        return this.shape;
    }
    jump() {
        // Если конец игры или игрок слишком высоко - не реагируем на управление
        if ((this.shape.y > const_1.PLAYER.BIRD_HEIGHT) && !this.isGameOver) {
            this.acceleration = -5;
        }
    }
    // Увеличиваем счёт на один и сразу возвращаем, чтобы отобразить на экране
    increaseScore() {
        if (!this.isGameOver) { // опять же, если не конец игры
            return ++this.score;
        }
        else {
            return this.score;
        }
    }
    getScore() {
        return this.score;
    }
    gameOver() {
        this.jump();
        this.isGameOver = true;
    }
    // Увеличение Z-индекса для того, чтобы квадрат игрока всегда был сверху
    increaseDepth() {
        this.graphics.depth++;
    }
}
exports.Bird = Bird;
