

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/whitepaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.e349ca1f.js","_app/immutable/chunks/index.732dfe6c.js","_app/immutable/chunks/vendor.1feb2267.js"];
export const stylesheets = ["_app/immutable/assets/index.3a789f23.css"];
export const fonts = [];
