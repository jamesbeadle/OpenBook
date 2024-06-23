

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/timesheets/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/11.BWjdMjTr.js","_app/immutable/chunks/index.1Xe4EmAO.js","_app/immutable/chunks/vendor.9GmjPp7g.js"];
export const stylesheets = ["_app/immutable/assets/index.CipnWpIH.css"];
export const fonts = [];
