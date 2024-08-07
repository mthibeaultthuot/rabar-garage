import * as alt from 'alt-server';

export interface Slot {
    position: alt.Vector3;  
    rotation: alt.Vector3;  
    occupied: boolean;
    vehicleId?: string; 
}

export interface Garage {
    position: alt.Vector3;  
    slots: Slot[];
}

type Garages = Map<string, Garage>;  


const garages: Garages = new Map();



function initializeGarage(garageId: string, position: alt.Vector3, slots : Slot[]): void {
    garages.set(garageId, {
        position,
        slots,
    });
}



export const getGarages = () => {
    initializeGarage('Downtown Garage', new alt.Vector3(-904.01574703125, -144.3735809326172, 40.8829641723633),  [{
        position: new alt.Vector3(-901.5217895507812, -160.71817016601562, 41.8793556958008),
        rotation : new alt.Vector3(0, 0, 0.45116081833839417),
        occupied : false
    }]);
    return garages;
}









