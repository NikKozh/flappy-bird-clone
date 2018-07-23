export class Bird extends Phaser.GameObjects.Graphics {
    constructor(scene: Phaser.Scene, params: GraphicsOptions) {
        super(scene, params);

        this.fillRect(params.x, params.y, 32, 32);
        scene.add.existing(this);
    }


}