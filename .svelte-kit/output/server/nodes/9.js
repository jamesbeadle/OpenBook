

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sales/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.7fziSEuB.js","_app/immutable/chunks/BTOtedTV.js","_app/immutable/chunks/C89G1NdB.js"];
export const stylesheets = ["_app/immutable/assets/index.DXKqbqU0.css"];
export const fonts = [];
