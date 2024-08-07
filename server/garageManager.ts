import { distance } from '@Shared/utility/vector.js';
import * as alt from 'alt-server';
import { config } from 'dotenv';
import garageList from '../shared/config.js';

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
    for (const newGarage of garageList) 
       initializeGarage(newGarage.garageId, newGarage.position, newGarage.slots);

    return garages;
}


export function getAvailableSlots(slots : Slot[]) : Slot {
    let allVehicles = alt.Vehicle.all;
    if (allVehicles.length == 0) 
        return slots[0];

    let availableSlots = [];


    let findCloseVehicle = false;
    for (const slot of slots) {
        for (const veh of allVehicles) {

            if (distance(slot.position, veh.pos) < 1) {
                findCloseVehicle = true;
                break;
            }
        }

        if (!findCloseVehicle)
            availableSlots.push(slot);


        findCloseVehicle = false;
    }

    if (availableSlots.length == 0)
        return null

    const randomIndex = Math.floor(Math.random() * availableSlots.length);
    return availableSlots[randomIndex];
}









