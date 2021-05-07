import "@vaadin/vaadin-grid";
const template = document.createElement("template");

template.innerHTML = `
    <style>

    </style>
    
    <div class="wrapper">
        Results Table
        <vaadin-grid id="table">
            <vaadin-grid-column path="item.time" header="Zeit in ms"></vaadin-grid-column>
        </vaadin-grid>
    </div>

    <script>
        customElements.whenDefined('vaadin-grid').then(function) {
            document.querySelector('vaadin-grid').items = this.results
        });
    </script>
    `;

class ResultsTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.table = this.shadowRoot.querySelector("#table");
    }

    setData(measurements) {
        this.data = measurements;

        this.results = this.getResultObjects();
        console.log("hm")
        console.log(this.results)
    }

    getResultObjects() {
        var array = []

        for (const ele of this.data) {
            const result = new Result(ele.options, ele.time, ele.distractor_rank, ele.found);
            array.push(result);    
        }
        return array;
    }

    showTable() {
        this.table.innerHTML = "this is the table";
        this.table.innerHTML += " " + this.data[0].options[0];
    }
}

customElements.define("results-table", ResultsTable);


class Result {
    constructor(options, time, distractor_rank, found) {
        this.options = options;
        this.time = time;
        this.distractor_rank = distractor_rank
        this.found = found;
    }
}