import { Bodies, Body, Vector } from 'matter-js';
import WorldBuilder from './world-builder';
import { lengthDir, ILengthDir } from './formulas';

export class Attack {
  entity: Matter.Body;
  type: string;
  mass: number;
  density: number;
  friction: number;
  count: number = 0;
  size: number;
  speed: number;

  constructor(entity: Matter.Body) {
    this.entity = entity;
    this.mass = 0.001;
    this.density = 0.005;
    this.friction = 1;
    this.size = 3;
    this.speed = 20;
  }

  setType(type: string) {
    this.type = type;
  }

  fire() {
    if (this.count >= Infinity) {
      return;
    }

    // Calculates vector heading based of entity position and angle
    const heading = {
      x: this.entity.position.x + Math.cos(this.entity.angle),
      y: this.entity.position.y + Math.sin(this.entity.angle),
    };

    // Calculate origin offset so the attack isn't stacked
    const lengthOffset: ILengthDir = lengthDir(10 + this.size, this.entity.angle);

    // Set the final position
    const particlePosition = {
      x: heading.x + lengthOffset.x,
      y: heading.y + lengthOffset.y,
    };

    // sets inertia
    const inertia: Vector = {
      x: Math.cos(this.entity.angle) * this.speed,
      y: Math.sin(this.entity.angle) * this.speed,
    };

    const attackParticle: Matter.Body = Bodies.circle(particlePosition.x, particlePosition.y, this.size, {
      mass: this.mass,
      density: this.density,
      friction: this.friction,
    });

    Body.setVelocity(attackParticle, inertia);
    WorldBuilder.addToWorld(attackParticle);
    this.count += 1;

    this._dissapate(attackParticle);
  }

  _dissapate(particle: Matter.Body) {
    setTimeout(() => {
      WorldBuilder.removeFromWorld(particle);
      this.count -= 1;
    }, 3500);
  }
}
