export const index = 0;
let component_cache;
export const component = async () =>
  (component_cache ??= (await import('../entries/fallbacks/layout.svelte.js'))
    .default);
export const imports = [
  '_app/immutable/nodes/0.75a9c773.js',
  '_app/immutable/chunks/index.fa88dd25.js',
  '_app/immutable/chunks/vendor.438ce89a.js',
];
export const stylesheets = ['_app/immutable/assets/index.50ffa9e9.css'];
export const fonts = [];
