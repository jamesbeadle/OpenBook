

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/accounting/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BxjXRBBo.js","_app/immutable/chunks/index.DC74Cdt_.js","_app/immutable/chunks/vendor.BOYNCRBL.js"];
export const stylesheets = ["_app/immutable/assets/index.D412BQnI.css"];
export const fonts = [];
