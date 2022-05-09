let getCurrentUA = () => {
    return navigator.userAgent;
};
let currentUA = getCurrentUA();
export { currentUA, getCurrentUA };
