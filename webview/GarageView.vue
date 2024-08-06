<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useEvents } from '../../../../webview/composables/useEvents';

const Events = useEvents();


async function spawnVehicle() {
    const result = await Events.emitServerRpc('garage:spawn');
}
</script>

<template>
   <h1 class="font-bold text-black">asjdflkasdfjklasjklfjlasdkfjkljkl</h1>
   <button @click="spawnVehicle">spawn</button>


</template>