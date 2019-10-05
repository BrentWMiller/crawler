import WorldBuilder from './world-builder';
import { Hero } from './hero';
import * as HeroSprite from './assets/hero-base.png';

window.addEventListener('load', (event) => {
  init();
});

const init = async () => {
  WorldBuilder.init();

  const heroPosition = {
    x: 400,
    y: 400,
  };

  let hero = new Hero('player', heroPosition, 16, HeroSprite);
  await hero.draw();
  hero.birth();
};
