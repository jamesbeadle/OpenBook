

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.e64a5f54.js","_app/immutable/chunks/index.fa88dd25.js","_app/immutable/chunks/vendor.438ce89a.js"];
export const stylesheets = ["_app/immutable/assets/index.50ffa9e9.css"];
export const fonts = [];
