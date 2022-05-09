let cookies: boolean = navigator.cookieEnabled

const getCookies = (cookies: boolean): "COOKIES_enabled" | "COOKIES_notEnabled" | "ERROR" => {
    if (cookies == true) {
        return "COOKIES_enabled"
    };
    if (cookies == false) {
        return "COOKIES_notEnabled"
    }
    else {
        return "ERROR"
    }
}

let cookieStatus = getCookies(cookies);

export { cookieStatus }
export { getCookies }