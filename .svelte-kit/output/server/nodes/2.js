

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.2a77102b.js","_app/immutable/chunks/index.397abc9e.js","_app/immutable/chunks/vendor.3fdebcfc.js"];
export const stylesheets = ["_app/immutable/assets/index.0a4c1fa5.css"];
export const fonts = [];
