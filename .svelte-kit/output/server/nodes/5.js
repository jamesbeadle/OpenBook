

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/organisation/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.C7YUcUPY.js","_app/immutable/chunks/BAcsOcHL.js","_app/immutable/chunks/ShujQ05N.js"];
export const stylesheets = ["_app/immutable/assets/index.DXKqbqU0.css"];
export const fonts = [];
