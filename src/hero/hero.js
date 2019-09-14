import { Events } from 'matter-js';
import { PersonEntity } from '../person-entity/person-entity';

export class Hero extends PersonEntity {
  constructor(engine, id, position, size) {
    super(engine, id, position, size);

    this.directionCodes = [65, 87, 68, 83];
    this.speed = 0.01;

    // Movement: W, A, S, D | x, y
    this.direction = {
      87: { id: 'up', x: 0, y: -1 },
      65: { id: 'left', x: -1, y: 0 },
      83: { id: 'down', x: 0, y: 1 },
      68: { id: 'right', x: 1, y: 0 },
    };

    this.keys = [];
  }

  birth() {
    this._handleMovement();
    this.matter.mass = 1;
    this.matter.frictionAir = 0.5;
  }

  _handleMovement() {
    window.addEventListener('keydown', (e) => {
      const index = this.keys.indexOf(e.keyCode);

      if (index === -1) {
        this.keys.push(e.keyCode);
      }
    });

    window.addEventListener('keyup', (e) => {
      const index = this.keys.indexOf(e.keyCode);

      if (index > -1) {
        this.keys.splice(index, 1);
      }
    });

    this._move();
  }

  _move() {
    Events.on(this.engine, 'beforeTick', () => {
      if (this.keys.length === 0) {
        return;
      }

      this.keys.forEach((key) => {
        if (this.directionCodes.includes(key)) {
          const move = this.direction[key];

          const x = move.x * this.speed;
          const y = move.y * this.speed;

          this.matter.force = { x, y };
        }
      });
    });
  }
}
