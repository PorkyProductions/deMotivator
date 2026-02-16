import App from './500.svelte';
import { mount } from 'svelte';
const docApp: HTMLElement | null = document.getElementById('app');

const app = mount(App, { target: docApp ?? document.body });

export default app;
