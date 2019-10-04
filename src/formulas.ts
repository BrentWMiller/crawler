export interface ILengthDir {
  x: number;
  y: number;
}

export const lengthDir = (length: number, direction: number): ILengthDir => {
  return {
    x: Math.cos(direction) * length,
    y: Math.sin(direction) * length,
  };
};
