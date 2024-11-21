

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BCbUlS1q.js","_app/immutable/chunks/index.D52nT8sa.js","_app/immutable/chunks/vendor.B1A-5kRC.js"];
export const stylesheets = ["_app/immutable/assets/index.D412BQnI.css"];
export const fonts = [];
