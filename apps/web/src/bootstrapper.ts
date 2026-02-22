import './styles/globalStyles';
import App from './App.svelte';
import { mount } from 'svelte';

const docApp: HTMLElement | null = document.getElementById('app');

// Use Svelte 5 mount API. Keep compat shim active until migration completes.
const app = mount(App, { target: docApp ?? document.body });

export default app;
