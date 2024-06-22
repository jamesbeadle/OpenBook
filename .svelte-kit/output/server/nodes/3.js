

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/accounting/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.DjUYy2E-.js","_app/immutable/chunks/index.DDZ44Vos.js","_app/immutable/chunks/vendor.CCfUxlja.js"];
export const stylesheets = ["_app/immutable/assets/index.DJiDkVx2.css"];
export const fonts = [];
