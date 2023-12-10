

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.b9a27bf8.js","_app/immutable/chunks/index.6b19f36a.js","_app/immutable/chunks/vendor.74db1718.js"];
export const stylesheets = ["_app/immutable/assets/index.c56d1f0e.css"];
export const fonts = [];
