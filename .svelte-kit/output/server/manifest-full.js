export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".ic-assets.json",".well-known/ic-domains",".well-known/ii-alternative-origins","Manrope-Regular.woff2","apple-touch-icon.png","favicon.png","favicons/apple-touch-icon.png","favicons/browserconfig.xml","favicons/favicon-16x16.png","favicons/favicon-32x32.png","favicons/favicon.ico","favicons/icon-192x192.png","favicons/icon-512x512.png","favicons/mstile-150x150.png","favicons/safari-pinned-tab.svg","github.png","home-mobile.png","home.png","manifest.webmanifest","meta-share.jpg","openchat.png","poppins-regular-webfont.woff2","profile_placeholder.png","twitter.png"]),
	mimeTypes: {".json":"application/json",".woff2":"font/woff2",".png":"image/png",".xml":"application/xml",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.bb8145af.js","app":"_app/immutable/entry/app.e599ace8.js","imports":["_app/immutable/entry/start.bb8145af.js","_app/immutable/chunks/index.7436d1ef.js","_app/immutable/chunks/vendor.2dca2bde.js","_app/immutable/entry/app.e599ace8.js","_app/immutable/chunks/index.7436d1ef.js","_app/immutable/chunks/vendor.2dca2bde.js"],"stylesheets":["_app/immutable/assets/index.38fd7e96.css","_app/immutable/assets/index.38fd7e96.css"],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/whitepaper",
				pattern: /^\/whitepaper\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
