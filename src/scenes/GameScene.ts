import { Bird } from '../objects/bird';

export class GameScene extends Phaser.Scene {
    private player: Bird;

    constructor() {
        super({ key: "GameScene" });
    }

    init(): void {

    }

    preload(): void {

    }

    create(): void {
        // Создание игрока
        this.player = new Bird(this, {
            x: this.sys.canvas.width / 2 - 25,
            y: this.sys.canvas.height / 2 - 25,
            lineStyle: { width: 4, color: 0xFFFFFF, alpha: 1 },
        });

        // Обработка нажатия левой клавиши по всему полю
        this.input.on('pointerdown', () => this.player.jump());
    }

    update(): void {
        this.player.update();
    }
}