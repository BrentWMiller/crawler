export interface ISprite {
  url: string;
  animations: ISpriteAnimation;
}

export interface ISpriteAnimation {
  [key: string]: {
    x: number;
    y: number;
    w: number;
    h: number;
    frameCount: number;
  };
}
