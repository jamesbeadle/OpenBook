

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/whitepaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.ByOgOiTB.js","_app/immutable/chunks/index.DFH2bjxo.js","_app/immutable/chunks/vendor.G_mBUymI.js"];
export const stylesheets = ["_app/immutable/assets/index.CwycD2hp.css"];
export const fonts = [];
