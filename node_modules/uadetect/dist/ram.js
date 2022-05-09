import { browser } from "./browser";
const getRam = () => {
    let RAM = navigator.deviceMemory;
    return RAM;
};
const browserSpecificSupportRAM = (getRam) => {
    if (browser == "Chrome") {
        getRam();
    }
    if (browser == "Firefox") {
        return "RAM API not availible in Firefox";
    }
    if (browser == "Safari") {
        return "RAM API not availible in Safari";
    }
    if (browser == "IE") {
        return "RAM API not availible in IE";
    }
    if (browser == "Opera") {
        getRam();
    }
};
let browserRam = browserSpecificSupportRAM(getRam);
export { browserRam, getRam, browserSpecificSupportRAM };
