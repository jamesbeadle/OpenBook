

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.c28dd754.js","_app/immutable/chunks/index.99d32c42.js","_app/immutable/chunks/vendor.e9e02d97.js"];
export const stylesheets = ["_app/immutable/assets/index.c5aa740c.css"];
export const fonts = [];
