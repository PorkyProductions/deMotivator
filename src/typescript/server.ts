export const go = new Go();
import server from '../../www/main.wasm?init'
WebAssembly.instantiateStreaming(fetch(server()), go.importObject).then(
    (result) => {
        go.run(result.instance);
    }
);
