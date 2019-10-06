import WorldBuilder from './world-builder';
import { Hero } from './hero';
import * as SpriteSheet from './assets/sprite-sheet.png';
import { ISprite } from './animation/animation.interface';
import { wizardAnimations } from './animation/wizard';

window.addEventListener('load', (event) => {
  init();
});

const init = async () => {
  WorldBuilder.init();

  const heroPosition = {
    x: 400,
    y: 400,
  };

  const heroSprite: ISprite = {
    url: SpriteSheet,
    animations: wizardAnimations,
  };

  let hero = new Hero('player', heroPosition, 16, heroSprite);
  await hero.draw();
  hero.birth();
};
