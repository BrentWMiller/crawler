import { Bodies, IBodyRenderOptionsSprite, IBodyRenderOptions, World } from 'matter-js';
import WorldBuilder from './world-builder';
import { ImageLoader } from './image-loader';
import { ISprite } from './animation/animation.interface';

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
  sprite: any;
  ready: boolean = false;

  constructor(label: string, position: IPersonEntityPosition, size: number, sprite: ISprite) {
    this.engine = WorldBuilder.getEngine();
    this.label = label;
    this.position = position;
    this.size = size;
    this.sprite = sprite;

    this.options = {
      label: this.label,
    };

    this.matter = null;
  }

  draw() {
    return new Promise(async (resolve) => {
      const image: any = await new ImageLoader().loadImage(this.sprite.url);

      this.options.render = {
        sprite: {
          texture: image.url,
          xScale: 1,
          yScale: 1,
        },
      };

      this.matter = Bodies.rectangle(this.position.x, this.position.y, this.size, this.size, this.options);
      WorldBuilder.addToWorld(this.matter);

      this.playAnimation(image.element);

      resolve(true);
    });
  }

  playAnimation(image: HTMLImageElement, type: string = 'idle') {
    const animation = this.sprite.animations[type];

    if (!animation) {
      throw Error(`Animation type of "${type}" does not exist`);
    }

    const ctx = WorldBuilder.getCanvas().getContext('2d');

    ctx.drawImage(image, animation.x, animation.y, animation.w, animation.h, this.matter.position.x, this.matter.position.y, 16, 16);
  }
}
