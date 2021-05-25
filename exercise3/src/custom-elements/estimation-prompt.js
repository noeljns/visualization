

const template = document.createElement("template");

template.innerHTML = `
    <style>
     .wrapper {
         color: green;
     }
    </style>
    <div class="wrapper">
     Schätzen sie ....
    </div>
  `;

class EstimationPrompt extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define("estimation-prompt", EstimationPrompt);
