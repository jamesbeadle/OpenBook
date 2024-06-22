

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/organisations/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.DJunWCRv.js","_app/immutable/chunks/index.D3IfBdJO.js","_app/immutable/chunks/vendor.CBgqn3Ks.js"];
export const stylesheets = ["_app/immutable/assets/index.CUGOpphs.css"];
export const fonts = [];
