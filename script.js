//zde bude obecný kód

class DestovkaStepManager {
    constructor() {
        this.currentStep = 1;
        this.maxSteps = 11;
        this.initializeButtons();
        this.updateButtonsState();
        this.initializeValidation();
        this.formData = new Map();
    }

    initializeButtons() {
        // Přidat event listenery ke všem tlačítkům
        document.querySelectorAll('.destovka-button-next').forEach(button => {
            button.addEventListener('click', () => this.handleNextStep());
        });
        
        document.querySelectorAll('.destovka-button-back').forEach(button => {
            button.addEventListener('click', () => this.handlePreviousStep());
        });
    }

    initializeValidation() {
        this.validationRules = {
            volumeRange: { required: true },
            concrete: { required: true },
            soil: { required: true },
            hsvDepth: { required: true, min: 0, max: 1000 },
            load: { required: true },
            inflowDiameter: { required: true },
            outflowDiameter: { required: true },
            inflowDepth: { required: true, min: 0, max: 1000 }
        };
    }

    validateStep(step) {
        if (step === 1) {
            const errors = [];
            const fields = Object.keys(this.validationRules);
            
            fields.forEach(fieldId => {
                const element = document.getElementById(fieldId);
                if (!element) return;

                const rules = this.validationRules[fieldId];
                const value = element.value;

                if (rules.required && !value) {
                    errors.push(fieldId);
                }
                if (value && rules.min !== undefined && value < rules.min) {
                    errors.push(fieldId);
                }
                if (value && rules.max !== undefined && value > rules.max) {
                    errors.push(fieldId);
                }
            });

            if (errors.length > 0) {
                this.showErrors(errors);
                return false;
            }
            this.clearErrors();
            return true;
        }
        return true;
    }

    showErrors(errorFields) {
        this.clearErrors();

        const errorBanner = document.createElement('div');
        errorBanner.className = 'destovka-error-banner';
        errorBanner.textContent = 'Prosím vyplňte všechna povinná pole';
        
        document.body.appendChild(errorBanner);

        errorFields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                element.classList.add('destovka-input-error');
                const label = element.closest('.destovka-input-wrapper')?.querySelector('.destovka-label');
                if (label) {
                    label.classList.add('destovka-label-error');
                }
            }
        });

        setTimeout(() => {
            errorBanner.classList.add('destovka-fade-out');
            setTimeout(() => {
                errorBanner.remove();
            }, 300);
        }, 3000);
    }

    clearErrors() {
        document.querySelectorAll('.destovka-input-error, .destovka-label-error')
            .forEach(el => el.classList.remove('destovka-input-error', 'destovka-label-error'));
        
        const errorBanner = document.querySelector('.destovka-error-banner');
        if (errorBanner) {
            errorBanner.remove();
        }
    }

    saveFormData() {
        if (this.currentStep === 1) {
            this.formData.set('volume', document.getElementById('volumeRange')?.value);
            this.formData.set('concrete', document.getElementById('concrete')?.value);
            this.formData.set('soil', document.getElementById('soil')?.value);
            this.formData.set('hsvDepth', document.getElementById('hsvDepth')?.value);
            this.formData.set('load', document.getElementById('load')?.value);
            this.formData.set('inflowDiameter', document.getElementById('inflowDiameter')?.value);
            this.formData.set('outflowDiameter', document.getElementById('outflowDiameter')?.value);
            this.formData.set('inflowDepth', document.getElementById('inflowDepth')?.value);
        }
    }

    restoreFormData() {
        if (this.currentStep === 1 && this.formData.size > 0) {
            document.getElementById('volumeRange').value = this.formData.get('volume') || '';
            document.getElementById('concrete').value = this.formData.get('concrete') || '';
            document.getElementById('soil').value = this.formData.get('soil') || '';
            document.getElementById('hsvDepth').value = this.formData.get('hsvDepth') || '';
            document.getElementById('load').value = this.formData.get('load') || '';
            document.getElementById('inflowDiameter').value = this.formData.get('inflowDiameter') || '';
            document.getElementById('outflowDiameter').value = this.formData.get('outflowDiameter') || '';
            document.getElementById('inflowDepth').value = this.formData.get('inflowDepth') || '';

            if (window.volumeRange) {
                window.volumeRange.updateValue(this.formData.get('volume'));
            }
        }
    }

    handlePreviousStep() {
        if (this.currentStep > 1) {
            if (this.currentStep === 2) {
                // Použijeme nativní confirm dialog
                const confirmed = confirm("Pozor, návratem na první stránku konfigurátoru začnete znovu, opravdu chcete pokračovat?");
                if (confirmed) {
                    this.formData.clear();  // Vymazat uložená data
                    this.changeStep(1);
                }
                return;
            }
            this.changeStep(this.currentStep - 1);
        }
    }

    handleNextStep() {
        if (this.currentStep === 2) {
            const selectedTank = window.destovkaCart?.destGetItemsByStep(2)[0];
            if (!selectedTank) {
                alert('Prosím vyberte nádrž před pokračováním.');
                return;
            }
        }
    
        if (this.currentStep < this.maxSteps && this.validateStep(this.currentStep)) {
            this.saveFormData();
            this.changeStep(this.currentStep + 1);
        }
    }

    changeStep(newStep) {
        // Hide current step
        const currentContent = document.getElementById(`destovka-step${this.currentStep}`);
        if (currentContent) {
            currentContent.classList.remove('destovka-active');
        }
    
        // Show new step
        const newContent = document.getElementById(`destovka-step${newStep}`);
        if (newContent) {
            newContent.classList.add('destovka-active');
        }
    
        this.currentStep = newStep;
        
        // Přidáme tuto podmínku
        if (newStep === 2 && window.destovkaTankManager) {
            window.destovkaTankManager.updateTankDisplay(this.formData);
        }
        
        if (window.destovkaSidebar) {
            window.destovkaSidebar.setStep(this.currentStep);
        }
        
        if (newStep === 1) {
            this.restoreFormData();
        }
        
        this.updateButtonsState();
    }

    updateButtonsState() {
        document.querySelectorAll('.destovka-button-back').forEach(button => {
            button.classList.toggle('destovka-button-disabled', this.currentStep === 1);
        });
        
        document.querySelectorAll('.destovka-button-next').forEach(button => {
            button.classList.toggle('destovka-button-disabled', this.currentStep === this.maxSteps);
        });
    }
}

