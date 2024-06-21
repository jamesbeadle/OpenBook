

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.Ca0lm2jT.js","_app/immutable/chunks/index.DFH2bjxo.js","_app/immutable/chunks/vendor.G_mBUymI.js"];
export const stylesheets = ["_app/immutable/assets/index.CwycD2hp.css"];
export const fonts = [];
