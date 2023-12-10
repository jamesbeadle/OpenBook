

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.f0e4dda0.js","_app/immutable/chunks/index.d7a10794.js","_app/immutable/chunks/vendor.48783e8e.js"];
export const stylesheets = ["_app/immutable/assets/index.b0791032.css"];
export const fonts = [];
