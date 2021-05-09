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

// dummy data
var dummy_data = [
    {'options': 'colour', 'distractor_rank': '1', 'longest': 'true', 'long': 'true', 'short': 'true', 'shortest': 'true'},
    {'options': 'colour', 'distractor_rank': '2', 'longest': 'true', 'long': 'true', 'short': 'false', 'shortest': 'false'},
    {'options': 'colour', 'distractor_rank': '3', 'longest': 'true', 'long': 'false', 'short': 'false', 'shortest': 'false'},
    {'options': 'closure', 'distractor_rank': '1', 'longest': 'true', 'long': 'true', 'short': 'true', 'shortest': 'true'},
    {'options': 'closure', 'distractor_rank': '2', 'longest': 'true', 'long': 'false', 'short': 'false', 'shortest': 'false'},
    {'options': 'closure', 'distractor_rank': '3', 'longest': 'true', 'long': 'false', 'short': 'false', 'shortest': 'false'},
    {'options': 'colour and closure', 'distractor_rank': '1', 'longest': 'true', 'long': 'true', 'short': 'false', 'shortest': 'false'},
    {'options': 'colour and closure', 'distractor_rank': '2', 'longest': 'false', 'long': 'true', 'short': 'false', 'shortest': 'false'},
    {'options': 'colour and closure', 'distractor_rank': '3', 'longest': 'false', 'long': 'false', 'short': 'false', 'shortest': 'false'}
];

function initUI() {
    currentTime = STARTING_TIME;
    hueTest = document.getElementById("hue-test");
    resultsTable = document.getElementById("resultsTable");
    hueTest.setAttribute("time", STARTING_TIME);
    resultsTable.setData(dummy_data);
    hueTest.setAttribute("round", currentRound);
    hueTest.addEventListener("test-done", nextRound);
    resultsTable.showTable();
}

function nextRound(evt) {
    if (evt.detail.found) {
        if (currentTime > MIN_TIME) {
            currentTime = currentTime / 2;
            hueTest.setAttribute("time", currentTime);
            hueTest.startTest();
        } else {
            currentRound++;
            hueTest.setAttribute("round", currentRound);
            currentTime = STARTING_TIME;
            hueTest.setAttribute("time", currentTime);
            hueTest.startTest();
        }
    }
}