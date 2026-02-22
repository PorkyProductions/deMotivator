import '../../styles/globalStyles';
import '../../styles/scss/bootstrap.scss';
import App from './signUp.svelte';
import { mount } from 'svelte';
const docApp: HTMLElement | null = document.getElementById('app');

const app = mount(App, { target: docApp ?? document.body });

export default app;
