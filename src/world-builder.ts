import { World, Engine, Render } from 'matter-js';

export class WorldBuilder {
  debug: boolean;
  engine: Matter.Engine;
  world: Matter.World;
  render: Matter.Render;

  constructor(canvas, debug = false) {
    this.debug = debug;

    this.engine = Engine.create();
    this.world = this.engine.world;

    this.world.gravity = { x: 0, y: 0, scale: 0 };

    // this.world.friction = 1;

    this.render = Render.create({
      element: canvas,
      engine: this.engine,
      options: {
        width: canvas.offsetWidth,
        height: canvas.offsetHeight,
        wireframes: this.debug,
      },
    });

    World.add(this.world, []);
  }

  init() {
    Engine.run(this.engine);
    Render.run(this.render);
  }

  addToWorld(body) {
    World.add(this.engine.world, body);
  }
}
