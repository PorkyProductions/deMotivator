const getMaxTouchPoints = () => {
    return navigator.maxTouchPoints;
};
let maxTouchPoints = getMaxTouchPoints();
export { maxTouchPoints, getMaxTouchPoints };
