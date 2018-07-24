import { Bird } from '../objects/bird';
import { PairPipes } from '../objects/pipe';
import { PIPES } from "../const/const";

export class GameScene extends Phaser.Scene {
    private player: Bird;
    private pipes: PairPipes[];

    private g: boolean;

    constructor() {
        super({ key: "GameScene" });

        this.pipes = [];
        this.g = false;
    }

    init(): void {

    }

    preload(): void {

    }

    create(): void {
        this.player = new Bird(this);

        // Обработка нажатия левой клавиши по всему полю
        this.input.on('pointerdown', () => {
            this.player.jump();
        });

        // Создаём первую пару труб, остальные в update()
        this.pipes.push(new PairPipes(this));
    }

    update(): void {
        this.pipes.forEach((pipes: PairPipes) => {
            if (pipes.update(this.player.getBounds())) {
                this.g = true;
            }

            if (pipes.isOffScreen()) {
                pipes = null;
            }
        });

        this.player.update();

        /*if (this.pipes.length > 0) {
            for (let i = 0; i < this.pipes.length; i++) {
                this.pipes[i].update();

                if (this.pipes[i].isOffScreen()) {
                    this.pipes[i] = null;
                    break;
                }
            }
        }*/

        if (!this.g) {
            // Если последняя пара труб ушла достаточно далеко от конца экрана, создаём ещё одну
            if ((this.sys.canvas.width - this.pipes[this.pipes.length - 1].getX()) >= PIPES.HORIZONTAL_GAP) {
                this.pipes.push(new PairPipes(this));
            }
        }
    }
}