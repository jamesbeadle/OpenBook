

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.8c009855.js","_app/immutable/chunks/index.d4f1a345.js","_app/immutable/chunks/vendor.8c00af32.js"];
export const stylesheets = ["_app/immutable/assets/index.6892cc1d.css"];
export const fonts = [];
