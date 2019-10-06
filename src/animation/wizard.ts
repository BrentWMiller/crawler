import { ISpriteAnimation } from './animation.interface';

export const wizardAnimations: ISpriteAnimation = {
  idle: {
    x: 128,
    y: 164,
    h: 16,
    w: 28,
    frameCount: 4,
  },
  run: {
    x: 192,
    y: 164,
    w: 16,
    h: 28,
    frameCount: 4,
  },
  jump: {
    x: 256,
    y: 164,
    w: 16,
    h: 28,
    frameCount: 1,
  },
};
