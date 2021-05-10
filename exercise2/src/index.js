import "./custom-elements/test-element";
import "./custom-elements/hue-test";
import "./custom-elements/closure-test";
import "./custom-elements/intersection-test";
import "./custom-elements/results-table";

window.addEventListener("load", () => {
    initUI();
});

const STARTING_TIME = 1000;
const MIN_TIME = 125;
const EXPERIMENTS = [
    { element: "hue-test", name: "Farbe", instruction: "Wo ist der rote Kreis?" },
    { element: "closure-test", name: "Geschlossenheit", instruction: "Wo ist der geschlossene Ring?" },
    { element: "intersection-test", name: "Kreuzung", instruction: "Wo ist das Kreuz?" },
];
let experimentContainer, resultsTable;
let currentExperiment = 0;
let currentTime = STARTING_TIME;
let currentRound = 1;
let currentTestElement = {};
let currentTestRound = {};
let data = [];

// dummy data
let dummy_data = [
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
    experimentContainer = document.getElementById("experimentContainer");
    resultsTable = document.getElementById("resultsTable");
    startNewExperiment(EXPERIMENTS[currentExperiment]);
}

function startNewExperiment(experiment) {
    currentTime = STARTING_TIME;
    currentRound = 1;
    while (experimentContainer.firstChild) {
        experimentContainer.removeChild(experimentContainer.firstChild);
    }
    currentTestElement = document.createElement(experiment.element);
    currentTestElement.setAttribute("time", currentTime);
    currentTestElement.setAttribute("round", currentRound);
    currentTestElement.setAttribute("instruction", experiment.instruction);
    currentTestElement.addEventListener("test-done", nextRound);
    experimentContainer.appendChild(currentTestElement);
    currentTestRound = { options: experiment.name, distractor_rank: currentRound };
}

function nextRound(evt) {
    currentTestRound[currentTime] = evt.detail.found;
    if (currentTime > MIN_TIME) {
        currentTime = currentTime / 2;
        currentTestElement.setAttribute("time", currentTime);
        currentTestElement.startTest();
    } else if (currentRound === 3) {
        data.push(currentTestRound);
        if (currentExperiment < EXPERIMENTS.length - 1) {
            currentExperiment++;
            currentRound = 1;
            currentTestRound = { options: EXPERIMENTS[currentExperiment].name, distractor_rank: currentRound };
            startNewExperiment(EXPERIMENTS[currentExperiment]);
        } else {
            resultsTable.parentNode.style.display = "block";
            experimentContainer.style.display = "none";
            resultsTable.setData(data);
            resultsTable.colorTable();
        }
    } else {
        data.push(currentTestRound);
        console.log(data);
        currentRound++;
        currentTestRound = { options: EXPERIMENTS[currentExperiment].name, distractor_rank: currentRound };
        currentTestElement.setAttribute("round", currentRound);
        currentTime = STARTING_TIME;
        currentTestElement.setAttribute("time", currentTime);
        currentTestElement.startTest();
    }
}
