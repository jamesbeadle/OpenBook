

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/accounting/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BnpcDCx8.js","_app/immutable/chunks/index.D52nT8sa.js","_app/immutable/chunks/vendor.B1A-5kRC.js"];
export const stylesheets = ["_app/immutable/assets/index.D412BQnI.css"];
export const fonts = [];
