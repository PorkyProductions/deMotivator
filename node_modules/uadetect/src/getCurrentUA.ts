let getCurrentUA = (): string => {
  return navigator.userAgent;
};
let currentUA = getCurrentUA();

export { currentUA, getCurrentUA };
