import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { MarkerType } from '@Shared/types/marker.js';
import { useWebview } from '@Server/player/webview.js'
import { VehicleHubEvent } from '../shared/vehicleHubEvents.js';
import { Vehicle } from '@Shared/types/vehicle.js';
import './garageManager.js'
import { Garage, getGarages } from './garageManager.js';


const Rebar = useRebar();
const db = Rebar.database.useDatabase();
const { get, create, getAll, getMany, update, deleteDocument, createCollection } = Rebar.database.useDatabase();



const init = () => {
    let initGarages = getGarages();
    for (const [key, garage] of initGarages) 
        createNewController(key, garage);
    return initGarages;
}

const garages = init();



function createNewController(garageKey : string, newGarage : Garage) {
    const interaction = Rebar.controllers.useInteraction(
        new alt.ColshapeCylinder(newGarage.position.x, newGarage.position.y, newGarage.position.z, 3, 3),
        'player',
    );


    interaction.on((player) => {
        const rPlayer = Rebar.usePlayer(player);
        rPlayer.notify.showNotification('Pressed E to access the garage!');

        showMenu(player, garageKey);
    });

    Rebar.controllers.useMarkerGlobal({
        pos: newGarage.position,
        color: new alt.RGBA(200, 162, 200, 75),
        scale: new alt.Vector3(3, 3, 1),
        type: MarkerType.CYLINDER,
    });

    Rebar.controllers.useTextLabelGlobal({
        pos: newGarage.position.add(0, 0, 1),
        text: 'Press E to access the garage!',
    });


    Rebar.controllers.useBlipGlobal({
        color: 7,
        pos: newGarage.position,
        shortRange: false,
        sprite: 50,
        text: 'Garage',
    });
}


// async function buyVehicle(playerId : string, vehicleName: string) {
//    const vehicle = new alt.Vehicle(vehicleName, vehicleSpawn, rotateSpawn);
//    Rebar.vehicle.useVehicle(vehicle).create(playerId);
//}  


async function showMenu(player: alt.Player, garageKey : string) {
    const rebarPlayer = Rebar.usePlayer(player);
    const webview = Rebar.player.useWebview(player);
    const vehicles : any  = await getMany<{ owner: string }>({ owner: rebarPlayer.account.get()._id }, 'Vehicles');
    const vehicleData = vehicles.map(vehicle => ({
        id: vehicle._id,
        model: vehicle.model
    }));



    webview.show('GarageView', 'page');
    webview.emit(VehicleHubEvent.fromServer.playerVehicles, garageKey, vehicleData);
}



alt.onRpc('garage:spawn', async (player : alt.Player, garageKey : string, vehId : string) => {
    let garage = garages.get(garageKey);

    const rebarPlayer = Rebar.usePlayer(player);
    const vehicle : any  = await get<{ _id: string }>({ _id : vehId }, 'Vehicles');

    // spawn vehicle in the parking spot not the last position
    const newVehicle = new alt.Vehicle(vehicle.model, garage.slots[0].position, garage.slots[0].rotation);
    const veh = Rebar.vehicle.useVehicle(newVehicle);


    veh.bind(vehicle)
    useWebview(player).hide('GarageView');
})



