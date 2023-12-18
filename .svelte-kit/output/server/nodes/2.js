

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.64cb661b.js","_app/immutable/chunks/index.8318a7cd.js","_app/immutable/chunks/vendor.8b8f7fd2.js"];
export const stylesheets = ["_app/immutable/assets/index.7845617c.css"];
export const fonts = [];
