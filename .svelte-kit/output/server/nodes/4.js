

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/whitepaper/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.497f8b68.js","_app/immutable/chunks/index.fa88dd25.js","_app/immutable/chunks/vendor.438ce89a.js"];
export const stylesheets = ["_app/immutable/assets/index.50ffa9e9.css"];
export const fonts = [];
