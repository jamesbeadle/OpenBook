

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.24d6fc12.js","_app/immutable/chunks/index.6efc3c64.js","_app/immutable/chunks/vendor.87cfa3fd.js"];
export const stylesheets = ["_app/immutable/assets/index.4cc3c342.css"];
export const fonts = [];
