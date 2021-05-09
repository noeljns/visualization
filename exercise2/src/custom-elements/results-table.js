import "@vaadin/vaadin-grid";
const template = document.createElement("template");

template.innerHTML = `
<dom-module id="my-grid-styles" theme-for="vaadin-grid">
<template>
  <style>
    [part~="body-cell"].green {
      background: rgb(230, 245, 226);
    }

    [part~="body-cell"].red {
      background: rgb(255, 240, 240);
    }

  </style>
</template>
</dom-module>

    <style>
    </style>

    <div class="wrapper">
        Results Table
        <vaadin-grid id="table">
            <vaadin-grid-column width="170px"></vaadin-grid-column>
            <vaadin-grid-column width="160px"></vaadin-grid-column>
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

    setData(results) {
        this.table.items = results;

        const columns = this.table.querySelectorAll("vaadin-grid-column");

        columns[0].headerRenderer = function (root) {
            root.textContent = "Eigenschaften";
        };
        columns[0].renderer = function (root, column, model) {
            root.textContent = model.item.options;
        };

        columns[1].headerRenderer = function (root) {
            root.textContent = "Distraktoren Stufe";
        };
        columns[1].renderer = function (root, column, model) {
            root.textContent = model.item.distractor_rank;
        };

        columns[2].headerRenderer = function (root) {
            root.textContent = "1000 ms";
        };
        columns[2].renderer = function (root, column, model) {
            root.textContent = model.item.longest;
        };

        columns[3].headerRenderer = function (root) {
            root.textContent = "500 ms";
        };
        columns[3].renderer = function (root, column, model) {
            root.textContent = model.item.long;
        };

        columns[4].headerRenderer = function (root) {
            root.textContent = "250 ms";
        };
        columns[4].renderer = function (root, column, model) {
            root.textContent = model.item.short;
        };

        columns[5].headerRenderer = function (root) {
            root.textContent = "125 ms";
        };
        columns[5].renderer = function (root, column, model) {
            root.textContent = model.item.shortest;
        };
    }

    colorTable() {
        this.table.cellClassNameGenerator = function(column, model) {
            let classes = model.item.longest == 'true' ? 'green' : 'red';
            return classes;
        }

    }
}

customElements.define("results-table", ResultsTable);