// Finite Device Type
export default function finiteMobileDeviceType(): "iOS" | "Android" | "BlackBerry" | "Windows Phone" | "webOS" | "unknown" {
    const ua = navigator.userAgent;
    if (/(iPhone|iPod|iPad)/i.test(ua)) {
        console.log("iOS");
        return "iOS";
    }
    else if (/Android/i.test(ua)) {
        console.log("Android");
        return "Android";
    }
    else if (/BlackBerry/i.test(ua)) {
        console.log("BlackBerry");
        return "BlackBerry";
    }
    else if (/Windows Phone/i.test(ua)) {
        console.log("Windows Phone");
        return "Windows Phone";
    }
    else if (/webOS/i.test(ua)) {
        console.log("webOS");
        return "webOS";
    }
    else {
        console.log("ERR: Unknown Device");
        return "unknown";
    }
}
let DEVICE_finiteType = finiteMobileDeviceType();

export { DEVICE_finiteType, finiteMobileDeviceType }
