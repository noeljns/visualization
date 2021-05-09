import "@vaadin/vaadin-grid";
const template = document.createElement("template");

template.innerHTML = `
    <style>
    </style>

    <div class="wrapper">
        Results Table
        <vaadin-grid id="table">
            <vaadin-grid-column></vaadin-grid-column>
            <vaadin-grid-column></vaadin-grid-column>
            <vaadin-grid-column></vaadin-grid-column>
            <vaadin-grid-column></vaadin-grid-column>
        </vaadin-grid>
    </div>
    `;

class ResultsTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.table = this.shadowRoot.querySelector("#table");
    }

    setData(measurements) {
        this.results = this.getResultObjects(measurements);
        //TODO: before setting the data for the table it has to be grouped and brought in the right format for the table since we decided to display the data differently.
        this.table.items = this.results;
        const columns = this.table.querySelectorAll("vaadin-grid-column");

        columns[0].headerRenderer = function (root) {
            root.textContent = "1000ms";
        };
        columns[0].renderer = function (root, column, model) {
            root.textContent = model.item.found;
        };

        columns[1].headerRenderer = function (root) {
            root.textContent = "500ms";
        };
        columns[1].renderer = function (root, column, model) {
            root.textContent = model.item.found;
        };
        console.log(this.results);
    }

    getResultObjects(data) {
        var array = [];

        for (const ele of data) {
            const result = new Result(ele.options, ele.time, ele.distractor_rank, ele.found);
            array.push(result);
        }
        return array;
    }
}

customElements.define("results-table", ResultsTable);

class Result {
    constructor(options, time, distractor_rank, found) {
        this.options = options;
        this.time = time;
        this.distractor_rank = distractor_rank;
        this.found = found;
    }
}
