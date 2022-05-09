let browserDoNotTrack = navigator.doNotTrack

const getDoNotTrack = (browserDoNotTrack: any): "TRACKING_allowed" | "TRACKING_notAllowed" | "TRACKING_unspecified" | "ERROR" => {
    if (browserDoNotTrack == 0) {
        return "TRACKING_allowed"
    };
    if (browserDoNotTrack == 1) {
        return "TRACKING_notAllowed"
    }
    if (browserDoNotTrack == "unspecified") {
        return "TRACKING_unspecified"
    }
    if (browserDoNotTrack == "null") {
        return "TRACKING_unspecified"
    }
    else {
        return "ERROR"
    }
}

let doNotTrackStatus = getDoNotTrack(browserDoNotTrack);

export { doNotTrackStatus, getDoNotTrack }