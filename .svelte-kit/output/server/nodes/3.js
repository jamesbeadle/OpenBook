

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/whitepaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.751ba7e9.js","_app/immutable/chunks/index.ebca3473.js","_app/immutable/chunks/vendor.4c999aa6.js"];
export const stylesheets = ["_app/immutable/assets/index.3ad2ff01.css"];
export const fonts = [];
