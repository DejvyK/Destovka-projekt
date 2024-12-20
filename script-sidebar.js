// Definujeme kroky
const sidebarSteps = [
    { id: 1, title: 'Vstupní parametry' },
    { id: 2, title: 'Výběr produktů' },
    { id: 3, title: 'Příslušenství' },
    { id: 4, title: 'Filtrace' },
    { id: 5, title: 'Čerpadla' },
    { id: 6, title: 'Přepady' },
    { id: 7, title: 'Poklopy' },
    { id: 8, title: 'Šachty' },
    { id: 9, title: 'Doprava' },
    { id: 10, title: 'Souhrn' },
    { id: 11, title: 'Dokončení' }
];

// Aktuální krok
let currentStep = 1;

// Funkce pro vykreslení kroků
function renderSteps() {
    const stepsList = document.getElementById('stepsList');
    if (!stepsList) {
        console.error('Element stepsList nebyl nalezen');
        return;
    }

    stepsList.innerHTML = sidebarSteps.map(((step, index) => `
            ${index !== 0 && index < currentStep ? '<div class="destovka-step-line"></div>' : ''}
            <div class="destovka-step ${step.id === currentStep ? 'destovka-step-active' : ''} 
                ${step.id < currentStep ? 'destovka-step-completed' : ''}">
                <div class="destovka-step-number">
                    ${step.id < currentStep ? '✓' : step.id}
                </div>
                <div class="destovka-step-title">${step.title}</div>
            </div>
        `)
    ).join('');
}

// Funkce pro změnu kroku - bude volána z hlavní aplikace
function setStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= sidebarSteps.length) {
        currentStep = stepNumber;
        renderSteps();
    }
}

// První vykreslení kroků
renderSteps();

// Export funkce pro použití v hlavní aplikaci
window.destovkaSidebar = {
    setStep: setStep
};