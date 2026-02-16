import App from './admin.svelte';
import { mount } from 'svelte';
const docApp: HTMLElement | null = document.getElementById('app');

const app = mount(App, { target: docApp ?? document.body });

export default app;
