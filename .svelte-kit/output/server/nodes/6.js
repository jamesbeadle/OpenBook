

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/organisations/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.DgiOFvPO.js","_app/immutable/chunks/BAcsOcHL.js","_app/immutable/chunks/ShujQ05N.js"];
export const stylesheets = ["_app/immutable/assets/index.DXKqbqU0.css"];
export const fonts = [];
