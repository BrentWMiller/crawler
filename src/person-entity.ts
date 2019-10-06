import { Bodies } from 'matter-js';
import WorldBuilder from './world-builder';
import { AnimatedSprite } from 'pixi.js';
import * as SpriteSheet from './animation/spritesheet.json';

export interface IPersonEntityPosition {
  x: number;
  y: number;
}

export class PersonEntity {
  engine: Matter.Engine;
  label: string;
  position: IPersonEntityPosition;
  size: number;
  options: Matter.IBodyDefinition;
  matter: Matter.Body;
  animation: any;
  ready: boolean = false;

  constructor(label: string, position: IPersonEntityPosition, size: number, animation: string) {
    this.engine = WorldBuilder.getEngine();
    this.label = label;
    this.position = position;
    this.size = size;
    this.animation = animation;

    this.options = {
      label: this.label,
    };

    this.matter = null;
  }

  draw() {
    return new Promise(async (resolve) => {
      this.matter = Bodies.rectangle(this.position.x, this.position.y, this.size, this.size, this.options);
      WorldBuilder.addToWorld(this.matter);

      this.playAnimation(this.animation);

      resolve(true);
    });
  }

  playAnimation(type: string) {
    if (!type) {
      throw Error(`Missing animation type`);
    }

    const sheet: any = WorldBuilder.getLoader().resources[SpriteSheet];
    const frames = sheet.data.animations[type];

    let animation = new AnimatedSprite(frames);

    // ctx.drawImage(image, animation.x, animation.y, animation.w, animation.h, this.matter.position.x, this.matter.position.y, 16, 16);
  }
}
