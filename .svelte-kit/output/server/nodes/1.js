

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.4e980db1.js","_app/immutable/chunks/index.7436d1ef.js","_app/immutable/chunks/vendor.2dca2bde.js"];
export const stylesheets = ["_app/immutable/assets/index.38fd7e96.css"];
export const fonts = [];
