import { Bodies } from 'matter-js';

export class Hero {
  constructor(id, position, size) {
    this.id = id;
    this.position = position;
    this.size = size;

    this.options = {
      id: this.id,
      fillStyle: '#ff0000',
    };
  }

  create() {
    return Bodies.circle(this.position.x, this.position.y, this.size, this.options);
  }
}
