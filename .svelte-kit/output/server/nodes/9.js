

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/recruitment/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.8wStcwnz.js","_app/immutable/chunks/index.CL7pbaGo.js","_app/immutable/chunks/vendor.fBkgE-It.js"];
export const stylesheets = ["_app/immutable/assets/index.DYbdz2Bk.css"];
export const fonts = [];
