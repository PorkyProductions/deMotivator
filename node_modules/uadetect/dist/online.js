let browserIsOnline = navigator.onLine;
const getBrowserIsOnline = ({ browserIsOnline }) => {
    if (browserIsOnline) {
        return "BROWSER_online";
    }
    else {
        return "BROWSER_offline";
    }
};
let browserOnlineStatus = getBrowserIsOnline({ browserIsOnline });
export { browserOnlineStatus };
