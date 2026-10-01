globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-01T12:08:59.304Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/amount-DI9iEWJk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ce-YHzZY8IfoZy3LKgcpI2pzUcWcJY\"",
		"mtime": "2026-10-01T13:31:06.153Z",
		"size": 1230,
		"path": "../public/assets/amount-DI9iEWJk.js"
	},
	"/assets/api-By4WQCeb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"457-hZHY8BJ7jJhbcTu0DB8LVV6jEbI\"",
		"mtime": "2026-10-01T13:31:06.155Z",
		"size": 1111,
		"path": "../public/assets/api-By4WQCeb.js"
	},
	"/assets/flow-DvxvD8Mf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b9-hl+Lr697Dxfe6xcwZF7uT2DbanQ\"",
		"mtime": "2026-10-01T13:31:06.157Z",
		"size": 697,
		"path": "../public/assets/flow-DvxvD8Mf.js"
	},
	"/assets/money-DM11gUTj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1718-VS4GLruv4vkC/0hJ+FoCemAud1s\"",
		"mtime": "2026-10-01T13:31:06.158Z",
		"size": 5912,
		"path": "../public/assets/money-DM11gUTj.js"
	},
	"/assets/mutation-C-J2E1eR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d71-smS+wSp8pmpmPIfTVWuL+fFeFrg\"",
		"mtime": "2026-10-01T13:31:06.158Z",
		"size": 3441,
		"path": "../public/assets/mutation-C-J2E1eR.js"
	},
	"/assets/index-PnoIxF0N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"508e7-hVkHN099EfxVVX6bcs5csgHqqmI\"",
		"mtime": "2026-10-01T13:31:06.153Z",
		"size": 329959,
		"path": "../public/assets/index-PnoIxF0N.js"
	},
	"/assets/preload-helper-DpTw1w-J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15e9-fqKUdADR5FS2LfEMuPjOvrMdN4E\"",
		"mtime": "2026-10-01T13:31:06.160Z",
		"size": 5609,
		"path": "../public/assets/preload-helper-DpTw1w-J.js"
	},
	"/assets/query-DoWkR7Eb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a89-zZJpFppE/6GfrKe/B2pOhGwgSjQ\"",
		"mtime": "2026-10-01T13:31:06.161Z",
		"size": 14985,
		"path": "../public/assets/query-DoWkR7Eb.js"
	},
	"/assets/recipient-C4sgg8u5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"814-v/EPMzEzcQa+r1ozXyzMmORsinc\"",
		"mtime": "2026-10-01T13:31:06.163Z",
		"size": 2068,
		"path": "../public/assets/recipient-C4sgg8u5.js"
	},
	"/assets/review-Bacmu08e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"826-72ooi27wLBJ7E9z4b38ZllQi5k0\"",
		"mtime": "2026-10-01T13:31:06.163Z",
		"size": 2086,
		"path": "../public/assets/review-Bacmu08e.js"
	},
	"/assets/routes-D12uzP5v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"735-/Dh8CO9iBppeT/+fR6VybFJTrC4\"",
		"mtime": "2026-10-01T13:31:06.164Z",
		"size": 1845,
		"path": "../public/assets/routes-D12uzP5v.js"
	},
	"/assets/send-BF60Trj0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46d-6f+RuGJm4PpOF0EE9sXR/KCAR5c\"",
		"mtime": "2026-10-01T13:31:06.165Z",
		"size": 1133,
		"path": "../public/assets/send-BF60Trj0.js"
	},
	"/assets/styles-BPJc0yJW.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"12460-xR1Lj2ZKS2hpbqQEUe/Zc9zkgzc\"",
		"mtime": "2026-10-01T13:31:06.181Z",
		"size": 74848,
		"path": "../public/assets/styles-BPJc0yJW.css"
	},
	"/assets/success._id-D05oVoh8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cc-1jRFDoT167KfjBFhRg0eBm638K8\"",
		"mtime": "2026-10-01T13:31:06.166Z",
		"size": 716,
		"path": "../public/assets/success._id-D05oVoh8.js"
	},
	"/assets/success._id-DDza7gsN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7e7-Vq2XkKA1muvqI+u3RqmPzqPuy0g\"",
		"mtime": "2026-10-01T13:31:06.168Z",
		"size": 2023,
		"path": "../public/assets/success._id-DDza7gsN.js"
	},
	"/assets/track.index-BStHki3j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e7-3fXOl54ef2FWadm/zcV2ejUWeJE\"",
		"mtime": "2026-10-01T13:31:06.171Z",
		"size": 743,
		"path": "../public/assets/track.index-BStHki3j.js"
	},
	"/assets/track._id--65gM3Iz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35f-gPApfZCuISrcEulEqpue4hBYBUQ\"",
		"mtime": "2026-10-01T13:31:06.168Z",
		"size": 863,
		"path": "../public/assets/track._id--65gM3Iz.js"
	},
	"/assets/track._id-9lhSAL-P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"917-4v/o7Toffve3kJ1e+YpjEP7AA0M\"",
		"mtime": "2026-10-01T13:31:06.170Z",
		"size": 2327,
		"path": "../public/assets/track._id-9lhSAL-P.js"
	},
	"/assets/types-tR1u4TBR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60-ibSQ8NzPPiXumbSLZEAX18+hMHE\"",
		"mtime": "2026-10-01T13:31:06.172Z",
		"size": 96,
		"path": "../public/assets/types-tR1u4TBR.js"
	},
	"/assets/use-quote-CR8IQiI5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-QZ2QU4bhPnoBOy+tWkH0ADUWI0A\"",
		"mtime": "2026-10-01T13:31:06.175Z",
		"size": 644,
		"path": "../public/assets/use-quote-CR8IQiI5.js"
	},
	"/assets/ui-CsUP9-_L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e17b-lxrF+2AuGSSOcjVEm3v3i10ESs0\"",
		"mtime": "2026-10-01T13:31:06.174Z",
		"size": 57723,
		"path": "../public/assets/ui-CsUP9-_L.js"
	},
	"/assets/useMutation-BvEnau4Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"942-RtPACCbxmfZIjxnoEPZKhr/eUp4\"",
		"mtime": "2026-10-01T13:31:06.176Z",
		"size": 2370,
		"path": "../public/assets/useMutation-BvEnau4Y.js"
	},
	"/assets/useNavigate-DrRVqM35.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b6-kpxrDx3xPiS9yGon/f1oYsfHskY\"",
		"mtime": "2026-10-01T13:31:06.177Z",
		"size": 182,
		"path": "../public/assets/useNavigate-DrRVqM35.js"
	},
	"/assets/useQuery-BgItM7C7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f06-GKH78k2ECKbktmKMAmXxO7xI+KM\"",
		"mtime": "2026-10-01T13:31:06.178Z",
		"size": 7942,
		"path": "../public/assets/useQuery-BgItM7C7.js"
	},
	"/assets/ussd-DpMuPEyS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de8-/kDpKzQGO+GKJ9QG61dxHYjlgLU\"",
		"mtime": "2026-10-01T13:31:06.180Z",
		"size": 3560,
		"path": "../public/assets/ussd-DpMuPEyS.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_qEa_RX = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_qEa_RX
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
