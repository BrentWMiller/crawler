import { Bodies } from 'matter-js';

export class PersonEntity {
  engine: Matter.Engine;
  id: string;
  position: any;
  size: any;
  options: Object;
  matter: Matter.Bodies;

  constructor(engine, id, position, size) {
    this.engine = engine;
    this.id = id;
    this.position = position;
    this.size = size;

    this.options = {
      id: this.id,
    };

    this.matter = null;
  }

  draw() {
    this.matter = Bodies.circle(this.position.x, this.position.y, this.size, this.options);
  }
}
