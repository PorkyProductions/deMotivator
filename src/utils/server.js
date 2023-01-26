import server from '../../www/main.wasm?init';
const go = new Go();
WebAssembly.instantiateStreaming(fetch(server), go.importObject).then(
  (result) => {
    go.run(result.instance);
  },
);
