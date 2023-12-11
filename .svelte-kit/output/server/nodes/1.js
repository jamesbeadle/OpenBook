

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.fb42a617.js","_app/immutable/chunks/index.ebca3473.js","_app/immutable/chunks/vendor.4c999aa6.js"];
export const stylesheets = ["_app/immutable/assets/index.3ad2ff01.css"];
export const fonts = [];
