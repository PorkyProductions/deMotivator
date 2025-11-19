import { getCurrentUA } from 'uadetect'
import sb from '../utils/supportedBrowsers'
const ua = getCurrentUA()
if (!sb.test(ua)) { 
    alert("Your browser is too old to use (de)Motivator. Please upgrade your browser and try again."); 
    window.location.href = "https://www.mozilla.org/en-US/firefox/new/"
}