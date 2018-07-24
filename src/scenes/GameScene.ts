import { Bird } from '../objects/bird';
import { PairPipes } from '../objects/pipe';
import {PIPES, PLAYER} from "../const/const";

export class GameScene extends Phaser.Scene {
    private player: Bird;
    private pipes: PairPipes[];

    private scoreText: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "GameScene" });
    }

    init(): void {
        this.pipes = [];
        this.player = null;
    }

    preload(): void {

    }

    create(): void {
        this.player = new Bird(this);

        // Обработка нажатия левой клавиши по всему полю
        this.input.on('pointerdown', () => {
            this.player.jump();
        });

        // Создаём первую пару труб подальше, остальные в update() и поближе
        this.pipes.push(new PairPipes(this, 250));

        this.scoreText = this.add.text(
            20,
            20,
            'SCORE: 0',
            {
                fontSize: 40
            }
        );
    }

    update(): void {
        this.pipes.forEach((pipes: PairPipes, index: number) => {
            pipes.update();

            // Проверяем столкновение каждой трубы с игроком
            if (Phaser.Geom.Rectangle.Overlaps(pipes.getTopShape(), this.player.getBounds()) ||
                Phaser.Geom.Rectangle.Overlaps(pipes.getDownShape(), this.player.getBounds())) {
                this.player.gameOver();
                // смысла return делать нет, т.к. всё равно останемся в цикле
            }

            // Проверяем, прошла ли пара труб центр - тогда увеличиваем счёт игрока
            if (((pipes.getX() + PIPES.WIDTH) < (this.sys.canvas.width / 2)) && (!pipes.isCrossedCenter())) {
                // Увеличиваем счёт на один и сразу отображаем на экране
                this.scoreText.setText('SCORE: ' + this.player.increaseScore());
                pipes.pairCrossedCenter(true); // чтобы условие сработало только один раз на одну пару труб
            }

            // Когда пара труб оказывается за пределами экрана - удаляем её
            if (pipes.isOffScreen()) {
                this.pipes.splice(index, 1);
                console.debug(this.pipes.length);
            }
        });

        // Если последняя пара труб ушла достаточно далеко от конца экрана, создаём ещё одну
        if ((this.sys.canvas.width - this.pipes[this.pipes.length - 1].getX()) >= PIPES.HORIZONTAL_GAP) {
            this.pipes.push(new PairPipes(this));
            this.scoreText.depth++;      // увеличиваем Z-индекс надписи, чтобы она всегда была сверху
            this.player.increaseDepth(); // то же самое для игрока
        }

        this.player.update();

        // Если игрок упал вниз (из-за столкновения с трубой или сам), то завершаем игру
        if (this.player.getBounds().y > (this.sys.canvas.height + PLAYER.BIRD_HEIGHT + 10)) {
            PLAYER.LAST_SCORE = this.player.getScore();
            if (PLAYER.BEST_SCORE < PLAYER.LAST_SCORE) {
                PLAYER.BEST_SCORE = PLAYER.LAST_SCORE;
            }
            this.scene.start('MainMenuScene');
        }
    }
}