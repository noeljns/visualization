import "./custom-elements/estimation-prompt";

window.addEventListener("load", () => {
    initUI();
});
let estimationPrompt, shapeSelection, canvas;

function initUI() {
    estimationPrompt = document.getElementById("estimation-prompt");
    shapeSelection = document.getElementById("shape-selection");
    canvas = document.getElementById("canvas");

    //add event listeners
    document.getElementById("circle").addEventListener("click", () => {
        nextRound("circle", 0);
    });
    document.getElementById("square").addEventListener("click", () => {
        nextRound("square", 0);
    });
    document.getElementById("square");
}

function nextRound(shape, round) {
    if (round < data[shape].rounds.length) {
        if (round === 0) {
            shapeSelection.style.display = "none";
            estimationPrompt.style.display = "block";
            canvas.style.display = "block";
        }
        let standard = data[shape].rounds[round].standard;
        let comparison = data[shape].rounds[round].comparison;
        estimationPrompt.setAttribute("standard", standard);
        estimationPrompt.setAttribute("instruction", data[shape].instruction);
        switch (shape) {
            case "circle":
                drawCircles(standard, comparison);
                break;
            case "square":
                drawSquares(standard, comparison);
                break;
        }
    }
}

function drawCircles(standard, comparison) {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
}
function drawSquares() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.rect(150, 150, 50, 50);
    ctx.fillStyle = "green";
    ctx.fill();
}

function calculateX() {}
