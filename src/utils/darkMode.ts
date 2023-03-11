import type { bool } from '../typescript/types'
export let darkMode: bool = false

window.matchMedia("(prefers-color-scheme: dark)")
    .matches ? 
    darkMode = true : 
    darkMode = false