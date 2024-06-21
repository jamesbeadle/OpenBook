

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.CKuwsY4N.js","_app/immutable/chunks/index.DFH2bjxo.js","_app/immutable/chunks/vendor.G_mBUymI.js"];
export const stylesheets = ["_app/immutable/assets/index.CwycD2hp.css"];
export const fonts = [];
