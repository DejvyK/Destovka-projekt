class ProductStructureGenerator {
    formatPrice(price) {
        const [value, currency] = price.split(' ');
        return `${parseInt(value).toLocaleString('cs-CZ')} Kč`;
    }
    
    createProductItem(data, feedData) {
        // Přidáme kontrolu imageLink a fallback na placeholder
        const imageUrl = (feedData && feedData.imageLink) ? feedData.imageLink : '/api/placeholder/200/200';
        
        return `
            <div class="destovka-product-card" data-product-code="${data['Kód']}">
                <div>
                    <img src="${imageUrl}" 
                         alt="${data['Produkt']}"
                         onerror="this.src='img/delete.png'"
                         style="max-width: 200px"/>
                </div>
                <div style="display: flex; align-items:center; flex-direction: column;">
                    <div class="destovka-product-title">
                        ${data['Produkt']}
                        <span style="font-size: 14px; font-weight: 500">
                            ${data['Varianta'] || ''}
                        </span>
                    </div>
                    <div class="destovka-product-code">kód ${data['Kód']}</div> 
                </div>
                <div class="destovka-product-card-footer">
                    <div class="destovka-product-price">
                        ${this.formatPrice(feedData?.price || 'Cena na dotaz')}
                    </div>
                    <button class="destovka-product-select-button">
                        Vybrat
                    </button>
                </div>
            </div>
        `;
    }
 
    createEmptyProductItem() {
        return `
            <div class="destovka-product-card">
                <div>
                    <img src="img/delete.png" style="max-width: 200px"/>
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
 
    initializeSelection(container) {
        if (!container) return;
        
        // Remove any existing event listeners
        container.querySelectorAll('.destovka-product-select-button').forEach(button => {
            button.replaceWith(button.cloneNode(true));
        });
        
        // Add new event listeners
        container.querySelectorAll('.destovka-product-select-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.destovka-product-card');
                this.selectProduct(card, container);
            });
        });
    }
 
    selectProduct(selectedCard, container) {
        // Zrušit předchozí výběr
        container.querySelectorAll('.destovka-product-card').forEach(card => {
            card.classList.remove('destovka-product-selected');
            const button = card.querySelector('.destovka-product-select-button');
            button.textContent = 'Vybrat';
            button.classList.remove('destovka-selected');
        });
    
        // Nastavit nový výběr
        selectedCard.classList.add('destovka-product-selected');
        const button = selectedCard.querySelector('.destovka-product-select-button');
        button.textContent = 'Vybráno';
        button.classList.add('destovka-selected');
    }
 
    getSelectedProduct(container) {
        const selectedCard = container.querySelector('.destovka-product-selected');
        return selectedCard ? selectedCard.dataset.productCode : null;
    }
 }
 
 window.productStructureGenerator = new ProductStructureGenerator()