

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.6085b9cf.js","_app/immutable/chunks/index.d4f1a345.js","_app/immutable/chunks/vendor.8c00af32.js"];
export const stylesheets = ["_app/immutable/assets/index.6892cc1d.css"];
export const fonts = [];
