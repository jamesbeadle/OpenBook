

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.C14yGQnb.js","_app/immutable/chunks/BYFopOH9.js","_app/immutable/chunks/CbnwZJmF.js"];
export const stylesheets = ["_app/immutable/assets/index.BkbIxHX3.css"];
export const fonts = [];
