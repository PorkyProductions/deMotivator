let ua = navigator.userAgent;


const getBrowser = ({ ua }: { ua; }): "Opera" | "Chrome" | "Firefox" | "Safari" | "IE" | "Edge" | "unknown" => {
    if (ua.indexOf('Opera') > -1) {
        return 'Opera';
    }
    else if (ua.indexOf('Chrome') > -1) {
        return 'Chrome';
    }
    else if (ua.indexOf('Firefox') > -1) {
        return 'Firefox';
    }
    else if (ua.indexOf('Safari') > -1) {
        return 'Safari';
    }
    else if (ua.indexOf('MSIE') > -1) {
        return 'IE';
    }
    else if (ua.indexOf('Trident') > -1) {
        return 'IE';
    }
    else if (ua.indexOf('Edge') > -1) {
        return 'Edge';
    }
    
    else {
        return 'unknown';
    }
};

let browser = getBrowser({ ua });

export { browser, getBrowser };