import "./custom-elements/test-element";
import "./custom-elements/hue-test";

window.addEventListener("load", () => {
    initUI();
});

let hueTest;
const STARTING_TIME = 1000;

function initUI() {
    hueTest = document.getElementById("hue-test");
    hueTest.setAttribute("time", STARTING_TIME);
    hueTest.setAttribute("round", 1);
}