class UnitConverter {
    constructor() {
        this.units = ['mm', 'cm', 'm'];
        this.conversionFactors = {
            'mm': { 'cm': 0.1, 'm': 0.001 },
            'cm': { 'mm': 10, 'm': 0.01 },
            'm': { 'mm': 1000, 'cm': 100 }
        };
        this.initializeUnitButtons();
    }

    initializeUnitButtons() {
        const unitButtons = document.querySelectorAll('.destovka-unit-button');
        
        unitButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleUnitChange(e));
        });
    }

    handleUnitChange(event) {
        const button = event.target;
        const currentUnit = button.getAttribute('data-current-unit');
        const input = button.parentElement.querySelector('input');
        const currentValue = parseFloat(input.value) || 0;

        // Najít další jednotku v cyklu
        const currentIndex = this.units.indexOf(currentUnit);
        const nextIndex = (currentIndex + 1) % this.units.length;
        const nextUnit = this.units[nextIndex];

        // Převést hodnotu
        const convertedValue = this.convertValue(currentValue, currentUnit, nextUnit);
        input.value = convertedValue;

        // Aktualizovat tlačítko
        button.textContent = nextUnit;
        button.setAttribute('data-current-unit', nextUnit);
    }

    convertValue(value, fromUnit, toUnit) {
        if (fromUnit === toUnit) return value;

        const factor = this.conversionFactors[fromUnit][toUnit];
        return (value * factor).toFixed(2);
    }
}

class VolumeRangeHandler {
    constructor() {
        this.range = document.getElementById('volumeRange');
        this.valueDisplay = document.getElementById('volumeValue');
        
        if (this.range && this.valueDisplay) {
            this.initializeRange();
        }
    }

    initializeRange() {
        this.updateValue(this.range.value);
        
        this.range.addEventListener('input', (e) => {
            this.updateValue(e.target.value);
        });
    }

    updateValue(value) {
        // Formátování čísla s mezerami po tisících
        this.valueDisplay.textContent = Number(value).toLocaleString('cs-CZ');
    }
}

class TooltipHandler {
    constructor() {
        this.tooltips = document.querySelectorAll('.destovka-tooltip');
        this.initializeTooltips();
    }

    initializeTooltips() {
        this.tooltips.forEach(tooltip => {
            const content = tooltip.querySelector('.destovka-tooltip-content');
            
            tooltip.addEventListener('mouseenter', (e) => {
                this.positionTooltip(e, content);
            });

            // Update position on scroll
            window.addEventListener('scroll', () => {
                if (content.style.display === 'flex') {
                    this.positionTooltip(tooltip, content);
                }
            });
        });
    }

