

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.5672cb6f.js","_app/immutable/chunks/index.c6562451.js","_app/immutable/chunks/vendor.493f93b2.js"];
export const stylesheets = ["_app/immutable/assets/index.01d93c21.css"];
export const fonts = [];
