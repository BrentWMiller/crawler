import { World, Engine, Render, Bodies } from 'matter-js';

export interface ICanvasSize {
  width: number;
  height: number;
}

export class _WorldBuilder {
  debug: boolean;
  engine: Matter.Engine;
  world: Matter.World;
  render: Matter.Render;
  canvas: any;

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
        width: this.getWorldSize().width,
        height: this.getWorldSize().height,
        wireframes: this.debug,
      },
    });

    World.add(this.world, []);
  }

  getWorld(): any {
    return this.canvas;
  }

  getCanvas(): any {
    return document.querySelector('canvas');
  }

  getWorldSize(): ICanvasSize {
    return {
      width: this.getWorld().offsetWidth,
      height: this.getWorld().offsetHeight,
    };
  }

  getEngine(): Matter.Engine {
    return this.engine;
  }

  init() {
    Engine.run(this.engine);
    Render.run(this.render);

    this.addWorldBoundries();
  }

  addToWorld(body: Matter.Body | Array<Matter.Body>) {
    World.add(this.engine.world, body);
  }

  removeFromWorld(body: Matter.Body) {
    World.remove(this.engine.world, body);
  }

  private addWorldBoundries() {
    /* prettier ignore */
    const boundaries = [
      Bodies.rectangle(this.getWorldSize().width / 2, 0, this.getWorldSize().width, 30),
      Bodies.rectangle(this.getWorldSize().width, this.getWorldSize().height / 2, 30, this.getWorldSize().height),
      Bodies.rectangle(this.getWorldSize().width / 2, this.getWorldSize().height, this.getWorldSize().width, 30),
      Bodies.rectangle(0, this.getWorldSize().height / 2, 30, this.getWorldSize().height),
    ];

    boundaries.forEach((boundary) => {
      boundary.isStatic = true;
      boundary.restitution = 0.2;
      boundary.render = {
        fillStyle: 'transparent',
      };
    });

    this.addToWorld(boundaries);
  }
}

const WorldBuilder = new _WorldBuilder();

export default WorldBuilder;
