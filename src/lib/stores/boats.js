import { writable } from 'svelte/store';

export const createEmptyBoat = () => ({
    id: Date.now(),
    basicInfo: {
        manufacturer: '',
        price: 0,
        year: '',
        location: '',
        notes: '',
        hyperlink: '',
        imageUrl: ''
    },
    costToSail: {
        sails: 0,
        standingRigging: 0,
        anchors: 0,
        rRigging: 0,
        bottomJob: 0,
        dingy: 0,
        engine: 0,
        lifeRaft: 0,
        chain: 0,
        epirb: 0
    },
    upgrades: {
        autoPilot: 0,
        waterMaker: 0,
        gennie: 0,
        inverter: 0,
        solar: 0,
        batteries: 0,
        ais: 0,
        windvane: 0,
        thruster: 0,
        radar: 0,
        anchors: 0
    },
    costOfAquisition: {
        stateTax: 0,
        importTax: 0,
        registration: 0,
        airFair: 0,
        lodging: 0,
        captain: 0,
        insurance: 0,
        misc: 0
    }
});

export const calculateSectionTotal = (section) => {
    return Object.values(section).reduce((sum, cost) => sum + (cost || 0), 0);
};

export const calculateTotalCost = (boat) => {
    const basePrice = boat.basicInfo.price || 0;
    const costToSailTotal = calculateSectionTotal(boat.costToSail);
    const upgradesTotal = calculateSectionTotal(boat.upgrades);
    const acquisitionTotal = calculateSectionTotal(boat.costOfAquisition);
    
    return basePrice + costToSailTotal + upgradesTotal + acquisitionTotal;
};

export const boats = writable([]);