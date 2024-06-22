

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sales/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.CIq-Ghvd.js","_app/immutable/chunks/index.D3IfBdJO.js","_app/immutable/chunks/vendor.CBgqn3Ks.js"];
export const stylesheets = ["_app/immutable/assets/index.CUGOpphs.css"];
export const fonts = [];
