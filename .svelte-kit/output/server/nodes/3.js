

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.502e5299.js","_app/immutable/chunks/index.2d222d9d.js","_app/immutable/chunks/vendor.ea5a4fed.js"];
export const stylesheets = ["_app/immutable/assets/index.d3a74b14.css"];
export const fonts = [];
