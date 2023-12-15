

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.a2df24fe.js","_app/immutable/chunks/index.732dfe6c.js","_app/immutable/chunks/vendor.1feb2267.js"];
export const stylesheets = ["_app/immutable/assets/index.3a789f23.css"];
export const fonts = [];
