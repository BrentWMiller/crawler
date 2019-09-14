import { World, Engine, Render } from 'matter-js';

export class WorldBuilder {
  constructor(canvas) {
    this.engine = Engine.create();
    this.render = Render.create({
      element: canvas,
      engine: this.engine,
      options: {
        width: canvas.offsetWidth,
        height: canvas.offsetHeight,
        wireframes: true,
        showAngleIndicator: false,
      },
    });
    World.add(this.engine.world, []);
  }

  init() {
    Engine.run(this.engine);
    Render.run(this.render);
  }

  addToWorld(body) {
    World.add(this.engine.world, body);
  }
}
