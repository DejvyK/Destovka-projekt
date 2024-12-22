// zde bude kód patřící k věcem od main containeru. 



class DestovkaKonfigCalculator {
    constructor() {
        this.initialize();
    }

    initialize() {
        const volumeLabel = document.querySelector('.destovka-form-group:first-child .destovka-label');
        if (volumeLabel) {
            const calcButton = document.createElement('div');
            calcButton.style.display = 'flex';
            calcButton.style.cursor = 'pointer';
            calcButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calculator" viewBox="0 0 16 16">
                <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
            </svg>`;
            calcButton.onclick = () => this.showCalculator();

            const labelWrapper = document.querySelector('.destovka-label-wrapper')
            labelWrapper.appendChild(calcButton)
        }

        this.createCalculatorModal();
    }

    createCalculatorModal() {
        const modal = document.createElement('div');
        modal.className = 'destovka-konfig-calc-modal';
        modal.innerHTML = `
            <div class="destovka-konfig-calc-modal-content">
                <div class="destovka-konfig-calc-modal-header">
                    <h2>Kalkulačka velikosti nádrže</h2>
                    <button class="destovka-konfig-calc-modal-close">&times;</button>
                </div>
                <div class="destovka-konfig-calc-modal-body">
                    <div class="destovka-konfig-calc-form">
                        <div class="destovka-konfig-calc-form-group">
                            <label>Plocha střechy, půdorysný průmět (v m²):</label>
                            <input type="number" id="destovkaKonfigCalcRoofArea" class="destovka-konfig-calc-input" value="110" min="0">
                            <span class="destovka-konfig-calc-hint">Střecha domu, garáže, zahradního domku a ostatních ploch</span>
                        </div>
                        
                        <div class="destovka-konfig-calc-form-group">
                            <label>Srážkový úhrn dle mapy (v mm):</label>
                            <input type="number" id="destovkaKonfigCalcRainfall" class="destovka-konfig-calc-input" value="630" min="0">
                            <span class="destovka-konfig-calc-hint">Průměrný srážkový úhrn v ČR je 673 mm/rok</span>
                        </div>
                        
                        <div class="destovka-konfig-calc-map">
                            <img src="https://cdn.myshoptet.com/usr/eshop.destovka.eu/user/documents/upload/mapa-srazek-cr.png" 
                                alt="Mapa srážek ČR" 
                                class="destovka-konfig-calc-map-img">
                        </div>
                        
                        <div class="destovka-konfig-calc-form-group">
                            <label>Doporučený objem v litrech:</label>
                            <input type="number" id="destovkaKonfigCalcVolume" class="destovka-konfig-calc-input" readonly>
                            <span class="destovka-konfig-calc-hint">Doporučená hodnota objemu nádrže zohledňuje trend přívalových dešťů a větších rozestupů mezi dešti tak, aby nádrž pojala co nejvíce vody během deště a poté se uplně nevyčerpala do deště následujícího. Díky tomu bude nádrž využita efektivněji.</span>
                        </div>
                    </div>
                </div>
                <div class="destovka-konfig-calc-modal-footer">
                    <button class="destovka-konfig-calc-button destovka-konfig-calc-button-calculate">Vypočítat</button>
                    <button class="destovka-konfig-calc-button destovka-konfig-calc-button-apply destovka-konfig-calc-button-disabled">Vybrat tuto velikost</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.destovka-konfig-calc-modal-close').onclick = () => this.hideCalculator();
        modal.querySelector('.destovka-konfig-calc-button-calculate').onclick = () => this.calculate();
        modal.querySelector('.destovka-konfig-calc-button-apply').onclick = () => this.applyVolume();
        
        // Close modal on outside click
        modal.onclick = (e) => {
            if (e.target === modal) this.hideCalculator();
        };

        this.modal = modal;

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('destovka-konfig-calc-modal-show')) {
                this.hideCalculator();
            }
        });

        // Input validation
        const numericInputs = modal.querySelectorAll('input[type="number"]');
        numericInputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value < 0) input.value = 0;
            });
        });
    }

    showCalculator() {
        this.modal.classList.add('destovka-konfig-calc-modal-show');
    }

    hideCalculator() {
        this.modal.classList.remove('destovka-konfig-calc-modal-show');
    }

    calculate() {
        const roofArea = parseFloat(document.getElementById('destovkaKonfigCalcRoofArea').value) || 0;
        const rainfall = parseFloat(document.getElementById('destovkaKonfigCalcRainfall').value) || 0;
        
        // Finální upřesněný koeficient na základě mnoha testovacích případů
        const coefficient = 0.06558;
        const volume = Math.round(roofArea * rainfall * coefficient);
        
        document.getElementById('destovkaKonfigCalcVolume').value = volume;
        
        const applyButton = this.modal.querySelector('.destovka-konfig-calc-button-apply');
        applyButton.classList.remove('destovka-konfig-calc-button-disabled');
    }

    applyVolume() {
        const volume = document.getElementById('destovkaKonfigCalcVolume').value;
        const volumeRange = document.getElementById('volumeRange');
        
        if (volumeRange && volume) {
            // Ensure the value is within the range's min and max
            const newValue = Math.min(Math.max(volume, volumeRange.min), volumeRange.max);
            volumeRange.value = newValue;
            
            // Trigger the input event to update any listeners
            const event = new Event('input');
            volumeRange.dispatchEvent(event);
        }
        
        this.hideCalculator();
    }
}

