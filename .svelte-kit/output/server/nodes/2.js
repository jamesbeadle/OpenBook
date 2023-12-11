

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.b1e70779.js","_app/immutable/chunks/index.77383b0b.js","_app/immutable/chunks/vendor.76ac1856.js"];
export const stylesheets = ["_app/immutable/assets/index.9ca62add.css"];
export const fonts = [];
