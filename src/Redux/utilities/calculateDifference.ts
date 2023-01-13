import { RGB } from '../../interfaces/types';

const calculateDifference = (target: RGB, obtainedColor: RGB): number =>
  (1 / 255) *
  ((1 / Math.sqrt(3)) *
    Math.sqrt(
      (target[0] - obtainedColor[0]) * (target[0] - obtainedColor[0]) +
        (target[1] - obtainedColor[1]) * (target[1] - obtainedColor[1]) +
        (target[2] - obtainedColor[2]) * (target[2] - obtainedColor[2])
    )) *
  100;

export { calculateDifference };
