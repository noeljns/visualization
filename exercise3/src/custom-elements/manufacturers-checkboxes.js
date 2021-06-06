import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-checkbox/vaadin-checkbox-group";
const template = document.createElement("template");

template.innerHTML = `
<div>
<vaadin-checkbox-group label="Manufacturer">
  <vaadin-checkbox value="amc" >Amc (29)</vaadin-checkbox>
  <vaadin-checkbox value="audi" >Audi (7)</vaadin-checkbox>
  <vaadin-checkbox value="bmw" >BMW (x)</vaadin-checkbox>
  <vaadin-checkbox value="buick" >Buick (x)</vaadin-checkbox>
  <vaadin-checkbox value="cadillac" >Cadillac (x)</vaadin-checkbox>
  <vaadin-checkbox value="capri" >Capri (x)</vaadin-checkbox>
  <vaadin-checkbox value="chevrolet" >Chevrolet (x)</vaadin-checkbox>
  <vaadin-checkbox value="chrysler" >Chrysler (x)</vaadin-checkbox>
  <vaadin-checkbox value="citroen" >Citroen (x)</vaadin-checkbox>
  <vaadin-checkbox value="datsun" >Datsun (x)</vaadin-checkbox>
  <vaadin-checkbox value="dodge" >Dodge (x)</vaadin-checkbox>
  <vaadin-checkbox value="fiat" >Fiat (x)</vaadin-checkbox>
  <vaadin-checkbox value="ford" >Ford (x)</vaadin-checkbox>
  <vaadin-checkbox value="hi" >Hi (x)</vaadin-checkbox>
  <vaadin-checkbox value="honda" >Honda (x)</vaadin-checkbox>
  <vaadin-checkbox value="mazda" >Mazda (x)</vaadin-checkbox>
  <vaadin-checkbox value="mercedes" >Mercedes (x)</vaadin-checkbox>
  <vaadin-checkbox value="mercury" >Mercury (x)</vaadin-checkbox>
  <vaadin-checkbox value="nissan" >Nissan (x)</vaadin-checkbox>
  <vaadin-checkbox value="oldsmobile" >Oldsmobile (x)</vaadin-checkbox>
  <vaadin-checkbox value="peugot" >Peugot (x)</vaadin-checkbox>
  <vaadin-checkbox value="plymouth" >Plymouth (x)</vaadin-checkbox>
  <vaadin-checkbox value="pontiac" >Pontiac (x)</vaadin-checkbox>
  <vaadin-checkbox value="renault" >Renault (x)</vaadin-checkbox>
  <vaadin-checkbox value="saat" >Saat (x)</vaadin-checkbox>
  <vaadin-checkbox value="subaru" >Subaru (x)</vaadin-checkbox>
  <vaadin-checkbox value="toyota" >Toyota (x)</vaadin-checkbox>
  <vaadin-checkbox value="triumph" >Triumph (x)</vaadin-checkbox>
  <vaadin-checkbox value="volvo" >Volvo (x)</vaadin-checkbox>
  <vaadin-checkbox value="vw" >VW (x)</vaadin-checkbox>
</vaadin-checkbox-group>
</div>
    `;

class OriginCheckboxes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.checkboxGroup = this.shadowRoot.querySelector("vaadin-checkbox-group");
        this.checkboxGroup.value = ["audi"];
        this.checkboxGroup.addEventListener("value-changed", () => {
            this.dispatchEvent(
                new CustomEvent("manufacturer-changed", { detail: { selectedManufacturers: this.checkboxGroup.value } })
            );
        });
        this.checkboxes = this.shadowRoot.querySelectorAll('vaadin-checkbox');
    }

    selectAll() {
        this.checkboxes.forEach(function(checkbox) {
            checkbox.checked = true;
          });
    }

    unselectAll() {
        this.checkboxGroup.value = [];
    }
}

customElements.define("manufacturer-checkboxes", OriginCheckboxes);