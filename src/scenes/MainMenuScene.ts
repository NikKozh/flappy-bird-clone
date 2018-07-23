import { HIGH_SCORE } from '../const/const';

export class MainMenuScene extends Phaser.Scene {
    private caption1: Phaser.GameObjects.Text;
    private caption2: Phaser.GameObjects.Text;
    private goText: Phaser.GameObjects.Text;
    private score: Phaser.GameObjects.Text;

    private playButton: Phaser.GameObjects.Graphics;
    private playButtonGeom: Phaser.Geom.Rectangle;

    constructor() {
        super({ key: "MainMenuScene" });
    }

    init(): void {

    }

    preload(): void {

    }

    // Выводим главное меню на экран: текст и кнопка
    create(): void {
        this.caption1 = this.add.text(
            this.sys.canvas.width / 2,
            90,
            'Flappy Bird',
            {
                fonFamily: "Times New Roman",
                fontSize: 40
            }
        );
        this.caption2 = this.add.text(
            this.sys.canvas.width / 2,
            130,
            '(minimalistic)',
            {
                fonFamily: "Times New Roman",
                fontSize: 40
            }
        );
        this.caption1.setOrigin(0.5, 0.5);
        this.caption2.setOrigin(0.5, 0.5);

        // Отдельно добавляем геометрическую фигуру для обработки нажатий по кнопке
        this.playButtonGeom = new Phaser.Geom.Rectangle(
            this.sys.canvas.width / 2 - 50,
            this.sys.canvas.height / 2 - 50,
            100,
            100
        );
        this.playButton = this.add.graphics({
            x: 0,
            y: 0,
            fillStyle: { color: 0xFFFFFF, alpha: 1 }
        });
        this.playButton.fillRectShape(this.playButtonGeom);

        // Т.к. метод setInteractive не работает с примитивами, нужно отдельно сообщить ему
        // геометрическую фигуру, по которой производится расчёт столкновений и ввода,
        // а также передать функцию, которая этот расчёт производит
        this.playButton.setInteractive({
            hitArea: this.playButtonGeom,
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            useHandCursor: true
        });
        this.playButton.on('pointerdown', () => this.scene.start('GameScene'));

        this.goText = this.add.text(
            this.playButtonGeom.x + 15,
            this.playButtonGeom.y + 20,
            'GO',
            {
                fonFamily: "Arial",
                fontSize: 60,
                fontStyle: "bold"
            }
        );
        this.goText.setColor('black');

        this.score = this.add.text(
            this.sys.canvas.width / 2,
            this.sys.canvas.height - 75,
            'HIGH SCORE: ' + HIGH_SCORE,
            {
                fonFamily: "Times New Roman",
                fontSize: 40
            }
        );
        this.score.setOrigin(0.5, 0.5);
    }

    update(): void {

    }
}