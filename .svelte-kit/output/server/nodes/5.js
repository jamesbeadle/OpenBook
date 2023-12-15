

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/whitepaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.fb5076b9.js","_app/immutable/chunks/index.594337a7.js","_app/immutable/chunks/vendor.b461f263.js"];
export const stylesheets = ["_app/immutable/assets/index.acb8c5c7.css"];
export const fonts = [];
