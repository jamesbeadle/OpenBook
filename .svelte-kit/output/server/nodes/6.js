

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/organisations/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.DFka5MqQ.js","_app/immutable/chunks/index.CL7pbaGo.js","_app/immutable/chunks/vendor.fBkgE-It.js"];
export const stylesheets = ["_app/immutable/assets/index.DYbdz2Bk.css"];
export const fonts = [];
