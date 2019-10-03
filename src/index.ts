import WorldBuilder from './world-builder';
import { Hero } from './hero';

window.addEventListener('load', (event) => {
  init();
});

const init = () => {
  WorldBuilder.init();

  const heroPosition = {
    x: 400,
    y: 400,
  };

  let hero = new Hero('player', heroPosition, 20);
  hero.draw();
  WorldBuilder.addToWorld(hero.matter);
  hero.birth();
};
