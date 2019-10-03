import { World, Engine, Render } from 'matter-js';

export class _WorldBuilder {
  debug: boolean;
  engine: Matter.Engine;
  world: Matter.World;
  render: Matter.Render;
  canvas: HTMLElement;

  constructor() {
    this.debug = false;

    this.canvas = document.getElementById('world');

    this.engine = Engine.create();
    this.world = this.engine.world;

    this.world.gravity = { x: 0, y: 0, scale: 0 };

    this.render = Render.create({
      element: this.canvas,
      engine: this.engine,
      options: {
        width: this.canvas.offsetWidth,
        height: this.canvas.offsetHeight,
        wireframes: this.debug,
      },
    });

    World.add(this.world, []);
  }

  getCanvas(): HTMLElement {
    return this.canvas;
  }

  getEngine(): Matter.Engine {
    return this.engine;
  }

  init() {
    Engine.run(this.engine);
    Render.run(this.render);
  }

  addToWorld(body: Matter.Body) {
    World.add(this.engine.world, body);
  }

  removeFromWorld(body: Matter.Body) {
    World.remove(this.engine.world, body);
  }
}

const WorldBuilder = new _WorldBuilder();

export default WorldBuilder;
