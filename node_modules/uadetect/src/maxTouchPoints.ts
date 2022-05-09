const getMaxTouchPoints = () => {
    return navigator.maxTouchPoints;
}
let maxTouchPoints: number = getMaxTouchPoints();

export { maxTouchPoints, getMaxTouchPoints };