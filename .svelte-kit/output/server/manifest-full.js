export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".ic-assets.json",".well-known/ic-domains",".well-known/ii-alternative-origins","Manrope-Regular.woff2","apple-touch-icon.png","favicon.png","favicons/apple-touch-icon.png","favicons/browserconfig.xml","favicons/favicon-16x16.png","favicons/favicon-32x32.png","favicons/favicon.ico","favicons/icon-192x192.png","favicons/icon-512x512.png","favicons/mstile-150x150.png","favicons/safari-pinned-tab.svg","github.png","manifest.webmanifest","meta-share.jpg","meta-share.png","no-entry.png","openchat.png","poppins-regular-webfont.woff2","profile_placeholder.png","twitter.png"]),
	mimeTypes: {".json":"application/json",".woff2":"font/woff2",".png":"image/png",".xml":"application/xml",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.fdfbaf5b.js","app":"_app/immutable/entry/app.ef2de1f8.js","imports":["_app/immutable/entry/start.fdfbaf5b.js","_app/immutable/chunks/index.d7a10794.js","_app/immutable/chunks/vendor.48783e8e.js","_app/immutable/entry/app.ef2de1f8.js","_app/immutable/chunks/index.d7a10794.js","_app/immutable/chunks/vendor.48783e8e.js"],"stylesheets":["_app/immutable/assets/index.b0791032.css","_app/immutable/assets/index.b0791032.css"],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
