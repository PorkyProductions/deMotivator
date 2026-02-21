import s from 'lodash/sample';

export const pickRandom = <T>(array: T[]): T | undefined => s(array);
