import { RGB } from '../../interfaces/types';

const getColorValue = (colorStr = 'rgb(0,0,0)'): RGB => {
  const color = colorStr.slice(4, colorStr.length - 1).split(',');
  const resultColor: RGB = [Number(color[0]), Number(color[1]), Number(color[2])];
  return resultColor;
};

export { getColorValue };
