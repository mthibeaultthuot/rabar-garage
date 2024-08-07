import { Garage, Slot } from "../server/garageManager.js";
import * as alt from 'alt-server';

const garageList : {garageId: string, position: alt.Vector3, slots : Slot[]}[] = [
    {
        garageId : 'Downtown Garage', position : new alt.Vector3(-904.01574703125, -144.3735809326172, 40.8829641723633),  
        slots : [ 
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
        ]
    }
]

export default garageList;