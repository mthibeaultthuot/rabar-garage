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