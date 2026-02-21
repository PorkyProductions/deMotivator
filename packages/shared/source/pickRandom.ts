import { sample } from 'lodash';

export const pickRandom = <T>(array: T[]): T | undefined => sample(array);
