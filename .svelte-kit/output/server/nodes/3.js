

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.089393fb.js","_app/immutable/chunks/index.fa88dd25.js","_app/immutable/chunks/vendor.438ce89a.js"];
export const stylesheets = ["_app/immutable/assets/index.50ffa9e9.css"];
export const fonts = [];
