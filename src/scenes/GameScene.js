"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bird_1 = require("../objects/bird");
const pipe_1 = require("../objects/pipe");
const const_1 = require("../const/const");
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
    }
    init() {
        this.pipes = [];
        this.player = null;
    }
    preload() {
    }
    create() {
        this.player = new bird_1.Bird(this);
        // Обработка нажатия левой клавиши по всему полю
        this.input.on('pointerdown', () => {
            this.player.jump();
        });
        // Создаём первую пару труб подальше, остальные в update() и поближе
        this.pipes.push(new pipe_1.PairPipes(this, 250));
        this.scoreText = this.add.text(20, 20, 'SCORE: 0', {
            fontSize: 40
        });
    }
    update() {
        this.pipes.forEach((pipes, index) => {
            pipes.update();
            // Проверяем столкновение каждой трубы с игроком
            if (Phaser.Geom.Rectangle.Overlaps(pipes.getTopShape(), this.player.getBounds()) ||
                Phaser.Geom.Rectangle.Overlaps(pipes.getDownShape(), this.player.getBounds())) {
                this.player.gameOver();
                // смысла return делать нет, т.к. всё равно останемся в цикле
            }
            // Проверяем, прошла ли пара труб центр - тогда увеличиваем счёт игрока
            if (((pipes.getX() + const_1.PIPES.WIDTH) < (this.sys.canvas.width / 2)) && (!pipes.isCrossedCenter())) {
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
        if ((this.sys.canvas.width - this.pipes[this.pipes.length - 1].getX()) >= const_1.PIPES.HORIZONTAL_GAP) {
            this.pipes.push(new pipe_1.PairPipes(this));
            this.scoreText.depth++; // увеличиваем Z-индекс надписи, чтобы она всегда была сверху
            this.player.increaseDepth(); // то же самое для игрока
        }
        this.player.update();
        // Если игрок упал вниз (из-за столкновения с трубой или сам), то завершаем игру
        if (this.player.getBounds().y > (this.sys.canvas.height + const_1.PLAYER.BIRD_HEIGHT + 10)) {
            const_1.PLAYER.LAST_SCORE = this.player.getScore();
            if (const_1.PLAYER.BEST_SCORE < const_1.PLAYER.LAST_SCORE) {
                const_1.PLAYER.BEST_SCORE = const_1.PLAYER.LAST_SCORE;
            }
            this.scene.start('MainMenuScene');
        }
    }
}
exports.GameScene = GameScene;
