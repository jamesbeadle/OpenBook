

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.bda5cd82.js","_app/immutable/chunks/index.d7a10794.js","_app/immutable/chunks/vendor.48783e8e.js"];
export const stylesheets = ["_app/immutable/assets/index.b0791032.css"];
export const fonts = [];
