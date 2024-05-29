

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/accounting/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.32I6_XhV.js","_app/immutable/chunks/index.YtMhV6mo.js","_app/immutable/chunks/vendor.msFJPRcx.js"];
export const stylesheets = ["_app/immutable/assets/index.Dp3CT3by.css"];
export const fonts = [];
