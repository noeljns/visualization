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
    {options: ["colour"], time: 1000, distractor_rank: 1, found: true},
    {options: ["colour"], time: 500, distractor_rank: 1, found: true},
    {options: ["colour"], time: 250, distractor_rank: 1, found: true},
    {options: ["colour"], time: 125, distractor_rank: 1, found: true},
    {options: ["colour"], time: 1000, distractor_rank: 2, found: true},
    {options: ["colour",], time: 500, distractor_rank: 2, found: true},
    {options: ["colour"], time: 250, distractor_rank: 2, found: true},
    {options: ["colour"], time: 125, distractor_rank: 2, found: false},
    {options: ["colour"], time: 1000, distractor_rank: 3, found: true},
    {options: ["colour"], time: 500, distractor_rank: 3, found: true},
    {options: ["colour"], time: 250, distractor_rank: 3, found: false},
    {options: ["colour"], time: 125, distractor_rank: 3, found: false},
    {options: ["closure"], time: 1000, distractor_rank: 1, found: true},
    {options: ["closure"], time: 500, distractor_rank: 1, found: true},
    {options: ["closure"], time: 250, distractor_rank: 1, found: true},
    {options: ["closure"], time: 125, distractor_rank: 1, found: false},
    {options: ["closure"], time: 1000, distractor_rank: 2, found: true},
    {options: ["closure",], time: 500, distractor_rank: 2, found: true},
    {options: ["closure"], time: 250, distractor_rank: 2, found: false},
    {options: ["closure"], time: 125, distractor_rank: 2, found: false},
    {options: ["closure"], time: 1000, distractor_rank: 3, found: true},
    {options: ["closure"], time: 500, distractor_rank: 3, found: false},
    {options: ["closure"], time: 250, distractor_rank: 3, found: false},
    {options: ["closure"], time: 125, distractor_rank: 3, found: false},
    {options: ["colour", "closure"], time: 1000, distractor_rank: 1, found: true},
    {options: ["colour", "closure"], time: 500, distractor_rank: 1, found: true},
    {options: ["colour", "closure"], time: 250, distractor_rank: 1, found: false},
    {options: ["colour", "closure"], time: 125, distractor_rank: 1, found: true},
    {options: ["colour", "closure"], time: 1000, distractor_rank: 2, found: true},
    {options: ["colour", "closure"], time: 500, distractor_rank: 2, found: false},
    {options: ["colour", "closure"], time: 250, distractor_rank: 2, found: false},
    {options: ["colour", "closure"], time: 125, distractor_rank: 2, found: true},
    {options: ["colour", "closure"], time: 1000, distractor_rank: 3, found: true},
    {options: ["colour", "closure"], time: 500, distractor_rank: 3, found: false},
    {options: ["colour", "closure"], time: 250, distractor_rank: 3, found: false},
    {options: ["colour", "closure"], time: 125, distractor_rank: 3, found: false}
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
