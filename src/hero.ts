import { Events, Body } from 'matter-js';
import { PersonEntity, IPersonEntityPosition } from './person-entity';
import { Attack } from './attack';
import WorldBuilder from './world-builder';

export interface IHeroDirectionKey {
  [key: number]: {
    id: string;
    x: number;
    y: number;
  };
}

export interface IHeroAttackKey {
  [key: number]: {
    id: string;
  };
}

export interface IHeroMousePosition {
  x: number;
  y: number;
}

export class Hero extends PersonEntity {
  canvas: HTMLElement;
  matter: Matter.Body;
  engine: Matter.Engine;
  size: number;
  speed: number;
  angle: number;
  keys: Array<number>;
  directionCodes: Array<number>;
  directionKeys: IHeroDirectionKey;
  attackCodes: Array<number>;
  attackKeys: IHeroAttackKey;
  mousePosition: IHeroMousePosition;
  attack: Attack;

  constructor(label: string, position: IPersonEntityPosition, size: number, sprite: any) {
    super(label, position, size, sprite);

    // World
    this.canvas = WorldBuilder.getWorld();
    this.engine = WorldBuilder.getEngine();

    // Movement & Facing
    this.size = size;
    this.speed = 0.01;
    this.angle = 0;

    // Key tracking
    this.keys = [];

    // Movement: W, A, S, D
    this.directionCodes = [87, 65, 83, 68];
    this.directionKeys = {
      87: { id: 'up', x: 0, y: -1 },
      65: { id: 'left', x: -1, y: 0 },
      83: { id: 'down', x: 0, y: 1 },
      68: { id: 'right', x: 1, y: 0 },
    };

    // Attack: Space, R
    this.attackCodes = [32, 82];
    this.attackKeys = {
      32: { id: 'base' },
      82: { id: 'special' },
    };

    // Mouse tracking
    this.mousePosition = { x: 0, y: 0 };
  }

  birth() {
    this.matter.mass = 1;
    this.matter.frictionAir = 0.5;

    this.attack = new Attack(this.matter);

    this.initEvents();
  }

  private initEvents() {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      const index = this.keys.indexOf(e.keyCode);

      if (index === -1) {
        this.keys.push(e.keyCode);
      }
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      const index = this.keys.indexOf(e.keyCode);

      if (index > -1) {
        this.keys.splice(index, 1);
      }
    });

    window.addEventListener('mousemove', (e: MouseEvent) => {
      const canvasOffset = this.canvas.getBoundingClientRect();

      this.mousePosition = {
        x: e.pageX - canvasOffset.left,
        y: e.pageY - canvasOffset.top,
      };
    });

    Events.on(this.engine, 'beforeTick', () => {
      this._handleMovement();
      this._handleLook();
      this._handleAttack();
    });
  }

  _handleMovement() {
    if (this.keys.length === 0) {
      return;
    }

    let movement = { x: 0, y: 0 };

    this.keys.forEach((key) => {
      if (this.directionCodes.includes(key)) {
        const move = this.directionKeys[key];

        movement.x += move.x * this.speed;
        movement.y += move.y * this.speed;
      }
    });

    this.matter.force = { x: movement.x, y: movement.y };
  }

  _handleLook() {
    // calculates x,y differences between mouse and hero
    const diffX = this.mousePosition.x - (this.matter.position.x + this.size / 2);
    const diffY = this.mousePosition.y - (this.matter.position.y + this.size / 2);

    // converts to degrees and handles 360 rotation
    const radians = Math.atan2(diffY, diffX);
    let degrees = radians * (180 / Math.PI);

    if (degrees < 0) {
      degrees = 360 - -degrees;
    }

    this.angle = degrees * (Math.PI / 180);

    Body.setAngle(this.matter, this.angle);
  }

  _handleAttack() {
    this.keys.forEach((key) => {
      if (this.attackCodes.includes(key)) {
        this.attack.setType(this.attackKeys[key].id);
        this.attack.fire();
      }
    });
  }
}