class DestovkaTankFilter {
    constructor(formData) {
        this.formData = formData;
        this.selectedTankCode = window.destovkaCart?.destGetItemsByStep(2)[0]?.productCode;
        this.priorities = {
            volume: 10,        // Objem
            diameter: 8,       // DN kompatibilita
            load: 6,          // Pojezdnost
            clayCompatibility: 4    // Vhodnost pro jílovitou půdu
        };
        
        this.VOLUME_TOLERANCE = 0.2; // 20% tolerance pro objem

        // Předpočítané hodnoty pro optimalizaci
        this.requiredVolume = parseInt(this.formData.get('volume'));
        this.minVolume = this.requiredVolume * (1 - this.VOLUME_TOLERANCE);
        this.maxVolume = this.requiredVolume * (1 + this.VOLUME_TOLERANCE);
        this.requiredLoad = this.formData.get('load');
        this.requiredInflow = this.formData.get('inflowDiameter');
        this.requiredOutflow = this.formData.get('outflowDiameter');
        this.loadHierarchy = ['pochozí', 'pojezdná do 3,5 t', 'pojezdná do 12 t'];
        this.requiredLoadIndex = this.loadHierarchy.indexOf(this.requiredLoad);
    }

    filterTanks(tanks) {
        if (!tanks || !Array.isArray(tanks) || tanks.length === 0) {
            return [];
        }

        let filteredTanks = [];

        // Pokud existuje vybraná nádrž, vždy ji zahrneme
        if (this.selectedTankCode) {
            const selectedTank = tanks.find(tank => tank['Kód'] === this.selectedTankCode);
            if (selectedTank) {
                filteredTanks.push({
                    ...selectedTank,
                    score: this.calculateTankScore(selectedTank)
                });
            }
        }

        // Filtrujeme a hodnotíme zbývající nádrže
        const otherTanks = tanks
            .filter(tank => tank['Kód'] !== this.selectedTankCode) // Vyloučíme již přidanou vybranou nádrž
            .filter(tank => this.meetsRequiredCriteria(tank))
            .map(tank => ({
                ...tank,
                score: this.calculateTankScore(tank)
            }))
            .sort((a, b) => b.score - a.score);

        // Omezíme počet alternativních nádrží
        const maxAlternatives = this.selectedTankCode ? 2 : 3;
        const alternativeTanks = otherTanks.slice(0, maxAlternatives);

        // Spojíme vybranou nádrž s alternativami
        filteredTanks = [...filteredTanks, ...alternativeTanks];

        // Pokud nemáme žádné nádrže, vrátíme prázdné pole
        if (filteredTanks.length === 0) {
            console.log('Nenalezeny žádné vyhovující nádrže');
            return [];
        }

        return filteredTanks;
    }

    meetsRequiredCriteria(tank) {
        // Kontrola objemu s tolerancí
        const volumeOk = this.checkVolumeMatch(tank);
        console.log(`Tank ${tank.Kód} - Volume check: ${volumeOk}`);
        if (!volumeOk) return false;
    
        // Kontrola DN kompatibility
        const diameterOk = this.checkDiameterCompatibility(tank);
        console.log(`Tank ${tank.Kód} - Diameter check: ${diameterOk}`);
        if (!diameterOk) return false;
    
        // Kontrola pojezdnosti
        const loadOk = this.checkLoadCompatibility(tank);
        console.log(`Tank ${tank.Kód} - Load check: ${loadOk}`);
        if (!loadOk) return false;
    
        return true;
    }

    calculateTankScore(tank) {
        let score = 0;

        // Objem - čím blíže požadovanému objemu, tím lepší skóre
        const volumeMatch = this.getVolumeMatchScore(tank);
        score += volumeMatch * this.priorities.volume;

        // DN kompatibilita
        if (this.checkDiameterCompatibility(tank)) {
            score += this.priorities.diameter;
        }

        // Pojezdnost
        const loadScore = this.getLoadScore(tank);
        score += loadScore * this.priorities.load;

        // Vhodnost pro jílovitou půdu
        if (this.formData.get('soil') === 'clay' && tank['Vhodné do jílovité půdy'] === 'ANO') {
            score += this.priorities.clayCompatibility;
        }

        return score;
    }

