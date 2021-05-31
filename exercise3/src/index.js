import axios from "axios";

window.addEventListener("load", () => {
    initUI();
});

function initUI() {
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
            showScatterPlot(carsData);
        })
        .then(() => {
            // always executed
        });
}

function showScatterPlot(carsData) {
    let margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3
        .select("#scatter-plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let rangeX = { min: carsData[0].year, max: carsData[0].year };
    let rangeY = { min: carsData[0].horsepower, max: carsData[0].horsepower };
    let padding = { year: 1, horsepower: 10 };
    carsData.forEach((car, index) => {
        if (car.year < rangeX.min) rangeX.min = car.year;
        if (car.year > rangeX.max) rangeX.max = car.year;
        if (car.horsepower < rangeY.min) rangeY.min = car.horsepower;
        if (car.horsepower > rangeY.max) rangeY.max = car.horsepower;
    });
    rangeX.min -= padding.year;
    rangeX.max += padding.year;
    rangeY.min -= padding.horsepower;
    rangeY.max += padding.horsepower;
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
        .selectAll("dot")
        .data(carsData)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.year))
        .attr("cy", (d) => y(d.horsepower))
        .attr("r", 1.5)
        .style("fill", "#69b3a2");
}
