

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.701b9e9a.js","_app/immutable/chunks/index.2d222d9d.js","_app/immutable/chunks/vendor.ea5a4fed.js"];
export const stylesheets = ["_app/immutable/assets/index.d3a74b14.css"];
export const fonts = [];
