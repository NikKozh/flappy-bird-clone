export class Bird extends Phaser.GameObjects.Graphics {
    private shape: Phaser.Geom.Rectangle;

    private acceleration: number;

    constructor(scene: Phaser.Scene, params: GraphicsOptions) {
        super(scene, {x: 0, y: 0, lineStyle: params.lineStyle});

        this.shape = new Phaser.Geom.Rectangle(
            params.x,
            params.y,
            50,
            50
        );
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