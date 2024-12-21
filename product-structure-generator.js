class ProductStructureGenerator {
    formatPrice(price) {
        const [value, currency] = price.split(' ');
        return `${parseInt(value).toLocaleString('cs-CZ')} Kč`;
    }

    createProductItem(data, feedData) {
        return `
            <div class="destovka-product-card">
                <div>
                    <img src="${data.imageLink}" style="max-width: 200px"/>
                </div>
                <div style="display: flex; align-items:center; flex-direction: column;">
                    <div class="destovka-product-title">
                        ${data['Produkt']}
                        <span style="font-size: 14px; font-weight: 500">
                            ${data['Varianta']}
                        </span>
                    </div>
                    <div class="destovka-product-code">kód ${data['Kód']}</div> 
                </div>
                <div class="destovka-product-card-footer">
                    <div class="destovka-product-price">
                        ${this.formatPrice(feedData.price)}
                    </div>
                    <button class="destovka-product-select-button">
                        Vybráno
                    </button>
                </div>
            </div>
        `
    } 

    createEmptyProductItem() {
        return `
            <div class="destovka-product-card">
                <div>
                    <img src="" style="max-width: 200px"/>
                </div>
                <div class="destovka-product-title">
                    żádná
                </div>
                <div class="destovka-product-card-footer">
                    <button class="destovka-product-select-button">
                        Vybráno
                    </button>
                </div>
            </div>
        `
    }
}

window.productStructureGenerator = new ProductStructureGenerator()