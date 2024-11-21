

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BeosH99b.js","_app/immutable/chunks/index.D52nT8sa.js","_app/immutable/chunks/vendor.B1A-5kRC.js"];
export const stylesheets = ["_app/immutable/assets/index.D412BQnI.css"];
export const fonts = [];
