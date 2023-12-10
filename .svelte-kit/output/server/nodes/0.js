

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.6ddece5a.js","_app/immutable/chunks/index.3ad87b1e.js","_app/immutable/chunks/vendor.2df648ba.js"];
export const stylesheets = ["_app/immutable/assets/index.b0791032.css"];
export const fonts = [];
