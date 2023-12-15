

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/whitepaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.2fc986d5.js","_app/immutable/chunks/index.c6562451.js","_app/immutable/chunks/vendor.493f93b2.js"];
export const stylesheets = ["_app/immutable/assets/index.01d93c21.css"];
export const fonts = [];
