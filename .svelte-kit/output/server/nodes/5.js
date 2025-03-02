

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/organisation/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.BrSiaLXO.js","_app/immutable/chunks/BYFopOH9.js","_app/immutable/chunks/CbnwZJmF.js"];
export const stylesheets = ["_app/immutable/assets/index.BkbIxHX3.css"];
export const fonts = [];