    positionTooltip(event, content) {
        const tooltip = event.target.closest('.destovka-tooltip');
        const rect = tooltip.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        
        // Calculate available space
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Default position (below tooltip)
        let top = rect.bottom + 8;
        let left = rect.left - (contentRect.width / 2) + (rect.width / 2);
        
        // Check if tooltip would go off bottom of screen
        if (top + contentRect.height > viewportHeight) {
            top = rect.top - contentRect.height - 8;
        }
        
        // Check if tooltip would go off right of screen
        if (left + contentRect.width > viewportWidth) {
            left = viewportWidth - contentRect.width - 8;
        }
        
        // Check if tooltip would go off left of screen
        if (left < 8) {
            left = 8;
        }
        
        content.style.top = `${top}px`;
        content.style.left = `${left}px`;
    }
}

class DestovkaCart {
    constructor() {
        this.destItems = new Map(); // Přejmenováno na destItems
        this.destStepLimits = {     // Přejmenováno na destStepLimits
            2: { maxItems: 1, type: 'tank' },
            3: { maxItems: null, type: 'accessory' },
            4: { maxItems: null, type: 'accessory' },
            5: { maxItems: null, type: 'pump' },
            6: { maxItems: null, type: 'component' },
            7: { maxItems: null, type: 'component' },
            8: { maxItems: null, type: 'component' },
            9: { maxItems: 1, type: 'delivery' }
        };
        
        this.destLoadFromStorage();
    }

    destAddItem(step, productCode, quantity = 1, metadata = {}) {
        if (!this.destValidateStepLimit(step, productCode)) {
            console.error(`Překročen limit pro krok ${step}`);
            return false;
        }

        const newItem = {
            step,
            quantity,
            ...metadata,
            addedAt: new Date().toISOString()
        };

        this.destItems.set(productCode, newItem);
        this.destSaveToStorage();
        return true;
    }

    destAddBatch(step, products) {
        let allSuccess = true;
        
        products.forEach(product => {
            const success = this.destAddItem(
                step, 
                product.productCode, 
                product.quantity, 
                product.metadata
            );
            if (!success) allSuccess = false;
        });

        return allSuccess;
    }

    destValidateStepLimit(step, newProductCode) {
        const limit = this.destStepLimits[step];
        if (!limit) return true;

        if (limit.maxItems === 1) {
            const existingItems = Array.from(this.destItems.entries())
                .filter(([_, item]) => item.step === step);
            
            if (existingItems.length > 0 && !existingItems.find(([code]) => code === newProductCode)) {
                return false;
            }
        }

        return true;
    }

    destRemoveItem(productCode) {
        const removed = this.destItems.delete(productCode);
        if (removed) this.destSaveToStorage();
        return removed;
    }

    destUpdateQuantity(productCode, quantity) {
        const item = this.destItems.get(productCode);
        if (item) {
            item.quantity = quantity;
            this.destItems.set(productCode, item);
            this.destSaveToStorage();
            return true;
        }
        return false;
    }

    destGetItemsByStep(step) {
        return Array.from(this.destItems.entries())
            .filter(([_, item]) => item.step === step)
            .map(([code, item]) => ({ productCode: code, ...item }));
    }

    destGetAllItems() {
        return Array.from(this.destItems.entries())
            .map(([code, item]) => ({ productCode: code, ...item }));
    }

    destGetTotalPrice() {
        return Array.from(this.destItems.values())
            .reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
    }

    destSaveToStorage() {
        try {
            const serialized = JSON.stringify(Array.from(this.destItems.entries()));
            localStorage.setItem('destovka_cart', serialized);
        } catch (error) {
            console.error('Chyba při ukládání košíku:', error);
        }
    }

    destLoadFromStorage() {
        try {
            const serialized = localStorage.getItem('destovka_cart');
            if (serialized) {
                this.destItems = new Map(JSON.parse(serialized));
            }
        } catch (error) {
            console.error('Chyba při načítání košíku:', error);
        }
    }

    destClear() {
        this.destItems.clear();
        this.destSaveToStorage();
    }

    destExportForURL() {
        return Array.from(this.destItems.entries())
            .map(([code, item]) => ({
                c: code,             // productCode
                q: item.quantity,    // quantity
                s: item.step         // step
            }));
    }

    destImportFromURL(data) {
        this.destClear();
        data.forEach(item => {
            this.destAddItem(item.s, item.c, item.q);
        });
    }
}


const initializeConfigurator = () => {
    window.unitConverter = new UnitConverter();
    window.volumeRange = new VolumeRangeHandler();
    window.destovkaStepManager = new DestovkaStepManager();
    window.tooltipHandler = new TooltipHandler();
    window.destovkaCart = new DestovkaCart();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeConfigurator);
} else {
    initializeConfigurator();
}






