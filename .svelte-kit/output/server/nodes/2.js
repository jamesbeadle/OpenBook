

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.3a97da35.js","_app/immutable/chunks/index.2d222d9d.js","_app/immutable/chunks/vendor.ea5a4fed.js"];
export const stylesheets = ["_app/immutable/assets/index.d3a74b14.css"];
export const fonts = [];
