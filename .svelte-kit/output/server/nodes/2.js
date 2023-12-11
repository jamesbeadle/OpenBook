

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.9ec3dcfd.js","_app/immutable/chunks/index.6059b53e.js","_app/immutable/chunks/vendor.c00fe486.js"];
export const stylesheets = ["_app/immutable/assets/index.9ca62add.css"];
export const fonts = [];
