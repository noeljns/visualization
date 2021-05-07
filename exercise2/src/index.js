import "./custom-elements/test-element";
import "./custom-elements/hue-test";
import "./custom-elements/results-table";

window.addEventListener("load", () => {
    initUI();
});

let hueTest, resultsTable;
const STARTING_TIME = 1000;

function initUI() {
    hueTest = document.getElementById("hue-test");
    resultsTable = document.getElementById("resultsTable");
    hueTest.setAttribute("time", STARTING_TIME);
    hueTest.setAttribute("round", 1);
    resultsTable.showTable();
    resultsTable.setAttribute("data", ["test", "123"]);
}
