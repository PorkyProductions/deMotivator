export const randomInRange = (min: number, max: number): number => Math.round(Math.random() * (max - min) + min);
export const randomInArray = <T>(arr: T[]): T => arr[randomInRange(0, arr.length - 1)];