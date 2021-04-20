import "./custom-elements/estimation-prompt";

window.addEventListener("load", () => {
    initUI();
});

function initUI() {
    //add event listeners
    //set data for prompts
    //show and hide prompt and result elements
    drawCircles();
    drawSquares();
}

function drawCircles() {
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
