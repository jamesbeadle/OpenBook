

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.b49f2529.js","_app/immutable/chunks/index.ebca3473.js","_app/immutable/chunks/vendor.4c999aa6.js"];
export const stylesheets = ["_app/immutable/assets/index.3ad2ff01.css"];
export const fonts = [];
