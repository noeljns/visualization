import "./custom-elements/estimation-prompt";

window.addEventListener("load", () => {
    initUI();
    initResults();
    startEstimation();
});
let estimationPrompt, circleRound, squareRound, currentShape;
let results = [];
const STANDARD = 1;
const STANDARD_RADIUS = 20;
const STANDARD_SITE_LENGTH = 30;
const data = {
    instructions: {
        circle: "Schätzen Sie das Verhältnis der beiden Kreise.",
        square: "Schätzen Sie das Verhältnis der beiden Quadrate.",
    },
    rounds: [2, 10, 3, 8, 5],
};

function initUI() {
    estimationPrompt = document.getElementById("estimation-prompt");
    estimationPrompt.addEventListener("next-clicked", nextButtonClicked);
}

function initResults() {
    for (let i = 0; i < data.rounds.length; i++) {
        results[i] = { group: `1 zu ${data.rounds[i]}` };
    }
}

function nextButtonClicked(evt) {
    let currentRound = currentShape === "circle" ? circleRound : squareRound;
    results[currentRound][currentShape] = calculateX(1 / evt.detail.estimation, 1 / data.rounds[currentRound]);

    switch (currentShape) {
        case "circle":
            circleRound++;
            currentShape = "square";
            nextRound(currentShape, squareRound);
            break;
        case "square":
            if (squareRound > 0) {
                squareRound--;
                currentShape = "circle";
                nextRound(currentShape, circleRound);
            } else {
                drawBarplot(results);
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

function calculateX(estimatedProportion, actualProportion) {
    return Math.log10(estimatedProportion) / Math.log10(actualProportion);
}

function drawBarplot(data) {
    document.getElementById("estimation-container").style.display = "none";
    document.getElementById("barplot-container").style.display = "block";
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 40, left: 50 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
        .select("#barplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // list of the two subgroups circle and square
    var subgroups = ["circle", "square"];

    // list of the different proportions displayed on the x axis
    var groups = d3
        .map(data, function (d) {
            return d.group;
        })
        .keys();

    // add x axis
    var x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0));
    // add label on x axis
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + 20)
        .attr("y", height + 40)
        .text("Verhältnis");

    // add y axis
    var y = d3.scaleLinear().domain([0, 6]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));
    // add label on y axis
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -155)
        .attr("y", -45)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("x Wert");

    // another scale for subgroup position
    var xSubgroup = d3.scaleBand().domain(subgroups).range([0, x.bandwidth()]).padding([0.05]);

    // color palette with one color per subgroup
    var color = d3.scaleOrdinal().domain(subgroups).range(["#e41a1c", "#4daf4a"]);

    // display the bars
    svg.append("g")
        .selectAll("g")
        // enter in data by loop group per group
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d) {
            return "translate(" + x(d.group) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
            return subgroups.map(function (key) {
                return { key: key, value: d[key] };
            });
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return xSubgroup(d.key);
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .attr("fill", function (d) {
            return color(d.key);
        });

    // legend
    var label = ["Kreise", "Quadrate"];

    var legend = svg
        .selectAll(".legend")
        .data(label.slice())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend
        .append("rect")
        .attr("x", width - 60)
        .attr("y", 19)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend
        .append("text")
        .attr("x", width - 40)
        .attr("y", 27)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function (d) {
            return d;
        });
}
