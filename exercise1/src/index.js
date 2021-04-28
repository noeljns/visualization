import "./custom-elements/estimation-prompt";

window.addEventListener("load", () => {
    initUI();
});
let estimationPrompt, canvas;
const STANDARD = 1;
const STANDARD_RADIUS = 20;
const STANDARD_SITE_LENGTH = 30;

function initUI() {
    estimationPrompt = document.getElementById("estimation-prompt");
    canvas = document.getElementById("canvas");
    nextRound("square", 0);
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
