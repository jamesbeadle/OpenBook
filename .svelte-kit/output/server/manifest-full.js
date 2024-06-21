export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store",".ic-assets.json",".well-known/ic-domains",".well-known/ii-alternative-origins","Manrope-Regular.woff2","apple-touch-icon.png","favicon.png","favicons/apple-touch-icon.png","favicons/browserconfig.xml","favicons/favicon-16x16.png","favicons/favicon-32x32.png","favicons/favicon.ico","favicons/icon-192x192.png","favicons/icon-512x512.png","favicons/mstile-150x150.png","favicons/safari-pinned-tab.svg","github.png","home-mobile.png","home.png","manifest.webmanifest","meta-share.jpg","openchat.png","poppins-regular-webfont.woff2","profile_placeholder.png","twitter.png"]),
	mimeTypes: {".json":"application/json",".woff2":"font/woff2",".png":"image/png",".xml":"text/xml",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.CtkdqW9Z.js","app":"_app/immutable/entry/app.HGKmhKld.js","imports":["_app/immutable/entry/start.CtkdqW9Z.js","_app/immutable/chunks/index.DFH2bjxo.js","_app/immutable/chunks/vendor.G_mBUymI.js","_app/immutable/entry/app.HGKmhKld.js","_app/immutable/chunks/index.DFH2bjxo.js","_app/immutable/chunks/vendor.G_mBUymI.js"],"stylesheets":["_app/immutable/assets/index.CwycD2hp.css","_app/immutable/assets/index.CwycD2hp.css"],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js'))
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
				id: "/accounting",
				pattern: /^\/accounting\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/directory",
				pattern: /^\/directory\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/organisations",
				pattern: /^\/organisations\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/organisation",
				pattern: /^\/organisation\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/recruitment",
				pattern: /^\/recruitment\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/sales",
				pattern: /^\/sales\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/timesheets",
				pattern: /^\/timesheets\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/whitepaper",
				pattern: /^\/whitepaper\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
