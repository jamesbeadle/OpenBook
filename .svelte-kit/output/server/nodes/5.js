

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/organisation/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.7Ac9TSl4.js","_app/immutable/chunks/DPEP8P5c.js","_app/immutable/chunks/CUOcH7U8.js"];
export const stylesheets = ["_app/immutable/assets/index.DXKqbqU0.css"];
export const fonts = [];
