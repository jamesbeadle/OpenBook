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
		client: {"start":"_app/immutable/entry/start.1935a61c.js","app":"_app/immutable/entry/app.fb0b15cf.js","imports":["_app/immutable/entry/start.1935a61c.js","_app/immutable/chunks/index.3ad87b1e.js","_app/immutable/chunks/vendor.2df648ba.js","_app/immutable/entry/app.fb0b15cf.js","_app/immutable/chunks/index.3ad87b1e.js","_app/immutable/chunks/vendor.2df648ba.js"],"stylesheets":["_app/immutable/assets/index.b0791032.css","_app/immutable/assets/index.b0791032.css"],"fonts":[]},
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
