import { browser } from "./browser";
const getProcessors = () => {
    return navigator.hardwareConcurrency;
};
const browserSpecificSupportCores = () => {
    if (browser === "Chrome") {
        return getProcessors();
    }
    ;
    if (browser === "Edge") {
        return getProcessors();
    }
    if (browser === "Firefox") {
        return getProcessors();
    }
    if (browser === "IE") {
        return "Not Supported";
    }
    if (browser === "Opera") {
        return getProcessors();
    }
    if (browser === "Safari") {
        return getProcessors();
    }
    else {
        return "Not Supported";
    }
};
let processorCores = browserSpecificSupportCores();
export { processorCores, browserSpecificSupportCores };
