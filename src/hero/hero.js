import { Events } from 'matter-js';
import { PersonEntity } from '../person-entity/person-entity';

export class Hero extends PersonEntity {
  constructor(engine, id, position, size) {
    super(engine, id, position, size);
    this.canvas;
    this.size = size;
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
    this.mousePosition = { x: 0, y: 0 };
  }

  birth(canvas) {
    this.canvas = canvas;
    this.matter.mass = 1;
    this.matter.frictionAir = 0.5;

    this._handleMovement();
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

    window.addEventListener('mousemove', (e) => {
      this.mousePosition = {
        x: e.pageX,
        y: e.pageY,
      };
    });

    this._mouseLook();
    this._keyMove();
  }

  _keyMove() {
    Events.on(this.engine, 'beforeTick', () => {
      if (this.keys.length === 0) {
        return;
      }

      let movement = { x: 0, y: 0 };

      this.keys.forEach((key) => {
        if (this.directionCodes.includes(key)) {
          const move = this.direction[key];

          movement.x += move.x;
          movement.y += move.y;
        }
      });

      const x = movement.x * this.speed;
      const y = movement.y * this.speed;

      this.matter.force = { x, y };
    });
  }

  _mouseLook() {
    Events.on(this.engine, 'beforeTick', () => {
      const diffY = this.mousePosition.y - this.matter.position.y;
      const diffX = this.mousePosition.x - this.matter.position.x;

      const radians = Math.atan2(diffY, diffX);
      let degrees = radians * (180 / Math.PI);

      if (degrees < 0) {
        degrees = 360 - -degrees;
      }

      const angle = degrees * (Math.PI / 180);

      this.matter.angle = angle;

      // console.log(this.matter.angle);
    });
  }
}
