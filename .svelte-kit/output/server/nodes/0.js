

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.95b356e2.js","_app/immutable/chunks/index.594337a7.js","_app/immutable/chunks/vendor.b461f263.js"];
export const stylesheets = ["_app/immutable/assets/index.acb8c5c7.css"];
export const fonts = [];
