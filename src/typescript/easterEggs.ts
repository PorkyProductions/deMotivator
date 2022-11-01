console.log(`%c
    
    
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
    
    Powerful, cross-platform, and open-source.
    porkyproductions.github.io
        
        
        `,
        "font-family: monospace; background-color: #4f46e5; color: white;");

document.body.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.key === "p") {
        alert(`
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
    }
})



export {}