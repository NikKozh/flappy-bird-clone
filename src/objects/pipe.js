"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const/const");
// Класс, описывающий сразу верхнюю и нижнюю трубы и отвечающий за их логику
class PairPipes {
    constructor(scene) {
        this.graphics = scene.add.graphics();
        // Расчёт положения труб исходя из желаемого расстояния между ними (VERTICAL_GAP)
        let topPipesEndY = Phaser.Math.RND.between(80, scene.sys.canvas.height - const_1.PIPES.VERTICAL_GAP - 80);
        this.topPipeGeom = new Phaser.Geom.Rectangle(scene.sys.canvas.width + 10, // за пределами экрана
        -5, // учитываем границу в 4 пиксела, чтобы труба оказалась за экраном
        const_1.PIPES.WIDTH, topPipesEndY // координата Y, где кончается верхняя труба
        );
        let downPipeStartY = topPipesEndY + const_1.PIPES.VERTICAL_GAP;
        this.downPipeGeom = new Phaser.Geom.Rectangle(scene.sys.canvas.width + 10, // за пределами экрана
        downPipeStartY, // координата Y, где начинается нижняя труба
        const_1.PIPES.WIDTH, scene.sys.canvas.height - downPipeStartY + 5 // учитываем границу в 4 пиксела, чтобы труба оказалась за экраном
        );
    }
    update() {
        this.topPipeGeom.x -= const_1.PIPES.SPEED;
        this.downPipeGeom.x -= const_1.PIPES.SPEED;
        this.graphics.clear();
        this.graphics.lineStyle(4, 0x008000, 1);
        this.graphics.strokeRectShape(this.topPipeGeom);
        this.graphics.strokeRectShape(this.downPipeGeom);
    }
    // Вышла ли пара труб за пределы экрана
    isOffScreen() {
        if (this.topPipeGeom.x < -const_1.PIPES.WIDTH - 10) {
            console.log('destroyed');
            this.graphics.destroy();
            return true;
        }
        return false;
    }
    // Возвращаем позицию верхней трубы, но на самом деле без разницы, координаты X у обеих труб одинаковые
    getX() {
        return this.topPipeGeom.x;
    }
    getTopShape() {
        return this.topPipeGeom;
    }
    getDownShape() {
        return this.downPipeGeom;
    }
}
exports.PairPipes = PairPipes;
