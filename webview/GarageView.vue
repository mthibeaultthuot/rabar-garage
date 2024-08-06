<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useEvents } from '../../../../webview/composables/useEvents';
import { VehicleHubEvent } from '../shared/vehicleHubEvents.js';

const events = useEvents();
let vehicles = ref<string[]>([]);

async function spawnVehicle(veh) {
    console.log(veh)
    const result = await events.emitServerRpc('garage:spawn', veh);
}

function init() {
    console.log(vehicles.value);
    events.on(VehicleHubEvent.fromServer.playerVehicles, (data) => {
        vehicles.value = data;
    });
}

onMounted(init);
</script>

<template>

    <div class="menu">
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

.item {
    cursor: pointer;
}
</style>