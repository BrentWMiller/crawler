import { Bodies } from 'matter-js';

export class PersonEntity {
  constructor(engine, id, position, size) {
    this.engine = engine;
    this.id = id;
    this.position = position;
    this.size = size;

    this.options = {
      id: this.id,
      fillStyle: '#ff0000',
    };

    this.matter = null;
  }

  draw() {
    this.matter = Bodies.circle(this.position.x, this.position.y, this.size, this.options);
  }
}
