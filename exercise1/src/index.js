import "./custom-elements/estimation-prompt";

window.addEventListener("load", () => {
    initUI();
    startEstimation();
});
let estimationPrompt, canvas, circleRound, squareRound, currentShape;
const STANDARD = 1;
const STANDARD_RADIUS = 20;
const STANDARD_SITE_LENGTH = 30;

function initUI() {
    estimationPrompt = document.getElementById("estimation-prompt");
    estimationPrompt.addEventListener("next-clicked", nextButtonClicked);
}

function nextButtonClicked(evt) {
    console.log(
        `${currentShape} verhältnis 1:${
            currentShape === "circle" ? data.rounds[circleRound] : data.rounds[squareRound]
        }`
    );
    console.log("Schätzung 1:" + evt.detail.estimation);
    switch (currentShape) {
        case "circle":
            if (circleRound < data.rounds.length - 1) {
                circleRound++;
                currentShape = "square";
                nextRound(currentShape, squareRound);
            } else {
                console.log("Auswertung");
            }
            break;
        case "square":
            if (squareRound > 0) {
                squareRound--;
                currentShape = "circle";
                nextRound(currentShape, circleRound);
            } else {
                console.log("Auswertung");
            }
            break;
    }
}

function startEstimation() {
    circleRound = 0;
    squareRound = data.rounds.length - 1;
    currentShape = "circle";
    nextRound(currentShape, circleRound);
}

function nextRound(shape, round) {
    if (round < data.rounds.length) {
        let comparison = data.rounds[round];
        estimationPrompt.setAttribute("standard", STANDARD);
        estimationPrompt.setAttribute("instruction", data.instructions[shape]);
        switch (shape) {
            case "circle":
                drawCircles(comparison);
                break;
            case "square":
                drawSquares(comparison);
                break;
        }
    }
}

function drawCircles(comparison) {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.arc(40, 120, STANDARD_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
    let radius = Math.sqrt(comparison) * STANDARD_RADIUS;
    ctx.beginPath();
    ctx.arc(80 + radius, 120, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
}
function drawSquares(comparison) {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.rect(40, 60, STANDARD_SITE_LENGTH, STANDARD_SITE_LENGTH);
    ctx.fillStyle = "green";
    ctx.fill();
    let siteLength = Math.sqrt(comparison) * STANDARD_SITE_LENGTH;
    ctx.beginPath();
    ctx.rect(80, 60, siteLength, siteLength);
    ctx.fillStyle = "green";
    ctx.fill();
}

function calculateX() {}
