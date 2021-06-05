import axios from "axios";
import "@vaadin/vaadin-combo-box";
import "./custom-elements/origin-checkboxes";
import "./custom-elements/manufacturers-checkboxes";

window.addEventListener("load", () => {
    initUI();
});
let selectedGlobal = "origin";
let selectedOrigins = ["European", "Japanese", "American"];
let selectedManufacturers = ["audi"];

function initUI() {
    let comboGlobal = document.getElementById("combo-global");
    comboGlobal.items = ["origin", "manufacturer"];
    let comboX = document.getElementById("combo-x");
    comboX.items = ["mpg", "cylinders", "displacement", "weight", "acceleration", "year"];
    let comboY = document.getElementById("combo-y");
    comboY.items = ["mpg", "cylinders", "displacement", "horsepower", "weight", "acceleration"];

    let scatterPlot, carsData;
    let selectedX = "year";
    let selectedY = "horsepower";

    let originCheckboxes = document.getElementById("originCheckboxes");
    originCheckboxes.addEventListener("origin-changed", (evt) => {
        selectedOrigins = evt.detail.selectedOrigins;
        updateScatterPlot(selectedX, selectedY, carsData, scatterPlot);
    });

    let manufacturerCheckboxes = document.getElementById("manufacturerCheckboxes");
    manufacturerCheckboxes.addEventListener("manufacturer-changed", (evt) => {
        selectedManufacturers = evt.detail.selectedManufacturers;
        updateScatterPlot(selectedX, selectedY, carsData, scatterPlot);
    });

    showSelectedGlobalCheckboxes(originCheckboxes, manufacturerCheckboxes);
    
    comboGlobal.addEventListener("selected-item-changed", (evt) => {
        selectedGlobal = evt.detail.value;
        showSelectedGlobalCheckboxes(originCheckboxes, manufacturerCheckboxes);
        updateScatterPlot(selectedX, selectedY, carsData, scatterPlot);
    });

    axios
        .get("res/cars.txt")
        .then(async (res) => {
            carsData = res.data
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
            let origins = carsData.map((el) => el.origin).sort();
            console.log(origins);
            scatterPlot = await showScatterPlot(carsData, selectedX, selectedY);
        })
        .then(() => {
            // always executed
        });

    comboX.addEventListener("selected-item-changed", (evt) => {
        var previouslySelectedX = selectedX;
        selectedX = evt.detail.value;
        updateScatterPlot(selectedX, selectedY, carsData, scatterPlot);
        updateComboboxItems("combo-y", previouslySelectedX, selectedX);
    });
    comboY.addEventListener("selected-item-changed", (evt) => {
        var previouslySelectedY = selectedY;
        selectedY = evt.detail.value;
        updateScatterPlot(selectedX, selectedY, carsData, scatterPlot);
        updateComboboxItems("combo-x", previouslySelectedY, selectedY);
    });
}

function showSelectedGlobalCheckboxes(originCheckboxes, manufacturerCheckboxes) {
    if(selectedGlobal == "origin") {
        originCheckboxes.style.display = "block";
        manufacturerCheckboxes.style.display = "none";
    }
    else {
        originCheckboxes.style.display = "none";
        manufacturerCheckboxes.style.display = "block";      
    }
}

function updateComboboxItems(tagNameOfOtherBox, previouslySelected, selected) {
    let combobox = document.getElementById(tagNameOfOtherBox);
    combobox.items.push(previouslySelected);
    combobox.items = combobox.items.filter((item) => item !== selected);
}

function updateScatterPlot(selectedX, selectedY, carsData, scatterPlot) {
    let { x, y, width, height, svg, cars } = scatterPlot;
    var t = d3.transition().duration(750).ease(d3.easeLinear);

    let { rangeX, rangeY } = getRange(selectedX, selectedY, carsData);
    x.domain([rangeX.min, rangeX.max]).range([0, width]);
    y.domain([rangeY.min, rangeY.max]).range([height, 0]);

    svg.select(".x.axis").transition(t).call(d3.axisBottom(x));
    svg.select(".y.axis").transition(t).call(d3.axisLeft(y));

    cars.transition(t)
        .attr("x", (d) => x(d[selectedX]) - 10)
        .attr("y", (d) => y(d[selectedY]) - 10)
        .attr("display", (d) => {
            if (selectedGlobal === "origin") {
                return selectedOrigins.indexOf(d.origin) >= 0 ? "block" : "none";
            } else if (selectedGlobal === "manufacturer") {
                return selectedManufacturers.indexOf(d.manufacturer) >= 0 ? "block" : "none";
            }
        });
}

async function showScatterPlot(carsData, selectedX, selectedY) {
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

    let { rangeX, rangeY } = getRange(selectedX, selectedY, carsData);

    // Add X axis
    var x = d3.scaleLinear().domain([rangeX.min, rangeX.max]).range([0, width]);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear().domain([rangeY.min, rangeY.max]).range([height, 0]);
    svg.append("g").attr("class", "y axis").call(d3.axisLeft(y));

    let carSvg = await d3.xml("./res/car.svg");
    let cars = svg
        .append("svg")
        .selectAll("div")
        .data(carsData)
        .enter()
        .append(() => carSvg.documentElement.cloneNode(true))
        .attr("xlink:href", "./res/car.svg")
        .attr("x", (d) => x(d[selectedX]) - 10)
        .attr("y", (d) => y(d[selectedY]) - 10)
        .attr("class", "cars")
        .attr("width", 20)
        .attr("height", 20)
        .attr("opacity", 0.2)
        .style("fill", getColorForCar);

    return { x, y, width, height, svg, cars };
}

function getColorForCar(car) {
    let colors = { origin: { European: "blue", Japanese: "red", American: "green" }, manufacturer: { amc: "brown", audi: "yellow", bmw: "#0f854b", buick: "#0f854b", cadillac: "#0f854b", capri: "#0f854b", chevrolet: "#0f854b", chrysler: "#0f854b", citroen: "#0f854b", datsun: "#0f854b", dodge: "#0f854b", fiat: "#0f854b", ford: "#0f854b", hi: "#0f854b", honda: "#0f854b", mazda: "#0f854b", mercedes: "#0f854b", mercury: "#0f854b", nissan: "#0f854b", oldsmobile: "#0f854b", peugot: "#0f854b", plymouth: "#0f854b", pontiac: "#0f854b", renault: "#0f854b", saat: "#0f854b", subaru: "#0f854b", toyota: "#0f854b", triumph: "#0f854b", volvo: "#0f854b", vw: "#0f854b"}};
    return colors[selectedGlobal][selectedGlobal === "origin" ? car.origin : car.manufacturer];
}

function getRange(selectedX, selectedY, carsData) {
    let rangeX = { min: carsData[0][selectedX], max: carsData[0][selectedX] };
    let rangeY = { min: carsData[0][selectedY], max: carsData[0][selectedY] };
    let padding = { year: 1, horsepower: 10, mpg: 10, cylinders: 1, displacement: 10, weight: 100, acceleration: 10 };
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
    return { rangeX, rangeY };
}
