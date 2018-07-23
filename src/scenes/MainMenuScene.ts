export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenuScene" });
    }

    init(): void {

    }

    preload(): void {

    }

    create(): void {
        let testText: Phaser.GameObjects.Text = this.add.text(
            30,
            30,
            'Hello World!',
            {
                fonFamily: "Times New Roman",
                fontSize: 40
            }
        );
    }

    update(): void {

    }
}