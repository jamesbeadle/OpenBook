var ei = Object.defineProperty;
var ti = (t, e, n) =>
  e in t
    ? ei(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (t[e] = n);
var fn = (t, e, n) => (ti(t, typeof e != 'symbol' ? e + '' : e, n), n);
import {
  H as ii,
  u as ni,
  c as qe,
  A as ri,
  a as si,
  Y as zt,
} from './vendor.438ce89a.js';
function q() {}
const Yt = (t) => t;
function li(t, e) {
  for (const n in e) t[n] = e[n];
  return t;
}
function wr(t) {
  return t();
}
function On() {
  return Object.create(null);
}
function Ne(t) {
  t.forEach(wr);
}
function st(t) {
  return typeof t == 'function';
}
function le(t, e) {
  return t != t
    ? e == e
    : t !== e || (t && typeof t == 'object') || typeof t == 'function';
}
let Mt;
function vt(t, e) {
  return t === e
    ? !0
    : (Mt || (Mt = document.createElement('a')), (Mt.href = e), t === Mt.href);
}
function ai(t) {
  return Object.keys(t).length === 0;
}
function yr(t, ...e) {
  if (t == null) {
    for (const r of e) r(void 0);
    return q;
  }
  const n = t.subscribe(...e);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function Me(t, e, n) {
  t.$$.on_destroy.push(yr(e, n));
}
function Ct(t, e, n, r) {
  if (t) {
    const i = Cr(t, e, n, r);
    return t[0](i);
  }
}
function Cr(t, e, n, r) {
  return t[1] && r ? li(n.ctx.slice(), t[1](r(e))) : n.ctx;
}
function $t(t, e, n, r) {
  if (t[2] && r) {
    const i = t[2](r(n));
    if (e.dirty === void 0) return i;
    if (typeof i == 'object') {
      const l = [],
        s = Math.max(e.dirty.length, i.length);
      for (let a = 0; a < s; a += 1) l[a] = e.dirty[a] | i[a];
      return l;
    }
    return e.dirty | i;
  }
  return e.dirty;
}
function kt(t, e, n, r, i, l) {
  if (i) {
    const s = Cr(e, n, r, l);
    t.p(s, i);
  }
}
function Et(t) {
  if (t.ctx.length > 32) {
    const e = [],
      n = t.ctx.length / 32;
    for (let r = 0; r < n; r++) e[r] = -1;
    return e;
  }
  return -1;
}
function oi(t) {
  const e = {};
  for (const n in t) e[n] = !0;
  return e;
}
function ot(t) {
  return t ?? '';
}
function Pn(t) {
  const e = typeof t == 'string' && t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return e ? [parseFloat(e[1]), e[2] || 'px'] : [t, 'px'];
}
const $r = typeof window < 'u';
let wn = $r ? () => window.performance.now() : () => Date.now(),
  yn = $r ? (t) => requestAnimationFrame(t) : q;
const bt = new Set();
function kr(t) {
  bt.forEach((e) => {
    e.c(t) || (bt.delete(e), e.f());
  }),
    bt.size !== 0 && yn(kr);
}
function Cn(t) {
  let e;
  return (
    bt.size === 0 && yn(kr),
    {
      promise: new Promise((n) => {
        bt.add((e = { c: t, f: n }));
      }),
      abort() {
        bt.delete(e);
      },
    }
  );
}
let en = !1;
function ci() {
  en = !0;
}
function fi() {
  en = !1;
}
function ui(t, e, n, r) {
  for (; t < e; ) {
    const i = t + ((e - t) >> 1);
    n(i) <= r ? (t = i + 1) : (e = i);
  }
  return t;
}
function di(t) {
  if (t.hydrate_init) return;
  t.hydrate_init = !0;
  let e = t.childNodes;
  if (t.nodeName === 'HEAD') {
    const o = [];
    for (let c = 0; c < e.length; c++) {
      const u = e[c];
      u.claim_order !== void 0 && o.push(u);
    }
    e = o;
  }
  const n = new Int32Array(e.length + 1),
    r = new Int32Array(e.length);
  n[0] = -1;
  let i = 0;
  for (let o = 0; o < e.length; o++) {
    const c = e[o].claim_order,
      u =
        (i > 0 && e[n[i]].claim_order <= c
          ? i + 1
          : ui(1, i, (_) => e[n[_]].claim_order, c)) - 1;
    r[o] = n[u] + 1;
    const h = u + 1;
    (n[h] = o), (i = Math.max(h, i));
  }
  const l = [],
    s = [];
  let a = e.length - 1;
  for (let o = n[i] + 1; o != 0; o = r[o - 1]) {
    for (l.push(e[o - 1]); a >= o; a--) s.push(e[a]);
    a--;
  }
  for (; a >= 0; a--) s.push(e[a]);
  l.reverse(), s.sort((o, c) => o.claim_order - c.claim_order);
  for (let o = 0, c = 0; o < s.length; o++) {
    for (; c < l.length && s[o].claim_order >= l[c].claim_order; ) c++;
    const u = c < l.length ? l[c] : null;
    t.insertBefore(s[o], u);
  }
}
function hi(t, e) {
  t.appendChild(e);
}
function Er(t) {
  if (!t) return document;
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
  return e && e.host ? e : t.ownerDocument;
}
function pi(t) {
  const e = $('style');
  return (e.textContent = '/* empty */'), _i(Er(t), e), e.sheet;
}
function _i(t, e) {
  return hi(t.head || t, e), e.sheet;
}
function p(t, e) {
  if (en) {
    for (
      di(t),
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
function P(t, e, n) {
  en && !n
    ? p(t, e)
    : (e.parentNode !== t || e.nextSibling != n) &&
      t.insertBefore(e, n || null);
}
function d(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function $(t) {
  return document.createElement(t);
}
function ee(t) {
  return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function Ie(t) {
  return document.createTextNode(t);
}
function L() {
  return Ie(' ');
}
function me() {
  return Ie('');
}
function _e(t, e, n, r) {
  return t.addEventListener(e, n, r), () => t.removeEventListener(e, n, r);
}
function Tr(t) {
  return function (e) {
    return e.preventDefault(), t.call(this, e);
  };
}
function tn(t) {
  return function (e) {
    return e.stopPropagation(), t.call(this, e);
  };
}
function f(t, e, n) {
  n == null
    ? t.removeAttribute(e)
    : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function he(t) {
  return t.dataset.svelteH;
}
function y(t) {
  return Array.from(t.childNodes);
}
function mi(t) {
  t.claim_info === void 0 &&
    (t.claim_info = { last_index: 0, total_claimed: 0 });
}
function xr(t, e, n, r, i = !1) {
  mi(t);
  const l = (() => {
    for (let s = t.claim_info.last_index; s < t.length; s++) {
      const a = t[s];
      if (e(a)) {
        const o = n(a);
        return (
          o === void 0 ? t.splice(s, 1) : (t[s] = o),
          i || (t.claim_info.last_index = s),
          a
        );
      }
    }
    for (let s = t.claim_info.last_index - 1; s >= 0; s--) {
      const a = t[s];
      if (e(a)) {
        const o = n(a);
        return (
          o === void 0 ? t.splice(s, 1) : (t[s] = o),
          i
            ? o === void 0 && t.claim_info.last_index--
            : (t.claim_info.last_index = s),
          a
        );
      }
    }
    return r();
  })();
  return (
    (l.claim_order = t.claim_info.total_claimed),
    (t.claim_info.total_claimed += 1),
    l
  );
}
function Nr(t, e, n, r) {
  return xr(
    t,
    (i) => i.nodeName === e,
    (i) => {
      const l = [];
      for (let s = 0; s < i.attributes.length; s++) {
        const a = i.attributes[s];
        n[a.name] || l.push(a.name);
      }
      l.forEach((s) => i.removeAttribute(s));
    },
    () => r(e),
  );
}
function E(t, e, n) {
  return Nr(t, e, n, $);
}
function ne(t, e, n) {
  return Nr(t, e, n, ee);
}
function Re(t, e) {
  return xr(
    t,
    (n) => n.nodeType === 3,
    (n) => {
      const r = '' + e;
      if (n.data.startsWith(r)) {
        if (n.data.length !== r.length) return n.splitText(r.length);
      } else n.data = r;
    },
    () => Ie(e),
    !0,
  );
}
function j(t) {
  return Re(t, ' ');
}
function et(t, e) {
  (e = '' + e), t.data !== e && (t.data = e);
}
function Fn(t, e) {
  t.value = e ?? '';
}
function He(t, e, n, r) {
  n == null
    ? t.style.removeProperty(e)
    : t.style.setProperty(e, n, r ? 'important' : '');
}
function Le(t, e, n) {
  t.classList.toggle(e, !!n);
}
function Ar(t, e, { bubbles: n = !1, cancelable: r = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: n, cancelable: r });
}
function tt(t, e) {
  return new t(e);
}
const qt = new Map();
let Kt = 0;
function gi(t) {
  let e = 5381,
    n = t.length;
  for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
  return e >>> 0;
}
function vi(t, e) {
  const n = { stylesheet: pi(e), rules: {} };
  return qt.set(t, n), n;
}
function Zt(t, e, n, r, i, l, s, a = 0) {
  const o = 16.666 / r;
  let c = `{
`;
  for (let m = 0; m <= 1; m += o) {
    const N = e + (n - e) * l(m);
    c +=
      m * 100 +
      `%{${s(N, 1 - N)}}
`;
  }
  const u =
      c +
      `100% {${s(n, 1 - n)}}
}`,
    h = `__svelte_${gi(u)}_${a}`,
    _ = Er(t),
    { stylesheet: C, rules: b } = qt.get(_) || vi(_, t);
  b[h] ||
    ((b[h] = !0), C.insertRule(`@keyframes ${h} ${u}`, C.cssRules.length));
  const A = t.style.animation || '';
  return (
    (t.style.animation = `${
      A ? `${A}, ` : ''
    }${h} ${r}ms linear ${i}ms 1 both`),
    (Kt += 1),
    h
  );
}
function Wt(t, e) {
  const n = (t.style.animation || '').split(', '),
    r = n.filter(
      e ? (l) => l.indexOf(e) < 0 : (l) => l.indexOf('__svelte') === -1,
    ),
    i = n.length - r.length;
  i && ((t.style.animation = r.join(', ')), (Kt -= i), Kt || bi());
}
function bi() {
  yn(() => {
    Kt ||
      (qt.forEach((t) => {
        const { ownerNode: e } = t.stylesheet;
        e && d(e);
      }),
      qt.clear());
  });
}
let Bt;
function Pt(t) {
  Bt = t;
}
function nn() {
  if (!Bt) throw new Error('Function called outside component initialization');
  return Bt;
}
function Ke(t) {
  nn().$$.on_mount.push(t);
}
function wi(t) {
  nn().$$.after_update.push(t);
}
function Sr(t) {
  nn().$$.on_destroy.push(t);
}
function Ir() {
  const t = nn();
  return (e, n, { cancelable: r = !1 } = {}) => {
    const i = t.$$.callbacks[e];
    if (i) {
      const l = Ar(e, n, { cancelable: r });
      return (
        i.slice().forEach((s) => {
          s.call(t, l);
        }),
        !l.defaultPrevented
      );
    }
    return !0;
  };
}
function un(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach((r) => r.call(this, e));
}
const gt = [],
  wt = [];
let yt = [];
const Bn = [],
  Or = Promise.resolve();
let vn = !1;
function Pr() {
  vn || ((vn = !0), Or.then(Fr));
}
function Lt() {
  return Pr(), Or;
}
function We(t) {
  yt.push(t);
}
const dn = new Set();
let pt = 0;
function Fr() {
  if (pt !== 0) return;
  const t = Bt;
  do {
    try {
      for (; pt < gt.length; ) {
        const e = gt[pt];
        pt++, Pt(e), yi(e.$$);
      }
    } catch (e) {
      throw ((gt.length = 0), (pt = 0), e);
    }
    for (Pt(null), gt.length = 0, pt = 0; wt.length; ) wt.pop()();
    for (let e = 0; e < yt.length; e += 1) {
      const n = yt[e];
      dn.has(n) || (dn.add(n), n());
    }
    yt.length = 0;
  } while (gt.length);
  for (; Bn.length; ) Bn.pop()();
  (vn = !1), dn.clear(), Pt(t);
}
function yi(t) {
  if (t.fragment !== null) {
    t.update(), Ne(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, e),
      t.after_update.forEach(We);
  }
}
function Ci(t) {
  const e = [],
    n = [];
  yt.forEach((r) => (t.indexOf(r) === -1 ? e.push(r) : n.push(r))),
    n.forEach((r) => r()),
    (yt = e);
}
let Nt;
function $n() {
  return (
    Nt ||
      ((Nt = Promise.resolve()),
      Nt.then(() => {
        Nt = null;
      })),
    Nt
  );
}
function dt(t, e, n) {
  t.dispatchEvent(Ar(`${e ? 'intro' : 'outro'}${n}`));
}
const jt = new Set();
let Ye;
function ye() {
  Ye = { r: 0, c: [], p: Ye };
}
function Ce() {
  Ye.r || Ne(Ye.c), (Ye = Ye.p);
}
function T(t, e) {
  t && t.i && (jt.delete(t), t.i(e));
}
function I(t, e, n, r) {
  if (t && t.o) {
    if (jt.has(t)) return;
    jt.add(t),
      Ye.c.push(() => {
        jt.delete(t), r && (n && t.d(1), r());
      }),
      t.o(e);
  } else r && r();
}
const kn = { duration: 0 };
function En(t, e, n) {
  const r = { direction: 'in' };
  let i = e(t, n, r),
    l = !1,
    s,
    a,
    o = 0;
  function c() {
    s && Wt(t, s);
  }
  function u() {
    const {
      delay: _ = 0,
      duration: C = 300,
      easing: b = Yt,
      tick: A = q,
      css: m,
    } = i || kn;
    m && (s = Zt(t, 0, 1, C, _, b, m, o++)), A(0, 1);
    const N = wn() + _,
      M = N + C;
    a && a.abort(),
      (l = !0),
      We(() => dt(t, !0, 'start')),
      (a = Cn((w) => {
        if (l) {
          if (w >= M) return A(1, 0), dt(t, !0, 'end'), c(), (l = !1);
          if (w >= N) {
            const x = b((w - N) / C);
            A(x, 1 - x);
          }
        }
        return l;
      }));
  }
  let h = !1;
  return {
    start() {
      h || ((h = !0), Wt(t), st(i) ? ((i = i(r)), $n().then(u)) : u());
    },
    invalidate() {
      h = !1;
    },
    end() {
      l && (c(), (l = !1));
    },
  };
}
function Tn(t, e, n) {
  const r = { direction: 'out' };
  let i = e(t, n, r),
    l = !0,
    s;
  const a = Ye;
  a.r += 1;
  let o;
  function c() {
    const {
      delay: u = 0,
      duration: h = 300,
      easing: _ = Yt,
      tick: C = q,
      css: b,
    } = i || kn;
    b && (s = Zt(t, 1, 0, h, u, _, b));
    const A = wn() + u,
      m = A + h;
    We(() => dt(t, !1, 'start')),
      'inert' in t && ((o = t.inert), (t.inert = !0)),
      Cn((N) => {
        if (l) {
          if (N >= m) return C(0, 1), dt(t, !1, 'end'), --a.r || Ne(a.c), !1;
          if (N >= A) {
            const M = _((N - A) / h);
            C(1 - M, M);
          }
        }
        return l;
      });
  }
  return (
    st(i)
      ? $n().then(() => {
          (i = i(r)), c();
        })
      : c(),
    {
      end(u) {
        u && 'inert' in t && (t.inert = o),
          u && i.tick && i.tick(1, 0),
          l && (s && Wt(t, s), (l = !1));
      },
    }
  );
}
function Gt(t, e, n, r) {
  let l = e(t, n, { direction: 'both' }),
    s = r ? 0 : 1,
    a = null,
    o = null,
    c = null,
    u;
  function h() {
    c && Wt(t, c);
  }
  function _(b, A) {
    const m = b.b - s;
    return (
      (A *= Math.abs(m)),
      {
        a: s,
        b: b.b,
        d: m,
        duration: A,
        start: b.start,
        end: b.start + A,
        group: b.group,
      }
    );
  }
  function C(b) {
    const {
        delay: A = 0,
        duration: m = 300,
        easing: N = Yt,
        tick: M = q,
        css: w,
      } = l || kn,
      x = { start: wn() + A, b };
    b || ((x.group = Ye), (Ye.r += 1)),
      'inert' in t &&
        (b ? u !== void 0 && (t.inert = u) : ((u = t.inert), (t.inert = !0))),
      a || o
        ? (o = x)
        : (w && (h(), (c = Zt(t, s, b, m, A, N, w))),
          b && M(0, 1),
          (a = _(x, m)),
          We(() => dt(t, b, 'start')),
          Cn((F) => {
            if (
              (o &&
                F > o.start &&
                ((a = _(o, m)),
                (o = null),
                dt(t, a.b, 'start'),
                w && (h(), (c = Zt(t, s, a.b, a.duration, 0, N, l.css)))),
              a)
            ) {
              if (F >= a.end)
                M((s = a.b), 1 - s),
                  dt(t, a.b, 'end'),
                  o || (a.b ? h() : --a.group.r || Ne(a.group.c)),
                  (a = null);
              else if (F >= a.start) {
                const z = F - a.start;
                (s = a.a + a.d * N(z / a.duration)), M(s, 1 - s);
              }
            }
            return !!(a || o);
          }));
  }
  return {
    run(b) {
      st(l)
        ? $n().then(() => {
            (l = l({ direction: b ? 'in' : 'out' })), C(b);
          })
        : C(b);
    },
    end() {
      h(), (a = o = null);
    },
  };
}
function Dn(t) {
  return t?.length !== void 0 ? t : Array.from(t);
}
function $i(t, e) {
  I(t, 1, 1, () => {
    e.delete(t.key);
  });
}
function ki(t, e, n, r, i, l, s, a, o, c, u, h) {
  let _ = t.length,
    C = l.length,
    b = _;
  const A = {};
  for (; b--; ) A[t[b].key] = b;
  const m = [],
    N = new Map(),
    M = new Map(),
    w = [];
  for (b = C; b--; ) {
    const R = h(i, l, b),
      D = n(R);
    let B = s.get(D);
    B ? r && w.push(() => B.p(R, e)) : ((B = c(D, R)), B.c()),
      N.set(D, (m[b] = B)),
      D in A && M.set(D, Math.abs(b - A[D]));
  }
  const x = new Set(),
    F = new Set();
  function z(R) {
    T(R, 1), R.m(a, u), s.set(R.key, R), (u = R.first), C--;
  }
  for (; _ && C; ) {
    const R = m[C - 1],
      D = t[_ - 1],
      B = R.key,
      U = D.key;
    R === D
      ? ((u = R.first), _--, C--)
      : N.has(U)
      ? !s.has(B) || x.has(B)
        ? z(R)
        : F.has(U)
        ? _--
        : M.get(B) > M.get(U)
        ? (F.add(B), z(R))
        : (x.add(U), _--)
      : (o(D, s), _--);
  }
  for (; _--; ) {
    const R = t[_];
    N.has(R.key) || o(R, s);
  }
  for (; C; ) z(m[C - 1]);
  return Ne(w), m;
}
function J(t) {
  t && t.c();
}
function X(t, e) {
  t && t.l(e);
}
function W(t, e, n) {
  const { fragment: r, after_update: i } = t.$$;
  r && r.m(e, n),
    We(() => {
      const l = t.$$.on_mount.map(wr).filter(st);
      t.$$.on_destroy ? t.$$.on_destroy.push(...l) : Ne(l),
        (t.$$.on_mount = []);
    }),
    i.forEach(We);
}
function G(t, e) {
  const n = t.$$;
  n.fragment !== null &&
    (Ci(n.after_update),
    Ne(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []));
}
function Ei(t, e) {
  t.$$.dirty[0] === -1 && (gt.push(t), Pr(), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function oe(t, e, n, r, i, l, s = null, a = [-1]) {
  const o = Bt;
  Pt(t);
  const c = (t.$$ = {
    fragment: null,
    ctx: [],
    props: l,
    update: q,
    not_equal: i,
    bound: On(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (o ? o.$$.context : [])),
    callbacks: On(),
    dirty: a,
    skip_bound: !1,
    root: e.target || o.$$.root,
  });
  s && s(c.root);
  let u = !1;
  if (
    ((c.ctx = n
      ? n(t, e.props || {}, (h, _, ...C) => {
          const b = C.length ? C[0] : _;
          return (
            c.ctx &&
              i(c.ctx[h], (c.ctx[h] = b)) &&
              (!c.skip_bound && c.bound[h] && c.bound[h](b), u && Ei(t, h)),
            _
          );
        })
      : []),
    c.update(),
    (u = !0),
    Ne(c.before_update),
    (c.fragment = r ? r(c.ctx) : !1),
    e.target)
  ) {
    if (e.hydrate) {
      ci();
      const h = y(e.target);
      c.fragment && c.fragment.l(h), h.forEach(d);
    } else c.fragment && c.fragment.c();
    e.intro && T(t.$$.fragment), W(t, e.target, e.anchor), fi(), Fr();
  }
  Pt(o);
}
class ce {
  constructor() {
    fn(this, '$$');
    fn(this, '$$set');
  }
  $destroy() {
    G(this, 1), (this.$destroy = q);
  }
  $on(e, n) {
    if (!st(n)) return q;
    const r = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return (
      r.push(n),
      () => {
        const i = r.indexOf(n);
        i !== -1 && r.splice(i, 1);
      }
    );
  }
  $set(e) {
    this.$$set &&
      !ai(e) &&
      ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
  }
}
const Ti = '4';
function xi(t, e) {
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
function Ni(t) {
  return t.split('%25').map(decodeURI).join('%25');
}
function Ai(t) {
  for (const e in t) t[e] = decodeURIComponent(t[e]);
  return t;
}
const Si = ['href', 'pathname', 'search', 'searchParams', 'toString', 'toJSON'];
function Ii(t, e) {
  const n = new URL(t);
  for (const r of Si)
    Object.defineProperty(n, r, {
      get() {
        return e(), t[r];
      },
      enumerable: !0,
      configurable: !0,
    });
  return Oi(n), n;
}
function Oi(t) {
  Object.defineProperty(t, 'hash', {
    get() {
      throw new Error(
        'Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead',
      );
    },
  });
}
const Pi = '/__data.json';
function Fi(t) {
  return t.replace(/\/$/, '') + Pi;
}
function Bi(...t) {
  let e = 5381;
  for (const n of t)
    if (typeof n == 'string') {
      let r = n.length;
      for (; r; ) e = (e * 33) ^ n.charCodeAt(--r);
    } else if (ArrayBuffer.isView(n)) {
      const r = new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
      let i = r.length;
      for (; i; ) e = (e * 33) ^ r[--i];
    } else throw new TypeError('value must be a string or TypedArray');
  return (e >>> 0).toString(36);
}
const Br = window.fetch;
window.fetch = (t, e) => (
  (t instanceof Request ? t.method : e?.method || 'GET') !== 'GET' &&
    Ft.delete(xn(t)),
  Br(t, e)
);
const Ft = new Map();
function Di(t, e) {
  const n = xn(t, e),
    r = document.querySelector(n);
  if (r?.textContent) {
    const { body: i, ...l } = JSON.parse(r.textContent),
      s = r.getAttribute('data-ttl');
    return (
      s && Ft.set(n, { body: i, init: l, ttl: 1e3 * Number(s) }),
      Promise.resolve(new Response(i, l))
    );
  }
  return window.fetch(t, e);
}
function Ri(t, e, n) {
  if (Ft.size > 0) {
    const r = xn(t, n),
      i = Ft.get(r);
    if (i) {
      if (
        performance.now() < i.ttl &&
        ['default', 'force-cache', 'only-if-cached', void 0].includes(n?.cache)
      )
        return new Response(i.body, i.init);
      Ft.delete(r);
    }
  }
  return window.fetch(e, n);
}
function xn(t, e) {
  let r = `script[data-sveltekit-fetched][data-url=${JSON.stringify(
    t instanceof Request ? t.url : t,
  )}]`;
  if (e?.headers || e?.body) {
    const i = [];
    e.headers && i.push([...new Headers(e.headers)].join(',')),
      e.body &&
        (typeof e.body == 'string' || ArrayBuffer.isView(e.body)) &&
        i.push(e.body),
      (r += `[data-hash="${Bi(...i)}"]`);
  }
  return r;
}
const Mi = /^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;
function Vi(t) {
  const e = [];
  return {
    pattern:
      t === '/'
        ? /^\/$/
        : new RegExp(
            `^${Li(t)
              .map((r) => {
                const i = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);
                if (i)
                  return (
                    e.push({
                      name: i[1],
                      matcher: i[2],
                      optional: !1,
                      rest: !0,
                      chained: !0,
                    }),
                    '(?:/(.*))?'
                  );
                const l = /^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);
                if (l)
                  return (
                    e.push({
                      name: l[1],
                      matcher: l[2],
                      optional: !0,
                      rest: !1,
                      chained: !0,
                    }),
                    '(?:/([^/]+))?'
                  );
                if (!r) return;
                const s = r.split(/\[(.+?)\](?!\])/);
                return (
                  '/' +
                  s
                    .map((o, c) => {
                      if (c % 2) {
                        if (o.startsWith('x+'))
                          return hn(
                            String.fromCharCode(parseInt(o.slice(2), 16)),
                          );
                        if (o.startsWith('u+'))
                          return hn(
                            String.fromCharCode(
                              ...o
                                .slice(2)
                                .split('-')
                                .map((A) => parseInt(A, 16)),
                            ),
                          );
                        const u = Mi.exec(o);
                        if (!u)
                          throw new Error(
                            `Invalid param: ${o}. Params and matcher names can only have underscores and alphanumeric characters.`,
                          );
                        const [, h, _, C, b] = u;
                        return (
                          e.push({
                            name: C,
                            matcher: b,
                            optional: !!h,
                            rest: !!_,
                            chained: _ ? c === 1 && s[0] === '' : !1,
                          }),
                          _ ? '(.*?)' : h ? '([^/]*)?' : '([^/]+?)'
                        );
                      }
                      return hn(o);
                    })
                    .join('')
                );
              })
              .join('')}/?$`,
          ),
    params: e,
  };
}
function Ui(t) {
  return !/^\([^)]+\)$/.test(t);
}
function Li(t) {
  return t.slice(1).split('/').filter(Ui);
}
function ji(t, e, n) {
  const r = {},
    i = t.slice(1),
    l = i.filter((a) => a !== void 0);
  let s = 0;
  for (let a = 0; a < e.length; a += 1) {
    const o = e[a];
    let c = i[a - s];
    if (
      (o.chained &&
        o.rest &&
        s &&
        ((c = i
          .slice(a - s, a + 1)
          .filter((u) => u)
          .join('/')),
        (s = 0)),
      c === void 0)
    ) {
      o.rest && (r[o.name] = '');
      continue;
    }
    if (!o.matcher || n[o.matcher](c)) {
      r[o.name] = c;
      const u = e[a + 1],
        h = i[a + 1];
      u && !u.rest && u.optional && h && o.chained && (s = 0),
        !u && !h && Object.keys(r).length === l.length && (s = 0);
      continue;
    }
    if (o.optional && o.chained) {
      s++;
      continue;
    }
    return;
  }
  if (!s) return r;
}
function hn(t) {
  return t
    .normalize()
    .replace(/[[\]]/g, '\\$&')
    .replace(/%/g, '%25')
    .replace(/\//g, '%2[Ff]')
    .replace(/\?/g, '%3[Ff]')
    .replace(/#/g, '%23')
    .replace(/[.*+?^${}()|\\]/g, '\\$&');
}
function Hi({ nodes: t, server_loads: e, dictionary: n, matchers: r }) {
  const i = new Set(e);
  return Object.entries(n).map(([a, [o, c, u]]) => {
    const { pattern: h, params: _ } = Vi(a),
      C = {
        id: a,
        exec: (b) => {
          const A = h.exec(b);
          if (A) return ji(A, _, r);
        },
        errors: [1, ...(u || [])].map((b) => t[b]),
        layouts: [0, ...(c || [])].map(s),
        leaf: l(o),
      };
    return (
      (C.errors.length = C.layouts.length =
        Math.max(C.errors.length, C.layouts.length)),
      C
    );
  });
  function l(a) {
    const o = a < 0;
    return o && (a = ~a), [o, t[a]];
  }
  function s(a) {
    return a === void 0 ? a : [i.has(a), t[a]];
  }
}
function Dr(t) {
  try {
    return JSON.parse(sessionStorage[t]);
  } catch {}
}
function Rn(t, e) {
  const n = JSON.stringify(e);
  try {
    sessionStorage[t] = n;
  } catch {}
}
const _t = [];
function Rr(t, e) {
  return { subscribe: Ge(t, e).subscribe };
}
function Ge(t, e = q) {
  let n;
  const r = new Set();
  function i(a) {
    if (le(t, a) && ((t = a), n)) {
      const o = !_t.length;
      for (const c of r) c[1](), _t.push(c, t);
      if (o) {
        for (let c = 0; c < _t.length; c += 2) _t[c][0](_t[c + 1]);
        _t.length = 0;
      }
    }
  }
  function l(a) {
    i(a(t));
  }
  function s(a, o = q) {
    const c = [a, o];
    return (
      r.add(c),
      r.size === 1 && (n = e(i, l) || q),
      a(t),
      () => {
        r.delete(c), r.size === 0 && n && (n(), (n = null));
      }
    );
  }
  return { set: i, update: l, subscribe: s };
}
function xt(t, e, n) {
  const r = !Array.isArray(t),
    i = r ? [t] : t;
  if (!i.every(Boolean))
    throw new Error('derived() expects stores as input, got a falsy value');
  const l = e.length < 2;
  return Rr(n, (s, a) => {
    let o = !1;
    const c = [];
    let u = 0,
      h = q;
    const _ = () => {
        if (u) return;
        h();
        const b = e(r ? c[0] : c, s, a);
        l ? s(b) : (h = st(b) ? b : q);
      },
      C = i.map((b, A) =>
        yr(
          b,
          (m) => {
            (c[A] = m), (u &= ~(1 << A)), o && _();
          },
          () => {
            u |= 1 << A;
          },
        ),
      );
    return (
      (o = !0),
      _(),
      function () {
        Ne(C), h(), (o = !1);
      }
    );
  });
}
const lt = globalThis.__sveltekit_1xpes1f?.base ?? '',
  zi = globalThis.__sveltekit_1xpes1f?.assets ?? lt,
  qi = '1702489211371',
  Mr = 'sveltekit:snapshot',
  Vr = 'sveltekit:scroll',
  Xe = 'sveltekit:index',
  Jt = { tap: 1, hover: 2, viewport: 3, eager: 4, off: -1 },
  Xt = location.origin;
function Mn(t) {
  let e = t.baseURI;
  if (!e) {
    const n = t.getElementsByTagName('base');
    e = n.length ? n[0].href : t.URL;
  }
  return e;
}
function It() {
  return { x: pageXOffset, y: pageYOffset };
}
function mt(t, e) {
  return t.getAttribute(`data-sveltekit-${e}`);
}
const Vn = { ...Jt, '': Jt.hover };
function Ur(t) {
  let e = t.assignedSlot ?? t.parentNode;
  return e?.nodeType === 11 && (e = e.host), e;
}
function Un(t, e) {
  for (; t && t !== e; ) {
    if (t.nodeName.toUpperCase() === 'A' && t.hasAttribute('href')) return t;
    t = Ur(t);
  }
}
function pn(t, e) {
  let n;
  try {
    n = new URL(
      t instanceof SVGAElement ? t.href.baseVal : t.href,
      document.baseURI,
    );
  } catch {}
  const r = t instanceof SVGAElement ? t.target.baseVal : t.target,
    i =
      !n ||
      !!r ||
      Ht(n, e) ||
      (t.getAttribute('rel') || '').split(/\s+/).includes('external'),
    l = n?.origin === Xt && t.hasAttribute('download');
  return { url: n, external: i, target: r, download: l };
}
function Vt(t) {
  let e = null,
    n = null,
    r = null,
    i = null,
    l = null,
    s = null,
    a = t;
  for (; a && a !== document.documentElement; )
    r === null && (r = mt(a, 'preload-code')),
      i === null && (i = mt(a, 'preload-data')),
      e === null && (e = mt(a, 'keepfocus')),
      n === null && (n = mt(a, 'noscroll')),
      l === null && (l = mt(a, 'reload')),
      s === null && (s = mt(a, 'replacestate')),
      (a = Ur(a));
  function o(c) {
    switch (c) {
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
    preload_code: Vn[r ?? 'off'],
    preload_data: Vn[i ?? 'off'],
    keep_focus: o(e),
    noscroll: o(n),
    reload: o(l),
    replace_state: o(s),
  };
}
function Ln(t) {
  const e = Ge(t);
  let n = !0;
  function r() {
    (n = !0), e.update((s) => s);
  }
  function i(s) {
    (n = !1), e.set(s);
  }
  function l(s) {
    let a;
    return e.subscribe((o) => {
      (a === void 0 || (n && o !== a)) && s((a = o));
    });
  }
  return { notify: r, set: i, subscribe: l };
}
function Ki() {
  const { set: t, subscribe: e } = Ge(!1);
  let n;
  async function r() {
    clearTimeout(n);
    try {
      const i = await fetch(`${zi}/_app/version.json`, {
        headers: { pragma: 'no-cache', 'cache-control': 'no-cache' },
      });
      if (!i.ok) return !1;
      const s = (await i.json()).version !== qi;
      return s && (t(!0), clearTimeout(n)), s;
    } catch {
      return !1;
    }
  }
  return { subscribe: e, check: r };
}
function Ht(t, e) {
  return t.origin !== Xt || !t.pathname.startsWith(e);
}
function Zi(t) {
  return t.filter((e) => e != null);
}
const Lr = new Set([
  'load',
  'prerender',
  'csr',
  'ssr',
  'trailingSlash',
  'config',
]);
[...Lr];
const Wi = new Set([...Lr]);
[...Wi];
async function Gi(t) {
  for (const e in t)
    if (typeof t[e]?.then == 'function')
      return Object.fromEntries(
        await Promise.all(
          Object.entries(t).map(async ([n, r]) => [n, await r]),
        ),
      );
  return t;
}
class Ot {
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
class jn {
  constructor(e, n) {
    (this.status = e), (this.location = n);
  }
}
const Ji = 'x-sveltekit-invalidated',
  Xi = 'x-sveltekit-trailing-slash';
let jr;
function Qi(t) {
  jr = t.client;
}
function Yi(t) {
  return (...e) => jr[t](...e);
}
const nt = { url: Ln({}), page: Ln({}), navigating: Ge(null), updated: Ki() },
  ct = Dr(Vr) ?? {},
  At = Dr(Mr) ?? {};
function _n(t) {
  ct[t] = It();
}
function ft(t) {
  return (location.href = t.href), new Promise(() => {});
}
function es(t, e) {
  const n = Hi(t),
    r = t.nodes[0],
    i = t.nodes[1];
  r(), i();
  const l = document.documentElement,
    s = [],
    a = [];
  let o = null;
  const c = { before_navigate: [], on_navigate: [], after_navigate: [] };
  let u = { branch: [], error: null, url: null },
    h = !1,
    _ = !1,
    C = !0,
    b = !1,
    A = !1,
    m = !1,
    N = !1,
    M,
    w = history.state?.[Xe];
  w ||
    ((w = Date.now()),
    history.replaceState({ ...history.state, [Xe]: w }, '', location.href));
  const x = ct[w];
  x && ((history.scrollRestoration = 'manual'), scrollTo(x.x, x.y));
  let F, z, R;
  async function D() {
    if (((R = R || Promise.resolve()), await R, !R)) return;
    R = null;
    const v = new URL(location.href),
      k = xe(v, !0);
    o = null;
    const S = (z = {}),
      g = k && (await Fe(k));
    if (S === z && g) {
      if (g.type === 'redirect')
        return H(new URL(g.location, v).href, {}, 1, S);
      g.props.page !== void 0 && (F = g.props.page), M.$set(g.props);
    }
  }
  function B(v) {
    a.some((k) => k?.snapshot) &&
      (At[v] = a.map((k) => k?.snapshot?.capture()));
  }
  function U(v) {
    At[v]?.forEach((k, S) => {
      a[S]?.snapshot?.restore(k);
    });
  }
  function K() {
    _n(w), Rn(Vr, ct), B(w), Rn(Mr, At);
  }
  async function H(
    v,
    {
      noScroll: k = !1,
      replaceState: S = !1,
      keepFocus: g = !1,
      state: O = {},
      invalidateAll: V = !1,
    },
    Q,
    te,
  ) {
    return (
      typeof v == 'string' && (v = new URL(v, Mn(document))),
      Ue({
        url: v,
        scroll: k ? It() : null,
        keepfocus: g,
        redirect_count: Q,
        details: { state: O, replaceState: S },
        nav_token: te,
        accepted: () => {
          V && (N = !0);
        },
        blocked: () => {},
        type: 'goto',
      })
    );
  }
  async function fe(v) {
    return (
      (o = {
        id: v.id,
        promise: Fe(v).then(
          (k) => (k.type === 'loaded' && k.state.error && (o = null), k),
        ),
      }),
      o.promise
    );
  }
  async function ue(...v) {
    const S = n
      .filter((g) => v.some((O) => g.exec(O)))
      .map((g) => Promise.all([...g.layouts, g.leaf].map((O) => O?.[1]())));
    await Promise.all(S);
  }
  function de(v) {
    u = v.state;
    const k = document.querySelector('style[data-sveltekit]');
    k && k.remove(),
      (F = v.props.page),
      (M = new t.root({
        target: e,
        props: { ...v.props, stores: nt, components: a },
        hydrate: !0,
      })),
      U(w);
    const S = {
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
    c.after_navigate.forEach((g) => g(S)), (_ = !0);
  }
  async function ke({
    url: v,
    params: k,
    branch: S,
    status: g,
    error: O,
    route: V,
    form: Q,
  }) {
    let te = 'never';
    for (const Z of S) Z?.slash !== void 0 && (te = Z.slash);
    (v.pathname = xi(v.pathname, te)), (v.search = v.search);
    const ie = {
      type: 'loaded',
      state: { url: v, params: k, branch: S, error: O, route: V },
      props: { constructors: Zi(S).map((Z) => Z.node.component) },
    };
    Q !== void 0 && (ie.props.form = Q);
    let re = {},
      se = !F,
      Y = 0;
    for (let Z = 0; Z < Math.max(S.length, u.branch.length); Z += 1) {
      const ge = S[Z],
        ze = u.branch[Z];
      ge?.data !== ze?.data && (se = !0),
        ge &&
          ((re = { ...re, ...ge.data }),
          se && (ie.props[`data_${Y}`] = re),
          (Y += 1));
    }
    return (
      (!u.url ||
        v.href !== u.url.href ||
        u.error !== O ||
        (Q !== void 0 && Q !== F.form) ||
        se) &&
        (ie.props.page = {
          error: O,
          params: k,
          route: { id: V?.id ?? null },
          status: g,
          url: new URL(v),
          form: Q ?? null,
          data: se ? re : F.data,
        }),
      ie
    );
  }
  async function Oe({
    loader: v,
    parent: k,
    url: S,
    params: g,
    route: O,
    server_data_node: V,
  }) {
    let Q = null;
    const te = {
        dependencies: new Set(),
        params: new Set(),
        parent: !1,
        route: !1,
        url: !1,
      },
      ie = await v();
    if (ie.universal?.load) {
      let re = function (...Y) {
        for (const ae of Y) {
          const { href: Z } = new URL(ae, S);
          te.dependencies.add(Z);
        }
      };
      const se = {
        route: new Proxy(O, { get: (Y, ae) => ((te.route = !0), Y[ae]) }),
        params: new Proxy(g, { get: (Y, ae) => (te.params.add(ae), Y[ae]) }),
        data: V?.data ?? null,
        url: Ii(S, () => {
          te.url = !0;
        }),
        async fetch(Y, ae) {
          let Z;
          Y instanceof Request
            ? ((Z = Y.url),
              (ae = {
                body:
                  Y.method === 'GET' || Y.method === 'HEAD'
                    ? void 0
                    : await Y.blob(),
                cache: Y.cache,
                credentials: Y.credentials,
                headers: Y.headers,
                integrity: Y.integrity,
                keepalive: Y.keepalive,
                method: Y.method,
                mode: Y.mode,
                redirect: Y.redirect,
                referrer: Y.referrer,
                referrerPolicy: Y.referrerPolicy,
                signal: Y.signal,
                ...ae,
              }))
            : (Z = Y);
          const ge = new URL(Z, S);
          return (
            re(ge.href),
            ge.origin === S.origin && (Z = ge.href.slice(S.origin.length)),
            _ ? Ri(Z, ge.href, ae) : Di(Z, ae)
          );
        },
        setHeaders: () => {},
        depends: re,
        parent() {
          return (te.parent = !0), k();
        },
      };
      (Q = (await ie.universal.load.call(null, se)) ?? null),
        (Q = Q ? await Gi(Q) : null);
    }
    return {
      node: ie,
      loader: v,
      server: V,
      universal: ie.universal?.load
        ? { type: 'data', data: Q, uses: te }
        : null,
      data: Q ?? V?.data ?? null,
      slash: ie.universal?.trailingSlash ?? V?.slash,
    };
  }
  function Ae(v, k, S, g, O) {
    if (N) return !0;
    if (!g) return !1;
    if ((g.parent && v) || (g.route && k) || (g.url && S)) return !0;
    for (const V of g.params) if (O[V] !== u.params[V]) return !0;
    for (const V of g.dependencies) if (s.some((Q) => Q(new URL(V)))) return !0;
    return !1;
  }
  function Pe(v, k) {
    return v?.type === 'data' ? v : v?.type === 'skip' ? k ?? null : null;
  }
  async function Fe({ id: v, invalidating: k, url: S, params: g, route: O }) {
    if (o?.id === v) return o.promise;
    const { errors: V, layouts: Q, leaf: te } = O,
      ie = [...Q, te];
    V.forEach((ve) => ve?.().catch(() => {})),
      ie.forEach((ve) => ve?.[1]().catch(() => {}));
    let re = null;
    const se = u.url ? v !== u.url.pathname + u.url.search : !1,
      Y = u.route ? O.id !== u.route.id : !1;
    let ae = !1;
    const Z = ie.map((ve, Be) => {
      const je = u.branch[Be],
        De =
          !!ve?.[0] &&
          (je?.loader !== ve[1] || Ae(ae, Y, se, je.server?.uses, g));
      return De && (ae = !0), De;
    });
    if (Z.some(Boolean)) {
      try {
        re = await Hn(S, Z);
      } catch (ve) {
        return Ve({
          status: ve instanceof Ot ? ve.status : 500,
          error: await pe(ve, { url: S, params: g, route: { id: O.id } }),
          url: S,
          route: O,
        });
      }
      if (re.type === 'redirect') return re;
    }
    const ge = re?.nodes;
    let ze = !1;
    const $e = ie.map(async (ve, Be) => {
      if (!ve) return;
      const je = u.branch[Be],
        De = ge?.[Be];
      if (
        (!De || De.type === 'skip') &&
        ve[1] === je?.loader &&
        !Ae(ze, Y, se, je.universal?.uses, g)
      )
        return je;
      if (((ze = !0), De?.type === 'error')) throw De;
      return Oe({
        loader: ve[1],
        url: S,
        params: g,
        route: O,
        parent: async () => {
          const on = {};
          for (let cn = 0; cn < Be; cn += 1)
            Object.assign(on, (await $e[cn])?.data);
          return on;
        },
        server_data_node: Pe(
          De === void 0 && ve[0] ? { type: 'skip' } : De ?? null,
          ve[0] ? je?.server : void 0,
        ),
      });
    });
    for (const ve of $e) ve.catch(() => {});
    const Se = [];
    for (let ve = 0; ve < ie.length; ve += 1)
      if (ie[ve])
        try {
          Se.push(await $e[ve]);
        } catch (Be) {
          if (Be instanceof jn)
            return { type: 'redirect', location: Be.location };
          let je = 500,
            De;
          if (ge?.includes(Be)) (je = Be.status ?? je), (De = Be.error);
          else if (Be instanceof Ot) (je = Be.status), (De = Be.body);
          else {
            if (await nt.updated.check()) return await ft(S);
            De = await pe(Be, { params: g, url: S, route: { id: O.id } });
          }
          const Rt = await we(ve, Se, V);
          return Rt
            ? await ke({
                url: S,
                params: g,
                branch: Se.slice(0, Rt.idx).concat(Rt.node),
                status: je,
                error: De,
                route: O,
              })
            : await Je(S, { id: O.id }, De, je);
        }
      else Se.push(void 0);
    return await ke({
      url: S,
      params: g,
      branch: Se,
      status: 200,
      error: null,
      route: O,
      form: k ? void 0 : null,
    });
  }
  async function we(v, k, S) {
    for (; v--; )
      if (S[v]) {
        let g = v;
        for (; !k[g]; ) g -= 1;
        try {
          return {
            idx: g + 1,
            node: {
              node: await S[v](),
              loader: S[v],
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
  async function Ve({ status: v, error: k, url: S, route: g }) {
    const O = {};
    let V = null;
    if (t.server_loads[0] === 0)
      try {
        const re = await Hn(S, [!0]);
        if (re.type !== 'data' || (re.nodes[0] && re.nodes[0].type !== 'data'))
          throw 0;
        V = re.nodes[0] ?? null;
      } catch {
        (S.origin !== Xt || S.pathname !== location.pathname || h) &&
          (await ft(S));
      }
    const te = await Oe({
        loader: r,
        url: S,
        params: O,
        route: g,
        parent: () => Promise.resolve({}),
        server_data_node: Pe(V),
      }),
      ie = {
        node: await i(),
        loader: i,
        universal: null,
        server: null,
        data: null,
      };
    return await ke({
      url: S,
      params: O,
      branch: [te, ie],
      status: v,
      error: k,
      route: null,
    });
  }
  function xe(v, k) {
    if (Ht(v, lt)) return;
    const S = Te(v);
    for (const g of n) {
      const O = g.exec(S);
      if (O)
        return {
          id: v.pathname + v.search,
          invalidating: k,
          route: g,
          params: Ai(O),
          url: v,
        };
    }
  }
  function Te(v) {
    return Ni(v.pathname.slice(lt.length) || '/');
  }
  function Ee({ url: v, type: k, intent: S, delta: g }) {
    let O = !1;
    const V = zn(u, S, v, k);
    g !== void 0 && (V.navigation.delta = g);
    const Q = {
      ...V.navigation,
      cancel: () => {
        (O = !0), V.reject(new Error('navigation was cancelled'));
      },
    };
    return A || c.before_navigate.forEach((te) => te(Q)), O ? null : V;
  }
  async function Ue({
    url: v,
    scroll: k,
    keepfocus: S,
    redirect_count: g,
    details: O,
    type: V,
    delta: Q,
    nav_token: te = {},
    accepted: ie,
    blocked: re,
  }) {
    const se = xe(v, !1),
      Y = Ee({ url: v, type: V, delta: Q, intent: se });
    if (!Y) {
      re();
      return;
    }
    const ae = w;
    ie(), (A = !0), _ && nt.navigating.set(Y.navigation), (z = te);
    let Z = se && (await Fe(se));
    if (!Z) {
      if (Ht(v, lt)) return await ft(v);
      Z = await Je(
        v,
        { id: null },
        await pe(new Error(`Not found: ${v.pathname}`), {
          url: v,
          params: {},
          route: { id: null },
        }),
        404,
      );
    }
    if (((v = se?.url || v), z !== te))
      return Y.reject(new Error('navigation was aborted')), !1;
    if (Z.type === 'redirect')
      if (g >= 20)
        Z = await Ve({
          status: 500,
          error: await pe(new Error('Redirect loop'), {
            url: v,
            params: {},
            route: { id: null },
          }),
          url: v,
          route: { id: null },
        });
      else return H(new URL(Z.location, v).href, {}, g + 1, te), !1;
    else
      Z.props.page?.status >= 400 &&
        (await nt.updated.check()) &&
        (await ft(v));
    if (
      ((s.length = 0),
      (N = !1),
      (b = !0),
      _n(ae),
      B(ae),
      Z.props.page?.url &&
        Z.props.page.url.pathname !== v.pathname &&
        (v.pathname = Z.props.page?.url.pathname),
      O)
    ) {
      const $e = O.replaceState ? 0 : 1;
      if (
        ((O.state[Xe] = w += $e),
        history[O.replaceState ? 'replaceState' : 'pushState'](O.state, '', v),
        !O.replaceState)
      ) {
        let Se = w + 1;
        for (; At[Se] || ct[Se]; ) delete At[Se], delete ct[Se], (Se += 1);
      }
    }
    if (((o = null), _)) {
      (u = Z.state), Z.props.page && (Z.props.page.url = v);
      const $e = (
        await Promise.all(c.on_navigate.map((Se) => Se(Y.navigation)))
      ).filter((Se) => typeof Se == 'function');
      if ($e.length > 0) {
        let Se = function () {
          c.after_navigate = c.after_navigate.filter((ve) => !$e.includes(ve));
        };
        $e.push(Se), c.after_navigate.push(...$e);
      }
      M.$set(Z.props);
    } else de(Z);
    const { activeElement: ge } = document;
    if ((await Lt(), C)) {
      const $e =
        v.hash && document.getElementById(decodeURIComponent(v.hash.slice(1)));
      k ? scrollTo(k.x, k.y) : $e ? $e.scrollIntoView() : scrollTo(0, 0);
    }
    const ze =
      document.activeElement !== ge && document.activeElement !== document.body;
    !S && !ze && mn(),
      (C = !0),
      Z.props.page && (F = Z.props.page),
      (A = !1),
      V === 'popstate' && U(w),
      Y.fulfil(void 0),
      c.after_navigate.forEach(($e) => $e(Y.navigation)),
      nt.navigating.set(null),
      (b = !1);
  }
  async function Je(v, k, S, g) {
    return v.origin === Xt && v.pathname === location.pathname && !h
      ? await Ve({ status: g, error: S, url: v, route: k })
      : await ft(v);
  }
  function be() {
    let v;
    l.addEventListener('mousemove', (V) => {
      const Q = V.target;
      clearTimeout(v),
        (v = setTimeout(() => {
          g(Q, 2);
        }, 20));
    });
    function k(V) {
      g(V.composedPath()[0], 1);
    }
    l.addEventListener('mousedown', k),
      l.addEventListener('touchstart', k, { passive: !0 });
    const S = new IntersectionObserver(
      (V) => {
        for (const Q of V)
          Q.isIntersecting &&
            (ue(Te(new URL(Q.target.href))), S.unobserve(Q.target));
      },
      { threshold: 0 },
    );
    function g(V, Q) {
      const te = Un(V, l);
      if (!te) return;
      const { url: ie, external: re, download: se } = pn(te, lt);
      if (re || se) return;
      const Y = Vt(te);
      if (!Y.reload)
        if (Q <= Y.preload_data) {
          const ae = xe(ie, !1);
          ae && fe(ae);
        } else Q <= Y.preload_code && ue(Te(ie));
    }
    function O() {
      S.disconnect();
      for (const V of l.querySelectorAll('a')) {
        const { url: Q, external: te, download: ie } = pn(V, lt);
        if (te || ie) continue;
        const re = Vt(V);
        re.reload ||
          (re.preload_code === Jt.viewport && S.observe(V),
          re.preload_code === Jt.eager && ue(Te(Q)));
      }
    }
    c.after_navigate.push(O), O();
  }
  function pe(v, k) {
    return v instanceof Ot
      ? v.body
      : t.hooks.handleError({ error: v, event: k }) ?? {
          message: k.route.id != null ? 'Internal Error' : 'Not Found',
        };
  }
  return {
    after_navigate: (v) => {
      Ke(
        () => (
          c.after_navigate.push(v),
          () => {
            const k = c.after_navigate.indexOf(v);
            c.after_navigate.splice(k, 1);
          }
        ),
      );
    },
    before_navigate: (v) => {
      Ke(
        () => (
          c.before_navigate.push(v),
          () => {
            const k = c.before_navigate.indexOf(v);
            c.before_navigate.splice(k, 1);
          }
        ),
      );
    },
    on_navigate: (v) => {
      Ke(
        () => (
          c.on_navigate.push(v),
          () => {
            const k = c.on_navigate.indexOf(v);
            c.on_navigate.splice(k, 1);
          }
        ),
      );
    },
    disable_scroll_handling: () => {
      (b || !_) && (C = !1);
    },
    goto: (v, k = {}) => H(v, k, 0),
    invalidate: (v) => {
      if (typeof v == 'function') s.push(v);
      else {
        const { href: k } = new URL(v, location.href);
        s.push((S) => S.href === k);
      }
      return D();
    },
    invalidate_all: () => ((N = !0), D()),
    preload_data: async (v) => {
      const k = new URL(v, Mn(document)),
        S = xe(k, !1);
      if (!S)
        throw new Error(
          `Attempted to preload a URL that does not belong to this app: ${k}`,
        );
      await fe(S);
    },
    preload_code: ue,
    apply_action: async (v) => {
      if (v.type === 'error') {
        const k = new URL(location.href),
          { branch: S, route: g } = u;
        if (!g) return;
        const O = await we(u.branch.length, S, g.errors);
        if (O) {
          const V = await ke({
            url: k,
            params: u.params,
            branch: S.slice(0, O.idx).concat(O.node),
            status: v.status ?? 500,
            error: v.error,
            route: g,
          });
          (u = V.state), M.$set(V.props), Lt().then(mn);
        }
      } else
        v.type === 'redirect'
          ? H(v.location, { invalidateAll: !0 }, 0)
          : (M.$set({
              form: null,
              page: { ...F, form: v.data, status: v.status },
            }),
            await Lt(),
            M.$set({ form: v.data }),
            v.type === 'success' && mn());
    },
    _start_router: () => {
      (history.scrollRestoration = 'manual'),
        addEventListener('beforeunload', (k) => {
          let S = !1;
          if ((K(), !A)) {
            const g = zn(u, void 0, null, 'leave'),
              O = {
                ...g.navigation,
                cancel: () => {
                  (S = !0), g.reject(new Error('navigation was cancelled'));
                },
              };
            c.before_navigate.forEach((V) => V(O));
          }
          S
            ? (k.preventDefault(), (k.returnValue = ''))
            : (history.scrollRestoration = 'auto');
        }),
        addEventListener('visibilitychange', () => {
          document.visibilityState === 'hidden' && K();
        }),
        navigator.connection?.saveData || be(),
        l.addEventListener('click', (k) => {
          if (
            k.button ||
            k.which !== 1 ||
            k.metaKey ||
            k.ctrlKey ||
            k.shiftKey ||
            k.altKey ||
            k.defaultPrevented
          )
            return;
          const S = Un(k.composedPath()[0], l);
          if (!S) return;
          const { url: g, external: O, target: V, download: Q } = pn(S, lt);
          if (!g) return;
          if (V === '_parent' || V === '_top') {
            if (window.parent !== window) return;
          } else if (V && V !== '_self') return;
          const te = Vt(S);
          if (
            (!(S instanceof SVGAElement) &&
              g.protocol !== location.protocol &&
              !(g.protocol === 'https:' || g.protocol === 'http:')) ||
            Q
          )
            return;
          if (O || te.reload) {
            Ee({ url: g, type: 'link' }) ? (A = !0) : k.preventDefault();
            return;
          }
          const [re, se] = g.href.split('#');
          if (se !== void 0 && re === location.href.split('#')[0]) {
            if (u.url.hash === g.hash) {
              k.preventDefault(),
                S.ownerDocument.getElementById(se)?.scrollIntoView();
              return;
            }
            if (((m = !0), _n(w), v(g), !te.replace_state)) return;
            (m = !1), k.preventDefault();
          }
          Ue({
            url: g,
            scroll: te.noscroll ? It() : null,
            keepfocus: te.keep_focus ?? !1,
            redirect_count: 0,
            details: {
              state: {},
              replaceState: te.replace_state ?? g.href === location.href,
            },
            accepted: () => k.preventDefault(),
            blocked: () => k.preventDefault(),
            type: 'link',
          });
        }),
        l.addEventListener('submit', (k) => {
          if (k.defaultPrevented) return;
          const S = HTMLFormElement.prototype.cloneNode.call(k.target),
            g = k.submitter;
          if ((g?.formMethod || S.method) !== 'get') return;
          const V = new URL(
            (g?.hasAttribute('formaction') && g?.formAction) || S.action,
          );
          if (Ht(V, lt)) return;
          const Q = k.target,
            {
              keep_focus: te,
              noscroll: ie,
              reload: re,
              replace_state: se,
            } = Vt(Q);
          if (re) return;
          k.preventDefault(), k.stopPropagation();
          const Y = new FormData(Q),
            ae = g?.getAttribute('name');
          ae && Y.append(ae, g?.getAttribute('value') ?? ''),
            (V.search = new URLSearchParams(Y).toString()),
            Ue({
              url: V,
              scroll: ie ? It() : null,
              keepfocus: te ?? !1,
              redirect_count: 0,
              details: {
                state: {},
                replaceState: se ?? V.href === location.href,
              },
              nav_token: {},
              accepted: () => {},
              blocked: () => {},
              type: 'form',
            });
        }),
        addEventListener('popstate', async (k) => {
          if (((z = {}), k.state?.[Xe])) {
            if (k.state[Xe] === w) return;
            const S = ct[k.state[Xe]],
              g = new URL(location.href);
            if (u.url.href.split('#')[0] === location.href.split('#')[0]) {
              v(g), (ct[w] = It()), (w = k.state[Xe]), scrollTo(S.x, S.y);
              return;
            }
            const O = k.state[Xe] - w;
            await Ue({
              url: g,
              scroll: S,
              keepfocus: !1,
              redirect_count: 0,
              details: null,
              accepted: () => {
                w = k.state[Xe];
              },
              blocked: () => {
                history.go(-O);
              },
              type: 'popstate',
              delta: O,
              nav_token: z,
            });
          } else if (!m) {
            const S = new URL(location.href);
            v(S);
          }
        }),
        addEventListener('hashchange', () => {
          m &&
            ((m = !1),
            history.replaceState(
              { ...history.state, [Xe]: ++w },
              '',
              location.href,
            ));
        });
      for (const k of document.querySelectorAll('link'))
        k.rel === 'icon' && (k.href = k.href);
      addEventListener('pageshow', (k) => {
        k.persisted && nt.navigating.set(null);
      });
      function v(k) {
        (u.url = k), nt.page.set({ ...F, url: k }), nt.page.notify();
      }
    },
    _hydrate: async ({
      status: v = 200,
      error: k,
      node_ids: S,
      params: g,
      route: O,
      data: V,
      form: Q,
    }) => {
      h = !0;
      const te = new URL(location.href);
      ({ params: g = {}, route: O = { id: null } } = xe(te, !1) || {});
      let ie;
      try {
        const re = S.map(async (ae, Z) => {
            const ge = V[Z];
            return (
              ge?.uses && (ge.uses = Hr(ge.uses)),
              Oe({
                loader: t.nodes[ae],
                url: te,
                params: g,
                route: O,
                parent: async () => {
                  const ze = {};
                  for (let $e = 0; $e < Z; $e += 1)
                    Object.assign(ze, (await re[$e]).data);
                  return ze;
                },
                server_data_node: Pe(ge),
              })
            );
          }),
          se = await Promise.all(re),
          Y = n.find(({ id: ae }) => ae === O.id);
        if (Y) {
          const ae = Y.layouts;
          for (let Z = 0; Z < ae.length; Z++) ae[Z] || se.splice(Z, 0, void 0);
        }
        ie = await ke({
          url: te,
          params: g,
          branch: se,
          status: v,
          error: k,
          form: Q,
          route: Y ?? null,
        });
      } catch (re) {
        if (re instanceof jn) {
          await ft(new URL(re.location, location.href));
          return;
        }
        ie = await Ve({
          status: re instanceof Ot ? re.status : 500,
          error: await pe(re, { url: te, params: g, route: O }),
          url: te,
          route: O,
        });
      }
      de(ie);
    },
  };
}
async function Hn(t, e) {
  const n = new URL(t);
  (n.pathname = Fi(t.pathname)),
    t.pathname.endsWith('/') && n.searchParams.append(Xi, '1'),
    n.searchParams.append(Ji, e.map((i) => (i ? '1' : '0')).join(''));
  const r = await Br(n.href);
  if (
    (r.headers.get('content-type')?.includes('text/html') && (await ft(t)),
    !r.ok)
  )
    throw new Ot(r.status, await r.json());
  return new Promise(async (i) => {
    const l = new Map(),
      s = r.body.getReader(),
      a = new TextDecoder();
    function o(u) {
      return ni(u, {
        Promise: (h) =>
          new Promise((_, C) => {
            l.set(h, { fulfil: _, reject: C });
          }),
      });
    }
    let c = '';
    for (;;) {
      const { done: u, value: h } = await s.read();
      if (u && !c) break;
      for (
        c +=
          !h && c
            ? `
`
            : a.decode(h);
        ;

      ) {
        const _ = c.indexOf(`
`);
        if (_ === -1) break;
        const C = JSON.parse(c.slice(0, _));
        if (((c = c.slice(_ + 1)), C.type === 'redirect')) return i(C);
        if (C.type === 'data')
          C.nodes?.forEach((b) => {
            b?.type === 'data' && ((b.uses = Hr(b.uses)), (b.data = o(b.data)));
          }),
            i(C);
        else if (C.type === 'chunk') {
          const { id: b, data: A, error: m } = C,
            N = l.get(b);
          l.delete(b), m ? N.reject(o(m)) : N.fulfil(o(A));
        }
      }
    }
  });
}
function Hr(t) {
  return {
    dependencies: new Set(t?.dependencies ?? []),
    params: new Set(t?.params ?? []),
    parent: !!t?.parent,
    route: !!t?.route,
    url: !!t?.url,
  };
}
function mn() {
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
    const r = getSelection();
    if (r && r.type !== 'None') {
      const i = [];
      for (let l = 0; l < r.rangeCount; l += 1) i.push(r.getRangeAt(l));
      setTimeout(() => {
        if (r.rangeCount === i.length) {
          for (let l = 0; l < r.rangeCount; l += 1) {
            const s = i[l],
              a = r.getRangeAt(l);
            if (
              s.commonAncestorContainer !== a.commonAncestorContainer ||
              s.startContainer !== a.startContainer ||
              s.endContainer !== a.endContainer ||
              s.startOffset !== a.startOffset ||
              s.endOffset !== a.endOffset
            )
              return;
          }
          r.removeAllRanges();
        }
      });
    }
  }
}
function zn(t, e, n, r) {
  let i, l;
  const s = new Promise((o, c) => {
    (i = o), (l = c);
  });
  return (
    s.catch(() => {}),
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
        type: r,
        complete: s,
      },
      fulfil: i,
      reject: l,
    }
  );
}
async function ko(t, e, n) {
  const r = es(t, e);
  Qi({ client: r }),
    n ? await r._hydrate(n) : r.goto(location.href, { replaceState: !0 }),
    r._start_router();
}
const ts = 'modulepreload',
  ns = function (t, e) {
    return new URL(t, e).href;
  },
  qn = {},
  St = function (e, n, r) {
    if (!n || n.length === 0) return e();
    const i = document.getElementsByTagName('link');
    return Promise.all(
      n.map((l) => {
        if (((l = ns(l, r)), l in qn)) return;
        qn[l] = !0;
        const s = l.endsWith('.css'),
          a = s ? '[rel="stylesheet"]' : '';
        if (!!r)
          for (let u = i.length - 1; u >= 0; u--) {
            const h = i[u];
            if (h.href === l && (!s || h.rel === 'stylesheet')) return;
          }
        else if (document.querySelector(`link[href="${l}"]${a}`)) return;
        const c = document.createElement('link');
        if (
          ((c.rel = s ? 'stylesheet' : ts),
          s || ((c.as = 'script'), (c.crossOrigin = '')),
          (c.href = l),
          document.head.appendChild(c),
          s)
        )
          return new Promise((u, h) => {
            c.addEventListener('load', u),
              c.addEventListener('error', () =>
                h(new Error(`Unable to preload CSS for ${l}`)),
              );
          });
      }),
    )
      .then(() => e())
      .catch((l) => {
        const s = new Event('vite:preloadError', { cancelable: !0 });
        if (((s.payload = l), window.dispatchEvent(s), !s.defaultPrevented))
          throw l;
      });
  },
  Eo = {};
typeof window < 'u' &&
  (window.__svelte || (window.__svelte = { v: new Set() })).v.add(Ti);
function rs(t) {
  let e, n, r;
  var i = t[1][0];
  function l(s, a) {
    return { props: { data: s[3], form: s[2] } };
  }
  return (
    i && ((e = tt(i, l(t))), t[12](e)),
    {
      c() {
        e && J(e.$$.fragment), (n = me());
      },
      l(s) {
        e && X(e.$$.fragment, s), (n = me());
      },
      m(s, a) {
        e && W(e, s, a), P(s, n, a), (r = !0);
      },
      p(s, a) {
        if (a & 2 && i !== (i = s[1][0])) {
          if (e) {
            ye();
            const o = e;
            I(o.$$.fragment, 1, 0, () => {
              G(o, 1);
            }),
              Ce();
          }
          i
            ? ((e = tt(i, l(s))),
              s[12](e),
              J(e.$$.fragment),
              T(e.$$.fragment, 1),
              W(e, n.parentNode, n))
            : (e = null);
        } else if (i) {
          const o = {};
          a & 8 && (o.data = s[3]), a & 4 && (o.form = s[2]), e.$set(o);
        }
      },
      i(s) {
        r || (e && T(e.$$.fragment, s), (r = !0));
      },
      o(s) {
        e && I(e.$$.fragment, s), (r = !1);
      },
      d(s) {
        s && d(n), t[12](null), e && G(e, s);
      },
    }
  );
}
function is(t) {
  let e, n, r;
  var i = t[1][0];
  function l(s, a) {
    return {
      props: { data: s[3], $$slots: { default: [ss] }, $$scope: { ctx: s } },
    };
  }
  return (
    i && ((e = tt(i, l(t))), t[11](e)),
    {
      c() {
        e && J(e.$$.fragment), (n = me());
      },
      l(s) {
        e && X(e.$$.fragment, s), (n = me());
      },
      m(s, a) {
        e && W(e, s, a), P(s, n, a), (r = !0);
      },
      p(s, a) {
        if (a & 2 && i !== (i = s[1][0])) {
          if (e) {
            ye();
            const o = e;
            I(o.$$.fragment, 1, 0, () => {
              G(o, 1);
            }),
              Ce();
          }
          i
            ? ((e = tt(i, l(s))),
              s[11](e),
              J(e.$$.fragment),
              T(e.$$.fragment, 1),
              W(e, n.parentNode, n))
            : (e = null);
        } else if (i) {
          const o = {};
          a & 8 && (o.data = s[3]),
            a & 8215 && (o.$$scope = { dirty: a, ctx: s }),
            e.$set(o);
        }
      },
      i(s) {
        r || (e && T(e.$$.fragment, s), (r = !0));
      },
      o(s) {
        e && I(e.$$.fragment, s), (r = !1);
      },
      d(s) {
        s && d(n), t[11](null), e && G(e, s);
      },
    }
  );
}
function ss(t) {
  let e, n, r;
  var i = t[1][1];
  function l(s, a) {
    return { props: { data: s[4], form: s[2] } };
  }
  return (
    i && ((e = tt(i, l(t))), t[10](e)),
    {
      c() {
        e && J(e.$$.fragment), (n = me());
      },
      l(s) {
        e && X(e.$$.fragment, s), (n = me());
      },
      m(s, a) {
        e && W(e, s, a), P(s, n, a), (r = !0);
      },
      p(s, a) {
        if (a & 2 && i !== (i = s[1][1])) {
          if (e) {
            ye();
            const o = e;
            I(o.$$.fragment, 1, 0, () => {
              G(o, 1);
            }),
              Ce();
          }
          i
            ? ((e = tt(i, l(s))),
              s[10](e),
              J(e.$$.fragment),
              T(e.$$.fragment, 1),
              W(e, n.parentNode, n))
            : (e = null);
        } else if (i) {
          const o = {};
          a & 16 && (o.data = s[4]), a & 4 && (o.form = s[2]), e.$set(o);
        }
      },
      i(s) {
        r || (e && T(e.$$.fragment, s), (r = !0));
      },
      o(s) {
        e && I(e.$$.fragment, s), (r = !1);
      },
      d(s) {
        s && d(n), t[10](null), e && G(e, s);
      },
    }
  );
}
function Kn(t) {
  let e,
    n = t[6] && Zn(t);
  return {
    c() {
      (e = $('div')), n && n.c(), this.h();
    },
    l(r) {
      e = E(r, 'DIV', {
        id: !0,
        'aria-live': !0,
        'aria-atomic': !0,
        style: !0,
      });
      var i = y(e);
      n && n.l(i), i.forEach(d), this.h();
    },
    h() {
      f(e, 'id', 'svelte-announcer'),
        f(e, 'aria-live', 'assertive'),
        f(e, 'aria-atomic', 'true'),
        He(e, 'position', 'absolute'),
        He(e, 'left', '0'),
        He(e, 'top', '0'),
        He(e, 'clip', 'rect(0 0 0 0)'),
        He(e, 'clip-path', 'inset(50%)'),
        He(e, 'overflow', 'hidden'),
        He(e, 'white-space', 'nowrap'),
        He(e, 'width', '1px'),
        He(e, 'height', '1px');
    },
    m(r, i) {
      P(r, e, i), n && n.m(e, null);
    },
    p(r, i) {
      r[6]
        ? n
          ? n.p(r, i)
          : ((n = Zn(r)), n.c(), n.m(e, null))
        : n && (n.d(1), (n = null));
    },
    d(r) {
      r && d(e), n && n.d();
    },
  };
}
function Zn(t) {
  let e;
  return {
    c() {
      e = Ie(t[7]);
    },
    l(n) {
      e = Re(n, t[7]);
    },
    m(n, r) {
      P(n, e, r);
    },
    p(n, r) {
      r & 128 && et(e, n[7]);
    },
    d(n) {
      n && d(e);
    },
  };
}
function ls(t) {
  let e, n, r, i, l;
  const s = [is, rs],
    a = [];
  function o(u, h) {
    return u[1][1] ? 0 : 1;
  }
  (e = o(t)), (n = a[e] = s[e](t));
  let c = t[5] && Kn(t);
  return {
    c() {
      n.c(), (r = L()), c && c.c(), (i = me());
    },
    l(u) {
      n.l(u), (r = j(u)), c && c.l(u), (i = me());
    },
    m(u, h) {
      a[e].m(u, h), P(u, r, h), c && c.m(u, h), P(u, i, h), (l = !0);
    },
    p(u, [h]) {
      let _ = e;
      (e = o(u)),
        e === _
          ? a[e].p(u, h)
          : (ye(),
            I(a[_], 1, 1, () => {
              a[_] = null;
            }),
            Ce(),
            (n = a[e]),
            n ? n.p(u, h) : ((n = a[e] = s[e](u)), n.c()),
            T(n, 1),
            n.m(r.parentNode, r)),
        u[5]
          ? c
            ? c.p(u, h)
            : ((c = Kn(u)), c.c(), c.m(i.parentNode, i))
          : c && (c.d(1), (c = null));
    },
    i(u) {
      l || (T(n), (l = !0));
    },
    o(u) {
      I(n), (l = !1);
    },
    d(u) {
      u && (d(r), d(i)), a[e].d(u), c && c.d(u);
    },
  };
}
function as(t, e, n) {
  let { stores: r } = e,
    { page: i } = e,
    { constructors: l } = e,
    { components: s = [] } = e,
    { form: a } = e,
    { data_0: o = null } = e,
    { data_1: c = null } = e;
  wi(r.page.notify);
  let u = !1,
    h = !1,
    _ = null;
  Ke(() => {
    const m = r.page.subscribe(() => {
      u &&
        (n(6, (h = !0)),
        Lt().then(() => {
          n(7, (_ = document.title || 'untitled page'));
        }));
    });
    return n(5, (u = !0)), m;
  });
  function C(m) {
    wt[m ? 'unshift' : 'push'](() => {
      (s[1] = m), n(0, s);
    });
  }
  function b(m) {
    wt[m ? 'unshift' : 'push'](() => {
      (s[0] = m), n(0, s);
    });
  }
  function A(m) {
    wt[m ? 'unshift' : 'push'](() => {
      (s[0] = m), n(0, s);
    });
  }
  return (
    (t.$$set = (m) => {
      'stores' in m && n(8, (r = m.stores)),
        'page' in m && n(9, (i = m.page)),
        'constructors' in m && n(1, (l = m.constructors)),
        'components' in m && n(0, (s = m.components)),
        'form' in m && n(2, (a = m.form)),
        'data_0' in m && n(3, (o = m.data_0)),
        'data_1' in m && n(4, (c = m.data_1));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 768 && r.page.set(i);
    }),
    [s, l, a, o, c, u, h, _, r, i, C, b, A]
  );
}
class To extends ce {
  constructor(e) {
    super(),
      oe(this, e, as, ls, le, {
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
const xo = [
    () => St(() => Promise.resolve().then(() => us), void 0, import.meta.url),
    () => St(() => Promise.resolve().then(() => ms), void 0, import.meta.url),
    () => St(() => Promise.resolve().then(() => Ha), void 0, import.meta.url),
    () => St(() => Promise.resolve().then(() => Ja), void 0, import.meta.url),
    () => St(() => Promise.resolve().then(() => yo), void 0, import.meta.url),
  ],
  No = [],
  Ao = { '/': [2], '/profile': [3], '/whitepaper': [4] },
  So = {
    handleError: ({ error: t }) => {
      console.error(t);
    },
  };
function os(t) {
  let e;
  const n = t[1].default,
    r = Ct(n, t, t[0], null);
  return {
    c() {
      r && r.c();
    },
    l(i) {
      r && r.l(i);
    },
    m(i, l) {
      r && r.m(i, l), (e = !0);
    },
    p(i, [l]) {
      r &&
        r.p &&
        (!e || l & 1) &&
        kt(r, n, i, i[0], e ? $t(n, i[0], l, null) : Et(i[0]), null);
    },
    i(i) {
      e || (T(r, i), (e = !0));
    },
    o(i) {
      I(r, i), (e = !1);
    },
    d(i) {
      r && r.d(i);
    },
  };
}
function cs(t, e, n) {
  let { $$slots: r = {}, $$scope: i } = e;
  return (
    (t.$$set = (l) => {
      '$$scope' in l && n(0, (i = l.$$scope));
    }),
    [i, r]
  );
}
let fs = class extends ce {
  constructor(e) {
    super(), oe(this, e, cs, os, le, {});
  }
};
const us = Object.freeze(
    Object.defineProperty(
      { __proto__: null, component: fs },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  ds = () => {
    const t = nt;
    return {
      page: { subscribe: t.page.subscribe },
      navigating: { subscribe: t.navigating.subscribe },
      updated: t.updated,
    };
  },
  Nn = {
    subscribe(t) {
      return ds().page.subscribe(t);
    },
  };
function hs(t) {
  let e,
    n = t[0].status + '',
    r,
    i,
    l,
    s = t[0].error?.message + '',
    a;
  return {
    c() {
      (e = $('h1')), (r = Ie(n)), (i = L()), (l = $('p')), (a = Ie(s));
    },
    l(o) {
      e = E(o, 'H1', {});
      var c = y(e);
      (r = Re(c, n)), c.forEach(d), (i = j(o)), (l = E(o, 'P', {}));
      var u = y(l);
      (a = Re(u, s)), u.forEach(d);
    },
    m(o, c) {
      P(o, e, c), p(e, r), P(o, i, c), P(o, l, c), p(l, a);
    },
    p(o, [c]) {
      c & 1 && n !== (n = o[0].status + '') && et(r, n),
        c & 1 && s !== (s = o[0].error?.message + '') && et(a, s);
    },
    i: q,
    o: q,
    d(o) {
      o && (d(e), d(i), d(l));
    },
  };
}
function ps(t, e, n) {
  let r;
  return Me(t, Nn, (i) => n(0, (r = i))), [r];
}
let _s = class extends ce {
  constructor(e) {
    super(), oe(this, e, ps, hs, le, {});
  }
};
const ms = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: _s },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
const ht = 20,
  gs = {
    close: 'Close',
    back: 'Back',
    menu: 'Open menu to access navigation options',
    collapse: 'Collapse',
    expand: 'Expand',
    copy: 'Copy to clipboard',
  },
  vs = { switch_theme: 'Switch theme' },
  bs = { completed: 'Completed', in_progress: 'In progress' },
  ws = { core: gs, theme: vs, progress: bs },
  rn = Rr({ lang: 'en', ...ws });
function ys(t) {
  const e = t - 1;
  return e * e * e + 1;
}
function it(t, { delay: e = 0, duration: n = 400, easing: r = Yt } = {}) {
  const i = +getComputedStyle(t).opacity;
  return { delay: e, duration: n, easing: r, css: (l) => `opacity: ${l * i}` };
}
function Cs(
  t,
  {
    delay: e = 0,
    duration: n = 400,
    easing: r = ys,
    x: i = 0,
    y: l = 0,
    opacity: s = 0,
  } = {},
) {
  const a = getComputedStyle(t),
    o = +a.opacity,
    c = a.transform === 'none' ? '' : a.transform,
    u = o * (1 - s),
    [h, _] = Pn(i),
    [C, b] = Pn(l);
  return {
    delay: e,
    duration: n,
    easing: r,
    css: (A, m) => `
			transform: ${c} translate(${(1 - A) * h}${_}, ${(1 - A) * C}${b});
			opacity: ${o - u * m}`,
  };
}
const $s = ({ $event: { code: t }, callback: e }) => {
  ['Enter', 'Space'].includes(t) && e();
};
function ks(t) {
  let e, n, r, i, l, s, a;
  return {
    c() {
      (e = $('div')), this.h();
    },
    l(o) {
      (e = E(o, 'DIV', {
        role: !0,
        tabindex: !0,
        'aria-label': !0,
        class: !0,
        'data-tid': !0,
      })),
        y(e).forEach(d),
        this.h();
    },
    h() {
      f(e, 'role', 'button'),
        f(e, 'tabindex', '-1'),
        f(e, 'aria-label', (n = t[1].core.close)),
        f(e, 'class', 'backdrop svelte-whxjdd'),
        f(e, 'data-tid', 'backdrop'),
        Le(e, 'disablePointerEvents', t[0]);
    },
    m(o, c) {
      P(o, e, c),
        (l = !0),
        s ||
          ((a = [_e(e, 'click', tn(t[2])), _e(e, 'keypress', t[3])]), (s = !0));
    },
    p(o, [c]) {
      (t = o),
        (!l || (c & 2 && n !== (n = t[1].core.close))) && f(e, 'aria-label', n),
        (!l || c & 1) && Le(e, 'disablePointerEvents', t[0]);
    },
    i(o) {
      l ||
        (We(() => {
          l && (i && i.end(1), (r = En(e, it, { duration: Es })), r.start());
        }),
        (l = !0));
    },
    o(o) {
      r && r.invalidate(), (i = Tn(e, it, { duration: Ts })), (l = !1);
    },
    d(o) {
      o && d(e), o && i && i.end(), (s = !1), Ne(a);
    },
  };
}
const Es = 75,
  Ts = 250;
function xs(t, e, n) {
  let r;
  Me(t, rn, (o) => n(1, (r = o)));
  let { disablePointerEvents: i = !1 } = e;
  const l = Ir(),
    s = () => l('nnsClose'),
    a = (o) => $s({ $event: o, callback: s });
  return (
    (t.$$set = (o) => {
      'disablePointerEvents' in o && n(0, (i = o.disablePointerEvents));
    }),
    [i, r, s, a]
  );
}
class Ns extends ce {
  constructor(e) {
    super(), oe(this, e, xs, ks, le, { disablePointerEvents: 0 });
  }
}
var Po =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
    ? window
    : typeof global < 'u'
    ? global
    : typeof self < 'u'
    ? self
    : {};
function Fo(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default')
    ? t.default
    : t;
}
function As(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == 'function') {
    var n = function r() {
      return this instanceof r
        ? Reflect.construct(e, arguments, this.constructor)
        : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else n = {};
  return (
    Object.defineProperty(n, '__esModule', { value: !0 }),
    Object.keys(t).forEach(function (r) {
      var i = Object.getOwnPropertyDescriptor(t, r);
      Object.defineProperty(
        n,
        r,
        i.get
          ? i
          : {
              enumerable: !0,
              get: function () {
                return t[r];
              },
            },
      );
    }),
    n
  );
}
const Ss = Ge(0);
const Is = () => {
    const t = [],
      { subscribe: e, update: n, set: r } = Ge(t);
    return {
      subscribe: e,
      startBusy({ initiator: i, text: l }) {
        n((s) => [
          ...s.filter(({ initiator: a }) => i !== a),
          { initiator: i, text: l },
        ]);
      },
      stopBusy(i) {
        n((l) => l.filter(({ initiator: s }) => s !== i));
      },
      resetForTesting() {
        r(t);
      },
    };
  },
  Tt = Is(),
  Os = xt(Tt, (t) => t.length > 0),
  Ps = xt(Tt, (t) => t.reverse().find(({ text: e }) => qe(e))?.text);
function Fs(t) {
  let e, n, r;
  return {
    c() {
      (e = ee('svg')), (n = ee('circle')), this.h();
    },
    l(i) {
      e = ne(i, 'svg', {
        class: !0,
        preserveAspectRatio: !0,
        focusable: !0,
        'aria-hidden': !0,
        'data-tid': !0,
        viewBox: !0,
      });
      var l = y(e);
      (n = ne(l, 'circle', { cx: !0, cy: !0, r: !0, class: !0 })),
        y(n).forEach(d),
        l.forEach(d),
        this.h();
    },
    h() {
      f(n, 'cx', '50%'),
        f(n, 'cy', '50%'),
        f(n, 'r', '45'),
        f(n, 'class', 'svelte-85668t'),
        f(e, 'class', (r = ot(t[1]) + ' svelte-85668t')),
        f(e, 'preserveAspectRatio', 'xMidYMid meet'),
        f(e, 'focusable', 'false'),
        f(e, 'aria-hidden', 'true'),
        f(e, 'data-tid', 'spinner'),
        f(e, 'viewBox', '0 0 100 100'),
        Le(e, 'inline', t[0]);
    },
    m(i, l) {
      P(i, e, l), p(e, n);
    },
    p(i, [l]) {
      l & 2 && r !== (r = ot(i[1]) + ' svelte-85668t') && f(e, 'class', r),
        l & 3 && Le(e, 'inline', i[0]);
    },
    i: q,
    o: q,
    d(i) {
      i && d(e);
    },
  };
}
function Bs(t, e, n) {
  let { inline: r = !1 } = e,
    { size: i = 'medium' } = e;
  return (
    (t.$$set = (l) => {
      'inline' in l && n(0, (r = l.inline)), 'size' in l && n(1, (i = l.size));
    }),
    [r, i]
  );
}
class An extends ce {
  constructor(e) {
    super(), oe(this, e, Bs, Fs, le, { inline: 0, size: 1 });
  }
}
function Wn(t) {
  let e,
    n,
    r = qe(t[1]),
    i,
    l,
    s,
    a,
    o,
    c = r && Gn(t);
  return (
    (s = new An({ props: { inline: !0 } })),
    {
      c() {
        (e = $('div')),
          (n = $('div')),
          c && c.c(),
          (i = L()),
          (l = $('span')),
          J(s.$$.fragment),
          this.h();
      },
      l(u) {
        e = E(u, 'DIV', { 'data-tid': !0, class: !0 });
        var h = y(e);
        n = E(h, 'DIV', { class: !0 });
        var _ = y(n);
        c && c.l(_), (i = j(_)), (l = E(_, 'SPAN', {}));
        var C = y(l);
        X(s.$$.fragment, C), C.forEach(d), _.forEach(d), h.forEach(d), this.h();
      },
      h() {
        f(n, 'class', 'content svelte-14plyno'),
          f(e, 'data-tid', 'busy'),
          f(e, 'class', 'svelte-14plyno');
      },
      m(u, h) {
        P(u, e, h),
          p(e, n),
          c && c.m(n, null),
          p(n, i),
          p(n, l),
          W(s, l, null),
          (o = !0);
      },
      p(u, h) {
        h & 2 && (r = qe(u[1])),
          r
            ? c
              ? c.p(u, h)
              : ((c = Gn(u)), c.c(), c.m(n, i))
            : c && (c.d(1), (c = null));
      },
      i(u) {
        o ||
          (T(s.$$.fragment, u),
          We(() => {
            o && (a || (a = Gt(e, it, {}, !0)), a.run(1));
          }),
          (o = !0));
      },
      o(u) {
        I(s.$$.fragment, u), a || (a = Gt(e, it, {}, !1)), a.run(0), (o = !1);
      },
      d(u) {
        u && d(e), c && c.d(), G(s), u && a && a.end();
      },
    }
  );
}
function Gn(t) {
  let e, n;
  return {
    c() {
      (e = $('p')), (n = Ie(t[1])), this.h();
    },
    l(r) {
      e = E(r, 'P', { class: !0 });
      var i = y(e);
      (n = Re(i, t[1])), i.forEach(d), this.h();
    },
    h() {
      f(e, 'class', 'svelte-14plyno');
    },
    m(r, i) {
      P(r, e, i), p(e, n);
    },
    p(r, i) {
      i & 2 && et(n, r[1]);
    },
    d(r) {
      r && d(e);
    },
  };
}
function Ds(t) {
  let e,
    n,
    r = t[0] && Wn(t);
  return {
    c() {
      r && r.c(), (e = me());
    },
    l(i) {
      r && r.l(i), (e = me());
    },
    m(i, l) {
      r && r.m(i, l), P(i, e, l), (n = !0);
    },
    p(i, [l]) {
      i[0]
        ? r
          ? (r.p(i, l), l & 1 && T(r, 1))
          : ((r = Wn(i)), r.c(), T(r, 1), r.m(e.parentNode, e))
        : r &&
          (ye(),
          I(r, 1, 1, () => {
            r = null;
          }),
          Ce());
    },
    i(i) {
      n || (T(r), (n = !0));
    },
    o(i) {
      I(r), (n = !1);
    },
    d(i) {
      i && d(e), r && r.d(i);
    },
  };
}
function Rs(t, e, n) {
  let r, i;
  return (
    Me(t, Os, (l) => n(0, (r = l))), Me(t, Ps, (l) => n(1, (i = l))), [r, i]
  );
}
class Ms extends ce {
  constructor(e) {
    super(), oe(this, e, Rs, Ds, le, {});
  }
}
function Vs(t) {
  let e, n, r, i;
  return {
    c() {
      (e = ee('svg')),
        (n = ee('rect')),
        (r = ee('path')),
        (i = ee('rect')),
        this.h();
    },
    l(l) {
      e = ne(l, 'svg', {
        width: !0,
        height: !0,
        viewBox: !0,
        fill: !0,
        xmlns: !0,
      });
      var s = y(e);
      (n = ne(s, 'rect', {
        x: !0,
        y: !0,
        width: !0,
        height: !0,
        rx: !0,
        fill: !0,
      })),
        y(n).forEach(d),
        (r = ne(s, 'path', {
          d: !0,
          stroke: !0,
          'stroke-width': !0,
          'stroke-linecap': !0,
          'stroke-linejoin': !0,
        })),
        y(r).forEach(d),
        (i = ne(s, 'rect', {
          x: !0,
          y: !0,
          width: !0,
          height: !0,
          rx: !0,
          stroke: !0,
          'stroke-width': !0,
        })),
        y(i).forEach(d),
        s.forEach(d),
        this.h();
    },
    h() {
      f(n, 'x', '1.25'),
        f(n, 'y', '1.25'),
        f(n, 'width', '21.5'),
        f(n, 'height', '21.5'),
        f(n, 'rx', '10.75'),
        f(n, 'fill', 'var(--icon-check-circle-background, transparent)'),
        f(r, 'd', 'M7 11L11 15L17 9'),
        f(r, 'stroke', 'var(--icon-check-circle-color, currentColor)'),
        f(r, 'stroke-width', '1.5'),
        f(r, 'stroke-linecap', 'round'),
        f(r, 'stroke-linejoin', 'round'),
        f(i, 'x', '1.25'),
        f(i, 'y', '1.25'),
        f(i, 'width', '21.5'),
        f(i, 'height', '21.5'),
        f(i, 'rx', '10.75'),
        f(i, 'stroke', 'var(--icon-check-circle-background, currentColor)'),
        f(i, 'stroke-width', '1.5'),
        f(e, 'width', t[0]),
        f(e, 'height', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'fill', 'none'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg');
    },
    m(l, s) {
      P(l, e, s), p(e, n), p(e, r), p(e, i);
    },
    p(l, [s]) {
      s & 1 && f(e, 'width', l[0]), s & 1 && f(e, 'height', l[0]);
    },
    i: q,
    o: q,
    d(l) {
      l && d(e);
    },
  };
}
function Us(t, e, n) {
  let { size: r = '24px' } = e;
  return (
    (t.$$set = (i) => {
      'size' in i && n(0, (r = i.size));
    }),
    [r]
  );
}
class Ls extends ce {
  constructor(e) {
    super(), oe(this, e, Us, Vs, le, { size: 0 });
  }
}
function js(t) {
  let e, n, r;
  return {
    c() {
      (e = ee('svg')), (n = ee('rect')), (r = ee('rect')), this.h();
    },
    l(i) {
      e = ne(i, 'svg', {
        height: !0,
        width: !0,
        viewBox: !0,
        fill: !0,
        xmlns: !0,
      });
      var l = y(e);
      (n = ne(l, 'rect', {
        x: !0,
        y: !0,
        width: !0,
        height: !0,
        rx: !0,
        transform: !0,
        fill: !0,
      })),
        y(n).forEach(d),
        (r = ne(l, 'rect', {
          x: !0,
          y: !0,
          width: !0,
          height: !0,
          rx: !0,
          transform: !0,
          fill: !0,
        })),
        y(r).forEach(d),
        l.forEach(d),
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
        f(r, 'x', '4.5199'),
        f(r, 'y', '5.58496'),
        f(r, 'width', '1.5'),
        f(r, 'height', '14'),
        f(r, 'rx', '0.75'),
        f(r, 'transform', 'rotate(-45 4.5199 5.58496)'),
        f(r, 'fill', 'currentColor'),
        f(e, 'height', t[0]),
        f(e, 'width', t[0]),
        f(e, 'viewBox', '0 0 20 20'),
        f(e, 'fill', 'none'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg');
    },
    m(i, l) {
      P(i, e, l), p(e, n), p(e, r);
    },
    p(i, [l]) {
      l & 1 && f(e, 'height', i[0]), l & 1 && f(e, 'width', i[0]);
    },
    i: q,
    o: q,
    d(i) {
      i && d(e);
    },
  };
}
function Hs(t, e, n) {
  let { size: r = `${ht}px` } = e;
  return (
    (t.$$set = (i) => {
      'size' in i && n(0, (r = i.size));
    }),
    [r]
  );
}
class zr extends ce {
  constructor(e) {
    super(), oe(this, e, Hs, js, le, { size: 0 });
  }
}
function zs(t) {
  let e, n;
  return {
    c() {
      (e = ee('svg')), (n = ee('path')), this.h();
    },
    l(r) {
      e = ne(r, 'svg', {
        height: !0,
        width: !0,
        viewBox: !0,
        fill: !0,
        xmlns: !0,
      });
      var i = y(e);
      (n = ne(i, 'path', {
        'fill-rule': !0,
        'clip-rule': !0,
        d: !0,
        fill: !0,
      })),
        y(n).forEach(d),
        i.forEach(d),
        this.h();
    },
    h() {
      f(n, 'fill-rule', 'evenodd'),
        f(n, 'clip-rule', 'evenodd'),
        f(
          n,
          'd',
          'M6.75 3C5.23207 3 4 4.22862 4 5.74826V14.75H5.5V5.74826C5.5 5.05875 6.05879 4.5 6.75 4.5H12.75V3H6.75ZM8.75 7.25H13.75C14.0261 7.25 14.25 7.47386 14.25 7.75V15.75C14.25 16.0261 14.0261 16.25 13.75 16.25H8.75C8.47386 16.25 8.25 16.0261 8.25 15.75V7.75C8.25 7.47386 8.47386 7.25 8.75 7.25ZM6.75 7.75C6.75 6.64543 7.64543 5.75 8.75 5.75H13.75C14.8546 5.75 15.75 6.64543 15.75 7.75V15.75C15.75 16.8546 14.8546 17.75 13.75 17.75H8.75C7.64543 17.75 6.75 16.8546 6.75 15.75V7.75Z',
        ),
        f(n, 'fill', 'currentColor'),
        f(e, 'height', t[0]),
        f(e, 'width', t[0]),
        f(e, 'viewBox', '0 0 20 20'),
        f(e, 'fill', 'none'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg');
    },
    m(r, i) {
      P(r, e, i), p(e, n);
    },
    p(r, [i]) {
      i & 1 && f(e, 'height', r[0]), i & 1 && f(e, 'width', r[0]);
    },
    i: q,
    o: q,
    d(r) {
      r && d(e);
    },
  };
}
function qs(t, e, n) {
  let { size: r = `${ht}px` } = e;
  return (
    (t.$$set = (i) => {
      'size' in i && n(0, (r = i.size));
    }),
    [r]
  );
}
class Ks extends ce {
  constructor(e) {
    super(), oe(this, e, qs, zs, le, { size: 0 });
  }
}
function Zs(t) {
  let e, n, r;
  return {
    c() {
      (e = ee('svg')), (n = ee('path')), (r = ee('path')), this.h();
    },
    l(i) {
      e = ne(i, 'svg', {
        xmlns: !0,
        height: !0,
        viewBox: !0,
        width: !0,
        fill: !0,
      });
      var l = y(e);
      (n = ne(l, 'path', { d: !0, fill: !0 })),
        y(n).forEach(d),
        (r = ne(l, 'path', { d: !0 })),
        y(r).forEach(d),
        l.forEach(d),
        this.h();
    },
    h() {
      f(n, 'd', 'M0 0h24v24H0z'),
        f(n, 'fill', 'none'),
        f(
          r,
          'd',
          'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
        ),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'height', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'width', t[0]),
        f(e, 'fill', 'currentColor');
    },
    m(i, l) {
      P(i, e, l), p(e, n), p(e, r);
    },
    p(i, [l]) {
      l & 1 && f(e, 'height', i[0]), l & 1 && f(e, 'width', i[0]);
    },
    i: q,
    o: q,
    d(i) {
      i && d(e);
    },
  };
}
function Ws(t, e, n) {
  let { size: r = `${ht}px` } = e;
  return (
    (t.$$set = (i) => {
      'size' in i && n(0, (r = i.size));
    }),
    [r]
  );
}
class Gs extends ce {
  constructor(e) {
    super(), oe(this, e, Ws, Zs, le, { size: 0 });
  }
}
function Js(t) {
  let e, n, r, i;
  return {
    c() {
      (e = ee('svg')),
        (n = ee('path')),
        (r = ee('path')),
        (i = ee('path')),
        this.h();
    },
    l(l) {
      e = ne(l, 'svg', {
        width: !0,
        height: !0,
        viewBox: !0,
        fill: !0,
        xmlns: !0,
        'data-tid': !0,
        class: !0,
      });
      var s = y(e);
      (n = ne(s, 'path', {
        d: !0,
        stroke: !0,
        'stroke-width': !0,
        'stroke-linecap': !0,
        'stroke-linejoin': !0,
      })),
        y(n).forEach(d),
        (r = ne(s, 'path', {
          d: !0,
          stroke: !0,
          'stroke-width': !0,
          'stroke-linecap': !0,
          'stroke-linejoin': !0,
        })),
        y(r).forEach(d),
        (i = ne(s, 'path', {
          d: !0,
          stroke: !0,
          'stroke-width': !0,
          'stroke-linecap': !0,
          'stroke-linejoin': !0,
        })),
        y(i).forEach(d),
        s.forEach(d),
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
        f(r, 'd', 'M10.2222 13.3333V10'),
        f(r, 'stroke', 'currentColor'),
        f(r, 'stroke-width', '1.5'),
        f(r, 'stroke-linecap', 'round'),
        f(r, 'stroke-linejoin', 'round'),
        f(i, 'd', 'M10.2222 6.66699H10.2305'),
        f(i, 'stroke', 'currentColor'),
        f(i, 'stroke-width', '1.5'),
        f(i, 'stroke-linecap', 'round'),
        f(i, 'stroke-linejoin', 'round'),
        f(e, 'width', t[0]),
        f(e, 'height', t[0]),
        f(e, 'viewBox', '0 0 20 20'),
        f(e, 'fill', 'none'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'data-tid', 'icon-info'),
        f(e, 'class', 'svelte-1lui9gh');
    },
    m(l, s) {
      P(l, e, s), p(e, n), p(e, r), p(e, i);
    },
    p(l, [s]) {
      s & 1 && f(e, 'width', l[0]), s & 1 && f(e, 'height', l[0]);
    },
    i: q,
    o: q,
    d(l) {
      l && d(e);
    },
  };
}
function Xs(t, e, n) {
  let { size: r = `${ht}px` } = e;
  return (
    (t.$$set = (i) => {
      'size' in i && n(0, (r = i.size));
    }),
    [r]
  );
}
class Qs extends ce {
  constructor(e) {
    super(), oe(this, e, Xs, Js, le, { size: 0 });
  }
}
function Ys(t) {
  let e, n;
  return {
    c() {
      (e = ee('svg')), (n = ee('path')), this.h();
    },
    l(r) {
      e = ne(r, 'svg', {
        xmlns: !0,
        height: !0,
        viewBox: !0,
        width: !0,
        fill: !0,
      });
      var i = y(e);
      (n = ne(i, 'path', { d: !0 })), y(n).forEach(d), i.forEach(d), this.h();
    },
    h() {
      f(n, 'd', 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'height', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'width', t[0]),
        f(e, 'fill', 'currentColor');
    },
    m(r, i) {
      P(r, e, i), p(e, n);
    },
    p(r, [i]) {
      i & 1 && f(e, 'height', r[0]), i & 1 && f(e, 'width', r[0]);
    },
    i: q,
    o: q,
    d(r) {
      r && d(e);
    },
  };
}
function el(t, e, n) {
  let { size: r = `${ht}px` } = e;
  return (
    (t.$$set = (i) => {
      'size' in i && n(0, (r = i.size));
    }),
    [r]
  );
}
class tl extends ce {
  constructor(e) {
    super(), oe(this, e, el, Ys, le, { size: 0 });
  }
}
function nl(t) {
  let e, n, r, i, l, s;
  return (
    (n = new Ks({})),
    {
      c() {
        (e = $('button')), J(n.$$.fragment), this.h();
      },
      l(a) {
        e = E(a, 'BUTTON', { 'aria-label': !0, class: !0 });
        var o = y(e);
        X(n.$$.fragment, o), o.forEach(d), this.h();
      },
      h() {
        f(e, 'aria-label', (r = `${t[1].core.copy}: ${t[0]}`)),
          f(e, 'class', 'icon-only svelte-19s9k4k');
      },
      m(a, o) {
        P(a, e, o),
          W(n, e, null),
          (i = !0),
          l || ((s = _e(e, 'click', tn(Tr(t[2])))), (l = !0));
      },
      p(a, [o]) {
        (!i || (o & 3 && r !== (r = `${a[1].core.copy}: ${a[0]}`))) &&
          f(e, 'aria-label', r);
      },
      i(a) {
        i || (T(n.$$.fragment, a), (i = !0));
      },
      o(a) {
        I(n.$$.fragment, a), (i = !1);
      },
      d(a) {
        a && d(e), G(n), (l = !1), s();
      },
    }
  );
}
function rl(t, e, n) {
  let r;
  Me(t, rn, (s) => n(1, (r = s)));
  let { value: i } = e;
  const l = async () => await navigator.clipboard.writeText(i);
  return (
    (t.$$set = (s) => {
      'value' in s && n(0, (i = s.value));
    }),
    [i, r, l]
  );
}
class il extends ce {
  constructor(e) {
    super(), oe(this, e, rl, nl, le, { value: 0 });
  }
}
let Ut = {};
const Jn = (t) => ((Ut = { ...Ut, [t]: (Ut[t] ?? 0) + 1 }), `${t}${Ut[t]}`);
var Qt;
(function (t) {
  (t.DARK = 'dark'), (t.LIGHT = 'light');
})(Qt || (Qt = {}));
const qr = () =>
    typeof process < 'u' &&
    process.versions != null &&
    process.versions.node != null,
  Kr = ({ obj: t, value: e }) => Object.values(t).includes(e),
  Zr = 'theme',
  sl = 'nnsTheme',
  ll = () => {
    if (qr()) return;
    const t = document.documentElement.getAttribute(Zr),
      e = Kr({ obj: Qt, value: t }) ? t : Qt.DARK;
    return al({ theme: e, preserve: !1 }), e;
  },
  al = ({ theme: t, preserve: e = !0 }) => {
    const { documentElement: n, head: r } = document;
    n.setAttribute(Zr, t);
    const i = getComputedStyle(n).getPropertyValue('--theme-color');
    r?.children?.namedItem('theme-color')?.setAttribute('content', i.trim()),
      e && localStorage.setItem(sl, JSON.stringify(t));
  };
ll();
var at;
(function (t) {
  (t.COLLAPSED = 'collapsed'), (t.EXPANDED = 'expanded');
})(at || (at = {}));
const Wr = 'menu',
  ol = 'nnsMenu',
  cl = () => {
    if (qr()) return;
    const t = document.documentElement.getAttribute(Wr),
      e = Kr({ obj: at, value: t }) ? t : at.EXPANDED;
    return Gr({ menu: e, preserve: !1 }), e;
  },
  Gr = ({ menu: t, preserve: e = !0 }) => {
    const { documentElement: n } = document;
    n.setAttribute(Wr, t), e && localStorage.setItem(ol, JSON.stringify(t));
  },
  fl = cl(),
  ul = () => {
    const { subscribe: t, update: e } = Ge(fl);
    return {
      subscribe: t,
      toggle: () => {
        e((n) => {
          const r = n === at.EXPANDED ? at.COLLAPSED : at.EXPANDED;
          return Gr({ menu: r, preserve: !0 }), r;
        });
      },
    };
  },
  dl = ul();
xt(dl, (t) => t === at.COLLAPSED);
const hl = (t) => ({}),
  Xn = (t) => ({}),
  pl = (t) => ({}),
  Qn = (t) => ({}),
  _l = (t) => ({}),
  Yn = (t) => ({});
function er(t) {
  let e, n, r, i, l, s, a, o, c, u, h, _, C, b, A, m, N, M;
  (n = new Ns({ props: { disablePointerEvents: t[3] } })),
    n.$on('nnsClose', t[14]);
  let w = t[4] && tr(t);
  const x = t[11]['sub-title'],
    F = Ct(x, t, t[10], Qn),
    z = t[11].default,
    R = Ct(z, t, t[10], null);
  let D = t[5] && rr(t);
  return {
    c() {
      (e = $('div')),
        J(n.$$.fragment),
        (r = L()),
        (i = $('div')),
        w && w.c(),
        (l = L()),
        (s = $('div')),
        F && F.c(),
        (a = L()),
        (o = $('div')),
        (c = $('div')),
        R && R.c(),
        (u = L()),
        D && D.c(),
        this.h();
    },
    l(B) {
      e = E(B, 'DIV', {
        class: !0,
        role: !0,
        'data-tid': !0,
        'aria-labelledby': !0,
        'aria-describedby': !0,
      });
      var U = y(e);
      X(n.$$.fragment, U), (r = j(U)), (i = E(U, 'DIV', { class: !0 }));
      var K = y(i);
      w && w.l(K), (l = j(K)), (s = E(K, 'DIV', { class: !0 }));
      var H = y(s);
      F && F.l(H), (a = j(H)), (o = E(H, 'DIV', { class: !0 }));
      var fe = y(o);
      c = E(fe, 'DIV', { class: !0, id: !0 });
      var ue = y(c);
      R && R.l(ue),
        ue.forEach(d),
        fe.forEach(d),
        H.forEach(d),
        (u = j(K)),
        D && D.l(K),
        K.forEach(d),
        U.forEach(d),
        this.h();
    },
    h() {
      f(c, 'class', 'content svelte-1bbimtl'),
        f(c, 'id', t[9]),
        Le(c, 'alert', t[1] === 'alert'),
        f(o, 'class', 'container svelte-1bbimtl'),
        f(s, 'class', 'container-wrapper svelte-1bbimtl'),
        f(i, 'class', (h = ot(`wrapper ${t[1]}`) + ' svelte-1bbimtl')),
        f(e, 'class', 'modal svelte-1bbimtl'),
        f(e, 'role', t[1]),
        f(e, 'data-tid', t[2]),
        f(e, 'aria-labelledby', (b = t[4] ? t[8] : void 0)),
        f(e, 'aria-describedby', t[9]);
    },
    m(B, U) {
      P(B, e, U),
        W(n, e, null),
        p(e, r),
        p(e, i),
        w && w.m(i, null),
        p(i, l),
        p(i, s),
        F && F.m(s, null),
        p(s, a),
        p(s, o),
        p(o, c),
        R && R.m(c, null),
        p(i, u),
        D && D.m(i, null),
        (m = !0),
        N ||
          ((M = [_e(e, 'introend', t[12]), _e(e, 'click', tn(t[13]))]),
          (N = !0));
    },
    p(B, U) {
      t = B;
      const K = {};
      U & 8 && (K.disablePointerEvents = t[3]),
        n.$set(K),
        t[4]
          ? w
            ? (w.p(t, U), U & 16 && T(w, 1))
            : ((w = tr(t)), w.c(), T(w, 1), w.m(i, l))
          : w &&
            (ye(),
            I(w, 1, 1, () => {
              w = null;
            }),
            Ce()),
        F &&
          F.p &&
          (!m || U & 1024) &&
          kt(F, x, t, t[10], m ? $t(x, t[10], U, pl) : Et(t[10]), Qn),
        R &&
          R.p &&
          (!m || U & 1024) &&
          kt(R, z, t, t[10], m ? $t(z, t[10], U, null) : Et(t[10]), null),
        (!m || U & 2) && Le(c, 'alert', t[1] === 'alert'),
        t[5]
          ? D
            ? (D.p(t, U), U & 32 && T(D, 1))
            : ((D = rr(t)), D.c(), T(D, 1), D.m(i, null))
          : D &&
            (ye(),
            I(D, 1, 1, () => {
              D = null;
            }),
            Ce()),
        (!m ||
          (U & 2 && h !== (h = ot(`wrapper ${t[1]}`) + ' svelte-1bbimtl'))) &&
          f(i, 'class', h),
        (!m || U & 2) && f(e, 'role', t[1]),
        (!m || U & 4) && f(e, 'data-tid', t[2]),
        (!m || (U & 16 && b !== (b = t[4] ? t[8] : void 0))) &&
          f(e, 'aria-labelledby', b);
    },
    i(B) {
      m ||
        (T(n.$$.fragment, B),
        T(w),
        T(F, B),
        T(R, B),
        T(D),
        We(() => {
          m && (C && C.end(1), (_ = En(i, it, { duration: gl })), _.start());
        }),
        We(() => {
          m && (A || (A = Gt(e, it, { duration: 25 }, !0)), A.run(1));
        }),
        (m = !0));
    },
    o(B) {
      I(n.$$.fragment, B),
        I(w),
        I(F, B),
        I(R, B),
        I(D),
        _ && _.invalidate(),
        (C = Tn(i, it, { duration: vl })),
        A || (A = Gt(e, it, { duration: 25 }, !1)),
        A.run(0),
        (m = !1);
    },
    d(B) {
      B && d(e),
        G(n),
        w && w.d(),
        F && F.d(B),
        R && R.d(B),
        D && D.d(),
        B && C && C.end(),
        B && A && A.end(),
        (N = !1),
        Ne(M);
    },
  };
}
function tr(t) {
  let e, n, r, i;
  const l = t[11].title,
    s = Ct(l, t, t[10], Yn);
  let a = !t[3] && nr(t);
  return {
    c() {
      (e = $('div')),
        (n = $('h2')),
        s && s.c(),
        (r = L()),
        a && a.c(),
        this.h();
    },
    l(o) {
      e = E(o, 'DIV', { class: !0 });
      var c = y(e);
      n = E(c, 'H2', { id: !0, 'data-tid': !0, class: !0 });
      var u = y(n);
      s && s.l(u),
        u.forEach(d),
        (r = j(c)),
        a && a.l(c),
        c.forEach(d),
        this.h();
    },
    h() {
      f(n, 'id', t[8]),
        f(n, 'data-tid', 'modal-title'),
        f(n, 'class', 'svelte-1bbimtl'),
        f(e, 'class', 'header svelte-1bbimtl');
    },
    m(o, c) {
      P(o, e, c),
        p(e, n),
        s && s.m(n, null),
        p(e, r),
        a && a.m(e, null),
        (i = !0);
    },
    p(o, c) {
      s &&
        s.p &&
        (!i || c & 1024) &&
        kt(s, l, o, o[10], i ? $t(l, o[10], c, _l) : Et(o[10]), Yn),
        o[3]
          ? a &&
            (ye(),
            I(a, 1, 1, () => {
              a = null;
            }),
            Ce())
          : a
          ? (a.p(o, c), c & 8 && T(a, 1))
          : ((a = nr(o)), a.c(), T(a, 1), a.m(e, null));
    },
    i(o) {
      i || (T(s, o), T(a), (i = !0));
    },
    o(o) {
      I(s, o), I(a), (i = !1);
    },
    d(o) {
      o && d(e), s && s.d(o), a && a.d();
    },
  };
}
function nr(t) {
  let e, n, r, i, l, s;
  return (
    (n = new zr({ props: { size: '24px' } })),
    {
      c() {
        (e = $('button')), J(n.$$.fragment), this.h();
      },
      l(a) {
        e = E(a, 'BUTTON', { 'data-tid': !0, 'aria-label': !0, class: !0 });
        var o = y(e);
        X(n.$$.fragment, o), o.forEach(d), this.h();
      },
      h() {
        f(e, 'data-tid', 'close-modal'),
          f(e, 'aria-label', (r = t[6].core.close)),
          f(e, 'class', 'svelte-1bbimtl');
      },
      m(a, o) {
        P(a, e, o),
          W(n, e, null),
          (i = !0),
          l || ((s = _e(e, 'click', tn(t[7]))), (l = !0));
      },
      p(a, o) {
        (!i || (o & 64 && r !== (r = a[6].core.close))) &&
          f(e, 'aria-label', r);
      },
      i(a) {
        i || (T(n.$$.fragment, a), (i = !0));
      },
      o(a) {
        I(n.$$.fragment, a), (i = !1);
      },
      d(a) {
        a && d(e), G(n), (l = !1), s();
      },
    }
  );
}
function rr(t) {
  let e, n;
  const r = t[11].footer,
    i = Ct(r, t, t[10], Xn);
  return {
    c() {
      (e = $('div')), i && i.c(), this.h();
    },
    l(l) {
      e = E(l, 'DIV', { class: !0 });
      var s = y(e);
      i && i.l(s), s.forEach(d), this.h();
    },
    h() {
      f(e, 'class', 'footer toolbar svelte-1bbimtl');
    },
    m(l, s) {
      P(l, e, s), i && i.m(e, null), (n = !0);
    },
    p(l, s) {
      i &&
        i.p &&
        (!n || s & 1024) &&
        kt(i, r, l, l[10], n ? $t(r, l[10], s, hl) : Et(l[10]), Xn);
    },
    i(l) {
      n || (T(i, l), (n = !0));
    },
    o(l) {
      I(i, l), (n = !1);
    },
    d(l) {
      l && d(e), i && i.d(l);
    },
  };
}
function ml(t) {
  let e,
    n,
    r = t[0] && er(t);
  return {
    c() {
      r && r.c(), (e = me());
    },
    l(i) {
      r && r.l(i), (e = me());
    },
    m(i, l) {
      r && r.m(i, l), P(i, e, l), (n = !0);
    },
    p(i, [l]) {
      i[0]
        ? r
          ? (r.p(i, l), l & 1 && T(r, 1))
          : ((r = er(i)), r.c(), T(r, 1), r.m(e.parentNode, e))
        : r &&
          (ye(),
          I(r, 1, 1, () => {
            r = null;
          }),
          Ce());
    },
    i(i) {
      n || (T(r), (n = !0));
    },
    o(i) {
      I(r), (n = !1);
    },
    d(i) {
      i && d(e), r && r.d(i);
    },
  };
}
const gl = 125,
  vl = 200;
function bl(t, e, n) {
  let r;
  Me(t, rn, (x) => n(6, (r = x)));
  let { $$slots: i = {}, $$scope: l } = e;
  const s = oi(i);
  let { visible: a = !0 } = e,
    { role: o = 'dialog' } = e,
    { testId: c = void 0 } = e,
    { disablePointerEvents: u = !1 } = e,
    h,
    _;
  const C = Ir(),
    b = () => C('nnsClose'),
    A = Jn('modal-title-'),
    m = Jn('modal-content-');
  function N(x) {
    un.call(this, t, x);
  }
  function M(x) {
    un.call(this, t, x);
  }
  function w(x) {
    un.call(this, t, x);
  }
  return (
    (t.$$set = (x) => {
      'visible' in x && n(0, (a = x.visible)),
        'role' in x && n(1, (o = x.role)),
        'testId' in x && n(2, (c = x.testId)),
        'disablePointerEvents' in x && n(3, (u = x.disablePointerEvents)),
        '$$scope' in x && n(10, (l = x.$$scope));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 2 && n(5, (_ = qe(s.footer) && o === 'alert'));
    }),
    n(4, (h = qe(s.title))),
    [a, o, c, u, h, _, r, b, A, m, l, i, N, M, w]
  );
}
class wl extends ce {
  constructor(e) {
    super(),
      oe(this, e, bl, ml, le, {
        visible: 0,
        role: 1,
        testId: 2,
        disablePointerEvents: 3,
      });
  }
}
const yl = () => {
    const { subscribe: t, update: e, set: n } = Ge([]);
    return {
      subscribe: t,
      show({ id: r, ...i }) {
        const l = r ?? Symbol('toast');
        return e((s) => [...s, { ...i, id: l }]), l;
      },
      hide(r) {
        e((i) => i.filter(({ id: l }) => l !== r));
      },
      update({ id: r, content: i }) {
        e((l) => l.map((s) => (s.id !== r ? s : { ...s, ...i })));
      },
      reset(r) {
        if (qe(r) && r.length > 0) {
          e((i) => i.filter(({ level: l }) => !r.includes(l)));
          return;
        }
        n([]);
      },
    };
  },
  sn = yl();
function Cl(t) {
  let e, n, r;
  var i = t[11](t[1]);
  function l(s, a) {
    return { props: { size: ht } };
  }
  return (
    i && (e = tt(i, l())),
    {
      c() {
        e && J(e.$$.fragment), (n = me());
      },
      l(s) {
        e && X(e.$$.fragment, s), (n = me());
      },
      m(s, a) {
        e && W(e, s, a), P(s, n, a), (r = !0);
      },
      p(s, a) {
        if (a & 2 && i !== (i = s[11](s[1]))) {
          if (e) {
            ye();
            const o = e;
            I(o.$$.fragment, 1, 0, () => {
              G(o, 1);
            }),
              Ce();
          }
          i
            ? ((e = tt(i, l())),
              J(e.$$.fragment),
              T(e.$$.fragment, 1),
              W(e, n.parentNode, n))
            : (e = null);
        }
      },
      i(s) {
        r || (e && T(e.$$.fragment, s), (r = !0));
      },
      o(s) {
        e && I(e.$$.fragment, s), (r = !1);
      },
      d(s) {
        s && d(n), e && G(e, s);
      },
    }
  );
}
function $l(t) {
  let e, n, r;
  var i = t[5];
  function l(s, a) {
    return {};
  }
  return (
    i && (e = tt(i, l())),
    {
      c() {
        e && J(e.$$.fragment), (n = me());
      },
      l(s) {
        e && X(e.$$.fragment, s), (n = me());
      },
      m(s, a) {
        e && W(e, s, a), P(s, n, a), (r = !0);
      },
      p(s, a) {
        if (a & 32 && i !== (i = s[5])) {
          if (e) {
            ye();
            const o = e;
            I(o.$$.fragment, 1, 0, () => {
              G(o, 1);
            }),
              Ce();
          }
          i
            ? ((e = tt(i, l())),
              J(e.$$.fragment),
              T(e.$$.fragment, 1),
              W(e, n.parentNode, n))
            : (e = null);
        }
      },
      i(s) {
        r || (e && T(e.$$.fragment, s), (r = !0));
      },
      o(s) {
        e && I(e.$$.fragment, s), (r = !1);
      },
      d(s) {
        s && d(n), e && G(e, s);
      },
    }
  );
}
function kl(t) {
  let e, n;
  return (
    (e = new An({ props: { size: 'small', inline: !0 } })),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      p: q,
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function ir(t) {
  let e, n;
  return {
    c() {
      (e = $('span')), (n = Ie(t[3])), this.h();
    },
    l(r) {
      e = E(r, 'SPAN', { class: !0 });
      var i = y(e);
      (n = Re(i, t[3])), i.forEach(d), this.h();
    },
    h() {
      f(e, 'class', 'title svelte-1ih7d9r');
    },
    m(r, i) {
      P(r, e, i), p(e, n);
    },
    p(r, i) {
      i & 8 && et(n, r[3]);
    },
    d(r) {
      r && d(e);
    },
  };
}
function El(t) {
  let e,
    n,
    r,
    i,
    l,
    s,
    a,
    o,
    c,
    u = qe(t[3]),
    h,
    _,
    C,
    b,
    A,
    m,
    N,
    M,
    w,
    x,
    F,
    z;
  const R = [kl, $l, Cl],
    D = [];
  function B(K, H) {
    return (
      H & 32 && (r = null),
      H & 2 && (i = null),
      K[2]
        ? 0
        : (r == null && (r = !!qe(K[5])),
          r ? 1 : (i == null && (i = !!K[11](K[1])), i ? 2 : -1))
    );
  }
  ~(l = B(t, -1)) && (s = D[l] = R[l](t));
  let U = u && ir(t);
  return (
    (A = new zr({})),
    {
      c() {
        (e = $('div')),
          (n = $('div')),
          s && s.c(),
          (o = L()),
          (c = $('p')),
          U && U.c(),
          (h = L()),
          (_ = Ie(t[0])),
          (C = L()),
          (b = $('button')),
          J(A.$$.fragment),
          this.h();
      },
      l(K) {
        e = E(K, 'DIV', { role: !0, class: !0 });
        var H = y(e);
        n = E(H, 'DIV', { class: !0, 'aria-hidden': !0 });
        var fe = y(n);
        s && s.l(fe),
          fe.forEach(d),
          (o = j(H)),
          (c = E(H, 'P', { class: !0, style: !0 }));
        var ue = y(c);
        U && U.l(ue),
          (h = j(ue)),
          (_ = Re(ue, t[0])),
          ue.forEach(d),
          (C = j(H)),
          (b = E(H, 'BUTTON', { class: !0, 'aria-label': !0 }));
        var de = y(b);
        X(A.$$.fragment, de), de.forEach(d), H.forEach(d), this.h();
      },
      h() {
        f(n, 'class', (a = 'icon ' + t[1] + ' svelte-1ih7d9r')),
          f(n, 'aria-hidden', 'true'),
          f(c, 'class', 'msg svelte-1ih7d9r'),
          f(c, 'style', t[13]),
          Le(c, 'truncate', t[8]),
          Le(c, 'clamp', t[9]),
          Le(c, 'scroll', t[7]),
          f(b, 'class', 'close svelte-1ih7d9r'),
          f(b, 'aria-label', (m = t[10].core.close)),
          f(e, 'role', 'dialog'),
          f(
            e,
            'class',
            (N = ot(`toast ${t[6] ?? 'themed'}`) + ' svelte-1ih7d9r'),
          );
      },
      m(K, H) {
        P(K, e, H),
          p(e, n),
          ~l && D[l].m(n, null),
          p(e, o),
          p(e, c),
          U && U.m(c, null),
          p(c, h),
          p(c, _),
          p(e, C),
          p(e, b),
          W(A, b, null),
          (x = !0),
          F || ((z = _e(b, 'click', t[12])), (F = !0));
      },
      p(K, [H]) {
        t = K;
        let fe = l;
        (l = B(t, H)),
          l === fe
            ? ~l && D[l].p(t, H)
            : (s &&
                (ye(),
                I(D[fe], 1, 1, () => {
                  D[fe] = null;
                }),
                Ce()),
              ~l
                ? ((s = D[l]),
                  s ? s.p(t, H) : ((s = D[l] = R[l](t)), s.c()),
                  T(s, 1),
                  s.m(n, null))
                : (s = null)),
          (!x || (H & 2 && a !== (a = 'icon ' + t[1] + ' svelte-1ih7d9r'))) &&
            f(n, 'class', a),
          H & 8 && (u = qe(t[3])),
          u
            ? U
              ? U.p(t, H)
              : ((U = ir(t)), U.c(), U.m(c, h))
            : U && (U.d(1), (U = null)),
          (!x || H & 1) && et(_, t[0]),
          (!x || H & 256) && Le(c, 'truncate', t[8]),
          (!x || H & 512) && Le(c, 'clamp', t[9]),
          (!x || H & 128) && Le(c, 'scroll', t[7]),
          (!x || (H & 1024 && m !== (m = t[10].core.close))) &&
            f(b, 'aria-label', m),
          (!x ||
            (H & 64 &&
              N !==
                (N = ot(`toast ${t[6] ?? 'themed'}`) + ' svelte-1ih7d9r'))) &&
            f(e, 'class', N);
      },
      i(K) {
        x ||
          (T(s),
          T(A.$$.fragment, K),
          We(() => {
            x &&
              (w && w.end(1),
              (M = En(e, Cs, {
                y: (t[4] === 'top' ? -1 : 1) * 100,
                duration: 200,
              })),
              M.start());
          }),
          (x = !0));
      },
      o(K) {
        I(s),
          I(A.$$.fragment, K),
          M && M.invalidate(),
          (w = Tn(e, it, { delay: 100 })),
          (x = !1);
      },
      d(K) {
        K && d(e),
          ~l && D[l].d(),
          U && U.d(),
          G(A),
          K && w && w.end(),
          (F = !1),
          z();
      },
    }
  );
}
function Tl(t, e, n) {
  let r;
  Me(t, rn, (z) => n(10, (r = z)));
  let { msg: i } = e;
  const l = (z) =>
      ({ success: Ls, warn: tl, error: Gs, info: Qs, custom: void 0 }[z]),
    s = () => sn.hide(i.id);
  let a, o, c, u, h, _, C, b, A, m, N, M;
  const w = () => {
      const { duration: z } = i;
      zt(z) || (M = setTimeout(s, z));
    },
    x = () => {
      zt(M) || clearTimeout(M);
    },
    F = `min-height: ${ht}px;`;
  return (
    Ke(w),
    Sr(x),
    (t.$$set = (z) => {
      'msg' in z && n(14, (i = z.msg));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 16384 &&
        n(
          0,
          ({
            text: a,
            level: o,
            spinner: c,
            title: u,
            overflow: h,
            position: _,
            icon: C,
            theme: b,
          } = i),
          a,
          (n(1, o), n(14, i)),
          (n(2, c), n(14, i)),
          (n(3, u), n(14, i)),
          (n(15, h), n(14, i)),
          (n(4, _), n(14, i)),
          (n(5, C), n(14, i)),
          (n(6, b), n(14, i)),
        ),
        t.$$.dirty & 32768 && n(7, (A = h === void 0 || h === 'scroll')),
        t.$$.dirty & 32768 && n(8, (m = h === 'truncate')),
        t.$$.dirty & 32768 && n(9, (N = h === 'clamp'));
    }),
    [a, o, c, u, _, C, b, A, m, N, r, l, s, F, i, h]
  );
}
class xl extends ce {
  constructor(e) {
    super(), oe(this, e, Tl, El, le, { msg: 14 });
  }
}
function sr(t, e, n) {
  const r = t.slice();
  return (r[5] = e[n]), r;
}
function lr(t) {
  let e,
    n = [],
    r = new Map(),
    i,
    l,
    s,
    a = Dn(t[1]);
  const o = (c) => c[5].id;
  for (let c = 0; c < a.length; c += 1) {
    let u = sr(t, a, c),
      h = o(u);
    r.set(h, (n[c] = ar(h, u)));
  }
  return {
    c() {
      e = $('div');
      for (let c = 0; c < n.length; c += 1) n[c].c();
      this.h();
    },
    l(c) {
      e = E(c, 'DIV', { class: !0, style: !0 });
      var u = y(e);
      for (let h = 0; h < n.length; h += 1) n[h].l(u);
      u.forEach(d), this.h();
    },
    h() {
      f(e, 'class', (i = ot(`wrapper ${t[0]}`) + ' svelte-24m335')),
        f(e, 'style', (l = `--layout-bottom-offset: ${t[3]}px`)),
        Le(e, 'error', t[2]);
    },
    m(c, u) {
      P(c, e, u);
      for (let h = 0; h < n.length; h += 1) n[h] && n[h].m(e, null);
      s = !0;
    },
    p(c, u) {
      u & 2 &&
        ((a = Dn(c[1])),
        ye(),
        (n = ki(n, u, o, 1, c, a, r, e, $i, ar, null, sr)),
        Ce()),
        (!s ||
          (u & 1 && i !== (i = ot(`wrapper ${c[0]}`) + ' svelte-24m335'))) &&
          f(e, 'class', i),
        (!s || (u & 8 && l !== (l = `--layout-bottom-offset: ${c[3]}px`))) &&
          f(e, 'style', l),
        (!s || u & 5) && Le(e, 'error', c[2]);
    },
    i(c) {
      if (!s) {
        for (let u = 0; u < a.length; u += 1) T(n[u]);
        s = !0;
      }
    },
    o(c) {
      for (let u = 0; u < n.length; u += 1) I(n[u]);
      s = !1;
    },
    d(c) {
      c && d(e);
      for (let u = 0; u < n.length; u += 1) n[u].d();
    },
  };
}
function ar(t, e) {
  let n, r, i;
  return (
    (r = new xl({ props: { msg: e[5] } })),
    {
      key: t,
      first: null,
      c() {
        (n = me()), J(r.$$.fragment), this.h();
      },
      l(l) {
        (n = me()), X(r.$$.fragment, l), this.h();
      },
      h() {
        this.first = n;
      },
      m(l, s) {
        P(l, n, s), W(r, l, s), (i = !0);
      },
      p(l, s) {
        e = l;
        const a = {};
        s & 2 && (a.msg = e[5]), r.$set(a);
      },
      i(l) {
        i || (T(r.$$.fragment, l), (i = !0));
      },
      o(l) {
        I(r.$$.fragment, l), (i = !1);
      },
      d(l) {
        l && d(n), G(r, l);
      },
    }
  );
}
function Nl(t) {
  let e,
    n,
    r = t[1].length > 0 && lr(t);
  return {
    c() {
      r && r.c(), (e = me());
    },
    l(i) {
      r && r.l(i), (e = me());
    },
    m(i, l) {
      r && r.m(i, l), P(i, e, l), (n = !0);
    },
    p(i, [l]) {
      i[1].length > 0
        ? r
          ? (r.p(i, l), l & 2 && T(r, 1))
          : ((r = lr(i)), r.c(), T(r, 1), r.m(e.parentNode, e))
        : r &&
          (ye(),
          I(r, 1, 1, () => {
            r = null;
          }),
          Ce());
    },
    i(i) {
      n || (T(r), (n = !0));
    },
    o(i) {
      I(r), (n = !1);
    },
    d(i) {
      i && d(e), r && r.d(i);
    },
  };
}
function Al(t, e, n) {
  let r, i;
  Me(t, sn, (o) => n(4, (r = o))), Me(t, Ss, (o) => n(3, (i = o)));
  let { position: l = 'bottom' } = e,
    s = [],
    a;
  return (
    (t.$$set = (o) => {
      'position' in o && n(0, (l = o.position));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 17 &&
        n(1, (s = r.filter(({ position: o }) => (o ?? 'bottom') === l))),
        t.$$.dirty & 2 &&
          n(
            2,
            (a =
              s.find(({ level: o }) => ['error', 'warn'].includes(o)) !==
              void 0),
          );
    }),
    [l, s, a, i, r]
  );
}
class Sl extends ce {
  constructor(e) {
    super(), oe(this, e, Al, Nl, le, { position: 0 });
  }
}
function or(t) {
  let e, n, r, i, l, s;
  const a = t[2].default,
    o = Ct(a, t, t[1], null);
  return (
    (l = new Sl({})),
    {
      c() {
        (e = $('div')),
          (n = $('main')),
          (r = $('div')),
          o && o.c(),
          (i = L()),
          J(l.$$.fragment),
          this.h();
      },
      l(c) {
        e = E(c, 'DIV', { class: !0 });
        var u = y(e);
        n = E(u, 'MAIN', { class: !0 });
        var h = y(n);
        r = E(h, 'DIV', { class: !0 });
        var _ = y(r);
        o && o.l(_),
          _.forEach(d),
          h.forEach(d),
          (i = j(u)),
          X(l.$$.fragment, u),
          u.forEach(d),
          this.h();
      },
      h() {
        f(r, 'class', 'flex flex-col md:flex-row h-screen'),
          f(n, 'class', 'page-wrapper svelte-vmfccd'),
          f(e, 'class', 'flex flex-col h-screen justify-between default-text');
      },
      m(c, u) {
        P(c, e, u),
          p(e, n),
          p(n, r),
          o && o.m(r, null),
          p(e, i),
          W(l, e, null),
          (s = !0);
      },
      p(c, u) {
        o &&
          o.p &&
          (!s || u & 2) &&
          kt(o, a, c, c[1], s ? $t(a, c[1], u, null) : Et(c[1]), null);
      },
      i(c) {
        s || (T(o, c), T(l.$$.fragment, c), (s = !0));
      },
      o(c) {
        I(o, c), I(l.$$.fragment, c), (s = !1);
      },
      d(c) {
        c && d(e), o && o.d(c), G(l);
      },
    }
  );
}
function Il(t) {
  let e,
    n,
    r,
    i = !t[0] && or(t);
  return (
    (n = new Ms({})),
    {
      c() {
        i && i.c(), (e = L()), J(n.$$.fragment);
      },
      l(l) {
        i && i.l(l), (e = j(l)), X(n.$$.fragment, l);
      },
      m(l, s) {
        i && i.m(l, s), P(l, e, s), W(n, l, s), (r = !0);
      },
      p(l, [s]) {
        l[0]
          ? i &&
            (ye(),
            I(i, 1, 1, () => {
              i = null;
            }),
            Ce())
          : i
          ? (i.p(l, s), s & 1 && T(i, 1))
          : ((i = or(l)), i.c(), T(i, 1), i.m(e.parentNode, e));
      },
      i(l) {
        r || (T(i), T(n.$$.fragment, l), (r = !0));
      },
      o(l) {
        I(i), I(n.$$.fragment, l), (r = !1);
      },
      d(l) {
        l && d(e), i && i.d(l), G(n, l);
      },
    }
  );
}
function Ol(t, e, n) {
  let { $$slots: r = {}, $$scope: i } = e,
    l = !0;
  return (
    Ke(async () => {
      try {
        const s = document.images,
          a = Array.from(s).map((c) =>
            c.complete
              ? Promise.resolve()
              : new Promise((u) => {
                  c.addEventListener('load', u), c.addEventListener('error', u);
                }),
          );
        await Promise.all(a),
          document.querySelector('body > #app-spinner')?.remove();
      } catch (s) {
        console.error('Error', s);
      } finally {
        n(0, (l = !1));
      }
    }),
    (t.$$set = (s) => {
      '$$scope' in s && n(1, (i = s.$$scope));
    }),
    [l, i, r]
  );
}
class Sn extends ce {
  constructor(e) {
    super(), oe(this, e, Ol, Il, le, {});
  }
}
const cr = {}.VITE_INTERNET_IDENTITY_CANISTER_ID,
  Pl = BigInt(60 * 60 * 1e3 * 1e3 * 1e3 * 24 * 14),
  Fl = 576,
  Bl = 625;
function Bo(t) {
  throw new Error(
    'Could not dynamically require "' +
      t +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.',
  );
}
const Dl = {},
  Rl = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: Dl },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  Do = As(Rl),
  gn = () =>
    ri.create({
      idleOptions: { disableIdle: !0, disableDefaultIdleCallback: !0 },
    }),
  Ml = ({ width: t, height: e }) => {
    if (zt(window) || zt(window.top)) return;
    const {
        top: { innerWidth: n, innerHeight: r },
      } = window,
      i = r / 2 + screenY - e / 2,
      l = n / 2 + screenX - t / 2;
    return `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=${t}, height=${e}, top=${i}, left=${l}`;
  };
let Qe;
const Vl = 'https://openbook.services',
  Ul = 'https://etq35-qqaaa-aaaal-qcrvq-cai.icp0.io',
  Ll = () => window.location.origin === Vl,
  jl = () => {
    const { subscribe: t, set: e, update: n } = Ge({ identity: void 0 });
    return {
      subscribe: t,
      sync: async () => {
        Qe = Qe ?? (await gn());
        const r = await Qe.isAuthenticated();
        e({ identity: r ? Qe.getIdentity() : null });
      },
      signIn: ({ domain: r }) =>
        new Promise(async (i, l) => {
          Qe = Qe ?? (await gn());
          const s = qe(cr)
            ? `http://localhost:4943?canisterId=${cr}`
            : `${r ?? 'https://identity.ic0.app'}`;
          await Qe?.login({
            maxTimeToLive: Pl,
            onSuccess: () => {
              n((a) => ({ ...a, identity: Qe?.getIdentity() })), i();
            },
            onError: l,
            identityProvider: s,
            ...(Ll() && { derivationOrigin: Ul }),
            windowOpenerFeatures: Ml({ width: Fl, height: Bl }),
          });
        }),
      signOut: async () => {
        await (Qe ?? (await gn())).logout(),
          (Qe = null),
          n((i) => ({ ...i, identity: null }));
      },
    };
  },
  Ze = jl(),
  Hl = 'nn75s-ayupf-j6mj3-kluyb-wjj7y-eang2-dwzzr-cfdxk-etbw7-cgwnb-lqe',
  Jr = xt(Ze, ({ identity: t }) => t != null);
xt(Ze, ({ identity: t }) => t != null && t.getPrincipal().toString() === Hl);
const zl = (t) =>
    typeof t == 'string'
      ? t
      : t instanceof Error || 'message' in t
      ? t.message
      : void 0,
  Xr = (t) => sn.show(t),
  bn = ({ msg: { text: t, ...e }, err: n }) => (
    qe(n) && console.error(n),
    sn.show({ text: `${t}${qe(n) ? ` / ${zl(n)}` : ''}`, ...e, level: 'error' })
  ),
  ql = Yi('goto');
function fr(t, e) {
  return typeof e == 'bigint' ? e.toString() : e;
}
function Kl(t) {
  const e = Number(t / 1000000n),
    n = new Date(e);
  return `${
    [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ][n.getUTCMonth()]
  } ${n.getUTCFullYear()}`;
}
const Zl = ({ IDL: t }) => {
  const e = t.Rec(),
    n = t.Nat16,
    r = t.Nat32,
    i = t.Record({
      id: r,
      logo: t.Text,
      name: t.Text,
      banner: t.Text,
      lastModified: t.Int64,
      friendlyName: t.Text,
    });
  e.fill(t.Opt(t.Tuple(i, e)));
  const l = t.Record({
      principal: t.Text,
      displayName: t.Text,
      termsAccepted: t.Bool,
      preferredPaymentCurrency: n,
      createDate: t.Int,
      lastModified: t.Int64,
      profilePicture: t.Vec(t.Nat8),
      userDefinedWallet: t.Text,
      organisations: e,
    }),
    s = t.Variant({
      DecodeError: t.Null,
      NotAllowed: t.Null,
      NotFound: t.Null,
      NotAuthorized: t.Null,
      InvalidData: t.Null,
      AlreadyExists: t.Null,
    }),
    a = t.Variant({ ok: t.Null, err: s });
  return t.Service({
    createProfile: t.Func([], [], []),
    getProfile: t.Func([], [l], ['query']),
    isDisplayNameValid: t.Func([t.Text], [t.Bool], ['query']),
    updateDisplayName: t.Func([t.Text], [a], []),
    updateProfilePicture: t.Func([t.Vec(t.Nat8)], [a], []),
  });
};
class ut {
  static createActor(e, n = '', r = null, i = null) {
    const l = { host: 'http://127.0.0.1:8080', identity: r };
    i
      ? i.agentOptions
        ? (i.agentOptions.host = l.host)
        : (i.agentOptions = l)
      : (i = { agentOptions: l });
    const s = new ii({ ...i.agentOptions });
    return si.createActor(e, { agent: s, canisterId: n, ...i?.actorOptions });
  }
  static createIdentityActor(e, n) {
    let r;
    return new Promise((i, l) => {
      r = e.subscribe((s) => {
        s.identity && i(s.identity);
      });
    }).then((i) => (r(), ut.createActor(Zl, n, i)));
  }
}
function Wl() {
  const { subscribe: t, set: e } = Ge(null);
  function n(u) {
    const h = Array.from(u)
      .map((_) => String.fromCharCode(_))
      .join('');
    return btoa(h);
  }
  function r(u) {
    const h = atob(u),
      _ = h.length,
      C = new Uint8Array(_);
    for (let b = 0; b < _; b++) C[b] = h.charCodeAt(b);
    return C;
  }
  function i() {
    const u = localStorage.getItem('user_profile_data');
    if (u) {
      const h = JSON.parse(u);
      return (
        h &&
          typeof h.profilePicture == 'string' &&
          (h.profilePicture = r(h.profilePicture)),
        h
      );
    }
    return null;
  }
  async function l() {
    try {
      const u = await ut.createIdentityActor(Ze, 'cpmcr-yeaaa-aaaaa-qaala-cai');
      let h = await u.getProfile();
      console.log(h),
        h || (await u.createProfile(), (h = await u.getProfile()));
      let _ = h;
      if (_ && _.profilePicture instanceof Uint8Array) {
        const C = n(_.profilePicture);
        localStorage.setItem(
          'user_profile_data',
          JSON.stringify({ ..._, profilePicture: C }, fr),
        );
      } else localStorage.setItem('user_profile_data', JSON.stringify(_, fr));
      e(_);
    } catch (u) {
      throw (console.error('Error fetching user profile:', u), u);
    }
  }
  async function s() {
    try {
      return await (
        await ut.createIdentityActor(Ze, 'cpmcr-yeaaa-aaaaa-qaala-cai')
      ).createProfile();
    } catch (u) {
      throw (console.error('Error updating username:', u), u);
    }
  }
  async function a(u) {
    try {
      const _ = await (
        await ut.createIdentityActor(Ze, 'cpmcr-yeaaa-aaaaa-qaala-cai')
      ).updateDisplayName(u);
      return l(), _;
    } catch (h) {
      throw (console.error('Error updating username:', h), h);
    }
  }
  async function o() {
    try {
      const h = await (
        await ut.createIdentityActor(Ze, 'cpmcr-yeaaa-aaaaa-qaala-cai')
      ).getProfile();
      return e(h), h;
    } catch (u) {
      throw (console.error('Error getting profile:', u), u);
    }
  }
  async function c(u) {
    try {
      if (u.size > 1e3 * 1024) return null;
      const _ = new FileReader();
      _.readAsArrayBuffer(u),
        (_.onloadend = async () => {
          const C = _.result,
            b = new Uint8Array(C);
          try {
            const m = await (
              await ut.createIdentityActor(Ze, 'cpmcr-yeaaa-aaaaa-qaala-cai')
            ).updateProfilePicture(b);
            return l(), m;
          } catch (A) {
            console.error(A);
          }
        });
    } catch (h) {
      throw (console.error('Error updating username:', h), h);
    }
  }
  return {
    subscribe: t,
    sync: l,
    updateUsername: a,
    getProfile: o,
    updateProfilePicture: c,
    createProfile: s,
    getProfileFromLocalStorage: i,
  };
}
const rt = Wl(),
  Gl = xt(rt, (t) =>
    t != null && t.profilePicture !== void 0 && t.profilePicture.length > 0
      ? URL.createObjectURL(new Blob([new Uint8Array(t.profilePicture)]))
      : 'profile_placeholder.png',
  );
function Jl(t) {
  let e, n, r, i;
  return {
    c() {
      (e = ee('svg')),
        (n = ee('path')),
        (r = ee('path')),
        (i = ee('path')),
        this.h();
    },
    l(l) {
      e = ne(l, 'svg', {
        xmlns: !0,
        'aria-hidden': !0,
        class: !0,
        fill: !0,
        viewBox: !0,
      });
      var s = y(e);
      (n = ne(s, 'path', { d: !0 })),
        y(n).forEach(d),
        (r = ne(s, 'path', { d: !0 })),
        y(r).forEach(d),
        (i = ne(s, 'path', { d: !0 })),
        y(i).forEach(d),
        s.forEach(d),
        this.h();
    },
    h() {
      f(
        n,
        'd',
        'M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z',
      ),
        f(r, 'd', 'M15.5,6.5v3a1,1,0,0,1-1,1h-3.5v-5H14.5A1,1,0,0,1,15.5,6.5Z'),
        f(i, 'd', 'M12,8a.5,.5 0,1,1,.001,0Z'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'aria-hidden', 'true'),
        f(e, 'class', t[0]),
        f(e, 'fill', 'currentColor'),
        f(e, 'viewBox', '0 0 24 24');
    },
    m(l, s) {
      P(l, e, s), p(e, n), p(e, r), p(e, i);
    },
    p(l, [s]) {
      s & 1 && f(e, 'class', l[0]);
    },
    i: q,
    o: q,
    d(l) {
      l && d(e);
    },
  };
}
function Xl(t, e, n) {
  let { className: r = '' } = e;
  return (
    (t.$$set = (i) => {
      'className' in i && n(0, (r = i.className));
    }),
    [r]
  );
}
class Ql extends ce {
  constructor(e) {
    super(), oe(this, e, Xl, Jl, le, { className: 0 });
  }
}
function Yl(t) {
  let e,
    n,
    r,
    i,
    l,
    s,
    a,
    o,
    c,
    u,
    h,
    _,
    C,
    b,
    A,
    m,
    N,
    M,
    w,
    x = 'Profile',
    F,
    z,
    R,
    D,
    B,
    U,
    K,
    H,
    fe;
  return (
    (B = new Ql({ props: { className: 'ml-2 h-6 w-6 mt-1' } })),
    {
      c() {
        (e = $('div')),
          (n = $('h1')),
          (r = Ie(t[0])),
          (i = L()),
          (l = $('div')),
          (s = $('button')),
          (a = $('img')),
          (u = L()),
          (h = $('div')),
          (_ = $('ul')),
          (C = $('li')),
          (b = $('a')),
          (A = $('span')),
          (m = $('img')),
          (M = L()),
          (w = $('p')),
          (w.textContent = x),
          (F = L()),
          (z = $('li')),
          (R = $('button')),
          (D = Ie(`Disconnect
            `)),
          J(B.$$.fragment),
          this.h();
      },
      l(ue) {
        e = E(ue, 'DIV', { class: !0 });
        var de = y(e);
        n = E(de, 'H1', {});
        var ke = y(n);
        (r = Re(ke, t[0])),
          ke.forEach(d),
          (i = j(de)),
          (l = E(de, 'DIV', { class: !0 }));
        var Oe = y(l);
        s = E(Oe, 'BUTTON', { class: !0 });
        var Ae = y(s);
        (a = E(Ae, 'IMG', { src: !0, alt: !0, class: !0, 'aria-label': !0 })),
          Ae.forEach(d),
          (u = j(Oe)),
          (h = E(Oe, 'DIV', { class: !0 }));
        var Pe = y(h);
        _ = E(Pe, 'UL', { class: !0 });
        var Fe = y(_);
        C = E(Fe, 'LI', {});
        var we = y(C);
        b = E(we, 'A', { href: !0, class: !0 });
        var Ve = y(b);
        A = E(Ve, 'SPAN', { class: !0 });
        var xe = y(A);
        (m = E(xe, 'IMG', { src: !0, alt: !0, class: !0 })),
          (M = j(xe)),
          (w = E(xe, 'P', { class: !0, 'data-svelte-h': !0 })),
          he(w) !== 'svelte-cig3zx' && (w.textContent = x),
          xe.forEach(d),
          Ve.forEach(d),
          we.forEach(d),
          (F = j(Fe)),
          (z = E(Fe, 'LI', {}));
        var Te = y(z);
        R = E(Te, 'BUTTON', { class: !0 });
        var Ee = y(R);
        (D = Re(
          Ee,
          `Disconnect
            `,
        )),
          X(B.$$.fragment, Ee),
          Ee.forEach(d),
          Te.forEach(d),
          Fe.forEach(d),
          Pe.forEach(d),
          Oe.forEach(d),
          de.forEach(d),
          this.h();
      },
      h() {
        vt(a.src, (o = t[3])) || f(a, 'src', o),
          f(a, 'alt', 'Profile'),
          f(a, 'class', 'h-8 rounded-full profile-pic'),
          f(a, 'aria-label', 'Toggle Profile'),
          f(
            s,
            'class',
            (c = `h-full flex items-center border rounded-full ${t[2](
              '/profile',
            )}`),
          ),
          vt(m.src, (N = t[3])) || f(m, 'src', N),
          f(m, 'alt', 'logo'),
          f(m, 'class', 'w-8 h-8 my-2 ml-4 mr-2 rounded-full'),
          f(w, 'class', 'w-full min-w-[125px] max-w-[125px] truncate'),
          f(A, 'class', 'flex items-center h-full w-full'),
          f(b, 'href', '/profile'),
          f(b, 'class', 'flex items-center h-full w-full nav-underline'),
          f(
            R,
            'class',
            'flex items-center justify-center px-4 pb-2 pt-1 text-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 nav-button',
          ),
          f(_, 'class', ''),
          f(
            h,
            'class',
            (U = `absolute right-0 top-full w-48 bg-black rounded-b-md rounded-l-md shadow-lg z-50 profile-dropdown ${
              t[1] ? 'block' : 'hidden'
            }`),
          ),
          f(l, 'class', 'relative inline-block'),
          f(e, 'class', 'w-full p-4 top-bar flex justify-between items-center');
      },
      m(ue, de) {
        P(ue, e, de),
          p(e, n),
          p(n, r),
          p(e, i),
          p(e, l),
          p(l, s),
          p(s, a),
          p(l, u),
          p(l, h),
          p(h, _),
          p(_, C),
          p(C, b),
          p(b, A),
          p(A, m),
          p(A, M),
          p(A, w),
          p(_, F),
          p(_, z),
          p(z, R),
          p(R, D),
          W(B, R, null),
          (K = !0),
          H || ((fe = [_e(s, 'click', t[5]), _e(R, 'click', t[4])]), (H = !0));
      },
      p(ue, [de]) {
        (!K || de & 1) && et(r, ue[0]),
          (!K || (de & 8 && !vt(a.src, (o = ue[3])))) && f(a, 'src', o),
          (!K ||
            (de & 4 &&
              c !==
                (c = `h-full flex items-center border rounded-full ${ue[2](
                  '/profile',
                )}`))) &&
            f(s, 'class', c),
          (!K || (de & 8 && !vt(m.src, (N = ue[3])))) && f(m, 'src', N),
          (!K ||
            (de & 2 &&
              U !==
                (U = `absolute right-0 top-full w-48 bg-black rounded-b-md rounded-l-md shadow-lg z-50 profile-dropdown ${
                  ue[1] ? 'block' : 'hidden'
                }`))) &&
            f(h, 'class', U);
      },
      i(ue) {
        K || (T(B.$$.fragment, ue), (K = !0));
      },
      o(ue) {
        I(B.$$.fragment, ue), (K = !1);
      },
      d(ue) {
        ue && d(e), G(B), (H = !1), Ne(fe);
      },
    }
  );
}
function ea(t, e, n) {
  let r, i, l;
  Me(t, Nn, (h) => n(6, (i = h))), Me(t, Gl, (h) => n(3, (l = h)));
  let s = !1,
    { activeTitle: a = 'OpenBook' } = e;
  Ke(async () => {
    typeof window < 'u' && document.addEventListener('click', u);
  }),
    Sr(() => {
      typeof window < 'u' && document.removeEventListener('click', u);
    });
  function o() {
    Ze.signOut(), ql('/'), n(1, (s = !1));
  }
  function c(h) {
    h.stopPropagation(), n(1, (s = !s));
  }
  function u(h) {
    const _ = h.target;
    _ instanceof Element &&
      !_.closest('.profile-dropdown') &&
      !_.closest('.profile-pic') &&
      n(1, (s = !1));
  }
  return (
    (t.$$set = (h) => {
      'activeTitle' in h && n(0, (a = h.activeTitle));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 64 &&
        n(2, (r = (h) => (i.url.pathname === h ? 'active-border' : '')));
    }),
    [a, s, r, l, o, c, i]
  );
}
class ta extends ce {
  constructor(e) {
    super(), oe(this, e, ea, Yl, le, { activeTitle: 0 });
  }
}
function ur(t) {
  let e,
    n = 'section 0';
  return {
    c() {
      (e = $('p')), (e.textContent = n);
    },
    l(r) {
      (e = E(r, 'P', { 'data-svelte-h': !0 })),
        he(e) !== 'svelte-9oor2b' && (e.textContent = n);
    },
    m(r, i) {
      P(r, e, i);
    },
    d(r) {
      r && d(e);
    },
  };
}
function dr(t) {
  let e,
    n = 'section 1';
  return {
    c() {
      (e = $('p')), (e.textContent = n);
    },
    l(r) {
      (e = E(r, 'P', { 'data-svelte-h': !0 })),
        he(e) !== 'svelte-ez5c0s' && (e.textContent = n);
    },
    m(r, i) {
      P(r, e, i);
    },
    d(r) {
      r && d(e);
    },
  };
}
function na(t) {
  let e,
    n = 'Owner',
    r,
    i,
    l,
    s = t[0] == 0 && ur(),
    a = t[0] == 1 && dr();
  return {
    c() {
      (e = $('h1')),
        (e.textContent = n),
        (r = L()),
        s && s.c(),
        (i = L()),
        a && a.c(),
        (l = me());
    },
    l(o) {
      (e = E(o, 'H1', { 'data-svelte-h': !0 })),
        he(e) !== 'svelte-hlya3n' && (e.textContent = n),
        (r = j(o)),
        s && s.l(o),
        (i = j(o)),
        a && a.l(o),
        (l = me());
    },
    m(o, c) {
      P(o, e, c),
        P(o, r, c),
        s && s.m(o, c),
        P(o, i, c),
        a && a.m(o, c),
        P(o, l, c);
    },
    p(o, [c]) {
      o[0] == 0
        ? s || ((s = ur()), s.c(), s.m(i.parentNode, i))
        : s && (s.d(1), (s = null)),
        o[0] == 1
          ? a || ((a = dr()), a.c(), a.m(l.parentNode, l))
          : a && (a.d(1), (a = null));
    },
    i: q,
    o: q,
    d(o) {
      o && (d(e), d(r), d(i), d(l)), s && s.d(o), a && a.d(o);
    },
  };
}
function ra(t, e, n) {
  let { activeSection: r = 0 } = e;
  return (
    (t.$$set = (i) => {
      'activeSection' in i && n(0, (r = i.activeSection));
    }),
    [r]
  );
}
class ia extends ce {
  constructor(e) {
    super(), oe(this, e, ra, na, le, { activeSection: 0 });
  }
}
function sa(t) {
  let e, n;
  return {
    c() {
      (e = ee('svg')), (n = ee('path')), this.h();
    },
    l(r) {
      e = ne(r, 'svg', { xmlns: !0, class: !0, viewBox: !0, fill: !0 });
      var i = y(e);
      (n = ne(i, 'path', { d: !0, fill: !0 })),
        y(n).forEach(d),
        i.forEach(d),
        this.h();
    },
    h() {
      f(
        n,
        'd',
        'M8.49995 8.3C8.09995 7.9 7.49995 7.9 7.09995 8.3C6.69995 8.7 6.69995 9.3 7.09995 9.7L9.29995 12L6.99995 14.3C6.79995 14.5 6.69995 14.7 6.69995 15C6.69995 15.6 7.09995 16 7.69995 16C7.99995 16 8.19995 15.9 8.39995 15.7L11.4 12.7C11.8 12.3 11.8 11.7 11.4 11.3L8.49995 8.3ZM17 11.3L14 8.3C13.6 7.9 13 7.9 12.6 8.3C12.2 8.7 12.2 9.3 12.6 9.7L14.9 12L12.6 14.3C12.4 14.5 12.3 14.7 12.3 15C12.3 15.6 12.7 16 13.3 16C13.6 16 13.8 15.9 14 15.7L17 12.7C17.3 12.3 17.3 11.7 17 11.3Z',
      ),
        f(n, 'fill', t[1]),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'class', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'fill', 'none');
    },
    m(r, i) {
      P(r, e, i), p(e, n);
    },
    p(r, [i]) {
      i & 2 && f(n, 'fill', r[1]), i & 1 && f(e, 'class', r[0]);
    },
    i: q,
    o: q,
    d(r) {
      r && d(e);
    },
  };
}
function la(t, e, n) {
  let { className: r = '' } = e,
    { fill: i = '#FFFFFF' } = e;
  return (
    (t.$$set = (l) => {
      'className' in l && n(0, (r = l.className)),
        'fill' in l && n(1, (i = l.fill));
    }),
    [r, i]
  );
}
class In extends ce {
  constructor(e) {
    super(), oe(this, e, la, sa, le, { className: 0, fill: 1 });
  }
}
function aa(t) {
  let e, n, r, i, l, s, a;
  return {
    c() {
      (e = ee('svg')),
        (n = ee('g')),
        (r = ee('path')),
        (i = ee('path')),
        (l = ee('defs')),
        (s = ee('clipPath')),
        (a = ee('rect')),
        this.h();
    },
    l(o) {
      e = ne(o, 'svg', { xmlns: !0, class: !0, viewBox: !0, fill: !0 });
      var c = y(e);
      n = ne(c, 'g', { 'clip-path': !0 });
      var u = y(n);
      (r = ne(u, 'path', { d: !0, fill: !0 })),
        y(r).forEach(d),
        (i = ne(u, 'path', { d: !0, fill: !0 })),
        y(i).forEach(d),
        u.forEach(d),
        (l = ne(c, 'defs', {}));
      var h = y(l);
      s = ne(h, 'clipPath', { id: !0 });
      var _ = y(s);
      (a = ne(_, 'rect', { width: !0, height: !0, fill: !0 })),
        y(a).forEach(d),
        _.forEach(d),
        h.forEach(d),
        c.forEach(d),
        this.h();
    },
    h() {
      f(
        r,
        'd',
        'M23.055 7.33252C22.1423 5.1788 20.6205 3.34753 18.7057 2.05266C16.7914 0.757781 14.4794 -0.000328019 12 1.0647e-07C10.3475 -9.36435e-05 8.76816 0.336563 7.33261 0.944906C5.17894 1.85766 3.34763 3.37936 2.0527 5.2942C0.757828 7.20844 -0.000328019 9.5205 1.06464e-07 12C-9.36435e-05 13.6526 0.336609 15.2319 0.944953 16.6675C1.85766 18.8212 3.3795 20.6525 5.2943 21.9473C7.20858 23.2422 9.52064 24.0003 12 24C13.6525 24.0001 15.2318 23.6634 16.6674 23.0551C18.8211 22.1424 20.6524 20.6206 21.9473 18.7058C23.2422 16.7916 24.0003 14.4794 24 12C24.0001 10.3474 23.6634 8.76806 23.055 7.33252ZM21.5819 16.0434C20.792 17.9081 19.4704 19.4992 17.8095 20.622C16.1482 21.7447 14.1524 22.3997 12 22.4001C10.5648 22.4 9.20025 22.1086 7.95684 21.5819C6.09211 20.792 4.50103 19.4705 3.37823 17.8096C2.25534 16.1482 1.60031 14.1524 1.59998 12C1.60008 10.5647 1.8915 9.20011 2.41814 7.9567C3.20803 6.09197 4.52962 4.50089 6.19045 3.37814C7.85184 2.2553 9.84769 1.60031 12 1.59998C13.4353 1.60008 14.7998 1.89145 16.0432 2.41814C17.9079 3.20798 19.499 4.52958 20.6218 6.19041C21.7446 7.8518 22.3996 9.84759 22.4 12C22.3999 13.4354 22.1085 14.7999 21.5819 16.0434Z',
      ),
        f(r, 'fill', t[1]),
        f(
          i,
          'd',
          'M20.302 10.4768C20.004 9.77372 19.5086 9.1778 18.8845 8.75569C18.5725 8.54466 18.2278 8.37713 17.8597 8.26238C17.4916 8.14763 17.1 8.08589 16.6966 8.08594C16.1171 8.08542 15.5699 8.20842 15.0705 8.41331C14.6328 8.59252 14.2299 8.83238 13.8531 9.10697C13.1941 9.58828 12.6109 10.1754 12.054 10.776C12.0359 10.7955 12.0182 10.8152 12.0001 10.8348C11.9962 10.8306 11.9923 10.8263 11.9884 10.822C11.6762 10.4836 11.3553 10.1493 11.0183 9.83452C10.5125 9.36295 9.97 8.93297 9.35631 8.61206C9.04965 8.45194 8.72495 8.32003 8.38173 8.22839C8.0387 8.1367 7.67734 8.08589 7.30328 8.08599C6.76534 8.08589 6.24878 8.19581 5.78026 8.39447C5.07719 8.69255 4.48126 9.18792 4.05915 9.81197C3.84812 10.124 3.68059 10.4687 3.56584 10.8368C3.45109 11.2049 3.38936 11.5965 3.3894 11.9999C3.38931 12.5378 3.49923 13.0544 3.69789 13.5229C3.99597 14.2259 4.49139 14.8218 5.11539 15.2439C5.42744 15.455 5.77215 15.6225 6.14026 15.7373C6.50833 15.852 6.89992 15.9137 7.30333 15.9137C7.88279 15.9142 8.43001 15.7912 8.92942 15.5863C9.36714 15.4071 9.77008 15.1673 10.1468 14.8927C10.8058 14.4113 11.389 13.8242 11.946 13.2237C11.9641 13.2041 11.9818 13.1844 11.9998 13.1648C12.0037 13.1691 12.0076 13.1734 12.0115 13.1777C12.3237 13.5161 12.6446 13.8504 12.9817 14.1652C13.4875 14.6367 14.0299 15.0667 14.6436 15.3876C14.9503 15.5476 15.275 15.6796 15.6182 15.7713C15.9612 15.863 16.3226 15.9138 16.6967 15.9137C17.2346 15.9138 17.7512 15.8038 18.2197 15.6052C18.9227 15.3071 19.5187 14.8118 19.9408 14.1877C20.1518 13.8757 20.3193 13.5309 20.4341 13.1628C20.5488 12.7948 20.6106 12.4032 20.6105 11.9998C20.6106 11.4619 20.5007 10.9453 20.302 10.4768ZM10.8379 12.1162C10.54 12.4391 10.2447 12.7458 9.95003 13.0208C9.50819 13.4339 9.06798 13.7729 8.63204 13.9997C8.41389 14.1135 8.19704 14.2002 7.97795 14.2587C7.75867 14.3172 7.53704 14.348 7.30337 14.3481C6.97801 14.348 6.67155 14.2823 6.39109 14.1637C5.97072 13.9858 5.60992 13.6864 5.35614 13.3108C5.2292 13.1231 5.12903 12.9168 5.06054 12.697C4.99206 12.4772 4.95503 12.2439 4.95503 11.9999C4.95512 11.6745 5.02079 11.368 5.13944 11.0876C5.31733 10.6673 5.61676 10.3065 5.99237 10.0527C6.18006 9.92574 6.3864 9.82556 6.60625 9.75708C6.82609 9.6886 7.05934 9.65156 7.30342 9.65156C7.66473 9.65203 7.99905 9.72478 8.33673 9.86236C8.63144 9.98278 8.92698 10.155 9.22459 10.372C9.74565 10.7511 10.2687 11.268 10.7974 11.8397C10.8461 11.8923 10.8951 11.9465 10.944 12C10.9087 12.0385 10.8732 12.078 10.8379 12.1162ZM18.8606 12.9121C18.6827 13.3325 18.3833 13.6933 18.0077 13.9471C17.82 14.074 17.6137 14.1742 17.3938 14.2427C17.174 14.3112 16.9407 14.3482 16.6967 14.3482C16.3353 14.3477 16.001 14.275 15.6633 14.1374C15.3686 14.017 15.0731 13.8448 14.7755 13.6277C14.2544 13.2487 13.7313 12.7318 13.2027 12.16C13.154 12.1074 13.105 12.0532 13.0561 11.9998C13.0915 11.9611 13.1269 11.9217 13.1622 11.8835C13.4601 11.5606 13.7554 11.2538 14.05 10.9789C14.4919 10.5658 14.9321 10.2268 15.368 9.99994C15.5862 9.88613 15.803 9.79945 16.0221 9.74095C16.2414 9.6825 16.463 9.65166 16.6967 9.65156C17.0221 9.65166 17.3285 9.71733 17.609 9.83597C18.0294 10.0139 18.3902 10.3133 18.6439 10.6889C18.7709 10.8766 18.871 11.0829 18.9395 11.3027C19.008 11.5225 19.045 11.7558 19.045 11.9999C19.045 12.3252 18.9793 12.6316 18.8606 12.9121Z',
        ),
        f(i, 'fill', t[1]),
        f(n, 'clip-path', 'url(#clip0_143_3542)'),
        f(a, 'width', '24'),
        f(a, 'height', '24'),
        f(a, 'fill', t[1]),
        f(s, 'id', 'clip0_143_3542'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'class', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'fill', 'none');
    },
    m(o, c) {
      P(o, e, c), p(e, n), p(n, r), p(n, i), p(e, l), p(l, s), p(s, a);
    },
    p(o, [c]) {
      c & 2 && f(r, 'fill', o[1]),
        c & 2 && f(i, 'fill', o[1]),
        c & 2 && f(a, 'fill', o[1]),
        c & 1 && f(e, 'class', o[0]);
    },
    i: q,
    o: q,
    d(o) {
      o && d(e);
    },
  };
}
function oa(t, e, n) {
  let { className: r = '' } = e,
    { fill: i = '#FFFFFF' } = e;
  return (
    (t.$$set = (l) => {
      'className' in l && n(0, (r = l.className)),
        'fill' in l && n(1, (i = l.fill));
    }),
    [r, i]
  );
}
class ln extends ce {
  constructor(e) {
    super(), oe(this, e, oa, aa, le, { className: 0, fill: 1 });
  }
}
function ca(t) {
  let e, n, r;
  return {
    c() {
      (e = ee('svg')), (n = ee('path')), (r = ee('path')), this.h();
    },
    l(i) {
      e = ne(i, 'svg', { xmlns: !0, class: !0, viewBox: !0, fill: !0 });
      var l = y(e);
      (n = ne(l, 'path', { d: !0, fill: !0 })),
        y(n).forEach(d),
        (r = ne(l, 'path', { d: !0, fill: !0 })),
        y(r).forEach(d),
        l.forEach(d),
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
          r,
          'd',
          'M13.8263 0C6.19177 0 0 6.19177 0 13.8263C0 21.4608 6.19177 27.6525 13.8263 27.6525C21.4608 27.6525 27.6525 21.4608 27.6525 13.8263C27.6525 6.19177 21.4608 0 13.8263 0ZM13.8263 21.04C9.8407 21.04 6.61257 17.8118 6.61257 13.8263C6.61257 9.8407 9.8407 6.61257 13.8263 6.61257C17.8118 6.61257 21.04 9.8407 21.04 13.8263C21.04 17.8118 17.8118 21.04 13.8263 21.04Z',
        ),
        f(r, 'fill', 'white'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'class', t[0]),
        f(e, 'viewBox', '0 0 28 40'),
        f(e, 'fill', 'none');
    },
    m(i, l) {
      P(i, e, l), p(e, n), p(e, r);
    },
    p(i, [l]) {
      l & 1 && f(e, 'class', i[0]);
    },
    i: q,
    o: q,
    d(i) {
      i && d(e);
    },
  };
}
function fa(t, e, n) {
  let { className: r = '' } = e;
  return (
    (t.$$set = (i) => {
      'className' in i && n(0, (r = i.className));
    }),
    [r]
  );
}
class Dt extends ce {
  constructor(e) {
    super(), oe(this, e, fa, ca, le, { className: 0 });
  }
}
function ua(t) {
  let e, n;
  return {
    c() {
      (e = ee('svg')), (n = ee('path')), this.h();
    },
    l(r) {
      e = ne(r, 'svg', { xmlns: !0, class: !0, viewBox: !0, fill: !0 });
      var i = y(e);
      (n = ne(i, 'path', { d: !0, fill: !0 })),
        y(n).forEach(d),
        i.forEach(d),
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
    m(r, i) {
      P(r, e, i), p(e, n);
    },
    p(r, [i]) {
      i & 2 && f(n, 'fill', r[1]), i & 1 && f(e, 'class', r[0]);
    },
    i: q,
    o: q,
    d(r) {
      r && d(e);
    },
  };
}
function da(t, e, n) {
  let { className: r = '' } = e,
    { fill: i = '#FFFFFF' } = e;
  return (
    (t.$$set = (l) => {
      'className' in l && n(0, (r = l.className)),
        'fill' in l && n(1, (i = l.fill));
    }),
    [r, i]
  );
}
class an extends ce {
  constructor(e) {
    super(), oe(this, e, da, ua, le, { className: 0, fill: 1 });
  }
}
function ha(t) {
  let e, n, r, i, l, s, a, o, c, u, h, _, C, b, A;
  return (
    (r = new Dt({ props: { className: 'w-6' } })),
    (s = new ln({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 0 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    (c = new an({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 1 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    (_ = new In({ props: { fill: '#555555' } })),
    {
      c() {
        (e = $('nav')),
          (n = $('a')),
          J(r.$$.fragment),
          (i = L()),
          (l = $('button')),
          J(s.$$.fragment),
          (a = L()),
          (o = $('button')),
          J(c.$$.fragment),
          (u = L()),
          (h = $('div')),
          J(_.$$.fragment),
          this.h();
      },
      l(m) {
        e = E(m, 'NAV', { class: !0 });
        var N = y(e);
        n = E(N, 'A', { href: !0 });
        var M = y(n);
        X(r.$$.fragment, M), M.forEach(d), (i = j(N)), (l = E(N, 'BUTTON', {}));
        var w = y(l);
        X(s.$$.fragment, w), w.forEach(d), (a = j(N)), (o = E(N, 'BUTTON', {}));
        var x = y(o);
        X(c.$$.fragment, x),
          x.forEach(d),
          (u = j(N)),
          (h = E(N, 'DIV', { class: !0 }));
        var F = y(h);
        X(_.$$.fragment, F), F.forEach(d), N.forEach(d), this.h();
      },
      h() {
        f(n, 'href', '/'),
          f(h, 'class', 'pull-down'),
          f(e, 'class', 'p-4 h-full side-nav flex flex-col');
      },
      m(m, N) {
        P(m, e, N),
          p(e, n),
          W(r, n, null),
          p(e, i),
          p(e, l),
          W(s, l, null),
          p(e, a),
          p(e, o),
          W(c, o, null),
          p(e, u),
          p(e, h),
          W(_, h, null),
          (C = !0),
          b || ((A = [_e(l, 'click', t[2]), _e(o, 'click', t[3])]), (b = !0));
      },
      p(m, [N]) {
        const M = {};
        N & 1 && (M.fill = m[0] == 0 ? '#FFFFFF' : '#8C8C8C'), s.$set(M);
        const w = {};
        N & 1 && (w.fill = m[0] == 1 ? '#FFFFFF' : '#8C8C8C'), c.$set(w);
      },
      i(m) {
        C ||
          (T(r.$$.fragment, m),
          T(s.$$.fragment, m),
          T(c.$$.fragment, m),
          T(_.$$.fragment, m),
          (C = !0));
      },
      o(m) {
        I(r.$$.fragment, m),
          I(s.$$.fragment, m),
          I(c.$$.fragment, m),
          I(_.$$.fragment, m),
          (C = !1);
      },
      d(m) {
        m && d(e), G(r), G(s), G(c), G(_), (b = !1), Ne(A);
      },
    }
  );
}
function pa(t, e, n) {
  let r = 0;
  function i(a) {
    n(0, (r = a));
  }
  return [r, i, () => i(0), () => i(1)];
}
class _a extends ce {
  constructor(e) {
    super(), oe(this, e, pa, ha, le, {});
  }
}
function ma(t) {
  let e, n, r, i, l, s, a, o, c, u, h, _, C, b, A;
  return (
    (r = new Dt({ props: { className: 'w-6' } })),
    (s = new ln({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 0 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    (c = new an({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 1 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    (_ = new In({ props: { fill: '#555555' } })),
    {
      c() {
        (e = $('nav')),
          (n = $('a')),
          J(r.$$.fragment),
          (i = L()),
          (l = $('button')),
          J(s.$$.fragment),
          (a = L()),
          (o = $('button')),
          J(c.$$.fragment),
          (u = L()),
          (h = $('div')),
          J(_.$$.fragment),
          this.h();
      },
      l(m) {
        e = E(m, 'NAV', { class: !0 });
        var N = y(e);
        n = E(N, 'A', { href: !0 });
        var M = y(n);
        X(r.$$.fragment, M), M.forEach(d), (i = j(N)), (l = E(N, 'BUTTON', {}));
        var w = y(l);
        X(s.$$.fragment, w), w.forEach(d), (a = j(N)), (o = E(N, 'BUTTON', {}));
        var x = y(o);
        X(c.$$.fragment, x),
          x.forEach(d),
          (u = j(N)),
          (h = E(N, 'DIV', { class: !0 }));
        var F = y(h);
        X(_.$$.fragment, F), F.forEach(d), N.forEach(d), this.h();
      },
      h() {
        f(n, 'href', '/'),
          f(h, 'class', 'pull-down'),
          f(e, 'class', 'p-4 h-full side-nav flex flex-col');
      },
      m(m, N) {
        P(m, e, N),
          p(e, n),
          W(r, n, null),
          p(e, i),
          p(e, l),
          W(s, l, null),
          p(e, a),
          p(e, o),
          W(c, o, null),
          p(e, u),
          p(e, h),
          W(_, h, null),
          (C = !0),
          b || ((A = [_e(l, 'click', t[2]), _e(o, 'click', t[3])]), (b = !0));
      },
      p(m, [N]) {
        const M = {};
        N & 1 && (M.fill = m[0] == 0 ? '#FFFFFF' : '#8C8C8C'), s.$set(M);
        const w = {};
        N & 1 && (w.fill = m[0] == 1 ? '#FFFFFF' : '#8C8C8C'), c.$set(w);
      },
      i(m) {
        C ||
          (T(r.$$.fragment, m),
          T(s.$$.fragment, m),
          T(c.$$.fragment, m),
          T(_.$$.fragment, m),
          (C = !0));
      },
      o(m) {
        I(r.$$.fragment, m),
          I(s.$$.fragment, m),
          I(c.$$.fragment, m),
          I(_.$$.fragment, m),
          (C = !1);
      },
      d(m) {
        m && d(e), G(r), G(s), G(c), G(_), (b = !1), Ne(A);
      },
    }
  );
}
function ga(t, e, n) {
  let r = 0;
  function i(a) {
    n(0, (r = a));
  }
  return [r, i, () => i(0), () => i(1)];
}
class va extends ce {
  constructor(e) {
    super(), oe(this, e, ga, ma, le, {});
  }
}
function ba(t) {
  let e,
    n,
    r,
    i = 'Update Display Name',
    l,
    s,
    a = '×',
    o,
    c,
    u,
    h,
    _,
    C,
    b,
    A = 'Cancel',
    m,
    N,
    M,
    w,
    x,
    F;
  return {
    c() {
      (e = $('div')),
        (n = $('div')),
        (r = $('h3')),
        (r.textContent = i),
        (l = L()),
        (s = $('button')),
        (s.textContent = a),
        (o = L()),
        (c = $('form')),
        (u = $('div')),
        (h = $('input')),
        (_ = L()),
        (C = $('div')),
        (b = $('button')),
        (b.textContent = A),
        (m = L()),
        (N = $('button')),
        (M = Ie('Update')),
        this.h();
    },
    l(z) {
      e = E(z, 'DIV', { class: !0 });
      var R = y(e);
      n = E(R, 'DIV', { class: !0 });
      var D = y(n);
      (r = E(D, 'H3', { class: !0, 'data-svelte-h': !0 })),
        he(r) !== 'svelte-1p2hkg2' && (r.textContent = i),
        (l = j(D)),
        (s = E(D, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
        he(s) !== 'svelte-jkt426' && (s.textContent = a),
        D.forEach(d),
        (o = j(R)),
        (c = E(R, 'FORM', {}));
      var B = y(c);
      u = E(B, 'DIV', { class: !0 });
      var U = y(u);
      (h = E(U, 'INPUT', { type: !0, class: !0, placeholder: !0 })),
        U.forEach(d),
        (_ = j(B)),
        (C = E(B, 'DIV', { class: !0 }));
      var K = y(C);
      (b = E(K, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
        he(b) !== 'svelte-1vsli1x' && (b.textContent = A),
        (m = j(K)),
        (N = E(K, 'BUTTON', { class: !0, type: !0 }));
      var H = y(N);
      (M = Re(H, 'Update')),
        H.forEach(d),
        K.forEach(d),
        B.forEach(d),
        R.forEach(d),
        this.h();
    },
    h() {
      f(r, 'class', 'default-header'),
        f(s, 'class', 'times-button'),
        f(n, 'class', 'flex justify-between items-center my-2'),
        f(h, 'type', 'text'),
        f(
          h,
          'class',
          'w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black',
        ),
        f(h, 'placeholder', 'New Username'),
        f(u, 'class', 'mt-4'),
        f(
          b,
          'class',
          'px-4 py-2 book-cancel-btn text-white rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300',
        ),
        f(N, 'class', (w = `px-4 py-2 ${t[3] ? 'bg-gray-500' : 'book-btn'}`)),
        f(N, 'type', 'submit'),
        (N.disabled = t[3]),
        f(C, 'class', 'items-center py-3 flex space-x-4'),
        f(e, 'class', 'p-4');
    },
    m(z, R) {
      P(z, e, R),
        p(e, n),
        p(n, r),
        p(n, l),
        p(n, s),
        p(e, o),
        p(e, c),
        p(c, u),
        p(u, h),
        Fn(h, t[0]),
        p(c, _),
        p(c, C),
        p(C, b),
        p(C, m),
        p(C, N),
        p(N, M),
        x ||
          ((F = [
            _e(s, 'click', function () {
              st(t[2]) && t[2].apply(this, arguments);
            }),
            _e(h, 'input', t[6]),
            _e(b, 'click', function () {
              st(t[2]) && t[2].apply(this, arguments);
            }),
            _e(c, 'submit', Tr(t[4])),
          ]),
          (x = !0));
    },
    p(z, R) {
      (t = z),
        R & 1 && h.value !== t[0] && Fn(h, t[0]),
        R & 8 &&
          w !== (w = `px-4 py-2 ${t[3] ? 'bg-gray-500' : 'book-btn'}`) &&
          f(N, 'class', w),
        R & 8 && (N.disabled = t[3]);
    },
    d(z) {
      z && d(e), (x = !1), Ne(F);
    },
  };
}
function wa(t) {
  let e, n;
  return (
    (e = new wl({
      props: { visible: t[1], $$slots: { default: [ba] }, $$scope: { ctx: t } },
    })),
    e.$on('nnsClose', function () {
      st(t[2]) && t[2].apply(this, arguments);
    }),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      p(r, [i]) {
        t = r;
        const l = {};
        i & 2 && (l.visible = t[1]),
          i & 141 && (l.$$scope = { dirty: i, ctx: t }),
          e.$set(l);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function ya(t) {
  return !t || t.length < 3 || t.length > 20 ? !1 : /^[a-zA-Z0-9 ]+$/.test(t);
}
function Ca(t, e, n) {
  let r,
    { visible: i } = e,
    { closeModal: l } = e,
    { cancelModal: s } = e,
    { newUsername: a = '' } = e;
  async function o() {
    Tt.startBusy({
      initiator: 'update-name',
      text: 'Updating display name...',
    });
    try {
      await rt.updateUsername(a),
        rt.sync(),
        await l(),
        Xr({ text: 'Display name updated.', level: 'success', duration: 2e3 });
    } catch (u) {
      bn({ msg: { text: 'Error updating username.' }, err: u }),
        console.error('Error updating username:', u),
        s();
    } finally {
      Tt.stopBusy('update-name');
    }
  }
  function c() {
    (a = this.value), n(0, a);
  }
  return (
    (t.$$set = (u) => {
      'visible' in u && n(1, (i = u.visible)),
        'closeModal' in u && n(5, (l = u.closeModal)),
        'cancelModal' in u && n(2, (s = u.cancelModal)),
        'newUsername' in u && n(0, (a = u.newUsername));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 1 && n(3, (r = !ya(a)));
    }),
    [a, i, s, r, o, l, c]
  );
}
class $a extends ce {
  constructor(e) {
    super(),
      oe(this, e, Ca, wa, le, {
        visible: 1,
        closeModal: 5,
        cancelModal: 2,
        newUsername: 0,
      });
  }
}
function ka(t) {
  let e,
    n,
    r,
    i =
      '<div class="w-full flex flex-row"><div class="flex w-auto flex-col"><p>Profile Image</p> <img alt="profile"/></div> <div class="flex justify-content-end"><p>Maximimum Size.</p> <p>500KB</p></div></div> <div class="w-full flex flex-col md:flex-row"><div class="w-full md:w-1/2 flex flex-row"><div class=""></div></div> <div class="w-full md:w-1/2"></div></div>',
    l,
    s,
    a,
    o,
    c,
    u,
    h,
    _,
    C,
    b,
    A = 'Upload Photo',
    m,
    N,
    M,
    w,
    x,
    F,
    z = 'Display Name:',
    R,
    D,
    B = t[0]?.displayName + '',
    U,
    K,
    H,
    fe = 'Update',
    ue,
    de,
    ke = 'Joined:',
    Oe,
    Ae,
    Pe,
    Fe,
    we,
    Ve = 'Principal:',
    xe,
    Te,
    Ee,
    Ue = t[0]?.principal + '',
    Je,
    be,
    pe,
    v,
    k,
    S;
  return (
    (e = new $a({
      props: {
        newUsername: t[0] ? t[0].displayName : '',
        visible: t[1],
        closeModal: t[8],
        cancelModal: t[9],
      },
    })),
    (pe = new il({ props: { value: t[0]?.principal ?? '' } })),
    {
      c() {
        J(e.$$.fragment),
          (n = L()),
          (r = $('div')),
          (r.innerHTML = i),
          (l = L()),
          (s = $('div')),
          (a = $('div')),
          (o = $('div')),
          (c = $('div')),
          (u = $('img')),
          (_ = L()),
          (C = $('div')),
          (b = $('button')),
          (b.textContent = A),
          (m = L()),
          (N = $('input')),
          (M = L()),
          (w = $('div')),
          (x = $('div')),
          (F = $('p')),
          (F.textContent = z),
          (R = L()),
          (D = $('h2')),
          (U = Ie(B)),
          (K = L()),
          (H = $('button')),
          (H.textContent = fe),
          (ue = L()),
          (de = $('p')),
          (de.textContent = ke),
          (Oe = L()),
          (Ae = $('h2')),
          (Pe = Ie(t[3])),
          (Fe = L()),
          (we = $('p')),
          (we.textContent = Ve),
          (xe = L()),
          (Te = $('div')),
          (Ee = $('h2')),
          (Je = Ie(Ue)),
          (be = L()),
          J(pe.$$.fragment),
          this.h();
      },
      l(g) {
        X(e.$$.fragment, g),
          (n = j(g)),
          (r = E(g, 'DIV', { class: !0, 'data-svelte-h': !0 })),
          he(r) !== 'svelte-s4wrk4' && (r.innerHTML = i),
          (l = j(g)),
          (s = E(g, 'DIV', { class: !0 }));
        var O = y(s);
        a = E(O, 'DIV', { class: !0 });
        var V = y(a);
        o = E(V, 'DIV', { class: !0 });
        var Q = y(o);
        c = E(Q, 'DIV', { class: !0 });
        var te = y(c);
        (u = E(te, 'IMG', { src: !0, alt: !0, class: !0 })),
          (_ = j(te)),
          (C = E(te, 'DIV', { class: !0 }));
        var ie = y(C);
        (b = E(ie, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
          he(b) !== 'svelte-q5mv1r' && (b.textContent = A),
          (m = j(ie)),
          (N = E(ie, 'INPUT', {
            type: !0,
            id: !0,
            accept: !0,
            style: !0,
            class: !0,
          })),
          ie.forEach(d),
          te.forEach(d),
          Q.forEach(d),
          (M = j(V)),
          (w = E(V, 'DIV', { class: !0 }));
        var re = y(w);
        x = E(re, 'DIV', { class: !0 });
        var se = y(x);
        (F = E(se, 'P', { class: !0, 'data-svelte-h': !0 })),
          he(F) !== 'svelte-1tq84l7' && (F.textContent = z),
          (R = j(se)),
          (D = E(se, 'H2', { class: !0 }));
        var Y = y(D);
        (U = Re(Y, B)),
          Y.forEach(d),
          (K = j(se)),
          (H = E(se, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
          he(H) !== 'svelte-17pmiw6' && (H.textContent = fe),
          (ue = j(se)),
          (de = E(se, 'P', { class: !0, 'data-svelte-h': !0 })),
          he(de) !== 'svelte-105dtlh' && (de.textContent = ke),
          (Oe = j(se)),
          (Ae = E(se, 'H2', { class: !0 }));
        var ae = y(Ae);
        (Pe = Re(ae, t[3])),
          ae.forEach(d),
          (Fe = j(se)),
          (we = E(se, 'P', { class: !0, 'data-svelte-h': !0 })),
          he(we) !== 'svelte-1b6bkxs' && (we.textContent = Ve),
          (xe = j(se)),
          (Te = E(se, 'DIV', { class: !0 }));
        var Z = y(Te);
        Ee = E(Z, 'H2', { class: !0 });
        var ge = y(Ee);
        (Je = Re(ge, Ue)),
          ge.forEach(d),
          (be = j(Z)),
          X(pe.$$.fragment, Z),
          Z.forEach(d),
          se.forEach(d),
          re.forEach(d),
          V.forEach(d),
          O.forEach(d),
          this.h();
      },
      h() {
        f(r, 'class', 'flex-1 flex-col'),
          vt(u.src, (h = t[5])) || f(u, 'src', h),
          f(u, 'alt', 'Profile'),
          f(u, 'class', 'w-full mb-1 rounded-lg'),
          f(b, 'class', 'btn-file-upload book-btn svelte-1abypem'),
          f(N, 'type', 'file'),
          f(N, 'id', 'profile-image'),
          f(N, 'accept', 'image/*'),
          He(N, 'opacity', '0'),
          He(N, 'position', 'absolute'),
          He(N, 'left', '0'),
          He(N, 'top', '0'),
          f(N, 'class', 'svelte-1abypem'),
          f(C, 'class', 'file-upload-wrapper mt-4 svelte-1abypem'),
          f(c, 'class', 'group flex flex-col md:block'),
          f(o, 'class', 'w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2'),
          f(F, 'class', 'mb-1'),
          f(D, 'class', 'default-header mb-1 md:mb-2'),
          f(
            H,
            'class',
            'text-sm md:text-sm p-1 md:p-2 px-2 md:px-4 rounded book-btn',
          ),
          f(de, 'class', 'mb-1 mt-4'),
          f(Ae, 'class', 'default-header mb-1 md:mb-2'),
          f(we, 'class', 'mb-1'),
          f(Ee, 'class', 'tiny-text'),
          f(Te, 'class', 'flex items-center'),
          f(x, 'class', 'md:ml-4 md:px-4 px-4 mt-2 md:mt-1 rounded-lg'),
          f(
            w,
            'class',
            'w-full md:w-1/2 lg:w-2/3 xl:w-3/4 md:px-2 mb-4 md:mb-0',
          ),
          f(a, 'class', 'flex flex-wrap'),
          f(s, 'class', 'container mx-auto p-4');
      },
      m(g, O) {
        W(e, g, O),
          P(g, n, O),
          P(g, r, O),
          P(g, l, O),
          P(g, s, O),
          p(s, a),
          p(a, o),
          p(o, c),
          p(c, u),
          p(c, _),
          p(c, C),
          p(C, b),
          p(C, m),
          p(C, N),
          t[12](N),
          p(a, M),
          p(a, w),
          p(w, x),
          p(x, F),
          p(x, R),
          p(x, D),
          p(D, U),
          p(x, K),
          p(x, H),
          p(x, ue),
          p(x, de),
          p(x, Oe),
          p(x, Ae),
          p(Ae, Pe),
          p(x, Fe),
          p(x, we),
          p(x, xe),
          p(x, Te),
          p(Te, Ee),
          p(Ee, Je),
          p(Te, be),
          W(pe, Te, null),
          (v = !0),
          k ||
            ((S = [
              _e(b, 'click', t[10]),
              _e(N, 'change', t[11]),
              _e(H, 'click', t[7]),
            ]),
            (k = !0));
      },
      p(g, O) {
        const V = {};
        O & 1 && (V.newUsername = g[0] ? g[0].displayName : ''),
          O & 2 && (V.visible = g[1]),
          e.$set(V),
          (!v || (O & 32 && !vt(u.src, (h = g[5])))) && f(u, 'src', h),
          (!v || O & 1) && B !== (B = g[0]?.displayName + '') && et(U, B),
          (!v || O & 8) && et(Pe, g[3]),
          (!v || O & 1) && Ue !== (Ue = g[0]?.principal + '') && et(Je, Ue);
        const Q = {};
        O & 1 && (Q.value = g[0]?.principal ?? ''), pe.$set(Q);
      },
      i(g) {
        v || (T(e.$$.fragment, g), T(pe.$$.fragment, g), (v = !0));
      },
      o(g) {
        I(e.$$.fragment, g), I(pe.$$.fragment, g), (v = !1);
      },
      d(g) {
        g && (d(n), d(r), d(l), d(s)),
          G(e, g),
          t[12](null),
          G(pe),
          (k = !1),
          Ne(S);
      },
    }
  );
}
function Ea(t) {
  let e, n;
  return (
    (e = new An({})),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      p: q,
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function Ta(t) {
  let e, n, r, i;
  const l = [Ea, ka],
    s = [];
  function a(o, c) {
    return o[4] ? 0 : 1;
  }
  return (
    (e = a(t)),
    (n = s[e] = l[e](t)),
    {
      c() {
        n.c(), (r = me());
      },
      l(o) {
        n.l(o), (r = me());
      },
      m(o, c) {
        s[e].m(o, c), P(o, r, c), (i = !0);
      },
      p(o, [c]) {
        let u = e;
        (e = a(o)),
          e === u
            ? s[e].p(o, c)
            : (ye(),
              I(s[u], 1, 1, () => {
                s[u] = null;
              }),
              Ce(),
              (n = s[e]),
              n ? n.p(o, c) : ((n = s[e] = l[e](o)), n.c()),
              T(n, 1),
              n.m(r.parentNode, r));
      },
      i(o) {
        i || (T(n), (i = !0));
      },
      o(o) {
        I(n), (i = !1);
      },
      d(o) {
        o && d(r), s[e].d(o);
      },
    }
  );
}
function xa(t, e, n) {
  let r,
    i,
    l = Ge(null);
  Me(t, l, (w) => n(0, (i = w)));
  let s = !1,
    a,
    o = '',
    c,
    u = !0;
  Ke(async () => {
    try {
      await rt.sync(),
        (c = rt.subscribe((w) => {
          w && (h(w), n(3, (o = Kl(w.createDate))));
        }));
    } catch (w) {
      bn({ msg: { text: 'Error fetching profile detail.' }, err: w }),
        console.error('Error fetching profile detail:', w);
    } finally {
      n(4, (u = !1));
    }
  });
  function h(w) {
    w && l.set(w);
  }
  function _() {
    n(1, (s = !0));
  }
  async function C() {
    const w = await rt.getProfile();
    h(w), n(1, (s = !1));
  }
  function b() {
    n(1, (s = !1));
  }
  function A() {
    a.click();
  }
  function m(w) {
    const x = w.target;
    if (x.files && x.files[0]) {
      const F = x.files[0];
      if (F.size > 1e3 * 1024) {
        alert('File size exceeds 1000KB');
        return;
      }
      N(F);
    }
  }
  async function N(w) {
    Tt.startBusy({
      initiator: 'upload-image',
      text: 'Uploading profile picture...',
    });
    try {
      await rt.updateProfilePicture(w), await rt.sync();
      const x = await rt.getProfile();
      if ((h(x), x && x.profilePicture && x.profilePicture.length > 0)) {
        const F = new Blob([new Uint8Array(x.profilePicture)]);
        n(5, (r = URL.createObjectURL(F)));
      }
      Xr({ text: 'Profile image updated.', level: 'success', duration: 2e3 });
    } catch (x) {
      bn({ msg: { text: 'Error updating profile image.' }, err: x }),
        console.error('Error updating profile image', x);
    } finally {
      Tt.stopBusy('upload-image');
    }
  }
  function M(w) {
    wt[w ? 'unshift' : 'push'](() => {
      (a = w), n(2, a);
    });
  }
  return (
    (t.$$.update = () => {
      t.$$.dirty & 1 &&
        n(
          5,
          (r =
            i && i?.profilePicture && i?.profilePicture?.length > 0
              ? URL.createObjectURL(
                  new Blob([new Uint8Array(i.profilePicture)]),
                )
              : 'profile_placeholder.png'),
        );
    }),
    [i, s, a, o, u, r, l, _, C, b, A, m, M]
  );
}
class Na extends ce {
  constructor(e) {
    super(), oe(this, e, xa, Ta, le, {});
  }
}
function Aa(t) {
  let e, n, r, i, l, s, a, o;
  return (
    (n = new ln({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 0 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    (l = new an({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 1 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    {
      c() {
        (e = $('button')),
          J(n.$$.fragment),
          (r = L()),
          (i = $('button')),
          J(l.$$.fragment);
      },
      l(c) {
        e = E(c, 'BUTTON', {});
        var u = y(e);
        X(n.$$.fragment, u), u.forEach(d), (r = j(c)), (i = E(c, 'BUTTON', {}));
        var h = y(i);
        X(l.$$.fragment, h), h.forEach(d);
      },
      m(c, u) {
        P(c, e, u),
          W(n, e, null),
          P(c, r, u),
          P(c, i, u),
          W(l, i, null),
          (s = !0),
          a || ((o = [_e(e, 'click', t[5]), _e(i, 'click', t[6])]), (a = !0));
      },
      p(c, u) {
        const h = {};
        u & 1 && (h.fill = c[0] == 0 ? '#FFFFFF' : '#8C8C8C'), n.$set(h);
        const _ = {};
        u & 1 && (_.fill = c[0] == 1 ? '#FFFFFF' : '#8C8C8C'), l.$set(_);
      },
      i(c) {
        s || (T(n.$$.fragment, c), T(l.$$.fragment, c), (s = !0));
      },
      o(c) {
        I(n.$$.fragment, c), I(l.$$.fragment, c), (s = !1);
      },
      d(c) {
        c && (d(e), d(r), d(i)), G(n), G(l), (a = !1), Ne(o);
      },
    }
  );
}
function hr(t) {
  let e, n;
  return (
    (e = new Na({})),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function Sa(t) {
  let e, n;
  return (
    (e = new ia({})),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function Ia(t) {
  let e, n;
  return (
    (e = new _a({})),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function Oa(t) {
  let e, n;
  return (
    (e = new va({})),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function pr(t) {
  let e,
    n = 'Welcome to OpenBook',
    r,
    i,
    l = `OpenBook is a decentralised business management tool for organisations
        of all sizes:`,
    s,
    a,
    o = 'Create Organisation',
    c,
    u,
    h = 'Find Existing';
  return {
    c() {
      (e = $('p')),
        (e.textContent = n),
        (r = L()),
        (i = $('p')),
        (i.textContent = l),
        (s = L()),
        (a = $('button')),
        (a.textContent = o),
        (c = L()),
        (u = $('button')),
        (u.textContent = h),
        this.h();
    },
    l(_) {
      (e = E(_, 'P', { class: !0, 'data-svelte-h': !0 })),
        he(e) !== 'svelte-11g1yv3' && (e.textContent = n),
        (r = j(_)),
        (i = E(_, 'P', { 'data-svelte-h': !0 })),
        he(i) !== 'svelte-1egctsq' && (i.textContent = l),
        (s = j(_)),
        (a = E(_, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
        he(a) !== 'svelte-18bx0bz' && (a.textContent = o),
        (c = j(_)),
        (u = E(_, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
        he(u) !== 'svelte-18itbrx' && (u.textContent = h),
        this.h();
    },
    h() {
      f(e, 'class', 'text-2xl'),
        f(a, 'class', 'book-btn mt-4'),
        f(u, 'class', 'book-btn mt-4 disabled');
    },
    m(_, C) {
      P(_, e, C),
        P(_, r, C),
        P(_, i, C),
        P(_, s, C),
        P(_, a, C),
        P(_, c, C),
        P(_, u, C);
    },
    d(_) {
      _ && (d(e), d(r), d(i), d(s), d(a), d(c), d(u));
    },
  };
}
function Pa(t) {
  let e, n, r, i, l, s, a, o, c, u, h, _, C, b, A, m, N;
  r = new Dt({ props: { className: 'w-6' } });
  let M = t[3] === 0 && Aa(t);
  (a = new In({ props: { fill: '#555555' } })), (u = new ta({}));
  let w = t[1] === '/profile' && hr(),
    x = t[3] === 0 && Sa(),
    F = t[3] === 1 && Ia(),
    z = t[3] === 2 && Oa(),
    R = t[3] < 0 && t[1] === '/' && pr();
  return {
    c() {
      (e = $('nav')),
        (n = $('a')),
        J(r.$$.fragment),
        (i = L()),
        M && M.c(),
        (l = L()),
        (s = $('div')),
        J(a.$$.fragment),
        (o = L()),
        (c = $('div')),
        J(u.$$.fragment),
        (h = L()),
        (_ = $('div')),
        w && w.c(),
        (C = L()),
        x && x.c(),
        (b = L()),
        F && F.c(),
        (A = L()),
        z && z.c(),
        (m = L()),
        R && R.c(),
        this.h();
    },
    l(D) {
      e = E(D, 'NAV', { class: !0 });
      var B = y(e);
      n = E(B, 'A', { href: !0 });
      var U = y(n);
      X(r.$$.fragment, U),
        U.forEach(d),
        (i = j(B)),
        M && M.l(B),
        (l = j(B)),
        (s = E(B, 'DIV', { class: !0 }));
      var K = y(s);
      X(a.$$.fragment, K),
        K.forEach(d),
        B.forEach(d),
        (o = j(D)),
        (c = E(D, 'DIV', { class: !0 }));
      var H = y(c);
      X(u.$$.fragment, H), (h = j(H)), (_ = E(H, 'DIV', { class: !0 }));
      var fe = y(_);
      w && w.l(fe),
        (C = j(fe)),
        x && x.l(fe),
        (b = j(fe)),
        F && F.l(fe),
        (A = j(fe)),
        z && z.l(fe),
        (m = j(fe)),
        R && R.l(fe),
        fe.forEach(d),
        H.forEach(d),
        this.h();
    },
    h() {
      f(n, 'href', '/'),
        f(s, 'class', 'pull-down'),
        f(e, 'class', 'p-4 h-full side-nav flex flex-col'),
        f(_, 'class', 'flex-1 overflow-y-auto p-4'),
        f(c, 'class', 'w-full');
    },
    m(D, B) {
      P(D, e, B),
        p(e, n),
        W(r, n, null),
        p(e, i),
        M && M.m(e, null),
        p(e, l),
        p(e, s),
        W(a, s, null),
        P(D, o, B),
        P(D, c, B),
        W(u, c, null),
        p(c, h),
        p(c, _),
        w && w.m(_, null),
        p(_, C),
        x && x.m(_, null),
        p(_, b),
        F && F.m(_, null),
        p(_, A),
        z && z.m(_, null),
        p(_, m),
        R && R.m(_, null),
        (N = !0);
    },
    p(D, [B]) {
      D[3] === 0 && M.p(D, B),
        D[1] === '/profile'
          ? w
            ? B & 2 && T(w, 1)
            : ((w = hr()), w.c(), T(w, 1), w.m(_, C))
          : w &&
            (ye(),
            I(w, 1, 1, () => {
              w = null;
            }),
            Ce()),
        D[3] < 0 && D[1] === '/'
          ? R || ((R = pr()), R.c(), R.m(_, null))
          : R && (R.d(1), (R = null));
    },
    i(D) {
      N ||
        (T(r.$$.fragment, D),
        T(M),
        T(a.$$.fragment, D),
        T(u.$$.fragment, D),
        T(w),
        T(x),
        T(F),
        T(z),
        (N = !0));
    },
    o(D) {
      I(r.$$.fragment, D),
        I(M),
        I(a.$$.fragment, D),
        I(u.$$.fragment, D),
        I(w),
        I(x),
        I(F),
        I(z),
        (N = !1);
    },
    d(D) {
      D && (d(e), d(o), d(c)),
        G(r),
        M && M.d(),
        G(a),
        G(u),
        w && w.d(),
        x && x.d(),
        F && F.d(),
        z && z.d(),
        R && R.d();
    },
  };
}
function Fa(t, e, n) {
  let r, i;
  Me(t, Nn, (u) => n(4, (i = u)));
  let l = 0;
  function s(u) {
    n(0, (l = u));
  }
  let a = -1;
  Ke(async () => {});
  const o = () => s(0),
    c = () => s(1);
  return (
    (t.$$.update = () => {
      t.$$.dirty & 16 && n(1, (r = i.url.pathname));
    }),
    [l, r, s, a, i, o, c]
  );
}
class Qr extends ce {
  constructor(e) {
    super(), oe(this, e, Fa, Pa, le, {});
  }
}
function Ba(t) {
  let e,
    n =
      '<img src="home.png" alt="" class="hidden-image aspect-w-16 md:h-full w-full md:w-auto object-cover object-middle"/>',
    r,
    i,
    l,
    s,
    a,
    o,
    c = 'Welcome Back',
    u,
    h,
    _ = 'Please connect to continue',
    C,
    b,
    A,
    m = 'Connect',
    N,
    M,
    w = 'Whitepaper',
    x,
    F,
    z = `Welcome to OpenBook, the future of business management at your fingertips!
      Experience the ease of decentralised business management, secure
      transaction management and real-time insights.`,
    R,
    D,
    B;
  return (
    (s = new Dt({ props: { className: 'w-24' } })),
    {
      c() {
        (e = $('div')),
          (e.innerHTML = n),
          (r = L()),
          (i = $('div')),
          (l = $('div')),
          J(s.$$.fragment),
          (a = L()),
          (o = $('p')),
          (o.textContent = c),
          (u = L()),
          (h = $('p')),
          (h.textContent = _),
          (C = L()),
          (b = $('div')),
          (A = $('button')),
          (A.textContent = m),
          (N = L()),
          (M = $('a')),
          (M.textContent = w),
          (x = L()),
          (F = $('p')),
          (F.textContent = z),
          this.h();
      },
      l(U) {
        (e = E(U, 'DIV', { class: !0, 'data-svelte-h': !0 })),
          he(e) !== 'svelte-14qlssr' && (e.innerHTML = n),
          (r = j(U)),
          (i = E(U, 'DIV', { class: !0 }));
        var K = y(i);
        l = E(K, 'DIV', { class: !0 });
        var H = y(l);
        X(s.$$.fragment, H),
          (a = j(H)),
          (o = E(H, 'P', { 'data-svelte-h': !0 })),
          he(o) !== 'svelte-xf904x' && (o.textContent = c),
          (u = j(H)),
          (h = E(H, 'P', { class: !0, 'data-svelte-h': !0 })),
          he(h) !== 'svelte-8vrkqj' && (h.textContent = _),
          (C = j(H)),
          (b = E(H, 'DIV', { class: !0 }));
        var fe = y(b);
        (A = E(fe, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
          he(A) !== 'svelte-k8064b' && (A.textContent = m),
          (N = j(fe)),
          (M = E(fe, 'A', { href: !0, class: !0, 'data-svelte-h': !0 })),
          he(M) !== 'svelte-vlfr5f' && (M.textContent = w),
          fe.forEach(d),
          (x = j(H)),
          (F = E(H, 'P', { class: !0, 'data-svelte-h': !0 })),
          he(F) !== 'svelte-5t7oxk' && (F.textContent = z),
          H.forEach(d),
          K.forEach(d),
          this.h();
      },
      h() {
        f(
          e,
          'class',
          'relative md:w-auto w-full h-full overflow-hidden md:overflow-visible',
        ),
          f(h, 'class', 'hidden'),
          f(A, 'class', 'book-btn min-w-[150px]'),
          f(M, 'href', '/whitepaper'),
          f(M, 'class', 'book-btn min-w-[150px]'),
          f(b, 'class', 'flex flex-row space-x-2'),
          f(F, 'class', 'text-center'),
          f(
            l,
            'class',
            'md:flex-1 flex flex-col justify-center items-center p-4 md:p-12 my-16 md:my-2 space-y-8',
          ),
          f(
            i,
            'class',
            'md:flex-1 flex flex-col justify-center items-center p-4 md:p-12 my-16 md:my-2',
          );
      },
      m(U, K) {
        P(U, e, K),
          P(U, r, K),
          P(U, i, K),
          p(i, l),
          W(s, l, null),
          p(l, a),
          p(l, o),
          p(l, u),
          p(l, h),
          p(l, C),
          p(l, b),
          p(b, A),
          p(b, N),
          p(b, M),
          p(l, x),
          p(l, F),
          (R = !0),
          D || ((B = _e(A, 'click', t[0])), (D = !0));
      },
      p: q,
      i(U) {
        R || (T(s.$$.fragment, U), (R = !0));
      },
      o(U) {
        I(s.$$.fragment, U), (R = !1);
      },
      d(U) {
        U && (d(e), d(r), d(i)), G(s), (D = !1), B();
      },
    }
  );
}
function Da(t) {
  function e() {
    let n = {
      domain: 'http://localhost:8080/?canisterId=qhbym-qaaaa-aaaaa-aaafq-cai',
    };
    Ze.signIn(n);
  }
  return (
    Ke(async () => {
      try {
        document.querySelectorAll('.hidden-image').forEach((r) => {
          const i = r;
          i.style.visibility = 'visible';
        });
      } catch (n) {
        console.error('Error', n);
      } finally {
      }
    }),
    [e]
  );
}
class Yr extends ce {
  constructor(e) {
    super(), oe(this, e, Da, Ba, le, {});
  }
}
function Ra(t) {
  let e, n;
  return (
    (e = new Yr({})),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function Ma(t) {
  let e, n, r;
  return (
    (n = new Qr({})),
    {
      c() {
        (e = $('div')), J(n.$$.fragment), this.h();
      },
      l(i) {
        e = E(i, 'DIV', { class: !0 });
        var l = y(e);
        X(n.$$.fragment, l), l.forEach(d), this.h();
      },
      h() {
        f(e, 'class', 'flex flex-row h-screen w-full');
      },
      m(i, l) {
        P(i, e, l), W(n, e, null), (r = !0);
      },
      i(i) {
        r || (T(n.$$.fragment, i), (r = !0));
      },
      o(i) {
        I(n.$$.fragment, i), (r = !1);
      },
      d(i) {
        i && d(e), G(n);
      },
    }
  );
}
function Va(t) {
  let e, n, r, i;
  const l = [Ma, Ra],
    s = [];
  function a(o, c) {
    return o[0] ? 0 : 1;
  }
  return (
    (e = a(t)),
    (n = s[e] = l[e](t)),
    {
      c() {
        n.c(), (r = me());
      },
      l(o) {
        n.l(o), (r = me());
      },
      m(o, c) {
        s[e].m(o, c), P(o, r, c), (i = !0);
      },
      p(o, c) {
        let u = e;
        (e = a(o)),
          e !== u &&
            (ye(),
            I(s[u], 1, 1, () => {
              s[u] = null;
            }),
            Ce(),
            (n = s[e]),
            n || ((n = s[e] = l[e](o)), n.c()),
            T(n, 1),
            n.m(r.parentNode, r));
      },
      i(o) {
        i || (T(n), (i = !0));
      },
      o(o) {
        I(n), (i = !1);
      },
      d(o) {
        o && d(r), s[e].d(o);
      },
    }
  );
}
function Ua(t) {
  let e, n;
  return (
    (e = new Sn({
      props: { $$slots: { default: [Va] }, $$scope: { ctx: t } },
    })),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      p(r, [i]) {
        const l = {};
        i & 5 && (l.$$scope = { dirty: i, ctx: r }), e.$set(l);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function La(t, e, n) {
  let r;
  return (
    Me(t, Jr, (i) => n(0, (r = i))),
    Ke(async () => {
      try {
        await Ze.sync();
      } catch (i) {
        console.error('Error fetching homepage data:', i);
      } finally {
      }
    }),
    [r]
  );
}
let ja = class extends ce {
  constructor(e) {
    super(), oe(this, e, La, Ua, le, {});
  }
};
const Ha = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: ja },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
function za(t) {
  let e, n;
  return (
    (e = new Yr({})),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function qa(t) {
  let e, n, r;
  return (
    (n = new Qr({})),
    {
      c() {
        (e = $('div')), J(n.$$.fragment), this.h();
      },
      l(i) {
        e = E(i, 'DIV', { class: !0 });
        var l = y(e);
        X(n.$$.fragment, l), l.forEach(d), this.h();
      },
      h() {
        f(e, 'class', 'flex flex-row h-screen w-full');
      },
      m(i, l) {
        P(i, e, l), W(n, e, null), (r = !0);
      },
      i(i) {
        r || (T(n.$$.fragment, i), (r = !0));
      },
      o(i) {
        I(n.$$.fragment, i), (r = !1);
      },
      d(i) {
        i && d(e), G(n);
      },
    }
  );
}
function Ka(t) {
  let e, n, r, i;
  const l = [qa, za],
    s = [];
  function a(o, c) {
    return o[0] ? 0 : 1;
  }
  return (
    (e = a(t)),
    (n = s[e] = l[e](t)),
    {
      c() {
        n.c(), (r = me());
      },
      l(o) {
        n.l(o), (r = me());
      },
      m(o, c) {
        s[e].m(o, c), P(o, r, c), (i = !0);
      },
      p(o, c) {
        let u = e;
        (e = a(o)),
          e !== u &&
            (ye(),
            I(s[u], 1, 1, () => {
              s[u] = null;
            }),
            Ce(),
            (n = s[e]),
            n || ((n = s[e] = l[e](o)), n.c()),
            T(n, 1),
            n.m(r.parentNode, r));
      },
      i(o) {
        i || (T(n), (i = !0));
      },
      o(o) {
        I(n), (i = !1);
      },
      d(o) {
        o && d(r), s[e].d(o);
      },
    }
  );
}
function Za(t) {
  let e, n;
  return (
    (e = new Sn({
      props: { $$slots: { default: [Ka] }, $$scope: { ctx: t } },
    })),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      p(r, [i]) {
        const l = {};
        i & 5 && (l.$$scope = { dirty: i, ctx: r }), e.$set(l);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function Wa(t, e, n) {
  let r;
  return (
    Me(t, Jr, (i) => n(0, (r = i))),
    Ke(async () => {
      try {
        await Ze.sync();
      } catch (i) {
        console.error('Error fetching homepage data:', i);
      } finally {
      }
    }),
    [r]
  );
}
let Ga = class extends ce {
  constructor(e) {
    super(), oe(this, e, Wa, Za, le, {});
  }
};
const Ja = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: Ga },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
function Xa(t) {
  let e,
    n = 'Minimum Viable Product (MVP)',
    r,
    i,
    l = `<div class="space-y-4"><p>OpenBook will conduct it&#39;s decentralisation sale as a fully integrated
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
    s,
    a,
    o = 'View System Designs (coming soon)';
  return {
    c() {
      (e = $('h1')),
        (e.textContent = n),
        (r = L()),
        (i = $('div')),
        (i.innerHTML = l),
        (s = L()),
        (a = $('button')),
        (a.textContent = o),
        this.h();
    },
    l(c) {
      (e = E(c, 'H1', { class: !0, 'data-svelte-h': !0 })),
        he(e) !== 'svelte-172t505' && (e.textContent = n),
        (r = j(c)),
        (i = E(c, 'DIV', { class: !0, 'data-svelte-h': !0 })),
        he(i) !== 'svelte-chx0hb' && (i.innerHTML = l),
        (s = j(c)),
        (a = E(c, 'BUTTON', { class: !0, 'data-svelte-h': !0 })),
        he(a) !== 'svelte-qdsuyd' && (a.textContent = o),
        this.h();
    },
    h() {
      f(e, 'class', 'text-2xl mb-8 mt-4'),
        f(i, 'class', 'flex flex-col space-y-12 mt-4 mb-4'),
        (a.disabled = !0),
        f(a, 'class', 'book-btn my-8 disabled');
    },
    m(c, u) {
      P(c, e, u), P(c, r, u), P(c, i, u), P(c, s, u), P(c, a, u);
    },
    p: q,
    i: q,
    o: q,
    d(c) {
      c && (d(e), d(r), d(i), d(s), d(a));
    },
  };
}
class Qa extends ce {
  constructor(e) {
    super(), oe(this, e, null, Xa, le, {});
  }
}
function Ya(t) {
  let e,
    n = 'The OpenBook Team',
    r,
    i,
    l = `<p>OpenBook was founded by James Beadle. James&#39; experience in developing
    financial systems spans various organisations, each with unique
    transactional data and reporting needs. His background equips him with a
    practical understanding of the complexities involved in creating tailored
    financial solutions.</p>`;
  return {
    c() {
      (e = $('h1')),
        (e.textContent = n),
        (r = L()),
        (i = $('div')),
        (i.innerHTML = l),
        this.h();
    },
    l(s) {
      (e = E(s, 'H1', { class: !0, 'data-svelte-h': !0 })),
        he(e) !== 'svelte-yexfpg' && (e.textContent = n),
        (r = j(s)),
        (i = E(s, 'DIV', { class: !0, 'data-svelte-h': !0 })),
        he(i) !== 'svelte-jxxvk7' && (i.innerHTML = l),
        this.h();
    },
    h() {
      f(e, 'class', 'text-2xl mb-8 mt-4'),
        f(i, 'class', 'flex flex-col space-y-12 mt-4 mb-4');
    },
    m(s, a) {
      P(s, e, a), P(s, r, a), P(s, i, a);
    },
    p: q,
    i: q,
    o: q,
    d(s) {
      s && (d(e), d(r), d(i));
    },
  };
}
class eo extends ce {
  constructor(e) {
    super(), oe(this, e, null, Ya, le, {});
  }
}
function to(t) {
  let e,
    n = 'Value Proposition',
    r,
    i,
    l = `<div class="space-y-4"><h1 class="text-xl">$BOOK Utility Token</h1> <p>OpenBook operates as a DAO (Decentralised Autonomous Organisation). The
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
      (e = $('h1')),
        (e.textContent = n),
        (r = L()),
        (i = $('div')),
        (i.innerHTML = l),
        this.h();
    },
    l(s) {
      (e = E(s, 'H1', { class: !0, 'data-svelte-h': !0 })),
        he(e) !== 'svelte-18v727s' && (e.textContent = n),
        (r = j(s)),
        (i = E(s, 'DIV', { class: !0, 'data-svelte-h': !0 })),
        he(i) !== 'svelte-1q1zv5n' && (i.innerHTML = l),
        this.h();
    },
    h() {
      f(e, 'class', 'text-2xl mb-8 mt-4'),
        f(i, 'class', 'flex flex-col space-y-12 mt-4 mb-4');
    },
    m(s, a) {
      P(s, e, a), P(s, r, a), P(s, i, a);
    },
    p: q,
    i: q,
    o: q,
    d(s) {
      s && (d(e), d(r), d(i));
    },
  };
}
class no extends ce {
  constructor(e) {
    super(), oe(this, e, null, to, le, {});
  }
}
function ro(t) {
  let e,
    n = 'Vision',
    r,
    i,
    l = `<p>Businesses are increasingly turning to Software as a Service (SaaS)
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
      (e = $('h1')),
        (e.textContent = n),
        (r = L()),
        (i = $('div')),
        (i.innerHTML = l),
        this.h();
    },
    l(s) {
      (e = E(s, 'H1', { class: !0, 'data-svelte-h': !0 })),
        he(e) !== 'svelte-i9bpij' && (e.textContent = n),
        (r = j(s)),
        (i = E(s, 'DIV', { class: !0, 'data-svelte-h': !0 })),
        he(i) !== 'svelte-1sok86p' && (i.innerHTML = l),
        this.h();
    },
    h() {
      f(e, 'class', 'text-2xl mb-8 mt-4'),
        f(i, 'class', 'flex flex-col space-y-8 mt-4 mb-4 mb-4');
    },
    m(s, a) {
      P(s, e, a), P(s, r, a), P(s, i, a);
    },
    p: q,
    i: q,
    o: q,
    d(s) {
      s && (d(e), d(r), d(i));
    },
  };
}
class io extends ce {
  constructor(e) {
    super(), oe(this, e, null, ro, le, {});
  }
}
function so(t) {
  let e, n;
  return {
    c() {
      (e = ee('svg')), (n = ee('path')), this.h();
    },
    l(r) {
      e = ne(r, 'svg', { xmlns: !0, class: !0, viewBox: !0, fill: !0 });
      var i = y(e);
      (n = ne(i, 'path', { d: !0, fill: !0 })),
        y(n).forEach(d),
        i.forEach(d),
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
    m(r, i) {
      P(r, e, i), p(e, n);
    },
    p(r, [i]) {
      i & 2 && f(n, 'fill', r[1]), i & 1 && f(e, 'class', r[0]);
    },
    i: q,
    o: q,
    d(r) {
      r && d(e);
    },
  };
}
function lo(t, e, n) {
  let { className: r = '' } = e,
    { fill: i = '#FFFFFF' } = e;
  return (
    (t.$$set = (l) => {
      'className' in l && n(0, (r = l.className)),
        'fill' in l && n(1, (i = l.fill));
    }),
    [r, i]
  );
}
class ao extends ce {
  constructor(e) {
    super(), oe(this, e, lo, so, le, { className: 0, fill: 1 });
  }
}
function oo(t) {
  let e, n, r, i, l, s;
  return {
    c() {
      (e = ee('svg')),
        (n = ee('g')),
        (r = ee('path')),
        (i = ee('defs')),
        (l = ee('clipPath')),
        (s = ee('rect')),
        this.h();
    },
    l(a) {
      e = ne(a, 'svg', { xmlns: !0, class: !0, viewBox: !0, fill: !0 });
      var o = y(e);
      n = ne(o, 'g', { 'clip-path': !0 });
      var c = y(n);
      (r = ne(c, 'path', { d: !0, fill: !0 })),
        y(r).forEach(d),
        c.forEach(d),
        (i = ne(o, 'defs', {}));
      var u = y(i);
      l = ne(u, 'clipPath', { id: !0 });
      var h = y(l);
      (s = ne(h, 'rect', { width: !0, height: !0, fill: !0 })),
        y(s).forEach(d),
        h.forEach(d),
        u.forEach(d),
        o.forEach(d),
        this.h();
    },
    h() {
      f(
        r,
        'd',
        'M10.644 17.08C13.51 16.418 15.183 15.839 13.89 13.398C9.958 5.971 12.848 2 17.001 2C21.236 2 24.055 6.124 20.111 13.398C18.779 15.853 20.548 16.432 23.353 17.08C25.836 17.654 26 18.867 26 20.969V22H8C8 19.255 7.78 17.742 10.644 17.08ZM-2 22H5.809C5.774 13.823 9.245 16.687 9.245 10.873C9.245 8.362 7.606 7 5.497 7C2.382 7 0.215 9.979 3.164 15.549C4.133 17.379 2.133 17.814 -0.017 18.31C-1.879 18.74 -2 19.65 -2 21.227V22Z',
      ),
        f(r, 'fill', t[1]),
        f(n, 'clip-path', 'url(#clip0_15_112)'),
        f(s, 'width', '24'),
        f(s, 'height', '24'),
        f(s, 'fill', t[1]),
        f(l, 'id', 'clip0_15_112'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'class', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'fill', 'none');
    },
    m(a, o) {
      P(a, e, o), p(e, n), p(n, r), p(e, i), p(i, l), p(l, s);
    },
    p(a, [o]) {
      o & 2 && f(r, 'fill', a[1]),
        o & 2 && f(s, 'fill', a[1]),
        o & 1 && f(e, 'class', a[0]);
    },
    i: q,
    o: q,
    d(a) {
      a && d(e);
    },
  };
}
function co(t, e, n) {
  let { className: r = '' } = e,
    { fill: i = '#FFFFFF' } = e;
  return (
    (t.$$set = (l) => {
      'className' in l && n(0, (r = l.className)),
        'fill' in l && n(1, (i = l.fill));
    }),
    [r, i]
  );
}
class fo extends ce {
  constructor(e) {
    super(), oe(this, e, co, oo, le, { className: 0, fill: 1 });
  }
}
function uo(t) {
  let e, n, r, i, l, s;
  return {
    c() {
      (e = ee('svg')),
        (n = ee('g')),
        (r = ee('path')),
        (i = ee('defs')),
        (l = ee('clipPath')),
        (s = ee('rect')),
        this.h();
    },
    l(a) {
      e = ne(a, 'svg', { xmlns: !0, class: !0, viewBox: !0, fill: !0 });
      var o = y(e);
      n = ne(o, 'g', { 'clip-path': !0 });
      var c = y(n);
      (r = ne(c, 'path', { d: !0, fill: !0 })),
        y(r).forEach(d),
        c.forEach(d),
        (i = ne(o, 'defs', {}));
      var u = y(i);
      l = ne(u, 'clipPath', { id: !0 });
      var h = y(l);
      (s = ne(h, 'rect', { width: !0, height: !0, fill: !0 })),
        y(s).forEach(d),
        h.forEach(d),
        u.forEach(d),
        o.forEach(d),
        this.h();
    },
    h() {
      f(
        r,
        'd',
        'M5 9C6.654 9 8 10.346 8 12C8 13.654 6.654 15 5 15C3.346 15 2 13.654 2 12C2 10.346 3.346 9 5 9ZM5 7C2.238 7 0 9.239 0 12C0 14.761 2.238 17 5 17C7.762 17 10 14.761 10 12C10 9.239 7.762 7 5 7ZM20 16C18.835 16 17.796 16.506 17.065 17.301L11.577 14.374C11.347 15.01 11.028 15.603 10.633 16.138L16.121 19.065C16.049 19.366 16 19.676 16 20C16 22.209 17.791 24 20 24C22.209 24 24 22.209 24 20C24 17.791 22.209 16 20 16ZM20 22C18.897 22 18 21.103 18 20C18 18.897 18.897 18 20 18C21.103 18 22 18.897 22 20C22 21.103 21.103 22 20 22ZM20 0C17.791 0 16 1.791 16 4C16 4.324 16.049 4.634 16.121 4.935L10.633 7.862C11.028 8.398 11.346 8.99 11.577 9.626L17.065 6.699C17.796 7.494 18.835 8 20 8C22.209 8 24 6.209 24 4C24 1.791 22.209 0 20 0ZM20 6C18.897 6 18 5.103 18 4C18 2.897 18.897 2 20 2C21.103 2 22 2.897 22 4C22 5.103 21.103 6 20 6Z',
      ),
        f(r, 'fill', t[1]),
        f(n, 'clip-path', 'url(#clip0_15_154)'),
        f(s, 'width', '24'),
        f(s, 'height', '24'),
        f(s, 'fill', t[1]),
        f(l, 'id', 'clip0_15_154'),
        f(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(e, 'class', t[0]),
        f(e, 'viewBox', '0 0 24 24'),
        f(e, 'fill', 'none');
    },
    m(a, o) {
      P(a, e, o), p(e, n), p(n, r), p(e, i), p(i, l), p(l, s);
    },
    p(a, [o]) {
      o & 2 && f(r, 'fill', a[1]),
        o & 2 && f(s, 'fill', a[1]),
        o & 1 && f(e, 'class', a[0]);
    },
    i: q,
    o: q,
    d(a) {
      a && d(e);
    },
  };
}
function ho(t, e, n) {
  let { className: r = '' } = e,
    { fill: i = '#FFFFFF' } = e;
  return (
    (t.$$set = (l) => {
      'className' in l && n(0, (r = l.className)),
        'fill' in l && n(1, (i = l.fill));
    }),
    [r, i]
  );
}
class po extends ce {
  constructor(e) {
    super(), oe(this, e, ho, uo, le, { className: 0, fill: 1 });
  }
}
function _o(t) {
  let e,
    n = 'Roadmap: Building Towards AI-Enhanced Business Operations',
    r,
    i,
    l = `<div class="space-y-4"><h1 class="text-xl">Ongoing: Security and Transparency Balance</h1> <ul class="list-disc px-4"><li>Maintaining the delicate balance between data security and transparency.</li> <li>Ensuring private data remains protected while providing necessary
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
      (e = $('h1')),
        (e.textContent = n),
        (r = L()),
        (i = $('div')),
        (i.innerHTML = l),
        this.h();
    },
    l(s) {
      (e = E(s, 'H1', { class: !0, 'data-svelte-h': !0 })),
        he(e) !== 'svelte-1isdr5e' && (e.textContent = n),
        (r = j(s)),
        (i = E(s, 'DIV', { class: !0, 'data-svelte-h': !0 })),
        he(i) !== 'svelte-1361nsh' && (i.innerHTML = l),
        this.h();
    },
    h() {
      f(e, 'class', 'text-2xl mb-8 mt-4'),
        f(i, 'class', 'flex flex-col space-y-12 mt-4 mb-4');
    },
    m(s, a) {
      P(s, e, a), P(s, r, a), P(s, i, a);
    },
    p: q,
    i: q,
    o: q,
    d(s) {
      s && (d(e), d(r), d(i));
    },
  };
}
class mo extends ce {
  constructor(e) {
    super(), oe(this, e, null, _o, le, {});
  }
}
function _r(t) {
  let e, n;
  return (
    (e = new io({})),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function mr(t) {
  let e, n;
  return (
    (e = new mo({})),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function gr(t) {
  let e, n;
  return (
    (e = new no({})),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function vr(t) {
  let e, n;
  return (
    (e = new Qa({})),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function br(t) {
  let e, n;
  return (
    (e = new eo({})),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function go(t) {
  let e,
    n,
    r,
    i,
    l,
    s,
    a,
    o,
    c,
    u,
    h,
    _,
    C,
    b,
    A,
    m,
    N,
    M,
    w,
    x,
    F,
    z,
    R = '<h1>OpenBook Whitepaper</h1>',
    D,
    B,
    U,
    K,
    H,
    fe,
    ue,
    de,
    ke,
    Oe,
    Ae,
    Pe,
    Fe,
    we,
    Ve,
    xe,
    Te,
    Ee,
    Ue,
    Je;
  (i = new Dt({ props: { className: 'w-6' } })),
    (a = new ln({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 0 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    (u = new an({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 1 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    (C = new po({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 2 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    (m = new ao({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 3 ? '#FFFFFF' : '#8C8C8C',
      },
    })),
    (w = new fo({
      props: {
        className: 'side-nav-icon',
        fill: t[0] == 4 ? '#FFFFFF' : '#8C8C8C',
      },
    }));
  let be = t[0] == 0 && _r(),
    pe = t[0] == 1 && mr(),
    v = t[0] == 2 && gr(),
    k = t[0] == 3 && vr(),
    S = t[0] == 4 && br();
  return {
    c() {
      (e = $('div')),
        (n = $('nav')),
        (r = $('a')),
        J(i.$$.fragment),
        (l = L()),
        (s = $('button')),
        J(a.$$.fragment),
        (o = L()),
        (c = $('button')),
        J(u.$$.fragment),
        (h = L()),
        (_ = $('button')),
        J(C.$$.fragment),
        (b = L()),
        (A = $('button')),
        J(m.$$.fragment),
        (N = L()),
        (M = $('button')),
        J(w.$$.fragment),
        (x = L()),
        (F = $('main')),
        (z = $('div')),
        (z.innerHTML = R),
        (D = L()),
        (B = $('div')),
        be && be.c(),
        (U = L()),
        pe && pe.c(),
        (K = L()),
        v && v.c(),
        (H = L()),
        k && k.c(),
        (fe = L()),
        S && S.c(),
        (ue = L()),
        (de = $('div')),
        (ke = $('button')),
        (Oe = Ie('< Prior Section')),
        (Fe = L()),
        (we = $('button')),
        (Ve = Ie('Next Section >')),
        this.h();
    },
    l(g) {
      e = E(g, 'DIV', { class: !0 });
      var O = y(e);
      n = E(O, 'NAV', { class: !0 });
      var V = y(n);
      r = E(V, 'A', { href: !0 });
      var Q = y(r);
      X(i.$$.fragment, Q), Q.forEach(d), (l = j(V)), (s = E(V, 'BUTTON', {}));
      var te = y(s);
      X(a.$$.fragment, te), te.forEach(d), (o = j(V)), (c = E(V, 'BUTTON', {}));
      var ie = y(c);
      X(u.$$.fragment, ie), ie.forEach(d), (h = j(V)), (_ = E(V, 'BUTTON', {}));
      var re = y(_);
      X(C.$$.fragment, re), re.forEach(d), (b = j(V)), (A = E(V, 'BUTTON', {}));
      var se = y(A);
      X(m.$$.fragment, se), se.forEach(d), (N = j(V)), (M = E(V, 'BUTTON', {}));
      var Y = y(M);
      X(w.$$.fragment, Y),
        Y.forEach(d),
        V.forEach(d),
        (x = j(O)),
        (F = E(O, 'MAIN', { class: !0 }));
      var ae = y(F);
      (z = E(ae, 'DIV', { class: !0, 'data-svelte-h': !0 })),
        he(z) !== 'svelte-ra0uei' && (z.innerHTML = R),
        (D = j(ae)),
        (B = E(ae, 'DIV', { class: !0 }));
      var Z = y(B);
      be && be.l(Z),
        (U = j(Z)),
        pe && pe.l(Z),
        (K = j(Z)),
        v && v.l(Z),
        (H = j(Z)),
        k && k.l(Z),
        (fe = j(Z)),
        S && S.l(Z),
        Z.forEach(d),
        (ue = j(ae)),
        (de = E(ae, 'DIV', { class: !0 }));
      var ge = y(de);
      ke = E(ge, 'BUTTON', { class: !0 });
      var ze = y(ke);
      (Oe = Re(ze, '< Prior Section')),
        ze.forEach(d),
        (Fe = j(ge)),
        (we = E(ge, 'BUTTON', { class: !0 }));
      var $e = y(we);
      (Ve = Re($e, 'Next Section >')),
        $e.forEach(d),
        ge.forEach(d),
        ae.forEach(d),
        O.forEach(d),
        this.h();
    },
    h() {
      f(r, 'href', '/'),
        f(n, 'class', 'p-4 h-full side-nav flex flex-col svelte-13ks2f8'),
        f(z, 'class', 'w-full p-4 px-8 top-bar'),
        f(B, 'class', 'p-4 px-8'),
        (ke.disabled = Ae = t[0] == 0),
        f(ke, 'class', (Pe = 'book-btn ' + (t[0] == 0 ? 'disabled' : ''))),
        (we.disabled = xe = t[0] == t[1].length - 1),
        f(
          we,
          'class',
          (Te = 'book-btn ' + (t[0] == t[1].length - 1 ? 'disabled' : '')),
        ),
        f(de, 'class', 'flex flex-row space-x-4 px-7 mb-4'),
        f(F, 'class', 'flex-1'),
        f(e, 'class', 'flex h-full');
    },
    m(g, O) {
      P(g, e, O),
        p(e, n),
        p(n, r),
        W(i, r, null),
        p(n, l),
        p(n, s),
        W(a, s, null),
        p(n, o),
        p(n, c),
        W(u, c, null),
        p(n, h),
        p(n, _),
        W(C, _, null),
        p(n, b),
        p(n, A),
        W(m, A, null),
        p(n, N),
        p(n, M),
        W(w, M, null),
        p(e, x),
        p(e, F),
        p(F, z),
        p(F, D),
        p(F, B),
        be && be.m(B, null),
        p(B, U),
        pe && pe.m(B, null),
        p(B, K),
        v && v.m(B, null),
        p(B, H),
        k && k.m(B, null),
        p(B, fe),
        S && S.m(B, null),
        p(F, ue),
        p(F, de),
        p(de, ke),
        p(ke, Oe),
        p(de, Fe),
        p(de, we),
        p(we, Ve),
        (Ee = !0),
        Ue ||
          ((Je = [
            _e(s, 'click', t[5]),
            _e(c, 'click', t[6]),
            _e(_, 'click', t[7]),
            _e(A, 'click', t[8]),
            _e(M, 'click', t[9]),
            _e(ke, 'click', t[4]),
            _e(we, 'click', t[3]),
          ]),
          (Ue = !0));
    },
    p(g, O) {
      const V = {};
      O & 1 && (V.fill = g[0] == 0 ? '#FFFFFF' : '#8C8C8C'), a.$set(V);
      const Q = {};
      O & 1 && (Q.fill = g[0] == 1 ? '#FFFFFF' : '#8C8C8C'), u.$set(Q);
      const te = {};
      O & 1 && (te.fill = g[0] == 2 ? '#FFFFFF' : '#8C8C8C'), C.$set(te);
      const ie = {};
      O & 1 && (ie.fill = g[0] == 3 ? '#FFFFFF' : '#8C8C8C'), m.$set(ie);
      const re = {};
      O & 1 && (re.fill = g[0] == 4 ? '#FFFFFF' : '#8C8C8C'),
        w.$set(re),
        g[0] == 0
          ? be
            ? O & 1 && T(be, 1)
            : ((be = _r()), be.c(), T(be, 1), be.m(B, U))
          : be &&
            (ye(),
            I(be, 1, 1, () => {
              be = null;
            }),
            Ce()),
        g[0] == 1
          ? pe
            ? O & 1 && T(pe, 1)
            : ((pe = mr()), pe.c(), T(pe, 1), pe.m(B, K))
          : pe &&
            (ye(),
            I(pe, 1, 1, () => {
              pe = null;
            }),
            Ce()),
        g[0] == 2
          ? v
            ? O & 1 && T(v, 1)
            : ((v = gr()), v.c(), T(v, 1), v.m(B, H))
          : v &&
            (ye(),
            I(v, 1, 1, () => {
              v = null;
            }),
            Ce()),
        g[0] == 3
          ? k
            ? O & 1 && T(k, 1)
            : ((k = vr()), k.c(), T(k, 1), k.m(B, fe))
          : k &&
            (ye(),
            I(k, 1, 1, () => {
              k = null;
            }),
            Ce()),
        g[0] == 4
          ? S
            ? O & 1 && T(S, 1)
            : ((S = br()), S.c(), T(S, 1), S.m(B, null))
          : S &&
            (ye(),
            I(S, 1, 1, () => {
              S = null;
            }),
            Ce()),
        (!Ee || (O & 1 && Ae !== (Ae = g[0] == 0))) && (ke.disabled = Ae),
        (!Ee ||
          (O & 1 &&
            Pe !== (Pe = 'book-btn ' + (g[0] == 0 ? 'disabled' : '')))) &&
          f(ke, 'class', Pe),
        (!Ee || (O & 1 && xe !== (xe = g[0] == g[1].length - 1))) &&
          (we.disabled = xe),
        (!Ee ||
          (O & 1 &&
            Te !==
              (Te =
                'book-btn ' + (g[0] == g[1].length - 1 ? 'disabled' : '')))) &&
          f(we, 'class', Te);
    },
    i(g) {
      Ee ||
        (T(i.$$.fragment, g),
        T(a.$$.fragment, g),
        T(u.$$.fragment, g),
        T(C.$$.fragment, g),
        T(m.$$.fragment, g),
        T(w.$$.fragment, g),
        T(be),
        T(pe),
        T(v),
        T(k),
        T(S),
        (Ee = !0));
    },
    o(g) {
      I(i.$$.fragment, g),
        I(a.$$.fragment, g),
        I(u.$$.fragment, g),
        I(C.$$.fragment, g),
        I(m.$$.fragment, g),
        I(w.$$.fragment, g),
        I(be),
        I(pe),
        I(v),
        I(k),
        I(S),
        (Ee = !1);
    },
    d(g) {
      g && d(e),
        G(i),
        G(a),
        G(u),
        G(C),
        G(m),
        G(w),
        be && be.d(),
        pe && pe.d(),
        v && v.d(),
        k && k.d(),
        S && S.d(),
        (Ue = !1),
        Ne(Je);
    },
  };
}
function vo(t) {
  let e, n;
  return (
    (e = new Sn({
      props: { $$slots: { default: [go] }, $$scope: { ctx: t } },
    })),
    {
      c() {
        J(e.$$.fragment);
      },
      l(r) {
        X(e.$$.fragment, r);
      },
      m(r, i) {
        W(e, r, i), (n = !0);
      },
      p(r, [i]) {
        const l = {};
        i & 1025 && (l.$$scope = { dirty: i, ctx: r }), e.$set(l);
      },
      i(r) {
        n || (T(e.$$.fragment, r), (n = !0));
      },
      o(r) {
        I(e.$$.fragment, r), (n = !1);
      },
      d(r) {
        G(e, r);
      },
    }
  );
}
function bo(t, e, n) {
  let r = 0,
    i = ['vision', 'value', 'roadmap', 'mvp', 'team'];
  function l(C) {
    n(0, (r = C));
  }
  function s() {
    n(0, (r = r + 1 > i.length - 1 ? 0 : r + 1));
  }
  function a() {
    n(0, (r = r - 1 < 0 ? i.length - 1 : r - 1));
  }
  return [
    r,
    i,
    l,
    s,
    a,
    () => l(0),
    () => l(1),
    () => l(2),
    () => l(3),
    () => l(4),
  ];
}
class wo extends ce {
  constructor(e) {
    super(), oe(this, e, bo, vo, le, {});
  }
}
const yo = Object.freeze(
  Object.defineProperty(
    { __proto__: null, component: wo },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);
export {
  _s as E,
  fs as L,
  ja as P,
  To as R,
  St as _,
  Bo as a,
  No as b,
  Po as c,
  Ao as d,
  Ga as e,
  wo as f,
  Fo as g,
  So as h,
  Eo as m,
  xo as n,
  Do as r,
  ko as s,
};
