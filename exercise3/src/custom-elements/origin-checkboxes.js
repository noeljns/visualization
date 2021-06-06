import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group";
const template = document.createElement("template");

template.innerHTML = `
<div>
<vaadin-checkbox-group label="Origin">
  <vaadin-checkbox value="European" >European</vaadin-checkbox>
  <vaadin-checkbox value="Japanese" >Japanese</vaadin-checkbox>
  <vaadin-checkbox value="American" >American</vaadin-checkbox>
</vaadin-checkbox-group>
</div>
    `;

class OriginCheckboxes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.checkedAll = false;

        this.checkboxGroup = this.shadowRoot.querySelector("vaadin-checkbox-group");
        this.checkboxGroup.value = ["European", "Japanese", "American"];
        this.checkboxGroup.addEventListener("value-changed", () => {
            if (["European", "Japanese", "American"].every((i) => this.checkboxGroup.value.includes(i))) {
                this.checkedAll = true;
            } else {
                this.checkedAll = false;
            }
            this.dispatchEvent(
                new CustomEvent("origin-changed", {
                    detail: { selectedOrigins: this.checkboxGroup.value, checkedAll: this.checkedAll },
                })
            );
        });
    }

    selectAll() {
        if (!this.checkedAll) this.checkboxGroup.value = ["European", "Japanese", "American"];
    }

    unselectAll() {
        this.checkboxGroup.value = [];
    }
}

customElements.define("origin-checkboxes", OriginCheckboxes);
