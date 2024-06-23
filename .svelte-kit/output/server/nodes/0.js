

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.D2fVxZc0.js","_app/immutable/chunks/index.1Xe4EmAO.js","_app/immutable/chunks/vendor.9GmjPp7g.js"];
export const stylesheets = ["_app/immutable/assets/index.CipnWpIH.css"];
export const fonts = [];
