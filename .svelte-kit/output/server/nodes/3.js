

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.a3861add.js","_app/immutable/chunks/index.6efc3c64.js","_app/immutable/chunks/vendor.87cfa3fd.js"];
export const stylesheets = ["_app/immutable/assets/index.4cc3c342.css"];
export const fonts = [];
