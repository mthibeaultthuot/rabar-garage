import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { MarkerType } from '@Shared/types/marker.js';
import { useWebview } from '@Server/player/webview.js'
import { VehicleHubEvent } from '../shared/vehicleHubEvents.js';


const posRef = new alt.Vector3({
    x: -904.01574703125,
    y: -144.3735809326172,
    z: 40.8829641723633,
});

const vehicleSpawn = new alt.Vector3({
    x: -901.5217895507812,
    y: -160.71817016601562,
    z: 41.8793556958008,
});

const rotateSpawn = new alt.Vector3({
    x: 0,
    y: 0,
    z:  0.45116081833839417,
});




const Rebar = useRebar();
const db = Rebar.database.useDatabase();
const { get, create, getAll, getMany, update, deleteDocument, createCollection } = Rebar.database.useDatabase();

async function createCollections() {
    await db.createCollection('PlayerVehicles');
}  

async function buyVehicle(playerId : string, vehicleName: string) {
    const vehicle = new alt.Vehicle(vehicleName, vehicleSpawn, rotateSpawn);
    Rebar.vehicle.useVehicle(vehicle).create(playerId);
}  




const interaction = Rebar.controllers.useInteraction(
    new alt.ColshapeCylinder(posRef.x, posRef.y, posRef.z, 3, 3),
    'player',
);


interaction.on((player) => {
    const rPlayer = Rebar.usePlayer(player);
    rPlayer.notify.showNotification('Pressed E to access the garage!');

    showMenu(player).then((data) => console.log(data));
});

Rebar.controllers.useMarkerGlobal({
    pos: posRef,
    color: new alt.RGBA(0, 255, 0, 75),
    scale: new alt.Vector3(3, 3, 1),
    type: MarkerType.CYLINDER,
});

Rebar.controllers.useTextLabelGlobal({
    pos: posRef.add(0, 0, 1),
    text: 'Press E to access the garage!',
});


Rebar.controllers.useBlipGlobal({
    color: 7,
    pos: posRef,
    shortRange: false,
    sprite: 50,
    text: 'Garage',
});


async function showMenu(player: alt.Player) {
    const rebarPlayer = Rebar.usePlayer(player);
    const webview = Rebar.player.useWebview(player);

    const vehicles  = await getMany<{ owner: string }>({ owner: rebarPlayer.account.get()._id }, 'Vehicles');
    const vehicleData = vehicles.map(vehicle => ({
        id: vehicle._id,
        model: vehicle.model
    }));
    console.log(vehicleData);

    webview.show('GarageView', 'page');
    webview.emit(VehicleHubEvent.fromServer.playerVehicles, vehicleData);

    //await createVehicle();
}



alt.onRpc('garage:spawn', async (player : alt.Player, vehId : string) => {
    const rebarPlayer = Rebar.usePlayer(player);
    const vehicle  = await get<{ _id: string, }>({ _id : vehId }, 'Vehicles');
    const newVehicle = new alt.Vehicle(vehicle.model, vehicle.pos, vehicle.rot);
    const veh = Rebar.vehicle.useVehicle(newVehicle);
    veh.bind(vehicle)
    useWebview(player).hide('GarageView');
})



