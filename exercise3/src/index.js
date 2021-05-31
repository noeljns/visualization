import axios from "axios";
import "@vaadin/vaadin-combo-box";

window.addEventListener("load", () => {
    initUI();
});

function initUI() {
    let comboX = document.getElementById("combo-x");
    comboX.items = ["mpg", "cylinders", "displacement", "horsepower", "weight", "acceleration", "year"];
    let comboY = document.getElementById("combo-y");
    comboY.items = ["mpg", "cylinders", "displacement", "horsepower", "weight", "acceleration", "year"];

    // parse and filter input file
    axios
        .get("res/cars.txt")
        .then((res) => {
            var carsData = res.data
                .split("\n")
                .filter((item) => (item.indexOf("NA") >= 0 || item.indexOf("Manufacturer") >= 0 ? false : true))
                .map((item) => {
                    var tabs = item.split("\t");
                    return {
                        car: tabs[0],
                        manufacturer: tabs[1],
                        mpg: parseFloat(tabs[2]),
                        cylinders: parseInt(tabs[3]),
                        displacement: parseFloat(tabs[4]),
                        horsepower: parseInt(tabs[5]),
                        weight: parseInt(tabs[6]),
                        acceleration: parseFloat(tabs[7]),
                        year: parseInt(tabs[8]),
                        origin: tabs[9].replace("\r", ""),
                    };
                });
            console.log(carsData);
            let manufacturers = carsData.map((el) => el.origin).sort();
            console.log(manufacturers);
            showScatterPlot(carsData, selectedX, selectedY);
        })
        .then(() => {
            // always executed
        });

        var selectedX = "year";
        var selectedY = "horsepower";

        comboX.addEventListener("selected-item-changed", (evt) => {
            // FIXME selectedX = evt.detail.value;
        });
}

function showScatterPlot(carsData, selectedX, selectedY) {
    let margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 800 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3
        .select("#scatter-plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let rangeX = { min: carsData[0][selectedX], max: carsData[0][selectedX] };
    let rangeY = { min: carsData[0][selectedY], max: carsData[0][selectedY] };
    let padding = { year: 1, horsepower: 10, mpg: 10, cylinders: 1, displacement: 10, weight: 10, acceleration: 10};
    carsData.forEach((car) => {
        if (car[selectedX] < rangeX.min) rangeX.min = car[selectedX];
        if (car[selectedX] > rangeX.max) rangeX.max = car[selectedX];
        if (car[selectedY] < rangeY.min) rangeY.min = car[selectedY];
        if (car[selectedY] > rangeY.max) rangeY.max = car[selectedY];
    });
    rangeX.min -= padding[selectedX];
    rangeX.max += padding[selectedX];
    rangeY.min -= padding[selectedY];
    rangeY.max += padding[selectedY];
    console.log(rangeX.min + "    " + rangeX.max);
    console.log(rangeY.min + "    " + rangeY.max);

    // Add X axis
    var x = d3.scaleLinear().domain([rangeX.min, rangeX.max]).range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear().domain([rangeY.min, rangeY.max]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add dots
    svg.append("g")
        .selectAll("image")
        .data(carsData)
        .enter()
        .append("svg:image")
        .attr("xlink:href", "./res/car.png")
        .attr("x", (d) => x(d[selectedX]))
        .attr("y", (d) => y(d[selectedY]))
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", "#69b3a2");
}
