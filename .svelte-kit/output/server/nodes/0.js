

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.B7vHUGVA.js","_app/immutable/chunks/index.DC74Cdt_.js","_app/immutable/chunks/vendor.BOYNCRBL.js"];
export const stylesheets = ["_app/immutable/assets/index.D412BQnI.css"];
export const fonts = [];
