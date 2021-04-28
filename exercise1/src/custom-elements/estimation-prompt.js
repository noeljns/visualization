import "@vaadin/vaadin-button";
import "@vaadin/vaadin-text-field/vaadin-number-field";

const template = document.createElement("template");

template.innerHTML = `
    <style>

    </style>
    <div class="wrapper">
        <h2 id="instruction"></h2>
        <div id="answer">
            <span id="standard"></span> :
            <vaadin-number-field id="estimation" label="Verhältnis" step="1" min="1" has-controls required=true>
            </vaadin-number-field>
            <vaadin-button id="next">Nächste</vaadin-button>
        </div>
    </div>
    `;

class EstimationPrompt extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.standardText = this.shadowRoot.querySelector("#standard");
        this.instructionText = this.shadowRoot.querySelector("#instruction");
        this.estimationField = this.shadowRoot.querySelector("#estimation");
        this.shadowRoot.querySelector("#next").addEventListener("click", () => this.nextButtonClicked());
    }

    static get observedAttributes() {
        return ["instruction", "standard"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "instruction":
                    this.instruction = newValue;
                    this.instructionText.innerHTML = this.instruction;
                    this.estimationField.value = 1;
                    break;
                case "standard":
                    this.standard = newValue;
                    this.standardText.innerHTML = this.standard;
                    this.estimationField.value = 1;
                    break;
            }
        }
    }

    nextButtonClicked() {
        if (!this.estimationField.invalid) {
            this.dispatchEvent(new CustomEvent("next-clicked", { detail: { estimation: this.estimationField.value } }));
        }
    }
}

customElements.define("estimation-prompt", EstimationPrompt);
