import App from './login.svelte';
import { mount } from 'svelte';
const docApp: any = document.getElementById('app');

const app = mount(App, { target: docApp ?? document.body });

export default app;
