<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useEvents } from '../../../../webview/composables/useEvents';
import { VehicleHubEvent } from '../shared/vehicleHubEvents.js';

const events = useEvents();
let vehicles = ref<string[]>([]);
let targetGarageKey;

async function spawnVehicle(veh) {
    const result = await events.emitServerRpc('garage:spawn', targetGarageKey, veh);
}

function init() {
    events.on(VehicleHubEvent.fromServer.playerVehicles, (garageKey, data) => {
        targetGarageKey = garageKey;
        vehicles.value = data;
    });
}

onMounted(init);
</script>

<template>
    <div class="menu">
        <div class="top-bar">
            <div class="top-bar-red cercle"></div>
            <div class="top-bar-yellow cercle"></div>
            <div class="top-bar-green cercle"></div>
        </div>
        <div class="header">
            <h1 class="header-title">Garage</h1>
        </div>
        <div class="body">
            <div @click="spawnVehicle(vehicle.id)" v-for="vehicle in vehicles" :key="vehicle.id" class="item"> 
                {{ vehicle.model }} 
            </div>
        </div>
    </div>
</template>


<style scoped>



.menu {
    position: fixed;
    left: 1%;
    top: 1%;
    padding: 1px 10px;
    background-color: #333;
    opacity: .7;
    border: #555; 
    border-radius: 7px;
    width: 10vw;
    color: white;
    box-shadow: 0 22px 70px 4px rgba(0, 0, 0, 0.56);
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;font-family: "Gill Sans", sans-serif;
    text-align: center;
}

.top-bar {
    margin-top: 10px;
    display: flex;
    width: 13%;
}

.cercle {
    width: 10px;
    height: 10px;
    border-radius: 100px;
    margin: auto;
    box-shadow: 0 10px 20px 1px rgba(255, 255, 255, 0.1);
}

.top-bar-red {
    background-color: #f54254;
}
.top-bar-green {
    background-color: #65f06e;
}
.top-bar-yellow {
    background-color: #f0ed65;
}

.header {
    margin-bottom: 20px;
    margin-top: 10px;
    text-align: center;
    height: 6vh;
    padding: 0;
    width: 100%;
    background-image: url('https://bucket.veemdigital.com/aesthetic-gta-cityscape-desktop-wallpaper-preview.jpg');
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat;
    border-radius: 7px;
    display: flex; 
    justify-content: center; 
    align-items: center; 
}

.header h1 {
    text-align: center;
    margin: 0;
    font-size: 3.5em;
}

.item {
    cursor: pointer;
    padding: 10px 10px;
    transition: 1s;
}

.item:hover {
    background-color: #555;
    transition: 1s;
    border-radius: 10px;
}
</style>