

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.7b3d5b53.js","_app/immutable/chunks/index.2d222d9d.js","_app/immutable/chunks/vendor.ea5a4fed.js"];
export const stylesheets = ["_app/immutable/assets/index.d3a74b14.css"];
export const fonts = [];
