

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.6178d9f5.js","_app/immutable/chunks/index.d0f95d98.js","_app/immutable/chunks/vendor.ef5ccfa8.js"];
export const stylesheets = ["_app/immutable/assets/index.dd27eb3e.css"];
export const fonts = [];
