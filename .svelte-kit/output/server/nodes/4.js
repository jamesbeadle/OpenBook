

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.d53c162c.js","_app/immutable/chunks/index.397abc9e.js","_app/immutable/chunks/vendor.3fdebcfc.js"];
export const stylesheets = ["_app/immutable/assets/index.0a4c1fa5.css"];
export const fonts = [];
