import server from '../../www/main.wasm?init'
WebAssembly.instantiateStreaming(fetch(server())).then(
    (result) => {
        console.log(result.instance)
    }
);
