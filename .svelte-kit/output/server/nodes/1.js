

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.5a96c971.js","_app/immutable/chunks/index.1779ba0d.js","_app/immutable/chunks/vendor.d6e6275a.js"];
export const stylesheets = ["_app/immutable/assets/index.7845617c.css"];
export const fonts = [];
