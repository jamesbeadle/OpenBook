

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.d1af0dda.js","_app/immutable/chunks/index.7436d1ef.js","_app/immutable/chunks/vendor.2dca2bde.js"];
export const stylesheets = ["_app/immutable/assets/index.38fd7e96.css"];
export const fonts = [];
