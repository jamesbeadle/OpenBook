

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.LFVEnHo1.js","_app/immutable/chunks/index.DC74Cdt_.js","_app/immutable/chunks/vendor.BOYNCRBL.js"];
export const stylesheets = ["_app/immutable/assets/index.D412BQnI.css"];
export const fonts = [];
