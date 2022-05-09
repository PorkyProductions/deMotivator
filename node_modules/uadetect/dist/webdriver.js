let webdriverControlled = navigator.webdriver;
const getBots = ({ webdriverControlled }) => {
    if (webdriverControlled) {
        return "ROBOT_controlled";
    }
    else {
        return "HUMAN_controlled";
    }
};
let robotStatus = getBots({ webdriverControlled });
export { robotStatus };
