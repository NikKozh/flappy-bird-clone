import { PIPES } from "../const/const";

// Класс, описывающий сразу верхнюю и нижнюю трубы и отвечающий за их логику
export class PairPipes {
    private graphics: Phaser.GameObjects.Graphics; // описывает общее "полотно", на котором отрисовываются примитивы
    private topPipeGeom: Phaser.Geom.Rectangle;    // сами
    private downPipeGeom: Phaser.Geom.Rectangle;   // примитивы

    constructor(scene: Phaser.Scene) {
        this.graphics = scene.add.graphics();

        // Расчёт положения труб исходя из желаемого расстояния между ними (VERTICAL_GAP)
        let topPipesEndY: number = Phaser.Math.RND.between(80, scene.sys.canvas.height - PIPES.VERTICAL_GAP - 80);
        this.topPipeGeom = new Phaser.Geom.Rectangle(
            scene.sys.canvas.width + 10, // за пределами экрана
            -5, // учитываем границу в 4 пиксела, чтобы труба оказалась за экраном
            PIPES.WIDTH,
            topPipesEndY // координата Y, где кончается верхняя труба
        );

        let downPipeStartY: number = topPipesEndY + PIPES.VERTICAL_GAP;
        this.downPipeGeom = new Phaser.Geom.Rectangle(
            scene.sys.canvas.width + 10, // за пределами экрана
            downPipeStartY, // координата Y, где начинается нижняя труба
            PIPES.WIDTH,
            scene.sys.canvas.height - downPipeStartY + 5 // учитываем границу в 4 пиксела, чтобы труба оказалась за экраном
        );
    }

    update(playerBounds: Phaser.Geom.Rectangle): boolean {
        this.topPipeGeom.x -= PIPES.SPEED;
        this.downPipeGeom.x -= PIPES.SPEED;

        this.graphics.clear();
        this.graphics.lineStyle(4,0x008000,1);
        this.graphics.strokeRectShape(this.topPipeGeom);
        this.graphics.strokeRectShape(this.downPipeGeom);

        // Проверка на пересечение игроком
        if (Phaser.Geom.Rectangle.Overlaps(this.topPipeGeom, playerBounds) ||
            Phaser.Geom.Rectangle.Overlaps(this.downPipeGeom, playerBounds)) {
            // return true;
        }

        return false;
    }

    // Вышла ли пара труб за пределы экрана
    isOffScreen(): boolean {
        if (this.topPipeGeom.x < -PIPES.WIDTH - 10) {
            console.log('destroyed');

            this.graphics.destroy();
            return true;
        }

        return false;
    }

    // Возвращаем позицию верхней трубы, но на самом деле без разницы, координаты X у обеих труб одинаковые
    getX(): number {
        return this.topPipeGeom.x;
    }
}