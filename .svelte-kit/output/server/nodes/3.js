

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/whitepaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.c93de519.js","_app/immutable/chunks/index.99d32c42.js","_app/immutable/chunks/vendor.e9e02d97.js"];
export const stylesheets = ["_app/immutable/assets/index.c5aa740c.css"];
export const fonts = [];
