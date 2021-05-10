const template = document.createElement("template");

template.innerHTML = `
    <style>
    </style>
    <div class="wrapper">
        <test-element id="test-element"></test-element>
    </div>
    `;

import "./test-element";

class IntersectionTest extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.size = 26;
        this.lineWidth = 5;
        this.color = "purple";

        this.testElement = this.shadowRoot.querySelector("#test-element");
        this.testElement.addEventListener("start-test", this.startTest.bind(this));
        this.testElement.addEventListener("test-done", this.testDone.bind(this));
    }

    static get observedAttributes() {
        return ["instruction", "time", "round", "color"];
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
                case "color":
                    this.useColorInDistractors = newValue === "true";
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
        let pos = this.testElement.getRandomTargetPosition(this.size, this.size);
        this.drawCross(pos, this.color, ctx);
        return pos;
    }

    drawDistractors(targetPos, round) {
        let amountOfDistractors, rotations, colors, variations;
        let ctx = this.testElement.getContext();
        switch (round) {
            case "1":
                rotations = [0];
                amountOfDistractors = 10;
                colors = ["purple", "green"];
                variations = [0];
                break;
            case "2":
                rotations = [0, 90, 180];
                amountOfDistractors = 20;
                colors = ["purple", "green", "blue", "purple"];
                variations = [0, 5, 8];
                break;
            case "3":
                rotations = [0, 90, 180, 270];
                amountOfDistractors = 30;
                colors = ["purple", "green", "blue", "pink", "purple"];
                variations = [0, 5, 5, 7, 8, 12];
                break;
            default:
                rotations = [0];
                amountOfDistractors = 10;
                colors = ["purple", "green"];
        }
        let distractorPositions = this.testElement.getRandomDistractorPositions(
            amountOfDistractors,
            this.size * 2,
            this.size * 2,
            targetPos
        );
        for (let i = 0; i < distractorPositions.length; i++) {
            let color = this.useColorInDistractors ? colors[i % colors.length] : this.color;
            this.drawL(
                distractorPositions[i],
                color,
                ctx,
                rotations[i % rotations.length],
                variations[i % variations.length]
            );
        }
    }

    drawCross(pos, color, ctx) {
        ctx.beginPath();
        ctx.moveTo(pos.x - this.size / 2, pos.y);
        ctx.lineTo(pos.x + this.size / 2, pos.y);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y - this.size / 2);
        ctx.lineTo(pos.x, pos.y + this.size / 2);
        ctx.stroke();
    }

    drawL(pos, color, ctx, rotation, variation) {
        switch (rotation) {
            case 0:
                ctx.beginPath();
                ctx.moveTo(pos.x - this.size / 2, pos.y - this.size / 2);
                ctx.lineTo(pos.x - this.size / 2, pos.y + this.size / 3);
                ctx.lineWidth = this.lineWidth;
                ctx.strokeStyle = color;
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(pos.x - this.size / 2 - variation - this.lineWidth / 2, pos.y + this.size / 3);
                ctx.lineTo(pos.x + this.size / 3 - variation - this.lineWidth / 2, pos.y + this.size / 3);
                ctx.stroke();
                break;
            case 90:
                ctx.beginPath();
                ctx.lineJoin = "miter";
                ctx.moveTo(pos.x - this.size / 2, pos.y + this.size / 2);
                ctx.lineTo(pos.x - this.size / 2, pos.y - this.size / 3);
                ctx.lineWidth = this.lineWidth;
                ctx.strokeStyle = color;
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(pos.x - this.size / 2 - variation - this.lineWidth / 2, pos.y - this.size / 3);
                ctx.lineTo(pos.x + this.size / 3 - variation - this.lineWidth / 2, pos.y - this.size / 3);
                ctx.stroke();
                break;
            case 180:
                ctx.beginPath();
                ctx.lineJoin = "miter";
                ctx.moveTo(pos.x - this.size / 2 + variation + this.lineWidth / 2, pos.y - this.size / 2);
                ctx.lineTo(pos.x + this.size / 3 + variation + this.lineWidth / 2, pos.y - this.size / 2);
                ctx.lineWidth = this.lineWidth;
                ctx.strokeStyle = color;
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(pos.x + this.size / 3, pos.y - this.size / 2);
                ctx.lineTo(pos.x + this.size / 3, pos.y + this.size / 3);
                ctx.stroke();
                break;
            case 270:
                ctx.beginPath();
                ctx.lineJoin = "miter";
                ctx.moveTo(pos.x - this.size / 2 + variation + this.lineWidth / 2, pos.y + this.size / 2);
                ctx.lineTo(pos.x + this.size / 3 + variation + this.lineWidth / 2, pos.y + this.size / 2);
                ctx.lineWidth = this.lineWidth;
                ctx.strokeStyle = color;
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(pos.x + this.size / 3, pos.y + this.size / 2);
                ctx.lineTo(pos.x + this.size / 3, pos.y - this.size / 3);
                ctx.stroke();
                break;
        }
    }
}

customElements.define("intersection-test", IntersectionTest);
