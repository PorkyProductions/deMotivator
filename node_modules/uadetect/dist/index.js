/*

Copyright © 2022, PorkyProductions, and it's contributors.
Licensed under the Apache-2.0 License.

*/
// Browser
import { browser, getBrowser } from "./browser";
// Cookies
import { getCookies, cookieStatus } from "./cookies";
// Device Type
import { DEVICE_type, DetectDeviceType } from "./DetectDeviceType";
// Do Not Track
import { doNotTrackStatus, getDoNotTrack } from "./doNotTrack";
// Finite Mobile Device Type
import { DEVICE_finiteType, finiteMobileDeviceType, } from "./finiteMobileDeviceType";
// Logical Processors
import { browserSpecificSupportCores, processorCores, } from "./logicalProcessors";
// Max Touch Points
import { maxTouchPoints, getMaxTouchPoints } from "./maxTouchPoints";
// Online Status
import { browserOnlineStatus } from "./online";
// standard UA
import { getCurrentUA, currentUA } from "./getCurrentUA";
// Operating System
import { OS, getOS } from "./operatingSystem";
//SCREEN ORIENTATION
import { DetectScreenOrientation, ORIENTATION_isLandscape, } from "./orientation";
// PDF Viewer
import { PDFviewerStatus } from "./pdf";
// RAM
import { getRam, browserSpecificSupportRAM, browserRam } from "./ram";
// Webdriver
import { robotStatus } from "./webdriver";
// Exports
// Make the functions accessible
export { DetectScreenOrientation, DetectDeviceType, finiteMobileDeviceType, getCurrentUA, getCookies, getDoNotTrack, getBrowser, getRam, browserSpecificSupportRAM, browserSpecificSupportCores, getMaxTouchPoints, getOS };
// As well as the returns on those functions
export { ORIENTATION_isLandscape, DEVICE_type, DEVICE_finiteType, currentUA, cookieStatus, doNotTrackStatus, browser, browserRam, processorCores, maxTouchPoints, browserOnlineStatus, PDFviewerStatus, robotStatus, OS };
