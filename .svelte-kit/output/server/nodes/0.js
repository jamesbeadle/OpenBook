

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.49bcffd9.js","_app/immutable/chunks/index.1779ba0d.js","_app/immutable/chunks/vendor.d6e6275a.js"];
export const stylesheets = ["_app/immutable/assets/index.7845617c.css"];
export const fonts = [];
