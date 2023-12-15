

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.0833622d.js","_app/immutable/chunks/index.732dfe6c.js","_app/immutable/chunks/vendor.1feb2267.js"];
export const stylesheets = ["_app/immutable/assets/index.3a789f23.css"];
export const fonts = [];
