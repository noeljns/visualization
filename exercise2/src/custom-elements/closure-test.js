const template = document.createElement("template");

template.innerHTML = `
    <style>
    </style>
    <div class="wrapper">
        <test-element id="test-element"></test-element>
    </div>
    `;

import "./test-element";

class ClosureTest extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.radius = 13;
        this.lineWidth = 5;
        this.color = "green";

        this.testElement = this.shadowRoot.querySelector("#test-element");
        this.testElement.addEventListener("start-test", this.startTest.bind(this));
        this.testElement.addEventListener("test-done", this.testDone.bind(this));
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
                    this.testElement.setAttribute("time", newValue);
                    break;
                case "round":
                    this.round = newValue;
                    this.testElement.setAttribute("round", newValue);
                    break;
            }
        }
    }

    startTest() {
        this.testElement.clearCanvas();
        this.targetPosition = this.drawTarget();
        this.drawDistractors(this.targetPosition, this.round);
        this.testElement.showCanvas(this.time);
    }

    testDone(evt) {
        evt.stopPropagation();
        let targetSpatialPosition = this.testElement.getSpatialPosition(this.targetPosition);
        let found = targetSpatialPosition === evt.detail.result ? true : false;
        this.dispatchEvent(
            new CustomEvent("test-done", {
                composed: true,
                detail: { found },
            })
        );
    }

    drawTarget() {
        let ctx = this.testElement.getContext();
        let pos = this.testElement.getRandomTargetPosition(this.radius * 2, this.radius * 2);
        this.drawRing(pos, this.color, ctx, 2 * Math.PI);
        return pos;
    }

    drawDistractors(targetPos, round) {
        let amountOfDistractors, angles;
        let ctx = this.testElement.getContext();
        switch (round) {
            case "1":
                angles = [1.6 * Math.PI];
                amountOfDistractors = 10;
                break;
            case "2":
                angles = [1.6 * Math.PI, 1.7 * Math.PI, 1.8 * Math.PI];
                amountOfDistractors = 20;
                break;
            case "3":
                angles = [1.3 * Math.PI, 1.4 * Math.PI, 1.5 * Math.PI, 1.6 * Math.PI, 1.7 * Math.PI, 1.8 * Math.PI];
                amountOfDistractors = 30;
                break;
            default:
                angles = [1.6 * Math.PI];
                amountOfDistractors = 10;
        }
        let distractorPositions = this.testElement.getRandomDistractorPositions(
            amountOfDistractors,
            this.radius * 2,
            this.radius * 2,
            targetPos
        );
        for (let i = 0; i < distractorPositions.length; i++) {
            this.drawRing(distractorPositions[i], this.color, ctx, angles[i % angles.length]);
        }
    }

    drawCircle(pos, color, ctx) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }
    drawRing(pos, color, ctx, angle) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.radius, 0, angle);
        ctx.strokeStyle = color;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
    }
}

customElements.define("closure-test", ClosureTest);
