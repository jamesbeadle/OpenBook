

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.d551b024.js","_app/immutable/chunks/index.8318a7cd.js","_app/immutable/chunks/vendor.8b8f7fd2.js"];
export const stylesheets = ["_app/immutable/assets/index.7845617c.css"];
export const fonts = [];
