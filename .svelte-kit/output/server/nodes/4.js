

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/whitepaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.c8aba87f.js","_app/immutable/chunks/index.d0f95d98.js","_app/immutable/chunks/vendor.ef5ccfa8.js"];
export const stylesheets = ["_app/immutable/assets/index.dd27eb3e.css"];
export const fonts = [];
