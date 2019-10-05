import { Bodies, IBodyRenderOptionsSprite, IBodyRenderOptions } from 'matter-js';
import WorldBuilder from './world-builder';
import { ImageLoader } from './image-loader';

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

  constructor(label: string, position: IPersonEntityPosition, size: number, sprite: any) {
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
      const url: any = await new ImageLoader().loadImage(this.sprite);
      console.log(url);

      this.options.render = {
        sprite: {
          texture: url,
          xScale: this.size,
          yScale: this.size,
        },
      };

      this.matter = Bodies.rectangle(this.position.x, this.position.y, this.size, this.size, this.options);
      WorldBuilder.addToWorld(this.matter);

      resolve(true);
    });
  }
}
