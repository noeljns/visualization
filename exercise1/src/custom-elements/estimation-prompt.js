import "@vaadin/vaadin-button";
import "@vaadin/vaadin-text-field/vaadin-number-field";

const template = document.createElement("template");

template.innerHTML = `
    <style>

    </style>
    <div class="wrapper">
        <h2 id="question"></h2>
        <div id="answer">
            <span id="standard"></span> :
            <vaadin-number-field id="estimation" label="Estimation" step="1" min="1" has-controls required=true>
            </vaadin-number-field>
            <vaadin-button>Submit</vaadin-button>
        </div>
    </div>
    `;

class EstimationPrompt extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.standardText = this.shadowRoot.querySelector("#standard");
        this.questionText = this.shadowRoot.querySelector("#question");
    }

    static get observedAttributes() {
        return ["question", "standard"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "question":
                    this.question = newValue;
                    this.questionText.innerHTML = this.question;
                    break;
                case "standard":
                    this.standard = newValue;
                    this.standardText.innerHTML = this.standard;
                    break;
            }
        }
    }
}

customElements.define("estimation-prompt", EstimationPrompt);
