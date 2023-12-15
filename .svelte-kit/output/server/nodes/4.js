

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.69fe356a.js","_app/immutable/chunks/index.cfe1bc72.js","_app/immutable/chunks/vendor.757c3be8.js"];
export const stylesheets = ["_app/immutable/assets/index.718f7110.css"];
export const fonts = [];
