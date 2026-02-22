import '../../styles/globalStyles';
import '../../styles/scss/bootstrap.scss';
import App from './login.svelte';
import { mount } from 'svelte';
import '../../styles/scss/login.scss';
const docApp: HTMLElement | null = document.getElementById('app');

const app = mount(App, { target: docApp ?? document.body });

export default app;
