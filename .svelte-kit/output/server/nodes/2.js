

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.993526bc.js","_app/immutable/chunks/index.99d32c42.js","_app/immutable/chunks/vendor.e9e02d97.js"];
export const stylesheets = ["_app/immutable/assets/index.c5aa740c.css"];
export const fonts = [];
