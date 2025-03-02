

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.D7uIPB3D.js","_app/immutable/chunks/BYFopOH9.js","_app/immutable/chunks/CbnwZJmF.js"];
export const stylesheets = ["_app/immutable/assets/index.BkbIxHX3.css"];
export const fonts = [];
