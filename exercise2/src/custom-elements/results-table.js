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

    static get observedAttributes() {
        return ["data"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "data":
                    this.data = newValue;
                    this.table.innerHTML += " " + this.data.toString();
                    break;
            }
        }
    }

    showTable() {
        this.table.innerHTML = "this is the table";
    }
}

customElements.define("results-table", ResultsTable);
