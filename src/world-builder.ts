import { World, Engine, Bodies } from 'matter-js';
import { Loader, autoDetectRenderer, Container } from 'pixi.js';
import * as SpriteSheet from './animation/spritesheet.json';
import * as SpriteSheetPNG from './animation/spritesheet.png';
import { Hero } from './hero';

export interface ICanvasSize {
  width: number;
  height: number;
}

export class _WorldBuilder {
  debug: boolean;
  engine: Matter.Engine;
  world: Matter.World;
  render: any;
  canvas: any;
  stage: PIXI.Container;
  loader: PIXI.Loader;

  constructor() {
    this.debug = false;

    this.canvas = document.getElementById('world');

    this.engine = Engine.create();
    this.world = this.engine.world;

    this.world.gravity = { x: 0, y: 0, scale: 0 };

    // Uses PIXI Renderer
    this.render = autoDetectRenderer({
      backgroundColor: 0x000000,
    });

    // Sets canvas size
    this.render.resize(this.getWorldSize().width, this.getWorldSize().height);

    // Creates a PIXI container
    this.stage = new Container();
    this.getWorld().appendChild(this.render.view);

    // Adds matterJS world
    World.add(this.world, []);

    // Creates a PIXI loader
    this.loader = Loader.shared;
  }

  getWorld(): any {
    return this.canvas;
  }

  getCanvas(): any {
    return document.querySelector('canvas');
  }

  getStage(): PIXI.Container {
    return this.stage;
  }

  getLoader(): PIXI.Loader {
    return this.loader;
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
    // Adds spritesheet JSON to loader
    this.loader.add(SpriteSheet).load(async () => {
      Engine.run(this.engine);
      this.addWorldBoundries();

      const heroPosition = {
        x: 400,
        y: 400,
      };

      let hero = new Hero('player', heroPosition, 16, 'wizzard_m_idle_anim_f');
      await hero.draw();
      hero.birth();
    });
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
