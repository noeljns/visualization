import "@vaadin/vaadin-button";

const template = document.createElement("template");

template.innerHTML = `
    <style>
    #roundDisplay {
        margin-left: 420px;
    }
    #countdown {
        font-size: 100px;
        padding-left: 270px;
        padding-top: 40px;
    }
    #canvas {
        display: none;
        border: 1px solid grey;
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
    <div><span id="timeDisplay"></span><span id="roundDisplay"></span></div>
    <h2 id="instruction"></h2>
    <canvas id="canvas"></canvas>
    <vaadin-button id="startBtn">Start</vaadin-button>
    <div id="countdown"></div>
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

        this.countDownTime = 200;

        this.timeDisplay = this.shadowRoot.querySelector("#timeDisplay");
        this.roundDisplay = this.shadowRoot.querySelector("#roundDisplay");
        this.instructionText = this.shadowRoot.querySelector("#instruction");
        this.evaluation = this.shadowRoot.querySelector("#evaluation");
        this.canvas = this.shadowRoot.querySelector("#canvas");
        this.countdown = this.shadowRoot.querySelector("#countdown");

        this.startBtn = this.shadowRoot.querySelector("#startBtn");
        this.startBtn.addEventListener("click", this._startButtonClicked);
        this.shadowRoot.querySelector("#notSeen").addEventListener("click", this._notSeen.bind(this));
        this.shadowRoot.querySelector("#topLeft").addEventListener("click", this._topLeft.bind(this));
        this.shadowRoot.querySelector("#topRight").addEventListener("click", this._topRight.bind(this));
        this.shadowRoot.querySelector("#bottomLeft").addEventListener("click", this._bottomLeft.bind(this));
        this.shadowRoot.querySelector("#bottomRight").addEventListener("click", this._bottomRight.bind(this));
        this.canvas.width = 600;
        this.canvas.height = 300;
        this.clearCanvas();
    }

    static get observedAttributes() {
        return ["instruction", "time", "round"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "instruction":
                    this.instruction = newValue;
                    this.instructionText.innerHTML = this.instruction;
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
    getContext() {
        return this.canvas.getContext("2d");
    }

    getSpatialPosition(pos) {
        let spatialPosition = "";
        if (pos.y <= this.canvas.height / 2) {
            spatialPosition = "top";
        } else {
            spatialPosition = "bottom";
        }
        if (pos.x <= this.canvas.width / 2) {
            spatialPosition += "-left";
        } else {
            spatialPosition += "-right";
        }
        return spatialPosition;
    }

    clearCanvas() {
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.beginPath();
        ctx.moveTo(this.canvas.width / 2, 0);
        ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, this.canvas.height / 2);
        ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    getRandomDistractorPositions(quantity, distractorWidth, distractorHeight, targetPos) {
        let distractorPadding;
        let distractorPositions = [];
        distractorWidth > distractorHeight
            ? (distractorPadding = distractorWidth)
            : (distractorPadding = distractorHeight);
        for (let i = 0; i < quantity; i++) {
            let newPos = this.getRandomPosition(distractorPadding);
            while (this.isOverlapping(newPos, [...distractorPositions, targetPos], distractorPadding)) {
                newPos = this.getRandomPosition(distractorPadding);
            }
            distractorPositions.push(newPos);
        }
        return distractorPositions;
    }
    getRandomPosition(padding) {
        let x = Math.floor(Math.random() * (this.canvas.width - padding));
        let y = Math.floor(Math.random() * (this.canvas.height - padding));
        return { x: x, y: y };
    }

    isOverlapping(pos, positionsToCheck, padding) {
        for (let i = 0; i < positionsToCheck.length; i++) {
            if (
                pos.x > positionsToCheck[i].x - padding &&
                pos.x < positionsToCheck[i].x + padding &&
                pos.y > positionsToCheck[i].y - padding &&
                pos.y < positionsToCheck[i].y + padding
            ) {
                return true;
            }
        }
        return false;
    }

    getRandomTargetPosition(targetWidth, targetHeight) {
        let targetPadding;
        targetWidth > targetHeight ? (targetPadding = targetWidth) : (targetPadding = targetHeight);
        let x = Math.floor(Math.random() * (this.canvas.width - targetPadding * 2)) + targetPadding;
        if (x < this.canvas.width / 2 + targetPadding && x > this.canvas.width / 2 - targetPadding) {
            if (x > this.canvas.width / 2) {
                x += targetPadding;
            } else {
                x -= targetPadding;
            }
        }
        let y = Math.floor(Math.random() * (this.canvas.height - targetPadding * 2)) + targetPadding;
        if (y < this.canvas.height / 2 + targetPadding && y > this.canvas.height / 2 - targetPadding) {
            if (y > this.canvas.height / 2) {
                y += targetPadding;
            } else {
                y -= targetPadding;
            }
        }
        return { x: x, y: y };
    }

    showCanvas(time) {
        this.startBtn.style.display = "none";
        this.evaluation.style.display = "none";
        this.countdown.style.display = "block";
        this.countdown.innerHTML = "3";
        setTimeout(() => {
            this.countdown.innerHTML = "2";
            setTimeout(() => {
                this.countdown.innerHTML = "1";
                setTimeout(() => {
                    this.countdown.style.display = "none";
                    this.canvas.style.display = "block";
                    setTimeout(() => {
                        this.canvas.style.display = "none";
                        this.evaluation.style.display = "flex";
                    }, time);
                }, this.countDownTime);
            }, this.countDownTime);
        }, this.countDownTime);
    }

    _notSeen() {
        this._dispatchTestDoneEvent({ result: "not-seen" });
    }
    _topRight() {
        this._dispatchTestDoneEvent({ result: "top-right" });
    }
    _topLeft() {
        this._dispatchTestDoneEvent({ result: "top-left" });
    }
    _bottomLeft() {
        this._dispatchTestDoneEvent({ result: "bottom-left" });
    }
    _bottomRight() {
        this._dispatchTestDoneEvent({ result: "bottom-right" });
    }

    _dispatchTestDoneEvent(detail) {
        this.dispatchEvent(
            new CustomEvent("test-done", {
                composed: true,
                detail,
            })
        );
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
