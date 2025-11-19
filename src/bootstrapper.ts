import App from './App.svelte'
import {mount} from "svelte"
const docApp: HTMLDivElement | HTMLElement | null = document.getElementById('app')


export default mount(App, {
  target: docApp as HTMLElement
})