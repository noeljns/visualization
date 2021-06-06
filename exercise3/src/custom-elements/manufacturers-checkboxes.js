import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group";
const template = document.createElement("template");

template.innerHTML = `
<div>
<vaadin-checkbox-group label="Manufacturer">
    <vaadin-checkbox value="amc" style="--lumo-primary-color: #118244; color: #118244;">Amc (27)</vaadin-checkbox>
    <vaadin-checkbox value="audi" style="--lumo-primary-color: #ee9bc7; color: #ee9bc7;">Audi (7)</vaadin-checkbox>
    <vaadin-checkbox value="bmw" style="--lumo-primary-color: #f55145; color: #f55145;">BMW (2)</vaadin-checkbox>
    <vaadin-checkbox value="buick" style="--lumo-primary-color: #71490c; color: #71490c;">Buick (21)</vaadin-checkbox>
    <vaadin-checkbox value="cadillac" style="--lumo-primary-color: #3dd9f0; color: #3dd9f0;">Cadillac (2)</vaadin-checkbox>
    <vaadin-checkbox value="capri" style="--lumo-primary-color: #1c6391; color: #1c6391;">Capri (1)</vaadin-checkbox>
    <vaadin-checkbox value="chevrolet" style="--lumo-primary-color: #9d0456; color: #9d0456;">Chevrolet (47)</vaadin-checkbox>
    <vaadin-checkbox value="chrysler" style="--lumo-primary-color: #56079e; color: #56079e;">Chrysler (6)</vaadin-checkbox>
    <vaadin-checkbox value="datsun" style="--lumo-primary-color: #927b83; color: #927b83;">Datsun (23)</vaadin-checkbox>
    <vaadin-checkbox value="dodge" style="--lumo-primary-color: #6afcb1; color: #6afcb1;">Dodge (28)</vaadin-checkbox>
    <vaadin-checkbox value="fiat" style="--lumo-primary-color: #b49870; color: #b49870;">Fiat (8)</vaadin-checkbox>
    <vaadin-checkbox value="ford" style="--lumo-primary-color: #93b1f7; color: #93b1f7;">Ford (48)</vaadin-checkbox>
    <vaadin-checkbox value="hi" style="--lumo-primary-color: #ee367e; color: #ee367e;">Hi (1)</vaadin-checkbox>
    <vaadin-checkbox value="honda" style="--lumo-primary-color: #560408; color: #560408;">Honda (13)</vaadin-checkbox>
    <vaadin-checkbox value="mazda" style="--lumo-primary-color: #889291; color: #889291;">Mazda (12)</vaadin-checkbox>
    <vaadin-checkbox value="mercedes" style="--lumo-primary-color: #223b11; color: #223b11;">Mercedes (3)</vaadin-checkbox>
    <vaadin-checkbox value="mercury" style="--lumo-primary-color: #53c50d; color: #53c50d;">Mercury (11)</vaadin-checkbox>
    <vaadin-checkbox value="nissan" style="--lumo-primary-color: #485dd0; color: #485dd0;">Nissan (1)</vaadin-checkbox>
    <vaadin-checkbox value="oldsmobile" style="--lumo-primary-color: #493f4a; color: #493f4a;">Oldsmobile (10)</vaadin-checkbox>
    <vaadin-checkbox value="peugot" style="--lumo-primary-color: #a6bda3; color: #a6bda3;">Peugot (8)</vaadin-checkbox>
    <vaadin-checkbox value="plymouth" style="--lumo-primary-color: #61615f; color: #61615f;">Plymouth (31)</vaadin-checkbox>
    <vaadin-checkbox value="pontiac" style="--lumo-primary-color: #b50f0f; color: #b50f0f;">Pontiac (16)</vaadin-checkbox>
    <vaadin-checkbox value="renault" style="--lumo-primary-color: #6e7b09; color: #6e7b09;">Renault (3)</vaadin-checkbox>
    <vaadin-checkbox value="saat" style="--lumo-primary-color: #1bb899; color: #1bb899;">Saab (4)</vaadin-checkbox>
    <vaadin-checkbox value="subaru" style="--lumo-primary-color: #f33af7; color: #f33af7;">Subaru (4)</vaadin-checkbox>
    <vaadin-checkbox value="toyota" style="--lumo-primary-color: #fca7a0; color: #fca7a0;">Toyota (26)</vaadin-checkbox>
    <vaadin-checkbox value="triumph" style="--lumo-primary-color: #f9a727; color: #f9a727;">Triumph (1)</vaadin-checkbox>
    <vaadin-checkbox value="volvo" style="--lumo-primary-color: #981f89; color: #981f89;">Volvo (6)</vaadin-checkbox>
    <vaadin-checkbox value="vw" style="--lumo-primary-color: #040227; color: #040227;">VW (22)</vaadin-checkbox>
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
        this.checkboxGroup.value = ["audi"];
        this.checkboxGroup.addEventListener("value-changed", () => {
            let checkedAll = true;
            this.checkboxes.forEach((checkbox) => {
                if (!checkbox.checked) {
                    checkedAll = false;
                }
            });
            this.checkedAll = checkedAll;
            this.dispatchEvent(
                new CustomEvent("manufacturer-changed", {
                    detail: { selectedManufacturers: this.checkboxGroup.value, checkedAll: this.checkedAll },
                })
            );
        });
        this.checkboxes = this.shadowRoot.querySelectorAll("vaadin-checkbox");
    }

    selectAll() {
        if (!this.checkedAll) {
            this.checkboxes.forEach(function (checkbox) {
                checkbox.checked = true;
            });
        }
    }

    unselectAll() {
        this.checkboxGroup.value = [];
    }
}

customElements.define("manufacturer-checkboxes", OriginCheckboxes);