    checkVolumeMatch(tank) {
        const requiredVolume = parseInt(this.formData.get('volume'));
        const tankVolume = parseInt(tank['Objem (l)']);
        
        const minVolume = requiredVolume * (1 - this.VOLUME_TOLERANCE);
        const maxVolume = requiredVolume * (1 + this.VOLUME_TOLERANCE);

        return tankVolume >= minVolume && tankVolume <= maxVolume;
    }

    getVolumeMatchScore(tank) {
        const requiredVolume = parseInt(this.formData.get('volume'));
        const tankVolume = parseInt(tank['Objem (l)']);
        
        // Čím menší rozdíl, tím lepší skóre (max 1)
        return 1 - Math.abs(tankVolume - requiredVolume) / requiredVolume;
    }

    checkLoadCompatibility(tank) {
        const requiredLoad = this.formData.get('load');
        
        // Získáme všechna zatížení nádrže
        const tankLoads = [
            tank['Zatizeni1'],
            tank['Zatizeni2'], 
            tank['Zatizeni3']
        ].filter(Boolean);
        
        // Definujeme hierarchii zatížení (od nejnižšího po nejvyšší)
        const loadHierarchy = [
            'pochozí',
            'pojezdná do 3,5 t',
            'pojezdná do 12 t'
        ];
        
        // Najdeme index požadovaného zatížení
        const requiredLoadIndex = loadHierarchy.indexOf(requiredLoad);
        
        // Pro každé zatížení nádrže zkontrolujeme, zda je stejné nebo vyšší než požadované
        return tankLoads.some(tankLoad => {
            const tankLoadIndex = loadHierarchy.indexOf(tankLoad);
            return tankLoadIndex >= requiredLoadIndex;
        });
    }
    
    getLoadScore(tank) {
        const requiredLoad = this.formData.get('load');
        const tankLoads = [
            tank['Zatizeni1'],
            tank['Zatizeni2'],
            tank['Zatizeni3']
        ].filter(Boolean);
    
        // Definujeme hierarchii zatížení
        const loadHierarchy = [
            'pochozí',
            'pojezdná do 3,5 t',
            'pojezdná do 12 t'
        ];
    
        // Najdeme nejvyšší zatížení nádrže
        const maxTankLoadIndex = Math.max(...tankLoads.map(load => loadHierarchy.indexOf(load)));
        const requiredLoadIndex = loadHierarchy.indexOf(requiredLoad);
    
        if (maxTankLoadIndex === requiredLoadIndex) {
            // Přesná shoda = plné skóre
            return 1;
        } else if (maxTankLoadIndex > requiredLoadIndex) {
            // Nádrž má lepší vlastnosti než požadované = 0.8 skóre
            return 0.8;
        }
    
        return 0;
    }
    
    checkDiameterCompatibility(tank) {
        const requiredInflow = this.formData.get('inflowDiameter');
        const requiredOutflow = this.formData.get('outflowDiameter');
    
        // Kontrola vstupního DN - použijeme přímé mapování na sloupce v JSONu
        const inflowOk = tank[`DN${requiredInflow}`] === "ANO";
        const outflowOk = tank[`DN${requiredOutflow}`] === "ANO";
    
        return inflowOk && outflowOk;
    }
}

class DestovkaTankManager {
    constructor() {
        this.tanksContainer = document.getElementById('destovkaTanksContainer');
        this.tanksData = [];
        this.feedData = new Map();
        this.MAX_RETRIES = 3;
        this.RETRY_DELAY = 2000;
        this.tankFilter = null;
        this.init();
    }

    async init() {
        try {
            const [jsonData, xmlData] = await Promise.all([
                this.fetchWithRetry(() => this.fetchJSON(), 'JSON'),
                this.fetchWithRetry(() => this.fetchXMLFeed(), 'XML feed')
            ]);
    
            this.tanksData = jsonData;
            await this.processFeedData(xmlData);
            
        } catch (error) {
            console.error('Chyba při inicializaci:', error);
            this.handleError();
        }
    }

    // Nová metoda pro aktualizaci zobrazení nádrží
    updateTankDisplay(formData) {
        this.tankFilter = new DestovkaTankFilter(formData || new Map());
        this.renderTanks();
    }

    renderNoResults() {
        this.tanksContainer.innerHTML = `
            <div class="destovka-no-results">
                <div class="destovka-no-results-content">
                    <h3>Nenalezeny žádné vyhovující nádrže</h3>
                    <p>Pro vaše zadané parametry jsme bohužel nenašli žádnou vyhovující nádrž. 
                       Zkuste prosím upravit některé z následujících kritérií:</p>
                    <ul>
                        <li>Velikost nádrže (objem)</li>
                        <li>Požadavky na zatížení</li>
                        <li>Průměr nátoku nebo výtoku</li>
                    </ul>
                    <button class="destovka-button destovka-button-back" 
                            onclick="window.destovkaStepManager.handlePreviousStep()">
                        Upravit parametry
                    </button>
                </div>
            </div>
        `;
    }

