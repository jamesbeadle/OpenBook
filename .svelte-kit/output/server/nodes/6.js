

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/organisation/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.D5VWHjbv.js","_app/immutable/chunks/index.D3IfBdJO.js","_app/immutable/chunks/vendor.CBgqn3Ks.js"];
export const stylesheets = ["_app/immutable/assets/index.CUGOpphs.css"];
export const fonts = [];
