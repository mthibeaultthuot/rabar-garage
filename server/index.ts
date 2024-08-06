import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { MarkerType } from '@Shared/types/marker.js';
import { useWebview } from '@Server/player/webview.js'



const Rebar = useRebar();

const posRef = new alt.Vector3({
    x: -904.01574703125,
    y: -144.3735809326172,
    z: 40.8829641723633,
});


const interaction = Rebar.controllers.useInteraction(
    new alt.ColshapeCylinder(posRef.x, posRef.y, posRef.z, 3, 3),
    'player',
);


interaction.on((player) => {
    const rPlayer = Rebar.usePlayer(player);
    rPlayer.notify.showNotification('Pressed E to access the garage!');

    showMenu(player);
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


function showMenu(player: alt.Player) {
    const rebarPlayer = Rebar.usePlayer(player);
    rebarPlayer.webview.focus();
    useWebview(player).show('GarageView');
}

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





alt.onRpc('garage:spawn', async (player : alt.Player) => {
    const vehicle = new alt.Vehicle('adder', vehicleSpawn, rotateSpawn);
    useWebview(player).hide('GarageView');
    
    

})

