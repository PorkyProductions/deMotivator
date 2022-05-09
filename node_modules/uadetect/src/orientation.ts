/*

Copyright � 2022, PorkyProductions, and it's contributors.
Licensed under the Apache-2.0 License.

*/

//SCREEN ORIENTATION
let ORIENTATION_isLandscape: boolean = true;
$(document).ready((): void => {
  DetectScreenOrientation();
});
$(window).on("orientationchange", (_event): void => {
  //When screen orientation changes
  DetectScreenOrientation();
});
const DetectScreenOrientation = () => {
  //detects orientation of device
  ORIENTATION_isLandscape = window.innerHeight <= window.innerWidth;
  return ORIENTATION_isLandscape;
};

// Exports

export { DetectScreenOrientation, ORIENTATION_isLandscape };
