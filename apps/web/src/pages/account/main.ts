import '../../styles/globalStyles';
import '../../styles/scss/bootstrap.scss';
import '../../styles/scss/login.scss';
import App from './account.svelte';
import { mount } from 'svelte';
const docApp: HTMLElement | null = document.getElementById('app');

const app = mount(App, { target: docApp ?? document.body });

export default app;
