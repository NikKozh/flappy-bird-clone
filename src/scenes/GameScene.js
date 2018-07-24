"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bird_1 = require("../objects/bird");
const pipe_1 = require("../objects/pipe");
const const_1 = require("../const/const");
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
        this.pipes = [];
        this.g = false;
    }
    init() {
    }
    preload() {
    }
    create() {
        this.player = new bird_1.Bird(this);
        // Обработка нажатия левой клавиши по всему полю
        this.input.on('pointerdown', () => {
            this.player.jump();
        });
        // Создаём первую пару труб, остальные в update()
        this.pipes.push(new pipe_1.PairPipes(this));
    }
    update() {
        this.pipes.forEach((pipes, index) => {
            pipes.update();
            // Проверяем столкновение каждой трубы с игроком
            if (Phaser.Geom.Rectangle.Overlaps(pipes.getTopShape(), this.player.getBounds()) ||
                Phaser.Geom.Rectangle.Overlaps(pipes.getDownShape(), this.player.getBounds())) {
                // this.g = true; // что-то делаем после столкновения
            }
            // Когда пара труб оказывается за пределами экрана - удаляем её
            if (pipes.isOffScreen()) {
                this.pipes.splice(index, 1);
                console.debug(this.pipes.length);
            }
        });
        this.player.update();
        if (!this.g) {
            // Если последняя пара труб ушла достаточно далеко от конца экрана, создаём ещё одну
            if ((this.sys.canvas.width - this.pipes[this.pipes.length - 1].getX()) >= const_1.PIPES.HORIZONTAL_GAP) {
                this.pipes.push(new pipe_1.PairPipes(this));
            }
        }
    }
}
exports.GameScene = GameScene;
