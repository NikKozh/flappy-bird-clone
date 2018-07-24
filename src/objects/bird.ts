import { PLAYER } from "../const/const";

export class Bird {
    private graphics: Phaser.GameObjects.Graphics;
    private shape: Phaser.Geom.Rectangle;

    private score: number;
    private isGameOver: boolean;

    private acceleration: number;

    constructor(scene: Phaser.Scene) {
        this.graphics = scene.add.graphics();

        this.shape = new Phaser.Geom.Rectangle(
            scene.sys.canvas.width / 2 - PLAYER.BIRD_WIDTH / 2,
            60,
            PLAYER.BIRD_WIDTH,
            PLAYER.BIRD_HEIGHT
        );

        this.acceleration = 2;
        this.score = 0;
        this.isGameOver = false;
    }

    // Элементарная обработка физики
    update(): void {
        this.shape.y += this.acceleration;

        if (this.acceleration < 7) {
            this.acceleration += 0.2;
        }

        this.graphics.clear();
        // lineStyle() надо вызывать по новой, т.к. clear() сбрасывает
        if (!this.isGameOver) {
            this.graphics.lineStyle(4, 0xFFFFFF, 1);
        } else {
            this.graphics.lineStyle(4, 0x8B0000, 1); // красим игрока в красный, если проигрыш
        }
        this.graphics.strokeRectShape(this.shape);
    }

    getBounds(): Phaser.Geom.Rectangle {
        return this.shape;
    }

    jump(): void {
        // Если конец игры или игрок слишком высоко - не реагируем на управление
        if ((this.shape.y > PLAYER.BIRD_HEIGHT) && !this.isGameOver) {
            this.acceleration = -5;
        }
    }

    // Увеличиваем счёт на один и сразу возвращаем, чтобы отобразить на экране
    increaseScore(): number {
        if (!this.isGameOver) { // опять же, если не конец игры
            return ++this.score;
        } else {
            return this.score;
        }
    }

    getScore(): number {
        return this.score;
    }

    gameOver(): void {
        this.jump();
        this.isGameOver = true;
    }

    // Увеличение Z-индекса для того, чтобы квадрат игрока всегда был сверху
    increaseDepth(): void {
        this.graphics.depth++;
    }
}