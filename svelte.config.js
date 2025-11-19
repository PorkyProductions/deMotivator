// Temporary compatibility config to restore Svelte 4 component API
// Enables `componentApi: 4` so existing `new Component(...)` style instantiation works.
export default {
  compilerOptions: {
    compatibility: {
      componentApi: 4
    }
  }
};
