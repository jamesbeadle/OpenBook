

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/organisations/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.C7grwrlx.js","_app/immutable/chunks/DPIm1WII.js","_app/immutable/chunks/D9wgRk34.js"];
export const stylesheets = ["_app/immutable/assets/index.DXKqbqU0.css"];
export const fonts = [];
