import type { bool } from './types';
import { importCapacitor } from '../utils/capacitor';

window.addEventListener("load", async () => {
    // attempt to import Capacitor core if available, but ignore failure
    try { await importCapacitor('@capacitor/core'); } catch (e) { /* ignore */ }
});
window.addEventListener("load", async () => {
    const { wait } = await import('@porkyproductions/hat/wait');
    wait(10);
    console.clear()
    wait(5, () => console.log(`%c
        MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWWWWMMMMMMMMMMMMMMMMMMMMMM
        MMMMMMMMMMMMMMMMMMMMMNKOxdolcc::,,,,;;cxNMMMMMMMMMMMMMMMMMMM
        MMMMMMMMMMMMMMMMMWKxc'..    .  ......   lNMMMMMMMMMMMMMMMMMM
        MMMMMMMMMMMMMMNOo;.  .................  .OMMMMMMMMMMMMMMMMMM
        MMMMMMMMMMMN0o,. .........  .........  ..;0WMMMMMMW0ONMMMMMM
        MMMMMMMMMNk;. ............   ........ 'xo..lO000Oxc.'OMMMMMM
        MMMMMMMMKc. .....  .................  l0xoc,,,,,.   :XMMMMMM
        MMMMMMM0, ......   ................  ;0O,,ONXKKK0d' cNMMMMMM
        MMMMMMNc .............   ........  .l0NX0OXWWNWWW0,.xWMMMMMM
        MMMMMMk. ...  ...............   .'o0NXo;o0XNNNXNO;.lXMMMMMMM
        MMMMMNc ....  ........... ..,:cokXNNWNk;'',,;,,,..dNMMMMMMMM
        MMMMM0' ............  .':ok0XNWWWWWWWWNNKOko:. .:0WMMMMMMMMM
        MMMMM0' .......  ..,lx0XNWWWWWWWWWWWWWNKkoc,. ;OWMMMMMMMMMMM
        MMMMMNc    ...,:okKNWWWWWNWWWNNNNKOkdl;..,::..dWMMMMMMMMMMMM
        MMMMMMXl..ckOKNNWWWNWWWNNX0kdl::,'',;:;..,;'.cKMMMMMMMMMMMMM
        MMMMMMMNc.:0NNNNNNXKOxl:;,',;:loxOXNWMW0xodx0WMMMMMMMMMMMMMM
        MMMMMMMM0, .,::;;,,'',:ldk0XWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
        MMMMMMMMK; .,'. :xO0KNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
        MMMMMMMMNx;,,,,lKMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
        MMMMMMMMMMWNXXNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
        
        The Hedgehog of Innovation.
        porkyproductions.github.io`,
        
        "font-family: monospace; background-color: #4f46e5; color: white; font-size: 12px"
    ))
})

export const showAlert = async (title: string, message: string): Promise<void> => {
    const mod = await importCapacitor('@capacitor/dialog');
    if (mod && mod.Dialog && typeof mod.Dialog.alert === 'function') {
        await mod.Dialog.alert({ title: title, message: message });
    } else {
        // fallback to window alert in non-capacitor environments
        // keep behavior similar for simple notifications
        // eslint-disable-next-line no-alert
        window.alert(`${title}\n\n${message}`);
    }
};

export const showConfirm = async (title: string, message: string): Promise<string | bool | number> => {
    const mod = await importCapacitor('@capacitor/dialog');
    if (mod && mod.Dialog && typeof mod.Dialog.confirm === 'function') {
        const { value } = await mod.Dialog.confirm({ title: title, message: message });
        return value as bool;
    }
    // fallback to window.confirm
    // eslint-disable-next-line no-restricted-globals
    const ok = window.confirm(`${title}\n\n${message}`);
    return ok as bool;
};

document.body.addEventListener('keyup', async (e: KeyboardEvent) => {
    if (e.key === "p") {
        showAlert("You pressed the most amazing key on the keyboard", 
        `
            Porky finds great strength with you.
            You have found the most secret of secrets.
            For this, you deserve the world.
            However, porky is never that generous,
            so you won't be recieveing it.
            However, you may take this token of our appreciation
            💖
            Now go, and stand amongst the shoulders of giants.
        `)
    } else if (e.key === "s") {
        document.body.classList.add('spin')
    } else if (e.key === "q") {
        showAlert("Oh my whats this", `
        
            quandale dingle
            https://i.kym-cdn.com/editorials/icons/mobile/000/004/390/quandalecover.jpg
        
        `)
    }
})