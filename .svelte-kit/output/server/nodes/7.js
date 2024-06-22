

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/organisations/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.DhsutKcu.js","_app/immutable/chunks/index.DDZ44Vos.js","_app/immutable/chunks/vendor.CCfUxlja.js"];
export const stylesheets = ["_app/immutable/assets/index.DJiDkVx2.css"];
export const fonts = [];
