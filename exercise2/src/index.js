import "./custom-elements/test-element";
import "./custom-elements/hue-test";
import "./custom-elements/results-table";

window.addEventListener("load", () => {
    initUI();
});

let hueTest, resultsTable;
const STARTING_TIME = 1000;
const MIN_TIME = 125;
let currentTime;
let currentRound = 1;
let currentTestRound = {};
let data = [];

// dummy data
var dummy_data = [
    { options: "colour", distractor_rank: "1", 1000: "true", 500: "true", 250: "true", 125: "true" },
    { options: "colour", distractor_rank: "2", 1000: "true", 500: "true", 250: "false", 125: "false" },
    { options: "colour", distractor_rank: "3", 1000: "true", 500: "false", 250: "false", 125: "false" },
    { options: "closure", distractor_rank: "1", 1000: "true", 500: "true", 250: "true", 125: "true" },
    { options: "closure", distractor_rank: "2", 1000: "true", 500: "false", 250: "false", 125: "false" },
    { options: "closure", distractor_rank: "3", 1000: "true", 500: "false", 250: "false", 125: "false" },
    { options: "colour and closure", distractor_rank: "1", 1000: "true", 500: "true", 250: "false", 125: "false" },
    { options: "colour and closure", distractor_rank: "2", 1000: "false", 500: "true", 250: "false", 125: "false" },
    { options: "colour and closure", distractor_rank: "3", 1000: "false", 500: "false", 250: "false", 125: "true" },
];

function initUI() {
    currentTime = STARTING_TIME;
    hueTest = document.getElementById("hue-test");
    resultsTable = document.getElementById("resultsTable");
    hueTest.setAttribute("time", STARTING_TIME);
    resultsTable.setData(dummy_data);
    hueTest.setAttribute("round", currentRound);
    currentTestRound = { options: "colour", distractor_rank: currentRound };
    hueTest.addEventListener("test-done", nextRound);
    resultsTable.colorTable();
}

function nextRound(evt) {
    currentTestRound[currentTime] = evt.detail.found;
    if (currentTime > MIN_TIME) {
        currentTime = currentTime / 2;
        hueTest.setAttribute("time", currentTime);
        hueTest.startTest();
    } else {
        data.push(currentTestRound);
        console.log(data);
        currentRound++;
        hueTest.setAttribute("round", currentRound);
        currentTime = STARTING_TIME;
        hueTest.setAttribute("time", currentTime);
        hueTest.startTest();
    }
}
