

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.d8ea7034.js","_app/immutable/chunks/index.221c8b52.js","_app/immutable/chunks/vendor.88f53008.js"];
export const stylesheets = ["_app/immutable/assets/index.92e14ba6.css"];
export const fonts = [];
