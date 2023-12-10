

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.3b26d679.js","_app/immutable/chunks/index.d7a10794.js","_app/immutable/chunks/vendor.48783e8e.js"];
export const stylesheets = ["_app/immutable/assets/index.b0791032.css"];
export const fonts = [];
