

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.7feb7d7c.js","_app/immutable/chunks/index.cfe1bc72.js","_app/immutable/chunks/vendor.757c3be8.js"];
export const stylesheets = ["_app/immutable/assets/index.718f7110.css"];
export const fonts = [];
