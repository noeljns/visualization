const template = document.createElement("template");

template.innerHTML = `
    <style>
    #canvas {
        background-color: green;
        display: none;
    }
    #roundDisplay {
        margin-left: 420px;
    }
    </style>
    <div class="wrapper">
        <div><span id="timeDisplay"></span><span id="roundDisplay"></span></div>

        <test-element id="test-element"></test-element>
    </div>
    `;

import "./test-element";

class HueTest extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.timeDisplay = this.shadowRoot.querySelector("#timeDisplay");
        this.roundDisplay = this.shadowRoot.querySelector("#roundDisplay");

        this.testElement = this.shadowRoot.querySelector("#test-element");
        this.testElement.addEventListener("start-test", this.startTest.bind(this));
    }

    static get observedAttributes() {
        return ["instruction", "time", "round"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "instruction":
                    this.instruction = newValue;
                    this.testElement.setAttribute("instruction", this.instruction);
                    break;
                case "time":
                    this.time = newValue;
                    this.timeDisplay.innerHTML = "Zeit: " + this.time + "ms";
                    break;
                case "round":
                    this.round = newValue;
                    this.roundDisplay.innerHTML = "Runde: " + this.round;
                    break;
            }
        }
    }

    startTest() {
        console.log("here");
        this.testElement.showCanvas(this.time);
    }
}

customElements.define("hue-test", HueTest);
