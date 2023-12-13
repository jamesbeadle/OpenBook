var ps = Object.defineProperty;
var _s = (t, e, n) =>
  e in t
    ? ps(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (t[e] = n);
var Ut = (t, e, n) => (_s(t, typeof e != 'symbol' ? e + '' : e, n), n);
import { Y as At, c as We, A as gs, u as ms } from './vendor.13a93589.js';
function T() {}
const Dt = (t) => t;
function vs(t, e) {
  for (const n in e) t[n] = e[n];
  return t;
}
function Mn(t) {
  return t();
}
function ln() {
  return Object.create(null);
}
function Fe(t) {
  t.forEach(Mn);
}
function ht(t) {
  return typeof t == 'function';
}
function ie(t, e) {
  return t != t
    ? e == e
    : t !== e || (t && typeof t == 'object') || typeof t == 'function';
}
function ys(t) {
  return Object.keys(t).length === 0;
}
function Fn(t, ...e) {
  if (t == null) {
    for (const s of e) s(void 0);
    return T;
  }
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function rt(t, e, n) {
  t.$$.on_destroy.push(Fn(e, n));
}
function Rn(t, e, n, s) {
  if (t) {
    const r = Dn(t, e, n, s);
    return t[0](r);
  }
}
function Dn(t, e, n, s) {
  return t[1] && s ? vs(n.ctx.slice(), t[1](s(e))) : n.ctx;
}
function Vn(t, e, n, s) {
  if (t[2] && s) {
    const r = t[2](s(n));
    if (e.dirty === void 0) return r;
    if (typeof r == 'object') {
      const a = [],
        i = Math.max(e.dirty.length, r.length);
      for (let o = 0; o < i; o += 1) a[o] = e.dirty[o] | r[o];
      return a;
    }
    return e.dirty | r;
  }
  return e.dirty;
}
function jn(t, e, n, s, r, a) {
  if (r) {
    const i = Dn(e, n, s, a);
    t.p(i, r);
  }
}
function Hn(t) {
  if (t.ctx.length > 32) {
    const e = [],
      n = t.ctx.length / 32;
    for (let s = 0; s < n; s++) e[s] = -1;
    return e;
  }
  return -1;
}
function ft(t) {
  return t ?? '';
}
function cn(t) {
  const e = typeof t == 'string' && t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return e ? [parseFloat(e[1]), e[2] || 'px'] : [t, 'px'];
}
const Un = typeof window < 'u';
let Yt = Un ? () => window.performance.now() : () => Date.now(),
  Xt = Un ? (t) => requestAnimationFrame(t) : T;
const ct = new Set();
function zn(t) {
  ct.forEach((e) => {
    e.c(t) || (ct.delete(e), e.f());
  }),
    ct.size !== 0 && Xt(zn);
}
function en(t) {
  let e;
  return (
    ct.size === 0 && Xt(zn),
    {
      promise: new Promise((n) => {
        ct.add((e = { c: t, f: n }));
      }),
      abort() {
        ct.delete(e);
      },
    }
  );
}
let Vt = !1;
function ws() {
  Vt = !0;
}
function bs() {
  Vt = !1;
}
function Cs(t, e, n, s) {
  for (; t < e; ) {
    const r = t + ((e - t) >> 1);
    n(r) <= s ? (t = r + 1) : (e = r);
  }
  return t;
}
function $s(t) {
  if (t.hydrate_init) return;
  t.hydrate_init = !0;
  let e = t.childNodes;
  if (t.nodeName === 'HEAD') {
    const c = [];
    for (let l = 0; l < e.length; l++) {
      const u = e[l];
      u.claim_order !== void 0 && c.push(u);
    }
    e = c;
  }
  const n = new Int32Array(e.length + 1),
    s = new Int32Array(e.length);
  n[0] = -1;
  let r = 0;
  for (let c = 0; c < e.length; c++) {
    const l = e[c].claim_order,
      u =
        (r > 0 && e[n[r]].claim_order <= l
          ? r + 1
          : Cs(1, r, (w) => e[n[w]].claim_order, l)) - 1;
    s[c] = n[u] + 1;
    const h = u + 1;
    (n[h] = c), (r = Math.max(h, r));
  }
  const a = [],
    i = [];
  let o = e.length - 1;
  for (let c = n[r] + 1; c != 0; c = s[c - 1]) {
    for (a.push(e[c - 1]); o >= c; o--) i.push(e[o]);
    o--;
  }
  for (; o >= 0; o--) i.push(e[o]);
  a.reverse(), i.sort((c, l) => c.claim_order - l.claim_order);
  for (let c = 0, l = 0; c < i.length; c++) {
    for (; l < a.length && i[c].claim_order >= a[l].claim_order; ) l++;
    const u = l < a.length ? a[l] : null;
    t.insertBefore(i[c], u);
  }
}
function ks(t, e) {
  t.appendChild(e);
}
function qn(t) {
  if (!t) return document;
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
  return e && e.host ? e : t.ownerDocument;
}
function Es(t) {
  const e = P('style');
  return (e.textContent = '/* empty */'), xs(qn(t), e), e.sheet;
}
function xs(t, e) {
  return ks(t.head || t, e), e.sheet;
}
function y(t, e) {
  if (Vt) {
    for (
      $s(t),
        (t.actual_end_child === void 0 ||
          (t.actual_end_child !== null &&
            t.actual_end_child.parentNode !== t)) &&
          (t.actual_end_child = t.firstChild);
      t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

    )
      t.actual_end_child = t.actual_end_child.nextSibling;
    e !== t.actual_end_child
      ? (e.claim_order !== void 0 || e.parentNode !== t) &&
        t.insertBefore(e, t.actual_end_child)
      : (t.actual_end_child = e.nextSibling);
  } else (e.parentNode !== t || e.nextSibling !== null) && t.appendChild(e);
}
function I(t, e, n) {
  Vt && !n
    ? y(t, e)
    : (e.parentNode !== t || e.nextSibling != n) &&
      t.insertBefore(e, n || null);
}
function p(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function P(t) {
  return document.createElement(t);
}
function D(t) {
  return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function Ie(t) {
  return document.createTextNode(t);
}
function Y() {
  return Ie(' ');
}
function _e() {
  return Ie('');
}
function je(t, e, n, s) {
  return t.addEventListener(e, n, s), () => t.removeEventListener(e, n, s);
}
function f(t, e, n) {
  n == null
    ? t.removeAttribute(e)
    : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function ge(t) {
  return t.dataset.svelteH;
}
function k(t) {
  return Array.from(t.childNodes);
}
function Ss(t) {
  t.claim_info === void 0 &&
    (t.claim_info = { last_index: 0, total_claimed: 0 });
}
function Kn(t, e, n, s, r = !1) {
  Ss(t);
  const a = (() => {
    for (let i = t.claim_info.last_index; i < t.length; i++) {
      const o = t[i];
      if (e(o)) {
        const c = n(o);
        return (
          c === void 0 ? t.splice(i, 1) : (t[i] = c),
          r || (t.claim_info.last_index = i),
          o
        );
      }
    }
    for (let i = t.claim_info.last_index - 1; i >= 0; i--) {
      const o = t[i];
      if (e(o)) {
        const c = n(o);
        return (
          c === void 0 ? t.splice(i, 1) : (t[i] = c),
          r
            ? c === void 0 && t.claim_info.last_index--
            : (t.claim_info.last_index = i),
          o
        );
      }
    }
    return s();
  })();
  return (
    (a.claim_order = t.claim_info.total_claimed),
    (t.claim_info.total_claimed += 1),
    a
  );
}
function Zn(t, e, n, s) {
  return Kn(
    t,
    (r) => r.nodeName === e,
    (r) => {
      const a = [];
      for (let i = 0; i < r.attributes.length; i++) {
        const o = r.attributes[i];
        n[o.name] || a.push(o.name);
      }
      a.forEach((i) => r.removeAttribute(i));
    },
    () => s(e),
  );
}
function B(t, e, n) {
  return Zn(t, e, n, P);
}
function H(t, e, n) {
  return Zn(t, e, n, D);
}
function He(t, e) {
  return Kn(
    t,
    (n) => n.nodeType === 3,
    (n) => {
      const s = '' + e;
      if (n.data.startsWith(s)) {
        if (n.data.length !== s.length) return n.splitText(s.length);
      } else n.data = s;
    },
    () => Ie(e),
    !0,
  );
}
function X(t) {
  return He(t, ' ');
}
function dt(t, e) {
  (e = '' + e), t.data !== e && (t.data = e);
}
function De(t, e, n, s) {
  n == null
    ? t.style.removeProperty(e)
    : t.style.setProperty(e, n, s ? 'important' : '');
}
function Ne(t, e, n) {
  t.classList.toggle(e, !!n);
}
function Ts(t, e, { bubbles: n = !1, cancelable: s = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: n, cancelable: s });
}
function Me(t, e) {
  return new t(e);
}
const Pt = new Map();
let Bt = 0;
function Os(t) {
  let e = 5381,
    n = t.length;
  for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
  return e >>> 0;
}
function Is(t, e) {
  const n = { stylesheet: Es(e), rules: {} };
  return Pt.set(t, n), n;
}
function Nt(t, e, n, s, r, a, i, o = 0) {
  const c = 16.666 / s;
  let l = `{
`;
  for (let C = 0; C <= 1; C += c) {
    const z = e + (n - e) * a(C);
    l +=
      C * 100 +
      `%{${i(z, 1 - z)}}
`;
  }
  const u =
      l +
      `100% {${i(n, 1 - n)}}
}`,
    h = `__svelte_${Os(u)}_${o}`,
    w = qn(t),
    { stylesheet: $, rules: v } = Pt.get(w) || Is(w, t);
  v[h] ||
    ((v[h] = !0), $.insertRule(`@keyframes ${h} ${u}`, $.cssRules.length));
  const x = t.style.animation || '';
  return (
    (t.style.animation = `${
      x ? `${x}, ` : ''
    }${h} ${s}ms linear ${r}ms 1 both`),
    (Bt += 1),
    h
  );
}
function Lt(t, e) {
  const n = (t.style.animation || '').split(', '),
    s = n.filter(
      e ? (a) => a.indexOf(e) < 0 : (a) => a.indexOf('__svelte') === -1,
    ),
    r = n.length - s.length;
  r && ((t.style.animation = s.join(', ')), (Bt -= r), Bt || As());
}
function As() {
  Xt(() => {
    Bt ||
      (Pt.forEach((t) => {
        const { ownerNode: e } = t.stylesheet;
        e && p(e);
      }),
      Pt.clear());
  });
}
let $t;
function wt(t) {
  $t = t;
}
function tn() {
  if (!$t) throw new Error('Function called outside component initialization');
  return $t;
}
function nt(t) {
  tn().$$.on_mount.push(t);
}
function Ps(t) {
  tn().$$.after_update.push(t);
}
function Bs(t) {
  tn().$$.on_destroy.push(t);
}
const lt = [],
  bt = [];
let ut = [];
const un = [],
  Wn = Promise.resolve();
let Jt = !1;
function Gn() {
  Jt || ((Jt = !0), Wn.then(Jn));
}
function Tt() {
  return Gn(), Wn;
}
function Je(t) {
  ut.push(t);
}
const zt = new Set();
let it = 0;
function Jn() {
  if (it !== 0) return;
  const t = $t;
  do {
    try {
      for (; it < lt.length; ) {
        const e = lt[it];
        it++, wt(e), Ns(e.$$);
      }
    } catch (e) {
      throw ((lt.length = 0), (it = 0), e);
    }
    for (wt(null), lt.length = 0, it = 0; bt.length; ) bt.pop()();
    for (let e = 0; e < ut.length; e += 1) {
      const n = ut[e];
      zt.has(n) || (zt.add(n), n());
    }
    ut.length = 0;
  } while (lt.length);
  for (; un.length; ) un.pop()();
  (Jt = !1), zt.clear(), wt(t);
}
function Ns(t) {
  if (t.fragment !== null) {
    t.update(), Fe(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, e),
      t.after_update.forEach(Je);
  }
}
function Ls(t) {
  const e = [],
    n = [];
  ut.forEach((s) => (t.indexOf(s) === -1 ? e.push(s) : n.push(s))),
    n.forEach((s) => s()),
    (ut = e);
}
let mt;
function nn() {
  return (
    mt ||
      ((mt = Promise.resolve()),
      mt.then(() => {
        mt = null;
      })),
    mt
  );
}
function st(t, e, n) {
  t.dispatchEvent(Ts(`${e ? 'intro' : 'outro'}${n}`));
}
const Ot = new Set();
let Le;
function ye() {
  Le = { r: 0, c: [], p: Le };
}
function we() {
  Le.r || Fe(Le.c), (Le = Le.p);
}
function S(t, e) {
  t && t.i && (Ot.delete(t), t.i(e));
}
function O(t, e, n, s) {
  if (t && t.o) {
    if (Ot.has(t)) return;
    Ot.add(t),
      Le.c.push(() => {
        Ot.delete(t), s && (n && t.d(1), s());
      }),
      t.o(e);
  } else s && s();
}
const sn = { duration: 0 };
function Ms(t, e, n) {
  const s = { direction: 'in' };
  let r = e(t, n, s),
    a = !1,
    i,
    o,
    c = 0;
  function l() {
    i && Lt(t, i);
  }
  function u() {
    const {
      delay: w = 0,
      duration: $ = 300,
      easing: v = Dt,
      tick: x = T,
      css: C,
    } = r || sn;
    C && (i = Nt(t, 0, 1, $, w, v, C, c++)), x(0, 1);
    const z = Yt() + w,
      V = z + $;
    o && o.abort(),
      (a = !0),
      Je(() => st(t, !0, 'start')),
      (o = en((L) => {
        if (a) {
          if (L >= V) return x(1, 0), st(t, !0, 'end'), l(), (a = !1);
          if (L >= z) {
            const G = v((L - z) / $);
            x(G, 1 - G);
          }
        }
        return a;
      }));
  }
  let h = !1;
  return {
    start() {
      h || ((h = !0), Lt(t), ht(r) ? ((r = r(s)), nn().then(u)) : u());
    },
    invalidate() {
      h = !1;
    },
    end() {
      a && (l(), (a = !1));
    },
  };
}
function Fs(t, e, n) {
  const s = { direction: 'out' };
  let r = e(t, n, s),
    a = !0,
    i;
  const o = Le;
  o.r += 1;
  let c;
  function l() {
    const {
      delay: u = 0,
      duration: h = 300,
      easing: w = Dt,
      tick: $ = T,
      css: v,
    } = r || sn;
    v && (i = Nt(t, 1, 0, h, u, w, v));
    const x = Yt() + u,
      C = x + h;
    Je(() => st(t, !1, 'start')),
      'inert' in t && ((c = t.inert), (t.inert = !0)),
      en((z) => {
        if (a) {
          if (z >= C) return $(0, 1), st(t, !1, 'end'), --o.r || Fe(o.c), !1;
          if (z >= x) {
            const V = w((z - x) / h);
            $(1 - V, V);
          }
        }
        return a;
      });
  }
  return (
    ht(r)
      ? nn().then(() => {
          (r = r(s)), l();
        })
      : l(),
    {
      end(u) {
        u && 'inert' in t && (t.inert = c),
          u && r.tick && r.tick(1, 0),
          a && (i && Lt(t, i), (a = !1));
      },
    }
  );
}
function fn(t, e, n, s) {
  let a = e(t, n, { direction: 'both' }),
    i = s ? 0 : 1,
    o = null,
    c = null,
    l = null,
    u;
  function h() {
    l && Lt(t, l);
  }
  function w(v, x) {
    const C = v.b - i;
    return (
      (x *= Math.abs(C)),
      {
        a: i,
        b: v.b,
        d: C,
        duration: x,
        start: v.start,
        end: v.start + x,
        group: v.group,
      }
    );
  }
  function $(v) {
    const {
        delay: x = 0,
        duration: C = 300,
        easing: z = Dt,
        tick: V = T,
        css: L,
      } = a || sn,
      G = { start: Yt() + x, b: v };
    v || ((G.group = Le), (Le.r += 1)),
      'inert' in t &&
        (v ? u !== void 0 && (t.inert = u) : ((u = t.inert), (t.inert = !0))),
      o || c
        ? (c = G)
        : (L && (h(), (l = Nt(t, i, v, C, x, z, L))),
          v && V(0, 1),
          (o = w(G, C)),
          Je(() => st(t, v, 'start')),
          en((q) => {
            if (
              (c &&
                q > c.start &&
                ((o = w(c, C)),
                (c = null),
                st(t, o.b, 'start'),
                L && (h(), (l = Nt(t, i, o.b, o.duration, 0, z, a.css)))),
              o)
            ) {
              if (q >= o.end)
                V((i = o.b), 1 - i),
                  st(t, o.b, 'end'),
                  c || (o.b ? h() : --o.group.r || Fe(o.group.c)),
                  (o = null);
              else if (q >= o.start) {
                const J = q - o.start;
                (i = o.a + o.d * z(J / o.duration)), V(i, 1 - i);
              }
            }
            return !!(o || c);
          }));
  }
  return {
    run(v) {
      ht(a)
        ? nn().then(() => {
            (a = a({ direction: v ? 'in' : 'out' })), $(v);
          })
        : $(v);
    },
    end() {
      h(), (o = c = null);
    },
  };
}
function dn(t) {
  return t?.length !== void 0 ? t : Array.from(t);
}
function Rs(t, e) {
  O(t, 1, 1, () => {
    e.delete(t.key);
  });
}
function Ds(t, e, n, s, r, a, i, o, c, l, u, h) {
  let w = t.length,
    $ = a.length,
    v = w;
  const x = {};
  for (; v--; ) x[t[v].key] = v;
  const C = [],
    z = new Map(),
    V = new Map(),
    L = [];
  for (v = $; v--; ) {
    const Q = h(r, a, v),
      re = n(Q);
    let K = i.get(re);
    K ? s && L.push(() => K.p(Q, e)) : ((K = l(re, Q)), K.c()),
      z.set(re, (C[v] = K)),
      re in x && V.set(re, Math.abs(v - x[re]));
  }
  const G = new Set(),
    q = new Set();
  function J(Q) {
    S(Q, 1), Q.m(o, u), i.set(Q.key, Q), (u = Q.first), $--;
  }
  for (; w && $; ) {
    const Q = C[$ - 1],
      re = t[w - 1],
      K = Q.key,
      U = re.key;
    Q === re
      ? ((u = Q.first), w--, $--)
      : z.has(U)
      ? !i.has(K) || G.has(K)
        ? J(Q)
        : q.has(U)
        ? w--
        : V.get(K) > V.get(U)
        ? (q.add(K), J(Q))
        : (G.add(U), w--)
      : (c(re, i), w--);
  }
  for (; w--; ) {
    const Q = t[w];
    z.has(Q.key) || c(Q, i);
  }
  for (; $; ) J(C[$ - 1]);
  return Fe(L), C;
}
function se(t) {
  t && t.c();
}
function oe(t, e) {
  t && t.l(e);
}
function ee(t, e, n) {
  const { fragment: s, after_update: r } = t.$$;
  s && s.m(e, n),
    Je(() => {
      const a = t.$$.on_mount.map(Mn).filter(ht);
      t.$$.on_destroy ? t.$$.on_destroy.push(...a) : Fe(a),
        (t.$$.on_mount = []);
    }),
    r.forEach(Je);
}
function te(t, e) {
  const n = t.$$;
  n.fragment !== null &&
    (Ls(n.after_update),
    Fe(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []));
}
function Vs(t, e) {
  t.$$.dirty[0] === -1 && (lt.push(t), Gn(), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function le(t, e, n, s, r, a, i = null, o = [-1]) {
  const c = $t;
  wt(t);
  const l = (t.$$ = {
    fragment: null,
    ctx: [],
    props: a,
    update: T,
    not_equal: r,
    bound: ln(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (c ? c.$$.context : [])),
    callbacks: ln(),
    dirty: o,
    skip_bound: !1,
    root: e.target || c.$$.root,
  });
  i && i(l.root);
  let u = !1;
  if (
    ((l.ctx = n
      ? n(t, e.props || {}, (h, w, ...$) => {
          const v = $.length ? $[0] : w;
          return (
            l.ctx &&
              r(l.ctx[h], (l.ctx[h] = v)) &&
              (!l.skip_bound && l.bound[h] && l.bound[h](v), u && Vs(t, h)),
            w
          );
        })
      : []),
    l.update(),
    (u = !0),
    Fe(l.before_update),
    (l.fragment = s ? s(l.ctx) : !1),
    e.target)
  ) {
    if (e.hydrate) {
      ws();
      const h = k(e.target);
      l.fragment && l.fragment.l(h), h.forEach(p);
    } else l.fragment && l.fragment.c();
    e.intro && S(t.$$.fragment), ee(t, e.target, e.anchor), bs(), Jn();
  }
  wt(c);
}
class ce {
  constructor() {
    Ut(this, '$$');
    Ut(this, '$$set');
  }
  $destroy() {
    te(this, 1), (this.$destroy = T);
  }
  $on(e, n) {
    if (!ht(n)) return T;
    const s = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return (
      s.push(n),
      () => {
        const r = s.indexOf(n);
        r !== -1 && s.splice(r, 1);
      }
    );
  }
  $set(e) {
    this.$$set &&
      !ys(e) &&
      ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
  }
}
const js = '4';
function Hs(t, e) {
  return t === '/' || e === 'ignore'
    ? t
    : e === 'never'
    ? t.endsWith('/')
      ? t.slice(0, -1)
      : t
    : e === 'always' && !t.endsWith('/')
    ? t + '/'
    : t;
}
function Us(t) {
  return t.split('%25').map(decodeURI).join('%25');
}
function zs(t) {
  for (const e in t) t[e] = decodeURIComponent(t[e]);
  return t;
}
const qs = ['href', 'pathname', 'search', 'searchParams', 'toString', 'toJSON'];
function Ks(t, e) {
  const n = new URL(t);
  for (const s of qs)
    Object.defineProperty(n, s, {
      get() {
        return e(), t[s];
      },
      enumerable: !0,
      configurable: !0,
    });
  return Zs(n), n;
}
function Zs(t) {
  Object.defineProperty(t, 'hash', {
    get() {
      throw new Error(
        'Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead',
      );
    },
  });
}
const Ws = '/__data.json';
function Gs(t) {
  return t.replace(/\/$/, '') + Ws;
}
function Js(...t) {
  let e = 5381;
  for (const n of t)
    if (typeof n == 'string') {
      let s = n.length;
      for (; s; ) e = (e * 33) ^ n.charCodeAt(--s);
    } else if (ArrayBuffer.isView(n)) {
      const s = new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
      let r = s.length;
      for (; r; ) e = (e * 33) ^ s[--r];
    } else throw new TypeError('value must be a string or TypedArray');
  return (e >>> 0).toString(36);
}
const Qn = window.fetch;
window.fetch = (t, e) => (
  (t instanceof Request ? t.method : e?.method || 'GET') !== 'GET' &&
    Ct.delete(rn(t)),
  Qn(t, e)
);
const Ct = new Map();
function Qs(t, e) {
  const n = rn(t, e),
    s = document.querySelector(n);
  if (s?.textContent) {
    const { body: r, ...a } = JSON.parse(s.textContent),
      i = s.getAttribute('data-ttl');
    return (
      i && Ct.set(n, { body: r, init: a, ttl: 1e3 * Number(i) }),
      Promise.resolve(new Response(r, a))
    );
  }
  return window.fetch(t, e);
}
function Ys(t, e, n) {
  if (Ct.size > 0) {
    const s = rn(t, n),
      r = Ct.get(s);
    if (r) {
      if (
        performance.now() < r.ttl &&
        ['default', 'force-cache', 'only-if-cached', void 0].includes(n?.cache)
      )
        return new Response(r.body, r.init);
      Ct.delete(s);
    }
  }
  return window.fetch(e, n);
}
function rn(t, e) {
  let s = `script[data-sveltekit-fetched][data-url=${JSON.stringify(
    t instanceof Request ? t.url : t,
  )}]`;
  if (e?.headers || e?.body) {
    const r = [];
    e.headers && r.push([...new Headers(e.headers)].join(',')),
      e.body &&
        (typeof e.body == 'string' || ArrayBuffer.isView(e.body)) &&
        r.push(e.body),
      (s += `[data-hash="${Js(...r)}"]`);
  }
  return s;
}
const Xs = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function er(t) {
  const e = [];
  return {
    pattern:
      t === '/'
        ? /^\/$/
        : new RegExp(
            `^${nr(t)
              .map((s) => {
                const r = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(s);
                if (r)
                  return (
                    e.push({
                      name: r[1],
                      matcher: r[2],
                      optional: !1,
                      rest: !0,
                      chained: !0,
                    }),
                    '(?:/(.*))?'
                  );
                const a = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(s);
                if (a)
                  return (
                    e.push({
                      name: a[1],
                      matcher: a[2],
                      optional: !0,
                      rest: !1,
                      chained: !0,
                    }),
                    '(?:/([^/]+))?'
                  );
                if (!s) return;
                const i = s.split(/\[(.+?)\](?!\])/);
                return (
                  '/' +
                  i
                    .map((c, l) => {
                      if (l % 2) {
                        if (c.startsWith('x+'))
                          return qt(
                            String.fromCharCode(parseInt(c.slice(2), 16)),
                          );
                        if (c.startsWith('u+'))
                          return qt(
                            String.fromCharCode(
                              ...c
                                .slice(2)
                                .split('-')
                                .map((x) => parseInt(x, 16)),
                            ),
                          );
                        const u = Xs.exec(c);
                        if (!u)
                          throw new Error(
                            `Invalid param: ${c}. Params and matcher names can only have underscores and alphanumeric characters.`,
                          );
                        const [, h, w, $, v] = u;
                        return (
                          e.push({
                            name: $,
                            matcher: v,
                            optional: !!h,
                            rest: !!w,
                            chained: w ? l === 1 && i[0] === '' : !1,
                          }),
                          w ? '(.*?)' : h ? '([^/]*)?' : '([^/]+?)'
                        );
                      }
                      return qt(c);
                    })
                    .join('')
                );
              })
              .join('')}/?$`,
          ),
    params: e,
  };
}
function tr(t) {
  return !/^\([^)]+\)$/.test(t);
}
function nr(t) {
  return t.slice(1).split('/').filter(tr);
}
function sr(t, e, n) {
  const s = {},
    r = t.slice(1),
    a = r.filter((o) => o !== void 0);
  let i = 0;
  for (let o = 0; o < e.length; o += 1) {
    const c = e[o];
    let l = r[o - i];
    if (
      (c.chained &&
        c.rest &&
        i &&
        ((l = r
          .slice(o - i, o + 1)
          .filter((u) => u)
          .join('/')),
        (i = 0)),
      l === void 0)
    ) {
      c.rest && (s[c.name] = '');
      continue;
    }
    if (!c.matcher || n[c.matcher](l)) {
      s[c.name] = l;
      const u = e[o + 1],
        h = r[o + 1];
      u && !u.rest && u.optional && h && c.chained && (i = 0),
        !u && !h && Object.keys(s).length === a.length && (i = 0);
      continue;
    }
    if (c.optional && c.chained) {
      i++;
      continue;
    }
    return;
  }
  if (!i) return s;
}
function qt(t) {
  return t
    .normalize()
    .replace(/[[\]]/g, '\\$&')
    .replace(/%/g, '%25')
    .replace(/\//g, '%2[Ff]')
    .replace(/\?/g, '%3[Ff]')
    .replace(/#/g, '%23')
    .replace(/[.*+?^${}()|\\]/g, '\\$&');
}
function rr({ nodes: t, server_loads: e, dictionary: n, matchers: s }) {
  const r = new Set(e);
  return Object.entries(n).map(([o, [c, l, u]]) => {
    const { pattern: h, params: w } = er(o),
      $ = {
        id: o,
        exec: (v) => {
          const x = h.exec(v);
          if (x) return sr(x, w, s);
        },
        errors: [1, ...(u || [])].map((v) => t[v]),
        layouts: [0, ...(l || [])].map(i),
        leaf: a(c),
      };
    return (
      ($.errors.length = $.layouts.length =
        Math.max($.errors.length, $.layouts.length)),
      $
    );
  });
  function a(o) {
    const c = o < 0;
    return c && (o = ~o), [c, t[o]];
  }
  function i(o) {
    return o === void 0 ? o : [r.has(o), t[o]];
  }
}
function Yn(t) {
  try {
    return JSON.parse(sessionStorage[t]);
  } catch {}
}
function hn(t, e) {
  const n = JSON.stringify(e);
  try {
    sessionStorage[t] = n;
  } catch {}
}
const at = [];
function Xn(t, e) {
  return { subscribe: Ue(t, e).subscribe };
}
function Ue(t, e = T) {
  let n;
  const s = new Set();
  function r(o) {
    if (ie(t, o) && ((t = o), n)) {
      const c = !at.length;
      for (const l of s) l[1](), at.push(l, t);
      if (c) {
        for (let l = 0; l < at.length; l += 2) at[l][0](at[l + 1]);
        at.length = 0;
      }
    }
  }
  function a(o) {
    r(o(t));
  }
  function i(o, c = T) {
    const l = [o, c];
    return (
      s.add(l),
      s.size === 1 && (n = e(r, a) || T),
      o(t),
      () => {
        s.delete(l), s.size === 0 && n && (n(), (n = null));
      }
    );
  }
  return { set: r, update: a, subscribe: i };
}
function kt(t, e, n) {
  const s = !Array.isArray(t),
    r = s ? [t] : t;
  if (!r.every(Boolean))
    throw new Error('derived() expects stores as input, got a falsy value');
  const a = e.length < 2;
  return Xn(n, (i, o) => {
    let c = !1;
    const l = [];
    let u = 0,
      h = T;
    const w = () => {
        if (u) return;
        h();
        const v = e(s ? l[0] : l, i, o);
        a ? i(v) : (h = ht(v) ? v : T);
      },
      $ = r.map((v, x) =>
        Fn(
          v,
          (C) => {
            (l[x] = C), (u &= ~(1 << x)), c && w();
          },
          () => {
            u |= 1 << x;
          },
        ),
      );
    return (
      (c = !0),
      w(),
      function () {
        Fe($), h(), (c = !1);
      }
    );
  });
}
const Ze = globalThis.__sveltekit_14zw266?.base ?? '',
  ir = globalThis.__sveltekit_14zw266?.assets ?? Ze,
  ar = '1702448120859',
  es = 'sveltekit:snapshot',
  ts = 'sveltekit:scroll',
  Pe = 'sveltekit:index',
  Mt = { tap: 1, hover: 2, viewport: 3, eager: 4, off: -1 },
  Ft = location.origin;
function pn(t) {
  let e = t.baseURI;
  if (!e) {
    const n = t.getElementsByTagName('base');
    e = n.length ? n[0].href : t.URL;
  }
  return e;
}
function vt() {
  return { x: pageXOffset, y: pageYOffset };
}
function ot(t, e) {
  return t.getAttribute(`data-sveltekit-${e}`);
}
const _n = { ...Mt, '': Mt.hover };
function ns(t) {
  let e = t.assignedSlot ?? t.parentNode;
  return e?.nodeType === 11 && (e = e.host), e;
}
function mn(t, e) {
  for (; t && t !== e; ) {
    if (t.nodeName.toUpperCase() === 'A' && t.hasAttribute('href')) return t;
    t = ns(t);
  }
}
function Kt(t, e) {
  let n;
  try {
    n = new URL(
      t instanceof SVGAElement ? t.href.baseVal : t.href,
      document.baseURI,
    );
  } catch {}
  const s = t instanceof SVGAElement ? t.target.baseVal : t.target,
    r =
      !n ||
      !!s ||
      It(n, e) ||
      (t.getAttribute('rel') || '').split(/\s+/).includes('external'),
    a = n?.origin === Ft && t.hasAttribute('download');
  return { url: n, external: r, target: s, download: a };
}
function xt(t) {
  let e = null,
    n = null,
    s = null,
    r = null,
    a = null,
    i = null,
    o = t;
  for (; o && o !== document.documentElement; )
    s === null && (s = ot(o, 'preload-code')),
      r === null && (r = ot(o, 'preload-data')),
      e === null && (e = ot(o, 'keepfocus')),
      n === null && (n = ot(o, 'noscroll')),
      a === null && (a = ot(o, 'reload')),
      i === null && (i = ot(o, 'replacestate')),
      (o = ns(o));
  function c(l) {
    switch (l) {
      case '':
      case 'true':
        return !0;
      case 'off':
      case 'false':
        return !1;
      default:
        return null;
    }
  }
  return {
    preload_code: _n[s ?? 'off'],
    preload_data: _n[r ?? 'off'],
    keep_focus: c(e),
    noscroll: c(n),
    reload: c(a),
    replace_state: c(i),
  };
}
function gn(t) {
  const e = Ue(t);
  let n = !0;
  function s() {
    (n = !0), e.update((i) => i);
  }
  function r(i) {
    (n = !1), e.set(i);
  }
  function a(i) {
    let o;
    return e.subscribe((c) => {
      (o === void 0 || (n && c !== o)) && i((o = c));
    });
  }
  return { notify: s, set: r, subscribe: a };
}
function or() {
  const { set: t, subscribe: e } = Ue(!1);
  let n;
  async function s() {
    clearTimeout(n);
    try {
      const r = await fetch(`${ir}/_app/version.json`, {
        headers: { pragma: 'no-cache', 'cache-control': 'no-cache' },
      });
      if (!r.ok) return !1;
      const i = (await r.json()).version !== ar;
      return i && (t(!0), clearTimeout(n)), i;
    } catch {
      return !1;
    }
  }
  return { subscribe: e, check: s };
}
function It(t, e) {
  return t.origin !== Ft || !t.pathname.startsWith(e);
}
function lr(t) {
  return t.filter((e) => e != null);
}
const ss = new Set([
  'load',
  'prerender',
  'csr',
  'ssr',
  'trailingSlash',
  'config',
]);
[...ss];
const cr = new Set([...ss]);
[...cr];
async function ur(t) {
  for (const e in t)
    if (typeof t[e]?.then == 'function')
      return Object.fromEntries(
        await Promise.all(
          Object.entries(t).map(async ([n, s]) => [n, await s]),
        ),
      );
  return t;
}
class yt {
  constructor(e, n) {
    (this.status = e),
      typeof n == 'string'
        ? (this.body = { message: n })
        : n
        ? (this.body = n)
        : (this.body = { message: `Error: ${e}` });
  }
  toString() {
    return JSON.stringify(this.body);
  }
}
class vn {
  constructor(e, n) {
    (this.status = e), (this.location = n);
  }
}
const fr = 'x-sveltekit-invalidated',
  dr = 'x-sveltekit-trailing-slash';
function hr(t) {
  t.client;
}
const Ve = { url: gn({}), page: gn({}), navigating: Ue(null), updated: or() },
  et = Yn(ts) ?? {},
  gt = Yn(es) ?? {};
function Zt(t) {
  et[t] = vt();
}
function tt(t) {
  return (location.href = t.href), new Promise(() => {});
}
function pr(t, e) {
  const n = rr(t),
    s = t.nodes[0],
    r = t.nodes[1];
  s(), r();
  const a = document.documentElement,
    i = [],
    o = [];
  let c = null;
  const l = { before_navigate: [], on_navigate: [], after_navigate: [] };
  let u = { branch: [], error: null, url: null },
    h = !1,
    w = !1,
    $ = !0,
    v = !1,
    x = !1,
    C = !1,
    z = !1,
    V,
    L = history.state?.[Pe];
  L ||
    ((L = Date.now()),
    history.replaceState({ ...history.state, [Pe]: L }, '', location.href));
  const G = et[L];
  G && ((history.scrollRestoration = 'manual'), scrollTo(G.x, G.y));
  let q, J, Q;
  async function re() {
    if (((Q = Q || Promise.resolve()), await Q, !Q)) return;
    Q = null;
    const d = new URL(location.href),
      _ = Ae(d, !0);
    c = null;
    const g = (J = {}),
      m = _ && (await Xe(_));
    if (g === J && m) {
      if (m.type === 'redirect')
        return R(new URL(m.location, d).href, {}, 1, g);
      m.props.page !== void 0 && (q = m.props.page), V.$set(m.props);
    }
  }
  function K(d) {
    o.some((_) => _?.snapshot) &&
      (gt[d] = o.map((_) => _?.snapshot?.capture()));
  }
  function U(d) {
    gt[d]?.forEach((_, g) => {
      o[g]?.snapshot?.restore(_);
    });
  }
  function ne() {
    Zt(L), hn(ts, et), K(L), hn(es, gt);
  }
  async function R(
    d,
    {
      noScroll: _ = !1,
      replaceState: g = !1,
      keepFocus: m = !1,
      state: b = {},
      invalidateAll: E = !1,
    },
    M,
    F,
  ) {
    return (
      typeof d == 'string' && (d = new URL(d, pn(document))),
      Ke({
        url: d,
        scroll: _ ? vt() : null,
        keepfocus: m,
        redirect_count: M,
        details: { state: b, replaceState: g },
        nav_token: F,
        accepted: () => {
          E && (z = !0);
        },
        blocked: () => {},
        type: 'goto',
      })
    );
  }
  async function me(d) {
    return (
      (c = {
        id: d.id,
        promise: Xe(d).then(
          (_) => (_.type === 'loaded' && _.state.error && (c = null), _),
        ),
      }),
      c.promise
    );
  }
  async function Ee(...d) {
    const g = n
      .filter((m) => d.some((b) => m.exec(b)))
      .map((m) => Promise.all([...m.layouts, m.leaf].map((b) => b?.[1]())));
    await Promise.all(g);
  }
  function ke(d) {
    u = d.state;
    const _ = document.querySelector('style[data-sveltekit]');
    _ && _.remove(),
      (q = d.props.page),
      (V = new t.root({
        target: e,
        props: { ...d.props, stores: Ve, components: o },
        hydrate: !0,
      })),
      U(L);
    const g = {
      from: null,
      to: {
        params: u.params,
        route: { id: u.route?.id ?? null },
        url: new URL(location.href),
      },
      willUnload: !1,
      type: 'enter',
      complete: Promise.resolve(),
    };
    l.after_navigate.forEach((m) => m(g)), (w = !0);
  }
  async function be({
    url: d,
    params: _,
    branch: g,
    status: m,
    error: b,
    route: E,
    form: M,
  }) {
    let F = 'never';
    for (const A of g) A?.slash !== void 0 && (F = A.slash);
    (d.pathname = Hs(d.pathname, F)), (d.search = d.search);
    const Z = {
      type: 'loaded',
      state: { url: d, params: _, branch: g, error: b, route: E },
      props: { constructors: lr(g).map((A) => A.node.component) },
    };
    M !== void 0 && (Z.props.form = M);
    let j = {},
      ae = !q,
      N = 0;
    for (let A = 0; A < Math.max(g.length, u.branch.length); A += 1) {
      const de = g[A],
        Te = u.branch[A];
      de?.data !== Te?.data && (ae = !0),
        de &&
          ((j = { ...j, ...de.data }),
          ae && (Z.props[`data_${N}`] = j),
          (N += 1));
    }
    return (
      (!u.url ||
        d.href !== u.url.href ||
        u.error !== b ||
        (M !== void 0 && M !== q.form) ||
        ae) &&
        (Z.props.page = {
          error: b,
          params: _,
          route: { id: E?.id ?? null },
          status: m,
          url: new URL(d),
          form: M ?? null,
          data: ae ? j : q.data,
        }),
      Z
    );
  }
  async function Qe({
    loader: d,
    parent: _,
    url: g,
    params: m,
    route: b,
    server_data_node: E,
  }) {
    let M = null;
    const F = {
        dependencies: new Set(),
        params: new Set(),
        parent: !1,
        route: !1,
        url: !1,
      },
      Z = await d();
    if (Z.universal?.load) {
      let j = function (...N) {
        for (const W of N) {
          const { href: A } = new URL(W, g);
          F.dependencies.add(A);
        }
      };
      const ae = {
        route: new Proxy(b, { get: (N, W) => ((F.route = !0), N[W]) }),
        params: new Proxy(m, { get: (N, W) => (F.params.add(W), N[W]) }),
        data: E?.data ?? null,
        url: Ks(g, () => {
          F.url = !0;
        }),
        async fetch(N, W) {
          let A;
          N instanceof Request
            ? ((A = N.url),
              (W = {
                body:
                  N.method === 'GET' || N.method === 'HEAD'
                    ? void 0
                    : await N.blob(),
                cache: N.cache,
                credentials: N.credentials,
                headers: N.headers,
                integrity: N.integrity,
                keepalive: N.keepalive,
                method: N.method,
                mode: N.mode,
                redirect: N.redirect,
                referrer: N.referrer,
                referrerPolicy: N.referrerPolicy,
                signal: N.signal,
                ...W,
              }))
            : (A = N);
          const de = new URL(A, g);
          return (
            j(de.href),
            de.origin === g.origin && (A = de.href.slice(g.origin.length)),
            w ? Ys(A, de.href, W) : Qs(A, W)
          );
        },
        setHeaders: () => {},
        depends: j,
        parent() {
          return (F.parent = !0), _();
        },
      };
      (M = (await Z.universal.load.call(null, ae)) ?? null),
        (M = M ? await ur(M) : null);
    }
    return {
      node: Z,
      loader: d,
      server: E,
      universal: Z.universal?.load ? { type: 'data', data: M, uses: F } : null,
      data: M ?? E?.data ?? null,
      slash: Z.universal?.trailingSlash ?? E?.slash,
    };
  }
  function Ye(d, _, g, m, b) {
    if (z) return !0;
    if (!m) return !1;
    if ((m.parent && d) || (m.route && _) || (m.url && g)) return !0;
    for (const E of m.params) if (b[E] !== u.params[E]) return !0;
    for (const E of m.dependencies) if (i.some((M) => M(new URL(E)))) return !0;
    return !1;
  }
  function ze(d, _) {
    return d?.type === 'data' ? d : d?.type === 'skip' ? _ ?? null : null;
  }
  async function Xe({ id: d, invalidating: _, url: g, params: m, route: b }) {
    if (c?.id === d) return c.promise;
    const { errors: E, layouts: M, leaf: F } = b,
      Z = [...M, F];
    E.forEach((ue) => ue?.().catch(() => {})),
      Z.forEach((ue) => ue?.[1]().catch(() => {}));
    let j = null;
    const ae = u.url ? d !== u.url.pathname + u.url.search : !1,
      N = u.route ? b.id !== u.route.id : !1;
    let W = !1;
    const A = Z.map((ue, Ce) => {
      const Se = u.branch[Ce],
        $e =
          !!ue?.[0] &&
          (Se?.loader !== ue[1] || Ye(W, N, ae, Se.server?.uses, m));
      return $e && (W = !0), $e;
    });
    if (A.some(Boolean)) {
      try {
        j = await yn(g, A);
      } catch (ue) {
        return qe({
          status: ue instanceof yt ? ue.status : 500,
          error: await fe(ue, { url: g, params: m, route: { id: b.id } }),
          url: g,
          route: b,
        });
      }
      if (j.type === 'redirect') return j;
    }
    const de = j?.nodes;
    let Te = !1;
    const he = Z.map(async (ue, Ce) => {
      if (!ue) return;
      const Se = u.branch[Ce],
        $e = de?.[Ce];
      if (
        (!$e || $e.type === 'skip') &&
        ue[1] === Se?.loader &&
        !Ye(Te, N, ae, Se.universal?.uses, m)
      )
        return Se;
      if (((Te = !0), $e?.type === 'error')) throw $e;
      return Qe({
        loader: ue[1],
        url: g,
        params: m,
        route: b,
        parent: async () => {
          const jt = {};
          for (let Ht = 0; Ht < Ce; Ht += 1)
            Object.assign(jt, (await he[Ht])?.data);
          return jt;
        },
        server_data_node: ze(
          $e === void 0 && ue[0] ? { type: 'skip' } : $e ?? null,
          ue[0] ? Se?.server : void 0,
        ),
      });
    });
    for (const ue of he) ue.catch(() => {});
    const ve = [];
    for (let ue = 0; ue < Z.length; ue += 1)
      if (Z[ue])
        try {
          ve.push(await he[ue]);
        } catch (Ce) {
          if (Ce instanceof vn)
            return { type: 'redirect', location: Ce.location };
          let Se = 500,
            $e;
          if (de?.includes(Ce)) (Se = Ce.status ?? Se), ($e = Ce.error);
          else if (Ce instanceof yt) (Se = Ce.status), ($e = Ce.body);
          else {
            if (await Ve.updated.check()) return await tt(g);
            $e = await fe(Ce, { params: m, url: g, route: { id: b.id } });
          }
          const Et = await xe(ue, ve, E);
          return Et
            ? await be({
                url: g,
                params: m,
                branch: ve.slice(0, Et.idx).concat(Et.node),
                status: Se,
                error: $e,
                route: b,
              })
            : await _t(g, { id: b.id }, $e, Se);
        }
      else ve.push(void 0);
    return await be({
      url: g,
      params: m,
      branch: ve,
      status: 200,
      error: null,
      route: b,
      form: _ ? void 0 : null,
    });
  }
  async function xe(d, _, g) {
    for (; d--; )
      if (g[d]) {
        let m = d;
        for (; !_[m]; ) m -= 1;
        try {
          return {
            idx: m + 1,
            node: {
              node: await g[d](),
              loader: g[d],
              data: {},
              server: null,
              universal: null,
            },
          };
        } catch {
          continue;
        }
      }
  }
  async function qe({ status: d, error: _, url: g, route: m }) {
    const b = {};
    let E = null;
    if (t.server_loads[0] === 0)
      try {
        const j = await yn(g, [!0]);
        if (j.type !== 'data' || (j.nodes[0] && j.nodes[0].type !== 'data'))
          throw 0;
        E = j.nodes[0] ?? null;
      } catch {
        (g.origin !== Ft || g.pathname !== location.pathname || h) &&
          (await tt(g));
      }
    const F = await Qe({
        loader: s,
        url: g,
        params: b,
        route: m,
        parent: () => Promise.resolve({}),
        server_data_node: ze(E),
      }),
      Z = {
        node: await r(),
        loader: r,
        universal: null,
        server: null,
        data: null,
      };
    return await be({
      url: g,
      params: b,
      branch: [F, Z],
      status: d,
      error: _,
      route: null,
    });
  }
  function Ae(d, _) {
    if (It(d, Ze)) return;
    const g = Re(d);
    for (const m of n) {
      const b = m.exec(g);
      if (b)
        return {
          id: d.pathname + d.search,
          invalidating: _,
          route: m,
          params: zs(b),
          url: d,
        };
    }
  }
  function Re(d) {
    return Us(d.pathname.slice(Ze.length) || '/');
  }
  function Oe({ url: d, type: _, intent: g, delta: m }) {
    let b = !1;
    const E = wn(u, g, d, _);
    m !== void 0 && (E.navigation.delta = m);
    const M = {
      ...E.navigation,
      cancel: () => {
        (b = !0), E.reject(new Error('navigation was cancelled'));
      },
    };
    return x || l.before_navigate.forEach((F) => F(M)), b ? null : E;
  }
  async function Ke({
    url: d,
    scroll: _,
    keepfocus: g,
    redirect_count: m,
    details: b,
    type: E,
    delta: M,
    nav_token: F = {},
    accepted: Z,
    blocked: j,
  }) {
    const ae = Ae(d, !1),
      N = Oe({ url: d, type: E, delta: M, intent: ae });
    if (!N) {
      j();
      return;
    }
    const W = L;
    Z(), (x = !0), w && Ve.navigating.set(N.navigation), (J = F);
    let A = ae && (await Xe(ae));
    if (!A) {
      if (It(d, Ze)) return await tt(d);
      A = await _t(
        d,
        { id: null },
        await fe(new Error(`Not found: ${d.pathname}`), {
          url: d,
          params: {},
          route: { id: null },
        }),
        404,
      );
    }
    if (((d = ae?.url || d), J !== F))
      return N.reject(new Error('navigation was aborted')), !1;
    if (A.type === 'redirect')
      if (m >= 20)
        A = await qe({
          status: 500,
          error: await fe(new Error('Redirect loop'), {
            url: d,
            params: {},
            route: { id: null },
          }),
          url: d,
          route: { id: null },
        });
      else return R(new URL(A.location, d).href, {}, m + 1, F), !1;
    else
      A.props.page?.status >= 400 &&
        (await Ve.updated.check()) &&
        (await tt(d));
    if (
      ((i.length = 0),
      (z = !1),
      (v = !0),
      Zt(W),
      K(W),
      A.props.page?.url &&
        A.props.page.url.pathname !== d.pathname &&
        (d.pathname = A.props.page?.url.pathname),
      b)
    ) {
      const he = b.replaceState ? 0 : 1;
      if (
        ((b.state[Pe] = L += he),
        history[b.replaceState ? 'replaceState' : 'pushState'](b.state, '', d),
        !b.replaceState)
      ) {
        let ve = L + 1;
        for (; gt[ve] || et[ve]; ) delete gt[ve], delete et[ve], (ve += 1);
      }
    }
    if (((c = null), w)) {
      (u = A.state), A.props.page && (A.props.page.url = d);
      const he = (
        await Promise.all(l.on_navigate.map((ve) => ve(N.navigation)))
      ).filter((ve) => typeof ve == 'function');
      if (he.length > 0) {
        let ve = function () {
          l.after_navigate = l.after_navigate.filter((ue) => !he.includes(ue));
        };
        he.push(ve), l.after_navigate.push(...he);
      }
      V.$set(A.props);
    } else ke(A);
    const { activeElement: de } = document;
    if ((await Tt(), $)) {
      const he =
        d.hash && document.getElementById(decodeURIComponent(d.hash.slice(1)));
      _ ? scrollTo(_.x, _.y) : he ? he.scrollIntoView() : scrollTo(0, 0);
    }
    const Te =
      document.activeElement !== de && document.activeElement !== document.body;
    !g && !Te && Wt(),
      ($ = !0),
      A.props.page && (q = A.props.page),
      (x = !1),
      E === 'popstate' && U(L),
      N.fulfil(void 0),
      l.after_navigate.forEach((he) => he(N.navigation)),
      Ve.navigating.set(null),
      (v = !1);
  }
  async function _t(d, _, g, m) {
    return d.origin === Ft && d.pathname === location.pathname && !h
      ? await qe({ status: m, error: g, url: d, route: _ })
      : await tt(d);
  }
  function pe() {
    let d;
    a.addEventListener('mousemove', (E) => {
      const M = E.target;
      clearTimeout(d),
        (d = setTimeout(() => {
          m(M, 2);
        }, 20));
    });
    function _(E) {
      m(E.composedPath()[0], 1);
    }
    a.addEventListener('mousedown', _),
      a.addEventListener('touchstart', _, { passive: !0 });
    const g = new IntersectionObserver(
      (E) => {
        for (const M of E)
          M.isIntersecting &&
            (Ee(Re(new URL(M.target.href))), g.unobserve(M.target));
      },
      { threshold: 0 },
    );
    function m(E, M) {
      const F = mn(E, a);
      if (!F) return;
      const { url: Z, external: j, download: ae } = Kt(F, Ze);
      if (j || ae) return;
      const N = xt(F);
      if (!N.reload)
        if (M <= N.preload_data) {
          const W = Ae(Z, !1);
          W && me(W);
        } else M <= N.preload_code && Ee(Re(Z));
    }
    function b() {
      g.disconnect();
      for (const E of a.querySelectorAll('a')) {
        const { url: M, external: F, download: Z } = Kt(E, Ze);
        if (F || Z) continue;
        const j = xt(E);
        j.reload ||
          (j.preload_code === Mt.viewport && g.observe(E),
          j.preload_code === Mt.eager && Ee(Re(M)));
      }
    }
    l.after_navigate.push(b), b();
  }
  function fe(d, _) {
    return d instanceof yt
      ? d.body
      : t.hooks.handleError({ error: d, event: _ }) ?? {
          message: _.route.id != null ? 'Internal Error' : 'Not Found',
        };
  }
  return {
    after_navigate: (d) => {
      nt(
        () => (
          l.after_navigate.push(d),
          () => {
            const _ = l.after_navigate.indexOf(d);
            l.after_navigate.splice(_, 1);
          }
        ),
      );
    },
    before_navigate: (d) => {
      nt(
        () => (
          l.before_navigate.push(d),
          () => {
            const _ = l.before_navigate.indexOf(d);
            l.before_navigate.splice(_, 1);
          }
        ),
      );
    },
    on_navigate: (d) => {
      nt(
        () => (
          l.on_navigate.push(d),
          () => {
            const _ = l.on_navigate.indexOf(d);
            l.on_navigate.splice(_, 1);
          }
        ),
      );
    },
    disable_scroll_handling: () => {
      (v || !w) && ($ = !1);
    },
    goto: (d, _ = {}) => R(d, _, 0),
    invalidate: (d) => {
      if (typeof d == 'function') i.push(d);
      else {
        const { href: _ } = new URL(d, location.href);
        i.push((g) => g.href === _);
      }
      return re();
    },
    invalidate_all: () => ((z = !0), re()),
    preload_data: async (d) => {
      const _ = new URL(d, pn(document)),
        g = Ae(_, !1);
      if (!g)
        throw new Error(
          `Attempted to preload a URL that does not belong to this app: ${_}`,
        );
      await me(g);
    },
    preload_code: Ee,
    apply_action: async (d) => {
      if (d.type === 'error') {
        const _ = new URL(location.href),
          { branch: g, route: m } = u;
        if (!m) return;
        const b = await xe(u.branch.length, g, m.errors);
        if (b) {
          const E = await be({
            url: _,
            params: u.params,
            branch: g.slice(0, b.idx).concat(b.node),
            status: d.status ?? 500,
            error: d.error,
            route: m,
          });
          (u = E.state), V.$set(E.props), Tt().then(Wt);
        }
      } else
        d.type === 'redirect'
          ? R(d.location, { invalidateAll: !0 }, 0)
          : (V.$set({
              form: null,
              page: { ...q, form: d.data, status: d.status },
            }),
            await Tt(),
            V.$set({ form: d.data }),
            d.type === 'success' && Wt());
    },
    _start_router: () => {
      (history.scrollRestoration = 'manual'),
        addEventListener('beforeunload', (_) => {
          let g = !1;
          if ((ne(), !x)) {
            const m = wn(u, void 0, null, 'leave'),
              b = {
                ...m.navigation,
                cancel: () => {
                  (g = !0), m.reject(new Error('navigation was cancelled'));
                },
              };
            l.before_navigate.forEach((E) => E(b));
          }
          g
            ? (_.preventDefault(), (_.returnValue = ''))
            : (history.scrollRestoration = 'auto');
        }),
        addEventListener('visibilitychange', () => {
          document.visibilityState === 'hidden' && ne();
        }),
        navigator.connection?.saveData || pe(),
        a.addEventListener('click', (_) => {
          if (
            _.button ||
            _.which !== 1 ||
            _.metaKey ||
            _.ctrlKey ||
            _.shiftKey ||
            _.altKey ||
            _.defaultPrevented
          )
            return;
          const g = mn(_.composedPath()[0], a);
          if (!g) return;
          const { url: m, external: b, target: E, download: M } = Kt(g, Ze);
          if (!m) return;
          if (E === '_parent' || E === '_top') {
            if (window.parent !== window) return;
          } else if (E && E !== '_self') return;
          const F = xt(g);
          if (
            (!(g instanceof SVGAElement) &&
              m.protocol !== location.protocol &&
              !(m.protocol === 'https:' || m.protocol === 'http:')) ||
            M
          )
            return;
          if (b || F.reload) {
            Oe({ url: m, type: 'link' }) ? (x = !0) : _.preventDefault();
            return;
          }
          const [j, ae] = m.href.split('#');
          if (ae !== void 0 && j === location.href.split('#')[0]) {
            if (u.url.hash === m.hash) {
              _.preventDefault(),
                g.ownerDocument.getElementById(ae)?.scrollIntoView();
              return;
            }
            if (((C = !0), Zt(L), d(m), !F.replace_state)) return;
            (C = !1), _.preventDefault();
          }
          Ke({
            url: m,
            scroll: F.noscroll ? vt() : null,
            keepfocus: F.keep_focus ?? !1,
            redirect_count: 0,
            details: {
              state: {},
              replaceState: F.replace_state ?? m.href === location.href,
            },
            accepted: () => _.preventDefault(),
            blocked: () => _.preventDefault(),
            type: 'link',
          });
        }),
        a.addEventListener('submit', (_) => {
          if (_.defaultPrevented) return;
          const g = HTMLFormElement.prototype.cloneNode.call(_.target),
            m = _.submitter;
          if ((m?.formMethod || g.method) !== 'get') return;
          const E = new URL(
            (m?.hasAttribute('formaction') && m?.formAction) || g.action,
          );
          if (It(E, Ze)) return;
          const M = _.target,
            {
              keep_focus: F,
              noscroll: Z,
              reload: j,
              replace_state: ae,
            } = xt(M);
          if (j) return;
          _.preventDefault(), _.stopPropagation();
          const N = new FormData(M),
            W = m?.getAttribute('name');
          W && N.append(W, m?.getAttribute('value') ?? ''),
            (E.search = new URLSearchParams(N).toString()),
            Ke({
              url: E,
              scroll: Z ? vt() : null,
              keepfocus: F ?? !1,
              redirect_count: 0,
              details: {
                state: {},
                replaceState: ae ?? E.href === location.href,
              },
              nav_token: {},
              accepted: () => {},
              blocked: () => {},
              type: 'form',
            });
        }),
        addEventListener('popstate', async (_) => {
          if (((J = {}), _.state?.[Pe])) {
            if (_.state[Pe] === L) return;
            const g = et[_.state[Pe]],
              m = new URL(location.href);
            if (u.url.href.split('#')[0] === location.href.split('#')[0]) {
              d(m), (et[L] = vt()), (L = _.state[Pe]), scrollTo(g.x, g.y);
              return;
            }
            const b = _.state[Pe] - L;
            await Ke({
              url: m,
              scroll: g,
              keepfocus: !1,
              redirect_count: 0,
              details: null,
              accepted: () => {
                L = _.state[Pe];
              },
              blocked: () => {
                history.go(-b);
              },
              type: 'popstate',
              delta: b,
              nav_token: J,
            });
          } else if (!C) {
            const g = new URL(location.href);
            d(g);
          }
        }),
        addEventListener('hashchange', () => {
          C &&
            ((C = !1),
            history.replaceState(
              { ...history.state, [Pe]: ++L },
              '',
              location.href,
            ));
        });
      for (const _ of document.querySelectorAll('link'))
        _.rel === 'icon' && (_.href = _.href);
      addEventListener('pageshow', (_) => {
        _.persisted && Ve.navigating.set(null);
      });
      function d(_) {
        (u.url = _), Ve.page.set({ ...q, url: _ }), Ve.page.notify();
      }
    },
    _hydrate: async ({
      status: d = 200,
      error: _,
      node_ids: g,
      params: m,
      route: b,
      data: E,
      form: M,
    }) => {
      h = !0;
      const F = new URL(location.href);
      ({ params: m = {}, route: b = { id: null } } = Ae(F, !1) || {});
      let Z;
      try {
        const j = g.map(async (W, A) => {
            const de = E[A];
            return (
              de?.uses && (de.uses = rs(de.uses)),
              Qe({
                loader: t.nodes[W],
                url: F,
                params: m,
                route: b,
                parent: async () => {
                  const Te = {};
                  for (let he = 0; he < A; he += 1)
                    Object.assign(Te, (await j[he]).data);
                  return Te;
                },
                server_data_node: ze(de),
              })
            );
          }),
          ae = await Promise.all(j),
          N = n.find(({ id: W }) => W === b.id);
        if (N) {
          const W = N.layouts;
          for (let A = 0; A < W.length; A++) W[A] || ae.splice(A, 0, void 0);
        }
        Z = await be({
          url: F,
          params: m,
          branch: ae,
          status: d,
          error: _,
          form: M,
          route: N ?? null,
        });
      } catch (j) {
        if (j instanceof vn) {
          await tt(new URL(j.location, location.href));
          return;
        }
        Z = await qe({
          status: j instanceof yt ? j.status : 500,
          error: await fe(j, { url: F, params: m, route: b }),
          url: F,
          route: b,
        });
      }
      ke(Z);
    },
  };
}
async function yn(t, e) {
  const n = new URL(t);
  (n.pathname = Gs(t.pathname)),
    t.pathname.endsWith('/') && n.searchParams.append(dr, '1'),
    n.searchParams.append(fr, e.map((r) => (r ? '1' : '0')).join(''));
  const s = await Qn(n.href);
  if (
    (s.headers.get('content-type')?.includes('text/html') && (await tt(t)),
    !s.ok)
  )
    throw new yt(s.status, await s.json());
  return new Promise(async (r) => {
    const a = new Map(),
      i = s.body.getReader(),
      o = new TextDecoder();
    function c(u) {
      return ms(u, {
        Promise: (h) =>
          new Promise((w, $) => {
            a.set(h, { fulfil: w, reject: $ });
          }),
      });
    }
    let l = '';
    for (;;) {
      const { done: u, value: h } = await i.read();
      if (u && !l) break;
      for (
        l +=
          !h && l
            ? `
`
            : o.decode(h);
        ;

      ) {
        const w = l.indexOf(`
`);
        if (w === -1) break;
        const $ = JSON.parse(l.slice(0, w));
        if (((l = l.slice(w + 1)), $.type === 'redirect')) return r($);
        if ($.type === 'data')
          $.nodes?.forEach((v) => {
            v?.type === 'data' && ((v.uses = rs(v.uses)), (v.data = c(v.data)));
          }),
            r($);
        else if ($.type === 'chunk') {
          const { id: v, data: x, error: C } = $,
            z = a.get(v);
          a.delete(v), C ? z.reject(c(C)) : z.fulfil(c(x));
        }
      }
    }
  });
}
function rs(t) {
  return {
    dependencies: new Set(t?.dependencies ?? []),
    params: new Set(t?.params ?? []),
    parent: !!t?.parent,
    route: !!t?.route,
    url: !!t?.url,
  };
}
function Wt() {
  const t = document.querySelector('[autofocus]');
  if (t) t.focus();
  else {
    const e = document.body,
      n = e.getAttribute('tabindex');
    (e.tabIndex = -1),
      e.focus({ preventScroll: !0, focusVisible: !1 }),
      n !== null
        ? e.setAttribute('tabindex', n)
        : e.removeAttribute('tabindex');
    const s = getSelection();
    if (s && s.type !== 'None') {
      const r = [];
      for (let a = 0; a < s.rangeCount; a += 1) r.push(s.getRangeAt(a));
      setTimeout(() => {
        if (s.rangeCount === r.length) {
          for (let a = 0; a < s.rangeCount; a += 1) {
            const i = r[a],
              o = s.getRangeAt(a);
            if (
              i.commonAncestorContainer !== o.commonAncestorContainer ||
              i.startContainer !== o.startContainer ||
              i.endContainer !== o.endContainer ||
              i.startOffset !== o.startOffset ||
              i.endOffset !== o.endOffset
            )
              return;
          }
          s.removeAllRanges();
        }
      });
    }
  }
}
function wn(t, e, n, s) {
  let r, a;
  const i = new Promise((c, l) => {
    (r = c), (a = l);
  });
  return (
    i.catch(() => {}),
    {
      navigation: {
        from: {
          params: t.params,
          route: { id: t.route?.id ?? null },
          url: t.url,
        },
        to: n && {
          params: e?.params ?? null,
          route: { id: e?.route?.id ?? null },
          url: n,
        },
        willUnload: !e,
        type: s,
        complete: i,
      },
      fulfil: r,
      reject: a,
    }
  );
}
async function Na(t, e, n) {
  const s = pr(t, e);
  hr({ client: s }),
    n ? await s._hydrate(n) : s.goto(location.href, { replaceState: !0 }),
    s._start_router();
}
const _r = 'modulepreload',
  mr = function (t, e) {
    return new URL(t, e).href;
  },
  bn = {},
  St = function (e, n, s) {
    if (!n || n.length === 0) return e();
    const r = document.getElementsByTagName('link');
    return Promise.all(
      n.map((a) => {
        if (((a = mr(a, s)), a in bn)) return;
        bn[a] = !0;
        const i = a.endsWith('.css'),
          o = i ? '[rel="stylesheet"]' : '';
        if (!!s)
          for (let u = r.length - 1; u >= 0; u--) {
            const h = r[u];
            if (h.href === a && (!i || h.rel === 'stylesheet')) return;
          }
        else if (document.querySelector(`link[href="${a}"]${o}`)) return;
        const l = document.createElement('link');
        if (
          ((l.rel = i ? 'stylesheet' : _r),
          i || ((l.as = 'script'), (l.crossOrigin = '')),
          (l.href = a),
          document.head.appendChild(l),
          i)
        )
          return new Promise((u, h) => {
            l.addEventListener('load', u),
              l.addEventListener('error', () =>
                h(new Error(`Unable to preload CSS for ${a}`)),
              );
          });
      }),
    )
      .then(() => e())
      .catch((a) => {
        const i = new Event('vite:preloadError', { cancelable: !0 });
        if (((i.payload = a), window.dispatchEvent(i), !i.defaultPrevented))
          throw a;
      });
  },
  La = {};
typeof window < 'u' &&
  (window.__svelte || (window.__svelte = { v: new Set() })).v.add(js);
function gr(t) {
  let e, n, s;
  var r = t[1][0];
  function a(i, o) {
    return { props: { data: i[3], form: i[2] } };
  }
  return (
    r && ((e = Me(r, a(t))), t[12](e)),
    {
      c() {
        e && se(e.$$.fragment), (n = _e());
      },
      l(i) {
        e && oe(e.$$.fragment, i), (n = _e());
      },
      m(i, o) {
        e && ee(e, i, o), I(i, n, o), (s = !0);
      },
      p(i, o) {
        if (o & 2 && r !== (r = i[1][0])) {
          if (e) {
            ye();
            const c = e;
            O(c.$$.fragment, 1, 0, () => {
              te(c, 1);
            }),
              we();
          }
          r
            ? ((e = Me(r, a(i))),
              i[12](e),
              se(e.$$.fragment),
              S(e.$$.fragment, 1),
              ee(e, n.parentNode, n))
            : (e = null);
        } else if (r) {
          const c = {};
          o & 8 && (c.data = i[3]), o & 4 && (c.form = i[2]), e.$set(c);
        }
      },
      i(i) {
        s || (e && S(e.$$.fragment, i), (s = !0));
      },
      o(i) {
        e && O(e.$$.fragment, i), (s = !1);
      },
      d(i) {
        i && p(n), t[12](null), e && te(e, i);
      },
    }
  );
}
function vr(t) {
  let e, n, s;
  var r = t[1][0];
  function a(i, o) {
    return {
      props: { data: i[3], $$slots: { default: [yr] }, $$scope: { ctx: i } },
    };
  }
  return (
    r && ((e = Me(r, a(t))), t[11](e)),
    {
      c() {
        e && se(e.$$.fragment), (n = _e());
      },
      l(i) {
        e && oe(e.$$.fragment, i), (n = _e());
      },
      m(i, o) {
        e && ee(e, i, o), I(i, n, o), (s = !0);
      },
      p(i, o) {
        if (o & 2 && r !== (r = i[1][0])) {
          if (e) {
            ye();
            const c = e;
            O(c.$$.fragment, 1, 0, () => {
              te(c, 1);
            }),
              we();
          }
          r
            ? ((e = Me(r, a(i))),
              i[11](e),
              se(e.$$.fragment),
              S(e.$$.fragment, 1),
              ee(e, n.parentNode, n))
            : (e = null);
        } else if (r) {
          const c = {};
          o & 8 && (c.data = i[3]),
            o & 8215 && (c.$$scope = { dirty: o, ctx: i }),
            e.$set(c);
        }
      },
      i(i) {
        s || (e && S(e.$$.fragment, i), (s = !0));
      },
      o(i) {
        e && O(e.$$.fragment, i), (s = !1);
      },
      d(i) {
        i && p(n), t[11](null), e && te(e, i);
      },
    }
  );
}
function yr(t) {
  let e, n, s;
  var r = t[1][1];
  function a(i, o) {
    return { props: { data: i[4], form: i[2] } };
  }
  return (
    r && ((e = Me(r, a(t))), t[10](e)),
    {
      c() {
        e && se(e.$$.fragment), (n = _e());
      },
      l(i) {
        e && oe(e.$$.fragment, i), (n = _e());
      },
      m(i, o) {
        e && ee(e, i, o), I(i, n, o), (s = !0);
      },
      p(i, o) {
        if (o & 2 && r !== (r = i[1][1])) {
          if (e) {
            ye();
            const c = e;
            O(c.$$.fragment, 1, 0, () => {
              te(c, 1);
            }),
              we();
          }
          r
            ? ((e = Me(r, a(i))),
              i[10](e),
              se(e.$$.fragment),
              S(e.$$.fragment, 1),
              ee(e, n.parentNode, n))
            : (e = null);
        } else if (r) {
          const c = {};
          o & 16 && (c.data = i[4]), o & 4 && (c.form = i[2]), e.$set(c);
        }
      },
      i(i) {
        s || (e && S(e.$$.fragment, i), (s = !0));
      },
      o(i) {
        e && O(e.$$.fragment, i), (s = !1);
      },
      d(i) {
        i && p(n), t[10](null), e && te(e, i);
      },
    }
  );
}
function Cn(t) {
  let e,
    n = t[6] && $n(t);
  return {
    c() {
      (e = P('div')), n && n.c(), this.h();
    },
    l(s) {
      e = B(s, 'DIV', {
        id: !0,
        'aria-live': !0,
        'aria-atomic': !0,
        style: !0,
      });
      var r = k(e);
      n && n.l(r), r.forEach(p), this.h();
    },
    h() {
      f(e, 'id', 'svelte-announcer'),
        f(e, 'aria-live', 'assertive'),
        f(e, 'aria-atomic', 'true'),
        De(e, 'position', 'absolute'),
        De(e, 'left', '0'),
        De(e, 'top', '0'),
        De(e, 'clip', 'rect(0 0 0 0)'),
        De(e, 'clip-path', 'inset(50%)'),
        De(e, 'overflow', 'hidden'),
        De(e, 'white-space', 'nowrap'),
        De(e, 'width', '1px'),
        De(e, 'height', '1px');
    },
    m(s, r) {
      I(s, e, r), n && n.m(e, null);
    },
    p(s, r) {
      s[6]
        ? n
          ? n.p(s, r)
          : ((n = $n(s)), n.c(), n.m(e, null))
        : n && (n.d(1), (n = null));
    },
    d(s) {
      s && p(e), n && n.d();
    },
  };
}
function $n(t) {
  let e;
  return {
    c() {
      e = Ie(t[7]);
    },
    l(n) {
      e = He(n, t[7]);
    },
    m(n, s) {
      I(n, e, s);
    },
    p(n, s) {
      s & 128 && dt(e, n[7]);
    },
    d(n) {
      n && p(e);
    },
  };
}
function wr(t) {
  let e, n, s, r, a;
  const i = [vr, gr],
    o = [];
  function c(u, h) {
    return u[1][1] ? 0 : 1;
  }
  (e = c(t)), (n = o[e] = i[e](t));
  let l = t[5] && Cn(t);
  return {
    c() {
      n.c(), (s = Y()), l && l.c(), (r = _e());
    },
    l(u) {
      n.l(u), (s = X(u)), l && l.l(u), (r = _e());
    },
    m(u, h) {
      o[e].m(u, h), I(u, s, h), l && l.m(u, h), I(u, r, h), (a = !0);
    },
    p(u, [h]) {
      let w = e;
      (e = c(u)),
        e === w
          ? o[e].p(u, h)
          : (ye(),
            O(o[w], 1, 1, () => {
              o[w] = null;
            }),
            we(),
            (n = o[e]),
            n ? n.p(u, h) : ((n = o[e] = i[e](u)), n.c()),
            S(n, 1),
            n.m(s.parentNode, s)),
        u[5]
          ? l
            ? l.p(u, h)
            : ((l = Cn(u)), l.c(), l.m(r.parentNode, r))
          : l && (l.d(1), (l = null));
    },
    i(u) {
      a || (S(n), (a = !0));
    },
    o(u) {
      O(n), (a = !1);
    },
    d(u) {
      u && (p(s), p(r)), o[e].d(u), l && l.d(u);
    },
  };
}
function br(t, e, n) {
  let { stores: s } = e,
    { page: r } = e,
    { constructors: a } = e,
    { components: i = [] } = e,
    { form: o } = e,
    { data_0: c = null } = e,
    { data_1: l = null } = e;
  Ps(s.page.notify);
  let u = !1,
    h = !1,
    w = null;
  nt(() => {
    const C = s.page.subscribe(() => {
      u &&
        (n(6, (h = !0)),
        Tt().then(() => {
          n(7, (w = document.title || 'untitled page'));
        }));
    });
    return n(5, (u = !0)), C;
  });
  function $(C) {
    bt[C ? 'unshift' : 'push'](() => {
      (i[1] = C), n(0, i);
    });
  }
  function v(C) {
    bt[C ? 'unshift' : 'push'](() => {
      (i[0] = C), n(0, i);
    });
  }
  function x(C) {
    bt[C ? 'unshift' : 'push'](() => {
      (i[0] = C), n(0, i);
    });
  }
  return (
    (t.$$set = (C) => {
      'stores' in C && n(8, (s = C.stores)),
        'page' in C && n(9, (r = C.page)),
        'constructors' in C && n(1, (a = C.constructors)),
        'components' in C && n(0, (i = C.components)),
        'form' in C && n(2, (o = C.form)),
        'data_0' in C && n(3, (c = C.data_0)),
        'data_1' in C && n(4, (l = C.data_1));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 768 && s.page.set(r);
    }),
    [i, a, o, c, l, u, h, w, s, r, $, v, x]
  );
}
class Ma extends ce {
  constructor(e) {
    super(),
      le(this, e, br, wr, ie, {
        stores: 8,
        page: 9,
        constructors: 1,
        components: 0,
        form: 2,
        data_0: 3,
        data_1: 4,
      });
  }
}
const Fa = [
    () => St(() => Promise.resolve().then(() => Er), void 0, import.meta.url),
    () => St(() => Promise.resolve().then(() => Ar), void 0, import.meta.url),
    () => St(() => Promise.resolve().then(() => ta), void 0, import.meta.url),
    () => St(() => Promise.resolve().then(() => Aa), void 0, import.meta.url),
  ],
  Ra = [],
  Da = { '/': [2], '/whitepaper': [3] },
  Va = {
    handleError: ({ error: t }) => {
      console.error(t);
    },
  };
function Cr(t) {
  let e;
  const n = t[1].default,
    s = Rn(n, t, t[0], null);
  return {
    c() {
      s && s.c();
    },
    l(r) {
      s && s.l(r);
    },
    m(r, a) {
      s && s.m(r, a), (e = !0);
    },
    p(r, [a]) {
      s &&
        s.p &&
        (!e || a & 1) &&
        jn(s, n, r, r[0], e ? Vn(n, r[0], a, null) : Hn(r[0]), null);
    },
    i(r) {
      e || (S(s, r), (e = !0));
    },
    o(r) {
      O(s, r), (e = !1);
    },
    d(r) {
      s && s.d(r);
    },
  };
}
function $r(t, e, n) {
  let { $$slots: s = {}, $$scope: r } = e;
  return (
    (t.$$set = (a) => {
      '$$scope' in a && n(0, (r = a.$$scope));
    }),
    [r, s]
  );
}
let kr = class extends ce {
  constructor(e) {
    super(), le(this, e, $r, Cr, ie, {});
  }
};
const Er = Object.freeze(
    Object.defineProperty(
      { __proto__: null, component: kr },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  xr = () => {
    const t = Ve;
    return {
      page: { subscribe: t.page.subscribe },
      navigating: { subscribe: t.navigating.subscribe },
      updated: t.updated,
    };
  },
  Sr = {
    subscribe(t) {
      return xr().page.subscribe(t);
    },
  };
function Tr(t) {
  let e,
    n = t[0].status + '',
    s,
    r,
    a,
    i = t[0].error?.message + '',
    o;
  return {
    c() {
      (e = P('h1')), (s = Ie(n)), (r = Y()), (a = P('p')), (o = Ie(i));
    },
    l(c) {
      e = B(c, 'H1', {});
      var l = k(e);
      (s = He(l, n)), l.forEach(p), (r = X(c)), (a = B(c, 'P', {}));
      var u = k(a);
      (o = He(u, i)), u.forEach(p);
    },
    m(c, l) {
      I(c, e, l), y(e, s), I(c, r, l), I(c, a, l), y(a, o);
    },
    p(c, [l]) {
      l & 1 && n !== (n = c[0].status + '') && dt(s, n),
        l & 1 && i !== (i = c[0].error?.message + '') && dt(o, i);
    },
    i: T,
    o: T,
    d(c) {
      c && (p(e), p(r), p(a));
    },
  };
}
function Or(t, e, n) {
  let s;
  return rt(t, Sr, (r) => n(0, (s = r))), [s];
}
let Ir = class extends ce {
  constructor(e) {
    super(), le(this, e, Or, Tr, ie, {});
  }
};
const Ar = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Ir },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
function Pr(t) {
  const e = t - 1;
  return e * e * e + 1;
}
function Qt(t, { delay: e = 0, duration: n = 400, easing: s = Dt } = {}) {
  const r = +getComputedStyle(t).opacity;
  return { delay: e, duration: n, easing: s, css: (a) => `opacity: ${a * r}` };
}
function Br(
  t,
  {
    delay: e = 0,
    duration: n = 400,
    easing: s = Pr,
    x: r = 0,
    y: a = 0,
    opacity: i = 0,
  } = {},
) {
  const o = getComputedStyle(t),
    c = +o.opacity,
    l = o.transform === 'none' ? '' : o.transform,
    u = c * (1 - i),
    [h, w] = cn(r),
    [$, v] = cn(a);
  return {
    delay: e,
    duration: n,
    easing: s,
    css: (x, C) => `
			transform: ${l} translate(${(1 - x) * h}${w}, ${(1 - x) * $}${v});
			opacity: ${c - u * C}`,
  };
}
const pt = 20,
  Nr = {
    close: 'Close',
    back: 'Back',
    menu: 'Open menu to access navigation options',
    collapse: 'Collapse',
    expand: 'Expand',
    copy: 'Copy to clipboard',
  },
  Lr = { switch_theme: 'Switch theme' },
  Mr = { completed: 'Completed', in_progress: 'In progress' },
  Fr = { core: Nr, theme: Lr, progress: Mr },
  Rr = Xn({ lang: 'en', ...Fr });
var Ua =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
    ? window
    : typeof global < 'u'
    ? global
    : typeof self < 'u'
    ? self
    : {};
function za(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default')
    ? t.default
    : t;
}
function Dr(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == 'function') {
    var n = function s() {
      return this instanceof s
        ? Reflect.construct(e, arguments, this.constructor)
        : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else n = {};
  return (
    Object.defineProperty(n, '__esModule', { value: !0 }),
    Object.keys(t).forEach(function (s) {
      var r = Object.getOwnPropertyDescriptor(t, s);
      Object.defineProperty(
        n,
        s,
        r.get
          ? r
          : {
              enumerable: !0,
              get: function () {
                return t[s];
              },
            },
      );
    }),
    n
  );
}
const Vr = Ue(0);
const jr = () => {
    const t = [],
      { subscribe: e, update: n, set: s } = Ue(t);
    return {
      subscribe: e,
      startBusy({ initiator: r, text: a }) {
        n((i) => [
          ...i.filter(({ initiator: o }) => r !== o),
          { initiator: r, text: a },
        ]);
      },
      stopBusy(r) {
        n((a) => a.filter(({ initiator: i }) => i !== r));
      },
      resetForTesting() {
        s(t);
      },
    };
  },
  is = jr(),
  Hr = kt(is, (t) => t.length > 0),
  Ur = kt(is, (t) => t.reverse().find(({ text: e }) => We(e))?.text);
function zr(t) {
  let e, n, s;
  return {
    c() {
      (e = D('svg')), (n = D('circle')), this.h();
    },
    l(r) {
      e = H(r, 'svg', {
        class: !0,
        preserveAspectRatio: !0,
        focusable: !0,
        'aria-hidden': !0,
        'data-tid': !0,
        viewBox: !0,
      });
      var a = k(e);
      (n = H(a, 'circle', { cx: !0, cy: !0, r: !0, class: !0 })),
        k(n).forEach(p),
        a.forEach(p),
        this.h();
    },
    h() {
      f(n, 'cx', '50%'),
        f(n, 'cy', '50%'),
        f(n, 'r', '45'),
        f(n, 'class', 'svelte-85668t'),
        f(e, 'class', (s = ft(t[1]) + ' svelte-85668t')),
        f(e, 'preserveAspectRatio', 'xMidYMid meet'),
        f(e, 'focusable', 'false'),
        f(e, 'aria-hidden', 'true'),
        f(e, 'data-tid', 'spinner'),
        f(e, 'viewBox', '0 0 100 100'),
        Ne(e, 'inline', t[0]);
    },
    m(r, a) {
      I(r, e, a), y(e, n);
    },
    p(r, [a]) {
      a & 2 && s !== (s = ft(r[1]) + ' svelte-85668t') && f(e, 'class', s),
        a & 3 && Ne(e, 'inline', r[0]);
    },
    i: T,
    o: T,
    d(r) {
      r && p(e);
    },
  };
}
function qr(t, e, n) {
  let { inline: s = !1 } = e,
    { size: r = 'medium' } = e;
  return (
    (t.$$set = (a) => {
      'inline' in a && n(0, (s = a.inline)), 'size' in a && n(1, (r = a.size));
    }),
    [s, r]
  );
}
class an extends ce {
  constructor(e) {
    super(), le(this, e, qr, zr, ie, { inline: 0, size: 1 });
  }
}
function kn(t) {
  let e,
    n,
    s = We(t[1]),
    r,
    a,
    i,
    o,
    c,
    l = s && En(t);
  return (
    (i = new an({ props: { inline: !0 } })),
    {
      c() {
        (e = P('div')),
          (n = P('div')),
          l && l.c(),
          (r = Y()),
          (a = P('span')),
          se(i.$$.fragment),
          this.h();
      },
      l(u) {
        e = B(u, 'DIV', { 'data-tid': !0, class: !0 });
        var h = k(e);
        n = B(h, 'DIV', { class: !0 });
        var w = k(n);
        l && l.l(w), (r = X(w)), (a = B(w, 'SPAN', {}));
        var $ = k(a);
        oe(i.$$.fragment, $),
          $.forEach(p),
          w.forEach(p),
          h.forEach(p),
          this.h();
      },
      h() {
        f(n, 'class', 'content svelte-14plyno'),
          f(e, 'data-tid', 'busy'),
          f(e, 'class', 'svelte-14plyno');
      },
      m(u, h) {
        I(u, e, h),
          y(e, n),
          l && l.m(n, null),
          y(n, r),
          y(n, a),
          ee(i, a, null),
          (c = !0);
      },
      p(u, h) {
        h & 2 && (s = We(u[1])),
          s
            ? l
              ? l.p(u, h)
              : ((l = En(u)), l.c(), l.m(n, r))
            : l && (l.d(1), (l = null));
      },
      i(u) {
        c ||
          (S(i.$$.fragment, u),
          Je(() => {
            c && (o || (o = fn(e, Qt, {}, !0)), o.run(1));
          }),
          (c = !0));
      },
      o(u) {
        O(i.$$.fragment, u), o || (o = fn(e, Qt, {}, !1)), o.run(0), (c = !1);
      },
      d(u) {
        u && p(e), l && l.d(), te(i), u && o && o.end();
      },
    }
  );
}
function En(t) {
  let e, n;
  return {
    c() {
      (e = P('p')), (n = Ie(t[1])), this.h();
    },
    l(s) {
      e = B(s, 'P', { class: !0 });
      var r = k(e);
      (n = He(r, t[1])), r.forEach(p), this.h();
    },
    h() {
      f(e, 'class', 'svelte-14plyno');
    },
    m(s, r) {
      I(s, e, r), y(e, n);
    },
    p(s, r) {
      r & 2 && dt(n, s[1]);
    },
    d(s) {
      s && p(e);
    },
  };
}
function Kr(t) {
  let e,
    n,
    s = t[0] && kn(t);
  return {
    c() {
      s && s.c(), (e = _e());
    },
    l(r) {
      s && s.l(r), (e = _e());
    },
    m(r, a) {
      s && s.m(r, a), I(r, e, a), (n = !0);
    },
    p(r, [a]) {
      r[0]
        ? s
          ? (s.p(r, a), a & 1 && S(s, 1))
          : ((s = kn(r)), s.c(), S(s, 1), s.m(e.parentNode, e))
        : s &&
          (ye(),
          O(s, 1, 1, () => {
            s = null;
          }),
          we());
    },
    i(r) {
      n || (S(s), (n = !0));
    },
    o(r) {
      O(s), (n = !1);
    },
    d(r) {
      r && p(e), s && s.d(r);
    },
  };
}
function Zr(t, e, n) {
  let s, r;
  return (
    rt(t, Hr, (a) => n(0, (s = a))), rt(t, Ur, (a) => n(1, (r = a))), [s, r]
  );
}
class Wr extends ce {
  constructor(e) {
    super(), le(this, e, Zr, Kr, ie, {});
  }
}
function Gr(t) {
  let e, n, s, r;
  return {
    c() {
      (e = D('svg')),
        (n = D('rect')),
        (s = D('path')),
        (r = D('rect')),
        this.h();
    },
    l(a) {
      e = H(a, 'svg', {
        width: !0,
        height: !0,
        viewBox: !0,
        fill: !0,
        xmlns: !0,
      });
      var i = k(e);
      (n = H(i, 'rect', {
        x: !0,
        y: !0,
        width: !0,
        height: !0,
        rx: !0,
        fill: !0,
      })),
        k(n).forEach(p),
        (s = H(i, 'path', {
          d: !0,
          stroke: !0,
          'stroke-width': !0,
          'stroke-linecap': !0,
          'stroke-linejoin': !0,
        })),
        k(s).forEach(p),
        (r = H(i, 'rect', {
          x: !0,
          y: !0,
          width: !0,
          height: !0,
          rx: !0,
          stroke: !0,
          'stroke-width': !0,
        })),
        k(r).forEach(p),
        i.forEach(p),
        this.h();
    },
    h() {
      f(n, 'x', '1.25'),
        f(n, 'y', '1.25'),
        f(n, 'width', '21.5'),
        f(n, 'height', '21.5'),
        f(n, 'rx', '10.75'),
        f(n, 'fill', 'var(--icon-check-circle-background, transparent)'),
        f(s, 'd', 'M7 11L11 15L17 9'),
        f(s, 'stroke', 'var(--icon-check-circle-color, currentColor)'),
        f(s, 'stroke-width', '1.5'),
        f(s, 'stroke-linecap', 'round'),
        f(s, 'stroke-linejoin', 'round'),
        f(r, 'x', '1.25'),
        f(r, 'y', '1.25'),
        f(r, 'width', '21.5'),
        f(r, 'height', '21.5'),
        f(r, 'rx', '10.75'),
        f(r, 'stroke', 'var(--icon-check-circle-background, currentColor)'),
        f(r, 'stroke-width', '1.5'),
        f(e, 'width', t[0]),
        f(e, 'height', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'fill', 'none'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg');
    },
    m(a, i) {
      I(a, e, i), y(e, n), y(e, s), y(e, r);
    },
    p(a, [i]) {
      i & 1 && f(e, 'width', a[0]), i & 1 && f(e, 'height', a[0]);
    },
    i: T,
    o: T,
    d(a) {
      a && p(e);
    },
  };
}
function Jr(t, e, n) {
  let { size: s = '24px' } = e;
  return (
    (t.$$set = (r) => {
      'size' in r && n(0, (s = r.size));
    }),
    [s]
  );
}
class Qr extends ce {
  constructor(e) {
    super(), le(this, e, Jr, Gr, ie, { size: 0 });
  }
}
function Yr(t) {
  let e, n, s;
  return {
    c() {
      (e = D('svg')), (n = D('rect')), (s = D('rect')), this.h();
    },
    l(r) {
      e = H(r, 'svg', {
        height: !0,
        width: !0,
        viewBox: !0,
        fill: !0,
        xmlns: !0,
      });
      var a = k(e);
      (n = H(a, 'rect', {
        x: !0,
        y: !0,
        width: !0,
        height: !0,
        rx: !0,
        transform: !0,
        fill: !0,
      })),
        k(n).forEach(p),
        (s = H(a, 'rect', {
          x: !0,
          y: !0,
          width: !0,
          height: !0,
          rx: !0,
          transform: !0,
          fill: !0,
        })),
        k(s).forEach(p),
        a.forEach(p),
        this.h();
    },
    h() {
      f(n, 'x', '14.4194'),
        f(n, 'y', '4.52441'),
        f(n, 'width', '1.5'),
        f(n, 'height', '14'),
        f(n, 'rx', '0.75'),
        f(n, 'transform', 'rotate(45 14.4194 4.52441)'),
        f(n, 'fill', 'currentColor'),
        f(s, 'x', '4.5199'),
        f(s, 'y', '5.58496'),
        f(s, 'width', '1.5'),
        f(s, 'height', '14'),
        f(s, 'rx', '0.75'),
        f(s, 'transform', 'rotate(-45 4.5199 5.58496)'),
        f(s, 'fill', 'currentColor'),
        f(e, 'height', t[0]),
        f(e, 'width', t[0]),
        f(e, 'viewBox', '0 0 20 20'),
        f(e, 'fill', 'none'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg');
    },
    m(r, a) {
      I(r, e, a), y(e, n), y(e, s);
    },
    p(r, [a]) {
      a & 1 && f(e, 'height', r[0]), a & 1 && f(e, 'width', r[0]);
    },
    i: T,
    o: T,
    d(r) {
      r && p(e);
    },
  };
}
function Xr(t, e, n) {
  let { size: s = `${pt}px` } = e;
  return (
    (t.$$set = (r) => {
      'size' in r && n(0, (s = r.size));
    }),
    [s]
  );
}
class ei extends ce {
  constructor(e) {
    super(), le(this, e, Xr, Yr, ie, { size: 0 });
  }
}
function ti(t) {
  let e, n, s;
  return {
    c() {
      (e = D('svg')), (n = D('path')), (s = D('path')), this.h();
    },
    l(r) {
      e = H(r, 'svg', {
        xmlns: !0,
        height: !0,
        viewBox: !0,
        width: !0,
        fill: !0,
      });
      var a = k(e);
      (n = H(a, 'path', { d: !0, fill: !0 })),
        k(n).forEach(p),
        (s = H(a, 'path', { d: !0 })),
        k(s).forEach(p),
        a.forEach(p),
        this.h();
    },
    h() {
      f(n, 'd', 'M0 0h24v24H0z'),
        f(n, 'fill', 'none'),
        f(
          s,
          'd',
          'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
        ),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'height', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'width', t[0]),
        f(e, 'fill', 'currentColor');
    },
    m(r, a) {
      I(r, e, a), y(e, n), y(e, s);
    },
    p(r, [a]) {
      a & 1 && f(e, 'height', r[0]), a & 1 && f(e, 'width', r[0]);
    },
    i: T,
    o: T,
    d(r) {
      r && p(e);
    },
  };
}
function ni(t, e, n) {
  let { size: s = `${pt}px` } = e;
  return (
    (t.$$set = (r) => {
      'size' in r && n(0, (s = r.size));
    }),
    [s]
  );
}
class si extends ce {
  constructor(e) {
    super(), le(this, e, ni, ti, ie, { size: 0 });
  }
}
function ri(t) {
  let e, n, s, r;
  return {
    c() {
      (e = D('svg')),
        (n = D('path')),
        (s = D('path')),
        (r = D('path')),
        this.h();
    },
    l(a) {
      e = H(a, 'svg', {
        width: !0,
        height: !0,
        viewBox: !0,
        fill: !0,
        xmlns: !0,
        'data-tid': !0,
        class: !0,
      });
      var i = k(e);
      (n = H(i, 'path', {
        d: !0,
        stroke: !0,
        'stroke-width': !0,
        'stroke-linecap': !0,
        'stroke-linejoin': !0,
      })),
        k(n).forEach(p),
        (s = H(i, 'path', {
          d: !0,
          stroke: !0,
          'stroke-width': !0,
          'stroke-linecap': !0,
          'stroke-linejoin': !0,
        })),
        k(s).forEach(p),
        (r = H(i, 'path', {
          d: !0,
          stroke: !0,
          'stroke-width': !0,
          'stroke-linecap': !0,
          'stroke-linejoin': !0,
        })),
        k(r).forEach(p),
        i.forEach(p),
        this.h();
    },
    h() {
      f(
        n,
        'd',
        'M10.2222 17.5C14.3643 17.5 17.7222 14.1421 17.7222 10C17.7222 5.85786 14.3643 2.5 10.2222 2.5C6.08003 2.5 2.72217 5.85786 2.72217 10C2.72217 14.1421 6.08003 17.5 10.2222 17.5Z',
      ),
        f(n, 'stroke', 'currentColor'),
        f(n, 'stroke-width', '1.5'),
        f(n, 'stroke-linecap', 'round'),
        f(n, 'stroke-linejoin', 'round'),
        f(s, 'd', 'M10.2222 13.3333V10'),
        f(s, 'stroke', 'currentColor'),
        f(s, 'stroke-width', '1.5'),
        f(s, 'stroke-linecap', 'round'),
        f(s, 'stroke-linejoin', 'round'),
        f(r, 'd', 'M10.2222 6.66699H10.2305'),
        f(r, 'stroke', 'currentColor'),
        f(r, 'stroke-width', '1.5'),
        f(r, 'stroke-linecap', 'round'),
        f(r, 'stroke-linejoin', 'round'),
        f(e, 'width', t[0]),
        f(e, 'height', t[0]),
        f(e, 'viewBox', '0 0 20 20'),
        f(e, 'fill', 'none'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'data-tid', 'icon-info'),
        f(e, 'class', 'svelte-1lui9gh');
    },
    m(a, i) {
      I(a, e, i), y(e, n), y(e, s), y(e, r);
    },
    p(a, [i]) {
      i & 1 && f(e, 'width', a[0]), i & 1 && f(e, 'height', a[0]);
    },
    i: T,
    o: T,
    d(a) {
      a && p(e);
    },
  };
}
function ii(t, e, n) {
  let { size: s = `${pt}px` } = e;
  return (
    (t.$$set = (r) => {
      'size' in r && n(0, (s = r.size));
    }),
    [s]
  );
}
class ai extends ce {
  constructor(e) {
    super(), le(this, e, ii, ri, ie, { size: 0 });
  }
}
function oi(t) {
  let e, n;
  return {
    c() {
      (e = D('svg')), (n = D('path')), this.h();
    },
    l(s) {
      e = H(s, 'svg', {
        xmlns: !0,
        height: !0,
        viewBox: !0,
        width: !0,
        fill: !0,
      });
      var r = k(e);
      (n = H(r, 'path', { d: !0 })), k(n).forEach(p), r.forEach(p), this.h();
    },
    h() {
      f(n, 'd', 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'height', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'width', t[0]),
        f(e, 'fill', 'currentColor');
    },
    m(s, r) {
      I(s, e, r), y(e, n);
    },
    p(s, [r]) {
      r & 1 && f(e, 'height', s[0]), r & 1 && f(e, 'width', s[0]);
    },
    i: T,
    o: T,
    d(s) {
      s && p(e);
    },
  };
}
function li(t, e, n) {
  let { size: s = `${pt}px` } = e;
  return (
    (t.$$set = (r) => {
      'size' in r && n(0, (s = r.size));
    }),
    [s]
  );
}
class ci extends ce {
  constructor(e) {
    super(), le(this, e, li, oi, ie, { size: 0 });
  }
}
var Rt;
(function (t) {
  (t.DARK = 'dark'), (t.LIGHT = 'light');
})(Rt || (Rt = {}));
const as = () =>
    typeof process < 'u' &&
    process.versions != null &&
    process.versions.node != null,
  os = ({ obj: t, value: e }) => Object.values(t).includes(e),
  ls = 'theme',
  ui = 'nnsTheme',
  fi = () => {
    if (as()) return;
    const t = document.documentElement.getAttribute(ls),
      e = os({ obj: Rt, value: t }) ? t : Rt.DARK;
    return di({ theme: e, preserve: !1 }), e;
  },
  di = ({ theme: t, preserve: e = !0 }) => {
    const { documentElement: n, head: s } = document;
    n.setAttribute(ls, t);
    const r = getComputedStyle(n).getPropertyValue('--theme-color');
    s?.children?.namedItem('theme-color')?.setAttribute('content', r.trim()),
      e && localStorage.setItem(ui, JSON.stringify(t));
  };
fi();
var Ge;
(function (t) {
  (t.COLLAPSED = 'collapsed'), (t.EXPANDED = 'expanded');
})(Ge || (Ge = {}));
const cs = 'menu',
  hi = 'nnsMenu',
  pi = () => {
    if (as()) return;
    const t = document.documentElement.getAttribute(cs),
      e = os({ obj: Ge, value: t }) ? t : Ge.EXPANDED;
    return us({ menu: e, preserve: !1 }), e;
  },
  us = ({ menu: t, preserve: e = !0 }) => {
    const { documentElement: n } = document;
    n.setAttribute(cs, t), e && localStorage.setItem(hi, JSON.stringify(t));
  },
  _i = pi(),
  mi = () => {
    const { subscribe: t, update: e } = Ue(_i);
    return {
      subscribe: t,
      toggle: () => {
        e((n) => {
          const s = n === Ge.EXPANDED ? Ge.COLLAPSED : Ge.EXPANDED;
          return us({ menu: s, preserve: !0 }), s;
        });
      },
    };
  },
  gi = mi();
kt(gi, (t) => t === Ge.COLLAPSED);
const vi = () => {
    const { subscribe: t, update: e, set: n } = Ue([]);
    return {
      subscribe: t,
      show({ id: s, ...r }) {
        const a = s ?? Symbol('toast');
        return e((i) => [...i, { ...r, id: a }]), a;
      },
      hide(s) {
        e((r) => r.filter(({ id: a }) => a !== s));
      },
      update({ id: s, content: r }) {
        e((a) => a.map((i) => (i.id !== s ? i : { ...i, ...r })));
      },
      reset(s) {
        if (We(s) && s.length > 0) {
          e((r) => r.filter(({ level: a }) => !s.includes(a)));
          return;
        }
        n([]);
      },
    };
  },
  fs = vi();
function yi(t) {
  let e, n, s;
  var r = t[11](t[1]);
  function a(i, o) {
    return { props: { size: pt } };
  }
  return (
    r && (e = Me(r, a())),
    {
      c() {
        e && se(e.$$.fragment), (n = _e());
      },
      l(i) {
        e && oe(e.$$.fragment, i), (n = _e());
      },
      m(i, o) {
        e && ee(e, i, o), I(i, n, o), (s = !0);
      },
      p(i, o) {
        if (o & 2 && r !== (r = i[11](i[1]))) {
          if (e) {
            ye();
            const c = e;
            O(c.$$.fragment, 1, 0, () => {
              te(c, 1);
            }),
              we();
          }
          r
            ? ((e = Me(r, a())),
              se(e.$$.fragment),
              S(e.$$.fragment, 1),
              ee(e, n.parentNode, n))
            : (e = null);
        }
      },
      i(i) {
        s || (e && S(e.$$.fragment, i), (s = !0));
      },
      o(i) {
        e && O(e.$$.fragment, i), (s = !1);
      },
      d(i) {
        i && p(n), e && te(e, i);
      },
    }
  );
}
function wi(t) {
  let e, n, s;
  var r = t[5];
  function a(i, o) {
    return {};
  }
  return (
    r && (e = Me(r, a())),
    {
      c() {
        e && se(e.$$.fragment), (n = _e());
      },
      l(i) {
        e && oe(e.$$.fragment, i), (n = _e());
      },
      m(i, o) {
        e && ee(e, i, o), I(i, n, o), (s = !0);
      },
      p(i, o) {
        if (o & 32 && r !== (r = i[5])) {
          if (e) {
            ye();
            const c = e;
            O(c.$$.fragment, 1, 0, () => {
              te(c, 1);
            }),
              we();
          }
          r
            ? ((e = Me(r, a())),
              se(e.$$.fragment),
              S(e.$$.fragment, 1),
              ee(e, n.parentNode, n))
            : (e = null);
        }
      },
      i(i) {
        s || (e && S(e.$$.fragment, i), (s = !0));
      },
      o(i) {
        e && O(e.$$.fragment, i), (s = !1);
      },
      d(i) {
        i && p(n), e && te(e, i);
      },
    }
  );
}
function bi(t) {
  let e, n;
  return (
    (e = new an({ props: { size: 'small', inline: !0 } })),
    {
      c() {
        se(e.$$.fragment);
      },
      l(s) {
        oe(e.$$.fragment, s);
      },
      m(s, r) {
        ee(e, s, r), (n = !0);
      },
      p: T,
      i(s) {
        n || (S(e.$$.fragment, s), (n = !0));
      },
      o(s) {
        O(e.$$.fragment, s), (n = !1);
      },
      d(s) {
        te(e, s);
      },
    }
  );
}
function xn(t) {
  let e, n;
  return {
    c() {
      (e = P('span')), (n = Ie(t[3])), this.h();
    },
    l(s) {
      e = B(s, 'SPAN', { class: !0 });
      var r = k(e);
      (n = He(r, t[3])), r.forEach(p), this.h();
    },
    h() {
      f(e, 'class', 'title svelte-1ih7d9r');
    },
    m(s, r) {
      I(s, e, r), y(e, n);
    },
    p(s, r) {
      r & 8 && dt(n, s[3]);
    },
    d(s) {
      s && p(e);
    },
  };
}
function Ci(t) {
  let e,
    n,
    s,
    r,
    a,
    i,
    o,
    c,
    l,
    u = We(t[3]),
    h,
    w,
    $,
    v,
    x,
    C,
    z,
    V,
    L,
    G,
    q,
    J;
  const Q = [bi, wi, yi],
    re = [];
  function K(ne, R) {
    return (
      R & 32 && (s = null),
      R & 2 && (r = null),
      ne[2]
        ? 0
        : (s == null && (s = !!We(ne[5])),
          s ? 1 : (r == null && (r = !!ne[11](ne[1])), r ? 2 : -1))
    );
  }
  ~(a = K(t, -1)) && (i = re[a] = Q[a](t));
  let U = u && xn(t);
  return (
    (x = new ei({})),
    {
      c() {
        (e = P('div')),
          (n = P('div')),
          i && i.c(),
          (c = Y()),
          (l = P('p')),
          U && U.c(),
          (h = Y()),
          (w = Ie(t[0])),
          ($ = Y()),
          (v = P('button')),
          se(x.$$.fragment),
          this.h();
      },
      l(ne) {
        e = B(ne, 'DIV', { role: !0, class: !0 });
        var R = k(e);
        n = B(R, 'DIV', { class: !0, 'aria-hidden': !0 });
        var me = k(n);
        i && i.l(me),
          me.forEach(p),
          (c = X(R)),
          (l = B(R, 'P', { class: !0, style: !0 }));
        var Ee = k(l);
        U && U.l(Ee),
          (h = X(Ee)),
          (w = He(Ee, t[0])),
          Ee.forEach(p),
          ($ = X(R)),
          (v = B(R, 'BUTTON', { class: !0, 'aria-label': !0 }));
        var ke = k(v);
        oe(x.$$.fragment, ke), ke.forEach(p), R.forEach(p), this.h();
      },
      h() {
        f(n, 'class', (o = 'icon ' + t[1] + ' svelte-1ih7d9r')),
          f(n, 'aria-hidden', 'true'),
          f(l, 'class', 'msg svelte-1ih7d9r'),
          f(l, 'style', t[13]),
          Ne(l, 'truncate', t[8]),
          Ne(l, 'clamp', t[9]),
          Ne(l, 'scroll', t[7]),
          f(v, 'class', 'close svelte-1ih7d9r'),
          f(v, 'aria-label', (C = t[10].core.close)),
          f(e, 'role', 'dialog'),
          f(
            e,
            'class',
            (z = ft(`toast ${t[6] ?? 'themed'}`) + ' svelte-1ih7d9r'),
          );
      },
      m(ne, R) {
        I(ne, e, R),
          y(e, n),
          ~a && re[a].m(n, null),
          y(e, c),
          y(e, l),
          U && U.m(l, null),
          y(l, h),
          y(l, w),
          y(e, $),
          y(e, v),
          ee(x, v, null),
          (G = !0),
          q || ((J = je(v, 'click', t[12])), (q = !0));
      },
      p(ne, [R]) {
        t = ne;
        let me = a;
        (a = K(t, R)),
          a === me
            ? ~a && re[a].p(t, R)
            : (i &&
                (ye(),
                O(re[me], 1, 1, () => {
                  re[me] = null;
                }),
                we()),
              ~a
                ? ((i = re[a]),
                  i ? i.p(t, R) : ((i = re[a] = Q[a](t)), i.c()),
                  S(i, 1),
                  i.m(n, null))
                : (i = null)),
          (!G || (R & 2 && o !== (o = 'icon ' + t[1] + ' svelte-1ih7d9r'))) &&
            f(n, 'class', o),
          R & 8 && (u = We(t[3])),
          u
            ? U
              ? U.p(t, R)
              : ((U = xn(t)), U.c(), U.m(l, h))
            : U && (U.d(1), (U = null)),
          (!G || R & 1) && dt(w, t[0]),
          (!G || R & 256) && Ne(l, 'truncate', t[8]),
          (!G || R & 512) && Ne(l, 'clamp', t[9]),
          (!G || R & 128) && Ne(l, 'scroll', t[7]),
          (!G || (R & 1024 && C !== (C = t[10].core.close))) &&
            f(v, 'aria-label', C),
          (!G ||
            (R & 64 &&
              z !==
                (z = ft(`toast ${t[6] ?? 'themed'}`) + ' svelte-1ih7d9r'))) &&
            f(e, 'class', z);
      },
      i(ne) {
        G ||
          (S(i),
          S(x.$$.fragment, ne),
          Je(() => {
            G &&
              (L && L.end(1),
              (V = Ms(e, Br, {
                y: (t[4] === 'top' ? -1 : 1) * 100,
                duration: 200,
              })),
              V.start());
          }),
          (G = !0));
      },
      o(ne) {
        O(i),
          O(x.$$.fragment, ne),
          V && V.invalidate(),
          (L = Fs(e, Qt, { delay: 100 })),
          (G = !1);
      },
      d(ne) {
        ne && p(e),
          ~a && re[a].d(),
          U && U.d(),
          te(x),
          ne && L && L.end(),
          (q = !1),
          J();
      },
    }
  );
}
function $i(t, e, n) {
  let s;
  rt(t, Rr, (J) => n(10, (s = J)));
  let { msg: r } = e;
  const a = (J) =>
      ({ success: Qr, warn: ci, error: si, info: ai, custom: void 0 }[J]),
    i = () => fs.hide(r.id);
  let o, c, l, u, h, w, $, v, x, C, z, V;
  const L = () => {
      const { duration: J } = r;
      At(J) || (V = setTimeout(i, J));
    },
    G = () => {
      At(V) || clearTimeout(V);
    },
    q = `min-height: ${pt}px;`;
  return (
    nt(L),
    Bs(G),
    (t.$$set = (J) => {
      'msg' in J && n(14, (r = J.msg));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 16384 &&
        n(
          0,
          ({
            text: o,
            level: c,
            spinner: l,
            title: u,
            overflow: h,
            position: w,
            icon: $,
            theme: v,
          } = r),
          o,
          (n(1, c), n(14, r)),
          (n(2, l), n(14, r)),
          (n(3, u), n(14, r)),
          (n(15, h), n(14, r)),
          (n(4, w), n(14, r)),
          (n(5, $), n(14, r)),
          (n(6, v), n(14, r)),
        ),
        t.$$.dirty & 32768 && n(7, (x = h === void 0 || h === 'scroll')),
        t.$$.dirty & 32768 && n(8, (C = h === 'truncate')),
        t.$$.dirty & 32768 && n(9, (z = h === 'clamp'));
    }),
    [o, c, l, u, w, $, v, x, C, z, s, a, i, q, r, h]
  );
}
class ki extends ce {
  constructor(e) {
    super(), le(this, e, $i, Ci, ie, { msg: 14 });
  }
}
function Sn(t, e, n) {
  const s = t.slice();
  return (s[5] = e[n]), s;
}
function Tn(t) {
  let e,
    n = [],
    s = new Map(),
    r,
    a,
    i,
    o = dn(t[1]);
  const c = (l) => l[5].id;
  for (let l = 0; l < o.length; l += 1) {
    let u = Sn(t, o, l),
      h = c(u);
    s.set(h, (n[l] = On(h, u)));
  }
  return {
    c() {
      e = P('div');
      for (let l = 0; l < n.length; l += 1) n[l].c();
      this.h();
    },
    l(l) {
      e = B(l, 'DIV', { class: !0, style: !0 });
      var u = k(e);
      for (let h = 0; h < n.length; h += 1) n[h].l(u);
      u.forEach(p), this.h();
    },
    h() {
      f(e, 'class', (r = ft(`wrapper ${t[0]}`) + ' svelte-24m335')),
        f(e, 'style', (a = `--layout-bottom-offset: ${t[3]}px`)),
        Ne(e, 'error', t[2]);
    },
    m(l, u) {
      I(l, e, u);
      for (let h = 0; h < n.length; h += 1) n[h] && n[h].m(e, null);
      i = !0;
    },
    p(l, u) {
      u & 2 &&
        ((o = dn(l[1])),
        ye(),
        (n = Ds(n, u, c, 1, l, o, s, e, Rs, On, null, Sn)),
        we()),
        (!i ||
          (u & 1 && r !== (r = ft(`wrapper ${l[0]}`) + ' svelte-24m335'))) &&
          f(e, 'class', r),
        (!i || (u & 8 && a !== (a = `--layout-bottom-offset: ${l[3]}px`))) &&
          f(e, 'style', a),
        (!i || u & 5) && Ne(e, 'error', l[2]);
    },
    i(l) {
      if (!i) {
        for (let u = 0; u < o.length; u += 1) S(n[u]);
        i = !0;
      }
    },
    o(l) {
      for (let u = 0; u < n.length; u += 1) O(n[u]);
      i = !1;
    },
    d(l) {
      l && p(e);
      for (let u = 0; u < n.length; u += 1) n[u].d();
    },
  };
}
function On(t, e) {
  let n, s, r;
  return (
    (s = new ki({ props: { msg: e[5] } })),
    {
      key: t,
      first: null,
      c() {
        (n = _e()), se(s.$$.fragment), this.h();
      },
      l(a) {
        (n = _e()), oe(s.$$.fragment, a), this.h();
      },
      h() {
        this.first = n;
      },
      m(a, i) {
        I(a, n, i), ee(s, a, i), (r = !0);
      },
      p(a, i) {
        e = a;
        const o = {};
        i & 2 && (o.msg = e[5]), s.$set(o);
      },
      i(a) {
        r || (S(s.$$.fragment, a), (r = !0));
      },
      o(a) {
        O(s.$$.fragment, a), (r = !1);
      },
      d(a) {
        a && p(n), te(s, a);
      },
    }
  );
}
function Ei(t) {
  let e,
    n,
    s = t[1].length > 0 && Tn(t);
  return {
    c() {
      s && s.c(), (e = _e());
    },
    l(r) {
      s && s.l(r), (e = _e());
    },
    m(r, a) {
      s && s.m(r, a), I(r, e, a), (n = !0);
    },
    p(r, [a]) {
      r[1].length > 0
        ? s
          ? (s.p(r, a), a & 2 && S(s, 1))
          : ((s = Tn(r)), s.c(), S(s, 1), s.m(e.parentNode, e))
        : s &&
          (ye(),
          O(s, 1, 1, () => {
            s = null;
          }),
          we());
    },
    i(r) {
      n || (S(s), (n = !0));
    },
    o(r) {
      O(s), (n = !1);
    },
    d(r) {
      r && p(e), s && s.d(r);
    },
  };
}
function xi(t, e, n) {
  let s, r;
  rt(t, fs, (c) => n(4, (s = c))), rt(t, Vr, (c) => n(3, (r = c)));
  let { position: a = 'bottom' } = e,
    i = [],
    o;
  return (
    (t.$$set = (c) => {
      'position' in c && n(0, (a = c.position));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 17 &&
        n(1, (i = s.filter(({ position: c }) => (c ?? 'bottom') === a))),
        t.$$.dirty & 2 &&
          n(
            2,
            (o =
              i.find(({ level: c }) => ['error', 'warn'].includes(c)) !==
              void 0),
          );
    }),
    [a, i, o, r, s]
  );
}
class Si extends ce {
  constructor(e) {
    super(), le(this, e, xi, Ei, ie, { position: 0 });
  }
}
function Ti(t) {
  let e, n, s, r, a, i, o;
  const c = t[1].default,
    l = Rn(c, t, t[0], null);
  return (
    (r = new Si({})),
    (i = new Wr({})),
    {
      c() {
        (e = P('div')),
          (n = P('main')),
          l && l.c(),
          (s = Y()),
          se(r.$$.fragment),
          (a = Y()),
          se(i.$$.fragment),
          this.h();
      },
      l(u) {
        e = B(u, 'DIV', { class: !0 });
        var h = k(e);
        n = B(h, 'MAIN', { class: !0 });
        var w = k(n);
        l && l.l(w),
          w.forEach(p),
          (s = X(h)),
          oe(r.$$.fragment, h),
          h.forEach(p),
          (a = X(u)),
          oe(i.$$.fragment, u),
          this.h();
      },
      h() {
        f(n, 'class', 'page-wrapper svelte-vmfccd'),
          f(e, 'class', 'flex flex-col h-screen justify-between default-text');
      },
      m(u, h) {
        I(u, e, h),
          y(e, n),
          l && l.m(n, null),
          y(e, s),
          ee(r, e, null),
          I(u, a, h),
          ee(i, u, h),
          (o = !0);
      },
      p(u, [h]) {
        l &&
          l.p &&
          (!o || h & 1) &&
          jn(l, c, u, u[0], o ? Vn(c, u[0], h, null) : Hn(u[0]), null);
      },
      i(u) {
        o || (S(l, u), S(r.$$.fragment, u), S(i.$$.fragment, u), (o = !0));
      },
      o(u) {
        O(l, u), O(r.$$.fragment, u), O(i.$$.fragment, u), (o = !1);
      },
      d(u) {
        u && (p(e), p(a)), l && l.d(u), te(r), te(i, u);
      },
    }
  );
}
function Oi(t, e, n) {
  let { $$slots: s = {}, $$scope: r } = e;
  return (
    nt(async () => {
      try {
        const a = document.images,
          i = Array.from(a).map((l) =>
            l.complete
              ? Promise.resolve()
              : new Promise((u) => {
                  l.addEventListener('load', u), l.addEventListener('error', u);
                }),
          );
        await Promise.all(i),
          document.querySelectorAll('.hidden-image').forEach((l) => {
            const u = l;
            u.style.visibility = 'visible';
          }),
          document.querySelector('body > #app-spinner')?.remove();
      } catch (a) {
        console.error('Error', a);
      } finally {
      }
    }),
    (t.$$set = (a) => {
      '$$scope' in a && n(0, (r = a.$$scope));
    }),
    [r, s]
  );
}
class ds extends ce {
  constructor(e) {
    super(), le(this, e, Oi, Ti, ie, {});
  }
}
function Ii(t) {
  let e, n, s;
  return {
    c() {
      (e = D('svg')), (n = D('path')), (s = D('path')), this.h();
    },
    l(r) {
      e = H(r, 'svg', { xmlns: !0, class: !0, viewBox: !0, fill: !0 });
      var a = k(e);
      (n = H(a, 'path', { d: !0, fill: !0 })),
        k(n).forEach(p),
        (s = H(a, 'path', { d: !0, fill: !0 })),
        k(s).forEach(p),
        a.forEach(p),
        this.h();
    },
    h() {
      f(
        n,
        'd',
        'M27.6525 32.0409V38.6535C25.9333 37.6255 23.8653 37.0304 21.6411 37.0304C19.8257 37.0304 18.1184 37.4272 16.6156 38.1305C15.5756 38.6174 14.6318 39.2486 13.8263 40.0001C13.0207 39.2486 12.0769 38.6174 11.037 38.1305C9.53412 37.4272 7.82687 37.0304 6.01142 37.0304C3.7872 37.0304 1.71927 37.6255 0 38.6535V32.0409C1.08206 31.3917 2.29636 30.9168 3.60685 30.6583C4.38233 30.502 5.18786 30.4178 6.01142 30.4178C6.62459 30.4178 7.23174 30.4659 7.81485 30.5501C10.1593 30.8988 12.2513 31.9207 13.8263 33.3875C15.4013 31.9207 17.4932 30.8988 19.8377 30.5501C20.4208 30.4659 21.028 30.4178 21.6411 30.4178C22.4647 30.4178 23.2702 30.502 24.0457 30.6583C25.3562 30.9168 26.5705 31.3917 27.6525 32.0409Z',
      ),
        f(n, 'fill', '#66E094'),
        f(
          s,
          'd',
          'M13.8263 0C6.19177 0 0 6.19177 0 13.8263C0 21.4608 6.19177 27.6525 13.8263 27.6525C21.4608 27.6525 27.6525 21.4608 27.6525 13.8263C27.6525 6.19177 21.4608 0 13.8263 0ZM13.8263 21.04C9.8407 21.04 6.61257 17.8118 6.61257 13.8263C6.61257 9.8407 9.8407 6.61257 13.8263 6.61257C17.8118 6.61257 21.04 9.8407 21.04 13.8263C21.04 17.8118 17.8118 21.04 13.8263 21.04Z',
        ),
        f(s, 'fill', 'white'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'class', t[0]),
        f(e, 'viewBox', '0 0 28 40'),
        f(e, 'fill', 'none');
    },
    m(r, a) {
      I(r, e, a), y(e, n), y(e, s);
    },
    p(r, [a]) {
      a & 1 && f(e, 'class', r[0]);
    },
    i: T,
    o: T,
    d(r) {
      r && p(e);
    },
  };
}
function Ai(t, e, n) {
  let { className: s = '' } = e;
  return (
    (t.$$set = (r) => {
      'className' in r && n(0, (s = r.className));
    }),
    [s]
  );
}
class hs extends ce {
  constructor(e) {
    super(), le(this, e, Ai, Ii, ie, { className: 0 });
  }
}
const In = {}.VITE_INTERNET_IDENTITY_CANISTER_ID,
  Pi = BigInt(60 * 60 * 1e3 * 1e3 * 1e3 * 24 * 14),
  Bi = 576,
  Ni = 625;
function qa(t) {
  throw new Error(
    'Could not dynamically require "' +
      t +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.',
  );
}
const Li = {},
  Mi = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Li },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Ka = Dr(Mi),
  Gt = () =>
    gs.create({
      idleOptions: { disableIdle: !0, disableDefaultIdleCallback: !0 },
    }),
  Fi = ({ width: t, height: e }) => {
    if (At(window) || At(window.top)) return;
    const {
        top: { innerWidth: n, innerHeight: s },
      } = window,
      r = s / 2 + screenY - e / 2,
      a = n / 2 + screenX - t / 2;
    return `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=${t}, height=${e}, top=${r}, left=${a}`;
  };
let Be;
const Ri = 'https://openbook.services',
  Di = 'https://etq35-qqaaa-aaaal-qcrvq-cai.icp0.io',
  Vi = () => window.location.origin === Ri,
  ji = () => {
    const { subscribe: t, set: e, update: n } = Ue({ identity: void 0 });
    return {
      subscribe: t,
      sync: async () => {
        Be = Be ?? (await Gt());
        const s = await Be.isAuthenticated();
        e({ identity: s ? Be.getIdentity() : null });
      },
      signIn: ({ domain: s }) =>
        new Promise(async (r, a) => {
          Be = Be ?? (await Gt());
          const i = We(In)
            ? `http://localhost:4943?canisterId=${In}`
            : `${s ?? 'https://identity.ic0.app'}`;
          await Be?.login({
            maxTimeToLive: Pi,
            onSuccess: () => {
              n((o) => ({ ...o, identity: Be?.getIdentity() })), r();
            },
            onError: a,
            identityProvider: i,
            ...(Vi() && { derivationOrigin: Di }),
            windowOpenerFeatures: Fi({ width: Bi, height: Ni }),
          });
        }),
      signOut: async () => {
        await (Be ?? (await Gt())).logout(),
          (Be = null),
          n((r) => ({ ...r, identity: null }));
      },
    };
  },
  on = ji();
function Hi(t) {
  let e,
    n =
      '<img src="home.png" alt="" class="hidden-image aspect-w-16 md:h-full w-full md:w-auto object-cover object-middle"/>',
    s,
    r,
    a,
    i,
    o,
    c,
    l = 'Welcome Back',
    u,
    h,
    w = 'Please connect to continue',
    $,
    v,
    x,
    C = 'Connect',
    z,
    V,
    L = 'Whitepaper',
    G,
    q,
    J = `Welcome to OpenBook, the future of business management at your fingertips!
      Experience the ease of decentralised business management, secure
      transaction management and real-time insights.`,
    Q,
    re,
    K;
  return (
    (i = new hs({ props: { className: 'w-24' } })),
    {
      c() {
        (e = P('div')),
          (e.innerHTML = n),
          (s = Y()),
          (r = P('div')),
          (a = P('div')),
          se(i.$$.fragment),
          (o = Y()),
          (c = P('p')),
          (c.textContent = l),
          (u = Y()),
          (h = P('p')),
          (h.textContent = w),
          ($ = Y()),
          (v = P('div')),
          (x = P('button')),
          (x.textContent = C),
          (z = Y()),
          (V = P('a')),
          (V.textContent = L),
          (G = Y()),
          (q = P('p')),
          (q.textContent = J),
          this.h();
      },
      l(U) {
        (e = B(U, 'DIV', { class: !0, 'data-svelte-h': !0 })),
          ge(e) !== 'svelte-14qlssr' && (e.innerHTML = n),
          (s = X(U)),
          (r = B(U, 'DIV', { class: !0 }));
        var ne = k(r);
        a = B(ne, 'DIV', { class: !0 });
        var R = k(a);
        oe(i.$$.fragment, R),
          (o = X(R)),
          (c = B(R, 'P', { 'data-svelte-h': !0 })),
          ge(c) !== 'svelte-xf904x' && (c.textContent = l),
          (u = X(R)),
          (h = B(R, 'P', { class: !0, 'data-svelte-h': !0 })),
          ge(h) !== 'svelte-8vrkqj' && (h.textContent = w),
          ($ = X(R)),
          (v = B(R, 'DIV', { class: !0 }));
        var me = k(v);
        (x = B(me, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
          ge(x) !== 'svelte-k8064b' && (x.textContent = C),
          (z = X(me)),
          (V = B(me, 'A', { href: !0, class: !0, 'data-svelte-h': !0 })),
          ge(V) !== 'svelte-vlfr5f' && (V.textContent = L),
          me.forEach(p),
          (G = X(R)),
          (q = B(R, 'P', { class: !0, 'data-svelte-h': !0 })),
          ge(q) !== 'svelte-5t7oxk' && (q.textContent = J),
          R.forEach(p),
          ne.forEach(p),
          this.h();
      },
      h() {
        f(
          e,
          'class',
          'relative md:w-auto w-full h-full overflow-hidden md:overflow-visible',
        ),
          f(h, 'class', 'hidden'),
          f(x, 'class', 'book-btn min-w-[150px]'),
          f(V, 'href', '/whitepaper'),
          f(V, 'class', 'book-btn min-w-[150px]'),
          f(v, 'class', 'flex flex-row space-x-2'),
          f(q, 'class', 'text-center'),
          f(
            a,
            'class',
            'md:flex-1 flex flex-col justify-center items-center p-4 md:p-12 my-16 md:my-2 space-y-8',
          ),
          f(
            r,
            'class',
            'md:flex-1 flex flex-col justify-center items-center p-4 md:p-12 my-16 md:my-2',
          );
      },
      m(U, ne) {
        I(U, e, ne),
          I(U, s, ne),
          I(U, r, ne),
          y(r, a),
          ee(i, a, null),
          y(a, o),
          y(a, c),
          y(a, u),
          y(a, h),
          y(a, $),
          y(a, v),
          y(v, x),
          y(v, z),
          y(v, V),
          y(a, G),
          y(a, q),
          (Q = !0),
          re || ((K = je(x, 'click', t[0])), (re = !0));
      },
      p: T,
      i(U) {
        Q || (S(i.$$.fragment, U), (Q = !0));
      },
      o(U) {
        O(i.$$.fragment, U), (Q = !1);
      },
      d(U) {
        U && (p(e), p(s), p(r)), te(i), (re = !1), K();
      },
    }
  );
}
function Ui(t) {
  function e() {
    let n = {
      domain: 'http://localhost:8080/?canisterId=qhbym-qaaaa-aaaaa-aaafq-cai',
    };
    on.signIn(n);
  }
  return [e];
}
class zi extends ce {
  constructor(e) {
    super(), le(this, e, Ui, Hi, ie, {});
  }
}
const qi = 'nn75s-ayupf-j6mj3-kluyb-wjj7y-eang2-dwzzr-cfdxk-etbw7-cgwnb-lqe',
  Ki = kt(on, ({ identity: t }) => t != null);
kt(on, ({ identity: t }) => t != null && t.getPrincipal().toString() === qi);
function Zi(t) {
  let e, n, s, r;
  const a = [Ji, Gi],
    i = [];
  function o(c, l) {
    return c[1] ? 0 : 1;
  }
  return (
    (n = o(t)),
    (s = i[n] = a[n](t)),
    {
      c() {
        (e = P('div')), s.c(), this.h();
      },
      l(c) {
        e = B(c, 'DIV', { class: !0 });
        var l = k(e);
        s.l(l), l.forEach(p), this.h();
      },
      h() {
        f(e, 'class', 'flex flex-col md:flex-row h-screen');
      },
      m(c, l) {
        I(c, e, l), i[n].m(e, null), (r = !0);
      },
      p(c, l) {
        let u = n;
        (n = o(c)),
          n !== u &&
            (ye(),
            O(i[u], 1, 1, () => {
              i[u] = null;
            }),
            we(),
            (s = i[n]),
            s || ((s = i[n] = a[n](c)), s.c()),
            S(s, 1),
            s.m(e, null));
      },
      i(c) {
        r || (S(s), (r = !0));
      },
      o(c) {
        O(s), (r = !1);
      },
      d(c) {
        c && p(e), i[n].d();
      },
    }
  );
}
function Wi(t) {
  let e, n;
  return (
    (e = new an({})),
    {
      c() {
        se(e.$$.fragment);
      },
      l(s) {
        oe(e.$$.fragment, s);
      },
      m(s, r) {
        ee(e, s, r), (n = !0);
      },
      p: T,
      i(s) {
        n || (S(e.$$.fragment, s), (n = !0));
      },
      o(s) {
        O(e.$$.fragment, s), (n = !1);
      },
      d(s) {
        te(e, s);
      },
    }
  );
}
function Gi(t) {
  let e, n;
  return (
    (e = new zi({})),
    {
      c() {
        se(e.$$.fragment);
      },
      l(s) {
        oe(e.$$.fragment, s);
      },
      m(s, r) {
        ee(e, s, r), (n = !0);
      },
      i(s) {
        n || (S(e.$$.fragment, s), (n = !0));
      },
      o(s) {
        O(e.$$.fragment, s), (n = !1);
      },
      d(s) {
        te(e, s);
      },
    }
  );
}
function Ji(t) {
  let e,
    n = 'Logged in';
  return {
    c() {
      (e = P('p')), (e.textContent = n);
    },
    l(s) {
      (e = B(s, 'P', { 'data-svelte-h': !0 })),
        ge(e) !== 'svelte-134ocxx' && (e.textContent = n);
    },
    m(s, r) {
      I(s, e, r);
    },
    i: T,
    o: T,
    d(s) {
      s && p(e);
    },
  };
}
function Qi(t) {
  let e, n, s, r;
  const a = [Wi, Zi],
    i = [];
  function o(c, l) {
    return c[0] ? 0 : 1;
  }
  return (
    (e = o(t)),
    (n = i[e] = a[e](t)),
    {
      c() {
        n.c(), (s = _e());
      },
      l(c) {
        n.l(c), (s = _e());
      },
      m(c, l) {
        i[e].m(c, l), I(c, s, l), (r = !0);
      },
      p(c, l) {
        let u = e;
        (e = o(c)),
          e === u
            ? i[e].p(c, l)
            : (ye(),
              O(i[u], 1, 1, () => {
                i[u] = null;
              }),
              we(),
              (n = i[e]),
              n ? n.p(c, l) : ((n = i[e] = a[e](c)), n.c()),
              S(n, 1),
              n.m(s.parentNode, s));
      },
      i(c) {
        r || (S(n), (r = !0));
      },
      o(c) {
        O(n), (r = !1);
      },
      d(c) {
        c && p(s), i[e].d(c);
      },
    }
  );
}
function Yi(t) {
  let e, n;
  return (
    (e = new ds({
      props: { $$slots: { default: [Qi] }, $$scope: { ctx: t } },
    })),
    {
      c() {
        se(e.$$.fragment);
      },
      l(s) {
        oe(e.$$.fragment, s);
      },
      m(s, r) {
        ee(e, s, r), (n = !0);
      },
      p(s, [r]) {
        const a = {};
        r & 7 && (a.$$scope = { dirty: r, ctx: s }), e.$set(a);
      },
      i(s) {
        n || (S(e.$$.fragment, s), (n = !0));
      },
      o(s) {
        O(e.$$.fragment, s), (n = !1);
      },
      d(s) {
        te(e, s);
      },
    }
  );
}
function Xi(t, e, n) {
  let s;
  rt(t, Ki, (a) => n(1, (s = a)));
  let r = !0;
  return (
    nt(async () => {
      try {
      } catch (a) {
        console.error('Error fetching homepage data:', a);
      } finally {
        n(0, (r = !1));
      }
    }),
    [r, s]
  );
}
let ea = class extends ce {
  constructor(e) {
    super(), le(this, e, Xi, Yi, ie, {});
  }
};
const ta = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: ea },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
function na(t) {
  let e,
    n = 'Minimum Viable Product (MVP)',
    s,
    r,
    a = `<div class="space-y-4"><p>OpenBook will conduct it&#39;s decentralisation sale as a fully integrated
      platform, encompassing both sales and accountancy functions.</p> <p>With a focus on transactional-based systems, OpenBook is engineered for
      the accurate reconciliation of multi-currency finance data, catering to
      specific jurisdictional needs. Key design components of OpenBook’s MVP
      include:</p></div> <div class="space-y-4"><h1 class="text-xl">Multi-Role</h1> <p>OpenBook is designed to support various user roles, such as finance
      professionals and sales representatives. Each role within the platform
      will have access to tailored tools and features, enhancing efficiency and
      user experience. This multi-role approach ensures that every user,
      regardless of their function, finds the platform adaptable to their
      specific needs.</p></div> <div class="space-y-4"><h1 class="text-xl">Multi-Tenant</h1> <p>Recognising the complex needs of modern business professionals, OpenBook
      will enable users to manage and navigate across multiple organisations
      effortlessly. This is especially beneficial for users managing or
      interacting with different businesses or client accounts, providing a
      seamless and integrated experience.</p></div> <div class="space-y-4"><h1 class="text-xl">Multi-Currency</h1> <p>OpenBook will support transactions in both fiat and cryptocurrencies. This
      feature is vital for businesses engaged in international operations or
      those operating in the crypto space, offering a cohesive view of financial
      activities across different monetary systems.</p> <p>These foundational features of OpenBook’s MVP are set to provide a
      versatile, flexible, and comprehensive toolset, meeting the diverse
      requirements of businesses in today&#39;s dynamic environment.</p></div>`,
    i,
    o,
    c = 'View System Designs (coming soon)';
  return {
    c() {
      (e = P('h1')),
        (e.textContent = n),
        (s = Y()),
        (r = P('div')),
        (r.innerHTML = a),
        (i = Y()),
        (o = P('button')),
        (o.textContent = c),
        this.h();
    },
    l(l) {
      (e = B(l, 'H1', { class: !0, 'data-svelte-h': !0 })),
        ge(e) !== 'svelte-172t505' && (e.textContent = n),
        (s = X(l)),
        (r = B(l, 'DIV', { class: !0, 'data-svelte-h': !0 })),
        ge(r) !== 'svelte-chx0hb' && (r.innerHTML = a),
        (i = X(l)),
        (o = B(l, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
        ge(o) !== 'svelte-qdsuyd' && (o.textContent = c),
        this.h();
    },
    h() {
      f(e, 'class', 'text-2xl mb-8 mt-4'),
        f(r, 'class', 'flex flex-col space-y-12 mt-4 mb-4'),
        (o.disabled = !0),
        f(o, 'class', 'book-btn my-8 disabled');
    },
    m(l, u) {
      I(l, e, u), I(l, s, u), I(l, r, u), I(l, i, u), I(l, o, u);
    },
    p: T,
    i: T,
    o: T,
    d(l) {
      l && (p(e), p(s), p(r), p(i), p(o));
    },
  };
}
class sa extends ce {
  constructor(e) {
    super(), le(this, e, null, na, ie, {});
  }
}
function ra(t) {
  let e,
    n = 'The OpenBook Team',
    s,
    r,
    a = `<p>OpenBook was founded by James Beadle. James&#39; experience in developing
    financial systems spans various organisations, each with unique
    transactional data and reporting needs. His background equips him with a
    practical understanding of the complexities involved in creating tailored
    financial solutions.</p>`;
  return {
    c() {
      (e = P('h1')),
        (e.textContent = n),
        (s = Y()),
        (r = P('div')),
        (r.innerHTML = a),
        this.h();
    },
    l(i) {
      (e = B(i, 'H1', { class: !0, 'data-svelte-h': !0 })),
        ge(e) !== 'svelte-yexfpg' && (e.textContent = n),
        (s = X(i)),
        (r = B(i, 'DIV', { class: !0, 'data-svelte-h': !0 })),
        ge(r) !== 'svelte-jxxvk7' && (r.innerHTML = a),
        this.h();
    },
    h() {
      f(e, 'class', 'text-2xl mb-8 mt-4'),
        f(r, 'class', 'flex flex-col space-y-12 mt-4 mb-4');
    },
    m(i, o) {
      I(i, e, o), I(i, s, o), I(i, r, o);
    },
    p: T,
    i: T,
    o: T,
    d(i) {
      i && (p(e), p(s), p(r));
    },
  };
}
class ia extends ce {
  constructor(e) {
    super(), le(this, e, null, ra, ie, {});
  }
}
function aa(t) {
  let e,
    n = 'Value Proposition',
    s,
    r,
    a = `<div class="space-y-4"><h1 class="text-xl">$BOOK Utility Token</h1> <p>OpenBook operates as a DAO (Decentralised Autonomous Organisation). The
      $BOOK token is used within the DAO for the following purposes:</p> <ul class="list-disc px-4"><li>Organisations will pay an annual subscription for the basic OpenBook
        service with $BOOK tokens.</li> <li>Organisations will be able to settle invoices and pay employees in
        $BOOK, along with any other ICRC token.</li> <li>Neuron holders will be rewarded with $BOOK maturity interest.</li> <li>Finance professionals will be able to design and build financial reports
        based on the granular chart of accounts structure an organisation sets
        up. These professionals will be rewarded in $BOOK tokens when an
        organisation uses their designed report.</li> <li>As OpenBook grows it will venture into all areas of business management,
        subscriptions to these additional advanced features will also be paid
        using $BOOK.</li></ul></div> <div class="space-y-4"><h1 class="text-xl">DAO Valuation</h1> <p>In forecasting the potential revenue for our platform, we conducted a
      comparative analysis between two established SaaS platforms: Salesforce
      and QuickBooks.</p> <p><b>Salesforce:</b> A dominant force in the CRM space. Salesforce has seen consistent
      growth over the years. In 2023, their annual revenue was $31.352 billion, up
      18.35% from 2022. To provide a broader perspective, their revenue in 2022 was
      $26.492 billion, marking a 24.66% growth from 2021, which had a revenue of
      $21.252 billion, a 24.3% increase from 2020.</p> <p><b>QuickBooks:</b> Highly popular in the accounting software market. As of
      the recent data, QuickBooks generated a total revenue of $9.6 billion, a 25%
      increase year-over-year. Their combined platform revenue, which includes QuickBooks
      Online, TurboTax Online, and Credit Karma, accounted for $6.6 billion, marking
      a 39% growth.</p> <p>Both these platforms represent a combined user base of approximately 6.6
      million. It&#39;s crucial to understand that the impressive revenue figures,
      especially from Salesforce, often stem from their enterprise licensing
      agreements. Enterprise licences differ significantly from individual or
      small business licences. They&#39;re priced higher, offer an extensive range
      of features, and often include additional services like consulting,
      training, and customisation. This model can significantly inflate the
      average revenue per user, especially for platforms like Salesforce, which
      caters to large corporations and businesses across the globe.</p> <p>Drawing insights from QuickBooks and Salesforce, we find that Salesforce&#39;s
      revenue is approximately $10,451 per user per year, while QuickBooks
      stands at about $2,667 per user. We&#39;ll use the more conservative figure
      from QuickBooks as our benchmark. To hit a valuation of $1 billion over 8
      years, with a projected revenue per user of $2,667, we would require a
      user base of 37,500. This goal entails an average onboarding of roughly
      4,688 users per annum with this target representing a mere 0.57% of the
      combined 6.6 million user base of Salesforce and QuickBooks.</p></div> <div class="space-y-4"><h1 class="text-xl">Adaptive and User-Focused Revenue Model</h1> <p>Central to OpenBook&#39;s revenue strategy is our dedication to simple,
      user-friendly subscription models. Users have the freedom to activate or
      deactivate platform features as their business needs evolve. This unique
      model allows for a customisable experience, ensuring that users only pay
      for what they need, when they need it. Crucially, even when a feature is
      deactivated, all associated data is preserved, ready to be reactivated at
      any time. This approach not only makes OpenBook adaptive to changing
      business landscapes but also ensures that it remains economically
      efficient for our users. $BOOK tokens will be used to pay for these
      services.</p> <p>In line with our commitment to directly benefit neuron holders, OpenBook
      will allocate 50% of any ICRC-1 token received by the DAO each month to
      neuron holders. Distribution to neuron holders will be proportional to
      each neuron&#39;s total $BOOK value and its remaining duration. This ensures a
      fair and equitable redistribution of revenue. Calculation for this
      distribution will be based on the status of BOOK neurons as at the end of
      each month, aligning with the DAO&#39;s transparent and community-focused
      ethos. The remaining 50% will remain in the OpenBook treasury free for the
      DAO to use as required.</p> <p>The reinvestment of revenues into the DAO and direct distribution to
      neuron holders are designed to foster a cycle of growth, user engagement,
      and shared prosperity.</p></div> <div class="space-y-4"><h1 class="text-xl">DAO Reward Structure</h1> <p>The OpenBook DAO&#39;s rewards are funded by the minting of new BOOK tokens,
      minting 2.5% of the total supply annually. The minted $BOOK is distributed
      throughout the year for the following reward categories</p> <ul class="list-disc px-4"><li>Professional Service Rewards (75%)</li> <li>Governance Rewards (25%)</li></ul> <h1 class="text-xl">Professional Service Rewards</h1> <p>The DAO has the ability to propose and vote on new features or
      adjustments, leveraging the expertise of finance professionals. This
      integration of domain knowledge ensures that the feature development
      process is strategic and thoughtful, providing businesses with a clear
      understanding of the services available. The inclusion of these
      professionals in the DAO&#39;s decision-making adds a layer of practical
      insight and relevance to the features and adjustments considered, ensuring
      they align with real-world financial needs and trends.</p> <p>Professional Service Rewards further reinforce this approach. Initially,
      these rewards will be used for writing jurisdiction-specific reports by
      local finance professionals, who will build tailored reports suited to
      their local jurisdictional finance rules and formats. This reward pool
      will later expand to include other experts in fields relevant to future
      OpenBook features, continuing to enrich the platform with practical and
      expert insights.</p> <h1 class="text-xl">Governance Rewards</h1> <p>The DAO will reward users for participation in governance with $BOOK
      tokens. Failed proposals will cost 10 $BOOK tokens to a neuron holder
      which will be deposited into the DAO’s treasury.</p></div> <div class="space-y-4"><p>We will decentralise OpenBook through the following token allocation at
      genesis:</p> <ul class="list-disc px-4"><li>James Beadle + Team - 12%</li> <li>Funded NFT Holders - 12%</li> <li>SNS Decentralisation Sale - 25%</li> <li>DAO Treasury - 51%</li></ul></div>`;
  return {
    c() {
      (e = P('h1')),
        (e.textContent = n),
        (s = Y()),
        (r = P('div')),
        (r.innerHTML = a),
        this.h();
    },
    l(i) {
      (e = B(i, 'H1', { class: !0, 'data-svelte-h': !0 })),
        ge(e) !== 'svelte-18v727s' && (e.textContent = n),
        (s = X(i)),
        (r = B(i, 'DIV', { class: !0, 'data-svelte-h': !0 })),
        ge(r) !== 'svelte-1q1zv5n' && (r.innerHTML = a),
        this.h();
    },
    h() {
      f(e, 'class', 'text-2xl mb-8 mt-4'),
        f(r, 'class', 'flex flex-col space-y-12 mt-4 mb-4');
    },
    m(i, o) {
      I(i, e, o), I(i, s, o), I(i, r, o);
    },
    p: T,
    i: T,
    o: T,
    d(i) {
      i && (p(e), p(s), p(r));
    },
  };
}
class oa extends ce {
  constructor(e) {
    super(), le(this, e, null, aa, ie, {});
  }
}
function la(t) {
  let e,
    n = 'Vision',
    s,
    r,
    a = `<p>Businesses are increasingly turning to Software as a Service (SaaS)
    platforms to manager their internal processes. Platforms like Salesforce &amp;
    Quickbooks use this common software distribution model in which applications
    are hosted by a third-party provider and made available to customers over
    the internet. This model allows businesses to access software applications
    without the need for internal hardware or technical expertise, paying on a
    subscription basis.</p> <p>The Internet Computer blockchain has provided the world with a foundation
    for genuine decentralisation, a significant leap for the technological
    underpinnings of SaaS platforms. This evolution is especially transformative
    for businesses worldwide, which are reliant on SaaS for critical data
    processing. The Internet Computer blockchain has provided the world with a
    foundation for genuine decentralisation. This technological leap is
    particularly transformative for businesses worldwide, which are increasingly
    reliant on Software as a Service (SaaS) platforms for critical data
    processing.</p> <p>Businesses today face the task of managing multiple subscriptions across a
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
    specifically to their unique needs and objectives.</p>`;
  return {
    c() {
      (e = P('h1')),
        (e.textContent = n),
        (s = Y()),
        (r = P('div')),
        (r.innerHTML = a),
        this.h();
    },
    l(i) {
      (e = B(i, 'H1', { class: !0, 'data-svelte-h': !0 })),
        ge(e) !== 'svelte-i9bpij' && (e.textContent = n),
        (s = X(i)),
        (r = B(i, 'DIV', { class: !0, 'data-svelte-h': !0 })),
        ge(r) !== 'svelte-1sok86p' && (r.innerHTML = a),
        this.h();
    },
    h() {
      f(e, 'class', 'text-2xl mb-8 mt-4'),
        f(r, 'class', 'flex flex-col space-y-8 mt-4 mb-4 mb-4');
    },
    m(i, o) {
      I(i, e, o), I(i, s, o), I(i, r, o);
    },
    p: T,
    i: T,
    o: T,
    d(i) {
      i && (p(e), p(s), p(r));
    },
  };
}
class ca extends ce {
  constructor(e) {
    super(), le(this, e, null, la, ie, {});
  }
}
function ua(t) {
  let e, n, s, r, a, i, o;
  return {
    c() {
      (e = D('svg')),
        (n = D('g')),
        (s = D('path')),
        (r = D('path')),
        (a = D('defs')),
        (i = D('clipPath')),
        (o = D('rect')),
        this.h();
    },
    l(c) {
      e = H(c, 'svg', { xmlns: !0, class: !0, viewBox: !0, fill: !0 });
      var l = k(e);
      n = H(l, 'g', { 'clip-path': !0 });
      var u = k(n);
      (s = H(u, 'path', { d: !0, fill: !0 })),
        k(s).forEach(p),
        (r = H(u, 'path', { d: !0, fill: !0 })),
        k(r).forEach(p),
        u.forEach(p),
        (a = H(l, 'defs', {}));
      var h = k(a);
      i = H(h, 'clipPath', { id: !0 });
      var w = k(i);
      (o = H(w, 'rect', { width: !0, height: !0, fill: !0 })),
        k(o).forEach(p),
        w.forEach(p),
        h.forEach(p),
        l.forEach(p),
        this.h();
    },
    h() {
      f(
        s,
        'd',
        'M23.055 7.33252C22.1423 5.1788 20.6205 3.34753 18.7057 2.05266C16.7914 0.757781 14.4794 -0.000328019 12 1.0647e-07C10.3475 -9.36435e-05 8.76816 0.336563 7.33261 0.944906C5.17894 1.85766 3.34763 3.37936 2.0527 5.2942C0.757828 7.20844 -0.000328019 9.5205 1.06464e-07 12C-9.36435e-05 13.6526 0.336609 15.2319 0.944953 16.6675C1.85766 18.8212 3.3795 20.6525 5.2943 21.9473C7.20858 23.2422 9.52064 24.0003 12 24C13.6525 24.0001 15.2318 23.6634 16.6674 23.0551C18.8211 22.1424 20.6524 20.6206 21.9473 18.7058C23.2422 16.7916 24.0003 14.4794 24 12C24.0001 10.3474 23.6634 8.76806 23.055 7.33252ZM21.5819 16.0434C20.792 17.9081 19.4704 19.4992 17.8095 20.622C16.1482 21.7447 14.1524 22.3997 12 22.4001C10.5648 22.4 9.20025 22.1086 7.95684 21.5819C6.09211 20.792 4.50103 19.4705 3.37823 17.8096C2.25534 16.1482 1.60031 14.1524 1.59998 12C1.60008 10.5647 1.8915 9.20011 2.41814 7.9567C3.20803 6.09197 4.52962 4.50089 6.19045 3.37814C7.85184 2.2553 9.84769 1.60031 12 1.59998C13.4353 1.60008 14.7998 1.89145 16.0432 2.41814C17.9079 3.20798 19.499 4.52958 20.6218 6.19041C21.7446 7.8518 22.3996 9.84759 22.4 12C22.3999 13.4354 22.1085 14.7999 21.5819 16.0434Z',
      ),
        f(s, 'fill', t[1]),
        f(
          r,
          'd',
          'M20.302 10.4768C20.004 9.77372 19.5086 9.1778 18.8845 8.75569C18.5725 8.54466 18.2278 8.37713 17.8597 8.26238C17.4916 8.14763 17.1 8.08589 16.6966 8.08594C16.1171 8.08542 15.5699 8.20842 15.0705 8.41331C14.6328 8.59252 14.2299 8.83238 13.8531 9.10697C13.1941 9.58828 12.6109 10.1754 12.054 10.776C12.0359 10.7955 12.0182 10.8152 12.0001 10.8348C11.9962 10.8306 11.9923 10.8263 11.9884 10.822C11.6762 10.4836 11.3553 10.1493 11.0183 9.83452C10.5125 9.36295 9.97 8.93297 9.35631 8.61206C9.04965 8.45194 8.72495 8.32003 8.38173 8.22839C8.0387 8.1367 7.67734 8.08589 7.30328 8.08599C6.76534 8.08589 6.24878 8.19581 5.78026 8.39447C5.07719 8.69255 4.48126 9.18792 4.05915 9.81197C3.84812 10.124 3.68059 10.4687 3.56584 10.8368C3.45109 11.2049 3.38936 11.5965 3.3894 11.9999C3.38931 12.5378 3.49923 13.0544 3.69789 13.5229C3.99597 14.2259 4.49139 14.8218 5.11539 15.2439C5.42744 15.455 5.77215 15.6225 6.14026 15.7373C6.50833 15.852 6.89992 15.9137 7.30333 15.9137C7.88279 15.9142 8.43001 15.7912 8.92942 15.5863C9.36714 15.4071 9.77008 15.1673 10.1468 14.8927C10.8058 14.4113 11.389 13.8242 11.946 13.2237C11.9641 13.2041 11.9818 13.1844 11.9998 13.1648C12.0037 13.1691 12.0076 13.1734 12.0115 13.1777C12.3237 13.5161 12.6446 13.8504 12.9817 14.1652C13.4875 14.6367 14.0299 15.0667 14.6436 15.3876C14.9503 15.5476 15.275 15.6796 15.6182 15.7713C15.9612 15.863 16.3226 15.9138 16.6967 15.9137C17.2346 15.9138 17.7512 15.8038 18.2197 15.6052C18.9227 15.3071 19.5187 14.8118 19.9408 14.1877C20.1518 13.8757 20.3193 13.5309 20.4341 13.1628C20.5488 12.7948 20.6106 12.4032 20.6105 11.9998C20.6106 11.4619 20.5007 10.9453 20.302 10.4768ZM10.8379 12.1162C10.54 12.4391 10.2447 12.7458 9.95003 13.0208C9.50819 13.4339 9.06798 13.7729 8.63204 13.9997C8.41389 14.1135 8.19704 14.2002 7.97795 14.2587C7.75867 14.3172 7.53704 14.348 7.30337 14.3481C6.97801 14.348 6.67155 14.2823 6.39109 14.1637C5.97072 13.9858 5.60992 13.6864 5.35614 13.3108C5.2292 13.1231 5.12903 12.9168 5.06054 12.697C4.99206 12.4772 4.95503 12.2439 4.95503 11.9999C4.95512 11.6745 5.02079 11.368 5.13944 11.0876C5.31733 10.6673 5.61676 10.3065 5.99237 10.0527C6.18006 9.92574 6.3864 9.82556 6.60625 9.75708C6.82609 9.6886 7.05934 9.65156 7.30342 9.65156C7.66473 9.65203 7.99905 9.72478 8.33673 9.86236C8.63144 9.98278 8.92698 10.155 9.22459 10.372C9.74565 10.7511 10.2687 11.268 10.7974 11.8397C10.8461 11.8923 10.8951 11.9465 10.944 12C10.9087 12.0385 10.8732 12.078 10.8379 12.1162ZM18.8606 12.9121C18.6827 13.3325 18.3833 13.6933 18.0077 13.9471C17.82 14.074 17.6137 14.1742 17.3938 14.2427C17.174 14.3112 16.9407 14.3482 16.6967 14.3482C16.3353 14.3477 16.001 14.275 15.6633 14.1374C15.3686 14.017 15.0731 13.8448 14.7755 13.6277C14.2544 13.2487 13.7313 12.7318 13.2027 12.16C13.154 12.1074 13.105 12.0532 13.0561 11.9998C13.0915 11.9611 13.1269 11.9217 13.1622 11.8835C13.4601 11.5606 13.7554 11.2538 14.05 10.9789C14.4919 10.5658 14.9321 10.2268 15.368 9.99994C15.5862 9.88613 15.803 9.79945 16.0221 9.74095C16.2414 9.6825 16.463 9.65166 16.6967 9.65156C17.0221 9.65166 17.3285 9.71733 17.609 9.83597C18.0294 10.0139 18.3902 10.3133 18.6439 10.6889C18.7709 10.8766 18.871 11.0829 18.9395 11.3027C19.008 11.5225 19.045 11.7558 19.045 11.9999C19.045 12.3252 18.9793 12.6316 18.8606 12.9121Z',
        ),
        f(r, 'fill', t[1]),
        f(n, 'clip-path', 'url(#clip0_143_3542)'),
        f(o, 'width', '24'),
        f(o, 'height', '24'),
        f(o, 'fill', t[1]),
        f(i, 'id', 'clip0_143_3542'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'class', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'fill', 'none');
    },
    m(c, l) {
      I(c, e, l), y(e, n), y(n, s), y(n, r), y(e, a), y(a, i), y(i, o);
    },
    p(c, [l]) {
      l & 2 && f(s, 'fill', c[1]),
        l & 2 && f(r, 'fill', c[1]),
        l & 2 && f(o, 'fill', c[1]),
        l & 1 && f(e, 'class', c[0]);
    },
    i: T,
    o: T,
    d(c) {
      c && p(e);
    },
  };
}
function fa(t, e, n) {
  let { className: s = '' } = e,
    { fill: r = '#FFFFFF' } = e;
  return (
    (t.$$set = (a) => {
      'className' in a && n(0, (s = a.className)),
        'fill' in a && n(1, (r = a.fill));
    }),
    [s, r]
  );
}
class da extends ce {
  constructor(e) {
    super(), le(this, e, fa, ua, ie, { className: 0, fill: 1 });
  }
}
function ha(t) {
  let e, n;
  return {
    c() {
      (e = D('svg')), (n = D('path')), this.h();
    },
    l(s) {
      e = H(s, 'svg', { xmlns: !0, class: !0, viewBox: !0, fill: !0 });
      var r = k(e);
      (n = H(r, 'path', { d: !0, fill: !0 })),
        k(n).forEach(p),
        r.forEach(p),
        this.h();
    },
    h() {
      f(
        n,
        'd',
        'M21 2H9C8.73478 2 8.48043 2.10536 8.29289 2.29289C8.10536 2.48043 8 2.73478 8 3V7H6C5.73478 7 5.48043 7.10536 5.29289 7.29289C5.10536 7.48043 5 7.73478 5 8V12H3C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H11C11.2652 22 11.5196 21.8946 11.7071 21.7071C11.8946 21.5196 12 21.2652 12 21V19H16C16.2652 19 16.5196 18.8946 16.7071 18.7071C16.8946 18.5196 17 18.2652 17 18V16H21C21.2652 16 21.5196 15.8946 21.7071 15.7071C21.8946 15.5196 22 15.2652 22 15V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2ZM10 20H4V14H10V20ZM15 17H12V13C12 12.7348 11.8946 12.4804 11.7071 12.2929C11.5196 12.1054 11.2652 12 11 12H7V9H15V17ZM20 14H17V8C17 7.73478 16.8946 7.48043 16.7071 7.29289C16.5196 7.10536 16.2652 7 16 7H10V4H20V14Z',
      ),
        f(n, 'fill', t[1]),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'class', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'fill', 'none');
    },
    m(s, r) {
      I(s, e, r), y(e, n);
    },
    p(s, [r]) {
      r & 2 && f(n, 'fill', s[1]), r & 1 && f(e, 'class', s[0]);
    },
    i: T,
    o: T,
    d(s) {
      s && p(e);
    },
  };
}
function pa(t, e, n) {
  let { className: s = '' } = e,
    { fill: r = '#FFFFFF' } = e;
  return (
    (t.$$set = (a) => {
      'className' in a && n(0, (s = a.className)),
        'fill' in a && n(1, (r = a.fill));
    }),
    [s, r]
  );
}
class _a extends ce {
  constructor(e) {
    super(), le(this, e, pa, ha, ie, { className: 0, fill: 1 });
  }
}
function ma(t) {
  let e, n, s, r, a, i;
  return {
    c() {
      (e = D('svg')),
        (n = D('g')),
        (s = D('path')),
        (r = D('defs')),
        (a = D('clipPath')),
        (i = D('rect')),
        this.h();
    },
    l(o) {
      e = H(o, 'svg', { xmlns: !0, class: !0, viewBox: !0, fill: !0 });
      var c = k(e);
      n = H(c, 'g', { 'clip-path': !0 });
      var l = k(n);
      (s = H(l, 'path', { d: !0, fill: !0 })),
        k(s).forEach(p),
        l.forEach(p),
        (r = H(c, 'defs', {}));
      var u = k(r);
      a = H(u, 'clipPath', { id: !0 });
      var h = k(a);
      (i = H(h, 'rect', { width: !0, height: !0, fill: !0 })),
        k(i).forEach(p),
        h.forEach(p),
        u.forEach(p),
        c.forEach(p),
        this.h();
    },
    h() {
      f(
        s,
        'd',
        'M10.644 17.08C13.51 16.418 15.183 15.839 13.89 13.398C9.958 5.971 12.848 2 17.001 2C21.236 2 24.055 6.124 20.111 13.398C18.779 15.853 20.548 16.432 23.353 17.08C25.836 17.654 26 18.867 26 20.969V22H8C8 19.255 7.78 17.742 10.644 17.08ZM-2 22H5.809C5.774 13.823 9.245 16.687 9.245 10.873C9.245 8.362 7.606 7 5.497 7C2.382 7 0.215 9.979 3.164 15.549C4.133 17.379 2.133 17.814 -0.017 18.31C-1.879 18.74 -2 19.65 -2 21.227V22Z',
      ),
        f(s, 'fill', t[1]),
        f(n, 'clip-path', 'url(#clip0_15_112)'),
        f(i, 'width', '24'),
        f(i, 'height', '24'),
        f(i, 'fill', t[1]),
        f(a, 'id', 'clip0_15_112'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'class', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'fill', 'none');
    },
    m(o, c) {
      I(o, e, c), y(e, n), y(n, s), y(e, r), y(r, a), y(a, i);
    },
    p(o, [c]) {
      c & 2 && f(s, 'fill', o[1]),
        c & 2 && f(i, 'fill', o[1]),
        c & 1 && f(e, 'class', o[0]);
    },
    i: T,
    o: T,
    d(o) {
      o && p(e);
    },
  };
}
function ga(t, e, n) {
  let { className: s = '' } = e,
    { fill: r = '#FFFFFF' } = e;
  return (
    (t.$$set = (a) => {
      'className' in a && n(0, (s = a.className)),
        'fill' in a && n(1, (r = a.fill));
    }),
    [s, r]
  );
}
class va extends ce {
  constructor(e) {
    super(), le(this, e, ga, ma, ie, { className: 0, fill: 1 });
  }
}
function ya(t) {
  let e, n;
  return {
    c() {
      (e = D('svg')), (n = D('path')), this.h();
    },
    l(s) {
      e = H(s, 'svg', { xmlns: !0, class: !0, viewBox: !0, fill: !0 });
      var r = k(e);
      (n = H(r, 'path', { d: !0, fill: !0 })),
        k(n).forEach(p),
        r.forEach(p),
        this.h();
    },
    h() {
      f(
        n,
        'd',
        'M9.50001 10.5001H12C12.2652 10.5001 12.5196 10.3947 12.7071 10.2072C12.8947 10.0196 13 9.76528 13 9.50007C13 9.23485 12.8947 8.9805 12.7071 8.79296C12.5196 8.60543 12.2652 8.50007 12 8.50007H11V8.00007C11 7.73485 10.8947 7.4805 10.7071 7.29296C10.5196 7.10543 10.2652 7.00007 10 7.00007C9.73479 7.00007 9.48044 7.10543 9.2929 7.29296C9.10537 7.4805 9.00001 7.73485 9.00001 8.00007V8.55007C8.39243 8.67344 7.85237 9.01817 7.48466 9.51733C7.11696 10.0165 6.94785 10.6345 7.01015 11.2513C7.07246 11.8682 7.36174 12.4398 7.82184 12.8554C8.28194 13.2709 8.88003 13.5007 9.50001 13.5001H10.5C10.6326 13.5001 10.7598 13.5527 10.8536 13.6465C10.9473 13.7403 11 13.8675 11 14.0001C11 14.1327 10.9473 14.2599 10.8536 14.3536C10.7598 14.4474 10.6326 14.5001 10.5 14.5001H8.00001C7.73479 14.5001 7.48044 14.6054 7.2929 14.793C7.10537 14.9805 7.00001 15.2349 7.00001 15.5001C7.00001 15.7653 7.10537 16.0196 7.2929 16.2072C7.48044 16.3947 7.73479 16.5001 8.00001 16.5001H9.00001V17.0001C9.00001 17.2653 9.10537 17.5196 9.2929 17.7072C9.48044 17.8947 9.73479 18.0001 10 18.0001C10.2652 18.0001 10.5196 17.8947 10.7071 17.7072C10.8947 17.5196 11 17.2653 11 17.0001V16.4501C11.6076 16.3267 12.1476 15.982 12.5154 15.4828C12.8831 14.9836 13.0522 14.3657 12.9899 13.7488C12.9276 13.132 12.6383 12.5603 12.1782 12.1448C11.7181 11.7292 11.12 11.4994 10.5 11.5001H9.50001C9.3674 11.5001 9.24022 11.4474 9.14645 11.3536C9.05269 11.2599 9.00001 11.1327 9.00001 11.0001C9.00001 10.8675 9.05269 10.7403 9.14645 10.6465C9.24022 10.5527 9.3674 10.5001 9.50001 10.5001ZM21 12.0001H18V3.00007C18.0007 2.82386 17.9548 2.65059 17.867 2.49781C17.7792 2.34504 17.6526 2.21817 17.5 2.13007C17.348 2.0423 17.1755 1.99609 17 1.99609C16.8245 1.99609 16.652 2.0423 16.5 2.13007L13.5 3.85007L10.5 2.13007C10.348 2.0423 10.1755 1.99609 10 1.99609C9.82447 1.99609 9.65203 2.0423 9.50001 2.13007L6.50001 3.85007L3.50001 2.13007C3.34799 2.0423 3.17554 1.99609 3.00001 1.99609C2.82447 1.99609 2.65203 2.0423 2.50001 2.13007C2.3474 2.21817 2.22079 2.34504 2.13299 2.49781C2.04518 2.65059 1.99931 2.82386 2.00001 3.00007V19.0001C2.00001 19.7957 2.31608 20.5588 2.87869 21.1214C3.4413 21.684 4.20436 22.0001 5.00001 22.0001H19C19.7957 22.0001 20.5587 21.684 21.1213 21.1214C21.6839 20.5588 22 19.7957 22 19.0001V13.0001C22 12.7349 21.8947 12.4805 21.7071 12.293C21.5196 12.1054 21.2652 12.0001 21 12.0001ZM5.00001 20.0001C4.73479 20.0001 4.48044 19.8947 4.2929 19.7072C4.10536 19.5196 4.00001 19.2653 4.00001 19.0001V4.73007L6.00001 5.87007C6.15435 5.95068 6.32589 5.99278 6.50001 5.99278C6.67413 5.99278 6.84567 5.95068 7.00001 5.87007L10 4.15007L13 5.87007C13.1543 5.95068 13.3259 5.99278 13.5 5.99278C13.6741 5.99278 13.8457 5.95068 14 5.87007L16 4.73007V19.0001C16.0027 19.3412 16.0636 19.6794 16.18 20.0001H5.00001ZM20 19.0001C20 19.2653 19.8947 19.5196 19.7071 19.7072C19.5196 19.8947 19.2652 20.0001 19 20.0001C18.7348 20.0001 18.4804 19.8947 18.2929 19.7072C18.1054 19.5196 18 19.2653 18 19.0001V14.0001H20V19.0001Z',
      ),
        f(n, 'fill', t[1]),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'class', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'fill', 'none');
    },
    m(s, r) {
      I(s, e, r), y(e, n);
    },
    p(s, [r]) {
      r & 2 && f(n, 'fill', s[1]), r & 1 && f(e, 'class', s[0]);
    },
    i: T,
    o: T,
    d(s) {
      s && p(e);
    },
  };
}
function wa(t, e, n) {
  let { className: s = '' } = e,
    { fill: r = '#FFFFFF' } = e;
  return (
    (t.$$set = (a) => {
      'className' in a && n(0, (s = a.className)),
        'fill' in a && n(1, (r = a.fill));
    }),
    [s, r]
  );
}
class ba extends ce {
  constructor(e) {
    super(), le(this, e, wa, ya, ie, { className: 0, fill: 1 });
  }
}
function Ca(t) {
  let e, n, s, r, a, i;
  return {
    c() {
      (e = D('svg')),
        (n = D('g')),
        (s = D('path')),
        (r = D('defs')),
        (a = D('clipPath')),
        (i = D('rect')),
        this.h();
    },
    l(o) {
      e = H(o, 'svg', { xmlns: !0, class: !0, viewBox: !0, fill: !0 });
      var c = k(e);
      n = H(c, 'g', { 'clip-path': !0 });
      var l = k(n);
      (s = H(l, 'path', { d: !0, fill: !0 })),
        k(s).forEach(p),
        l.forEach(p),
        (r = H(c, 'defs', {}));
      var u = k(r);
      a = H(u, 'clipPath', { id: !0 });
      var h = k(a);
      (i = H(h, 'rect', { width: !0, height: !0, fill: !0 })),
        k(i).forEach(p),
        h.forEach(p),
        u.forEach(p),
        c.forEach(p),
        this.h();
    },
    h() {
      f(
        s,
        'd',
        'M5 9C6.654 9 8 10.346 8 12C8 13.654 6.654 15 5 15C3.346 15 2 13.654 2 12C2 10.346 3.346 9 5 9ZM5 7C2.238 7 0 9.239 0 12C0 14.761 2.238 17 5 17C7.762 17 10 14.761 10 12C10 9.239 7.762 7 5 7ZM20 16C18.835 16 17.796 16.506 17.065 17.301L11.577 14.374C11.347 15.01 11.028 15.603 10.633 16.138L16.121 19.065C16.049 19.366 16 19.676 16 20C16 22.209 17.791 24 20 24C22.209 24 24 22.209 24 20C24 17.791 22.209 16 20 16ZM20 22C18.897 22 18 21.103 18 20C18 18.897 18.897 18 20 18C21.103 18 22 18.897 22 20C22 21.103 21.103 22 20 22ZM20 0C17.791 0 16 1.791 16 4C16 4.324 16.049 4.634 16.121 4.935L10.633 7.862C11.028 8.398 11.346 8.99 11.577 9.626L17.065 6.699C17.796 7.494 18.835 8 20 8C22.209 8 24 6.209 24 4C24 1.791 22.209 0 20 0ZM20 6C18.897 6 18 5.103 18 4C18 2.897 18.897 2 20 2C21.103 2 22 2.897 22 4C22 5.103 21.103 6 20 6Z',
      ),
        f(s, 'fill', t[1]),
        f(n, 'clip-path', 'url(#clip0_15_154)'),
        f(i, 'width', '24'),
        f(i, 'height', '24'),
        f(i, 'fill', t[1]),
        f(a, 'id', 'clip0_15_154'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'class', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'fill', 'none');
    },
    m(o, c) {
      I(o, e, c), y(e, n), y(n, s), y(e, r), y(r, a), y(a, i);
    },
    p(o, [c]) {
      c & 2 && f(s, 'fill', o[1]),
        c & 2 && f(i, 'fill', o[1]),
        c & 1 && f(e, 'class', o[0]);
    },
    i: T,
    o: T,
    d(o) {
      o && p(e);
    },
  };
}
function $a(t, e, n) {
  let { className: s = '' } = e,
    { fill: r = '#FFFFFF' } = e;
  return (
    (t.$$set = (a) => {
      'className' in a && n(0, (s = a.className)),
        'fill' in a && n(1, (r = a.fill));
    }),
    [s, r]
  );
}
class ka extends ce {
  constructor(e) {
    super(), le(this, e, $a, Ca, ie, { className: 0, fill: 1 });
  }
}
function Ea(t) {
  let e,
    n = 'Roadmap: Building Towards AI-Enhanced Business Operations',
    s,
    r,
    a = `<div class="space-y-4"><h1 class="text-xl">Ongoing: Security and Transparency Balance</h1> <ul class="list-disc px-4"><li>Maintaining the delicate balance between data security and transparency.</li> <li>Ensuring private data remains protected while providing necessary
        insights to stakeholders.</li></ul></div> <div class="space-y-4"><h1 class="text-xl">Initial Phase: Establishing Core On-Chain Services</h1> <p>2024: Launch of OpenBook MVP</p> <ul class="list-disc px-4"><li>Introduction of fundamental business management services for sales and
        finance.</li> <li>Seamless integration of these core services to establish the primary
        data lake.</li></ul> <p>Late 2024: Expansion of Core Features</p> <ul class="list-disc px-4"><li>Adding Joint Venture Accounting, Timesheet Management, Project
        Management, and Customer Service.</li> <li>Each new feature designed to enrich the data lake with diverse business
        operation insights.</li></ul></div> <div class="space-y-4"><h1 class="text-xl">Intermediate Phase: Broadening the Scope</h1> <p>2025: Enriching the Platform</p> <ul class="list-disc px-4"><li>Integration of Inventory &amp; Supply Chain Management, Risk Management,
        Recruitment, and Training.</li> <li>Focus on Advanced Reporting features for more in-depth data analysis
        capabilities.</li> <li>Implementation of global tax reports as templates, evolving with input
        from finance professionals.</li></ul></div> <div class="space-y-4"><h1 class="text-xl">Advanced Phase: Leveraging AI for Enhanced Business Insights</h1> <p>Post-2025: Introduction of AI Tools</p> <ul class="list-disc px-4"><li>Utilizing the comprehensive data lake for AI-driven insights.</li> <li>Democratically decided AI tool development through DAO voting, based on
        accumulated data and expert advice.</li> <li>AI tools aimed at improving financial forecasting, operational
        efficiency, and strategic decision-making.</li></ul> <p>2026 and Beyond: Integrating Recruitment and Career Management</p> <ul class="list-disc px-4"><li>Launch of Business Profile and Recruitment Features</li> <li>Introduction of a comprehensive business profile platform, aiming to
        rival established networks like LinkedIn.</li> <li>Seamless integration of recruitment, career achievements, and
        professional networking into OpenBook.</li> <li>Utilisation of the data lake to provide AI-driven insights for career
        development and talent acquisition.</li></ul></div> <div class="space-y-4"><h1 class="text-xl">Long-Term Vision: A Comprehensive Business Ecosystem</h1> <p>OpenBook will evolve focused on transforming the landscape of business
      operations, from foundational business services, advanced AI-driven tools
      and professional networking.</p></div>`;
  return {
    c() {
      (e = P('h1')),
        (e.textContent = n),
        (s = Y()),
        (r = P('div')),
        (r.innerHTML = a),
        this.h();
    },
    l(i) {
      (e = B(i, 'H1', { class: !0, 'data-svelte-h': !0 })),
        ge(e) !== 'svelte-1isdr5e' && (e.textContent = n),
        (s = X(i)),
        (r = B(i, 'DIV', { class: !0, 'data-svelte-h': !0 })),
        ge(r) !== 'svelte-1361nsh' && (r.innerHTML = a),
        this.h();
    },
    h() {
      f(e, 'class', 'text-2xl mb-8 mt-4'),
        f(r, 'class', 'flex flex-col space-y-12 mt-4 mb-4');
    },
    m(i, o) {
      I(i, e, o), I(i, s, o), I(i, r, o);
    },
    p: T,
    i: T,
    o: T,
    d(i) {
      i && (p(e), p(s), p(r));
    },
  };
}
class xa extends ce {
  constructor(e) {
    super(), le(this, e, null, Ea, ie, {});
  }
}
function An(t) {
  let e, n;
  return (
    (e = new ca({})),
    {
      c() {
        se(e.$$.fragment);
      },
      l(s) {
        oe(e.$$.fragment, s);
      },
      m(s, r) {
        ee(e, s, r), (n = !0);
      },
      i(s) {
        n || (S(e.$$.fragment, s), (n = !0));
      },
      o(s) {
        O(e.$$.fragment, s), (n = !1);
      },
      d(s) {
        te(e, s);
      },
    }
  );
}
function Pn(t) {
  let e, n;
  return (
    (e = new xa({})),
    {
      c() {
        se(e.$$.fragment);
      },
      l(s) {
        oe(e.$$.fragment, s);
      },
      m(s, r) {
        ee(e, s, r), (n = !0);
      },
      i(s) {
        n || (S(e.$$.fragment, s), (n = !0));
      },
      o(s) {
        O(e.$$.fragment, s), (n = !1);
      },
      d(s) {
        te(e, s);
      },
    }
  );
}
function Bn(t) {
  let e, n;
  return (
    (e = new oa({})),
    {
      c() {
        se(e.$$.fragment);
      },
      l(s) {
        oe(e.$$.fragment, s);
      },
      m(s, r) {
        ee(e, s, r), (n = !0);
      },
      i(s) {
        n || (S(e.$$.fragment, s), (n = !0));
      },
      o(s) {
        O(e.$$.fragment, s), (n = !1);
      },
      d(s) {
        te(e, s);
      },
    }
  );
}
function Nn(t) {
  let e, n;
  return (
    (e = new sa({})),
    {
      c() {
        se(e.$$.fragment);
      },
      l(s) {
        oe(e.$$.fragment, s);
      },
      m(s, r) {
        ee(e, s, r), (n = !0);
      },
      i(s) {
        n || (S(e.$$.fragment, s), (n = !0));
      },
      o(s) {
        O(e.$$.fragment, s), (n = !1);
      },
      d(s) {
        te(e, s);
      },
    }
  );
}
function Ln(t) {
  let e, n;
  return (
    (e = new ia({})),
    {
      c() {
        se(e.$$.fragment);
      },
      l(s) {
        oe(e.$$.fragment, s);
      },
      m(s, r) {
        ee(e, s, r), (n = !0);
      },
      i(s) {
        n || (S(e.$$.fragment, s), (n = !0));
      },
      o(s) {
        O(e.$$.fragment, s), (n = !1);
      },
      d(s) {
        te(e, s);
      },
    }
  );
}
function Sa(t) {
  let e,
    n,
    s,
    r,
    a,
    i,
    o,
    c,
    l,
    u,
    h,
    w,
    $,
    v,
    x,
    C,
    z,
    V,
    L,
    G,
    q,
    J,
    Q = '<h1>OpenBook Whitepaper</h1>',
    re,
    K,
    U,
    ne,
    R,
    me,
    Ee,
    ke,
    be,
    Qe,
    Ye,
    ze,
    Xe,
    xe,
    qe,
    Ae,
    Re,
    Oe,
    Ke,
    _t;
  (r = new hs({ props: { className: 'w-6' } })),
    (o = new da({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 0 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    (u = new ba({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 1 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    ($ = new ka({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 2 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    (C = new _a({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 3 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    (L = new va({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 4 ? '#FFFFFF' : '#8C8C8C',
      },
    }));
  let pe = t[0] == 0 && An(),
    fe = t[0] == 1 && Pn(),
    d = t[0] == 2 && Bn(),
    _ = t[0] == 3 && Nn(),
    g = t[0] == 4 && Ln();
  return {
    c() {
      (e = P('div')),
        (n = P('nav')),
        (s = P('a')),
        se(r.$$.fragment),
        (a = Y()),
        (i = P('button')),
        se(o.$$.fragment),
        (c = Y()),
        (l = P('button')),
        se(u.$$.fragment),
        (h = Y()),
        (w = P('button')),
        se($.$$.fragment),
        (v = Y()),
        (x = P('button')),
        se(C.$$.fragment),
        (z = Y()),
        (V = P('button')),
        se(L.$$.fragment),
        (G = Y()),
        (q = P('main')),
        (J = P('div')),
        (J.innerHTML = Q),
        (re = Y()),
        (K = P('div')),
        pe && pe.c(),
        (U = Y()),
        fe && fe.c(),
        (ne = Y()),
        d && d.c(),
        (R = Y()),
        _ && _.c(),
        (me = Y()),
        g && g.c(),
        (Ee = Y()),
        (ke = P('div')),
        (be = P('button')),
        (Qe = Ie('< Prior Section')),
        (Xe = Y()),
        (xe = P('button')),
        (qe = Ie('Next Section >')),
        this.h();
    },
    l(m) {
      e = B(m, 'DIV', { class: !0 });
      var b = k(e);
      n = B(b, 'NAV', { class: !0 });
      var E = k(n);
      s = B(E, 'A', { href: !0 });
      var M = k(s);
      oe(r.$$.fragment, M), M.forEach(p), (a = X(E)), (i = B(E, 'BUTTON', {}));
      var F = k(i);
      oe(o.$$.fragment, F), F.forEach(p), (c = X(E)), (l = B(E, 'BUTTON', {}));
      var Z = k(l);
      oe(u.$$.fragment, Z), Z.forEach(p), (h = X(E)), (w = B(E, 'BUTTON', {}));
      var j = k(w);
      oe($.$$.fragment, j), j.forEach(p), (v = X(E)), (x = B(E, 'BUTTON', {}));
      var ae = k(x);
      oe(C.$$.fragment, ae),
        ae.forEach(p),
        (z = X(E)),
        (V = B(E, 'BUTTON', {}));
      var N = k(V);
      oe(L.$$.fragment, N),
        N.forEach(p),
        E.forEach(p),
        (G = X(b)),
        (q = B(b, 'MAIN', { class: !0 }));
      var W = k(q);
      (J = B(W, 'DIV', { class: !0, 'data-svelte-h': !0 })),
        ge(J) !== 'svelte-ra0uei' && (J.innerHTML = Q),
        (re = X(W)),
        (K = B(W, 'DIV', { class: !0 }));
      var A = k(K);
      pe && pe.l(A),
        (U = X(A)),
        fe && fe.l(A),
        (ne = X(A)),
        d && d.l(A),
        (R = X(A)),
        _ && _.l(A),
        (me = X(A)),
        g && g.l(A),
        A.forEach(p),
        (Ee = X(W)),
        (ke = B(W, 'DIV', { class: !0 }));
      var de = k(ke);
      be = B(de, 'BUTTON', { class: !0 });
      var Te = k(be);
      (Qe = He(Te, '< Prior Section')),
        Te.forEach(p),
        (Xe = X(de)),
        (xe = B(de, 'BUTTON', { class: !0 }));
      var he = k(xe);
      (qe = He(he, 'Next Section >')),
        he.forEach(p),
        de.forEach(p),
        W.forEach(p),
        b.forEach(p),
        this.h();
    },
    h() {
      f(s, 'href', '/'),
        f(n, 'class', 'p-4 h-full side-nav flex flex-col svelte-13ks2f8'),
        f(J, 'class', 'w-full p-4 px-8 top-bar'),
        f(K, 'class', 'p-4 px-8'),
        (be.disabled = Ye = t[0] == 0),
        f(be, 'class', (ze = 'book-btn ' + (t[0] == 0 ? 'disabled' : ''))),
        (xe.disabled = Ae = t[0] == t[1].length - 1),
        f(
          xe,
          'class',
          (Re = 'book-btn ' + (t[0] == t[1].length - 1 ? 'disabled' : '')),
        ),
        f(ke, 'class', 'flex flex-row space-x-4 px-7 mb-4'),
        f(q, 'class', 'flex-1'),
        f(e, 'class', 'flex h-full');
    },
    m(m, b) {
      I(m, e, b),
        y(e, n),
        y(n, s),
        ee(r, s, null),
        y(n, a),
        y(n, i),
        ee(o, i, null),
        y(n, c),
        y(n, l),
        ee(u, l, null),
        y(n, h),
        y(n, w),
        ee($, w, null),
        y(n, v),
        y(n, x),
        ee(C, x, null),
        y(n, z),
        y(n, V),
        ee(L, V, null),
        y(e, G),
        y(e, q),
        y(q, J),
        y(q, re),
        y(q, K),
        pe && pe.m(K, null),
        y(K, U),
        fe && fe.m(K, null),
        y(K, ne),
        d && d.m(K, null),
        y(K, R),
        _ && _.m(K, null),
        y(K, me),
        g && g.m(K, null),
        y(q, Ee),
        y(q, ke),
        y(ke, be),
        y(be, Qe),
        y(ke, Xe),
        y(ke, xe),
        y(xe, qe),
        (Oe = !0),
        Ke ||
          ((_t = [
            je(i, 'click', t[5]),
            je(l, 'click', t[6]),
            je(w, 'click', t[7]),
            je(x, 'click', t[8]),
            je(V, 'click', t[9]),
            je(be, 'click', t[4]),
            je(xe, 'click', t[3]),
          ]),
          (Ke = !0));
    },
    p(m, b) {
      const E = {};
      b & 1 && (E.fill = m[0] == 0 ? '#FFFFFF' : '#8C8C8C'), o.$set(E);
      const M = {};
      b & 1 && (M.fill = m[0] == 1 ? '#FFFFFF' : '#8C8C8C'), u.$set(M);
      const F = {};
      b & 1 && (F.fill = m[0] == 2 ? '#FFFFFF' : '#8C8C8C'), $.$set(F);
      const Z = {};
      b & 1 && (Z.fill = m[0] == 3 ? '#FFFFFF' : '#8C8C8C'), C.$set(Z);
      const j = {};
      b & 1 && (j.fill = m[0] == 4 ? '#FFFFFF' : '#8C8C8C'),
        L.$set(j),
        m[0] == 0
          ? pe
            ? b & 1 && S(pe, 1)
            : ((pe = An()), pe.c(), S(pe, 1), pe.m(K, U))
          : pe &&
            (ye(),
            O(pe, 1, 1, () => {
              pe = null;
            }),
            we()),
        m[0] == 1
          ? fe
            ? b & 1 && S(fe, 1)
            : ((fe = Pn()), fe.c(), S(fe, 1), fe.m(K, ne))
          : fe &&
            (ye(),
            O(fe, 1, 1, () => {
              fe = null;
            }),
            we()),
        m[0] == 2
          ? d
            ? b & 1 && S(d, 1)
            : ((d = Bn()), d.c(), S(d, 1), d.m(K, R))
          : d &&
            (ye(),
            O(d, 1, 1, () => {
              d = null;
            }),
            we()),
        m[0] == 3
          ? _
            ? b & 1 && S(_, 1)
            : ((_ = Nn()), _.c(), S(_, 1), _.m(K, me))
          : _ &&
            (ye(),
            O(_, 1, 1, () => {
              _ = null;
            }),
            we()),
        m[0] == 4
          ? g
            ? b & 1 && S(g, 1)
            : ((g = Ln()), g.c(), S(g, 1), g.m(K, null))
          : g &&
            (ye(),
            O(g, 1, 1, () => {
              g = null;
            }),
            we()),
        (!Oe || (b & 1 && Ye !== (Ye = m[0] == 0))) && (be.disabled = Ye),
        (!Oe ||
          (b & 1 &&
            ze !== (ze = 'book-btn ' + (m[0] == 0 ? 'disabled' : '')))) &&
          f(be, 'class', ze),
        (!Oe || (b & 1 && Ae !== (Ae = m[0] == m[1].length - 1))) &&
          (xe.disabled = Ae),
        (!Oe ||
          (b & 1 &&
            Re !==
              (Re =
                'book-btn ' + (m[0] == m[1].length - 1 ? 'disabled' : '')))) &&
          f(xe, 'class', Re);
    },
    i(m) {
      Oe ||
        (S(r.$$.fragment, m),
        S(o.$$.fragment, m),
        S(u.$$.fragment, m),
        S($.$$.fragment, m),
        S(C.$$.fragment, m),
        S(L.$$.fragment, m),
        S(pe),
        S(fe),
        S(d),
        S(_),
        S(g),
        (Oe = !0));
    },
    o(m) {
      O(r.$$.fragment, m),
        O(o.$$.fragment, m),
        O(u.$$.fragment, m),
        O($.$$.fragment, m),
        O(C.$$.fragment, m),
        O(L.$$.fragment, m),
        O(pe),
        O(fe),
        O(d),
        O(_),
        O(g),
        (Oe = !1);
    },
    d(m) {
      m && p(e),
        te(r),
        te(o),
        te(u),
        te($),
        te(C),
        te(L),
        pe && pe.d(),
        fe && fe.d(),
        d && d.d(),
        _ && _.d(),
        g && g.d(),
        (Ke = !1),
        Fe(_t);
    },
  };
}
function Ta(t) {
  let e, n;
  return (
    (e = new ds({
      props: { $$slots: { default: [Sa] }, $$scope: { ctx: t } },
    })),
    {
      c() {
        se(e.$$.fragment);
      },
      l(s) {
        oe(e.$$.fragment, s);
      },
      m(s, r) {
        ee(e, s, r), (n = !0);
      },
      p(s, [r]) {
        const a = {};
        r & 1025 && (a.$$scope = { dirty: r, ctx: s }), e.$set(a);
      },
      i(s) {
        n || (S(e.$$.fragment, s), (n = !0));
      },
      o(s) {
        O(e.$$.fragment, s), (n = !1);
      },
      d(s) {
        te(e, s);
      },
    }
  );
}
function Oa(t, e, n) {
  let s = 0,
    r = ['vision', 'value', 'roadmap', 'mvp', 'team'];
  function a($) {
    n(0, (s = $));
  }
  function i() {
    n(0, (s = s + 1 > r.length - 1 ? 0 : s + 1));
  }
  function o() {
    n(0, (s = s - 1 < 0 ? r.length - 1 : s - 1));
  }
  return [
    s,
    r,
    a,
    i,
    o,
    () => a(0),
    () => a(1),
    () => a(2),
    () => a(3),
    () => a(4),
  ];
}
class Ia extends ce {
  constructor(e) {
    super(), le(this, e, Oa, Ta, ie, {});
  }
}
const Aa = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Ia },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
export {
  Ir as E,
  kr as L,
  ea as P,
  Ma as R,
  qa as a,
  Ra as b,
  Ua as c,
  Da as d,
  Ia as e,
  za as g,
  Va as h,
  La as m,
  Fa as n,
  Ka as r,
  Na as s,
};
