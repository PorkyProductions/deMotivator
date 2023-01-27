import server from '../../www/main.wasm?init';

const go = new Go();
server({ imports: go.importObject }).then((instance) => {
  go.run(instance);
});
