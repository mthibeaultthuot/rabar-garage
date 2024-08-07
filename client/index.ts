import * as alt from 'alt-client';
import { useWebview } from '@Client/webview/index.js';
import { VehicleHubEvent } from '../shared/vehicleHubEvents.js';

alt.log('Hello from client!');

useWebview().on("garage:test", (...args) => {
    console.log('Some event triggered', ...args);
})