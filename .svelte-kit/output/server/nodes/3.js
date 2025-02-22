

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/accounts/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.C1DDAgOE.js","_app/immutable/chunks/DPIm1WII.js","_app/immutable/chunks/D9wgRk34.js"];
export const stylesheets = ["_app/immutable/assets/index.DXKqbqU0.css"];
export const fonts = [];
