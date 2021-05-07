import "@vaadin/vaadin-grid";
const template = document.createElement("template");

template.innerHTML = `
    <style>

    </style>
    <div class="wrapper">
        Results Table
        <div id="table"></div>
        <vaadin-grid></vaadin-grid>
    </div>
    `;

class ResultsTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.table = this.shadowRoot.querySelector("#table");
    }

    setData(results) {
        this.data = results;
    }

    showTable() {
        this.table.innerHTML = "this is the table";
        this.table.innerHTML += " " + this.data[0].options[0];
    }
}

customElements.define("results-table", ResultsTable);
