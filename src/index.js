import { WorldBuilder } from './world-builder/world-builder';
import { Hero } from './hero/hero';

window.addEventListener('load', (event) => {
  init();
});

const init = () => {
  const canvas = document.getElementById('world');
  const builder = new WorldBuilder(canvas, true);

  builder.init();

  const heroPosition = {
    x: 400,
    y: 400,
  };

  let hero = new Hero(builder.engine, 'player', heroPosition, 20);
  hero.draw();
  builder.addToWorld(hero.matter);

  hero.birth(canvas);
};
