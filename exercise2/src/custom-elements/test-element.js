import "@vaadin/vaadin-button";

const template = document.createElement("template");

template.innerHTML = `
    <style>
    #canvas {
        background-color: green;
        display: none;
    }
    #evaluation{
        display: none;
        align-items: center;
        justify-content: center;
    }
    #positionButtons {
        display: grid;
        grid-template-columns: auto auto;
        margin-left: 100px;
    }
    .evaluationBtn {
        margin-left: 10px;
    }
    </style>
    <div class="wrapper">
        <h2 id="instruction"></h2>
        <canvas id="canvas"></canvas>
        <vaadin-button id="startBtn">Start</vaadin-button>
        <div id="evaluation">
            <vaadin-button id="notSeen" class="evaluationBtn">Nicht gesehen</vaadin-button>
            <div id="positionButtons">
                <vaadin-button id="topLeft" class="evaluationBtn">Oben links</vaadin-button>
                <vaadin-button id="topRight" class="evaluationBtn">Oben rechts</vaadin-button>
                <vaadin-button id="bottomLeft" class="evaluationBtn">Unten links</vaadin-button>
                <vaadin-button id="bottomRight" class="evaluationBtn">Unten rechts</vaadin-button>
            </div>
        </div>
    </div>
    `;

class TestElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.instructionText = this.shadowRoot.querySelector("#instruction");
        this.evaluation = this.shadowRoot.querySelector("#evaluation");
        this.canvas = this.shadowRoot.querySelector("#canvas");

        this.startBtn = this.shadowRoot.querySelector("#startBtn");
        this.startBtn.addEventListener("click", this._startButtonClicked);
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
    getContext() {
        return this.canvas.getContext("2d");
    }

    getPositionsOfDistractors(quantity) {}

    getTargetPosition() {}

    showCanvas(time) {
        this.canvas.style.display = "block";
        this.startBtn.style.display = "none";
        setTimeout(() => {
            this.canvas.style.display = "none";
            this.evaluation.style.display = "flex";
        }, time);
    }

    _startButtonClicked() {
        this.dispatchEvent(
            new CustomEvent("start-test", {
                composed: true,
            })
        );
    }
}

customElements.define("test-element", TestElement);