    async fetchWithRetry(fetchFn, resourceName, retryCount = 0) {
        try {
            return await fetchFn();
        } catch (error) {
            if (retryCount < this.MAX_RETRIES) {
                console.log(`Pokus ${retryCount + 1} o načtení ${resourceName} selhal, zkouším znovu za ${this.RETRY_DELAY/1000} sekund...`);
                
                await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
                
                // Exponenciální navýšení čekací doby pro další pokus
                this.RETRY_DELAY *= 1.5;
                
                return this.fetchWithRetry(fetchFn, resourceName, retryCount + 1);
            }
            throw new Error(`Nepodařilo se načíst ${resourceName} po ${this.MAX_RETRIES} pokusech`);
        }
    }

    async fetchJSON() {
        const response = await fetch('test.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async fetchXMLFeed() {
        const response = await fetch('google.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        
        // Kontrola, zda XML není prázdné nebo neobsahuje chyby
        const parseError = xml.getElementsByTagName('parsererror');
        if (parseError.length > 0) {
            throw new Error('XML parsing error');
        }
        
        return xml;
    }

    async processFeedData(xmlDoc) {
        const entries = xmlDoc.getElementsByTagName('entry');
        
        if (!entries || entries.length === 0) {
            throw new Error('XML feed neobsahuje žádné položky');
        }
        
        for (const entry of entries) {
            const productData = {
                id: this.getElementText(entry, 'g:id'),
                price: this.getElementText(entry, 'g:price'),
                availability: this.getElementText(entry, 'g:availability'),
                imageLink: this.getElementText(entry, 'g:image_link'),
                link: this.getElementText(entry, 'link')
            };
            
            // Kontrola, zda máme všechna požadovaná data
            if (!productData.id) continue;
            
            this.feedData.set(productData.id, productData);
        }
    }

    getElementText(parent, tagName) {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent : '';
    }

    getFeedDataForTank(tankCode) {
        return this.feedData.get(tankCode) || {
            price: 'Cena na dotaz',
            availability: 'out of stock',
            imageLink: '/api/placeholder/200/200',
            link: '#'
        };
    }

    handleError() {
        if (this.tanksContainer) {
            this.tanksContainer.innerHTML = `
                <div class="destovka-error-message">
                    <div class="destovka-error-message-content">
                        <p>Omlouváme se, ale došlo k chybě při načítání dat.</p>
                        <button class="destovka-error-retry" onclick="window.destovkaTankManager = new DestovkaTankManager()">
                            Zkusit znovu
                        </button>
                    </div>
                </div>
            `;
        }
    }

    renderTanks() {
        if (!this.tanksContainer) return;
    
        const filteredTanks = this.tankFilter 
            ? this.tankFilter.filterTanks(this.tanksData)
            : this.tanksData;
        
        if (filteredTanks.length === 0) {
            this.renderNoResults();
            return;
        }
    
        this.tanksContainer.innerHTML = '';
        
        filteredTanks.forEach((tankData, index) => {
            const feedData = this.getFeedDataForTank(tankData.Kód);
            const tankElement = this.createTankElement(tankData, feedData, index === 0);
            this.tanksContainer.appendChild(tankElement);
        });
    }

    createTankElement(data, feedData, isRecommended) {
        const tankDiv = document.createElement('div');
        tankDiv.className = 'destovka-tank-box';
        
        // Kontrola jestli je nádrž již v košíku
        const isSelected = window.destovkaCart?.destGetItemsByStep(2)
            .some(item => item.productCode === data['Kód']);
        
        if (isSelected) {
            tankDiv.classList.add('destovka-tank-box-selected');
        }
    
        const availability = this.formatAvailability(feedData.availability);
        const price = this.formatPrice(feedData.price);
    
        tankDiv.innerHTML = `
            ${isRecommended ? '<div class="destovka-tank-badge">DOPORUČUJEME</div>' : ''}
            <div class="destovka-tank-content">
                <div class="destovka-tank-visuals">
                    <div class="destovka-tank-main">
                        <img src="${feedData.imageLink}" 
                             alt="${data['Typ nádrže']} ${data['Objemové označení']}"
                             onerror="this.src='/api/placeholder/200/200'" />
                    </div>
                </div>
                <div class="destovka-tank-info">
                    <div class="destovka-tank-item">
                        <div class="destovka-tank-item-name">
                            ${data['Typ nádrže']} ${data['Objemové označení']}
                        </div>
                        <div class="destovka-tank-item-code">kód ${data['Kód']}</div>
                        <div class="destovka-tank-availability ${availability.className}">
                            ${availability.text}
                        </div>
                    </div>
                </div>
                <div class="destovka-tank-actions">
                    <div class="destovka-tank-total-price">${price}</div>
                    <div class="destovka-tank-action-buttons">
                        <button class="destovka-tank-select ${isSelected ? 'destovka-tank-select-selected' : ''}" 
                                ${availability.isAvailable && !isSelected ? '' : 'disabled'}
                                data-tank-code="${data['Kód']}">
                            ${isSelected ? 'Vybráno' : (availability.isAvailable ? 'Vybrat' : 'Nedostupné')}
                        </button>
                        <button class="destovka-tank-details-btn" data-tank-id="${data['Kód']}">
                            ${isSelected ? 'Skrýt informace o nádrži' : 'Zobrazit informace o nádrži'}
                        </button>
                    </div>
                </div>
            </div>
            <div class="destovka-tank-details" id="details-${data['Kód']}">
                <table class="destovka-tank-specs">
                    ${this.generateSpecsRows(data)}
                </table>
            </div>`;
    
        this.initializeDetailsToggle(tankDiv);
        this.initializeTankSelection(tankDiv, data, feedData);
        return tankDiv;
    }

    initializeTankSelection(tankElement, tankData, feedData) {
        const selectButton = tankElement.querySelector('.destovka-tank-select');
        
        selectButton.addEventListener('click', () => {
            // Zkontrolujeme jestli již není nějaká nádrž vybraná
            const currentTank = window.destovkaCart?.destGetItemsByStep(2)[0];
            
            if (currentTank) {
                // Pokud je to stejná nádrž, ignore
                if (currentTank.productCode === tankData['Kód']) return;
                
                // Jinak se zeptáme uživatele
                if (!confirm('Již máte vybranou nádrž. Chcete ji nahradit novou?')) {
                    return;
                }
                // Odstraníme starou nádrž
                window.destovkaCart.destRemoveItem(currentTank.productCode);
            }
    
            // Přidáme novou nádrž
            window.destovkaCart.destAddItem(2, tankData['Kód'], 1, {
                name: `${tankData['Typ nádrže']} ${tankData['Objemové označení']}`,
                price: this.extractPrice(feedData.price),
                volume: tankData['Objem (l)'],
                imageUrl: feedData.imageLink || 'none'
            });
    
            // Překreslíme nádrže pro aktualizaci vizuální indikace
            this.renderTanks();
        });
    }

    formatAvailability(availability) {
        switch (availability) {
            case 'in stock':
                return {
                    text: 'Skladem',
                    className: 'destovka-availability-instock',
                    isAvailable: true
                };
            case 'out of stock':
                return {
                    text: 'Není skladem',
                    className: 'destovka-availability-outstock',
                    isAvailable: false
                };
            default:
                return {
                    text: 'Na dotaz',
                    className: 'destovka-availability-request',
                    isAvailable: false
                };
        }
    }

    formatPrice(price) {
        if (!price) return 'Cena na dotaz';
        
        const [value, currency] = price.split(' ');
        return `${parseInt(value).toLocaleString('cs-CZ')} Kč`;
    }

    generateSpecsRows(data) {
        const specs = [
            { label: 'Konstrukce', key: 'Konstrukce' },
            { label: 'Objem (l)', key: 'Objem (l)' },
            { label: 'Délka (mm)', key: 'Délka (mm)' },
            { label: 'Šířka (mm)', key: 'Šířka (mm)' },
            { label: 'Výška (mm)', key: 'Výška (mm)' },
            { label: 'Hmotnost (kg)', key: 'Hmotnost' },
            { label: 'Záruka (let)', key: 'Záruka (let)' },
            { label: 'Max. překrytí zeminou (mm)', key: 'Max. překrytí zeminou (mm)' },
            { label: 'Vhodné do jílovité půdy', key: 'Vhodné do jílovité půdy' },
            { label: 'Integrovaný filtrační koš', key: 'Integrovaný filtrační koš' },
            { label: 'Integrovaný bezpečnostní přepad', key: 'Integrovaný bezpečnostní přepad (sifon)' },
            { label: 'Poklop v ceně', key: 'Poklop v ceně (žádný/nepochozí/pochozí/do 1,5 t/do 3,5 t/do 12,5 t/do 40 t' }
        ];

        return specs
            .map(spec => `
                <tr>
                    <td>${spec.label}</td>
                    <td>${data[spec.key] || '-'}</td>
                </tr>
            `)
            .join('');
    }

    initializeDetailsToggle(tankElement) {
        const detailsBtn = tankElement.querySelector('.destovka-tank-details-btn');
        const details = tankElement.querySelector('.destovka-tank-details');

        detailsBtn.addEventListener('click', () => {
            const isVisible = details.classList.contains('destovka-active');
            details.classList.toggle('destovka-active');
            detailsBtn.textContent = isVisible ? 
                'Zobrazit informace o nádrži' : 
                'Skrýt informace o nádrži';
        });
    }

    extractPrice(priceString) {
        if (!priceString) return 0;
        return parseInt(priceString.replace(/[^0-9]/g, ''));
    }
}

class DestovkaAccessoriesManager {
    constructor() {
        this.container = document.querySelector('#destovka-step3');
        this.accessoriesData = [];
        this.feedData = new Map();
        this.productGenerator = window.productStructureGenerator;
        this.init();
    }

    async init() {
        try {
            await Promise.all([
                this.loadAccessoriesData(),
                this.loadXMLFeed()
            ]);
            this.initProductContainer();
            this.updateDisplay();
        } catch (error) {
            console.error('Chyba při inicializaci AccessoriesManager:', error);
            this.handleError();
        }
    }

    async loadAccessoriesData() {
        const response = await fetch('jsony/nastavec.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.accessoriesData = await response.json();
    }

    async loadXMLFeed() {
        const response = await fetch('google.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        
        const entries = xml.getElementsByTagName('entry');
        for (const entry of entries) {
            const productData = {
                id: this.getElementText(entry, 'g:id'),
                price: this.getElementText(entry, 'g:price'),
                availability: this.getElementText(entry, 'g:availability'),
                imageLink: this.getElementText(entry, 'g:image_link'),
                link: this.getElementText(entry, 'link')
            };
            
            if (!productData.id) continue;
            this.feedData.set(productData.id, productData);
        }
    }

    getElementText(parent, tagName) {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent : '';
    }

    getFeedDataForProduct(code) {
        return this.feedData.get(code) || {
            price: 'Cena na dotaz',
            availability: 'out of stock',
            imageLink: '/api/placeholder/200/200',
            link: '#'
        };
    }

    initProductContainer() {
        let productContainer = this.container.querySelector('.destovka-products-container');
        if (!productContainer) {
            productContainer = document.createElement('div');
            productContainer.className = 'destovka-products-container';
            const heading = this.container.querySelector('h1');
            if (heading) {
                heading.insertAdjacentElement('afterend', productContainer);
            } else {
                this.container.appendChild(productContainer);
            }
        }
        this.productContainer = productContainer;
    }

    filterAccessories() {
        const selectedTank = window.destovkaCart?.destGetItemsByStep(2)[0];
        if (!selectedTank) return [];

        const tankData = window.destovkaTankManager?.tanksData.find(
            tank => tank['Kód'] === selectedTank.productCode
        );
        if (!tankData) return [];

        return this.accessoriesData.filter(accessory => 
            accessory['Systém'] === tankData['Systém']
        );
    }

    updateDisplay() {
        const filteredAccessories = this.filterAccessories();
        
        if (!this.productContainer) return;
    
        if (filteredAccessories.length === 0) {
            this.productContainer.innerHTML = `
                <div class="destovka-no-results">
                    Pro vybranou nádrž nejsou k dispozici žádné nástavce
                </div>`;
            return;
        }
    
        this.productContainer.innerHTML = '';
        
        filteredAccessories.forEach(accessory => {
            const feedData = this.getFeedDataForProduct(accessory.Kód);
            const productData = {
                'Produkt': accessory.Název,
                'Kód': accessory.Kód,
                'Varianta': `Výška: ${accessory['Výška (mm)']} mm`
            };
            const productHtml = this.productGenerator.createProductItem(productData, feedData);
            this.productContainer.innerHTML += productHtml;
        });
    
        // Inicializujeme event listenery pro výběr produktů
        this.productGenerator.initializeSelection(this.productContainer);
    }

    handleError() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="destovka-error-message">
                    <p>Omlouváme se, ale došlo k chybě při načítání dat nástavců.</p>
                    <button onclick="window.destovkaAccessoriesManager = new DestovkaAccessoriesManager()">
                        Zkusit znovu
                    </button>
                </div>`;
        }
    }
}

class DestovkaFiltrationManager {
    constructor() {
        this.filtraceData = [];
        this.filteredProducts = [];
        this.container = document.getElementById('destovka-step4');
        this.productGenerator = window.productStructureGenerator;
        this.feedData = new Map();
        this.init();
    }
 
    async init() {
        try {
            await Promise.all([
                this.loadFiltrationData(),
                this.loadXMLFeed()
            ]);
            this.initProductContainer();
            this.updateDisplay();
        } catch (error) {
            console.error('Chyba při inicializaci FiltrationManager:', error);
            this.handleError();
        }
    }
 
    async loadFiltrationData() {
        const response = await fetch('jsony/filtrace.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.filtraceData = await response.json();
    }
 
    async loadXMLFeed() {
        const response = await fetch('google.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        
        const entries = xml.getElementsByTagName('entry');
        for (const entry of entries) {
            const productData = {
                id: this.getElementText(entry, 'g:id'),
                price: this.getElementText(entry, 'g:price'),
                availability: this.getElementText(entry, 'g:availability'),
                imageLink: this.getElementText(entry, 'g:image_link'),
                link: this.getElementText(entry, 'link')
            };
            
            if (!productData.id) continue;
            this.feedData.set(productData.id, productData);
        }
    }
 
    getElementText(parent, tagName) {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent : '';
    }
 
    getFeedDataForProduct(code) {
        const feedData = this.feedData.get(code);
        if (!feedData) {
            console.log(`Feed data not found for product code: ${code}`);
            return {
                price: 'Cena na dotaz',
                availability: 'out of stock',
                imageLink: 'img/delete.png',
                link: '#'
            };
        }
        return feedData;
    }
 
    initProductContainer() {
        let productContainer = this.container.querySelector('.destovka-products-container');
        if (!productContainer) {
            productContainer = document.createElement('div');
            productContainer.className = 'destovka-products-container';
            const heading = this.container.querySelector('h1');
            if (heading) {
                heading.insertAdjacentElement('afterend', productContainer);
            } else {
                this.container.appendChild(productContainer);
            }
        }
        this.productContainer = productContainer;
    }
 
    filterProducts() {
        const selectedTank = window.destovkaCart?.destGetItemsByStep(2)[0];
        if (!selectedTank) return [];
    
        const tankData = window.destovkaTankManager?.tanksData.find(
            tank => tank['Kód'] === selectedTank.productCode
        );
        if (!tankData) return [];
    
        const formData = window.destovkaStepManager?.formData || new Map();
        // Přidáme prefix "DN" k hodnotě z formuláře
        const inflowDiameter = formData.get('inflowDiameter') ? `DN${formData.get('inflowDiameter')}` : undefined;
    
        console.log('Filtering with inflowDiameter:', inflowDiameter);
    
        const filteredProducts = this.filtraceData.filter(product => {
            const isSystemCompatible = Array.from({length: 13}, (_, i) => i + 1).some(i => {
                const sysKey = `Kompatibilsys${i}`;
                return product[sysKey] === tankData['Systém'] || product[sysKey] === 'nezáleží';
            });
            
            const isDiameterCompatible = 
                product['Průměr nátoku'] === 'nezáleží' || 
                product['Průměr nátoku'] === inflowDiameter;
                    
            return isSystemCompatible && isDiameterCompatible;
        });
    
        this.logFilteringDiagnostics(tankData, formData, filteredProducts);
        return filteredProducts;
    }
 
    updateDisplay() {
        this.filteredProducts = this.filterProducts();
        
        if (!this.productContainer) return;
    
        if (this.filteredProducts.length === 0) {
            this.productContainer.innerHTML = `
                <div class="destovka-no-results">
                    Pro vybrané parametry nebyla nalezena žádná kompatibilní filtrace.
                </div>`;
            return;
        }
    
        this.productContainer.innerHTML = '';
        
        // Omezíme počet produktů na 2
        const productsToShow = this.filteredProducts.slice(0, 2);
        
        // Přidáme produkty
        productsToShow.forEach(product => {
            const feedData = this.getFeedDataForProduct(product.Kód);
            const productHtml = this.productGenerator.createProductItem(product, feedData);
            this.productContainer.innerHTML += productHtml;
        });
    
        // Přidáme prázdný produkt
        const emptyProductHtml = this.productGenerator.createEmptyProductItem();
        this.productContainer.innerHTML += emptyProductHtml;
    
        // Inicializujeme event listenery pro výběr produktů - TOHLE CHYBĚLO
        this.productGenerator.initializeSelection(this.productContainer);
    }
    
 
    handleError() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="destovka-error-message">
                    <p>Omlouváme se, ale došlo k chybě při načítání dat filtrace.</p>
                    <button onclick="window.destovkaFiltrationManager = new DestovkaFiltrationManager()">
                        Zkusit znovu
                    </button>
                </div>`;
        }
    }

    logFilteringDiagnostics(tankData, formData, filteredProducts) {
        console.group('Diagnostika filtrace produktů');
        console.log('Vstupní parametry:');
        console.log(`- Systém nádrže: ${tankData['Systém']}`);
        console.log(`- Průměr nátoku: ${formData.get('inflowDiameter')}`);
    
        console.log('\nZkontrolované produkty:');
        this.filtraceData.forEach(product => {
            console.group(`${product.Produkt} (${product.Kód})`);
            
            const systemMatch = Array.from({length: 13}, (_, i) => i + 1).some(i => {
                const sysKey = `Kompatibilsys${i}`;
                return product[sysKey] === tankData['Systém'] || product[sysKey] === 'nezáleží';
            });
            console.log(`Kompatibilita systému: ${systemMatch ? '✓' : '✗'}`);
    
            const diameterMatch = product['Průměr nátoku'] === 'nezáleží' || 
                product['Průměr nátoku'] === formData.get('inflowDiameter');
            console.log(`Průměr nátoku: ${diameterMatch ? '✓' : '✗'} (${product['Průměr nátoku']})`);
    
            const isSelected = filteredProducts.some(p => p.Kód === product.Kód);
            console.log(`Výsledek: ${isSelected ? 'VYBRÁNO' : 'VYŘAZENO'}`);
            
            console.groupEnd();
        });
    
        console.log('\nFinální výběr:');
        console.log(`Celkem vybráno: ${filteredProducts.length} produktů`);
        filteredProducts.forEach(product => {
            console.log(`- ${product.Produkt} (${product.Kód})`);
        });
    
        console.groupEnd();
    }
 }

 class DestovkaBaseProductManager {
    constructor(stepId) {
        this.container = document.getElementById(`destovka-step${stepId}`);
        this.productGenerator = window.productStructureGenerator;
        this.feedData = new Map();
        this.init();
    }

    async init() {
        try {
            await this.loadXMLFeed();
            this.initProductContainer();
            this.updateDisplay();
        } catch (error) {
            console.error(`Chyba při inicializaci ${this.constructor.name}:`, error);
            this.handleError();
        }
    }

    async loadXMLFeed() {
        const response = await fetch('google.xml');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        
        const entries = xml.getElementsByTagName('entry');
        for (const entry of entries) {
            const productData = {
                id: this.getElementText(entry, 'g:id'),
                price: this.getElementText(entry, 'g:price'),
                availability: this.getElementText(entry, 'g:availability'),
                imageLink: this.getElementText(entry, 'g:image_link'),
                link: this.getElementText(entry, 'link')
            };
            
            if (!productData.id) continue;
            this.feedData.set(productData.id, productData);
        }
    }

    getElementText(parent, tagName) {
        const element = parent.getElementsByTagName(tagName)[0];
        return element ? element.textContent : '';
    }

    getFeedDataForProduct(code) {
        return this.feedData.get(code) || {
            price: 'Cena na dotaz',
            availability: 'out of stock',
            imageLink: '/api/placeholder/200/200',
            link: '#'
        };
    }

    initProductContainer() {
        let productContainer = this.container.querySelector('.destovka-products-container');
        if (!productContainer) {
            productContainer = document.createElement('div');
            productContainer.className = 'destovka-products-container';
            const heading = this.container.querySelector('h1');
            if (heading) {
                heading.insertAdjacentElement('afterend', productContainer);
            } else {
                this.container.appendChild(productContainer);
            }
        }
        this.productContainer = productContainer;
    }

    // Metoda, kterou budou dědit potomci
    getProducts() {
        throw new Error('getProducts musí být implementována v potomkovi');
    }

    showNoResults(message = 'Nebyly nalezeny žádné produkty') {
        this.productContainer.innerHTML = `
            <div class="destovka-no-results">
                <div class="destovka-no-results-content">
                    <h3>${message}</h3>
                </div>
            </div>`;
    }

    updateDisplay() {
        if (!this.productContainer) return;

        const products = this.getProducts();
        
        if (!products || products.length === 0) {
            this.showNoResults();
            return;
        }

        this.productContainer.innerHTML = '';
        
        products.forEach(product => {
            const feedData = this.getFeedDataForProduct(product.Kód);
            const productHtml = this.productGenerator.createProductItem(product, feedData);
            this.productContainer.innerHTML += productHtml;
        });

        this.productGenerator.initializeSelection(this.productContainer);
    }

    handleError() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="destovka-error-message">
                    <p>Omlouváme se, ale došlo k chybě při načítání dat.</p>
                    <button onclick="window.${this.constructor.name.toLowerCase()} = new ${this.constructor.name}()">
                        Zkusit znovu
                    </button>
                </div>`;
        }
    }
}

class DestovkaSiphonManager extends DestovkaBaseProductManager {
    constructor() {
        super(5);
        this.siphonCode = '19526';
    }

    shouldShowSiphon() {
        const selectedTank = window.destovkaCart?.destGetItemsByStep(2)[0];
        if (!selectedTank) return false;

        const tankData = window.destovkaTankManager?.tanksData.find(
            tank => tank['Kód'] === selectedTank.productCode
        );
        
        return tankData && tankData['Integrovaný bezpečnostní přepad (sifon)'] === 'NE';
    }

    updateDisplay() {
        if (!this.productContainer) return;

        if (!this.shouldShowSiphon()) {
            this.showNoResults('Bezpečnostní přepad není potřeba - nádrž již obsahuje integrovaný přepad');
            return;
        }

        this.productContainer.innerHTML = '';
        
        // Přidáme sifon
        const siphonData = {
            'Produkt': 'Bezpečnostní přepad - sifon',
            'Kód': this.siphonCode,
            'Varianta': 'DN100/110'
        };
        
        const feedData = this.getFeedDataForProduct(this.siphonCode);
        const productHtml = this.productGenerator.createProductItem(siphonData, feedData);
        this.productContainer.innerHTML += productHtml;

        // Přidáme prázdný produkt
        const emptyProductHtml = this.productGenerator.createEmptyProductItem();
        this.productContainer.innerHTML += emptyProductHtml;

        // Inicializujeme event listenery
        this.productGenerator.initializeSelection(this.productContainer);
    }
}




// Inicializace manageru při načtení DOMu
document.addEventListener('DOMContentLoaded', () => {
    window.destovkaTankManager = new DestovkaTankManager();
});






// Initialize the calculator
window.destovkaKonfigCalculator = new DestovkaKonfigCalculator();





