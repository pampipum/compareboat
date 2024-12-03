import { writable } from 'svelte/store';

export interface BoatBasicInfo {
    manufacturer: string;
    price: number;
    year: string;
    location: string;
    notes: string;
    hyperlink: string;
    imageUrl?: string;
}

export interface CostToSail {
    sails: number;
    standingRigging: number;
    anchors: number;
    rRigging: number;
    bottomJob: number;
    dingy: number;
    engine: number;
    lifeRaft: number;
    chain: number;
    epirb: number;
}

export interface Upgrades {
    autoPilot: number;
    waterMaker: number;
    gennie: number;
    inverter: number;
    solar: number;
    batteries: number;
    ais: number;
    windvane: number;
    thruster: number;
    radar: number;
    anchors: number;
}

export interface CostOfAquisition {
    stateTax: number;
    importTax: number;
    registration: number;
    airFair: number;
    lodging: number;
    captain: number;
    insurance: number;
    misc: number;
}

export interface Boat {
    id: number;
    basicInfo: BoatBasicInfo;
    costToSail: CostToSail;
    upgrades: Upgrades;
    costOfAquisition: CostOfAquisition;
}

const createEmptyBoat = (): Boat => ({
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

const calculateSectionTotal = (section: Record<string, number>): number => {
    return Object.values(section).reduce((sum, cost) => sum + (cost || 0), 0);
};

const calculateTotalCost = (boat: Boat): number => {
    const basePrice = boat.basicInfo.price || 0;
    const costToSailTotal = calculateSectionTotal(boat.costToSail);
    const upgradesTotal = calculateSectionTotal(boat.upgrades);
    const acquisitionTotal = calculateSectionTotal(boat.costOfAquisition);
    
    return basePrice + costToSailTotal + upgradesTotal + acquisitionTotal;
};

export const boats = writable<Boat[]>([]);

export {
    createEmptyBoat,
    calculateSectionTotal,
    calculateTotalCost
};