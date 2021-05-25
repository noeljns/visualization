import axios from "axios";
import "./custom-elements/estimation-prompt";

window.addEventListener("load", () => {
    initUI();
});

function initUI() {
    axios
        .get("res/cars.txt")
        .then((res) => {
            var parsedString = res.data.split("\n").map((item) => {
                var tabs = item.split("\t");
                return {
                    car: tabs[0],
                    manufacturer: tabs[1],
                    mpg: tabs[2],
                    cylinders: tabs[3],
                    displacement: tabs[4],
                    horesepower: tabs[5],
                    weight: tabs[6],
                    acceleration: tabs[7],
                    year: tabs[8],
                    origin: tabs[9],
                };
            });
            console.log(parsedString);
            let manufacturers = parsedString.map((el) => el.manufacturer).sort();
            console.log(manufacturers);
        })
        .then(() => {
            // always executed
        });
}
