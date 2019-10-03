import { Bodies } from 'matter-js';
import WorldBuilder from './world-builder';

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
  matter: Matter.Bodies;

  constructor(label: string, position: IPersonEntityPosition, size: number) {
    this.engine = WorldBuilder.getEngine();
    this.label = label;
    this.position = position;
    this.size = size;

    this.options = {
      label: this.label,
    };

    this.matter = null;
  }

  draw() {
    this.matter = Bodies.circle(this.position.x, this.position.y, this.size, this.options);
  }
}
