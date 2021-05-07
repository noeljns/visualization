import "./custom-elements/test-element";
import "./custom-elements/hue-test";
import "./custom-elements/results-table";

window.addEventListener("load", () => {
    initUI();
});

let hueTest, resultsTable;
const STARTING_TIME = 1000;

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
    hueTest = document.getElementById("hue-test");
    resultsTable = document.getElementById("resultsTable");
    hueTest.setAttribute("time", STARTING_TIME);
    hueTest.setAttribute("round", 1);
    resultsTable.setData(dummy_data);
    resultsTable.showTable();
}
