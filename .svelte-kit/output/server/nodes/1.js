

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.1f1de1c1.js","_app/immutable/chunks/index.d0f95d98.js","_app/immutable/chunks/vendor.ef5ccfa8.js"];
export const stylesheets = ["_app/immutable/assets/index.dd27eb3e.css"];
export const fonts = [];
