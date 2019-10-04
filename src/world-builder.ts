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
        width: this.getCanvasSize().width,
        height: this.getCanvasSize().height,
        wireframes: this.debug,
      },
    });

    World.add(this.world, []);
  }

  getCanvas(): HTMLElement {
    return this.canvas;
  }

  getCanvasSize(): ICanvasSize {
    return {
      width: this.getCanvas().offsetWidth,
      height: this.getCanvas().offsetHeight,
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
      Bodies.rectangle(this.getCanvasSize().width / 2, 0, this.getCanvasSize().width, 10),
      Bodies.rectangle(this.getCanvasSize().width, this.getCanvasSize().height / 2, 10, this.getCanvasSize().height),
      Bodies.rectangle(this.getCanvasSize().width / 2, this.getCanvasSize().height, this.getCanvasSize().width, 10),
      Bodies.rectangle(0, this.getCanvasSize().height / 2, 10, this.getCanvasSize().height),
    ];

    boundaries.forEach((boundary) => {
      boundary.isStatic = true;
      boundary.restitution = 0.2;
    });

    this.addToWorld(boundaries);
  }
}

const WorldBuilder = new _WorldBuilder();

export default WorldBuilder;
