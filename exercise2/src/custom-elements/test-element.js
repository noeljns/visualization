const template = document.createElement("template");

template.innerHTML = `
    <style>
     .wrapper {
         color: green;
     }
    </style>
  <div class="wrapper">
        <h2 id="instruction"></h2>
    </div>
  `;

class TestElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.instructionText = this.shadowRoot.querySelector("#instruction");
    }

    static get observedAttributes() {
        return ["instruction"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "instruction":
                    this.instruction = newValue;
                    this.instructionText.innerHTML = this.instruction;
                    break;
            }
        }
    }
    getPositionOfDistractors(quantity) {}
}

customElements.define("test-element", TestElement);
