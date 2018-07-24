import { PLAYER } from "../const/const";

export class Bird {
    private bird: Phaser.GameObjects.Graphics;
    private shape: Phaser.Geom.Rectangle;
    private score: number;

    private acceleration: number;

    constructor(scene: Phaser.Scene) {
        this.bird = scene.add.graphics();

        this.shape = new Phaser.Geom.Rectangle(
            scene.sys.canvas.width / 2 - PLAYER.BIRD_WIDTH / 2,
            scene.sys.canvas.height / 2 - PLAYER.BIRD_HEIGHT / 2,
            PLAYER.BIRD_WIDTH,
            PLAYER.BIRD_HEIGHT
        );

        this.acceleration = 2;
        this.score = 0;
    }

    // Элементарная обработка физики
    update(): void {
        this.shape.y += this.acceleration;

        if (this.acceleration < 7) {
            this.acceleration += 0.2;
        }

        this.bird.clear();
        this.bird.lineStyle(4, 0xFFFFFF, 1); // надо вызывать по новой, т.к. clear() сбрасывает
        this.bird.strokeRectShape(this.shape);
    }

    getBounds(): Phaser.Geom.Rectangle {
        return this.shape;
    }

    jump(): void {
        this.acceleration = -5;
    }


}