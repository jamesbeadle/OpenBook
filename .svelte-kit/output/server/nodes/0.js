

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.17f8e2ab.js","_app/immutable/chunks/index.8318a7cd.js","_app/immutable/chunks/vendor.8b8f7fd2.js"];
export const stylesheets = ["_app/immutable/assets/index.7845617c.css"];
export const fonts = [];
