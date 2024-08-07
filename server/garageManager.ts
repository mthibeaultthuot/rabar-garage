import { distance } from '@Shared/utility/vector.js';
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
    initializeGarage('Downtown Garage', new alt.Vector3(-904.01574703125, -144.3735809326172, 40.8829641723633),  [
        {
            position: new alt.Vector3(-901.5217895507812, -160.71817016601562, 41.8793556958008),
            rotation : new alt.Vector3(0, 0, 0.45116081833839417),
            occupied : false
        },
        {
            position: new alt.Vector3(-905.0278930664062, -161.93942260742188, 41.87895965576172),
            rotation : new alt.Vector3(0, 0, 0.45116081833839417),
            occupied : false
        },
        {
            position: new alt.Vector3(-908.34814443125, -163.63027954101562, 41.87680435180664),
            rotation : new alt.Vector3(0, 0, 0.45116081833839417),
            occupied : false
        }
    ]);
    return garages;
}


export function getAvailableSlots(slots : Slot[]) : Slot {
    console.log("________________________________________________________________");
    let allVehicles = alt.Vehicle.all;
    if (allVehicles.length == 0) 
        return slots[0];

    let availableSlots = [];


    let findCloseVehicle = false;
    for (const slot of slots) {
        for (const veh of allVehicles) {

            console.log(distance(slot.position, veh.pos));
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









