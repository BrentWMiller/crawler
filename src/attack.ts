import { Bodies, Body } from 'matter-js';
import WorldBuilder from './world-builder';

export class Attack {
  entity: Matter.Body;
  type: string;
  mass: number;
  density: number;
  frictionAir: number;
  count: number = 0;

  constructor(entity: Matter.Body) {
    this.entity = entity;
    this.mass = 0.001;
    this.density = 0.005;
    this.frictionAir = 0;
  }

  setType(type: string) {
    this.type = type;
  }

  fire() {
    if (this.count >= 100) {
      return;
    }

    // Calculates vector heading based of entity position and angle
    const heading = {
      x: this.entity.position.x + Math.cos(this.entity.angle),
      y: this.entity.position.y + Math.sin(this.entity.angle),
    };

    const attackParticle: Matter.Body = Bodies.circle(heading.x, heading.y, 3, {
      mass: this.mass,
      density: this.density,
      friction: 0,
      frictionAir: 0,
    });

    Body.setAngularVelocity(attackParticle, 10);
    WorldBuilder.addToWorld(attackParticle);
    this.count += 1;

    this._dissapate(attackParticle);
  }

  _dissapate(particle: Matter.Body) {
    setTimeout(() => {
      WorldBuilder.removeFromWorld(particle);
      this.count -= 1;
    }, 500);
  }
}
