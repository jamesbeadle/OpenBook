import { D as DEV } from "./vendor.js";
import * as devalue from "devalue";
import { parse, serialize } from "cookie";
import * as set_cookie_parser from "set-cookie-parser";
import { nonNullish } from "@dfinity/utils";
import "dompurify";
import { HttpAgent, Actor } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
let base = "";
let assets = base;
const initial = { base, assets };
function reset() {
  base = initial.base;
  assets = initial.assets;
}
function set_assets(path) {
  assets = initial.assets = path;
}
const SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
const ENDPOINT_METHODS = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD"
]);
const PAGE_METHODS = /* @__PURE__ */ new Set(["GET", "POST", "HEAD"]);
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
class HttpError {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body) {
    this.status = status;
    if (typeof body === "string") {
      this.body = { message: body };
    } else if (body) {
      this.body = body;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
}
class Redirect {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
}
class ActionFailure {
  /**
   * @param {number} status
   * @param {T} [data]
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function error(status, body) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 — ${status} is invalid`);
  }
  return new HttpError(status, body);
}
function json(data, init2) {
  const body = JSON.stringify(data);
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    headers.set("content-length", encoder$3.encode(body).byteLength.toString());
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
const encoder$3 = new TextEncoder();
function text(body, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-length")) {
    const encoded = encoder$3.encode(body);
    headers.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers
    });
  }
  return new Response(body, {
    ...init2,
    headers
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return (
    /** @type {import('../runtime/control.js').Redirect | import('../runtime/control.js').HttpError | Error} */
    error2
  );
}
let public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = Array.from(ENDPOINT_METHODS).filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options2, error2);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body, {
      status
    });
  }
  return static_error_page(options2, status, body.message);
}
async function handle_error_and_jsonify(event, options2, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return await options2.hooks.handleError({ error: error2, event }) ?? {
      message: event.route.id != null ? "Internal Error" : "Not Found"
    };
  }
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (ENDPOINT_METHODS.has(method) && !PAGE_METHODS.has(method)) {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
const tracked_url_properties = (
  /** @type {const} */
  [
    "href",
    "pathname",
    "search",
    "searchParams",
    "toString",
    "toJSON"
  ]
);
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
const DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server) {
  const actions = server?.actions;
  if (!actions) {
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: err instanceof HttpError ? err.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error2;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server) {
  const actions = server?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new Error(`No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")})`
    );
  }
  return action(event);
}
function validate_action_return(data) {
  if (data instanceof Redirect) {
    throw new Error("Cannot `return redirect(...)` — use `throw redirect(...)` instead");
  }
  if (data instanceof HttpError) {
    throw new Error(
      "Cannot `return error(...)` — use `throw error(...)` or `return fail(...)` instead"
    );
  }
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, devalue.uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, devalue.stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = (
      /** @type {any} */
      e
    );
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
const INVALIDATED_PARAM = "x-sveltekit-invalidated";
const TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
async function load_server_data({
  event,
  state,
  node,
  parent,
  // TODO 2.0: Remove this
  track_server_fetches
}) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      const url2 = new URL(info instanceof Request ? info.url : info, event.url);
      if (track_server_fetches) {
        uses.dependencies.add(url2.href);
      }
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        uses.route = true;
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  return data;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  return async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function text2() {
          const body = await response2.text();
          if (!body || typeof body === "string") {
            const status_number = Number(response2.status);
            if (isNaN(status_number)) {
              throw new Error(
                `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
              );
            }
            fetched.push({
              url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
              method: event.request.method,
              request_body: (
                /** @type {string | ArrayBufferView | undefined} */
                input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
              ),
              request_headers: cloned_headers,
              response_body: body,
              response: response2
            });
          }
          if (dependency) {
            dependency.body = body;
          }
          return body;
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            return buffer;
          };
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" — it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}
function each(items, fn) {
  items = ensure_array_like(items);
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set, update) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set, update);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map(
      (store, i) => subscribe(
        store,
        (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (started) {
            sync();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );
    started = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
const escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
const escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
const replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
const s = JSON.stringify;
const encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
const init = new Uint32Array(8);
const key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
const array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
const quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
const crypto_pattern = /^(nonce|sha\d\d\d)-/;
class BaseProvider {
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {import('types').Csp.Source[]} */
  #script_src;
  /** @type {import('types').Csp.Source[]} */
  #style_src;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d = this.#directives;
    this.#script_src = [];
    this.#style_src = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (this.#script_needs_csp) {
      if (this.#use_hashes) {
        this.#script_src.push(`sha256-${sha256(content)}`);
      } else if (this.#script_src.length === 0) {
        this.#script_src.push(`nonce-${this.#nonce}`);
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (this.#style_needs_csp) {
      if (this.#use_hashes) {
        this.#style_src.push(`sha256-${sha256(content)}`);
      } else if (this.#style_src.length === 0) {
        this.#style_src.push(`nonce-${this.#nonce}`);
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
}
class CspProvider extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
}
class CspReportOnlyProvider extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
}
class Csp {
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
}
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
const updated = {
  ...readable(false),
  check: () => false
};
const encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest._;
  const modulepreloads = new Set(client.imports);
  const stylesheets = new Set(client.stylesheets);
  const fonts = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error: error2,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value
    };
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets.add(url);
      for (const url of node.fonts)
        fonts.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const properties = [
      assets && `assets: ${s(assets)}`,
      `base: ${base_expression}`,
      `env: ${s(public_env)}`
    ].filter(Boolean);
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error2) {
        serialized.error = devalue.uneval(error2);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${devalue.uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      args.push(`{
							${hydrate.join(",\n							")}
						}`);
    }
    blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error2) => ({
          error: await handle_error_and_jsonify(event, options2, error2)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error: error2 }) => {
          count -= 1;
          let str;
          try {
            str = devalue.uneval({ id, data, error: error2 }, replacer);
          } catch (e) {
            error2 = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = devalue.uneval({ id, data, error: error2 }, replacer);
          }
          push(`<script>${global}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${devalue.uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest,
  state,
  status,
  error: error2,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error2.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({}),
        track_server_fetches: options2.track_server_fetches
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      e instanceof HttpError ? e.status : 500,
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
const encoder = new TextEncoder();
async function render_data(event, route, options2, manifest, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error2),
              status: error2 instanceof HttpError ? error2.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error2), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = devalue.stringify(value, reducers);
            } catch (e) {
              const error2 = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = devalue.stringify(error2, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${devalue.stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
const MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await Promise.all([
      // we use == here rather than === because [undefined] serializes as "[null]"
      ...page2.layouts.map((n) => n == void 0 ? n : manifest._.nodes[n]()),
      manifest._.nodes[page2.leaf]()
    ]);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !state.prerendering) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            },
            track_server_fetches: options2.track_server_fetches
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest._.nodes[index]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    return await render_response({
      event,
      options: options2,
      manifest,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: get_option(nodes, "ssr") ?? true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = parse(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = parse(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = parse(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    set(name, value, opts = {}) {
      set_internal(name, value, { ...defaults, ...opts });
    },
    /**
     * @param {string} name
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    delete(name, opts = {}) {
      cookies.set(name, "", {
        ...opts,
        maxAge: 0
      });
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('cookie').CookieSerializeOptions} opts
     */
    serialize(name, value, opts) {
      return serialize(name, value, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = parse(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, opts) {
    const path = opts.path ?? default_path;
    new_cookies[name] = {
      name,
      value,
      options: {
        ...opts,
        path
      }
    };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers.append("set-cookie", serialize(name, value, options2));
  }
}
function create_fetch({ event, options: options2, manifest, state, get_cookie_header, set_internal }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return await options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest.assets.has(filename);
        const is_asset_html = manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str);
            set_internal(
              name,
              value,
              /** @type {import('cookie').CookieSerializeOptions} */
              options3
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
const valid_layout_exports = /* @__PURE__ */ new Set([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash",
  "config"
]);
const valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
const valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
const valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
const valid_server_exports = /* @__PURE__ */ new Set([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "fallback",
  "prerender",
  "trailingSlash",
  "config",
  "entries"
]);
const validate_layout_exports = validator(valid_layout_exports);
const validate_page_exports = validator(valid_page_exports);
const validate_layout_server_exports = validator(valid_layout_server_exports);
const validate_page_server_exports = validator(valid_page_server_exports);
const validate_server_exports = validator(valid_server_exports);
const default_transform = ({ html }) => html;
const default_filter = () => false;
const default_preload = ({ type }) => type === "js" || type === "css";
const page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
const allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest._.matchers();
    for (const candidate of manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-static"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await Promise.all([
          // we use == here rather than === because [undefined] serializes as "[null]"
          ...route.page.layouts.map((n) => n == void 0 ? n : manifest._.nodes[n]()),
          manifest._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function afterUpdate() {
}
function set_building() {
}
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
const options = {
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  track_server_fetches: false,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta content="width=device-width, initial-scale=1" name="viewport" />\n\n    <title>OpenBook</title>\n    <link href="https://openbook.services" rel="canonical" />\n    <meta\n      content="OpenBook is a decentralised business management platform on the Internet Computer blockchain."\n      name="description"\n    />\n    <meta content="OpenBook" property="og:title" />\n    <meta\n      content="OpenBook is a decentralised business management platform on the Internet Computer blockchain."\n      property="og:description"\n    />\n    <meta content="website" property="og:type" />\n    <meta content="https://openbook.services" property="og:url" />\n    <meta\n      content="https://openbook.services/meta-share.jpg"\n      property="og:image"\n    />\n    <meta content="summary_large_image" name="twitter:card" />\n    <meta content="OpenBook" name="twitter:title" />\n    <meta\n      content="OpenBook is a decentralised business management platform on the Internet Computer blockchain."\n      name="twitter:description"\n    />\n    <meta\n      content="https://openbook.services/meta-share.jpg"\n      name="twitter:image"\n    />\n    <meta content="@beadle1989" name="twitter:creator" />\n\n    <link crossorigin="anonymous" href="/manifest.webmanifest" rel="manifest" />\n\n    <!-- Favicon -->\n    <link\n      rel="icon"\n      type="image/png"\n      sizes="32x32"\n      href="' + assets2 + '/favicons/favicon-32x32.png"\n    />\n    <link\n      rel="icon"\n      type="image/png"\n      sizes="16x16"\n      href="' + assets2 + '/favicons/favicon-16x16.png"\n    />\n    <link rel="shortcut icon" href="' + assets2 + '/favicons/favicon.ico" />\n\n    <!-- iOS meta tags & icons -->\n    <meta name="apple-mobile-web-app-capable" content="yes" />\n    <meta name="apple-mobile-web-app-status-bar-style" content="#2CE3A6" />\n    <meta name="apple-mobile-web-app-title" content="OpenBook" />\n    <link\n      rel="apple-touch-icon"\n      href="' + assets2 + '/favicons/apple-touch-icon.png"\n    />\n    <link\n      rel="mask-icon"\n      href="' + assets2 + '/favicons/safari-pinned-tab.svg"\n      color="#2CE3A6"\n    />\n\n    <!-- MS -->\n    <meta name="msapplication-TileColor" content="#101111" />\n    <meta\n      name="msapplication-config"\n      content="' + assets2 + '/favicons/browserconfig.xml"\n    />\n\n    <meta content="#2CE3A6" name="theme-color" />\n    ' + head + "\n\n    <style>\n      html,\n      body {\n        height: 100%;\n        margin: 0;\n      }\n\n      @font-face {\n        font-display: swap;\n        font-family: 'Poppins';\n        font-style: normal;\n        font-weight: 400;\n        src: url('" + assets2 + "/poppins-regular-webfont.woff2')\n          format('woff2');\n      }\n\n      @font-face {\n        font-display: swap;\n        font-family: 'Manrope';\n        font-style: normal;\n        font-weight: 400;\n        src: url('" + assets2 + `/Manrope-Regular.woff2') format('woff2');
      }
      body {
        font-family: 'Poppins', sans-serif !important;
        color: white !important;
        background-color: #101111;
        height: 100vh;
        margin: 0;
      }

      #app-spinner {
        --spinner-size: 30px;

        width: var(--spinner-size);
        height: var(--spinner-size);

        animation: app-spinner-linear-rotate 2000ms linear infinite;

        position: absolute;
        top: calc(50% - (var(--spinner-size) / 2));
        left: calc(50% - (var(--spinner-size) / 2));

        --radius: 45px;
        --circumference: calc(3.14159265359 * var(--radius) * 2);

        --start: calc((1 - 0.05) * var(--circumference));
        --end: calc((1 - 0.8) * var(--circumference));
      }

      #app-spinner circle {
        stroke-dasharray: var(--circumference);
        stroke-width: 10%;
        transform-origin: 50% 50% 0;

        transition-property: stroke;

        animation-name: app-spinner-stroke-rotate-100;
        animation-duration: 4000ms;
        animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);
        animation-iteration-count: infinite;

        fill: transparent;
        stroke: currentColor;

        transition: stroke-dashoffset 225ms linear;
      }

      @keyframes app-spinner-linear-rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes app-spinner-stroke-rotate-100 {
        0% {
          stroke-dashoffset: var(--start);
          transform: rotate(0);
        }
        12.5% {
          stroke-dashoffset: var(--end);
          transform: rotate(0);
        }
        12.5001% {
          stroke-dashoffset: var(--end);
          transform: rotateX(180deg) rotate(72.5deg);
        }
        25% {
          stroke-dashoffset: var(--start);
          transform: rotateX(180deg) rotate(72.5deg);
        }

        25.0001% {
          stroke-dashoffset: var(--start);
          transform: rotate(270deg);
        }
        37.5% {
          stroke-dashoffset: var(--end);
          transform: rotate(270deg);
        }
        37.5001% {
          stroke-dashoffset: var(--end);
          transform: rotateX(180deg) rotate(161.5deg);
        }
        50% {
          stroke-dashoffset: var(--start);
          transform: rotateX(180deg) rotate(161.5deg);
        }

        50.0001% {
          stroke-dashoffset: var(--start);
          transform: rotate(180deg);
        }
        62.5% {
          stroke-dashoffset: var(--end);
          transform: rotate(180deg);
        }
        62.5001% {
          stroke-dashoffset: var(--end);
          transform: rotateX(180deg) rotate(251.5deg);
        }
        75% {
          stroke-dashoffset: var(--start);
          transform: rotateX(180deg) rotate(251.5deg);
        }

        75.0001% {
          stroke-dashoffset: var(--start);
          transform: rotate(90deg);
        }
        87.5% {
          stroke-dashoffset: var(--end);
          transform: rotate(90deg);
        }
        87.5001% {
          stroke-dashoffset: var(--end);
          transform: rotateX(180deg) rotate(341.5deg);
        }
        100% {
          stroke-dashoffset: var(--start);
          transform: rotateX(180deg) rotate(341.5deg);
        }
      }
    </style>
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">` + body + '</div>\n\n    <svg\n      id="app-spinner"\n      preserveAspectRatio="xMidYMid meet"\n      focusable="false"\n      aria-hidden="true"\n      data-tid="spinner"\n      viewBox="0 0 100 100"\n    >\n      <circle cx="50%" cy="50%" r="45" />\n    </svg>\n  </body>\n</html>\n',
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1mpy6uz"
};
function get_hooks() {
  return {};
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
class Server {
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('@sveltejs/kit').SSRManifest} */
  #manifest;
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest) {
    this.#options = options;
    this.#manifest = manifest;
  }
  /**
   * @param {{
   *   env: Record<string, string>
   * }} opts
   */
  async init({ env }) {
    set_private_env(
      filter_private_env(env, {
        public_prefix: this.#options.env_public_prefix,
        private_prefix: this.#options.env_private_prefix
      })
    );
    set_public_env(
      filter_public_env(env, {
        public_prefix: this.#options.env_public_prefix,
        private_prefix: this.#options.env_private_prefix
      })
    );
    if (!this.#options.hooks) {
      try {
        const module = await get_hooks();
        this.#options.hooks = {
          handle: module.handle || (({ event, resolve }) => resolve(event)),
          handleError: module.handleError || (({ error: error2 }) => console.error(error2)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
        };
      } catch (error2) {
        {
          throw error2;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    if (!(request instanceof Request)) {
      throw new Error(
        "The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details"
      );
    }
    return respond(request, this.#options, this.#manifest, {
      ...options2,
      error: false,
      depth: 0
    });
  }
}
const Layout$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});
const app = "";
const core = {
  close: "Close",
  back: "Back",
  menu: "Open menu to access navigation options",
  collapse: "Collapse",
  expand: "Expand",
  copy: "Copy to clipboard"
};
const theme = {
  switch_theme: "Switch theme"
};
const progress = {
  completed: "Completed",
  in_progress: "In progress"
};
const en = {
  core,
  theme,
  progress
};
readable({
  lang: "en",
  ...en
});
const Back_svelte_svelte_type_style_lang = "";
const Backdrop_svelte_svelte_type_style_lang = "";
const BottomSheet_svelte_svelte_type_style_lang = "";
const initBusyStore = () => {
  const DEFAULT_STATE = [];
  const { subscribe: subscribe2, update, set } = writable(DEFAULT_STATE);
  return {
    subscribe: subscribe2,
    /**
     * Show the busy-screen if not visible
     */
    startBusy({ initiator: newInitiator, text: text2 }) {
      update((state) => [
        ...state.filter(({ initiator }) => newInitiator !== initiator),
        { initiator: newInitiator, text: text2 }
      ]);
    },
    /**
     * Hide the busy-screen if no other initiators are done
     */
    stopBusy(initiatorToRemove) {
      update((state) => state.filter(({ initiator }) => initiator !== initiatorToRemove));
    },
    resetForTesting() {
      set(DEFAULT_STATE);
    }
  };
};
const busyStore = initBusyStore();
const busy = derived(busyStore, ($busyStore) => $busyStore.length > 0);
const busyMessage = derived(busyStore, ($busyStore) => $busyStore.reverse().find(({ text: text2 }) => nonNullish(text2))?.text);
const Spinner_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".medium.svelte-85668t{--spinner-size:30px}.small.svelte-85668t{--spinner-size:calc(var(--line-height-standard) * 1rem)}.tiny.svelte-85668t{--spinner-size:calc(var(--line-height-standard) * 0.5rem)}svg.svelte-85668t{width:var(--spinner-size);height:var(--spinner-size);animation:spinner-linear-rotate 2000ms linear infinite;position:absolute;top:calc(50% - var(--spinner-size) / 2);left:calc(50% - var(--spinner-size) / 2);--radius:45px;--circumference:calc(3.1415926536 * var(--radius) * 2);--start:calc((1 - 0.05) * var(--circumference));--end:calc((1 - 0.8) * var(--circumference))}svg.inline.svelte-85668t{display:inline-block;position:relative}circle.svelte-85668t{stroke-dasharray:var(--circumference);stroke-width:10%;transform-origin:50% 50% 0;transition-property:stroke;animation-name:spinner-stroke-rotate-100;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite;fill:transparent;stroke:currentColor;transition:stroke-dashoffset 225ms linear}@keyframes spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes spinner-stroke-rotate-100{0%{stroke-dashoffset:var(--start);transform:rotate(0)}12.5%{stroke-dashoffset:var(--end);transform:rotate(0)}12.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:var(--start);transform:rotate(270deg)}37.5%{stroke-dashoffset:var(--end);transform:rotate(270deg)}37.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:var(--start);transform:rotate(180deg)}62.5%{stroke-dashoffset:var(--end);transform:rotate(180deg)}62.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:var(--start);transform:rotate(90deg)}87.5%{stroke-dashoffset:var(--end);transform:rotate(90deg)}87.5001%{stroke-dashoffset:var(--end);transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:var(--start);transform:rotateX(180deg) rotate(341.5deg)}}",
  map: null
};
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { inline = false } = $$props;
  let { size = "medium" } = $$props;
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  $$result.css.add(css$3);
  return `  <svg class="${[escape(null_to_empty(size), true) + " svelte-85668t", inline ? "inline" : ""].join(" ").trim()}" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true" data-tid="spinner" viewBox="0 0 100 100"><circle cx="50%" cy="50%" r="45" class="svelte-85668t"></circle></svg>`;
});
const BusyScreen_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "div.svelte-14plyno{z-index:calc(var(--z-index) + 1000);position:fixed;top:0;right:0;bottom:0;left:0;background:var(--backdrop);color:var(--backdrop-contrast)}.content.svelte-14plyno{display:flex;flex-direction:column;justify-content:center;align-items:center}p.svelte-14plyno{padding-bottom:var(--padding);max-width:calc(var(--section-max-width) / 2)}",
  map: null
};
const BusyScreen = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $busy, $$unsubscribe_busy;
  let $busyMessage, $$unsubscribe_busyMessage;
  $$unsubscribe_busy = subscribe(busy, (value) => $busy = value);
  $$unsubscribe_busyMessage = subscribe(busyMessage, (value) => $busyMessage = value);
  $$result.css.add(css$2);
  $$unsubscribe_busy();
  $$unsubscribe_busyMessage();
  return ` ${$busy ? `<div data-tid="busy" class="svelte-14plyno"><div class="content svelte-14plyno">${nonNullish($busyMessage) ? `<p class="svelte-14plyno">${escape($busyMessage)}</p>` : ``} <span>${validate_component(Spinner, "Spinner").$$render($$result, { inline: true }, {}, {})}</span></div></div>` : ``}`;
});
const Card_svelte_svelte_type_style_lang = "";
const Checkbox_svelte_svelte_type_style_lang = "";
const TestIdWrapper_svelte_svelte_type_style_lang = "";
const Collapsible_svelte_svelte_type_style_lang = "";
const Toolbar_svelte_svelte_type_style_lang = "";
const MenuButton_svelte_svelte_type_style_lang = "";
const Header_svelte_svelte_type_style_lang = "";
const Content_svelte_svelte_type_style_lang = "";
const IconInfo_svelte_svelte_type_style_lang = "";
const IconMeter_svelte_svelte_type_style_lang = "";
const IconSync_svelte_svelte_type_style_lang = "";
const Copy_svelte_svelte_type_style_lang = "";
const Dropdown_svelte_svelte_type_style_lang = "";
const ExternalLink_svelte_svelte_type_style_lang = "";
const HeaderTitle_svelte_svelte_type_style_lang = "";
const InfiniteScroll_svelte_svelte_type_style_lang = "";
const Input_svelte_svelte_type_style_lang = "";
const InputRange_svelte_svelte_type_style_lang = "";
const Island_svelte_svelte_type_style_lang = "";
const ItemAction_svelte_svelte_type_style_lang = "";
const KeyValuePair_svelte_svelte_type_style_lang = "";
const KeyValuePairInfo_svelte_svelte_type_style_lang = "";
const SplitPane_svelte_svelte_type_style_lang = "";
var Theme;
(function(Theme2) {
  Theme2["DARK"] = "dark";
  Theme2["LIGHT"] = "light";
})(Theme || (Theme = {}));
const isNode = () => typeof process !== "undefined" && process.versions != null && process.versions.node != null;
const enumFromStringExists = ({ obj, value }) => Object.values(obj).includes(value);
const THEME_ATTRIBUTE = "theme";
const LOCALSTORAGE_THEME_KEY = "nnsTheme";
const initTheme = () => {
  if (isNode()) {
    return void 0;
  }
  const theme2 = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  const initialTheme = enumFromStringExists({
    obj: Theme,
    value: theme2
  }) ? theme2 : Theme.DARK;
  applyTheme({ theme: initialTheme, preserve: false });
  return initialTheme;
};
const applyTheme = ({ theme: theme2, preserve = true }) => {
  const { documentElement, head } = document;
  documentElement.setAttribute(THEME_ATTRIBUTE, theme2);
  const color = getComputedStyle(documentElement).getPropertyValue("--theme-color");
  head?.children?.namedItem("theme-color")?.setAttribute("content", color.trim());
  if (preserve) {
    localStorage.setItem(LOCALSTORAGE_THEME_KEY, JSON.stringify(theme2));
  }
};
initTheme();
const MenuBackground_svelte_svelte_type_style_lang = "";
var Menu;
(function(Menu2) {
  Menu2["COLLAPSED"] = "collapsed";
  Menu2["EXPANDED"] = "expanded";
})(Menu || (Menu = {}));
const MENU_ATTRIBUTE = "menu";
const LOCALSTORAGE_MENU_KEY = "nnsMenu";
const initMenu = () => {
  if (isNode()) {
    return void 0;
  }
  const menu = document.documentElement.getAttribute(MENU_ATTRIBUTE);
  const initialMenu2 = enumFromStringExists({
    obj: Menu,
    value: menu
  }) ? menu : Menu.EXPANDED;
  applyMenu({ menu: initialMenu2, preserve: false });
  return initialMenu2;
};
const applyMenu = ({ menu, preserve = true }) => {
  const { documentElement } = document;
  documentElement.setAttribute(MENU_ATTRIBUTE, menu);
  if (preserve) {
    localStorage.setItem(LOCALSTORAGE_MENU_KEY, JSON.stringify(menu));
  }
};
const initialMenu = initMenu();
const initMenuStore = () => {
  const { subscribe: subscribe2, update } = writable(initialMenu);
  return {
    subscribe: subscribe2,
    toggle: () => {
      update((state) => {
        const menu = state === Menu.EXPANDED ? Menu.COLLAPSED : Menu.EXPANDED;
        applyMenu({ menu, preserve: true });
        return menu;
      });
    }
  };
};
const menuStore = initMenuStore();
derived(menuStore, ($menuStore) => $menuStore === Menu.COLLAPSED);
const Menu_svelte_svelte_type_style_lang = "";
const StretchPane_svelte_svelte_type_style_lang = "";
const MenuItem_svelte_svelte_type_style_lang = "";
const Modal_svelte_svelte_type_style_lang = "";
const Nav_svelte_svelte_type_style_lang = "";
const PageBanner_svelte_svelte_type_style_lang = "";
const Popover_svelte_svelte_type_style_lang = "";
const ProgressBar_svelte_svelte_type_style_lang = "";
const ProgressSteps_svelte_svelte_type_style_lang = "";
const QRCode_svelte_svelte_type_style_lang = "";
const QRCodeReader_svelte_svelte_type_style_lang = "";
const QRCodeReaderModal_svelte_svelte_type_style_lang = "";
const Section_svelte_svelte_type_style_lang = "";
const Segment_svelte_svelte_type_style_lang = "";
const SegmentButton_svelte_svelte_type_style_lang = "";
const SkeletonText_svelte_svelte_type_style_lang = "";
const SplitBlock_svelte_svelte_type_style_lang = "";
const SplitContent_svelte_svelte_type_style_lang = "";
const Tag_svelte_svelte_type_style_lang = "";
const Toggle_svelte_svelte_type_style_lang = "";
const ThemeToggle_svelte_svelte_type_style_lang = "";
const Toast_svelte_svelte_type_style_lang = "";
const Toasts_svelte_svelte_type_style_lang = "";
const WizardTransition_svelte_svelte_type_style_lang = "";
const localIdentityCanisterId = {}.VITE_INTERNET_IDENTITY_CANISTER_ID;
const AUTH_MAX_TIME_TO_LIVE = BigInt(
  60 * 60 * 1e3 * 1e3 * 1e3 * 24 * 14
);
const AUTH_POPUP_WIDTH = 576;
const AUTH_POPUP_HEIGHT = 625;
const createAuthClient = () => AuthClient.create({
  idleOptions: {
    disableIdle: true,
    disableDefaultIdleCallback: true
  }
});
const popupCenter = ({
  width,
  height
}) => {
  {
    return void 0;
  }
};
let authClient;
const NNS_IC_ORG_ALTERNATIVE_ORIGIN = "https://openbook.services";
const NNS_IC_APP_DERIVATION_ORIGIN = "https://etq35-qqaaa-aaaal-qcrvq-cai.icp0.io";
const isNnsAlternativeOrigin = () => {
  return window.location.origin === NNS_IC_ORG_ALTERNATIVE_ORIGIN;
};
const initAuthStore = () => {
  const { subscribe: subscribe2, set, update } = writable({
    identity: void 0
  });
  return {
    subscribe: subscribe2,
    sync: async () => {
      authClient = authClient ?? await createAuthClient();
      const isAuthenticated = await authClient.isAuthenticated();
      set({
        identity: isAuthenticated ? authClient.getIdentity() : null
      });
    },
    signIn: ({ domain }) => (
      // eslint-disable-next-line no-async-promise-executor
      new Promise(async (resolve, reject) => {
        authClient = authClient ?? await createAuthClient();
        const identityProvider = nonNullish(localIdentityCanisterId) ? `http://localhost:4943?canisterId=${localIdentityCanisterId}` : `${domain ?? "https://identity.ic0.app"}`;
        await authClient?.login({
          maxTimeToLive: AUTH_MAX_TIME_TO_LIVE,
          onSuccess: () => {
            update((state) => ({
              ...state,
              identity: authClient?.getIdentity()
            }));
            resolve();
          },
          onError: reject,
          identityProvider,
          ...isNnsAlternativeOrigin() && {
            derivationOrigin: NNS_IC_APP_DERIVATION_ORIGIN
          },
          windowOpenerFeatures: popupCenter({
            width: AUTH_POPUP_WIDTH,
            height: AUTH_POPUP_HEIGHT
          })
        });
      })
    ),
    signOut: async () => {
      const client = authClient ?? await createAuthClient();
      await client.logout();
      authClient = null;
      update((state) => ({
        ...state,
        identity: null
      }));
    }
  };
};
const authStore = initAuthStore();
const Layout_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "main.svelte-vmfccd{flex:1;display:flex;flex-direction:column}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `${``} ${validate_component(BusyScreen, "BusyScreen").$$render($$result, {}, {}, {})}`;
});
const adminPrincipal = "nn75s-ayupf-j6mj3-kluyb-wjj7y-eang2-dwzzr-cfdxk-etbw7-cgwnb-lqe";
const authSignedInStore = derived(
  authStore,
  ({ identity }) => identity !== null && identity !== void 0
);
derived(
  authStore,
  ({ identity }) => identity !== null && identity !== void 0 && identity.getPrincipal().toString() === adminPrincipal
);
const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const CurrencyId = IDL.Nat16;
  const UpdateProfileDTO = IDL.Record({
    "username": IDL.Text,
    "displayName": IDL.Text,
    "termsAccepted": IDL.Bool,
    "preferredPaymentCurrency": CurrencyId,
    "openChatUsername": IDL.Text,
    "profession": IDL.Text,
    "otherContact": IDL.Text,
    "emailAddress": IDL.Text,
    "phoneNumber": IDL.Text,
    "userDefinedWallet": IDL.Text,
    "lastName": IDL.Text,
    "firstName": IDL.Text
  });
  const Error2 = IDL.Variant({
    "DecodeError": IDL.Null,
    "NotAllowed": IDL.Null,
    "NotFound": IDL.Null,
    "NotAuthorized": IDL.Null,
    "InvalidData": IDL.Null,
    "AlreadyExists": IDL.Null
  });
  const Result = IDL.Variant({ "ok": IDL.Null, "err": Error2 });
  const OrganisationId = IDL.Nat32;
  const OrganisationDTO = IDL.Record({
    "id": OrganisationId,
    "logo": IDL.Text,
    "name": IDL.Text,
    "banner": IDL.Text,
    "lastModified": IDL.Int64,
    "friendlyName": IDL.Text
  });
  List.fill(IDL.Opt(IDL.Tuple(OrganisationDTO, List)));
  const ProfileDTO = IDL.Record({
    "principal": IDL.Text,
    "username": IDL.Text,
    "displayName": IDL.Text,
    "termsAccepted": IDL.Bool,
    "preferredPaymentCurrency": CurrencyId,
    "openChatUsername": IDL.Text,
    "profession": IDL.Text,
    "createDate": IDL.Int,
    "lastModified": IDL.Int64,
    "otherContact": IDL.Text,
    "emailAddress": IDL.Text,
    "phoneNumber": IDL.Text,
    "profilePicture": IDL.Vec(IDL.Nat8),
    "userDefinedWallet": IDL.Text,
    "organisations": List,
    "lastName": IDL.Text,
    "firstName": IDL.Text
  });
  const DirectoryProfileDTO = IDL.Record({
    "principal": IDL.Text,
    "username": IDL.Text,
    "profession": IDL.Text,
    "profilePicture": IDL.Vec(IDL.Nat8),
    "lastName": IDL.Text,
    "firstName": IDL.Text
  });
  const DirectoryDTO = IDL.Record({
    "totalEntries": IDL.Int,
    "currentPage": IDL.Int,
    "profiles": IDL.Vec(DirectoryProfileDTO)
  });
  return IDL.Service({
    "createProfile": IDL.Func([UpdateProfileDTO], [Result], []),
    "getProfile": IDL.Func([], [ProfileDTO], ["query"]),
    "getProfiles": IDL.Func(
      [IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Int, IDL.Text],
      [DirectoryDTO],
      ["query"]
    ),
    "isUsernameAvailable": IDL.Func([IDL.Text], [IDL.Bool], []),
    "updateProfileDetail": IDL.Func([UpdateProfileDTO], [Result], []),
    "updateProfilePicture": IDL.Func([IDL.Vec(IDL.Nat8)], [Result], [])
  });
};
class ActorFactory {
  static createActor(idlFactory2, canisterId = "", identity = null, options2 = null) {
    const hostOptions = {
      host: `https://${canisterId}.icp-api.io`,
      identity
    };
    if (!options2) {
      options2 = {
        agentOptions: hostOptions
      };
    } else if (!options2.agentOptions) {
      options2.agentOptions = hostOptions;
    } else {
      options2.agentOptions.host = hostOptions.host;
    }
    const agent = new HttpAgent({ ...options2.agentOptions });
    if ({ "BACKEND_CANISTER_ID": "eur5j-5iaaa-aaaal-qcrva-cai", "FRONTEND_CANISTER_ID": "etq35-qqaaa-aaaal-qcrvq-cai", "DFX_NETWORK": "ic" }.NODE_ENV !== "production") {
      agent.fetchRootKey().catch((err) => {
        console.warn(
          "Unable to fetch root key. Ensure your local replica is running"
        );
        console.error(err);
      });
    }
    return Actor.createActor(idlFactory2, {
      agent,
      canisterId,
      ...options2?.actorOptions
    });
  }
  static createIdentityActor(authStore2, canisterId) {
    let unsubscribe;
    return new Promise((resolve, reject) => {
      unsubscribe = authStore2.subscribe((store) => {
        if (store.identity) {
          resolve(store.identity);
        }
      });
    }).then((identity) => {
      unsubscribe();
      return ActorFactory.createActor(idlFactory, canisterId, identity);
    });
  }
}
const Wallet_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"${add_attribute("class", className, 0)} fill="currentColor" viewBox="0 0 24 24"><path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"></path><path d="M15.5,6.5v3a1,1,0,0,1-1,1h-3.5v-5H14.5A1,1,0,0,1,15.5,6.5Z"></path><path d="M12,8a.5,.5 0,1,1,.001,0Z"></path></svg>`;
});
const Dashboard_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentBorder;
  let profileSrc;
  let $profile, $$unsubscribe_profile;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let profile = writable(null);
  $$unsubscribe_profile = subscribe(profile, (value) => $profile = value);
  let showProfileDropdown = false;
  let { activeTitle = "OpenBook" } = $$props;
  onDestroy(() => {
    if (typeof window !== "undefined") {
      document.removeEventListener("click", closeDropdownOnClickOutside);
    }
  });
  function closeDropdownOnClickOutside(event) {
    const target = event.target;
    if (target instanceof Element) {
      if (!target.closest(".profile-dropdown") && !target.closest(".profile-pic")) {
        showProfileDropdown = false;
      }
    }
  }
  if ($$props.activeTitle === void 0 && $$bindings.activeTitle && activeTitle !== void 0)
    $$bindings.activeTitle(activeTitle);
  currentBorder = (route) => $page.url.pathname === route ? "active-border" : "";
  profileSrc = $profile && $profile?.profilePicture && $profile?.profilePicture?.length > 0 ? URL.createObjectURL(new Blob([new Uint8Array($profile.profilePicture)])) : "profile_placeholder.png";
  $$unsubscribe_profile();
  $$unsubscribe_page();
  return `<div class="w-full p-4 top-bar flex justify-between items-center"><h1>${escape(activeTitle)}</h1> <div class="relative inline-block"><button${add_attribute("class", `h-full flex items-center border rounded-full ${currentBorder("/profile")}`, 0)}><img${add_attribute("src", profileSrc, 0)} alt="Profile" class="h-8 rounded-full profile-pic" aria-label="Toggle Profile"></button> <div${add_attribute("class", `absolute right-0 top-full w-48 bg-black rounded-b-md rounded-l-md shadow-lg z-50 profile-dropdown ${showProfileDropdown ? "block" : "hidden"}`, 0)}><ul class=""><li><a href="/profile" class="flex items-center h-full w-full nav-underline"><span class="flex items-center h-full w-full"><img${add_attribute("src", profileSrc, 0)} alt="logo" class="w-8 h-8 my-2 ml-4 mr-2 rounded-full"> <p class="w-full min-w-[125px] max-w-[125px] truncate" data-svelte-h="svelte-cig3zx">Profile</p></span></a></li> <li><button class="flex items-center justify-center px-4 pb-2 pt-1 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 nav-button">Disconnect
            ${validate_component(Wallet_icon, "WalletIcon").$$render($$result, { className: "ml-2 h-6 w-6 mt-1" }, {}, {})}</button></li></ul></div></div></div>`;
});
const Expand_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { fill = "#FFFFFF" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} viewBox="0 0 24 24" fill="none"><path d="M8.49995 8.3C8.09995 7.9 7.49995 7.9 7.09995 8.3C6.69995 8.7 6.69995 9.3 7.09995 9.7L9.29995 12L6.99995 14.3C6.79995 14.5 6.69995 14.7 6.69995 15C6.69995 15.6 7.09995 16 7.69995 16C7.99995 16 8.19995 15.9 8.39995 15.7L11.4 12.7C11.8 12.3 11.8 11.7 11.4 11.3L8.49995 8.3ZM17 11.3L14 8.3C13.6 7.9 13 7.9 12.6 8.3C12.2 8.7 12.2 9.3 12.6 9.7L14.9 12L12.6 14.3C12.4 14.5 12.3 14.7 12.3 15C12.3 15.6 12.7 16 13.3 16C13.6 16 13.8 15.9 14 15.7L17 12.7C17.3 12.3 17.3 11.7 17 11.3Z"${add_attribute("fill", fill, 0)}></path></svg>`;
});
const Icp_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { fill = "#FFFFFF" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} viewBox="0 0 24 24" fill="none"><g clip-path="url(#clip0_143_3542)"><path d="M23.055 7.33252C22.1423 5.1788 20.6205 3.34753 18.7057 2.05266C16.7914 0.757781 14.4794 -0.000328019 12 1.0647e-07C10.3475 -9.36435e-05 8.76816 0.336563 7.33261 0.944906C5.17894 1.85766 3.34763 3.37936 2.0527 5.2942C0.757828 7.20844 -0.000328019 9.5205 1.06464e-07 12C-9.36435e-05 13.6526 0.336609 15.2319 0.944953 16.6675C1.85766 18.8212 3.3795 20.6525 5.2943 21.9473C7.20858 23.2422 9.52064 24.0003 12 24C13.6525 24.0001 15.2318 23.6634 16.6674 23.0551C18.8211 22.1424 20.6524 20.6206 21.9473 18.7058C23.2422 16.7916 24.0003 14.4794 24 12C24.0001 10.3474 23.6634 8.76806 23.055 7.33252ZM21.5819 16.0434C20.792 17.9081 19.4704 19.4992 17.8095 20.622C16.1482 21.7447 14.1524 22.3997 12 22.4001C10.5648 22.4 9.20025 22.1086 7.95684 21.5819C6.09211 20.792 4.50103 19.4705 3.37823 17.8096C2.25534 16.1482 1.60031 14.1524 1.59998 12C1.60008 10.5647 1.8915 9.20011 2.41814 7.9567C3.20803 6.09197 4.52962 4.50089 6.19045 3.37814C7.85184 2.2553 9.84769 1.60031 12 1.59998C13.4353 1.60008 14.7998 1.89145 16.0432 2.41814C17.9079 3.20798 19.499 4.52958 20.6218 6.19041C21.7446 7.8518 22.3996 9.84759 22.4 12C22.3999 13.4354 22.1085 14.7999 21.5819 16.0434Z"${add_attribute("fill", fill, 0)}></path><path d="M20.302 10.4768C20.004 9.77372 19.5086 9.1778 18.8845 8.75569C18.5725 8.54466 18.2278 8.37713 17.8597 8.26238C17.4916 8.14763 17.1 8.08589 16.6966 8.08594C16.1171 8.08542 15.5699 8.20842 15.0705 8.41331C14.6328 8.59252 14.2299 8.83238 13.8531 9.10697C13.1941 9.58828 12.6109 10.1754 12.054 10.776C12.0359 10.7955 12.0182 10.8152 12.0001 10.8348C11.9962 10.8306 11.9923 10.8263 11.9884 10.822C11.6762 10.4836 11.3553 10.1493 11.0183 9.83452C10.5125 9.36295 9.97 8.93297 9.35631 8.61206C9.04965 8.45194 8.72495 8.32003 8.38173 8.22839C8.0387 8.1367 7.67734 8.08589 7.30328 8.08599C6.76534 8.08589 6.24878 8.19581 5.78026 8.39447C5.07719 8.69255 4.48126 9.18792 4.05915 9.81197C3.84812 10.124 3.68059 10.4687 3.56584 10.8368C3.45109 11.2049 3.38936 11.5965 3.3894 11.9999C3.38931 12.5378 3.49923 13.0544 3.69789 13.5229C3.99597 14.2259 4.49139 14.8218 5.11539 15.2439C5.42744 15.455 5.77215 15.6225 6.14026 15.7373C6.50833 15.852 6.89992 15.9137 7.30333 15.9137C7.88279 15.9142 8.43001 15.7912 8.92942 15.5863C9.36714 15.4071 9.77008 15.1673 10.1468 14.8927C10.8058 14.4113 11.389 13.8242 11.946 13.2237C11.9641 13.2041 11.9818 13.1844 11.9998 13.1648C12.0037 13.1691 12.0076 13.1734 12.0115 13.1777C12.3237 13.5161 12.6446 13.8504 12.9817 14.1652C13.4875 14.6367 14.0299 15.0667 14.6436 15.3876C14.9503 15.5476 15.275 15.6796 15.6182 15.7713C15.9612 15.863 16.3226 15.9138 16.6967 15.9137C17.2346 15.9138 17.7512 15.8038 18.2197 15.6052C18.9227 15.3071 19.5187 14.8118 19.9408 14.1877C20.1518 13.8757 20.3193 13.5309 20.4341 13.1628C20.5488 12.7948 20.6106 12.4032 20.6105 11.9998C20.6106 11.4619 20.5007 10.9453 20.302 10.4768ZM10.8379 12.1162C10.54 12.4391 10.2447 12.7458 9.95003 13.0208C9.50819 13.4339 9.06798 13.7729 8.63204 13.9997C8.41389 14.1135 8.19704 14.2002 7.97795 14.2587C7.75867 14.3172 7.53704 14.348 7.30337 14.3481C6.97801 14.348 6.67155 14.2823 6.39109 14.1637C5.97072 13.9858 5.60992 13.6864 5.35614 13.3108C5.2292 13.1231 5.12903 12.9168 5.06054 12.697C4.99206 12.4772 4.95503 12.2439 4.95503 11.9999C4.95512 11.6745 5.02079 11.368 5.13944 11.0876C5.31733 10.6673 5.61676 10.3065 5.99237 10.0527C6.18006 9.92574 6.3864 9.82556 6.60625 9.75708C6.82609 9.6886 7.05934 9.65156 7.30342 9.65156C7.66473 9.65203 7.99905 9.72478 8.33673 9.86236C8.63144 9.98278 8.92698 10.155 9.22459 10.372C9.74565 10.7511 10.2687 11.268 10.7974 11.8397C10.8461 11.8923 10.8951 11.9465 10.944 12C10.9087 12.0385 10.8732 12.078 10.8379 12.1162ZM18.8606 12.9121C18.6827 13.3325 18.3833 13.6933 18.0077 13.9471C17.82 14.074 17.6137 14.1742 17.3938 14.2427C17.174 14.3112 16.9407 14.3482 16.6967 14.3482C16.3353 14.3477 16.001 14.275 15.6633 14.1374C15.3686 14.017 15.0731 13.8448 14.7755 13.6277C14.2544 13.2487 13.7313 12.7318 13.2027 12.16C13.154 12.1074 13.105 12.0532 13.0561 11.9998C13.0915 11.9611 13.1269 11.9217 13.1622 11.8835C13.4601 11.5606 13.7554 11.2538 14.05 10.9789C14.4919 10.5658 14.9321 10.2268 15.368 9.99994C15.5862 9.88613 15.803 9.79945 16.0221 9.74095C16.2414 9.6825 16.463 9.65166 16.6967 9.65156C17.0221 9.65166 17.3285 9.71733 17.609 9.83597C18.0294 10.0139 18.3902 10.3133 18.6439 10.6889C18.7709 10.8766 18.871 11.0829 18.9395 11.3027C19.008 11.5225 19.045 11.7558 19.045 11.9999C19.045 12.3252 18.9793 12.6316 18.8606 12.9121Z"${add_attribute("fill", fill, 0)}></path></g><defs><clipPath id="clip0_143_3542"><rect width="24" height="24"${add_attribute("fill", fill, 0)}></rect></clipPath></defs></svg>`;
});
const Logo_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} viewBox="0 0 28 40" fill="none"><path d="M27.6525 32.0409V38.6535C25.9333 37.6255 23.8653 37.0304 21.6411 37.0304C19.8257 37.0304 18.1184 37.4272 16.6156 38.1305C15.5756 38.6174 14.6318 39.2486 13.8263 40.0001C13.0207 39.2486 12.0769 38.6174 11.037 38.1305C9.53412 37.4272 7.82687 37.0304 6.01142 37.0304C3.7872 37.0304 1.71927 37.6255 0 38.6535V32.0409C1.08206 31.3917 2.29636 30.9168 3.60685 30.6583C4.38233 30.502 5.18786 30.4178 6.01142 30.4178C6.62459 30.4178 7.23174 30.4659 7.81485 30.5501C10.1593 30.8988 12.2513 31.9207 13.8263 33.3875C15.4013 31.9207 17.4932 30.8988 19.8377 30.5501C20.4208 30.4659 21.028 30.4178 21.6411 30.4178C22.4647 30.4178 23.2702 30.502 24.0457 30.6583C25.3562 30.9168 26.5705 31.3917 27.6525 32.0409Z" fill="#66E094"></path><path d="M13.8263 0C6.19177 0 0 6.19177 0 13.8263C0 21.4608 6.19177 27.6525 13.8263 27.6525C21.4608 27.6525 27.6525 21.4608 27.6525 13.8263C27.6525 6.19177 21.4608 0 13.8263 0ZM13.8263 21.04C9.8407 21.04 6.61257 17.8118 6.61257 13.8263C6.61257 9.8407 9.8407 6.61257 13.8263 6.61257C17.8118 6.61257 21.04 9.8407 21.04 13.8263C21.04 17.8118 17.8118 21.04 13.8263 21.04Z" fill="white"></path></svg>`;
});
const Value_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { fill = "#FFFFFF" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} viewBox="0 0 24 24" fill="none"><path d="M9.50001 10.5001H12C12.2652 10.5001 12.5196 10.3947 12.7071 10.2072C12.8947 10.0196 13 9.76528 13 9.50007C13 9.23485 12.8947 8.9805 12.7071 8.79296C12.5196 8.60543 12.2652 8.50007 12 8.50007H11V8.00007C11 7.73485 10.8947 7.4805 10.7071 7.29296C10.5196 7.10543 10.2652 7.00007 10 7.00007C9.73479 7.00007 9.48044 7.10543 9.2929 7.29296C9.10537 7.4805 9.00001 7.73485 9.00001 8.00007V8.55007C8.39243 8.67344 7.85237 9.01817 7.48466 9.51733C7.11696 10.0165 6.94785 10.6345 7.01015 11.2513C7.07246 11.8682 7.36174 12.4398 7.82184 12.8554C8.28194 13.2709 8.88003 13.5007 9.50001 13.5001H10.5C10.6326 13.5001 10.7598 13.5527 10.8536 13.6465C10.9473 13.7403 11 13.8675 11 14.0001C11 14.1327 10.9473 14.2599 10.8536 14.3536C10.7598 14.4474 10.6326 14.5001 10.5 14.5001H8.00001C7.73479 14.5001 7.48044 14.6054 7.2929 14.793C7.10537 14.9805 7.00001 15.2349 7.00001 15.5001C7.00001 15.7653 7.10537 16.0196 7.2929 16.2072C7.48044 16.3947 7.73479 16.5001 8.00001 16.5001H9.00001V17.0001C9.00001 17.2653 9.10537 17.5196 9.2929 17.7072C9.48044 17.8947 9.73479 18.0001 10 18.0001C10.2652 18.0001 10.5196 17.8947 10.7071 17.7072C10.8947 17.5196 11 17.2653 11 17.0001V16.4501C11.6076 16.3267 12.1476 15.982 12.5154 15.4828C12.8831 14.9836 13.0522 14.3657 12.9899 13.7488C12.9276 13.132 12.6383 12.5603 12.1782 12.1448C11.7181 11.7292 11.12 11.4994 10.5 11.5001H9.50001C9.3674 11.5001 9.24022 11.4474 9.14645 11.3536C9.05269 11.2599 9.00001 11.1327 9.00001 11.0001C9.00001 10.8675 9.05269 10.7403 9.14645 10.6465C9.24022 10.5527 9.3674 10.5001 9.50001 10.5001ZM21 12.0001H18V3.00007C18.0007 2.82386 17.9548 2.65059 17.867 2.49781C17.7792 2.34504 17.6526 2.21817 17.5 2.13007C17.348 2.0423 17.1755 1.99609 17 1.99609C16.8245 1.99609 16.652 2.0423 16.5 2.13007L13.5 3.85007L10.5 2.13007C10.348 2.0423 10.1755 1.99609 10 1.99609C9.82447 1.99609 9.65203 2.0423 9.50001 2.13007L6.50001 3.85007L3.50001 2.13007C3.34799 2.0423 3.17554 1.99609 3.00001 1.99609C2.82447 1.99609 2.65203 2.0423 2.50001 2.13007C2.3474 2.21817 2.22079 2.34504 2.13299 2.49781C2.04518 2.65059 1.99931 2.82386 2.00001 3.00007V19.0001C2.00001 19.7957 2.31608 20.5588 2.87869 21.1214C3.4413 21.684 4.20436 22.0001 5.00001 22.0001H19C19.7957 22.0001 20.5587 21.684 21.1213 21.1214C21.6839 20.5588 22 19.7957 22 19.0001V13.0001C22 12.7349 21.8947 12.4805 21.7071 12.293C21.5196 12.1054 21.2652 12.0001 21 12.0001ZM5.00001 20.0001C4.73479 20.0001 4.48044 19.8947 4.2929 19.7072C4.10536 19.5196 4.00001 19.2653 4.00001 19.0001V4.73007L6.00001 5.87007C6.15435 5.95068 6.32589 5.99278 6.50001 5.99278C6.67413 5.99278 6.84567 5.95068 7.00001 5.87007L10 4.15007L13 5.87007C13.1543 5.95068 13.3259 5.99278 13.5 5.99278C13.6741 5.99278 13.8457 5.95068 14 5.87007L16 4.73007V19.0001C16.0027 19.3412 16.0636 19.6794 16.18 20.0001H5.00001ZM20 19.0001C20 19.2653 19.8947 19.5196 19.7071 19.7072C19.5196 19.8947 19.2652 20.0001 19 20.0001C18.7348 20.0001 18.4804 19.8947 18.2929 19.7072C18.1054 19.5196 18 19.2653 18 19.0001V14.0001H20V19.0001Z"${add_attribute("fill", fill, 0)}></path></svg>`;
});
const Profile_detail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $profile, $$unsubscribe_profile;
  let profile = writable(null);
  $$unsubscribe_profile = subscribe(profile, (value) => $profile = value);
  $profile && $profile?.profilePicture && $profile?.profilePicture?.length > 0 ? URL.createObjectURL(new Blob([new Uint8Array($profile.profilePicture)])) : "profile_placeholder.png";
  $$unsubscribe_profile();
  return `${`${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}`}`;
});
function createProfileStore() {
  let actor = ActorFactory.createActor(
    idlFactory,
    { "BACKEND_CANISTER_ID": "eur5j-5iaaa-aaaal-qcrva-cai", "FRONTEND_CANISTER_ID": "etq35-qqaaa-aaaal-qcrvq-cai", "DFX_NETWORK": "ic" }.BACKEND_CANISTER_ID
  );
  async function getProfiles(usernameFilter2, firstNameFilter, lastNameFilter, professionFilter2, currentPage, directoryStartFilter) {
    let updatedProfilesData = await actor.getProfiles(
      usernameFilter2,
      firstNameFilter,
      lastNameFilter,
      professionFilter2,
      currentPage,
      directoryStartFilter
    );
    return updatedProfilesData;
  }
  return {
    getProfiles
  };
}
const profilesStore = createProfileStore();
const directoryFilter = writable("A");
const usernameFilter = writable("");
const firstNameFitler = writable("");
const lastNameFitler = writable("");
const professionFilter = writable("");
function blobToSrc(blob) {
  if (blob.length == 0) {
    return "profile_placeholder.png";
  }
  return URL.createObjectURL(new Blob([new Uint8Array(blob)]));
}
const Directory = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $directoryFilter, $$unsubscribe_directoryFilter;
  let $professionFilter, $$unsubscribe_professionFilter;
  let $lastNameFitler, $$unsubscribe_lastNameFitler;
  let $firstNameFitler, $$unsubscribe_firstNameFitler;
  let $usernameFilter, $$unsubscribe_usernameFilter;
  $$unsubscribe_directoryFilter = subscribe(directoryFilter, (value) => $directoryFilter = value);
  $$unsubscribe_professionFilter = subscribe(professionFilter, (value) => $professionFilter = value);
  $$unsubscribe_lastNameFitler = subscribe(lastNameFitler, (value) => $lastNameFitler = value);
  $$unsubscribe_firstNameFitler = subscribe(firstNameFitler, (value) => $firstNameFitler = value);
  $$unsubscribe_usernameFilter = subscribe(usernameFilter, (value) => $usernameFilter = value);
  let directoryResult;
  let currentPage = 1;
  let totalPages = 1;
  let isLoading = true;
  async function fetchProfiles() {
    directoryResult = await profilesStore.getProfiles($usernameFilter, $firstNameFitler, $lastNameFitler, $professionFilter, currentPage, $directoryFilter);
    totalPages = Math.ceil(Number(directoryResult.totalEntries) / 25);
    isLoading = false;
  }
  async function getProfiles() {
    try {
      busyStore.startBusy({
        initiator: "fetch-profiles",
        text: "Fetch profiles..."
      });
      await fetchProfiles();
    } catch (error2) {
      console.error("Error loading directory:", error2);
    } finally {
      busyStore.stopBusy("fetch-profiles");
    }
  }
  {
    {
      if ($directoryFilter !== "") {
        getProfiles();
      }
    }
  }
  $$unsubscribe_directoryFilter();
  $$unsubscribe_professionFilter();
  $$unsubscribe_lastNameFitler();
  $$unsubscribe_firstNameFitler();
  $$unsubscribe_usernameFilter();
  return `<h1 data-svelte-h="svelte-12ucp9m">OpenBook Directory</h1> ${!isLoading ? `<div class="filters flex flex-col w-full h-full"><div class="flex flex-col md:flex-row md:space-x-4 mt-2 md:mt-4"><div class="w-full md:w-1/2 mb-2 md:mb-0"><input class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2" type="text" placeholder="Username"${add_attribute("value", $usernameFilter, 0)}></div> <div class="w-full md:w-1/2 mb-2 md:mb-0"><input class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2" type="text" placeholder="First Name"${add_attribute("value", $firstNameFitler, 0)}></div></div> <div class="flex flex-col md:flex-row md:space-x-4 md:mt-4"><div class="w-full md:w-1/2 mb-2 md:mb-0"><input class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2" type="text" placeholder="Last Name"${add_attribute("value", $lastNameFitler, 0)}></div> <div class="w-full md:w-1/2 mb-2 md:mb-0"><input class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2" type="text" placeholder="Profession"${add_attribute("value", $professionFilter, 0)}></div></div> <div class="flex flex-row mt-2 md:mt-4"><button class="book-btn" data-svelte-h="svelte-1xkd8vn">Search</button></div></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">${each(directoryResult.profiles, (profile) => {
    return `<div class="card rounded-t-md shadow-md overflow-hidden m-4 directory-card"><img class="w-full h-48 object-cover"${add_attribute("src", blobToSrc(profile.profilePicture), 0)}${add_attribute("alt", profile.username, 0)}> <div class="p-4"><h2 class="text-lg font-bold">${escape(profile.firstName)} ${escape(profile.lastName)}</h2> <p class="text-sm flex items-center">${validate_component(Logo_icon, "LogoIcon").$$render($$result, { className: "w-2 mr-1" }, {}, {})} ${escape(profile.username)}</p> <p class="text-sm">${escape(profile.profession)}</p></div> </div>`;
  })}</div> <div class="pagination flex items-center justify-center space-x-4"><button class="${"book-btn " + escape("disabled", true)}" ${"disabled"}>&lt;</button> <span>Page ${escape(currentPage)} / ${escape(totalPages)}</span> <button class="${"book-btn " + escape(currentPage === totalPages ? "disabled" : "", true)}" ${currentPage === totalPages ? "disabled" : ""}>&gt;</button></div>` : ``}`;
});
const Whitepaper_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { fill = "#FFFFFF" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} viewBox="0 0 24 24" fill="none"><path d="M11.362 2C15.518 2 14 8 14 8C14 8 20 6.35 20 10.457V22H4V2H11.362ZM12.189 0H2V24H22V9.614C22 7.223 15.352 0 12.189 0ZM17 13H7V12H17V13ZM17 15H7V16H17V15ZM14 18H7V19H14V18Z"${add_attribute("fill", fill, 0)}></path></svg>`;
});
const Home_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { fill = "#FFFFFF" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} viewBox="0 0 24 24" fill="none"><path fill="none"${add_attribute("stroke", fill, 0)} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path fill="none"${add_attribute("stroke", fill, 0)} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 22V12h6v10"></path></svg>`;
});
const Directory_nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_professionFilter;
  let $$unsubscribe_directoryFilter;
  $$unsubscribe_professionFilter = subscribe(professionFilter, (value) => value);
  $$unsubscribe_directoryFilter = subscribe(directoryFilter, (value) => value);
  $$unsubscribe_professionFilter();
  $$unsubscribe_directoryFilter();
  return `<div class="flex flex-col space-y-1 items-center mt-4 text-sm"><button${add_attribute(
    "class",
    ` ${"directory-nav-btn-active"}`,
    0
  )}>A</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>B</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>C</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>D</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>E</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>F</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>G</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>H</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>I</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>J</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>K</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>L</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>M</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>N</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>O</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>P</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>Q</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>R</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>S</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>T</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>U</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>V</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>W</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>X</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>Y</button> <button${add_attribute(
    "class",
    ` ${"directory-nav-btn"}`,
    0
  )}>Z</button></div>`;
});
const Dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentRoute;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  currentRoute = $page.url.pathname;
  $$unsubscribe_page();
  return `<nav class="p-4 h-full side-nav flex flex-col items-center"><a href="/">${validate_component(Logo_icon, "Logo").$$render($$result, { className: "w-6" }, {}, {})}</a> <button>${validate_component(Home_icon, "HomeIcon").$$render(
    $$result,
    {
      className: "side-nav-icon",
      fill: currentRoute === "/" ? "#FFFFFF" : "#8C8C8C"
    },
    {},
    {}
  )}</button> <button>${validate_component(Icp_icon, "IcpIcon").$$render(
    $$result,
    {
      className: "side-nav-icon",
      fill: currentRoute === "/directory" ? "#FFFFFF" : "#8C8C8C"
    },
    {},
    {}
  )}</button> ${currentRoute === "/" ? `<button>${validate_component(Whitepaper_icon, "WhitepaperIcon").$$render(
    $$result,
    {
      className: "side-nav-icon",
      fill: "#8C8C8C"
    },
    {},
    {}
  )}</button>` : ``} ${``} ${currentRoute === "/directory" ? `${validate_component(Directory_nav, "DirectoryNav").$$render($$result, {}, {}, {})}` : ``} <div class="pull-down">${validate_component(Expand_icon, "ExpandIcon").$$render($$result, { fill: "#555555" }, {}, {})}</div></nav> <div class="w-full">${validate_component(Dashboard_header, "DashboardHeader").$$render($$result, {}, {}, {})} <div class="flex-1 p-4">${currentRoute === "/profile" ? `${validate_component(Profile_detail, "ProfileDetail").$$render($$result, {}, {}, {})}` : ``} ${currentRoute === "/directory" ? `${validate_component(Directory, "IcpDirectory").$$render($$result, {}, {}, {})}` : ``} ${``} ${``} ${``} ${currentRoute === "/" ? `<p class="text-2xl" data-svelte-h="svelte-11g1yv3">Welcome to OpenBook</p> <p data-svelte-h="svelte-53rjjq">OpenBook is a decentralised business management tool for organisations
        of all sizes.</p> <button class="book-btn mt-4" data-svelte-h="svelte-shnzvf">Create Profile</button> <button class="book-btn mt-4 disabled text-xs" data-svelte-h="svelte-1b189a6">Create Organisation (soon)</button>` : ``}</div></div>`;
});
const Landing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="relative md:w-auto w-full h-full overflow-hidden md:overflow-visible" data-svelte-h="svelte-14qlssr"><img src="home.png" alt="" class="hidden-image aspect-w-16 md:h-full w-full md:w-auto object-cover object-middle"></div> <div class="md:flex-1 flex flex-col justify-center items-center p-4 md:p-12 my-16 md:my-2"><div class="md:flex-1 flex flex-col justify-center items-center p-4 md:p-12 my-16 md:my-2 space-y-8">${validate_component(Logo_icon, "Logo").$$render($$result, { className: "w-24" }, {}, {})} <p data-svelte-h="svelte-xf904x">Welcome Back</p> <p class="hidden" data-svelte-h="svelte-8vrkqj">Please connect to continue</p> <div class="flex flex-row space-x-2"><button class="book-btn min-w-[150px]" data-svelte-h="svelte-k8064b">Connect</button> <a href="/whitepaper" class="book-btn min-w-[150px]" data-svelte-h="svelte-vlfr5f">Whitepaper</a></div> <p class="text-center" data-svelte-h="svelte-5t7oxk">Welcome to OpenBook, the future of business management at your fingertips!
      Experience the ease of decentralised business management, secure
      transaction management and real-time insights.</p></div></div>`;
});
const Page$3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authSignedInStore, $$unsubscribe_authSignedInStore;
  $$unsubscribe_authSignedInStore = subscribe(authSignedInStore, (value) => $authSignedInStore = value);
  $$unsubscribe_authSignedInStore();
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex flex-row h-screen w-full">${$authSignedInStore ? `${validate_component(Dashboard, "Dashboard").$$render($$result, {}, {}, {})}` : `${validate_component(Landing, "Landing").$$render($$result, {}, {}, {})}`}</div>`;
    }
  })}`;
});
const Page$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authSignedInStore, $$unsubscribe_authSignedInStore;
  $$unsubscribe_authSignedInStore = subscribe(authSignedInStore, (value) => $authSignedInStore = value);
  $$unsubscribe_authSignedInStore();
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex flex-row h-full w-full">${$authSignedInStore ? `${validate_component(Dashboard, "Dashboard").$$render($$result, {}, {}, {})}` : `${validate_component(Landing, "Landing").$$render($$result, {}, {}, {})}`}</div>`;
    }
  })}`;
});
const Page$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $authSignedInStore, $$unsubscribe_authSignedInStore;
  $$unsubscribe_authSignedInStore = subscribe(authSignedInStore, (value) => $authSignedInStore = value);
  $$unsubscribe_authSignedInStore();
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `${$authSignedInStore ? `<div class="flex flex-row h-full md:h-screen w-full">${validate_component(Dashboard, "Dashboard").$$render($$result, {}, {}, {})}</div>` : `<div class="flex flex-row h-screen w-full">${validate_component(Landing, "Landing").$$render($$result, {}, {}, {})}</div>`}`;
    }
  })}`;
});
const Vision = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 class="text-2xl mb-8 mt-4" data-svelte-h="svelte-i9bpij">Vision</h1> <div class="flex flex-col space-y-8 mt-4 mb-4 mb-4" data-svelte-h="svelte-1dhp9yb"><p>Businesses are increasingly turning to Software as a Service (SaaS)
    platforms to manager their internal processes. Platforms like Salesforce &amp;
    Quickbooks use this common software distribution model in which applications
    are hosted by a third-party provider and made available to customers over
    the internet. This model allows businesses to access software applications
    without the need for internal hardware or technical expertise, paying on a
    subscription basis.</p> <p>The Internet Computer blockchain has provided the world with a foundation
    for genuine decentralisation. This technological leap is particularly
    transformative for businesses worldwide, which are increasingly reliant on
    Software as a Service (SaaS) platforms for critical data processing.</p> <p>Businesses today face the task of managing multiple subscriptions across a
    range of platforms. Their use cases often extend further, encompassing
    multiple organisations, currencies, and user roles. These challenges open
    the door for opportunities to create a more streamlined and integrated
    approach to business operations.</p> <p>In the world of SaaS platforms, diversity in functionality often comes at a
    cost. These platforms are frequently cluttered with ads, compromising the
    user experience. Additionally, they are characterised by complex
    subscription models, where access to full features is often gated behind
    various tiers of service. This can lead to a situation where businesses feel
    trapped, using software that doesn&#39;t fully meet their needs or forces them
    into paying more for essential features.</p> <p>Moreover, each dataset is privately held, limiting the potential for broader
    societal benefits. These siloed data repositories prevent the collective
    intelligence and insights that could be gleaned from a more open and shared
    approach.</p> <p>This is where a transformative opportunity emerges. Envision harnessing the
    power of these extensive datasets in an accessible, unified way. By applying
    AI to a consolidated data lake, a DAO could democratically decide to develop
    powerful tools.</p> <p>These tools wouldn&#39;t just elevate business operations&#39; functionality and
    efficiency; they could also offer broader societal benefits. This vast
    resource of data holds potential far beyond individual organisational
    growth. It represents a communal asset, poised to drive innovation and
    progress in a manner that resonates with the ethos of decentralisation.</p> <p>Furthermore, a critical issue in today&#39;s SaaS environment is data ownership.
    Currently, businesses often don&#39;t retain full control over their own data.
    This limitation restricts their ability to fully leverage this asset,
    particularly in the creation of bespoke AI models and other innovative
    applications. Changing this paradigm is essential. By shifting towards a
    model where businesses retain ownership of their data, they are empowered to
    explore and implement custom AI solutions and other tools that cater
    specifically to their unique needs and objectives.</p></div>`;
});
const Mvp_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { fill = "#FFFFFF" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} viewBox="0 0 24 24" fill="none"><path d="M21 2H9C8.73478 2 8.48043 2.10536 8.29289 2.29289C8.10536 2.48043 8 2.73478 8 3V7H6C5.73478 7 5.48043 7.10536 5.29289 7.29289C5.10536 7.48043 5 7.73478 5 8V12H3C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H11C11.2652 22 11.5196 21.8946 11.7071 21.7071C11.8946 21.5196 12 21.2652 12 21V19H16C16.2652 19 16.5196 18.8946 16.7071 18.7071C16.8946 18.5196 17 18.2652 17 18V16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2ZM10 20H4V14H10V20ZM15 17H12V13C12 12.7348 11.8946 12.4804 11.7071 12.2929C11.5196 12.1054 11.2652 12 11 12H7V9H15V17ZM20 14H17V8C17 7.73478 16.8946 7.48043 16.7071 7.29289C16.5196 7.10536 16.2652 7 16 7H10V4H20V14Z"${add_attribute("fill", fill, 0)}></path></svg>`;
});
const Team_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { fill = "#FFFFFF" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} viewBox="0 0 24 24" fill="none"><g clip-path="url(#clip0_15_112)"><path d="M10.644 17.08C13.51 16.418 15.183 15.839 13.89 13.398C9.958 5.971 12.848 2 17.001 2C21.236 2 24.055 6.124 20.111 13.398C18.779 15.853 20.548 16.432 23.353 17.08C25.836 17.654 26 18.867 26 20.969V22H8C8 19.255 7.78 17.742 10.644 17.08ZM-2 22H5.809C5.774 13.823 9.245 16.687 9.245 10.873C9.245 8.362 7.606 7 5.497 7C2.382 7 0.215 9.979 3.164 15.549C4.133 17.379 2.133 17.814 -0.017 18.31C-1.879 18.74 -2 19.65 -2 21.227V22Z"${add_attribute("fill", fill, 0)}></path></g><defs><clipPath id="clip0_15_112"><rect width="24" height="24"${add_attribute("fill", fill, 0)}></rect></clipPath></defs></svg>`;
});
const Roadmap_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { fill = "#FFFFFF" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} viewBox="0 0 24 24" fill="none"><g clip-path="url(#clip0_15_154)"><path d="M5 9C6.654 9 8 10.346 8 12C8 13.654 6.654 15 5 15C3.346 15 2 13.654 2 12C2 10.346 3.346 9 5 9ZM5 7C2.238 7 0 9.239 0 12C0 14.761 2.238 17 5 17C7.762 17 10 14.761 10 12C10 9.239 7.762 7 5 7ZM20 16C18.835 16 17.796 16.506 17.065 17.301L11.577 14.374C11.347 15.01 11.028 15.603 10.633 16.138L16.121 19.065C16.049 19.366 16 19.676 16 20C16 22.209 17.791 24 20 24C22.209 24 24 22.209 24 20C24 17.791 22.209 16 20 16ZM20 22C18.897 22 18 21.103 18 20C18 18.897 18.897 18 20 18C21.103 18 22 18.897 22 20C22 21.103 21.103 22 20 22ZM20 0C17.791 0 16 1.791 16 4C16 4.324 16.049 4.634 16.121 4.935L10.633 7.862C11.028 8.398 11.346 8.99 11.577 9.626L17.065 6.699C17.796 7.494 18.835 8 20 8C22.209 8 24 6.209 24 4C24 1.791 22.209 0 20 0ZM20 6C18.897 6 18 5.103 18 4C18 2.897 18.897 2 20 2C21.103 2 22 2.897 22 4C22 5.103 21.103 6 20 6Z"${add_attribute("fill", fill, 0)}></path></g><defs><clipPath id="clip0_15_154"><rect width="24" height="24"${add_attribute("fill", fill, 0)}></rect></clipPath></defs></svg>`;
});
const Vision_icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { className = "" } = $$props;
  let { fill = "#FFFFFF" } = $$props;
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
    $$bindings.fill(fill);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", className, 0)} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3"${add_attribute("stroke", fill, 0)} stroke-width="2"></circle><path d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z"${add_attribute("stroke", fill, 0)} stroke-width="2"></path></svg>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".side-nav.svelte-13ks2f8{background-color:#1a1a1d;border-right:1px solid #2e323a}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentRoute;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let activeSection = 0;
  let sections = ["vision", "value", "roadmap", "mvp", "team"];
  $$result.css.add(css);
  currentRoute = $page.url.pathname;
  $$unsubscribe_page();
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex h-full"><nav class="p-4 h-full side-nav flex flex-col svelte-13ks2f8"><a href="/">${validate_component(Logo_icon, "Logo").$$render($$result, { className: "w-6" }, {}, {})}</a> <button>${validate_component(Home_icon, "HomeIcon").$$render(
        $$result,
        {
          className: "side-nav-icon",
          fill: currentRoute === "/" ? "#FFFFFF" : "#8C8C8C"
        },
        {},
        {}
      )}</button> <button>${validate_component(Vision_icon, "VisionIcon").$$render(
        $$result,
        {
          className: "side-nav-icon",
          fill: "#FFFFFF"
        },
        {},
        {}
      )}</button> <button>${validate_component(Value_icon, "ValueIcon").$$render(
        $$result,
        {
          className: "side-nav-icon",
          fill: "#8C8C8C"
        },
        {},
        {}
      )}</button> <button>${validate_component(Roadmap_icon, "RoadmapIcon").$$render(
        $$result,
        {
          className: "side-nav-icon",
          fill: "#8C8C8C"
        },
        {},
        {}
      )}</button> <button>${validate_component(Mvp_icon, "MvpIcon").$$render(
        $$result,
        {
          className: "side-nav-icon",
          fill: "#8C8C8C"
        },
        {},
        {}
      )}</button> <button>${validate_component(Team_icon, "TeamIcon").$$render(
        $$result,
        {
          className: "side-nav-icon",
          fill: "#8C8C8C"
        },
        {},
        {}
      )}</button></nav> <main class="flex-1"><div class="w-full p-4 px-8 top-bar" data-svelte-h="svelte-ra0uei"><h1>OpenBook Whitepaper</h1></div> <div class="p-4 px-8">${`${validate_component(Vision, "Vision").$$render($$result, {}, {}, {})}`} ${``} ${``} ${``} ${``}</div> <div class="flex flex-row space-x-4 px-7 mb-4"><button ${"disabled"} class="${"book-btn " + escape("disabled", true)}">&lt; Prior Section</button> <button ${activeSection == sections.length - 1 ? "disabled" : ""} class="${"book-btn " + escape(activeSection == sections.length - 1 ? "disabled" : "", true)}">Next Section &gt;</button></div></main></div>`;
    }
  })}`;
});
export {
  Error$1 as E,
  Layout$1 as L,
  Page$3 as P,
  Server as S,
  set_building as a,
  set_private_env as b,
  set_public_env as c,
  Page$2 as d,
  Page$1 as e,
  Page as f,
  get_hooks as g,
  options as o,
  set_assets as s
};
