

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.6ac13ae6.js","_app/immutable/chunks/index.77383b0b.js","_app/immutable/chunks/vendor.76ac1856.js"];
export const stylesheets = ["_app/immutable/assets/index.9ca62add.css"];
export const fonts = [];
