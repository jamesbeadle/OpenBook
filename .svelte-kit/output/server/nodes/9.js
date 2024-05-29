

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/recruitment/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.xMrxRVgO.js","_app/immutable/chunks/index.YtMhV6mo.js","_app/immutable/chunks/vendor.msFJPRcx.js"];
export const stylesheets = ["_app/immutable/assets/index.Dp3CT3by.css"];
export const fonts = [];
