import { c as Et, r as Qn, a as fn, g as on } from './index.19f627ce.js';
const cn = -1,
  Cn = -2,
  un = -3,
  hn = -4,
  ln = -5,
  wn = -6;
function iI(t, A) {
  if (typeof t == 'number') return s(t, !0);
  if (!Array.isArray(t) || t.length === 0) throw new Error('Invalid input');
  const e = t,
    g = Array(e.length);
  function s(l, y = !1) {
    if (l === cn) return;
    if (l === un) return NaN;
    if (l === hn) return 1 / 0;
    if (l === ln) return -1 / 0;
    if (l === wn) return -0;
    if (y) throw new Error('Invalid input');
    if (l in g) return g[l];
    const u = e[l];
    if (!u || typeof u != 'object') g[l] = u;
    else if (Array.isArray(u))
      if (typeof u[0] == 'string') {
        const M = u[0],
          b = A?.[M];
        if (b) return (g[l] = b(s(u[1])));
        switch (M) {
          case 'Date':
            g[l] = new Date(u[1]);
            break;
          case 'Set':
            const $ = new Set();
            g[l] = $;
            for (let AA = 1; AA < u.length; AA += 1) $.add(s(u[AA]));
            break;
          case 'Map':
            const J = new Map();
            g[l] = J;
            for (let AA = 1; AA < u.length; AA += 2)
              J.set(s(u[AA]), s(u[AA + 1]));
            break;
          case 'RegExp':
            g[l] = new RegExp(u[1], u[2]);
            break;
          case 'Object':
            g[l] = Object(u[1]);
            break;
          case 'BigInt':
            g[l] = BigInt(u[1]);
            break;
          case 'null':
            const nA = Object.create(null);
            g[l] = nA;
            for (let AA = 1; AA < u.length; AA += 2) nA[u[AA]] = s(u[AA + 1]);
            break;
          default:
            throw new Error(`Unknown type ${M}`);
        }
      } else {
        const M = new Array(u.length);
        g[l] = M;
        for (let b = 0; b < u.length; b += 1) {
          const $ = u[b];
          $ !== Cn && (M[b] = s($));
        }
      }
    else {
      const M = {};
      g[l] = M;
      for (const b in u) {
        const $ = u[b];
        M[b] = s($);
      }
    }
    return g[l];
  }
  return s(0);
}
var wt = {},
  kt = {};
kt.byteLength = xn;
kt.toByteArray = Dn;
kt.fromByteArray = Fn;
var He = [],
  Re = [],
  pn = typeof Uint8Array < 'u' ? Uint8Array : Array,
  Ot = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var gt = 0, yn = Ot.length; gt < yn; ++gt)
  (He[gt] = Ot[gt]), (Re[Ot.charCodeAt(gt)] = gt);
Re['-'.charCodeAt(0)] = 62;
Re['_'.charCodeAt(0)] = 63;
function li(t) {
  var A = t.length;
  if (A % 4 > 0)
    throw new Error('Invalid string. Length must be a multiple of 4');
  var e = t.indexOf('=');
  e === -1 && (e = A);
  var g = e === A ? 0 : 4 - (e % 4);
  return [e, g];
}
function xn(t) {
  var A = li(t),
    e = A[0],
    g = A[1];
  return ((e + g) * 3) / 4 - g;
}
function dn(t, A, e) {
  return ((A + e) * 3) / 4 - e;
}
function Dn(t) {
  var A,
    e = li(t),
    g = e[0],
    s = e[1],
    l = new pn(dn(t, g, s)),
    y = 0,
    u = s > 0 ? g - 4 : g,
    M;
  for (M = 0; M < u; M += 4)
    (A =
      (Re[t.charCodeAt(M)] << 18) |
      (Re[t.charCodeAt(M + 1)] << 12) |
      (Re[t.charCodeAt(M + 2)] << 6) |
      Re[t.charCodeAt(M + 3)]),
      (l[y++] = (A >> 16) & 255),
      (l[y++] = (A >> 8) & 255),
      (l[y++] = A & 255);
  return (
    s === 2 &&
      ((A = (Re[t.charCodeAt(M)] << 2) | (Re[t.charCodeAt(M + 1)] >> 4)),
      (l[y++] = A & 255)),
    s === 1 &&
      ((A =
        (Re[t.charCodeAt(M)] << 10) |
        (Re[t.charCodeAt(M + 1)] << 4) |
        (Re[t.charCodeAt(M + 2)] >> 2)),
      (l[y++] = (A >> 8) & 255),
      (l[y++] = A & 255)),
    l
  );
}
function Sn(t) {
  return (
    He[(t >> 18) & 63] + He[(t >> 12) & 63] + He[(t >> 6) & 63] + He[t & 63]
  );
}
function Nn(t, A, e) {
  for (var g, s = [], l = A; l < e; l += 3)
    (g =
      ((t[l] << 16) & 16711680) + ((t[l + 1] << 8) & 65280) + (t[l + 2] & 255)),
      s.push(Sn(g));
  return s.join('');
}
function Fn(t) {
  for (
    var A, e = t.length, g = e % 3, s = [], l = 16383, y = 0, u = e - g;
    y < u;
    y += l
  )
    s.push(Nn(t, y, y + l > u ? u : y + l));
  return (
    g === 1
      ? ((A = t[e - 1]), s.push(He[A >> 2] + He[(A << 4) & 63] + '=='))
      : g === 2 &&
        ((A = (t[e - 2] << 8) + t[e - 1]),
        s.push(He[A >> 10] + He[(A >> 4) & 63] + He[(A << 2) & 63] + '=')),
    s.join('')
  );
}
var Lt = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ Lt.read =
  function (t, A, e, g, s) {
    var l,
      y,
      u = s * 8 - g - 1,
      M = (1 << u) - 1,
      b = M >> 1,
      $ = -7,
      J = e ? s - 1 : 0,
      nA = e ? -1 : 1,
      AA = t[A + J];
    for (
      J += nA, l = AA & ((1 << -$) - 1), AA >>= -$, $ += u;
      $ > 0;
      l = l * 256 + t[A + J], J += nA, $ -= 8
    );
    for (
      y = l & ((1 << -$) - 1), l >>= -$, $ += g;
      $ > 0;
      y = y * 256 + t[A + J], J += nA, $ -= 8
    );
    if (l === 0) l = 1 - b;
    else {
      if (l === M) return y ? NaN : (AA ? -1 : 1) * (1 / 0);
      (y = y + Math.pow(2, g)), (l = l - b);
    }
    return (AA ? -1 : 1) * y * Math.pow(2, l - g);
  };
Lt.write = function (t, A, e, g, s, l) {
  var y,
    u,
    M,
    b = l * 8 - s - 1,
    $ = (1 << b) - 1,
    J = $ >> 1,
    nA = s === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
    AA = g ? 0 : l - 1,
    vA = g ? 1 : -1,
    RA = A < 0 || (A === 0 && 1 / A < 0) ? 1 : 0;
  for (
    A = Math.abs(A),
      isNaN(A) || A === 1 / 0
        ? ((u = isNaN(A) ? 1 : 0), (y = $))
        : ((y = Math.floor(Math.log(A) / Math.LN2)),
          A * (M = Math.pow(2, -y)) < 1 && (y--, (M *= 2)),
          y + J >= 1 ? (A += nA / M) : (A += nA * Math.pow(2, 1 - J)),
          A * M >= 2 && (y++, (M /= 2)),
          y + J >= $
            ? ((u = 0), (y = $))
            : y + J >= 1
            ? ((u = (A * M - 1) * Math.pow(2, s)), (y = y + J))
            : ((u = A * Math.pow(2, J - 1) * Math.pow(2, s)), (y = 0)));
    s >= 8;
    t[e + AA] = u & 255, AA += vA, u /= 256, s -= 8
  );
  for (
    y = (y << s) | u, b += s;
    b > 0;
    t[e + AA] = y & 255, AA += vA, y /= 256, b -= 8
  );
  t[e + AA - vA] |= RA * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ (function (t) {
  var A = kt,
    e = Lt,
    g =
      typeof Symbol == 'function' && typeof Symbol.for == 'function'
        ? Symbol.for('nodejs.util.inspect.custom')
        : null;
  (t.Buffer = u), (t.SlowBuffer = kA), (t.INSPECT_MAX_BYTES = 50);
  var s = 2147483647;
  (t.kMaxLength = s),
    (u.TYPED_ARRAY_SUPPORT = l()),
    !u.TYPED_ARRAY_SUPPORT &&
      typeof console < 'u' &&
      typeof console.error == 'function' &&
      console.error(
        'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.',
      );
  function l() {
    try {
      var I = new Uint8Array(1),
        r = {
          foo: function () {
            return 42;
          },
        };
      return (
        Object.setPrototypeOf(r, Uint8Array.prototype),
        Object.setPrototypeOf(I, r),
        I.foo() === 42
      );
    } catch {
      return !1;
    }
  }
  Object.defineProperty(u.prototype, 'parent', {
    enumerable: !0,
    get: function () {
      if (u.isBuffer(this)) return this.buffer;
    },
  }),
    Object.defineProperty(u.prototype, 'offset', {
      enumerable: !0,
      get: function () {
        if (u.isBuffer(this)) return this.byteOffset;
      },
    });
  function y(I) {
    if (I > s)
      throw new RangeError(
        'The value "' + I + '" is invalid for option "size"',
      );
    var r = new Uint8Array(I);
    return Object.setPrototypeOf(r, u.prototype), r;
  }
  function u(I, r, n) {
    if (typeof I == 'number') {
      if (typeof r == 'string')
        throw new TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      return J(I);
    }
    return M(I, r, n);
  }
  u.poolSize = 8192;
  function M(I, r, n) {
    if (typeof I == 'string') return nA(I, r);
    if (ArrayBuffer.isView(I)) return vA(I);
    if (I == null)
      throw new TypeError(
        'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
          typeof I,
      );
    if (
      m(I, ArrayBuffer) ||
      (I && m(I.buffer, ArrayBuffer)) ||
      (typeof SharedArrayBuffer < 'u' &&
        (m(I, SharedArrayBuffer) || (I && m(I.buffer, SharedArrayBuffer))))
    )
      return RA(I, r, n);
    if (typeof I == 'number')
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    var a = I.valueOf && I.valueOf();
    if (a != null && a !== I) return u.from(a, r, n);
    var f = ae(I);
    if (f) return f;
    if (
      typeof Symbol < 'u' &&
      Symbol.toPrimitive != null &&
      typeof I[Symbol.toPrimitive] == 'function'
    )
      return u.from(I[Symbol.toPrimitive]('string'), r, n);
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
        typeof I,
    );
  }
  (u.from = function (I, r, n) {
    return M(I, r, n);
  }),
    Object.setPrototypeOf(u.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(u, Uint8Array);
  function b(I) {
    if (typeof I != 'number')
      throw new TypeError('"size" argument must be of type number');
    if (I < 0)
      throw new RangeError(
        'The value "' + I + '" is invalid for option "size"',
      );
  }
  function $(I, r, n) {
    return (
      b(I),
      I <= 0
        ? y(I)
        : r !== void 0
        ? typeof n == 'string'
          ? y(I).fill(r, n)
          : y(I).fill(r)
        : y(I)
    );
  }
  u.alloc = function (I, r, n) {
    return $(I, r, n);
  };
  function J(I) {
    return b(I), y(I < 0 ? 0 : Ee(I) | 0);
  }
  (u.allocUnsafe = function (I) {
    return J(I);
  }),
    (u.allocUnsafeSlow = function (I) {
      return J(I);
    });
  function nA(I, r) {
    if (((typeof r != 'string' || r === '') && (r = 'utf8'), !u.isEncoding(r)))
      throw new TypeError('Unknown encoding: ' + r);
    var n = XA(I, r) | 0,
      a = y(n),
      f = a.write(I, r);
    return f !== n && (a = a.slice(0, f)), a;
  }
  function AA(I) {
    for (
      var r = I.length < 0 ? 0 : Ee(I.length) | 0, n = y(r), a = 0;
      a < r;
      a += 1
    )
      n[a] = I[a] & 255;
    return n;
  }
  function vA(I) {
    if (m(I, Uint8Array)) {
      var r = new Uint8Array(I);
      return RA(r.buffer, r.byteOffset, r.byteLength);
    }
    return AA(I);
  }
  function RA(I, r, n) {
    if (r < 0 || I.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (I.byteLength < r + (n || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var a;
    return (
      r === void 0 && n === void 0
        ? (a = new Uint8Array(I))
        : n === void 0
        ? (a = new Uint8Array(I, r))
        : (a = new Uint8Array(I, r, n)),
      Object.setPrototypeOf(a, u.prototype),
      a
    );
  }
  function ae(I) {
    if (u.isBuffer(I)) {
      var r = Ee(I.length) | 0,
        n = y(r);
      return n.length === 0 || I.copy(n, 0, 0, r), n;
    }
    if (I.length !== void 0)
      return typeof I.length != 'number' || N(I.length) ? y(0) : AA(I);
    if (I.type === 'Buffer' && Array.isArray(I.data)) return AA(I.data);
  }
  function Ee(I) {
    if (I >= s)
      throw new RangeError(
        'Attempt to allocate Buffer larger than maximum size: 0x' +
          s.toString(16) +
          ' bytes',
      );
    return I | 0;
  }
  function kA(I) {
    return +I != I && (I = 0), u.alloc(+I);
  }
  (u.isBuffer = function (r) {
    return r != null && r._isBuffer === !0 && r !== u.prototype;
  }),
    (u.compare = function (r, n) {
      if (
        (m(r, Uint8Array) && (r = u.from(r, r.offset, r.byteLength)),
        m(n, Uint8Array) && (n = u.from(n, n.offset, n.byteLength)),
        !u.isBuffer(r) || !u.isBuffer(n))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (r === n) return 0;
      for (
        var a = r.length, f = n.length, x = 0, R = Math.min(a, f);
        x < R;
        ++x
      )
        if (r[x] !== n[x]) {
          (a = r[x]), (f = n[x]);
          break;
        }
      return a < f ? -1 : f < a ? 1 : 0;
    }),
    (u.isEncoding = function (r) {
      switch (String(r).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return !0;
        default:
          return !1;
      }
    }),
    (u.concat = function (r, n) {
      if (!Array.isArray(r))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (r.length === 0) return u.alloc(0);
      var a;
      if (n === void 0) for (n = 0, a = 0; a < r.length; ++a) n += r[a].length;
      var f = u.allocUnsafe(n),
        x = 0;
      for (a = 0; a < r.length; ++a) {
        var R = r[a];
        if (m(R, Uint8Array))
          x + R.length > f.length
            ? u.from(R).copy(f, x)
            : Uint8Array.prototype.set.call(f, R, x);
        else if (u.isBuffer(R)) R.copy(f, x);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        x += R.length;
      }
      return f;
    });
  function XA(I, r) {
    if (u.isBuffer(I)) return I.length;
    if (ArrayBuffer.isView(I) || m(I, ArrayBuffer)) return I.byteLength;
    if (typeof I != 'string')
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof I,
      );
    var n = I.length,
      a = arguments.length > 2 && arguments[2] === !0;
    if (!a && n === 0) return 0;
    for (var f = !1; ; )
      switch (r) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return n;
        case 'utf8':
        case 'utf-8':
          return IA(I).length;
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return n * 2;
        case 'hex':
          return n >>> 1;
        case 'base64':
          return h(I).length;
        default:
          if (f) return a ? -1 : IA(I).length;
          (r = ('' + r).toLowerCase()), (f = !0);
      }
  }
  u.byteLength = XA;
  function oe(I, r, n) {
    var a = !1;
    if (
      ((r === void 0 || r < 0) && (r = 0),
      r > this.length ||
        ((n === void 0 || n > this.length) && (n = this.length), n <= 0) ||
        ((n >>>= 0), (r >>>= 0), n <= r))
    )
      return '';
    for (I || (I = 'utf8'); ; )
      switch (I) {
        case 'hex':
          return bA(this, r, n);
        case 'utf8':
        case 'utf-8':
          return ee(this, r, n);
        case 'ascii':
          return ie(this, r, n);
        case 'latin1':
        case 'binary':
          return JA(this, r, n);
        case 'base64':
          return MA(this, r, n);
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return Ce(this, r, n);
        default:
          if (a) throw new TypeError('Unknown encoding: ' + I);
          (I = (I + '').toLowerCase()), (a = !0);
      }
  }
  u.prototype._isBuffer = !0;
  function zA(I, r, n) {
    var a = I[r];
    (I[r] = I[n]), (I[n] = a);
  }
  (u.prototype.swap16 = function () {
    var r = this.length;
    if (r % 2 !== 0)
      throw new RangeError('Buffer size must be a multiple of 16-bits');
    for (var n = 0; n < r; n += 2) zA(this, n, n + 1);
    return this;
  }),
    (u.prototype.swap32 = function () {
      var r = this.length;
      if (r % 4 !== 0)
        throw new RangeError('Buffer size must be a multiple of 32-bits');
      for (var n = 0; n < r; n += 4) zA(this, n, n + 3), zA(this, n + 1, n + 2);
      return this;
    }),
    (u.prototype.swap64 = function () {
      var r = this.length;
      if (r % 8 !== 0)
        throw new RangeError('Buffer size must be a multiple of 64-bits');
      for (var n = 0; n < r; n += 8)
        zA(this, n, n + 7),
          zA(this, n + 1, n + 6),
          zA(this, n + 2, n + 5),
          zA(this, n + 3, n + 4);
      return this;
    }),
    (u.prototype.toString = function () {
      var r = this.length;
      return r === 0
        ? ''
        : arguments.length === 0
        ? ee(this, 0, r)
        : oe.apply(this, arguments);
    }),
    (u.prototype.toLocaleString = u.prototype.toString),
    (u.prototype.equals = function (r) {
      if (!u.isBuffer(r)) throw new TypeError('Argument must be a Buffer');
      return this === r ? !0 : u.compare(this, r) === 0;
    }),
    (u.prototype.inspect = function () {
      var r = '',
        n = t.INSPECT_MAX_BYTES;
      return (
        (r = this.toString('hex', 0, n)
          .replace(/(.{2})/g, '$1 ')
          .trim()),
        this.length > n && (r += ' ... '),
        '<Buffer ' + r + '>'
      );
    }),
    g && (u.prototype[g] = u.prototype.inspect),
    (u.prototype.compare = function (r, n, a, f, x) {
      if (
        (m(r, Uint8Array) && (r = u.from(r, r.offset, r.byteLength)),
        !u.isBuffer(r))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof r,
        );
      if (
        (n === void 0 && (n = 0),
        a === void 0 && (a = r ? r.length : 0),
        f === void 0 && (f = 0),
        x === void 0 && (x = this.length),
        n < 0 || a > r.length || f < 0 || x > this.length)
      )
        throw new RangeError('out of range index');
      if (f >= x && n >= a) return 0;
      if (f >= x) return -1;
      if (n >= a) return 1;
      if (((n >>>= 0), (a >>>= 0), (f >>>= 0), (x >>>= 0), this === r))
        return 0;
      for (
        var R = x - f,
          K = a - n,
          iA = Math.min(R, K),
          QA = this.slice(f, x),
          lA = r.slice(n, a),
          V = 0;
        V < iA;
        ++V
      )
        if (QA[V] !== lA[V]) {
          (R = QA[V]), (K = lA[V]);
          break;
        }
      return R < K ? -1 : K < R ? 1 : 0;
    });
  function oA(I, r, n, a, f) {
    if (I.length === 0) return -1;
    if (
      (typeof n == 'string'
        ? ((a = n), (n = 0))
        : n > 2147483647
        ? (n = 2147483647)
        : n < -2147483648 && (n = -2147483648),
      (n = +n),
      N(n) && (n = f ? 0 : I.length - 1),
      n < 0 && (n = I.length + n),
      n >= I.length)
    ) {
      if (f) return -1;
      n = I.length - 1;
    } else if (n < 0)
      if (f) n = 0;
      else return -1;
    if ((typeof r == 'string' && (r = u.from(r, a)), u.isBuffer(r)))
      return r.length === 0 ? -1 : cA(I, r, n, a, f);
    if (typeof r == 'number')
      return (
        (r = r & 255),
        typeof Uint8Array.prototype.indexOf == 'function'
          ? f
            ? Uint8Array.prototype.indexOf.call(I, r, n)
            : Uint8Array.prototype.lastIndexOf.call(I, r, n)
          : cA(I, [r], n, a, f)
      );
    throw new TypeError('val must be string, number or Buffer');
  }
  function cA(I, r, n, a, f) {
    var x = 1,
      R = I.length,
      K = r.length;
    if (
      a !== void 0 &&
      ((a = String(a).toLowerCase()),
      a === 'ucs2' || a === 'ucs-2' || a === 'utf16le' || a === 'utf-16le')
    ) {
      if (I.length < 2 || r.length < 2) return -1;
      (x = 2), (R /= 2), (K /= 2), (n /= 2);
    }
    function iA(WA, we) {
      return x === 1 ? WA[we] : WA.readUInt16BE(we * x);
    }
    var QA;
    if (f) {
      var lA = -1;
      for (QA = n; QA < R; QA++)
        if (iA(I, QA) === iA(r, lA === -1 ? 0 : QA - lA)) {
          if ((lA === -1 && (lA = QA), QA - lA + 1 === K)) return lA * x;
        } else lA !== -1 && (QA -= QA - lA), (lA = -1);
    } else
      for (n + K > R && (n = R - K), QA = n; QA >= 0; QA--) {
        for (var V = !0, xA = 0; xA < K; xA++)
          if (iA(I, QA + xA) !== iA(r, xA)) {
            V = !1;
            break;
          }
        if (V) return QA;
      }
    return -1;
  }
  (u.prototype.includes = function (r, n, a) {
    return this.indexOf(r, n, a) !== -1;
  }),
    (u.prototype.indexOf = function (r, n, a) {
      return oA(this, r, n, a, !0);
    }),
    (u.prototype.lastIndexOf = function (r, n, a) {
      return oA(this, r, n, a, !1);
    });
  function YA(I, r, n, a) {
    n = Number(n) || 0;
    var f = I.length - n;
    a ? ((a = Number(a)), a > f && (a = f)) : (a = f);
    var x = r.length;
    a > x / 2 && (a = x / 2);
    for (var R = 0; R < a; ++R) {
      var K = parseInt(r.substr(R * 2, 2), 16);
      if (N(K)) return R;
      I[n + R] = K;
    }
    return R;
  }
  function PA(I, r, n, a) {
    return D(IA(r, I.length - n), I, n, a);
  }
  function z(I, r, n, a) {
    return D(fA(r), I, n, a);
  }
  function HA(I, r, n, a) {
    return D(h(r), I, n, a);
  }
  function GA(I, r, n, a) {
    return D(c(r, I.length - n), I, n, a);
  }
  (u.prototype.write = function (r, n, a, f) {
    if (n === void 0) (f = 'utf8'), (a = this.length), (n = 0);
    else if (a === void 0 && typeof n == 'string')
      (f = n), (a = this.length), (n = 0);
    else if (isFinite(n))
      (n = n >>> 0),
        isFinite(a)
          ? ((a = a >>> 0), f === void 0 && (f = 'utf8'))
          : ((f = a), (a = void 0));
    else
      throw new Error(
        'Buffer.write(string, encoding, offset[, length]) is no longer supported',
      );
    var x = this.length - n;
    if (
      ((a === void 0 || a > x) && (a = x),
      (r.length > 0 && (a < 0 || n < 0)) || n > this.length)
    )
      throw new RangeError('Attempt to write outside buffer bounds');
    f || (f = 'utf8');
    for (var R = !1; ; )
      switch (f) {
        case 'hex':
          return YA(this, r, n, a);
        case 'utf8':
        case 'utf-8':
          return PA(this, r, n, a);
        case 'ascii':
        case 'latin1':
        case 'binary':
          return z(this, r, n, a);
        case 'base64':
          return HA(this, r, n, a);
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return GA(this, r, n, a);
        default:
          if (R) throw new TypeError('Unknown encoding: ' + f);
          (f = ('' + f).toLowerCase()), (R = !0);
      }
  }),
    (u.prototype.toJSON = function () {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  function MA(I, r, n) {
    return r === 0 && n === I.length
      ? A.fromByteArray(I)
      : A.fromByteArray(I.slice(r, n));
  }
  function ee(I, r, n) {
    n = Math.min(I.length, n);
    for (var a = [], f = r; f < n; ) {
      var x = I[f],
        R = null,
        K = x > 239 ? 4 : x > 223 ? 3 : x > 191 ? 2 : 1;
      if (f + K <= n) {
        var iA, QA, lA, V;
        switch (K) {
          case 1:
            x < 128 && (R = x);
            break;
          case 2:
            (iA = I[f + 1]),
              (iA & 192) === 128 &&
                ((V = ((x & 31) << 6) | (iA & 63)), V > 127 && (R = V));
            break;
          case 3:
            (iA = I[f + 1]),
              (QA = I[f + 2]),
              (iA & 192) === 128 &&
                (QA & 192) === 128 &&
                ((V = ((x & 15) << 12) | ((iA & 63) << 6) | (QA & 63)),
                V > 2047 && (V < 55296 || V > 57343) && (R = V));
            break;
          case 4:
            (iA = I[f + 1]),
              (QA = I[f + 2]),
              (lA = I[f + 3]),
              (iA & 192) === 128 &&
                (QA & 192) === 128 &&
                (lA & 192) === 128 &&
                ((V =
                  ((x & 15) << 18) |
                  ((iA & 63) << 12) |
                  ((QA & 63) << 6) |
                  (lA & 63)),
                V > 65535 && V < 1114112 && (R = V));
        }
      }
      R === null
        ? ((R = 65533), (K = 1))
        : R > 65535 &&
          ((R -= 65536),
          a.push(((R >>> 10) & 1023) | 55296),
          (R = 56320 | (R & 1023))),
        a.push(R),
        (f += K);
    }
    return re(a);
  }
  var $A = 4096;
  function re(I) {
    var r = I.length;
    if (r <= $A) return String.fromCharCode.apply(String, I);
    for (var n = '', a = 0; a < r; )
      n += String.fromCharCode.apply(String, I.slice(a, (a += $A)));
    return n;
  }
  function ie(I, r, n) {
    var a = '';
    n = Math.min(I.length, n);
    for (var f = r; f < n; ++f) a += String.fromCharCode(I[f] & 127);
    return a;
  }
  function JA(I, r, n) {
    var a = '';
    n = Math.min(I.length, n);
    for (var f = r; f < n; ++f) a += String.fromCharCode(I[f]);
    return a;
  }
  function bA(I, r, n) {
    var a = I.length;
    (!r || r < 0) && (r = 0), (!n || n < 0 || n > a) && (n = a);
    for (var f = '', x = r; x < n; ++x) f += F[I[x]];
    return f;
  }
  function Ce(I, r, n) {
    for (var a = I.slice(r, n), f = '', x = 0; x < a.length - 1; x += 2)
      f += String.fromCharCode(a[x] + a[x + 1] * 256);
    return f;
  }
  u.prototype.slice = function (r, n) {
    var a = this.length;
    (r = ~~r),
      (n = n === void 0 ? a : ~~n),
      r < 0 ? ((r += a), r < 0 && (r = 0)) : r > a && (r = a),
      n < 0 ? ((n += a), n < 0 && (n = 0)) : n > a && (n = a),
      n < r && (n = r);
    var f = this.subarray(r, n);
    return Object.setPrototypeOf(f, u.prototype), f;
  };
  function wA(I, r, n) {
    if (I % 1 !== 0 || I < 0) throw new RangeError('offset is not uint');
    if (I + r > n)
      throw new RangeError('Trying to access beyond buffer length');
  }
  (u.prototype.readUintLE = u.prototype.readUIntLE =
    function (r, n, a) {
      (r = r >>> 0), (n = n >>> 0), a || wA(r, n, this.length);
      for (var f = this[r], x = 1, R = 0; ++R < n && (x *= 256); )
        f += this[r + R] * x;
      return f;
    }),
    (u.prototype.readUintBE = u.prototype.readUIntBE =
      function (r, n, a) {
        (r = r >>> 0), (n = n >>> 0), a || wA(r, n, this.length);
        for (var f = this[r + --n], x = 1; n > 0 && (x *= 256); )
          f += this[r + --n] * x;
        return f;
      }),
    (u.prototype.readUint8 = u.prototype.readUInt8 =
      function (r, n) {
        return (r = r >>> 0), n || wA(r, 1, this.length), this[r];
      }),
    (u.prototype.readUint16LE = u.prototype.readUInt16LE =
      function (r, n) {
        return (
          (r = r >>> 0),
          n || wA(r, 2, this.length),
          this[r] | (this[r + 1] << 8)
        );
      }),
    (u.prototype.readUint16BE = u.prototype.readUInt16BE =
      function (r, n) {
        return (
          (r = r >>> 0),
          n || wA(r, 2, this.length),
          (this[r] << 8) | this[r + 1]
        );
      }),
    (u.prototype.readUint32LE = u.prototype.readUInt32LE =
      function (r, n) {
        return (
          (r = r >>> 0),
          n || wA(r, 4, this.length),
          (this[r] | (this[r + 1] << 8) | (this[r + 2] << 16)) +
            this[r + 3] * 16777216
        );
      }),
    (u.prototype.readUint32BE = u.prototype.readUInt32BE =
      function (r, n) {
        return (
          (r = r >>> 0),
          n || wA(r, 4, this.length),
          this[r] * 16777216 +
            ((this[r + 1] << 16) | (this[r + 2] << 8) | this[r + 3])
        );
      }),
    (u.prototype.readIntLE = function (r, n, a) {
      (r = r >>> 0), (n = n >>> 0), a || wA(r, n, this.length);
      for (var f = this[r], x = 1, R = 0; ++R < n && (x *= 256); )
        f += this[r + R] * x;
      return (x *= 128), f >= x && (f -= Math.pow(2, 8 * n)), f;
    }),
    (u.prototype.readIntBE = function (r, n, a) {
      (r = r >>> 0), (n = n >>> 0), a || wA(r, n, this.length);
      for (var f = n, x = 1, R = this[r + --f]; f > 0 && (x *= 256); )
        R += this[r + --f] * x;
      return (x *= 128), R >= x && (R -= Math.pow(2, 8 * n)), R;
    }),
    (u.prototype.readInt8 = function (r, n) {
      return (
        (r = r >>> 0),
        n || wA(r, 1, this.length),
        this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r]
      );
    }),
    (u.prototype.readInt16LE = function (r, n) {
      (r = r >>> 0), n || wA(r, 2, this.length);
      var a = this[r] | (this[r + 1] << 8);
      return a & 32768 ? a | 4294901760 : a;
    }),
    (u.prototype.readInt16BE = function (r, n) {
      (r = r >>> 0), n || wA(r, 2, this.length);
      var a = this[r + 1] | (this[r] << 8);
      return a & 32768 ? a | 4294901760 : a;
    }),
    (u.prototype.readInt32LE = function (r, n) {
      return (
        (r = r >>> 0),
        n || wA(r, 4, this.length),
        this[r] | (this[r + 1] << 8) | (this[r + 2] << 16) | (this[r + 3] << 24)
      );
    }),
    (u.prototype.readInt32BE = function (r, n) {
      return (
        (r = r >>> 0),
        n || wA(r, 4, this.length),
        (this[r] << 24) | (this[r + 1] << 16) | (this[r + 2] << 8) | this[r + 3]
      );
    }),
    (u.prototype.readFloatLE = function (r, n) {
      return (
        (r = r >>> 0), n || wA(r, 4, this.length), e.read(this, r, !0, 23, 4)
      );
    }),
    (u.prototype.readFloatBE = function (r, n) {
      return (
        (r = r >>> 0), n || wA(r, 4, this.length), e.read(this, r, !1, 23, 4)
      );
    }),
    (u.prototype.readDoubleLE = function (r, n) {
      return (
        (r = r >>> 0), n || wA(r, 8, this.length), e.read(this, r, !0, 52, 8)
      );
    }),
    (u.prototype.readDoubleBE = function (r, n) {
      return (
        (r = r >>> 0), n || wA(r, 8, this.length), e.read(this, r, !1, 52, 8)
      );
    });
  function qA(I, r, n, a, f, x) {
    if (!u.isBuffer(I))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (r > f || r < x)
      throw new RangeError('"value" argument is out of bounds');
    if (n + a > I.length) throw new RangeError('Index out of range');
  }
  (u.prototype.writeUintLE = u.prototype.writeUIntLE =
    function (r, n, a, f) {
      if (((r = +r), (n = n >>> 0), (a = a >>> 0), !f)) {
        var x = Math.pow(2, 8 * a) - 1;
        qA(this, r, n, a, x, 0);
      }
      var R = 1,
        K = 0;
      for (this[n] = r & 255; ++K < a && (R *= 256); )
        this[n + K] = (r / R) & 255;
      return n + a;
    }),
    (u.prototype.writeUintBE = u.prototype.writeUIntBE =
      function (r, n, a, f) {
        if (((r = +r), (n = n >>> 0), (a = a >>> 0), !f)) {
          var x = Math.pow(2, 8 * a) - 1;
          qA(this, r, n, a, x, 0);
        }
        var R = a - 1,
          K = 1;
        for (this[n + R] = r & 255; --R >= 0 && (K *= 256); )
          this[n + R] = (r / K) & 255;
        return n + a;
      }),
    (u.prototype.writeUint8 = u.prototype.writeUInt8 =
      function (r, n, a) {
        return (
          (r = +r),
          (n = n >>> 0),
          a || qA(this, r, n, 1, 255, 0),
          (this[n] = r & 255),
          n + 1
        );
      }),
    (u.prototype.writeUint16LE = u.prototype.writeUInt16LE =
      function (r, n, a) {
        return (
          (r = +r),
          (n = n >>> 0),
          a || qA(this, r, n, 2, 65535, 0),
          (this[n] = r & 255),
          (this[n + 1] = r >>> 8),
          n + 2
        );
      }),
    (u.prototype.writeUint16BE = u.prototype.writeUInt16BE =
      function (r, n, a) {
        return (
          (r = +r),
          (n = n >>> 0),
          a || qA(this, r, n, 2, 65535, 0),
          (this[n] = r >>> 8),
          (this[n + 1] = r & 255),
          n + 2
        );
      }),
    (u.prototype.writeUint32LE = u.prototype.writeUInt32LE =
      function (r, n, a) {
        return (
          (r = +r),
          (n = n >>> 0),
          a || qA(this, r, n, 4, 4294967295, 0),
          (this[n + 3] = r >>> 24),
          (this[n + 2] = r >>> 16),
          (this[n + 1] = r >>> 8),
          (this[n] = r & 255),
          n + 4
        );
      }),
    (u.prototype.writeUint32BE = u.prototype.writeUInt32BE =
      function (r, n, a) {
        return (
          (r = +r),
          (n = n >>> 0),
          a || qA(this, r, n, 4, 4294967295, 0),
          (this[n] = r >>> 24),
          (this[n + 1] = r >>> 16),
          (this[n + 2] = r >>> 8),
          (this[n + 3] = r & 255),
          n + 4
        );
      }),
    (u.prototype.writeIntLE = function (r, n, a, f) {
      if (((r = +r), (n = n >>> 0), !f)) {
        var x = Math.pow(2, 8 * a - 1);
        qA(this, r, n, a, x - 1, -x);
      }
      var R = 0,
        K = 1,
        iA = 0;
      for (this[n] = r & 255; ++R < a && (K *= 256); )
        r < 0 && iA === 0 && this[n + R - 1] !== 0 && (iA = 1),
          (this[n + R] = (((r / K) >> 0) - iA) & 255);
      return n + a;
    }),
    (u.prototype.writeIntBE = function (r, n, a, f) {
      if (((r = +r), (n = n >>> 0), !f)) {
        var x = Math.pow(2, 8 * a - 1);
        qA(this, r, n, a, x - 1, -x);
      }
      var R = a - 1,
        K = 1,
        iA = 0;
      for (this[n + R] = r & 255; --R >= 0 && (K *= 256); )
        r < 0 && iA === 0 && this[n + R + 1] !== 0 && (iA = 1),
          (this[n + R] = (((r / K) >> 0) - iA) & 255);
      return n + a;
    }),
    (u.prototype.writeInt8 = function (r, n, a) {
      return (
        (r = +r),
        (n = n >>> 0),
        a || qA(this, r, n, 1, 127, -128),
        r < 0 && (r = 255 + r + 1),
        (this[n] = r & 255),
        n + 1
      );
    }),
    (u.prototype.writeInt16LE = function (r, n, a) {
      return (
        (r = +r),
        (n = n >>> 0),
        a || qA(this, r, n, 2, 32767, -32768),
        (this[n] = r & 255),
        (this[n + 1] = r >>> 8),
        n + 2
      );
    }),
    (u.prototype.writeInt16BE = function (r, n, a) {
      return (
        (r = +r),
        (n = n >>> 0),
        a || qA(this, r, n, 2, 32767, -32768),
        (this[n] = r >>> 8),
        (this[n + 1] = r & 255),
        n + 2
      );
    }),
    (u.prototype.writeInt32LE = function (r, n, a) {
      return (
        (r = +r),
        (n = n >>> 0),
        a || qA(this, r, n, 4, 2147483647, -2147483648),
        (this[n] = r & 255),
        (this[n + 1] = r >>> 8),
        (this[n + 2] = r >>> 16),
        (this[n + 3] = r >>> 24),
        n + 4
      );
    }),
    (u.prototype.writeInt32BE = function (r, n, a) {
      return (
        (r = +r),
        (n = n >>> 0),
        a || qA(this, r, n, 4, 2147483647, -2147483648),
        r < 0 && (r = 4294967295 + r + 1),
        (this[n] = r >>> 24),
        (this[n + 1] = r >>> 16),
        (this[n + 2] = r >>> 8),
        (this[n + 3] = r & 255),
        n + 4
      );
    });
  function yA(I, r, n, a, f, x) {
    if (n + a > I.length) throw new RangeError('Index out of range');
    if (n < 0) throw new RangeError('Index out of range');
  }
  function C(I, r, n, a, f) {
    return (
      (r = +r),
      (n = n >>> 0),
      f || yA(I, r, n, 4),
      e.write(I, r, n, a, 23, 4),
      n + 4
    );
  }
  (u.prototype.writeFloatLE = function (r, n, a) {
    return C(this, r, n, !0, a);
  }),
    (u.prototype.writeFloatBE = function (r, n, a) {
      return C(this, r, n, !1, a);
    });
  function uA(I, r, n, a, f) {
    return (
      (r = +r),
      (n = n >>> 0),
      f || yA(I, r, n, 8),
      e.write(I, r, n, a, 52, 8),
      n + 8
    );
  }
  (u.prototype.writeDoubleLE = function (r, n, a) {
    return uA(this, r, n, !0, a);
  }),
    (u.prototype.writeDoubleBE = function (r, n, a) {
      return uA(this, r, n, !1, a);
    }),
    (u.prototype.copy = function (r, n, a, f) {
      if (!u.isBuffer(r)) throw new TypeError('argument should be a Buffer');
      if (
        (a || (a = 0),
        !f && f !== 0 && (f = this.length),
        n >= r.length && (n = r.length),
        n || (n = 0),
        f > 0 && f < a && (f = a),
        f === a || r.length === 0 || this.length === 0)
      )
        return 0;
      if (n < 0) throw new RangeError('targetStart out of bounds');
      if (a < 0 || a >= this.length) throw new RangeError('Index out of range');
      if (f < 0) throw new RangeError('sourceEnd out of bounds');
      f > this.length && (f = this.length),
        r.length - n < f - a && (f = r.length - n + a);
      var x = f - a;
      return (
        this === r && typeof Uint8Array.prototype.copyWithin == 'function'
          ? this.copyWithin(n, a, f)
          : Uint8Array.prototype.set.call(r, this.subarray(a, f), n),
        x
      );
    }),
    (u.prototype.fill = function (r, n, a, f) {
      if (typeof r == 'string') {
        if (
          (typeof n == 'string'
            ? ((f = n), (n = 0), (a = this.length))
            : typeof a == 'string' && ((f = a), (a = this.length)),
          f !== void 0 && typeof f != 'string')
        )
          throw new TypeError('encoding must be a string');
        if (typeof f == 'string' && !u.isEncoding(f))
          throw new TypeError('Unknown encoding: ' + f);
        if (r.length === 1) {
          var x = r.charCodeAt(0);
          ((f === 'utf8' && x < 128) || f === 'latin1') && (r = x);
        }
      } else
        typeof r == 'number'
          ? (r = r & 255)
          : typeof r == 'boolean' && (r = Number(r));
      if (n < 0 || this.length < n || this.length < a)
        throw new RangeError('Out of range index');
      if (a <= n) return this;
      (n = n >>> 0), (a = a === void 0 ? this.length : a >>> 0), r || (r = 0);
      var R;
      if (typeof r == 'number') for (R = n; R < a; ++R) this[R] = r;
      else {
        var K = u.isBuffer(r) ? r : u.from(r, f),
          iA = K.length;
        if (iA === 0)
          throw new TypeError(
            'The value "' + r + '" is invalid for argument "value"',
          );
        for (R = 0; R < a - n; ++R) this[R + n] = K[R % iA];
      }
      return this;
    });
  var te = /[^+/0-9A-Za-z-_]/g;
  function Fe(I) {
    if (((I = I.split('=')[0]), (I = I.trim().replace(te, '')), I.length < 2))
      return '';
    for (; I.length % 4 !== 0; ) I = I + '=';
    return I;
  }
  function IA(I, r) {
    r = r || 1 / 0;
    for (var n, a = I.length, f = null, x = [], R = 0; R < a; ++R) {
      if (((n = I.charCodeAt(R)), n > 55295 && n < 57344)) {
        if (!f) {
          if (n > 56319) {
            (r -= 3) > -1 && x.push(239, 191, 189);
            continue;
          } else if (R + 1 === a) {
            (r -= 3) > -1 && x.push(239, 191, 189);
            continue;
          }
          f = n;
          continue;
        }
        if (n < 56320) {
          (r -= 3) > -1 && x.push(239, 191, 189), (f = n);
          continue;
        }
        n = (((f - 55296) << 10) | (n - 56320)) + 65536;
      } else f && (r -= 3) > -1 && x.push(239, 191, 189);
      if (((f = null), n < 128)) {
        if ((r -= 1) < 0) break;
        x.push(n);
      } else if (n < 2048) {
        if ((r -= 2) < 0) break;
        x.push((n >> 6) | 192, (n & 63) | 128);
      } else if (n < 65536) {
        if ((r -= 3) < 0) break;
        x.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (n & 63) | 128);
      } else if (n < 1114112) {
        if ((r -= 4) < 0) break;
        x.push(
          (n >> 18) | 240,
          ((n >> 12) & 63) | 128,
          ((n >> 6) & 63) | 128,
          (n & 63) | 128,
        );
      } else throw new Error('Invalid code point');
    }
    return x;
  }
  function fA(I) {
    for (var r = [], n = 0; n < I.length; ++n) r.push(I.charCodeAt(n) & 255);
    return r;
  }
  function c(I, r) {
    for (var n, a, f, x = [], R = 0; R < I.length && !((r -= 2) < 0); ++R)
      (n = I.charCodeAt(R)), (a = n >> 8), (f = n % 256), x.push(f), x.push(a);
    return x;
  }
  function h(I) {
    return A.toByteArray(Fe(I));
  }
  function D(I, r, n, a) {
    for (var f = 0; f < a && !(f + n >= r.length || f >= I.length); ++f)
      r[f + n] = I[f];
    return f;
  }
  function m(I, r) {
    return (
      I instanceof r ||
      (I != null &&
        I.constructor != null &&
        I.constructor.name != null &&
        I.constructor.name === r.name)
    );
  }
  function N(I) {
    return I !== I;
  }
  var F = (function () {
    for (var I = '0123456789abcdef', r = new Array(256), n = 0; n < 16; ++n)
      for (var a = n * 16, f = 0; f < 16; ++f) r[a + f] = I[n] + I[f];
    return r;
  })();
})(wt);
var kr;
(function (t) {
  (t[(t.SysFatal = 1)] = 'SysFatal'),
    (t[(t.SysTransient = 2)] = 'SysTransient'),
    (t[(t.DestinationInvalid = 3)] = 'DestinationInvalid'),
    (t[(t.CanisterReject = 4)] = 'CanisterReject'),
    (t[(t.CanisterError = 5)] = 'CanisterError');
})(kr || (kr = {}));
const bt = 'abcdefghijklmnopqrstuvwxyz234567',
  ot = Object.create(null);
for (let t = 0; t < bt.length; t++) ot[bt[t]] = t;
ot[0] = ot.o;
ot[1] = ot.i;
function mn(t) {
  let A = 0,
    e = 0,
    g = '';
  function s(l) {
    return (
      A < 0 ? (e |= l >> -A) : (e = (l << A) & 248),
      A > 3 ? ((A -= 8), 1) : (A < 4 && ((g += bt[e >> 3]), (A += 5)), 0)
    );
  }
  for (let l = 0; l < t.length; ) l += s(t[l]);
  return g + (A < 0 ? bt[e >> 3] : '');
}
function Gn(t) {
  let A = 0,
    e = 0;
  const g = new Uint8Array(((t.length * 4) / 3) | 0);
  let s = 0;
  function l(y) {
    let u = ot[y.toLowerCase()];
    if (u === void 0)
      throw new Error(`Invalid character: ${JSON.stringify(y)}`);
    (u <<= 3),
      (e |= u >>> A),
      (A += 5),
      A >= 8 &&
        ((g[s++] = e), (A -= 8), A > 0 ? (e = (u << (5 - A)) & 255) : (e = 0));
  }
  for (const y of t) l(y);
  return g.slice(0, s);
}
const Mn = new Uint32Array([
  0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685,
  2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995,
  2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648,
  2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990,
  1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755,
  2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145,
  1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206,
  2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980,
  1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705,
  3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527,
  1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772,
  4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290,
  251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719,
  3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925,
  453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202,
  4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960,
  984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733,
  3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467,
  855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048,
  3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054,
  702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443,
  3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945,
  2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430,
  2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580,
  2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225,
  1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143,
  2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732,
  1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850,
  2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135,
  1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109,
  3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954,
  1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920,
  3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877,
  83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603,
  3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992,
  534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934,
  4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795,
  376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105,
  3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270,
  936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108,
  3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449,
  601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471,
  3272380065, 1510334235, 755167117,
]);
function bn(t) {
  const A = new Uint8Array(t);
  let e = -1;
  for (let g = 0; g < A.length; g++) {
    const l = (A[g] ^ e) & 255;
    e = Mn[l] ^ (e >>> 8);
  }
  return (e ^ -1) >>> 0;
}
function Rn(t, ...A) {
  if (!(t instanceof Uint8Array)) throw new Error('Expected Uint8Array');
  if (A.length > 0 && !A.includes(t.length))
    throw new Error(
      `Expected Uint8Array of length ${A}, not of length=${t.length}`,
    );
}
function Lr(t, A = !0) {
  if (t.destroyed) throw new Error('Hash instance has been destroyed');
  if (A && t.finished) throw new Error('Hash#digest() has already been called');
}
function Un(t, A) {
  Rn(t);
  const e = A.outputLen;
  if (t.length < e)
    throw new Error(
      `digestInto() expects output buffer of length at least ${e}`,
    );
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const _n =
    (t) => t instanceof Uint8Array,
  Kt = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength),
  ve = (t, A) => (t << (32 - A)) | (t >>> A),
  kn = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!kn) throw new Error('Non little-endian hardware is not supported');
function Ln(t) {
  if (typeof t != 'string')
    throw new Error(`utf8ToBytes expected string, got ${typeof t}`);
  return new Uint8Array(new TextEncoder().encode(t));
}
function wi(t) {
  if ((typeof t == 'string' && (t = Ln(t)), !_n(t)))
    throw new Error(`expected Uint8Array, got ${typeof t}`);
  return t;
}
class Tn {
  clone() {
    return this._cloneInto();
  }
}
function pi(t) {
  const A = (g) => t().update(wi(g)).digest(),
    e = t();
  return (
    (A.outputLen = e.outputLen),
    (A.blockLen = e.blockLen),
    (A.create = () => t()),
    A
  );
}
function vn(t, A, e, g) {
  if (typeof t.setBigUint64 == 'function') return t.setBigUint64(A, e, g);
  const s = BigInt(32),
    l = BigInt(4294967295),
    y = Number((e >> s) & l),
    u = Number(e & l),
    M = g ? 4 : 0,
    b = g ? 0 : 4;
  t.setUint32(A + M, y, g), t.setUint32(A + b, u, g);
}
class Yn extends Tn {
  constructor(A, e, g, s) {
    super(),
      (this.blockLen = A),
      (this.outputLen = e),
      (this.padOffset = g),
      (this.isLE = s),
      (this.finished = !1),
      (this.length = 0),
      (this.pos = 0),
      (this.destroyed = !1),
      (this.buffer = new Uint8Array(A)),
      (this.view = Kt(this.buffer));
  }
  update(A) {
    Lr(this);
    const { view: e, buffer: g, blockLen: s } = this;
    A = wi(A);
    const l = A.length;
    for (let y = 0; y < l; ) {
      const u = Math.min(s - this.pos, l - y);
      if (u === s) {
        const M = Kt(A);
        for (; s <= l - y; y += s) this.process(M, y);
        continue;
      }
      g.set(A.subarray(y, y + u), this.pos),
        (this.pos += u),
        (y += u),
        this.pos === s && (this.process(e, 0), (this.pos = 0));
    }
    return (this.length += A.length), this.roundClean(), this;
  }
  digestInto(A) {
    Lr(this), Un(A, this), (this.finished = !0);
    const { buffer: e, view: g, blockLen: s, isLE: l } = this;
    let { pos: y } = this;
    (e[y++] = 128),
      this.buffer.subarray(y).fill(0),
      this.padOffset > s - y && (this.process(g, 0), (y = 0));
    for (let J = y; J < s; J++) e[J] = 0;
    vn(g, s - 8, BigInt(this.length * 8), l), this.process(g, 0);
    const u = Kt(A),
      M = this.outputLen;
    if (M % 4) throw new Error('_sha2: outputLen should be aligned to 32bit');
    const b = M / 4,
      $ = this.get();
    if (b > $.length) throw new Error('_sha2: outputLen bigger than state');
    for (let J = 0; J < b; J++) u.setUint32(4 * J, $[J], l);
  }
  digest() {
    const { buffer: A, outputLen: e } = this;
    this.digestInto(A);
    const g = A.slice(0, e);
    return this.destroy(), g;
  }
  _cloneInto(A) {
    A || (A = new this.constructor()), A.set(...this.get());
    const {
      blockLen: e,
      buffer: g,
      length: s,
      finished: l,
      destroyed: y,
      pos: u,
    } = this;
    return (
      (A.length = s),
      (A.pos = u),
      (A.finished = l),
      (A.destroyed = y),
      s % e && A.buffer.set(g),
      A
    );
  }
}
const Hn = (t, A, e) => (t & A) ^ (~t & e),
  Jn = (t, A, e) => (t & A) ^ (t & e) ^ (A & e),
  qn = new Uint32Array([
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
    2428436474, 2756734187, 3204031479, 3329325298,
  ]),
  je = new Uint32Array([
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
    528734635, 1541459225,
  ]),
  ze = new Uint32Array(64);
class yi extends Yn {
  constructor() {
    super(64, 32, 8, !1),
      (this.A = je[0] | 0),
      (this.B = je[1] | 0),
      (this.C = je[2] | 0),
      (this.D = je[3] | 0),
      (this.E = je[4] | 0),
      (this.F = je[5] | 0),
      (this.G = je[6] | 0),
      (this.H = je[7] | 0);
  }
  get() {
    const { A, B: e, C: g, D: s, E: l, F: y, G: u, H: M } = this;
    return [A, e, g, s, l, y, u, M];
  }
  set(A, e, g, s, l, y, u, M) {
    (this.A = A | 0),
      (this.B = e | 0),
      (this.C = g | 0),
      (this.D = s | 0),
      (this.E = l | 0),
      (this.F = y | 0),
      (this.G = u | 0),
      (this.H = M | 0);
  }
  process(A, e) {
    for (let J = 0; J < 16; J++, e += 4) ze[J] = A.getUint32(e, !1);
    for (let J = 16; J < 64; J++) {
      const nA = ze[J - 15],
        AA = ze[J - 2],
        vA = ve(nA, 7) ^ ve(nA, 18) ^ (nA >>> 3),
        RA = ve(AA, 17) ^ ve(AA, 19) ^ (AA >>> 10);
      ze[J] = (RA + ze[J - 7] + vA + ze[J - 16]) | 0;
    }
    let { A: g, B: s, C: l, D: y, E: u, F: M, G: b, H: $ } = this;
    for (let J = 0; J < 64; J++) {
      const nA = ve(u, 6) ^ ve(u, 11) ^ ve(u, 25),
        AA = ($ + nA + Hn(u, M, b) + qn[J] + ze[J]) | 0,
        RA = ((ve(g, 2) ^ ve(g, 13) ^ ve(g, 22)) + Jn(g, s, l)) | 0;
      ($ = b),
        (b = M),
        (M = u),
        (u = (y + AA) | 0),
        (y = l),
        (l = s),
        (s = g),
        (g = (AA + RA) | 0);
    }
    (g = (g + this.A) | 0),
      (s = (s + this.B) | 0),
      (l = (l + this.C) | 0),
      (y = (y + this.D) | 0),
      (u = (u + this.E) | 0),
      (M = (M + this.F) | 0),
      (b = (b + this.G) | 0),
      ($ = ($ + this.H) | 0),
      this.set(g, s, l, y, u, M, b, $);
  }
  roundClean() {
    ze.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
class On extends yi {
  constructor() {
    super(),
      (this.A = -1056596264),
      (this.B = 914150663),
      (this.C = 812702999),
      (this.D = -150054599),
      (this.E = -4191439),
      (this.F = 1750603025),
      (this.G = 1694076839),
      (this.H = -1090891868),
      (this.outputLen = 28);
  }
}
const Kn = pi(() => new yi()),
  Pn = pi(() => new On());
function Wn(t) {
  return Pn.create().update(new Uint8Array(t)).digest();
}
const xt = '__principal__',
  jn = 2,
  Tr = 4,
  zn = 'aaaaa-aa',
  Zn = (t) => {
    var A;
    return new Uint8Array(
      ((A = t.match(/.{1,2}/g)) !== null && A !== void 0 ? A : []).map((e) =>
        parseInt(e, 16),
      ),
    );
  },
  Vn = (t) => t.reduce((A, e) => A + e.toString(16).padStart(2, '0'), '');
class $e {
  constructor(A) {
    (this._arr = A), (this._isPrincipal = !0);
  }
  static anonymous() {
    return new this(new Uint8Array([Tr]));
  }
  static managementCanister() {
    return this.fromHex(zn);
  }
  static selfAuthenticating(A) {
    const e = Wn(A);
    return new this(new Uint8Array([...e, jn]));
  }
  static from(A) {
    if (typeof A == 'string') return $e.fromText(A);
    if (typeof A == 'object' && A !== null && A._isPrincipal === !0)
      return new $e(A._arr);
    throw new Error(`Impossible to convert ${JSON.stringify(A)} to Principal.`);
  }
  static fromHex(A) {
    return new this(Zn(A));
  }
  static fromText(A) {
    let e = A;
    if (A.includes(xt)) {
      const y = JSON.parse(A);
      xt in y && (e = y[xt]);
    }
    const g = e.toLowerCase().replace(/-/g, '');
    let s = Gn(g);
    s = s.slice(4, s.length);
    const l = new this(s);
    if (l.toText() !== e)
      throw new Error(
        `Principal "${l.toText()}" does not have a valid checksum (original value "${e}" may not be a valid Principal ID).`,
      );
    return l;
  }
  static fromUint8Array(A) {
    return new this(A);
  }
  isAnonymous() {
    return this._arr.byteLength === 1 && this._arr[0] === Tr;
  }
  toUint8Array() {
    return this._arr;
  }
  toHex() {
    return Vn(this._arr).toUpperCase();
  }
  toText() {
    const A = new ArrayBuffer(4);
    new DataView(A).setUint32(0, bn(this._arr));
    const g = new Uint8Array(A),
      s = Uint8Array.from(this._arr),
      l = new Uint8Array([...g, ...s]),
      u = mn(l).match(/.{1,5}/g);
    if (!u) throw new Error();
    return u.join('-');
  }
  toString() {
    return this.toText();
  }
  toJSON() {
    return { [xt]: this.toText() };
  }
  compareTo(A) {
    for (let e = 0; e < Math.min(this._arr.length, A._arr.length); e++) {
      if (this._arr[e] < A._arr[e]) return 'lt';
      if (this._arr[e] > A._arr[e]) return 'gt';
    }
    return this._arr.length < A._arr.length
      ? 'lt'
      : this._arr.length > A._arr.length
      ? 'gt'
      : 'eq';
  }
  ltEq(A) {
    const e = this.compareTo(A);
    return e == 'lt' || e == 'eq';
  }
  gtEq(A) {
    const e = this.compareTo(A);
    return e == 'gt' || e == 'eq';
  }
}
class pr {
  constructor(A, e = A?.byteLength || 0) {
    (this._buffer = A || new ArrayBuffer(0)),
      (this._view = new Uint8Array(this._buffer, 0, e));
  }
  get buffer() {
    return this._view.slice();
  }
  get byteLength() {
    return this._view.byteLength;
  }
  read(A) {
    const e = this._view.subarray(0, A);
    return (this._view = this._view.subarray(A)), e.slice().buffer;
  }
  readUint8() {
    const A = this._view[0];
    return (this._view = this._view.subarray(1)), A;
  }
  write(A) {
    const e = new Uint8Array(A),
      g = this._view.byteLength;
    this._view.byteOffset + this._view.byteLength + e.byteLength >=
    this._buffer.byteLength
      ? this.alloc(e.byteLength)
      : (this._view = new Uint8Array(
          this._buffer,
          this._view.byteOffset,
          this._view.byteLength + e.byteLength,
        )),
      this._view.set(e, g);
  }
  get end() {
    return this._view.byteLength === 0;
  }
  alloc(A) {
    const e = new ArrayBuffer(((this._buffer.byteLength + A) * 1.2) | 0),
      g = new Uint8Array(e, 0, this._view.byteLength + A);
    g.set(this._view), (this._buffer = e), (this._view = g);
  }
}
function xi() {
  throw new Error('unexpected end of buffer');
}
function Xn(t, A) {
  return t.byteLength < A && xi(), t.read(A);
}
function vr(t) {
  const A = t.readUint8();
  return A === void 0 && xi(), A;
}
function Yr(t) {
  if ((typeof t == 'number' && (t = BigInt(t)), t < BigInt(0)))
    throw new Error('Cannot leb encode negative values.');
  const A = (t === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(t)))) + 1,
    e = new pr(new ArrayBuffer(A), 0);
  for (;;) {
    const g = Number(t & BigInt(127));
    if (((t /= BigInt(128)), t === BigInt(0))) {
      e.write(new Uint8Array([g]));
      break;
    } else e.write(new Uint8Array([g | 128]));
  }
  return e.buffer;
}
function yr(t) {
  typeof t == 'number' && (t = BigInt(t));
  const A = t < BigInt(0);
  A && (t = -t - BigInt(1));
  const e = (t === BigInt(0) ? 0 : Math.ceil(Math.log2(Number(t)))) + 1,
    g = new pr(new ArrayBuffer(e), 0);
  for (;;) {
    const l = s(t);
    if (
      ((t /= BigInt(128)),
      (A && t === BigInt(0) && l & 64) || (!A && t === BigInt(0) && !(l & 64)))
    ) {
      g.write(new Uint8Array([l]));
      break;
    } else g.write(new Uint8Array([l | 128]));
  }
  function s(l) {
    const y = l % BigInt(128);
    return Number(A ? BigInt(128) - y - BigInt(1) : y);
  }
  return g.buffer;
}
function $n(t, A) {
  if (BigInt(t) < BigInt(0)) throw new Error('Cannot write negative values.');
  return di(t, A);
}
function di(t, A) {
  t = BigInt(t);
  const e = new pr(new ArrayBuffer(Math.min(1, A)), 0);
  let g = 0,
    s = BigInt(256),
    l = BigInt(0),
    y = Number(t % s);
  for (e.write(new Uint8Array([y])); ++g < A; )
    t < 0 && l === BigInt(0) && y !== 0 && (l = BigInt(1)),
      (y = Number((t / s - l) % BigInt(256))),
      e.write(new Uint8Array([y])),
      (s *= BigInt(256));
  return e.buffer;
}
function Di(t, A) {
  let e = BigInt(vr(t)),
    g = BigInt(1),
    s = 0;
  for (; ++s < A; ) {
    g *= BigInt(256);
    const l = BigInt(vr(t));
    e = e + g * l;
  }
  return e;
}
function Ag(t, A) {
  let e = Di(t, A);
  const g = BigInt(2) ** (BigInt(8) * BigInt(A - 1) + BigInt(7));
  return e >= g && (e -= g * BigInt(2)), e;
}
function Br(t) {
  const A = BigInt(t);
  if (t < 0) throw new RangeError('Input must be non-negative');
  return BigInt(1) << A;
}
const Hr = 400;
class Si {
  display() {
    return this.name;
  }
  valueToString(A) {
    return pt(A);
  }
  buildTypeTable(A) {
    A.has(this) || this._buildTypeTableImpl(A);
  }
}
class xr extends Si {
  checkType(A) {
    if (this.name !== A.name)
      throw new Error(
        `type mismatch: type on the wire ${A.name}, expect type ${this.name}`,
      );
    return A;
  }
  _buildTypeTableImpl(A) {}
}
class eg extends Si {
  checkType(A) {
    if (A instanceof Yt) {
      const e = A.getType();
      if (typeof e > 'u')
        throw new Error('type mismatch with uninitialized type');
      return e;
    }
    throw new Error(
      `type mismatch: type on the wire ${A.name}, expect type ${this.name}`,
    );
  }
  encodeType(A) {
    return A.indexOf(this.name);
  }
}
class Ni extends xr {
  constructor(A) {
    if ((super(), (this._bits = A), A !== 32 && A !== 64))
      throw new Error('not a valid float type');
  }
  accept(A, e) {
    return A.visitFloat(this, e);
  }
  covariant(A) {
    if (typeof A == 'number' || A instanceof Number) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${pt(A)}`);
  }
  encodeValue(A) {
    const e = new ArrayBuffer(this._bits / 8),
      g = new DataView(e);
    return (
      this._bits === 32 ? g.setFloat32(0, A, !0) : g.setFloat64(0, A, !0), e
    );
  }
  encodeType() {
    const A = this._bits === 32 ? -13 : -14;
    return yr(A);
  }
  decodeValue(A, e) {
    this.checkType(e);
    const g = Xn(A, this._bits / 8),
      s = new DataView(g);
    return this._bits === 32 ? s.getFloat32(0, !0) : s.getFloat64(0, !0);
  }
  get name() {
    return 'float' + this._bits;
  }
  valueToString(A) {
    return A.toString();
  }
}
class Tt extends xr {
  constructor(A) {
    super(), (this._bits = A);
  }
  accept(A, e) {
    return A.visitFixedInt(this, e);
  }
  covariant(A) {
    const e = Br(this._bits - 1) * BigInt(-1),
      g = Br(this._bits - 1) - BigInt(1);
    let s = !1;
    if (typeof A == 'bigint') s = A >= e && A <= g;
    else if (Number.isInteger(A)) {
      const l = BigInt(A);
      s = l >= e && l <= g;
    } else s = !1;
    if (s) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${pt(A)}`);
  }
  encodeValue(A) {
    return di(A, this._bits / 8);
  }
  encodeType() {
    const A = Math.log2(this._bits) - 3;
    return yr(-9 - A);
  }
  decodeValue(A, e) {
    this.checkType(e);
    const g = Ag(A, this._bits / 8);
    return this._bits <= 32 ? Number(g) : g;
  }
  get name() {
    return `int${this._bits}`;
  }
  valueToString(A) {
    return A.toString();
  }
}
class vt extends xr {
  constructor(A) {
    super(), (this._bits = A);
  }
  accept(A, e) {
    return A.visitFixedNat(this, e);
  }
  covariant(A) {
    const e = Br(this._bits);
    let g = !1;
    if (
      (typeof A == 'bigint' && A >= BigInt(0)
        ? (g = A < e)
        : Number.isInteger(A) && A >= 0
        ? (g = BigInt(A) < e)
        : (g = !1),
      g)
    )
      return !0;
    throw new Error(`Invalid ${this.display()} argument: ${pt(A)}`);
  }
  encodeValue(A) {
    return $n(A, this._bits / 8);
  }
  encodeType() {
    const A = Math.log2(this._bits) - 3;
    return yr(-5 - A);
  }
  decodeValue(A, e) {
    this.checkType(e);
    const g = Di(A, this._bits / 8);
    return this._bits <= 32 ? Number(g) : g;
  }
  get name() {
    return `nat${this._bits}`;
  }
  valueToString(A) {
    return A.toString();
  }
}
class Yt extends eg {
  constructor() {
    super(...arguments), (this._id = Yt._counter++), (this._type = void 0);
  }
  accept(A, e) {
    if (!this._type) throw Error('Recursive type uninitialized.');
    return A.visitRec(this, this._type, e);
  }
  fill(A) {
    this._type = A;
  }
  getType() {
    return this._type;
  }
  covariant(A) {
    if (this._type && this._type.covariant(A)) return !0;
    throw new Error(`Invalid ${this.display()} argument: ${pt(A)}`);
  }
  encodeValue(A) {
    if (!this._type) throw Error('Recursive type uninitialized.');
    return this._type.encodeValue(A);
  }
  _buildTypeTableImpl(A) {
    if (!this._type) throw Error('Recursive type uninitialized.');
    A.add(this, new Uint8Array([])),
      this._type.buildTypeTable(A),
      A.merge(this, this._type.name);
  }
  decodeValue(A, e) {
    if (!this._type) throw Error('Recursive type uninitialized.');
    return this._type.decodeValue(A, e);
  }
  get name() {
    return `rec_${this._id}`;
  }
  display() {
    if (!this._type) throw Error('Recursive type uninitialized.');
    return `μ${this.name}.${this._type.name}`;
  }
  valueToString(A) {
    if (!this._type) throw Error('Recursive type uninitialized.');
    return this._type.valueToString(A);
  }
}
Yt._counter = 0;
function pt(t) {
  const A = JSON.stringify(t, (e, g) =>
    typeof g == 'bigint' ? `BigInt(${g})` : g,
  );
  return A && A.length > Hr ? A.substring(0, Hr - 3) + '...' : A;
}
new Ni(32);
new Ni(64);
new Tt(8);
new Tt(16);
new Tt(32);
new Tt(64);
new vt(8);
new vt(16);
new vt(32);
new vt(64);
var Fi = {},
  mi = { exports: {} };
(function (t) {
  (function (A) {
    var e,
      g = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
      s = Math.ceil,
      l = Math.floor,
      y = '[BigNumber Error] ',
      u = y + 'Number primitive has more than 15 significant digits: ',
      M = 1e14,
      b = 14,
      $ = 9007199254740991,
      J = [
        1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13,
      ],
      nA = 1e7,
      AA = 1e9;
    function vA(oA) {
      var cA,
        YA,
        PA,
        z = (C.prototype = { constructor: C, toString: null, valueOf: null }),
        HA = new C(1),
        GA = 20,
        MA = 4,
        ee = -7,
        $A = 21,
        re = -1e7,
        ie = 1e7,
        JA = !1,
        bA = 1,
        Ce = 0,
        wA = {
          prefix: '',
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ',',
          decimalSeparator: '.',
          fractionGroupSize: 0,
          fractionGroupSeparator: ' ',
          suffix: '',
        },
        qA = '0123456789abcdefghijklmnopqrstuvwxyz',
        yA = !0;
      function C(c, h) {
        var D,
          m,
          N,
          F,
          I,
          r,
          n,
          a,
          f = this;
        if (!(f instanceof C)) return new C(c, h);
        if (h == null) {
          if (c && c._isBigNumber === !0) {
            (f.s = c.s),
              !c.c || c.e > ie
                ? (f.c = f.e = null)
                : c.e < re
                ? (f.c = [(f.e = 0)])
                : ((f.e = c.e), (f.c = c.c.slice()));
            return;
          }
          if ((r = typeof c == 'number') && c * 0 == 0) {
            if (((f.s = 1 / c < 0 ? ((c = -c), -1) : 1), c === ~~c)) {
              for (F = 0, I = c; I >= 10; I /= 10, F++);
              F > ie ? (f.c = f.e = null) : ((f.e = F), (f.c = [c]));
              return;
            }
            a = String(c);
          } else {
            if (!g.test((a = String(c)))) return PA(f, a, r);
            f.s = a.charCodeAt(0) == 45 ? ((a = a.slice(1)), -1) : 1;
          }
          (F = a.indexOf('.')) > -1 && (a = a.replace('.', '')),
            (I = a.search(/e/i)) > 0
              ? (F < 0 && (F = I),
                (F += +a.slice(I + 1)),
                (a = a.substring(0, I)))
              : F < 0 && (F = a.length);
        } else {
          if ((kA(h, 2, qA.length, 'Base'), h == 10 && yA))
            return (f = new C(c)), IA(f, GA + f.e + 1, MA);
          if (((a = String(c)), (r = typeof c == 'number'))) {
            if (c * 0 != 0) return PA(f, a, r, h);
            if (
              ((f.s = 1 / c < 0 ? ((a = a.slice(1)), -1) : 1),
              C.DEBUG && a.replace(/^0\.0*|\./, '').length > 15)
            )
              throw Error(u + c);
          } else f.s = a.charCodeAt(0) === 45 ? ((a = a.slice(1)), -1) : 1;
          for (D = qA.slice(0, h), F = I = 0, n = a.length; I < n; I++)
            if (D.indexOf((m = a.charAt(I))) < 0) {
              if (m == '.') {
                if (I > F) {
                  F = n;
                  continue;
                }
              } else if (
                !N &&
                ((a == a.toUpperCase() && (a = a.toLowerCase())) ||
                  (a == a.toLowerCase() && (a = a.toUpperCase())))
              ) {
                (N = !0), (I = -1), (F = 0);
                continue;
              }
              return PA(f, String(c), r, h);
            }
          (r = !1),
            (a = YA(a, h, 10, f.s)),
            (F = a.indexOf('.')) > -1
              ? (a = a.replace('.', ''))
              : (F = a.length);
        }
        for (I = 0; a.charCodeAt(I) === 48; I++);
        for (n = a.length; a.charCodeAt(--n) === 48; );
        if ((a = a.slice(I, ++n))) {
          if (((n -= I), r && C.DEBUG && n > 15 && (c > $ || c !== l(c))))
            throw Error(u + f.s * c);
          if ((F = F - I - 1) > ie) f.c = f.e = null;
          else if (F < re) f.c = [(f.e = 0)];
          else {
            if (
              ((f.e = F),
              (f.c = []),
              (I = (F + 1) % b),
              F < 0 && (I += b),
              I < n)
            ) {
              for (I && f.c.push(+a.slice(0, I)), n -= b; I < n; )
                f.c.push(+a.slice(I, (I += b)));
              I = b - (a = a.slice(I)).length;
            } else I -= n;
            for (; I--; a += '0');
            f.c.push(+a);
          }
        } else f.c = [(f.e = 0)];
      }
      (C.clone = vA),
        (C.ROUND_UP = 0),
        (C.ROUND_DOWN = 1),
        (C.ROUND_CEIL = 2),
        (C.ROUND_FLOOR = 3),
        (C.ROUND_HALF_UP = 4),
        (C.ROUND_HALF_DOWN = 5),
        (C.ROUND_HALF_EVEN = 6),
        (C.ROUND_HALF_CEIL = 7),
        (C.ROUND_HALF_FLOOR = 8),
        (C.EUCLID = 9),
        (C.config = C.set =
          function (c) {
            var h, D;
            if (c != null)
              if (typeof c == 'object') {
                if (
                  (c.hasOwnProperty((h = 'DECIMAL_PLACES')) &&
                    ((D = c[h]), kA(D, 0, AA, h), (GA = D)),
                  c.hasOwnProperty((h = 'ROUNDING_MODE')) &&
                    ((D = c[h]), kA(D, 0, 8, h), (MA = D)),
                  c.hasOwnProperty((h = 'EXPONENTIAL_AT')) &&
                    ((D = c[h]),
                    D && D.pop
                      ? (kA(D[0], -AA, 0, h),
                        kA(D[1], 0, AA, h),
                        (ee = D[0]),
                        ($A = D[1]))
                      : (kA(D, -AA, AA, h), (ee = -($A = D < 0 ? -D : D)))),
                  c.hasOwnProperty((h = 'RANGE')))
                )
                  if (((D = c[h]), D && D.pop))
                    kA(D[0], -AA, -1, h),
                      kA(D[1], 1, AA, h),
                      (re = D[0]),
                      (ie = D[1]);
                  else if ((kA(D, -AA, AA, h), D)) re = -(ie = D < 0 ? -D : D);
                  else throw Error(y + h + ' cannot be zero: ' + D);
                if (c.hasOwnProperty((h = 'CRYPTO')))
                  if (((D = c[h]), D === !!D))
                    if (D)
                      if (
                        typeof crypto < 'u' &&
                        crypto &&
                        (crypto.getRandomValues || crypto.randomBytes)
                      )
                        JA = D;
                      else throw ((JA = !D), Error(y + 'crypto unavailable'));
                    else JA = D;
                  else throw Error(y + h + ' not true or false: ' + D);
                if (
                  (c.hasOwnProperty((h = 'MODULO_MODE')) &&
                    ((D = c[h]), kA(D, 0, 9, h), (bA = D)),
                  c.hasOwnProperty((h = 'POW_PRECISION')) &&
                    ((D = c[h]), kA(D, 0, AA, h), (Ce = D)),
                  c.hasOwnProperty((h = 'FORMAT')))
                )
                  if (((D = c[h]), typeof D == 'object')) wA = D;
                  else throw Error(y + h + ' not an object: ' + D);
                if (c.hasOwnProperty((h = 'ALPHABET')))
                  if (
                    ((D = c[h]),
                    typeof D == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(D))
                  )
                    (yA = D.slice(0, 10) == '0123456789'), (qA = D);
                  else throw Error(y + h + ' invalid: ' + D);
              } else throw Error(y + 'Object expected: ' + c);
            return {
              DECIMAL_PLACES: GA,
              ROUNDING_MODE: MA,
              EXPONENTIAL_AT: [ee, $A],
              RANGE: [re, ie],
              CRYPTO: JA,
              MODULO_MODE: bA,
              POW_PRECISION: Ce,
              FORMAT: wA,
              ALPHABET: qA,
            };
          }),
        (C.isBigNumber = function (c) {
          if (!c || c._isBigNumber !== !0) return !1;
          if (!C.DEBUG) return !0;
          var h,
            D,
            m = c.c,
            N = c.e,
            F = c.s;
          A: if ({}.toString.call(m) == '[object Array]') {
            if ((F === 1 || F === -1) && N >= -AA && N <= AA && N === l(N)) {
              if (m[0] === 0) {
                if (N === 0 && m.length === 1) return !0;
                break A;
              }
              if (
                ((h = (N + 1) % b), h < 1 && (h += b), String(m[0]).length == h)
              ) {
                for (h = 0; h < m.length; h++)
                  if (((D = m[h]), D < 0 || D >= M || D !== l(D))) break A;
                if (D !== 0) return !0;
              }
            }
          } else if (
            m === null &&
            N === null &&
            (F === null || F === 1 || F === -1)
          )
            return !0;
          throw Error(y + 'Invalid BigNumber: ' + c);
        }),
        (C.maximum = C.max =
          function () {
            return te(arguments, -1);
          }),
        (C.minimum = C.min =
          function () {
            return te(arguments, 1);
          }),
        (C.random = (function () {
          var c = 9007199254740992,
            h =
              (Math.random() * c) & 2097151
                ? function () {
                    return l(Math.random() * c);
                  }
                : function () {
                    return (
                      ((Math.random() * 1073741824) | 0) * 8388608 +
                      ((Math.random() * 8388608) | 0)
                    );
                  };
          return function (D) {
            var m,
              N,
              F,
              I,
              r,
              n = 0,
              a = [],
              f = new C(HA);
            if ((D == null ? (D = GA) : kA(D, 0, AA), (I = s(D / b)), JA))
              if (crypto.getRandomValues) {
                for (
                  m = crypto.getRandomValues(new Uint32Array((I *= 2)));
                  n < I;

                )
                  (r = m[n] * 131072 + (m[n + 1] >>> 11)),
                    r >= 9e15
                      ? ((N = crypto.getRandomValues(new Uint32Array(2))),
                        (m[n] = N[0]),
                        (m[n + 1] = N[1]))
                      : (a.push(r % 1e14), (n += 2));
                n = I / 2;
              } else if (crypto.randomBytes) {
                for (m = crypto.randomBytes((I *= 7)); n < I; )
                  (r =
                    (m[n] & 31) * 281474976710656 +
                    m[n + 1] * 1099511627776 +
                    m[n + 2] * 4294967296 +
                    m[n + 3] * 16777216 +
                    (m[n + 4] << 16) +
                    (m[n + 5] << 8) +
                    m[n + 6]),
                    r >= 9e15
                      ? crypto.randomBytes(7).copy(m, n)
                      : (a.push(r % 1e14), (n += 7));
                n = I / 7;
              } else throw ((JA = !1), Error(y + 'crypto unavailable'));
            if (!JA) for (; n < I; ) (r = h()), r < 9e15 && (a[n++] = r % 1e14);
            for (
              I = a[--n],
                D %= b,
                I && D && ((r = J[b - D]), (a[n] = l(I / r) * r));
              a[n] === 0;
              a.pop(), n--
            );
            if (n < 0) a = [(F = 0)];
            else {
              for (F = -1; a[0] === 0; a.splice(0, 1), F -= b);
              for (n = 1, r = a[0]; r >= 10; r /= 10, n++);
              n < b && (F -= b - n);
            }
            return (f.e = F), (f.c = a), f;
          };
        })()),
        (C.sum = function () {
          for (var c = 1, h = arguments, D = new C(h[0]); c < h.length; )
            D = D.plus(h[c++]);
          return D;
        }),
        (YA = (function () {
          var c = '0123456789';
          function h(D, m, N, F) {
            for (var I, r = [0], n, a = 0, f = D.length; a < f; ) {
              for (n = r.length; n--; r[n] *= m);
              for (r[0] += F.indexOf(D.charAt(a++)), I = 0; I < r.length; I++)
                r[I] > N - 1 &&
                  (r[I + 1] == null && (r[I + 1] = 0),
                  (r[I + 1] += (r[I] / N) | 0),
                  (r[I] %= N));
            }
            return r.reverse();
          }
          return function (D, m, N, F, I) {
            var r,
              n,
              a,
              f,
              x,
              R,
              K,
              iA,
              QA = D.indexOf('.'),
              lA = GA,
              V = MA;
            for (
              QA >= 0 &&
                ((f = Ce),
                (Ce = 0),
                (D = D.replace('.', '')),
                (iA = new C(m)),
                (R = iA.pow(D.length - QA)),
                (Ce = f),
                (iA.c = h(zA(ae(R.c), R.e, '0'), 10, N, c)),
                (iA.e = iA.c.length)),
                K = h(D, m, N, I ? ((r = qA), c) : ((r = c), qA)),
                a = f = K.length;
              K[--f] == 0;
              K.pop()
            );
            if (!K[0]) return r.charAt(0);
            if (
              (QA < 0
                ? --a
                : ((R.c = K),
                  (R.e = a),
                  (R.s = F),
                  (R = cA(R, iA, lA, V, N)),
                  (K = R.c),
                  (x = R.r),
                  (a = R.e)),
              (n = a + lA + 1),
              (QA = K[n]),
              (f = N / 2),
              (x = x || n < 0 || K[n + 1] != null),
              (x =
                V < 4
                  ? (QA != null || x) && (V == 0 || V == (R.s < 0 ? 3 : 2))
                  : QA > f ||
                    (QA == f &&
                      (V == 4 ||
                        x ||
                        (V == 6 && K[n - 1] & 1) ||
                        V == (R.s < 0 ? 8 : 7)))),
              n < 1 || !K[0])
            )
              D = x ? zA(r.charAt(1), -lA, r.charAt(0)) : r.charAt(0);
            else {
              if (((K.length = n), x))
                for (--N; ++K[--n] > N; )
                  (K[n] = 0), n || (++a, (K = [1].concat(K)));
              for (f = K.length; !K[--f]; );
              for (QA = 0, D = ''; QA <= f; D += r.charAt(K[QA++]));
              D = zA(D, a, r.charAt(0));
            }
            return D;
          };
        })()),
        (cA = (function () {
          function c(m, N, F) {
            var I,
              r,
              n,
              a,
              f = 0,
              x = m.length,
              R = N % nA,
              K = (N / nA) | 0;
            for (m = m.slice(); x--; )
              (n = m[x] % nA),
                (a = (m[x] / nA) | 0),
                (I = K * n + a * R),
                (r = R * n + (I % nA) * nA + f),
                (f = ((r / F) | 0) + ((I / nA) | 0) + K * a),
                (m[x] = r % F);
            return f && (m = [f].concat(m)), m;
          }
          function h(m, N, F, I) {
            var r, n;
            if (F != I) n = F > I ? 1 : -1;
            else
              for (r = n = 0; r < F; r++)
                if (m[r] != N[r]) {
                  n = m[r] > N[r] ? 1 : -1;
                  break;
                }
            return n;
          }
          function D(m, N, F, I) {
            for (var r = 0; F--; )
              (m[F] -= r),
                (r = m[F] < N[F] ? 1 : 0),
                (m[F] = r * I + m[F] - N[F]);
            for (; !m[0] && m.length > 1; m.splice(0, 1));
          }
          return function (m, N, F, I, r) {
            var n,
              a,
              f,
              x,
              R,
              K,
              iA,
              QA,
              lA,
              V,
              xA,
              WA,
              we,
              fe,
              pe,
              pA,
              he,
              ne = m.s == N.s ? 1 : -1,
              OA = m.c,
              KA = N.c;
            if (!OA || !OA[0] || !KA || !KA[0])
              return new C(
                !m.s || !N.s || (OA ? KA && OA[0] == KA[0] : !KA)
                  ? NaN
                  : (OA && OA[0] == 0) || !KA
                  ? ne * 0
                  : ne / 0,
              );
            for (
              QA = new C(ne),
                lA = QA.c = [],
                a = m.e - N.e,
                ne = F + a + 1,
                r ||
                  ((r = M),
                  (a = RA(m.e / b) - RA(N.e / b)),
                  (ne = (ne / b) | 0)),
                f = 0;
              KA[f] == (OA[f] || 0);
              f++
            );
            if ((KA[f] > (OA[f] || 0) && a--, ne < 0)) lA.push(1), (x = !0);
            else {
              for (
                fe = OA.length,
                  pA = KA.length,
                  f = 0,
                  ne += 2,
                  R = l(r / (KA[0] + 1)),
                  R > 1 &&
                    ((KA = c(KA, R, r)),
                    (OA = c(OA, R, r)),
                    (pA = KA.length),
                    (fe = OA.length)),
                  we = pA,
                  V = OA.slice(0, pA),
                  xA = V.length;
                xA < pA;
                V[xA++] = 0
              );
              (he = KA.slice()),
                (he = [0].concat(he)),
                (pe = KA[0]),
                KA[1] >= r / 2 && pe++;
              do {
                if (((R = 0), (n = h(KA, V, pA, xA)), n < 0)) {
                  if (
                    ((WA = V[0]),
                    pA != xA && (WA = WA * r + (V[1] || 0)),
                    (R = l(WA / pe)),
                    R > 1)
                  )
                    for (
                      R >= r && (R = r - 1),
                        K = c(KA, R, r),
                        iA = K.length,
                        xA = V.length;
                      h(K, V, iA, xA) == 1;

                    )
                      R--,
                        D(K, pA < iA ? he : KA, iA, r),
                        (iA = K.length),
                        (n = 1);
                  else R == 0 && (n = R = 1), (K = KA.slice()), (iA = K.length);
                  if (
                    (iA < xA && (K = [0].concat(K)),
                    D(V, K, xA, r),
                    (xA = V.length),
                    n == -1)
                  )
                    for (; h(KA, V, pA, xA) < 1; )
                      R++, D(V, pA < xA ? he : KA, xA, r), (xA = V.length);
                } else n === 0 && (R++, (V = [0]));
                (lA[f++] = R),
                  V[0] ? (V[xA++] = OA[we] || 0) : ((V = [OA[we]]), (xA = 1));
              } while ((we++ < fe || V[0] != null) && ne--);
              (x = V[0] != null), lA[0] || lA.splice(0, 1);
            }
            if (r == M) {
              for (f = 1, ne = lA[0]; ne >= 10; ne /= 10, f++);
              IA(QA, F + (QA.e = f + a * b - 1) + 1, I, x);
            } else (QA.e = a), (QA.r = +x);
            return QA;
          };
        })());
      function uA(c, h, D, m) {
        var N, F, I, r, n;
        if ((D == null ? (D = MA) : kA(D, 0, 8), !c.c)) return c.toString();
        if (((N = c.c[0]), (I = c.e), h == null))
          (n = ae(c.c)),
            (n =
              m == 1 || (m == 2 && (I <= ee || I >= $A))
                ? oe(n, I)
                : zA(n, I, '0'));
        else if (
          ((c = IA(new C(c), h, D)),
          (F = c.e),
          (n = ae(c.c)),
          (r = n.length),
          m == 1 || (m == 2 && (h <= F || F <= ee)))
        ) {
          for (; r < h; n += '0', r++);
          n = oe(n, F);
        } else if (((h -= I), (n = zA(n, F, '0')), F + 1 > r)) {
          if (--h > 0) for (n += '.'; h--; n += '0');
        } else if (((h += F - r), h > 0))
          for (F + 1 == r && (n += '.'); h--; n += '0');
        return c.s < 0 && N ? '-' + n : n;
      }
      function te(c, h) {
        for (var D, m, N = 1, F = new C(c[0]); N < c.length; N++)
          (m = new C(c[N])),
            (!m.s || (D = Ee(F, m)) === h || (D === 0 && F.s === h)) && (F = m);
        return F;
      }
      function Fe(c, h, D) {
        for (var m = 1, N = h.length; !h[--N]; h.pop());
        for (N = h[0]; N >= 10; N /= 10, m++);
        return (
          (D = m + D * b - 1) > ie
            ? (c.c = c.e = null)
            : D < re
            ? (c.c = [(c.e = 0)])
            : ((c.e = D), (c.c = h)),
          c
        );
      }
      PA = (function () {
        var c = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
          h = /^([^.]+)\.$/,
          D = /^\.([^.]+)$/,
          m = /^-?(Infinity|NaN)$/,
          N = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
        return function (F, I, r, n) {
          var a,
            f = r ? I : I.replace(N, '');
          if (m.test(f)) F.s = isNaN(f) ? null : f < 0 ? -1 : 1;
          else {
            if (
              !r &&
              ((f = f.replace(c, function (x, R, K) {
                return (
                  (a = (K = K.toLowerCase()) == 'x' ? 16 : K == 'b' ? 2 : 8),
                  !n || n == a ? R : x
                );
              })),
              n && ((a = n), (f = f.replace(h, '$1').replace(D, '0.$1'))),
              I != f)
            )
              return new C(f, a);
            if (C.DEBUG)
              throw Error(
                y + 'Not a' + (n ? ' base ' + n : '') + ' number: ' + I,
              );
            F.s = null;
          }
          F.c = F.e = null;
        };
      })();
      function IA(c, h, D, m) {
        var N,
          F,
          I,
          r,
          n,
          a,
          f,
          x = c.c,
          R = J;
        if (x) {
          A: {
            for (N = 1, r = x[0]; r >= 10; r /= 10, N++);
            if (((F = h - N), F < 0))
              (F += b),
                (I = h),
                (n = x[(a = 0)]),
                (f = l((n / R[N - I - 1]) % 10));
            else if (((a = s((F + 1) / b)), a >= x.length))
              if (m) {
                for (; x.length <= a; x.push(0));
                (n = f = 0), (N = 1), (F %= b), (I = F - b + 1);
              } else break A;
            else {
              for (n = r = x[a], N = 1; r >= 10; r /= 10, N++);
              (F %= b),
                (I = F - b + N),
                (f = I < 0 ? 0 : l((n / R[N - I - 1]) % 10));
            }
            if (
              ((m =
                m ||
                h < 0 ||
                x[a + 1] != null ||
                (I < 0 ? n : n % R[N - I - 1])),
              (m =
                D < 4
                  ? (f || m) && (D == 0 || D == (c.s < 0 ? 3 : 2))
                  : f > 5 ||
                    (f == 5 &&
                      (D == 4 ||
                        m ||
                        (D == 6 &&
                          (F > 0 ? (I > 0 ? n / R[N - I] : 0) : x[a - 1]) % 10 &
                            1) ||
                        D == (c.s < 0 ? 8 : 7)))),
              h < 1 || !x[0])
            )
              return (
                (x.length = 0),
                m
                  ? ((h -= c.e + 1),
                    (x[0] = R[(b - (h % b)) % b]),
                    (c.e = -h || 0))
                  : (x[0] = c.e = 0),
                c
              );
            if (
              (F == 0
                ? ((x.length = a), (r = 1), a--)
                : ((x.length = a + 1),
                  (r = R[b - F]),
                  (x[a] = I > 0 ? l((n / R[N - I]) % R[I]) * r : 0)),
              m)
            )
              for (;;)
                if (a == 0) {
                  for (F = 1, I = x[0]; I >= 10; I /= 10, F++);
                  for (I = x[0] += r, r = 1; I >= 10; I /= 10, r++);
                  F != r && (c.e++, x[0] == M && (x[0] = 1));
                  break;
                } else {
                  if (((x[a] += r), x[a] != M)) break;
                  (x[a--] = 0), (r = 1);
                }
            for (F = x.length; x[--F] === 0; x.pop());
          }
          c.e > ie ? (c.c = c.e = null) : c.e < re && (c.c = [(c.e = 0)]);
        }
        return c;
      }
      function fA(c) {
        var h,
          D = c.e;
        return D === null
          ? c.toString()
          : ((h = ae(c.c)),
            (h = D <= ee || D >= $A ? oe(h, D) : zA(h, D, '0')),
            c.s < 0 ? '-' + h : h);
      }
      return (
        (z.absoluteValue = z.abs =
          function () {
            var c = new C(this);
            return c.s < 0 && (c.s = 1), c;
          }),
        (z.comparedTo = function (c, h) {
          return Ee(this, new C(c, h));
        }),
        (z.decimalPlaces = z.dp =
          function (c, h) {
            var D,
              m,
              N,
              F = this;
            if (c != null)
              return (
                kA(c, 0, AA),
                h == null ? (h = MA) : kA(h, 0, 8),
                IA(new C(F), c + F.e + 1, h)
              );
            if (!(D = F.c)) return null;
            if (((m = ((N = D.length - 1) - RA(this.e / b)) * b), (N = D[N])))
              for (; N % 10 == 0; N /= 10, m--);
            return m < 0 && (m = 0), m;
          }),
        (z.dividedBy = z.div =
          function (c, h) {
            return cA(this, new C(c, h), GA, MA);
          }),
        (z.dividedToIntegerBy = z.idiv =
          function (c, h) {
            return cA(this, new C(c, h), 0, 1);
          }),
        (z.exponentiatedBy = z.pow =
          function (c, h) {
            var D,
              m,
              N,
              F,
              I,
              r,
              n,
              a,
              f,
              x = this;
            if (((c = new C(c)), c.c && !c.isInteger()))
              throw Error(y + 'Exponent not an integer: ' + fA(c));
            if (
              (h != null && (h = new C(h)),
              (r = c.e > 14),
              !x.c ||
                !x.c[0] ||
                (x.c[0] == 1 && !x.e && x.c.length == 1) ||
                !c.c ||
                !c.c[0])
            )
              return (
                (f = new C(Math.pow(+fA(x), r ? c.s * (2 - XA(c)) : +fA(c)))),
                h ? f.mod(h) : f
              );
            if (((n = c.s < 0), h)) {
              if (h.c ? !h.c[0] : !h.s) return new C(NaN);
              (m = !n && x.isInteger() && h.isInteger()), m && (x = x.mod(h));
            } else {
              if (
                c.e > 9 &&
                (x.e > 0 ||
                  x.e < -1 ||
                  (x.e == 0
                    ? x.c[0] > 1 || (r && x.c[1] >= 24e7)
                    : x.c[0] < 8e13 || (r && x.c[0] <= 9999975e7)))
              )
                return (
                  (F = x.s < 0 && XA(c) ? -0 : 0),
                  x.e > -1 && (F = 1 / F),
                  new C(n ? 1 / F : F)
                );
              Ce && (F = s(Ce / b + 2));
            }
            for (
              r
                ? ((D = new C(0.5)), n && (c.s = 1), (a = XA(c)))
                : ((N = Math.abs(+fA(c))), (a = N % 2)),
                f = new C(HA);
              ;

            ) {
              if (a) {
                if (((f = f.times(x)), !f.c)) break;
                F ? f.c.length > F && (f.c.length = F) : m && (f = f.mod(h));
              }
              if (N) {
                if (((N = l(N / 2)), N === 0)) break;
                a = N % 2;
              } else if (((c = c.times(D)), IA(c, c.e + 1, 1), c.e > 14))
                a = XA(c);
              else {
                if (((N = +fA(c)), N === 0)) break;
                a = N % 2;
              }
              (x = x.times(x)),
                F
                  ? x.c && x.c.length > F && (x.c.length = F)
                  : m && (x = x.mod(h));
            }
            return m
              ? f
              : (n && (f = HA.div(f)), h ? f.mod(h) : F ? IA(f, Ce, MA, I) : f);
          }),
        (z.integerValue = function (c) {
          var h = new C(this);
          return c == null ? (c = MA) : kA(c, 0, 8), IA(h, h.e + 1, c);
        }),
        (z.isEqualTo = z.eq =
          function (c, h) {
            return Ee(this, new C(c, h)) === 0;
          }),
        (z.isFinite = function () {
          return !!this.c;
        }),
        (z.isGreaterThan = z.gt =
          function (c, h) {
            return Ee(this, new C(c, h)) > 0;
          }),
        (z.isGreaterThanOrEqualTo = z.gte =
          function (c, h) {
            return (h = Ee(this, new C(c, h))) === 1 || h === 0;
          }),
        (z.isInteger = function () {
          return !!this.c && RA(this.e / b) > this.c.length - 2;
        }),
        (z.isLessThan = z.lt =
          function (c, h) {
            return Ee(this, new C(c, h)) < 0;
          }),
        (z.isLessThanOrEqualTo = z.lte =
          function (c, h) {
            return (h = Ee(this, new C(c, h))) === -1 || h === 0;
          }),
        (z.isNaN = function () {
          return !this.s;
        }),
        (z.isNegative = function () {
          return this.s < 0;
        }),
        (z.isPositive = function () {
          return this.s > 0;
        }),
        (z.isZero = function () {
          return !!this.c && this.c[0] == 0;
        }),
        (z.minus = function (c, h) {
          var D,
            m,
            N,
            F,
            I = this,
            r = I.s;
          if (((c = new C(c, h)), (h = c.s), !r || !h)) return new C(NaN);
          if (r != h) return (c.s = -h), I.plus(c);
          var n = I.e / b,
            a = c.e / b,
            f = I.c,
            x = c.c;
          if (!n || !a) {
            if (!f || !x) return f ? ((c.s = -h), c) : new C(x ? I : NaN);
            if (!f[0] || !x[0])
              return x[0]
                ? ((c.s = -h), c)
                : new C(f[0] ? I : MA == 3 ? -0 : 0);
          }
          if (((n = RA(n)), (a = RA(a)), (f = f.slice()), (r = n - a))) {
            for (
              (F = r < 0) ? ((r = -r), (N = f)) : ((a = n), (N = x)),
                N.reverse(),
                h = r;
              h--;
              N.push(0)
            );
            N.reverse();
          } else
            for (
              m = (F = (r = f.length) < (h = x.length)) ? r : h, r = h = 0;
              h < m;
              h++
            )
              if (f[h] != x[h]) {
                F = f[h] < x[h];
                break;
              }
          if (
            (F && ((N = f), (f = x), (x = N), (c.s = -c.s)),
            (h = (m = x.length) - (D = f.length)),
            h > 0)
          )
            for (; h--; f[D++] = 0);
          for (h = M - 1; m > r; ) {
            if (f[--m] < x[m]) {
              for (D = m; D && !f[--D]; f[D] = h);
              --f[D], (f[m] += M);
            }
            f[m] -= x[m];
          }
          for (; f[0] == 0; f.splice(0, 1), --a);
          return f[0]
            ? Fe(c, f, a)
            : ((c.s = MA == 3 ? -1 : 1), (c.c = [(c.e = 0)]), c);
        }),
        (z.modulo = z.mod =
          function (c, h) {
            var D,
              m,
              N = this;
            return (
              (c = new C(c, h)),
              !N.c || !c.s || (c.c && !c.c[0])
                ? new C(NaN)
                : !c.c || (N.c && !N.c[0])
                ? new C(N)
                : (bA == 9
                    ? ((m = c.s),
                      (c.s = 1),
                      (D = cA(N, c, 0, 3)),
                      (c.s = m),
                      (D.s *= m))
                    : (D = cA(N, c, 0, bA)),
                  (c = N.minus(D.times(c))),
                  !c.c[0] && bA == 1 && (c.s = N.s),
                  c)
            );
          }),
        (z.multipliedBy = z.times =
          function (c, h) {
            var D,
              m,
              N,
              F,
              I,
              r,
              n,
              a,
              f,
              x,
              R,
              K,
              iA,
              QA,
              lA,
              V = this,
              xA = V.c,
              WA = (c = new C(c, h)).c;
            if (!xA || !WA || !xA[0] || !WA[0])
              return (
                !V.s || !c.s || (xA && !xA[0] && !WA) || (WA && !WA[0] && !xA)
                  ? (c.c = c.e = c.s = null)
                  : ((c.s *= V.s),
                    !xA || !WA ? (c.c = c.e = null) : ((c.c = [0]), (c.e = 0))),
                c
              );
            for (
              m = RA(V.e / b) + RA(c.e / b),
                c.s *= V.s,
                n = xA.length,
                x = WA.length,
                n < x &&
                  ((iA = xA), (xA = WA), (WA = iA), (N = n), (n = x), (x = N)),
                N = n + x,
                iA = [];
              N--;
              iA.push(0)
            );
            for (QA = M, lA = nA, N = x; --N >= 0; ) {
              for (
                D = 0, R = WA[N] % lA, K = (WA[N] / lA) | 0, I = n, F = N + I;
                F > N;

              )
                (a = xA[--I] % lA),
                  (f = (xA[I] / lA) | 0),
                  (r = K * a + f * R),
                  (a = R * a + (r % lA) * lA + iA[F] + D),
                  (D = ((a / QA) | 0) + ((r / lA) | 0) + K * f),
                  (iA[F--] = a % QA);
              iA[F] = D;
            }
            return D ? ++m : iA.splice(0, 1), Fe(c, iA, m);
          }),
        (z.negated = function () {
          var c = new C(this);
          return (c.s = -c.s || null), c;
        }),
        (z.plus = function (c, h) {
          var D,
            m = this,
            N = m.s;
          if (((c = new C(c, h)), (h = c.s), !N || !h)) return new C(NaN);
          if (N != h) return (c.s = -h), m.minus(c);
          var F = m.e / b,
            I = c.e / b,
            r = m.c,
            n = c.c;
          if (!F || !I) {
            if (!r || !n) return new C(N / 0);
            if (!r[0] || !n[0]) return n[0] ? c : new C(r[0] ? m : N * 0);
          }
          if (((F = RA(F)), (I = RA(I)), (r = r.slice()), (N = F - I))) {
            for (
              N > 0 ? ((I = F), (D = n)) : ((N = -N), (D = r)), D.reverse();
              N--;
              D.push(0)
            );
            D.reverse();
          }
          for (
            N = r.length,
              h = n.length,
              N - h < 0 && ((D = n), (n = r), (r = D), (h = N)),
              N = 0;
            h;

          )
            (N = ((r[--h] = r[h] + n[h] + N) / M) | 0),
              (r[h] = M === r[h] ? 0 : r[h] % M);
          return N && ((r = [N].concat(r)), ++I), Fe(c, r, I);
        }),
        (z.precision = z.sd =
          function (c, h) {
            var D,
              m,
              N,
              F = this;
            if (c != null && c !== !!c)
              return (
                kA(c, 1, AA),
                h == null ? (h = MA) : kA(h, 0, 8),
                IA(new C(F), c, h)
              );
            if (!(D = F.c)) return null;
            if (((N = D.length - 1), (m = N * b + 1), (N = D[N]))) {
              for (; N % 10 == 0; N /= 10, m--);
              for (N = D[0]; N >= 10; N /= 10, m++);
            }
            return c && F.e + 1 > m && (m = F.e + 1), m;
          }),
        (z.shiftedBy = function (c) {
          return kA(c, -$, $), this.times('1e' + c);
        }),
        (z.squareRoot = z.sqrt =
          function () {
            var c,
              h,
              D,
              m,
              N,
              F = this,
              I = F.c,
              r = F.s,
              n = F.e,
              a = GA + 4,
              f = new C('0.5');
            if (r !== 1 || !I || !I[0])
              return new C(!r || (r < 0 && (!I || I[0])) ? NaN : I ? F : 1 / 0);
            if (
              ((r = Math.sqrt(+fA(F))),
              r == 0 || r == 1 / 0
                ? ((h = ae(I)),
                  (h.length + n) % 2 == 0 && (h += '0'),
                  (r = Math.sqrt(+h)),
                  (n = RA((n + 1) / 2) - (n < 0 || n % 2)),
                  r == 1 / 0
                    ? (h = '5e' + n)
                    : ((h = r.toExponential()),
                      (h = h.slice(0, h.indexOf('e') + 1) + n)),
                  (D = new C(h)))
                : (D = new C(r + '')),
              D.c[0])
            ) {
              for (n = D.e, r = n + a, r < 3 && (r = 0); ; )
                if (
                  ((N = D),
                  (D = f.times(N.plus(cA(F, N, a, 1)))),
                  ae(N.c).slice(0, r) === (h = ae(D.c)).slice(0, r))
                )
                  if (
                    (D.e < n && --r,
                    (h = h.slice(r - 3, r + 1)),
                    h == '9999' || (!m && h == '4999'))
                  ) {
                    if (!m && (IA(N, N.e + GA + 2, 0), N.times(N).eq(F))) {
                      D = N;
                      break;
                    }
                    (a += 4), (r += 4), (m = 1);
                  } else {
                    (!+h || (!+h.slice(1) && h.charAt(0) == '5')) &&
                      (IA(D, D.e + GA + 2, 1), (c = !D.times(D).eq(F)));
                    break;
                  }
            }
            return IA(D, D.e + GA + 1, MA, c);
          }),
        (z.toExponential = function (c, h) {
          return c != null && (kA(c, 0, AA), c++), uA(this, c, h, 1);
        }),
        (z.toFixed = function (c, h) {
          return (
            c != null && (kA(c, 0, AA), (c = c + this.e + 1)), uA(this, c, h)
          );
        }),
        (z.toFormat = function (c, h, D) {
          var m,
            N = this;
          if (D == null)
            c != null && h && typeof h == 'object'
              ? ((D = h), (h = null))
              : c && typeof c == 'object'
              ? ((D = c), (c = h = null))
              : (D = wA);
          else if (typeof D != 'object')
            throw Error(y + 'Argument not an object: ' + D);
          if (((m = N.toFixed(c, h)), N.c)) {
            var F,
              I = m.split('.'),
              r = +D.groupSize,
              n = +D.secondaryGroupSize,
              a = D.groupSeparator || '',
              f = I[0],
              x = I[1],
              R = N.s < 0,
              K = R ? f.slice(1) : f,
              iA = K.length;
            if (
              (n && ((F = r), (r = n), (n = F), (iA -= F)), r > 0 && iA > 0)
            ) {
              for (F = iA % r || r, f = K.substr(0, F); F < iA; F += r)
                f += a + K.substr(F, r);
              n > 0 && (f += a + K.slice(F)), R && (f = '-' + f);
            }
            m = x
              ? f +
                (D.decimalSeparator || '') +
                ((n = +D.fractionGroupSize)
                  ? x.replace(
                      new RegExp('\\d{' + n + '}\\B', 'g'),
                      '$&' + (D.fractionGroupSeparator || ''),
                    )
                  : x)
              : f;
          }
          return (D.prefix || '') + m + (D.suffix || '');
        }),
        (z.toFraction = function (c) {
          var h,
            D,
            m,
            N,
            F,
            I,
            r,
            n,
            a,
            f,
            x,
            R,
            K = this,
            iA = K.c;
          if (
            c != null &&
            ((r = new C(c)), (!r.isInteger() && (r.c || r.s !== 1)) || r.lt(HA))
          )
            throw Error(
              y +
                'Argument ' +
                (r.isInteger() ? 'out of range: ' : 'not an integer: ') +
                fA(r),
            );
          if (!iA) return new C(K);
          for (
            h = new C(HA),
              a = D = new C(HA),
              m = n = new C(HA),
              R = ae(iA),
              F = h.e = R.length - K.e - 1,
              h.c[0] = J[(I = F % b) < 0 ? b + I : I],
              c = !c || r.comparedTo(h) > 0 ? (F > 0 ? h : a) : r,
              I = ie,
              ie = 1 / 0,
              r = new C(R),
              n.c[0] = 0;
            (f = cA(r, h, 0, 1)),
              (N = D.plus(f.times(m))),
              N.comparedTo(c) != 1;

          )
            (D = m),
              (m = N),
              (a = n.plus(f.times((N = a)))),
              (n = N),
              (h = r.minus(f.times((N = h)))),
              (r = N);
          return (
            (N = cA(c.minus(D), m, 0, 1)),
            (n = n.plus(N.times(a))),
            (D = D.plus(N.times(m))),
            (n.s = a.s = K.s),
            (F = F * 2),
            (x =
              cA(a, m, F, MA)
                .minus(K)
                .abs()
                .comparedTo(cA(n, D, F, MA).minus(K).abs()) < 1
                ? [a, m]
                : [n, D]),
            (ie = I),
            x
          );
        }),
        (z.toNumber = function () {
          return +fA(this);
        }),
        (z.toPrecision = function (c, h) {
          return c != null && kA(c, 1, AA), uA(this, c, h, 2);
        }),
        (z.toString = function (c) {
          var h,
            D = this,
            m = D.s,
            N = D.e;
          return (
            N === null
              ? m
                ? ((h = 'Infinity'), m < 0 && (h = '-' + h))
                : (h = 'NaN')
              : (c == null
                  ? (h =
                      N <= ee || N >= $A ? oe(ae(D.c), N) : zA(ae(D.c), N, '0'))
                  : c === 10 && yA
                  ? ((D = IA(new C(D), GA + N + 1, MA)),
                    (h = zA(ae(D.c), D.e, '0')))
                  : (kA(c, 2, qA.length, 'Base'),
                    (h = YA(zA(ae(D.c), N, '0'), 10, c, m, !0))),
                m < 0 && D.c[0] && (h = '-' + h)),
            h
          );
        }),
        (z.valueOf = z.toJSON =
          function () {
            return fA(this);
          }),
        (z._isBigNumber = !0),
        oA != null && C.set(oA),
        C
      );
    }
    function RA(oA) {
      var cA = oA | 0;
      return oA > 0 || oA === cA ? cA : cA - 1;
    }
    function ae(oA) {
      for (var cA, YA, PA = 1, z = oA.length, HA = oA[0] + ''; PA < z; ) {
        for (cA = oA[PA++] + '', YA = b - cA.length; YA--; cA = '0' + cA);
        HA += cA;
      }
      for (z = HA.length; HA.charCodeAt(--z) === 48; );
      return HA.slice(0, z + 1 || 1);
    }
    function Ee(oA, cA) {
      var YA,
        PA,
        z = oA.c,
        HA = cA.c,
        GA = oA.s,
        MA = cA.s,
        ee = oA.e,
        $A = cA.e;
      if (!GA || !MA) return null;
      if (((YA = z && !z[0]), (PA = HA && !HA[0]), YA || PA))
        return YA ? (PA ? 0 : -MA) : GA;
      if (GA != MA) return GA;
      if (((YA = GA < 0), (PA = ee == $A), !z || !HA))
        return PA ? 0 : !z ^ YA ? 1 : -1;
      if (!PA) return (ee > $A) ^ YA ? 1 : -1;
      for (
        MA = (ee = z.length) < ($A = HA.length) ? ee : $A, GA = 0;
        GA < MA;
        GA++
      )
        if (z[GA] != HA[GA]) return (z[GA] > HA[GA]) ^ YA ? 1 : -1;
      return ee == $A ? 0 : (ee > $A) ^ YA ? 1 : -1;
    }
    function kA(oA, cA, YA, PA) {
      if (oA < cA || oA > YA || oA !== l(oA))
        throw Error(
          y +
            (PA || 'Argument') +
            (typeof oA == 'number'
              ? oA < cA || oA > YA
                ? ' out of range: '
                : ' not an integer: '
              : ' not a primitive number: ') +
            String(oA),
        );
    }
    function XA(oA) {
      var cA = oA.c.length - 1;
      return RA(oA.e / b) == cA && oA.c[cA] % 2 != 0;
    }
    function oe(oA, cA) {
      return (
        (oA.length > 1 ? oA.charAt(0) + '.' + oA.slice(1) : oA) +
        (cA < 0 ? 'e' : 'e+') +
        cA
      );
    }
    function zA(oA, cA, YA) {
      var PA, z;
      if (cA < 0) {
        for (z = YA + '.'; ++cA; z += YA);
        oA = z + oA;
      } else if (((PA = oA.length), ++cA > PA)) {
        for (z = YA, cA -= PA; --cA; z += YA);
        oA += z;
      } else cA < PA && (oA = oA.slice(0, cA) + '.' + oA.slice(cA));
      return oA;
    }
    (e = vA()),
      (e.default = e.BigNumber = e),
      t.exports
        ? (t.exports = e)
        : (A || (A = typeof self < 'u' && self ? self : window),
          (A.BigNumber = e));
  })(Et);
})(mi);
var Ht = mi.exports,
  tg = function (A, e, g) {
    var s = new A.Uint8Array(g),
      l = e.pushInt,
      y = e.pushInt32,
      u = e.pushInt32Neg,
      M = e.pushInt64,
      b = e.pushInt64Neg,
      $ = e.pushFloat,
      J = e.pushFloatSingle,
      nA = e.pushFloatDouble,
      AA = e.pushTrue,
      vA = e.pushFalse,
      RA = e.pushUndefined,
      ae = e.pushNull,
      Ee = e.pushInfinity,
      kA = e.pushInfinityNeg,
      XA = e.pushNaN,
      oe = e.pushNaNNeg,
      zA = e.pushArrayStart,
      oA = e.pushArrayStartFixed,
      cA = e.pushArrayStartFixed32,
      YA = e.pushArrayStartFixed64,
      PA = e.pushObjectStart,
      z = e.pushObjectStartFixed,
      HA = e.pushObjectStartFixed32,
      GA = e.pushObjectStartFixed64,
      MA = e.pushByteString,
      ee = e.pushByteStringStart,
      $A = e.pushUtf8String,
      re = e.pushUtf8StringStart,
      ie = e.pushSimpleUnassigned,
      JA = e.pushTagStart,
      bA = e.pushTagStart4,
      Ce = e.pushTagStart8,
      wA = e.pushTagUnassigned,
      qA = e.pushBreak,
      yA = A.Math.pow,
      C = 0,
      uA = 0,
      te = 0;
    function Fe(w) {
      for (
        w = w | 0, C = 0, uA = w;
        (C | 0) < (uA | 0) &&
        ((te = EA[s[C] & 255](s[C] | 0) | 0), !((te | 0) > 0));

      );
      return te | 0;
    }
    function IA(w) {
      return (w = w | 0), (((C | 0) + (w | 0)) | 0) < (uA | 0) ? 0 : 1;
    }
    function fA(w) {
      return (w = w | 0), (s[w | 0] << 8) | s[(w + 1) | 0] | 0;
    }
    function c(w) {
      return (
        (w = w | 0),
        (s[w | 0] << 24) |
          (s[(w + 1) | 0] << 16) |
          (s[(w + 2) | 0] << 8) |
          s[(w + 3) | 0] |
          0
      );
    }
    function h(w) {
      return (w = w | 0), l(w | 0), (C = (C + 1) | 0), 0;
    }
    function D(w) {
      return (
        (w = w | 0),
        IA(1) | 0 ? 1 : (l(s[(C + 1) | 0] | 0), (C = (C + 2) | 0), 0)
      );
    }
    function m(w) {
      return (
        (w = w | 0),
        IA(2) | 0 ? 1 : (l(fA((C + 1) | 0) | 0), (C = (C + 3) | 0), 0)
      );
    }
    function N(w) {
      return (
        (w = w | 0),
        IA(4) | 0
          ? 1
          : (y(fA((C + 1) | 0) | 0, fA((C + 3) | 0) | 0), (C = (C + 5) | 0), 0)
      );
    }
    function F(w) {
      return (
        (w = w | 0),
        IA(8) | 0
          ? 1
          : (M(
              fA((C + 1) | 0) | 0,
              fA((C + 3) | 0) | 0,
              fA((C + 5) | 0) | 0,
              fA((C + 7) | 0) | 0,
            ),
            (C = (C + 9) | 0),
            0)
      );
    }
    function I(w) {
      return (w = w | 0), l((-1 - ((w - 32) | 0)) | 0), (C = (C + 1) | 0), 0;
    }
    function r(w) {
      return (
        (w = w | 0),
        IA(1) | 0
          ? 1
          : (l((-1 - (s[(C + 1) | 0] | 0)) | 0), (C = (C + 2) | 0), 0)
      );
    }
    function n(w) {
      w = w | 0;
      var X = 0;
      return IA(2) | 0
        ? 1
        : ((X = fA((C + 1) | 0) | 0),
          l((-1 - (X | 0)) | 0),
          (C = (C + 3) | 0),
          0);
    }
    function a(w) {
      return (
        (w = w | 0),
        IA(4) | 0
          ? 1
          : (u(fA((C + 1) | 0) | 0, fA((C + 3) | 0) | 0), (C = (C + 5) | 0), 0)
      );
    }
    function f(w) {
      return (
        (w = w | 0),
        IA(8) | 0
          ? 1
          : (b(
              fA((C + 1) | 0) | 0,
              fA((C + 3) | 0) | 0,
              fA((C + 5) | 0) | 0,
              fA((C + 7) | 0) | 0,
            ),
            (C = (C + 9) | 0),
            0)
      );
    }
    function x(w) {
      w = w | 0;
      var X = 0,
        P = 0,
        q = 0;
      return (
        (q = (w - 64) | 0),
        IA(q | 0) | 0
          ? 1
          : ((X = (C + 1) | 0),
            (P = (((C + 1) | 0) + (q | 0)) | 0),
            MA(X | 0, P | 0),
            (C = P | 0),
            0)
      );
    }
    function R(w) {
      w = w | 0;
      var X = 0,
        P = 0,
        q = 0;
      return IA(1) | 0 ||
        ((q = s[(C + 1) | 0] | 0),
        (X = (C + 2) | 0),
        (P = (((C + 2) | 0) + (q | 0)) | 0),
        IA((q + 1) | 0) | 0)
        ? 1
        : (MA(X | 0, P | 0), (C = P | 0), 0);
    }
    function K(w) {
      w = w | 0;
      var X = 0,
        P = 0,
        q = 0;
      return IA(2) | 0 ||
        ((q = fA((C + 1) | 0) | 0),
        (X = (C + 3) | 0),
        (P = (((C + 3) | 0) + (q | 0)) | 0),
        IA((q + 2) | 0) | 0)
        ? 1
        : (MA(X | 0, P | 0), (C = P | 0), 0);
    }
    function iA(w) {
      w = w | 0;
      var X = 0,
        P = 0,
        q = 0;
      return IA(4) | 0 ||
        ((q = c((C + 1) | 0) | 0),
        (X = (C + 5) | 0),
        (P = (((C + 5) | 0) + (q | 0)) | 0),
        IA((q + 4) | 0) | 0)
        ? 1
        : (MA(X | 0, P | 0), (C = P | 0), 0);
    }
    function QA(w) {
      return (w = w | 0), 1;
    }
    function lA(w) {
      return (w = w | 0), ee(), (C = (C + 1) | 0), 0;
    }
    function V(w) {
      w = w | 0;
      var X = 0,
        P = 0,
        q = 0;
      return (
        (q = (w - 96) | 0),
        IA(q | 0) | 0
          ? 1
          : ((X = (C + 1) | 0),
            (P = (((C + 1) | 0) + (q | 0)) | 0),
            $A(X | 0, P | 0),
            (C = P | 0),
            0)
      );
    }
    function xA(w) {
      w = w | 0;
      var X = 0,
        P = 0,
        q = 0;
      return IA(1) | 0 ||
        ((q = s[(C + 1) | 0] | 0),
        (X = (C + 2) | 0),
        (P = (((C + 2) | 0) + (q | 0)) | 0),
        IA((q + 1) | 0) | 0)
        ? 1
        : ($A(X | 0, P | 0), (C = P | 0), 0);
    }
    function WA(w) {
      w = w | 0;
      var X = 0,
        P = 0,
        q = 0;
      return IA(2) | 0 ||
        ((q = fA((C + 1) | 0) | 0),
        (X = (C + 3) | 0),
        (P = (((C + 3) | 0) + (q | 0)) | 0),
        IA((q + 2) | 0) | 0)
        ? 1
        : ($A(X | 0, P | 0), (C = P | 0), 0);
    }
    function we(w) {
      w = w | 0;
      var X = 0,
        P = 0,
        q = 0;
      return IA(4) | 0 ||
        ((q = c((C + 1) | 0) | 0),
        (X = (C + 5) | 0),
        (P = (((C + 5) | 0) + (q | 0)) | 0),
        IA((q + 4) | 0) | 0)
        ? 1
        : ($A(X | 0, P | 0), (C = P | 0), 0);
    }
    function fe(w) {
      return (w = w | 0), 1;
    }
    function pe(w) {
      return (w = w | 0), re(), (C = (C + 1) | 0), 0;
    }
    function pA(w) {
      return (w = w | 0), oA((w - 128) | 0), (C = (C + 1) | 0), 0;
    }
    function he(w) {
      return (
        (w = w | 0),
        IA(1) | 0 ? 1 : (oA(s[(C + 1) | 0] | 0), (C = (C + 2) | 0), 0)
      );
    }
    function ne(w) {
      return (
        (w = w | 0),
        IA(2) | 0 ? 1 : (oA(fA((C + 1) | 0) | 0), (C = (C + 3) | 0), 0)
      );
    }
    function OA(w) {
      return (
        (w = w | 0),
        IA(4) | 0
          ? 1
          : (cA(fA((C + 1) | 0) | 0, fA((C + 3) | 0) | 0), (C = (C + 5) | 0), 0)
      );
    }
    function KA(w) {
      return (
        (w = w | 0),
        IA(8) | 0
          ? 1
          : (YA(
              fA((C + 1) | 0) | 0,
              fA((C + 3) | 0) | 0,
              fA((C + 5) | 0) | 0,
              fA((C + 7) | 0) | 0,
            ),
            (C = (C + 9) | 0),
            0)
      );
    }
    function Je(w) {
      return (w = w | 0), zA(), (C = (C + 1) | 0), 0;
    }
    function hA(w) {
      w = w | 0;
      var X = 0;
      return (
        (X = (w - 160) | 0),
        IA(X | 0) | 0 ? 1 : (z(X | 0), (C = (C + 1) | 0), 0)
      );
    }
    function be(w) {
      return (
        (w = w | 0),
        IA(1) | 0 ? 1 : (z(s[(C + 1) | 0] | 0), (C = (C + 2) | 0), 0)
      );
    }
    function rt(w) {
      return (
        (w = w | 0),
        IA(2) | 0 ? 1 : (z(fA((C + 1) | 0) | 0), (C = (C + 3) | 0), 0)
      );
    }
    function it(w) {
      return (
        (w = w | 0),
        IA(4) | 0
          ? 1
          : (HA(fA((C + 1) | 0) | 0, fA((C + 3) | 0) | 0), (C = (C + 5) | 0), 0)
      );
    }
    function At(w) {
      return (
        (w = w | 0),
        IA(8) | 0
          ? 1
          : (GA(
              fA((C + 1) | 0) | 0,
              fA((C + 3) | 0) | 0,
              fA((C + 5) | 0) | 0,
              fA((C + 7) | 0) | 0,
            ),
            (C = (C + 9) | 0),
            0)
      );
    }
    function me(w) {
      return (w = w | 0), PA(), (C = (C + 1) | 0), 0;
    }
    function le(w) {
      return (w = w | 0), JA((w - 192) | 0 | 0), (C = (C + 1) | 0), 0;
    }
    function qe(w) {
      return (w = w | 0), JA(w | 0), (C = (C + 1) | 0), 0;
    }
    function Oe(w) {
      return (w = w | 0), JA(w | 0), (C = (C + 1) | 0), 0;
    }
    function We(w) {
      return (w = w | 0), JA(w | 0), (C = (C + 1) | 0), 0;
    }
    function Qt(w) {
      return (w = w | 0), JA(w | 0), (C = (C + 1) | 0), 0;
    }
    function ZA(w) {
      return (w = w | 0), JA((w - 192) | 0 | 0), (C = (C + 1) | 0), 0;
    }
    function ue(w) {
      return (w = w | 0), JA(w | 0), (C = (C + 1) | 0), 0;
    }
    function nt(w) {
      return (w = w | 0), JA(w | 0), (C = (C + 1) | 0), 0;
    }
    function B(w) {
      return (w = w | 0), JA(w | 0), (C = (C + 1) | 0), 0;
    }
    function o(w) {
      return (
        (w = w | 0),
        IA(1) | 0 ? 1 : (JA(s[(C + 1) | 0] | 0), (C = (C + 2) | 0), 0)
      );
    }
    function E(w) {
      return (
        (w = w | 0),
        IA(2) | 0 ? 1 : (JA(fA((C + 1) | 0) | 0), (C = (C + 3) | 0), 0)
      );
    }
    function i(w) {
      return (
        (w = w | 0),
        IA(4) | 0
          ? 1
          : (bA(fA((C + 1) | 0) | 0, fA((C + 3) | 0) | 0), (C = (C + 5) | 0), 0)
      );
    }
    function Q(w) {
      return (
        (w = w | 0),
        IA(8) | 0
          ? 1
          : (Ce(
              fA((C + 1) | 0) | 0,
              fA((C + 3) | 0) | 0,
              fA((C + 5) | 0) | 0,
              fA((C + 7) | 0) | 0,
            ),
            (C = (C + 9) | 0),
            0)
      );
    }
    function S(w) {
      return (w = w | 0), ie(((w | 0) - 224) | 0), (C = (C + 1) | 0), 0;
    }
    function G(w) {
      return (w = w | 0), vA(), (C = (C + 1) | 0), 0;
    }
    function v(w) {
      return (w = w | 0), AA(), (C = (C + 1) | 0), 0;
    }
    function j(w) {
      return (w = w | 0), ae(), (C = (C + 1) | 0), 0;
    }
    function T(w) {
      return (w = w | 0), RA(), (C = (C + 1) | 0), 0;
    }
    function p(w) {
      return (
        (w = w | 0),
        IA(1) | 0 ? 1 : (ie(s[(C + 1) | 0] | 0), (C = (C + 2) | 0), 0)
      );
    }
    function L(w) {
      w = w | 0;
      var X = 0,
        P = 0,
        q = 1,
        gA = 0,
        tA = 0,
        BA = 0;
      return IA(2) | 0
        ? 1
        : ((X = s[(C + 1) | 0] | 0),
          (P = s[(C + 2) | 0] | 0),
          (X | 0) & 128 && (q = -1),
          (gA = +(((X | 0) & 124) >> 2)),
          (tA = +((((X | 0) & 3) << 8) | P)),
          +gA == 0
            ? $(+(+q * 5960464477539063e-23 * +tA))
            : +gA == 31
            ? +q == 1
              ? +tA > 0
                ? XA()
                : Ee()
              : +tA > 0
              ? oe()
              : kA()
            : $(+(+q * yA(2, +(+gA - 25)) * +(1024 + tA))),
          (C = (C + 3) | 0),
          0);
    }
    function k(w) {
      return (
        (w = w | 0),
        IA(4) | 0
          ? 1
          : (J(
              s[(C + 1) | 0] | 0,
              s[(C + 2) | 0] | 0,
              s[(C + 3) | 0] | 0,
              s[(C + 4) | 0] | 0,
            ),
            (C = (C + 5) | 0),
            0)
      );
    }
    function eA(w) {
      return (
        (w = w | 0),
        IA(8) | 0
          ? 1
          : (nA(
              s[(C + 1) | 0] | 0,
              s[(C + 2) | 0] | 0,
              s[(C + 3) | 0] | 0,
              s[(C + 4) | 0] | 0,
              s[(C + 5) | 0] | 0,
              s[(C + 6) | 0] | 0,
              s[(C + 7) | 0] | 0,
              s[(C + 8) | 0] | 0,
            ),
            (C = (C + 9) | 0),
            0)
      );
    }
    function Z(w) {
      return (w = w | 0), 1;
    }
    function sA(w) {
      return (w = w | 0), qA(), (C = (C + 1) | 0), 0;
    }
    var EA = [
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      h,
      D,
      m,
      N,
      F,
      Z,
      Z,
      Z,
      Z,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      I,
      r,
      n,
      a,
      f,
      Z,
      Z,
      Z,
      Z,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      x,
      R,
      K,
      iA,
      QA,
      Z,
      Z,
      Z,
      lA,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      V,
      xA,
      WA,
      we,
      fe,
      Z,
      Z,
      Z,
      pe,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      pA,
      he,
      ne,
      OA,
      KA,
      Z,
      Z,
      Z,
      Je,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      hA,
      be,
      rt,
      it,
      At,
      Z,
      Z,
      Z,
      me,
      le,
      le,
      le,
      le,
      le,
      le,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      ZA,
      o,
      E,
      i,
      Q,
      Z,
      Z,
      Z,
      Z,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      S,
      G,
      v,
      j,
      T,
      p,
      L,
      k,
      eA,
      Z,
      Z,
      Z,
      sA,
    ];
    return { parse: Fe };
  },
  Jt = {},
  De = {};
const dr = Ht.BigNumber;
De.MT = {
  POS_INT: 0,
  NEG_INT: 1,
  BYTE_STRING: 2,
  UTF8_STRING: 3,
  ARRAY: 4,
  MAP: 5,
  TAG: 6,
  SIMPLE_FLOAT: 7,
};
De.TAG = {
  DATE_STRING: 0,
  DATE_EPOCH: 1,
  POS_BIGINT: 2,
  NEG_BIGINT: 3,
  DECIMAL_FRAC: 4,
  BIGFLOAT: 5,
  BASE64URL_EXPECTED: 21,
  BASE64_EXPECTED: 22,
  BASE16_EXPECTED: 23,
  CBOR: 24,
  URI: 32,
  BASE64URL: 33,
  BASE64: 34,
  REGEXP: 35,
  MIME: 36,
};
De.NUMBYTES = {
  ZERO: 0,
  ONE: 24,
  TWO: 25,
  FOUR: 26,
  EIGHT: 27,
  INDEFINITE: 31,
};
De.SIMPLE = { FALSE: 20, TRUE: 21, NULL: 22, UNDEFINED: 23 };
De.SYMS = {
  NULL: Symbol('null'),
  UNDEFINED: Symbol('undef'),
  PARENT: Symbol('parent'),
  BREAK: Symbol('break'),
  STREAM: Symbol('stream'),
};
De.SHIFT32 = Math.pow(2, 32);
De.SHIFT16 = Math.pow(2, 16);
De.MAX_SAFE_HIGH = 2097151;
De.NEG_ONE = new dr(-1);
De.TEN = new dr(10);
De.TWO = new dr(2);
De.PARENT = {
  ARRAY: 0,
  OBJECT: 1,
  MAP: 2,
  TAG: 3,
  BYTE_STRING: 4,
  UTF8_STRING: 5,
};
(function (t) {
  const { Buffer: A } = wt,
    e = Ht.BigNumber,
    g = De,
    s = g.SHIFT32,
    l = g.SHIFT16,
    y = 2097151;
  t.parseHalf = function (b) {
    var $, J, nA;
    return (
      (nA = b[0] & 128 ? -1 : 1),
      ($ = (b[0] & 124) >> 2),
      (J = ((b[0] & 3) << 8) | b[1]),
      $
        ? $ === 31
          ? nA * (J ? 0 / 0 : 1 / 0)
          : nA * Math.pow(2, $ - 25) * (1024 + J)
        : nA * 5960464477539063e-23 * J
    );
  };
  function u(M) {
    return M < 16 ? '0' + M.toString(16) : M.toString(16);
  }
  (t.arrayBufferToBignumber = function (M) {
    const b = M.byteLength;
    let $ = '';
    for (let J = 0; J < b; J++) $ += u(M[J]);
    return new e($, 16);
  }),
    (t.buildMap = (M) => {
      const b = new Map(),
        $ = Object.keys(M),
        J = $.length;
      for (let nA = 0; nA < J; nA++) b.set($[nA], M[$[nA]]);
      return b;
    }),
    (t.buildInt32 = (M, b) => M * l + b),
    (t.buildInt64 = (M, b, $, J) => {
      const nA = t.buildInt32(M, b),
        AA = t.buildInt32($, J);
      return nA > y ? new e(nA).times(s).plus(AA) : nA * s + AA;
    }),
    (t.writeHalf = function (b, $) {
      const J = A.allocUnsafe(4);
      J.writeFloatBE($, 0);
      const nA = J.readUInt32BE(0);
      if (nA & 8191) return !1;
      var AA = (nA >> 16) & 32768;
      const vA = (nA >> 23) & 255,
        RA = nA & 8388607;
      if (vA >= 113 && vA <= 142) AA += ((vA - 112) << 10) + (RA >> 13);
      else if (vA >= 103 && vA < 113) {
        if (RA & ((1 << (126 - vA)) - 1)) return !1;
        AA += (RA + 8388608) >> (126 - vA);
      } else return !1;
      return b.writeUInt16BE(AA, 0), !0;
    }),
    (t.keySorter = function (M, b) {
      var $ = M[0].byteLength,
        J = b[0].byteLength;
      return $ > J ? 1 : J > $ ? -1 : M[0].compare(b[0]);
    }),
    (t.isNegativeZero = (M) => M === 0 && 1 / M < 0),
    (t.nextPowerOf2 = (M) => {
      let b = 0;
      if (M && !(M & (M - 1))) return M;
      for (; M !== 0; ) (M >>= 1), (b += 1);
      return 1 << b;
    });
})(Jt);
const Dr = De,
  rg = Dr.MT,
  dt = Dr.SIMPLE,
  Pt = Dr.SYMS;
let ig = class Ir {
  constructor(A) {
    if (typeof A != 'number')
      throw new Error('Invalid Simple type: ' + typeof A);
    if (A < 0 || A > 255 || (A | 0) !== A)
      throw new Error('value must be a small positive integer: ' + A);
    this.value = A;
  }
  toString() {
    return 'simple(' + this.value + ')';
  }
  inspect() {
    return 'simple(' + this.value + ')';
  }
  encodeCBOR(A) {
    return A._pushInt(this.value, rg.SIMPLE_FLOAT);
  }
  static isSimple(A) {
    return A instanceof Ir;
  }
  static decode(A, e) {
    switch ((e == null && (e = !0), A)) {
      case dt.FALSE:
        return !1;
      case dt.TRUE:
        return !0;
      case dt.NULL:
        return e ? null : Pt.NULL;
      case dt.UNDEFINED:
        return e ? void 0 : Pt.UNDEFINED;
      case -1:
        if (!e) throw new Error('Invalid BREAK');
        return Pt.BREAK;
      default:
        return new Ir(A);
    }
  }
};
var Gi = ig;
let ng = class ar {
  constructor(A, e, g) {
    if (
      ((this.tag = A),
      (this.value = e),
      (this.err = g),
      typeof this.tag != 'number')
    )
      throw new Error('Invalid tag type (' + typeof this.tag + ')');
    if (this.tag < 0 || (this.tag | 0) !== this.tag)
      throw new Error('Tag must be a positive integer: ' + this.tag);
  }
  toString() {
    return `${this.tag}(${JSON.stringify(this.value)})`;
  }
  encodeCBOR(A) {
    return A._pushTag(this.tag), A.pushAny(this.value);
  }
  convert(A) {
    var e, g;
    if (
      ((g = A?.[this.tag]),
      typeof g != 'function' &&
        ((g = ar['_tag' + this.tag]), typeof g != 'function'))
    )
      return this;
    try {
      return g.call(ar, this.value);
    } catch (s) {
      return (e = s), (this.err = e), this;
    }
  }
};
var Mi = ng;
const bi = self.location
    ? self.location.protocol + '//' + self.location.host
    : '',
  sr = self.URL;
let gg = class {
  constructor(A = '', e = bi) {
    (this.super = new sr(A, e)),
      (this.path = this.pathname + this.search),
      (this.auth =
        this.username && this.password
          ? this.username + ':' + this.password
          : null),
      (this.query =
        this.search && this.search.startsWith('?')
          ? this.search.slice(1)
          : null);
  }
  get hash() {
    return this.super.hash;
  }
  get host() {
    return this.super.host;
  }
  get hostname() {
    return this.super.hostname;
  }
  get href() {
    return this.super.href;
  }
  get origin() {
    return this.super.origin;
  }
  get password() {
    return this.super.password;
  }
  get pathname() {
    return this.super.pathname;
  }
  get port() {
    return this.super.port;
  }
  get protocol() {
    return this.super.protocol;
  }
  get search() {
    return this.super.search;
  }
  get searchParams() {
    return this.super.searchParams;
  }
  get username() {
    return this.super.username;
  }
  set hash(A) {
    this.super.hash = A;
  }
  set host(A) {
    this.super.host = A;
  }
  set hostname(A) {
    this.super.hostname = A;
  }
  set href(A) {
    this.super.href = A;
  }
  set origin(A) {
    this.super.origin = A;
  }
  set password(A) {
    this.super.password = A;
  }
  set pathname(A) {
    this.super.pathname = A;
  }
  set port(A) {
    this.super.port = A;
  }
  set protocol(A) {
    this.super.protocol = A;
  }
  set search(A) {
    this.super.search = A;
  }
  set searchParams(A) {
    this.super.searchParams = A;
  }
  set username(A) {
    this.super.username = A;
  }
  createObjectURL(A) {
    return this.super.createObjectURL(A);
  }
  revokeObjectURL(A) {
    this.super.revokeObjectURL(A);
  }
  toJSON() {
    return this.super.toJSON();
  }
  toString() {
    return this.super.toString();
  }
  format() {
    return this.toString();
  }
};
function Bg(t) {
  if (typeof t == 'string') return new sr(t).toString();
  if (!(t instanceof sr)) {
    const A = t.username && t.password ? `${t.username}:${t.password}@` : '',
      e = t.auth ? t.auth + '@' : '',
      g = t.port ? ':' + t.port : '',
      s = t.protocol ? t.protocol + '//' : '',
      l = t.host || '',
      y = t.hostname || '',
      u = t.search || (t.query ? '?' + t.query : ''),
      M = t.hash || '',
      b = t.pathname || '',
      $ = t.path || b + u;
    return `${s}${A || e}${l || y + g}${$}${M}`;
  }
}
var Ri = {
  URLWithLegacySupport: gg,
  URLSearchParams: self.URLSearchParams,
  defaultBase: bi,
  format: Bg,
};
const { URLWithLegacySupport: Jr, format: Ig } = Ri;
var ag = (t, A = {}, e = {}, g) => {
  let s = A.protocol ? A.protocol.replace(':', '') : 'http';
  s = (e[s] || g || s) + ':';
  let l;
  try {
    l = new Jr(t);
  } catch {
    l = {};
  }
  const y = Object.assign({}, A, {
    protocol: s || l.protocol,
    host: A.host || l.host,
  });
  return new Jr(t, Ig(y)).toString();
};
const {
    URLWithLegacySupport: sg,
    format: Eg,
    URLSearchParams: og,
    defaultBase: fg,
  } = Ri,
  Qg = ag;
var Ui = {
  URL: sg,
  URLSearchParams: og,
  format: Eg,
  relative: Qg,
  defaultBase: fg,
};
const { Buffer: Bt } = wt,
  qr = Lt,
  cg = Ht.BigNumber,
  Cg = tg,
  Se = Jt,
  VA = De,
  ug = Gi,
  hg = Mi,
  { URL: lg } = Ui;
let Er = class or {
  constructor(A) {
    (A = A || {}),
      !A.size || A.size < 65536
        ? (A.size = 65536)
        : (A.size = Se.nextPowerOf2(A.size)),
      (this._heap = new ArrayBuffer(A.size)),
      (this._heap8 = new Uint8Array(this._heap)),
      (this._buffer = Bt.from(this._heap)),
      this._reset(),
      (this._knownTags = Object.assign(
        {
          0: (e) => new Date(e),
          1: (e) => new Date(e * 1e3),
          2: (e) => Se.arrayBufferToBignumber(e),
          3: (e) => VA.NEG_ONE.minus(Se.arrayBufferToBignumber(e)),
          4: (e) => VA.TEN.pow(e[0]).times(e[1]),
          5: (e) => VA.TWO.pow(e[0]).times(e[1]),
          32: (e) => new lg(e),
          35: (e) => new RegExp(e),
        },
        A.tags,
      )),
      (this.parser = Cg(
        Et,
        {
          log: console.log.bind(console),
          pushInt: this.pushInt.bind(this),
          pushInt32: this.pushInt32.bind(this),
          pushInt32Neg: this.pushInt32Neg.bind(this),
          pushInt64: this.pushInt64.bind(this),
          pushInt64Neg: this.pushInt64Neg.bind(this),
          pushFloat: this.pushFloat.bind(this),
          pushFloatSingle: this.pushFloatSingle.bind(this),
          pushFloatDouble: this.pushFloatDouble.bind(this),
          pushTrue: this.pushTrue.bind(this),
          pushFalse: this.pushFalse.bind(this),
          pushUndefined: this.pushUndefined.bind(this),
          pushNull: this.pushNull.bind(this),
          pushInfinity: this.pushInfinity.bind(this),
          pushInfinityNeg: this.pushInfinityNeg.bind(this),
          pushNaN: this.pushNaN.bind(this),
          pushNaNNeg: this.pushNaNNeg.bind(this),
          pushArrayStart: this.pushArrayStart.bind(this),
          pushArrayStartFixed: this.pushArrayStartFixed.bind(this),
          pushArrayStartFixed32: this.pushArrayStartFixed32.bind(this),
          pushArrayStartFixed64: this.pushArrayStartFixed64.bind(this),
          pushObjectStart: this.pushObjectStart.bind(this),
          pushObjectStartFixed: this.pushObjectStartFixed.bind(this),
          pushObjectStartFixed32: this.pushObjectStartFixed32.bind(this),
          pushObjectStartFixed64: this.pushObjectStartFixed64.bind(this),
          pushByteString: this.pushByteString.bind(this),
          pushByteStringStart: this.pushByteStringStart.bind(this),
          pushUtf8String: this.pushUtf8String.bind(this),
          pushUtf8StringStart: this.pushUtf8StringStart.bind(this),
          pushSimpleUnassigned: this.pushSimpleUnassigned.bind(this),
          pushTagUnassigned: this.pushTagUnassigned.bind(this),
          pushTagStart: this.pushTagStart.bind(this),
          pushTagStart4: this.pushTagStart4.bind(this),
          pushTagStart8: this.pushTagStart8.bind(this),
          pushBreak: this.pushBreak.bind(this),
        },
        this._heap,
      ));
  }
  get _depth() {
    return this._parents.length;
  }
  get _currentParent() {
    return this._parents[this._depth - 1];
  }
  get _ref() {
    return this._currentParent.ref;
  }
  _closeParent() {
    var A = this._parents.pop();
    if (A.length > 0) throw new Error(`Missing ${A.length} elements`);
    switch (A.type) {
      case VA.PARENT.TAG:
        this._push(this.createTag(A.ref[0], A.ref[1]));
        break;
      case VA.PARENT.BYTE_STRING:
        this._push(this.createByteString(A.ref, A.length));
        break;
      case VA.PARENT.UTF8_STRING:
        this._push(this.createUtf8String(A.ref, A.length));
        break;
      case VA.PARENT.MAP:
        if (A.values % 2 > 0)
          throw new Error('Odd number of elements in the map');
        this._push(this.createMap(A.ref, A.length));
        break;
      case VA.PARENT.OBJECT:
        if (A.values % 2 > 0)
          throw new Error('Odd number of elements in the map');
        this._push(this.createObject(A.ref, A.length));
        break;
      case VA.PARENT.ARRAY:
        this._push(this.createArray(A.ref, A.length));
        break;
    }
    this._currentParent &&
      this._currentParent.type === VA.PARENT.TAG &&
      this._dec();
  }
  _dec() {
    const A = this._currentParent;
    A.length < 0 || (A.length--, A.length === 0 && this._closeParent());
  }
  _push(A, e) {
    const g = this._currentParent;
    switch ((g.values++, g.type)) {
      case VA.PARENT.ARRAY:
      case VA.PARENT.BYTE_STRING:
      case VA.PARENT.UTF8_STRING:
        g.length > -1
          ? (this._ref[this._ref.length - g.length] = A)
          : this._ref.push(A),
          this._dec();
        break;
      case VA.PARENT.OBJECT:
        g.tmpKey != null
          ? ((this._ref[g.tmpKey] = A), (g.tmpKey = null), this._dec())
          : ((g.tmpKey = A),
            typeof g.tmpKey != 'string' &&
              ((g.type = VA.PARENT.MAP), (g.ref = Se.buildMap(g.ref))));
        break;
      case VA.PARENT.MAP:
        g.tmpKey != null
          ? (this._ref.set(g.tmpKey, A), (g.tmpKey = null), this._dec())
          : (g.tmpKey = A);
        break;
      case VA.PARENT.TAG:
        this._ref.push(A), e || this._dec();
        break;
      default:
        throw new Error('Unknown parent type');
    }
  }
  _createParent(A, e, g) {
    this._parents[this._depth] = {
      type: e,
      length: g,
      ref: A,
      values: 0,
      tmpKey: null,
    };
  }
  _reset() {
    (this._res = []),
      (this._parents = [
        {
          type: VA.PARENT.ARRAY,
          length: -1,
          ref: this._res,
          values: 0,
          tmpKey: null,
        },
      ]);
  }
  createTag(A, e) {
    const g = this._knownTags[A];
    return g ? g(e) : new hg(A, e);
  }
  createMap(A, e) {
    return A;
  }
  createObject(A, e) {
    return A;
  }
  createArray(A, e) {
    return A;
  }
  createByteString(A, e) {
    return Bt.concat(A);
  }
  createByteStringFromHeap(A, e) {
    return A === e ? Bt.alloc(0) : Bt.from(this._heap.slice(A, e));
  }
  createInt(A) {
    return A;
  }
  createInt32(A, e) {
    return Se.buildInt32(A, e);
  }
  createInt64(A, e, g, s) {
    return Se.buildInt64(A, e, g, s);
  }
  createFloat(A) {
    return A;
  }
  createFloatSingle(A, e, g, s) {
    return qr.read([A, e, g, s], 0, !1, 23, 4);
  }
  createFloatDouble(A, e, g, s, l, y, u, M) {
    return qr.read([A, e, g, s, l, y, u, M], 0, !1, 52, 8);
  }
  createInt32Neg(A, e) {
    return -1 - Se.buildInt32(A, e);
  }
  createInt64Neg(A, e, g, s) {
    const l = Se.buildInt32(A, e),
      y = Se.buildInt32(g, s);
    return l > VA.MAX_SAFE_HIGH
      ? VA.NEG_ONE.minus(new cg(l).times(VA.SHIFT32).plus(y))
      : -1 - (l * VA.SHIFT32 + y);
  }
  createTrue() {
    return !0;
  }
  createFalse() {
    return !1;
  }
  createNull() {
    return null;
  }
  createUndefined() {}
  createInfinity() {
    return 1 / 0;
  }
  createInfinityNeg() {
    return -1 / 0;
  }
  createNaN() {
    return NaN;
  }
  createNaNNeg() {
    return NaN;
  }
  createUtf8String(A, e) {
    return A.join('');
  }
  createUtf8StringFromHeap(A, e) {
    return A === e ? '' : this._buffer.toString('utf8', A, e);
  }
  createSimpleUnassigned(A) {
    return new ug(A);
  }
  pushInt(A) {
    this._push(this.createInt(A));
  }
  pushInt32(A, e) {
    this._push(this.createInt32(A, e));
  }
  pushInt64(A, e, g, s) {
    this._push(this.createInt64(A, e, g, s));
  }
  pushFloat(A) {
    this._push(this.createFloat(A));
  }
  pushFloatSingle(A, e, g, s) {
    this._push(this.createFloatSingle(A, e, g, s));
  }
  pushFloatDouble(A, e, g, s, l, y, u, M) {
    this._push(this.createFloatDouble(A, e, g, s, l, y, u, M));
  }
  pushInt32Neg(A, e) {
    this._push(this.createInt32Neg(A, e));
  }
  pushInt64Neg(A, e, g, s) {
    this._push(this.createInt64Neg(A, e, g, s));
  }
  pushTrue() {
    this._push(this.createTrue());
  }
  pushFalse() {
    this._push(this.createFalse());
  }
  pushNull() {
    this._push(this.createNull());
  }
  pushUndefined() {
    this._push(this.createUndefined());
  }
  pushInfinity() {
    this._push(this.createInfinity());
  }
  pushInfinityNeg() {
    this._push(this.createInfinityNeg());
  }
  pushNaN() {
    this._push(this.createNaN());
  }
  pushNaNNeg() {
    this._push(this.createNaNNeg());
  }
  pushArrayStart() {
    this._createParent([], VA.PARENT.ARRAY, -1);
  }
  pushArrayStartFixed(A) {
    this._createArrayStartFixed(A);
  }
  pushArrayStartFixed32(A, e) {
    const g = Se.buildInt32(A, e);
    this._createArrayStartFixed(g);
  }
  pushArrayStartFixed64(A, e, g, s) {
    const l = Se.buildInt64(A, e, g, s);
    this._createArrayStartFixed(l);
  }
  pushObjectStart() {
    this._createObjectStartFixed(-1);
  }
  pushObjectStartFixed(A) {
    this._createObjectStartFixed(A);
  }
  pushObjectStartFixed32(A, e) {
    const g = Se.buildInt32(A, e);
    this._createObjectStartFixed(g);
  }
  pushObjectStartFixed64(A, e, g, s) {
    const l = Se.buildInt64(A, e, g, s);
    this._createObjectStartFixed(l);
  }
  pushByteStringStart() {
    this._parents[this._depth] = {
      type: VA.PARENT.BYTE_STRING,
      length: -1,
      ref: [],
      values: 0,
      tmpKey: null,
    };
  }
  pushByteString(A, e) {
    this._push(this.createByteStringFromHeap(A, e));
  }
  pushUtf8StringStart() {
    this._parents[this._depth] = {
      type: VA.PARENT.UTF8_STRING,
      length: -1,
      ref: [],
      values: 0,
      tmpKey: null,
    };
  }
  pushUtf8String(A, e) {
    this._push(this.createUtf8StringFromHeap(A, e));
  }
  pushSimpleUnassigned(A) {
    this._push(this.createSimpleUnassigned(A));
  }
  pushTagStart(A) {
    this._parents[this._depth] = { type: VA.PARENT.TAG, length: 1, ref: [A] };
  }
  pushTagStart4(A, e) {
    this.pushTagStart(Se.buildInt32(A, e));
  }
  pushTagStart8(A, e, g, s) {
    this.pushTagStart(Se.buildInt64(A, e, g, s));
  }
  pushTagUnassigned(A) {
    this._push(this.createTag(A));
  }
  pushBreak() {
    if (this._currentParent.length > -1) throw new Error('Unexpected break');
    this._closeParent();
  }
  _createObjectStartFixed(A) {
    if (A === 0) {
      this._push(this.createObject({}));
      return;
    }
    this._createParent({}, VA.PARENT.OBJECT, A);
  }
  _createArrayStartFixed(A) {
    if (A === 0) {
      this._push(this.createArray([]));
      return;
    }
    this._createParent(new Array(A), VA.PARENT.ARRAY, A);
  }
  _decode(A) {
    if (A.byteLength === 0) throw new Error('Input too short');
    this._reset(), this._heap8.set(A);
    const e = this.parser.parse(A.byteLength);
    if (this._depth > 1) {
      for (; this._currentParent.length === 0; ) this._closeParent();
      if (this._depth > 1) throw new Error('Undeterminated nesting');
    }
    if (e > 0) throw new Error('Failed to parse');
    if (this._res.length === 0) throw new Error('No valid result');
  }
  decodeFirst(A) {
    return this._decode(A), this._res[0];
  }
  decodeAll(A) {
    return this._decode(A), this._res;
  }
  static decode(A, e) {
    return (
      typeof A == 'string' && (A = Bt.from(A, e || 'hex')),
      new or({ size: A.length }).decodeFirst(A)
    );
  }
  static decodeAll(A, e) {
    return (
      typeof A == 'string' && (A = Bt.from(A, e || 'hex')),
      new or({ size: A.length }).decodeAll(A)
    );
  }
};
Er.decodeFirst = Er.decode;
var _i = Er;
const { Buffer: Wt } = wt,
  wg = _i,
  pg = Jt;
class Sr extends wg {
  createTag(A, e) {
    return `${A}(${e})`;
  }
  createInt(A) {
    return super.createInt(A).toString();
  }
  createInt32(A, e) {
    return super.createInt32(A, e).toString();
  }
  createInt64(A, e, g, s) {
    return super.createInt64(A, e, g, s).toString();
  }
  createInt32Neg(A, e) {
    return super.createInt32Neg(A, e).toString();
  }
  createInt64Neg(A, e, g, s) {
    return super.createInt64Neg(A, e, g, s).toString();
  }
  createTrue() {
    return 'true';
  }
  createFalse() {
    return 'false';
  }
  createFloat(A) {
    const e = super.createFloat(A);
    return pg.isNegativeZero(A) ? '-0_1' : `${e}_1`;
  }
  createFloatSingle(A, e, g, s) {
    return `${super.createFloatSingle(A, e, g, s)}_2`;
  }
  createFloatDouble(A, e, g, s, l, y, u, M) {
    return `${super.createFloatDouble(A, e, g, s, l, y, u, M)}_3`;
  }
  createByteString(A, e) {
    const g = A.join(', ');
    return e === -1 ? `(_ ${g})` : `h'${g}`;
  }
  createByteStringFromHeap(A, e) {
    return `h'${Wt.from(super.createByteStringFromHeap(A, e)).toString(
      'hex',
    )}'`;
  }
  createInfinity() {
    return 'Infinity_1';
  }
  createInfinityNeg() {
    return '-Infinity_1';
  }
  createNaN() {
    return 'NaN_1';
  }
  createNaNNeg() {
    return '-NaN_1';
  }
  createNull() {
    return 'null';
  }
  createUndefined() {
    return 'undefined';
  }
  createSimpleUnassigned(A) {
    return `simple(${A})`;
  }
  createArray(A, e) {
    const g = super.createArray(A, e);
    return e === -1 ? `[_ ${g.join(', ')}]` : `[${g.join(', ')}]`;
  }
  createMap(A, e) {
    const g = super.createMap(A),
      s = Array.from(g.keys()).reduce(Or(g), '');
    return e === -1 ? `{_ ${s}}` : `{${s}}`;
  }
  createObject(A, e) {
    const g = super.createObject(A),
      s = Object.keys(g).reduce(Or(g), '');
    return e === -1 ? `{_ ${s}}` : `{${s}}`;
  }
  createUtf8String(A, e) {
    const g = A.join(', ');
    return e === -1 ? `(_ ${g})` : `"${g}"`;
  }
  createUtf8StringFromHeap(A, e) {
    return `"${Wt.from(super.createUtf8StringFromHeap(A, e)).toString(
      'utf8',
    )}"`;
  }
  static diagnose(A, e) {
    return (
      typeof A == 'string' && (A = Wt.from(A, e || 'hex')),
      new Sr().decodeFirst(A)
    );
  }
}
var yg = Sr;
function Or(t) {
  return (A, e) => (A ? `${A}, ${e}: ${t[e]}` : `${e}: ${t[e]}`);
}
const { Buffer: Ye } = wt,
  { URL: xg } = Ui,
  fr = Ht.BigNumber,
  jt = Jt,
  ce = De,
  _e = ce.MT,
  Dt = ce.NUMBYTES,
  Kr = ce.SHIFT32,
  Pr = ce.SYMS,
  It = ce.TAG,
  dg = (ce.MT.SIMPLE_FLOAT << 5) | ce.NUMBYTES.TWO,
  Dg = (ce.MT.SIMPLE_FLOAT << 5) | ce.NUMBYTES.FOUR,
  Sg = (ce.MT.SIMPLE_FLOAT << 5) | ce.NUMBYTES.EIGHT,
  Ng = (ce.MT.SIMPLE_FLOAT << 5) | ce.SIMPLE.TRUE,
  Fg = (ce.MT.SIMPLE_FLOAT << 5) | ce.SIMPLE.FALSE,
  mg = (ce.MT.SIMPLE_FLOAT << 5) | ce.SIMPLE.UNDEFINED,
  Wr = (ce.MT.SIMPLE_FLOAT << 5) | ce.SIMPLE.NULL,
  Gg = new fr('0x20000000000000'),
  Mg = Ye.from('f97e00', 'hex'),
  bg = Ye.from('f9fc00', 'hex'),
  Rg = Ye.from('f97c00', 'hex');
function Ug(t) {
  return {}.toString.call(t).slice(8, -1);
}
class Rt {
  constructor(A) {
    (A = A || {}),
      (this.streaming = typeof A.stream == 'function'),
      (this.onData = A.stream),
      (this.semanticTypes = [
        [xg, this._pushUrl],
        [fr, this._pushBigNumber],
      ]);
    const e = A.genTypes || [],
      g = e.length;
    for (let s = 0; s < g; s++) this.addSemanticType(e[s][0], e[s][1]);
    this._reset();
  }
  addSemanticType(A, e) {
    const g = this.semanticTypes.length;
    for (let s = 0; s < g; s++)
      if (this.semanticTypes[s][0] === A) {
        const y = this.semanticTypes[s][1];
        return (this.semanticTypes[s][1] = e), y;
      }
    return this.semanticTypes.push([A, e]), null;
  }
  push(A) {
    return (
      A &&
        ((this.result[this.offset] = A),
        (this.resultMethod[this.offset] = 0),
        (this.resultLength[this.offset] = A.length),
        this.offset++,
        this.streaming && this.onData(this.finalize())),
      !0
    );
  }
  pushWrite(A, e, g) {
    return (
      (this.result[this.offset] = A),
      (this.resultMethod[this.offset] = e),
      (this.resultLength[this.offset] = g),
      this.offset++,
      this.streaming && this.onData(this.finalize()),
      !0
    );
  }
  _pushUInt8(A) {
    return this.pushWrite(A, 1, 1);
  }
  _pushUInt16BE(A) {
    return this.pushWrite(A, 2, 2);
  }
  _pushUInt32BE(A) {
    return this.pushWrite(A, 3, 4);
  }
  _pushDoubleBE(A) {
    return this.pushWrite(A, 4, 8);
  }
  _pushNaN() {
    return this.push(Mg);
  }
  _pushInfinity(A) {
    const e = A < 0 ? bg : Rg;
    return this.push(e);
  }
  _pushFloat(A) {
    const e = Ye.allocUnsafe(2);
    if (jt.writeHalf(e, A) && jt.parseHalf(e) === A)
      return this._pushUInt8(dg) && this.push(e);
    const g = Ye.allocUnsafe(4);
    return (
      g.writeFloatBE(A, 0),
      g.readFloatBE(0) === A
        ? this._pushUInt8(Dg) && this.push(g)
        : this._pushUInt8(Sg) && this._pushDoubleBE(A)
    );
  }
  _pushInt(A, e, g) {
    const s = e << 5;
    return A < 24
      ? this._pushUInt8(s | A)
      : A <= 255
      ? this._pushUInt8(s | Dt.ONE) && this._pushUInt8(A)
      : A <= 65535
      ? this._pushUInt8(s | Dt.TWO) && this._pushUInt16BE(A)
      : A <= 4294967295
      ? this._pushUInt8(s | Dt.FOUR) && this._pushUInt32BE(A)
      : A <= Number.MAX_SAFE_INTEGER
      ? this._pushUInt8(s | Dt.EIGHT) &&
        this._pushUInt32BE(Math.floor(A / Kr)) &&
        this._pushUInt32BE(A % Kr)
      : e === _e.NEG_INT
      ? this._pushFloat(g)
      : this._pushFloat(A);
  }
  _pushIntNum(A) {
    return A < 0
      ? this._pushInt(-A - 1, _e.NEG_INT, A)
      : this._pushInt(A, _e.POS_INT);
  }
  _pushNumber(A) {
    switch (!1) {
      case A === A:
        return this._pushNaN(A);
      case isFinite(A):
        return this._pushInfinity(A);
      case A % 1 !== 0:
        return this._pushIntNum(A);
      default:
        return this._pushFloat(A);
    }
  }
  _pushString(A) {
    const e = Ye.byteLength(A, 'utf8');
    return this._pushInt(e, _e.UTF8_STRING) && this.pushWrite(A, 5, e);
  }
  _pushBoolean(A) {
    return this._pushUInt8(A ? Ng : Fg);
  }
  _pushUndefined(A) {
    return this._pushUInt8(mg);
  }
  _pushArray(A, e) {
    const g = e.length;
    if (!A._pushInt(g, _e.ARRAY)) return !1;
    for (let s = 0; s < g; s++) if (!A.pushAny(e[s])) return !1;
    return !0;
  }
  _pushTag(A) {
    return this._pushInt(A, _e.TAG);
  }
  _pushDate(A, e) {
    return A._pushTag(It.DATE_EPOCH) && A.pushAny(Math.round(e / 1e3));
  }
  _pushBuffer(A, e) {
    return A._pushInt(e.length, _e.BYTE_STRING) && A.push(e);
  }
  _pushNoFilter(A, e) {
    return A._pushBuffer(A, e.slice());
  }
  _pushRegexp(A, e) {
    return A._pushTag(It.REGEXP) && A.pushAny(e.source);
  }
  _pushSet(A, e) {
    if (!A._pushInt(e.size, _e.ARRAY)) return !1;
    for (const g of e) if (!A.pushAny(g)) return !1;
    return !0;
  }
  _pushUrl(A, e) {
    return A._pushTag(It.URI) && A.pushAny(e.format());
  }
  _pushBigint(A) {
    let e = It.POS_BIGINT;
    A.isNegative() && ((A = A.negated().minus(1)), (e = It.NEG_BIGINT));
    let g = A.toString(16);
    g.length % 2 && (g = '0' + g);
    const s = Ye.from(g, 'hex');
    return this._pushTag(e) && this._pushBuffer(this, s);
  }
  _pushBigNumber(A, e) {
    if (e.isNaN()) return A._pushNaN();
    if (!e.isFinite()) return A._pushInfinity(e.isNegative() ? -1 / 0 : 1 / 0);
    if (e.isInteger()) return A._pushBigint(e);
    if (!(A._pushTag(It.DECIMAL_FRAC) && A._pushInt(2, _e.ARRAY))) return !1;
    const g = e.decimalPlaces(),
      s = e.multipliedBy(new fr(10).pow(g));
    return A._pushIntNum(-g)
      ? s.abs().isLessThan(Gg)
        ? A._pushIntNum(s.toNumber())
        : A._pushBigint(s)
      : !1;
  }
  _pushMap(A, e) {
    return A._pushInt(e.size, _e.MAP)
      ? this._pushRawMap(e.size, Array.from(e))
      : !1;
  }
  _pushObject(A) {
    if (!A) return this._pushUInt8(Wr);
    for (var e = this.semanticTypes.length, g = 0; g < e; g++)
      if (A instanceof this.semanticTypes[g][0])
        return this.semanticTypes[g][1].call(A, this, A);
    var s = A.encodeCBOR;
    if (typeof s == 'function') return s.call(A, this);
    var l = Object.keys(A),
      y = l.length;
    return this._pushInt(y, _e.MAP)
      ? this._pushRawMap(
          y,
          l.map((u) => [u, A[u]]),
        )
      : !1;
  }
  _pushRawMap(A, e) {
    e = e
      .map(function (s) {
        return (s[0] = Rt.encode(s[0])), s;
      })
      .sort(jt.keySorter);
    for (var g = 0; g < A; g++)
      if (!this.push(e[g][0]) || !this.pushAny(e[g][1])) return !1;
    return !0;
  }
  write(A) {
    return this.pushAny(A);
  }
  pushAny(A) {
    var e = Ug(A);
    switch (e) {
      case 'Number':
        return this._pushNumber(A);
      case 'String':
        return this._pushString(A);
      case 'Boolean':
        return this._pushBoolean(A);
      case 'Object':
        return this._pushObject(A);
      case 'Array':
        return this._pushArray(this, A);
      case 'Uint8Array':
        return this._pushBuffer(this, Ye.isBuffer(A) ? A : Ye.from(A));
      case 'Null':
        return this._pushUInt8(Wr);
      case 'Undefined':
        return this._pushUndefined(A);
      case 'Map':
        return this._pushMap(this, A);
      case 'Set':
        return this._pushSet(this, A);
      case 'URL':
        return this._pushUrl(this, A);
      case 'BigNumber':
        return this._pushBigNumber(this, A);
      case 'Date':
        return this._pushDate(this, A);
      case 'RegExp':
        return this._pushRegexp(this, A);
      case 'Symbol':
        switch (A) {
          case Pr.NULL:
            return this._pushObject(null);
          case Pr.UNDEFINED:
            return this._pushUndefined(void 0);
          default:
            throw new Error('Unknown symbol: ' + A.toString());
        }
      default:
        throw new Error(
          'Unknown type: ' + typeof A + ', ' + (A ? A.toString() : ''),
        );
    }
  }
  finalize() {
    if (this.offset === 0) return null;
    for (
      var A = this.result,
        e = this.resultLength,
        g = this.resultMethod,
        s = this.offset,
        l = 0,
        y = 0;
      y < s;
      y++
    )
      l += e[y];
    var u = Ye.allocUnsafe(l),
      M = 0,
      b = 0;
    for (y = 0; y < s; y++) {
      switch (((b = e[y]), g[y])) {
        case 0:
          A[y].copy(u, M);
          break;
        case 1:
          u.writeUInt8(A[y], M, !0);
          break;
        case 2:
          u.writeUInt16BE(A[y], M, !0);
          break;
        case 3:
          u.writeUInt32BE(A[y], M, !0);
          break;
        case 4:
          u.writeDoubleBE(A[y], M, !0);
          break;
        case 5:
          u.write(A[y], M, b, 'utf8');
          break;
        default:
          throw new Error('unkown method');
      }
      M += b;
    }
    var $ = u;
    return this._reset(), $;
  }
  _reset() {
    (this.result = []),
      (this.resultMethod = []),
      (this.resultLength = []),
      (this.offset = 0);
  }
  static encode(A) {
    const e = new Rt();
    if (!e.pushAny(A)) throw new Error('Failed to encode input');
    return e.finalize();
  }
}
var _g = Rt;
(function (t) {
  (t.Diagnose = yg),
    (t.Decoder = _i),
    (t.Encoder = _g),
    (t.Simple = Gi),
    (t.Tagged = Mi),
    (t.decodeAll = t.Decoder.decodeAll),
    (t.decodeFirst = t.Decoder.decodeFirst),
    (t.diagnose = t.Diagnose.diagnose),
    (t.encode = t.Encoder.encode),
    (t.decode = t.Decoder.decode),
    (t.leveldb = {
      decode: t.Decoder.decodeAll,
      encode: t.Encoder.encode,
      buffer: !0,
      name: 'cbor',
    });
})(Fi);
const ki = on(Fi);
function ht(...t) {
  const A = new Uint8Array(t.reduce((g, s) => g + s.byteLength, 0));
  let e = 0;
  for (const g of t) A.set(new Uint8Array(g), e), (e += g.byteLength);
  return A.buffer;
}
const kg = new RegExp(/^([0-9A-F]{2})*$/i);
function Qr(t) {
  if (!kg.test(t)) throw new Error('Invalid hexadecimal string.');
  const A = [...t]
    .reduce((e, g, s) => ((e[(s / 2) | 0] = (e[(s / 2) | 0] || '') + g), e), [])
    .map((e) => Number.parseInt(e, 16));
  return new Uint8Array(A).buffer;
}
function Lg(t, A) {
  if (t.byteLength !== A.byteLength) return t.byteLength - A.byteLength;
  const e = new Uint8Array(t),
    g = new Uint8Array(A);
  for (let s = 0; s < e.length; s++) if (e[s] !== g[s]) return e[s] - g[s];
  return 0;
}
function Tg(t) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength).buffer;
}
function et(t) {
  return Tg(Kn.create().update(new Uint8Array(t)).digest());
}
function Gt(t) {
  if (t instanceof ki.Tagged) return Gt(t.value);
  if (typeof t == 'string') return Li(t);
  if (typeof t == 'number') return et(Yr(t));
  if (t instanceof ArrayBuffer || ArrayBuffer.isView(t)) return et(t);
  if (Array.isArray(t)) {
    const A = t.map(Gt);
    return et(ht(...A));
  } else {
    if (t && typeof t == 'object' && t._isPrincipal)
      return et(t.toUint8Array());
    if (typeof t == 'object' && t !== null && typeof t.toHash == 'function')
      return Gt(t.toHash());
    if (typeof t == 'bigint') return et(Yr(t));
  }
  throw Object.assign(
    new Error(`Attempt to hash a value of unsupported type: ${t}`),
    { value: t },
  );
}
const Li = (t) => {
  const A = new TextEncoder().encode(t);
  return et(A);
};
function Nr(t) {
  const g = Object.entries(t)
      .filter(([, y]) => y !== void 0)
      .map(([y, u]) => {
        const M = Li(y),
          b = Gt(u);
        return [M, b];
      })
      .sort(([y], [u]) => Lg(y, u)),
    s = ht(...g.map((y) => ht(...y)));
  return et(s);
}
var vg =
  (globalThis && globalThis.__rest) ||
  function (t, A) {
    var e = {};
    for (var g in t)
      Object.prototype.hasOwnProperty.call(t, g) &&
        A.indexOf(g) < 0 &&
        (e[g] = t[g]);
    if (t != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var s = 0, g = Object.getOwnPropertySymbols(t); s < g.length; s++)
        A.indexOf(g[s]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(t, g[s]) &&
          (e[g[s]] = t[g[s]]);
    return e;
  };
const Yg = new TextEncoder().encode(`
ic-request`);
class Fr {
  getPrincipal() {
    return (
      this._principal ||
        (this._principal = $e.selfAuthenticating(
          new Uint8Array(this.getPublicKey().toDer()),
        )),
      this._principal
    );
  }
  async transformRequest(A) {
    const { body: e } = A,
      g = vg(A, ['body']),
      s = await Nr(e);
    return Object.assign(Object.assign({}, g), {
      body: {
        content: e,
        sender_pubkey: this.getPublicKey().toDer(),
        sender_sig: await this.sign(ht(Yg, s)),
      },
    });
  }
}
class jr {
  getPrincipal() {
    return $e.anonymous();
  }
  async transformRequest(A) {
    return Object.assign(Object.assign({}, A), { body: { content: A.body } });
  }
}
var Me = {},
  ft = {},
  Ae = {};
Object.defineProperty(Ae, '__esModule', { value: !0 });
const Hg = 9007199254740992;
function Pe(t, ...A) {
  const e = new Uint8Array(
    t.byteLength + A.reduce((s, l) => s + l.byteLength, 0),
  );
  e.set(new Uint8Array(t), 0);
  let g = t.byteLength;
  for (const s of A) e.set(new Uint8Array(s), g), (g += s.byteLength);
  return e.buffer;
}
function Le(t, A, e) {
  e = e.replace(/[^0-9a-fA-F]/g, '');
  const g = 2 ** (A - 24);
  e = e.slice(-g * 2).padStart(g * 2, '0');
  const s = [(t << 5) + A].concat(e.match(/../g).map((l) => parseInt(l, 16)));
  return new Uint8Array(s).buffer;
}
function qt(t, A) {
  if (A < 24) return new Uint8Array([(t << 5) + A]).buffer;
  {
    const e = A <= 255 ? 24 : A <= 65535 ? 25 : A <= 4294967295 ? 26 : 27;
    return Le(t, e, A.toString(16));
  }
}
function Ti(t) {
  const A = [];
  for (let e = 0; e < t.length; e++) {
    let g = t.charCodeAt(e);
    g < 128
      ? A.push(g)
      : g < 2048
      ? A.push(192 | (g >> 6), 128 | (g & 63))
      : g < 55296 || g >= 57344
      ? A.push(224 | (g >> 12), 128 | ((g >> 6) & 63), 128 | (g & 63))
      : (e++,
        (g = ((g & 1023) << 10) | (t.charCodeAt(e) & 1023)),
        A.push(
          240 | (g >> 18),
          128 | ((g >> 12) & 63),
          128 | ((g >> 6) & 63),
          128 | (g & 63),
        ));
  }
  return Pe(new Uint8Array(qt(3, t.length)), new Uint8Array(A));
}
function Jg(t, A) {
  if (t == 14277111) return Pe(new Uint8Array([217, 217, 247]), A);
  if (t < 24) return Pe(new Uint8Array([192 + t]), A);
  {
    const e = t <= 255 ? 24 : t <= 65535 ? 25 : t <= 4294967295 ? 26 : 27,
      g = 2 ** (e - 24),
      s = t
        .toString(16)
        .slice(-g * 2)
        .padStart(g * 2, '0'),
      l = [192 + e].concat(s.match(/../g).map((y) => parseInt(y, 16)));
    return new Uint8Array(l).buffer;
  }
}
Ae.tagged = Jg;
function yt(t) {
  return new Uint8Array(t).buffer;
}
Ae.raw = yt;
function mr(t) {
  if (isNaN(t)) throw new RangeError('Invalid number.');
  t = Math.min(Math.max(0, t), 23);
  const A = [0 + t];
  return new Uint8Array(A).buffer;
}
Ae.uSmall = mr;
function vi(t, A) {
  if (((t = parseInt('' + t, A)), isNaN(t)))
    throw new RangeError('Invalid number.');
  return (
    (t = Math.min(Math.max(0, t), 255)), (t = t.toString(16)), Le(0, 24, t)
  );
}
Ae.u8 = vi;
function Yi(t, A) {
  if (((t = parseInt('' + t, A)), isNaN(t)))
    throw new RangeError('Invalid number.');
  return (
    (t = Math.min(Math.max(0, t), 65535)), (t = t.toString(16)), Le(0, 25, t)
  );
}
Ae.u16 = Yi;
function Hi(t, A) {
  if (((t = parseInt('' + t, A)), isNaN(t)))
    throw new RangeError('Invalid number.');
  return (
    (t = Math.min(Math.max(0, t), 4294967295)),
    (t = t.toString(16)),
    Le(0, 26, t)
  );
}
Ae.u32 = Hi;
function Gr(t, A) {
  if (typeof t == 'string' && A == 16) {
    if (t.match(/[^0-9a-fA-F]/)) throw new RangeError('Invalid number.');
    return Le(0, 27, t);
  }
  if (((t = parseInt('' + t, A)), isNaN(t)))
    throw new RangeError('Invalid number.');
  return (t = Math.min(Math.max(0, t), Hg)), (t = t.toString(16)), Le(0, 27, t);
}
Ae.u64 = Gr;
function Ji(t) {
  if (isNaN(t)) throw new RangeError('Invalid number.');
  if (t === 0) return mr(0);
  t = Math.min(Math.max(0, -t), 24) - 1;
  const A = [32 + t];
  return new Uint8Array(A).buffer;
}
Ae.iSmall = Ji;
function qi(t, A) {
  if (((t = parseInt('' + t, A)), isNaN(t)))
    throw new RangeError('Invalid number.');
  return (
    (t = Math.min(Math.max(0, -t - 1), 255)), (t = t.toString(16)), Le(1, 24, t)
  );
}
Ae.i8 = qi;
function Oi(t, A) {
  if (((t = parseInt('' + t, A)), isNaN(t)))
    throw new RangeError('Invalid number.');
  return (
    (t = Math.min(Math.max(0, -t - 1), 65535)),
    (t = t.toString(16)),
    Le(1, 25, t)
  );
}
Ae.i16 = Oi;
function Ki(t, A) {
  if (((t = parseInt('' + t, A)), isNaN(t)))
    throw new RangeError('Invalid number.');
  return (
    (t = Math.min(Math.max(0, -t - 1), 4294967295)),
    (t = t.toString(16)),
    Le(1, 26, t)
  );
}
Ae.i32 = Ki;
function Pi(t, A) {
  if (typeof t == 'string' && A == 16) {
    if (
      (t.startsWith('-') ? (t = t.slice(1)) : (t = '0'),
      t.match(/[^0-9a-fA-F]/) || t.length > 16)
    )
      throw new RangeError('Invalid number.');
    let e = !1,
      g = t.split('').reduceRight((s, l) => {
        if (e) return l + s;
        let y = parseInt(l, 16) - 1;
        return y >= 0 ? ((e = !0), y.toString(16) + s) : 'f' + s;
      }, '');
    return e ? Le(1, 27, g) : Gr(0);
  }
  if (((t = parseInt('' + t, A)), isNaN(t)))
    throw new RangeError('Invalid number.');
  return (
    (t = Math.min(Math.max(0, -t - 1), 9007199254740992)),
    (t = t.toString(16)),
    Le(1, 27, t)
  );
}
Ae.i64 = Pi;
function qg(t) {
  return t >= 0
    ? t < 24
      ? mr(t)
      : t <= 255
      ? vi(t)
      : t <= 65535
      ? Yi(t)
      : t <= 4294967295
      ? Hi(t)
      : Gr(t)
    : t >= -24
    ? Ji(t)
    : t >= -255
    ? qi(t)
    : t >= -65535
    ? Oi(t)
    : t >= -4294967295
    ? Ki(t)
    : Pi(t);
}
Ae.number = qg;
function Og(t) {
  return Pe(qt(2, t.byteLength), t);
}
Ae.bytes = Og;
function Kg(t) {
  return Ti(t);
}
Ae.string = Kg;
function Pg(t) {
  return Pe(qt(4, t.length), ...t);
}
Ae.array = Pg;
function Wg(t, A = !1) {
  t instanceof Map || (t = new Map(Object.entries(t)));
  let e = Array.from(t.entries());
  return (
    A && (e = e.sort(([g], [s]) => g.localeCompare(s))),
    Pe(qt(5, t.size), ...e.map(([g, s]) => Pe(Ti(g), s)))
  );
}
Ae.map = Wg;
function jg(t) {
  const A = new Float32Array([t]);
  return Pe(new Uint8Array([224 + 26]), new Uint8Array(A.buffer));
}
Ae.singleFloat = jg;
function zg(t) {
  const A = new Float64Array([t]);
  return Pe(new Uint8Array([224 + 27]), new Uint8Array(A.buffer));
}
Ae.doubleFloat = zg;
function Zg(t) {
  return t ? Wi() : ji();
}
Ae.bool = Zg;
function Wi() {
  return yt(new Uint8Array([224 + 21]));
}
Ae.true_ = Wi;
function ji() {
  return yt(new Uint8Array([224 + 20]));
}
Ae.false_ = ji;
function Vg() {
  return yt(new Uint8Array([224 + 22]));
}
Ae.null_ = Vg;
function Xg() {
  return yt(new Uint8Array([224 + 23]));
}
Ae.undefined_ = Xg;
var $g =
  (Et && Et.__importStar) ||
  function (t) {
    if (t && t.__esModule) return t;
    var A = {};
    if (t != null)
      for (var e in t) Object.hasOwnProperty.call(t, e) && (A[e] = t[e]);
    return (A.default = t), A;
  };
Object.defineProperty(ft, '__esModule', { value: !0 });
const ke = $g(Ae),
  AB = [
    ArrayBuffer,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Float32Array,
    Float64Array,
  ];
class zi {
  constructor(A, e = !1) {
    (this._serializer = A),
      (this._stable = e),
      (this.name = 'jsonDefault'),
      (this.priority = -100);
  }
  match(A) {
    return (
      ['undefined', 'boolean', 'number', 'string', 'object'].indexOf(
        typeof A,
      ) != -1
    );
  }
  encode(A) {
    switch (typeof A) {
      case 'undefined':
        return ke.undefined_();
      case 'boolean':
        return ke.bool(A);
      case 'number':
        return Math.floor(A) === A ? ke.number(A) : ke.doubleFloat(A);
      case 'string':
        return ke.string(A);
      case 'object':
        if (A === null) return ke.null_();
        if (Array.isArray(A))
          return ke.array(A.map((e) => this._serializer.serializeValue(e)));
        if (AB.find((e) => A instanceof e)) return ke.bytes(A.buffer);
        if (Object.getOwnPropertyNames(A).indexOf('toJSON') !== -1)
          return this.encode(A.toJSON());
        if (A instanceof Map) {
          const e = new Map();
          for (const [g, s] of A.entries())
            e.set(g, this._serializer.serializeValue(s));
          return ke.map(e, this._stable);
        } else {
          const e = new Map();
          for (const [g, s] of Object.entries(A))
            e.set(g, this._serializer.serializeValue(s));
          return ke.map(e, this._stable);
        }
      default:
        throw new Error('Invalid value.');
    }
  }
}
ft.JsonDefaultCborEncoder = zi;
class Zi {
  constructor() {
    (this.name = 'cborEncoder'), (this.priority = -90);
  }
  match(A) {
    return typeof A == 'object' && typeof A.toCBOR == 'function';
  }
  encode(A) {
    return A.toCBOR();
  }
}
ft.ToCborEncoder = Zi;
class Vi {
  constructor() {
    this._encoders = new Set();
  }
  static withDefaultEncoders(A = !1) {
    const e = new this();
    return e.addEncoder(new zi(e, A)), e.addEncoder(new Zi()), e;
  }
  removeEncoder(A) {
    for (const e of this._encoders.values())
      e.name == A && this._encoders.delete(e);
  }
  addEncoder(A) {
    this._encoders.add(A);
  }
  getEncoderFor(A) {
    let e = null;
    for (const g of this._encoders)
      (!e || g.priority > e.priority) && g.match(A) && (e = g);
    if (e === null) throw new Error('Could not find an encoder for value.');
    return e;
  }
  serializeValue(A) {
    return this.getEncoderFor(A).encode(A);
  }
  serialize(A) {
    return this.serializeValue(A);
  }
}
ft.CborSerializer = Vi;
class eB extends Vi {
  serialize(A) {
    return ke.raw(
      new Uint8Array([
        ...new Uint8Array([217, 217, 247]),
        ...new Uint8Array(super.serializeValue(A)),
      ]),
    );
  }
}
ft.SelfDescribeCborSerializer = eB;
(function (t) {
  function A(s) {
    for (var l in s) t.hasOwnProperty(l) || (t[l] = s[l]);
  }
  var e =
    (Et && Et.__importStar) ||
    function (s) {
      if (s && s.__esModule) return s;
      var l = {};
      if (s != null)
        for (var y in s) Object.hasOwnProperty.call(s, y) && (l[y] = s[y]);
      return (l.default = s), l;
    };
  Object.defineProperty(t, '__esModule', { value: !0 }), A(ft);
  const g = e(Ae);
  t.value = g;
})(Me);
class tB {
  get name() {
    return 'Principal';
  }
  get priority() {
    return 0;
  }
  match(A) {
    return A && A._isPrincipal === !0;
  }
  encode(A) {
    return Me.value.bytes(A.toUint8Array());
  }
}
class rB {
  get name() {
    return 'Buffer';
  }
  get priority() {
    return 1;
  }
  match(A) {
    return A instanceof ArrayBuffer || ArrayBuffer.isView(A);
  }
  encode(A) {
    return Me.value.bytes(new Uint8Array(A));
  }
}
class iB {
  get name() {
    return 'BigInt';
  }
  get priority() {
    return 1;
  }
  match(A) {
    return typeof A == 'bigint';
  }
  encode(A) {
    return A > BigInt(0)
      ? Me.value.tagged(2, Me.value.bytes(Qr(A.toString(16))))
      : Me.value.tagged(3, Me.value.bytes(Qr((BigInt('-1') * A).toString(16))));
  }
}
const Mr = Me.SelfDescribeCborSerializer.withDefaultEncoders(!0);
Mr.addEncoder(new tB());
Mr.addEncoder(new rB());
Mr.addEncoder(new iB());
var zr;
(function (t) {
  (t[(t.Uint64LittleEndian = 71)] = 'Uint64LittleEndian'),
    (t[(t.Semantic = 55799)] = 'Semantic');
})(zr || (zr = {}));
class gI extends ki.Decoder {
  createByteString(A) {
    return ht(...A);
  }
  createByteStringFromHeap(A, e) {
    return A === e
      ? new ArrayBuffer(0)
      : new Uint8Array(this._heap.slice(A, e));
  }
}
var Zr;
(function (t) {
  t.Call = 'call';
})(Zr || (Zr = {}));
BigInt(1e6);
BigInt(60 * 1e3);
var Vr;
(function (t) {
  (t.Received = 'received'),
    (t.Processing = 'processing'),
    (t.Replied = 'replied'),
    (t.Rejected = 'rejected'),
    (t.Unknown = 'unknown'),
    (t.Done = 'done');
})(Vr || (Vr = {}));
var Xr;
(function (t) {
  (t.Error = 'err'),
    (t.GetPrincipal = 'gp'),
    (t.GetPrincipalResponse = 'gpr'),
    (t.Query = 'q'),
    (t.QueryResponse = 'qr'),
    (t.Call = 'c'),
    (t.CallResponse = 'cr'),
    (t.ReadState = 'rs'),
    (t.ReadStateResponse = 'rsr'),
    (t.Status = 's'),
    (t.StatusResponse = 'sr');
})(Xr || (Xr = {}));
var Xi;
(function () {
  for (
    var t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      A = new Uint8Array(256),
      e = 0;
    e < t.length;
    e++
  )
    A[t.charCodeAt(e)] = e;
  Xi = function (g) {
    var s = g.length * 0.75,
      l = g.length,
      y,
      u = 0,
      M,
      b,
      $,
      J;
    g[g.length - 1] === '=' && (s--, g[g.length - 2] === '=' && s--);
    var nA = new ArrayBuffer(s),
      AA = new Uint8Array(nA);
    for (y = 0; y < l; y += 4)
      (M = A[g.charCodeAt(y)]),
        (b = A[g.charCodeAt(y + 1)]),
        ($ = A[g.charCodeAt(y + 2)]),
        (J = A[g.charCodeAt(y + 3)]),
        (AA[u++] = (M << 2) | (b >> 4)),
        (AA[u++] = ((b & 15) << 4) | ($ >> 2)),
        (AA[u++] = (($ & 3) << 6) | (J & 63));
    return nA;
  };
})();
const nB =
  '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akE4ENABGiACQbgDakEBNgIAIAJBwANqQTgQ0AEaIAJB+ANqQQE2AgAgAkGABGpBOBDQARogAkEBNgK4BCACQcAEakE4ENABGiACQfgEakEBNgIAIAJBgAVqQTgQ0AEaIAJBuAVqQQE2AgAgAkHABWpBOBDQARogAkH4BWpBATYCACACQYAGakE4ENABGiACQQE2ArgGIAJBwAZqQTgQ0AEaIAJB+AZqQQE2AgAgAkGAB2pBOBDQARogAkG4B2pBATYCACACQcAHakE4ENABGiACQfgHakEBNgIAIAIgARAYAkAgASgCgAZBBEYNACAAKAKABkEERg0AIAJBgARqIgMgAEGAAmoQlgEgAyABQYACahAYDAYLIAJBwAxqIgdBOBDQARogAkEBNgL4DCACQYANakE4ENABGiACQbgNakEBNgIAIAJBgAhqIgRBOBDQARogAkEBNgK4CCACQcAIakE4ENABGiACQfgIakEBNgIAIAJBgApqIgMgAEGAA2oiBRBeIAQgAxCZASADIAFBgANqIgYQXiAEIAMQESAHELYBIAEoAoAGQQRHDQMMBAsgACABEAMMBgsgAkHADGoiAyABQYAFahBeIAJBgAxqIgQgA0HAABDRARogAkGABmogBBCnAQsgAkGABmoQZCACQYAIaiIDIAIQlgEgAxArIAJBgAJqIgQgAxCXASAGIAQQlgEgAkGABGoiByADEJYBIAMgABCWASADIAUQlwEgAxCwASACQYAKaiIEIAEQlgEgBCABQYAEahCXASAEELABIAMgBBAYIAcgAxCXASADIAUQlgECQCABKAKABkECRwRAIAJBwAxqIgMgAUGABWoQXiACQYAIaiADEKYBDAELIAJBwAxqIgMgAUGABWoQXiACQYAMaiIBIANBwAAQ0QEaIAJBgAhqIAEQpwELIAJBgAhqIgEQZCACQYAKaiIDIAEQlgEgAxArIAUgAkGABGoQlgEgBSADEJcBIAJBgAZqIgQgAxCXASABEGQgBiABEJcBIAQQsAEgBBBkIAAgAhCWASAAIAQQlwEMAwsgAkGACmoiAyAFEF4gAkHADGoiBCADEJkBIAMgAUGAAmoQXiAEIAMQEQsgACgCgAZBBEcEQCACQYAKaiIDIABBgAJqEF4gAkHADGoiBCADEJkBIAMgBhBeIAQgAxARCyACQYAEaiIDIAJBwAxqIAJBgAhqEKUBIAMQZAsgAkGACGoiAyAAEIwBIAJBgApqIgQgARCMASADIABBgAJqIgUQlwEgAxCwASAEIAFBgAJqIggQlwEgBBCwASACQYACaiIJIAMQlgEgCSAEEBggAyAFEJYBIAMgAEGABGoiBhCXASADELABIAQgCBCWASAEIAFBgARqIggQlwEgBBCwASACQYAGaiIHIAMQlgEgByAEEBggAyACEJYBIAMQKyAEIAJBgARqIgoQlgEgBBArIAkgAxCXASAFIAkQlgEgBSAEEJcBIAcgBBCXASAKIAMQlwEgAyAAEJYBIAMgBhCXASADELABIAQgARCWASAEIAgQlwEgBBCwASADIAQQGCAKIAMQlwEgAyAGEJYBIAMgCBAYIAQgAxCWASAEECsgBiAKEJYBIAYgBBCXASAHIAQQlwEgAxBkIAUgAxCXASAHELABIAcQZCAAIAIQlgEgACAHEJcBCyAAQQU2AoAGIAAQnQELIAJBwA1qJAALqAsBEX8jAEGAC2siAiQAIAJBCGoQZyACQcgBaiIKQTgQ0AEaIAJBATYCgAIgAkGIAmoiD0E4ENABGiACQQE2AsACIAJByAJqIhBBOBDQARogAkEBNgKAAyACQYgDaiIJQTgQ0AEaIAJBATYCwAMgAkHIA2oiDkE4ENABGiACQQE2AoAEIAJBiARqIhFBARA5IAJByARqIgtBOBDQARogAkEBNgKABSACQYgFaiIEQTgQ0AEaIAJBATYCwAUgAkHIBWoiBSABEJABIAJBiAZqIgNBOBDQARogAkEBNgLABiACQcgGaiIGQTgQ0AEaIAJBATYCgAcgAkGIB2oiDEE4ENABGiACQQE2AsAHIAJByAdqIghBOBDQARogAkEBNgKACCAFEFYhEiACQcgJaiINQZCCwAAQSSACQYgKaiIHIA0QjgEgCiAHEK4BIA1ByILAABBJIAcgDRCOASAPIAcQrgEgBRBMIAVBCxA0IAMgBRCuASADIBEQdyADEEIgAyAFEEogBCAKEK4BIAQgAxBKIAMgERB3IAJBiAZqEEIgAyAPEEogAxBDIAJBiAZqEEIgCSADEK4BIA4gBRCuASAOIAkQSiAIIAkQrgEgCBBMIAYgBBCuASAGEEwgAyAKEK4BIAMgBhBKIAggAxB3IAgQQiAIIAkQSiAGIAQQSiADIA8QrgEgAyAGEEogCCADEHcgAkHIB2oQQiADIAgQrgEgAyAEEEogAyAMEFohCiAEIAMQrgEgBCAMEDMgBCAIEEogCSAEEEogDiAEEEogBSABEEogBiAEEK4BIAYQTCAEIAYQrgEgBCAFEEogBSADEK4BIAVBCxA0IA1BgIPAABBJIAcgDRCOASAQIAcQrgEgECAMEEogCSAOQQEgCmsiARByIAYgBCABEHIgAyAFIAEQciAMIBAgARByIAcgAyAMECMgCyAHEK4BIAsgBhBKIAsQViEBIAMgCxCuASADEEMgAkGIBmoQQiALIAMgASAScxByIAdBuIPAABBJIAJBiAhqIAcQjgFBOCEBA0AgAUGgBUZFBEAgAkGICGoiAyACQYgDahBKIAJByAlqIgQgAUG4g8AAahBJIAFBOGohASACQYgKaiIFIAQQjgEgAkGIBmoiBCAFEK4BIAMgBBB3IAMQQgwBCwsgAkHICGoiASACQYgDahCQASACQcgJaiIDQdiIwAAQSSACQYgKaiIEIAMQjgEgAkGIBmoiAyAEEK4BIAEgAxB3IAEQQkEAIQEDQCABQfgDRkUEQCACQcgIaiIDIAJBiANqEEogAkHICWoiBCABQZCJwABqEEkgAUE4aiEBIAJBiApqIgUgBBCOASACQYgGaiIEIAUQrgEgAyAEEHcgAxBCDAELCyACQYgKaiIBQYiNwAAQSSACQYgJaiABEI4BQQAhAQNAIAFByAZGRQRAIAJBiAlqIgMgAkGIA2oQSiACQcgJaiIEIAFBwI3AAGoQSSABQThqIQEgAkGICmoiBSAEEI4BIAJBiAZqIgQgBRCuASADIAQQdyADEEIMAQsLIAJByAlqIgEgAkGIA2oQkAEgAkHICmoiA0GIlMAAEEkgAkGICmoiBCADEI4BIAJBiAZqIgMgBBCuASABIAMQdyABEEJBACEBA0AgAUGQBkYEQCACQYgJaiIDIAJByARqEEogAkGIBmoiASACQYgIahCuASABIAJByAlqIgQQSiACQQhqIgUgARCuASABIAMQrgEgASACQcgIaiIDEEogAkHIAGogARCuASABIAMQrgEgASAEEEogAkGIAWogARCuASAAIAVBwAEQ0QEaIAJBgAtqJAAFIAJByAlqIgMgAkGIA2oQSiACQcgKaiIEIAFBwJTAAGoQSSABQThqIQEgAkGICmoiBSAEEI4BIAJBiAZqIgQgBRCuASADIAQQdyADEEIMAQsLC/oGAQx/IwBBgAlrIgMkACADQYAIaiICIAAQXiADIAIQXiACIABBgAFqIgoQXiADQYABaiIEIAIQXiACIAEQXiADIAIQESACIAFBgAFqIgsQXiAEIAIQEQJAIAEoAoAGIgJBAkYgACgCgAYiBEECRnJFBEAgA0GACGoiAiAAQYAFahBeIANBgAJqIgQgAhBeIAIgAUGABWoQXiAEIAIQEQwBCyACQQJGIARBAkZxRQRAIAJBAkYEQCADQYAIaiICIABBgAVqEF4gA0GAAmoiBCACEF4gAiABQYAFahBeIANBgAdqIgUgAkHAABDRARogBCAFEKoBDAILIANBgAhqIgIgAUGABWoQXiADQYACaiIEIAIQXiACIABBgAVqEF4gA0GAB2oiBSACQcAAENEBGiAEIAUQqgEMAQsgA0GACGoiAiAAQYAFahBeIANBgAdqIgQgAkHAABDRARogA0GABmoiBSAEEJABIAIgAUGABWoQXiAEIAJBwAAQ0QEaIAUgBBBKIANBgAJqQTgQ0AEiAkEBNgI4IAJBQGtBOBDQASACQfgAakEBNgIAIAIgBRCuARDBAQsgA0GACGoiAiAAEF4gA0GAA2oiBCACEF4gAiABEF4gA0GABGoiBSACEF4gAiAKEF4gBCACEJoBIAQQqQEgAiALEF4gBSACEJoBIAUQqQEgA0GABWoiByAEEF4gByAFEBEgA0GABmoiBiADEF4gBiADQYABaiIIEJoBIAYQNiAHIAYQmgEgAiAAEF4gBCACEJkBIAIgAEGABWoiDBBeIAQgAhCaASAEEKkBIAIgARBeIAUgAhCZASACIAFBgAVqIg0QXiAFIAIQmgEgBRCpASADQYAHaiIJIAQQXiAJIAUQESAGIAMQmQEgBiADQYACaiIBEJoBIAYQNiAJIAYQmgEgAiAKEF4gBCACEJkBIAIgDBBeIAQgAhCaASAEEKkBIAIgCxBeIAUgAhCZASACIA0QXiAFIAIQmgEgBRCpASACIAQQXiACIAUQESAGIAgQmQEgBiABEJoBIAYQNiACIAYQmgEgCBB8IAMgCBCaASAAIAMgBxClASABEHwgARCpASAAQYACaiIEQYABaiABEJkBIAQQtgEgAhCpASACEHwgAEGABGoiASACIAkQpQEgABCwASABELABIABBBDYCgAYgA0GACWokAAuHBwEFfyAAENUBIgAgABDLASICENIBIQECQAJAAkAgABDMAQ0AIAAoAgAhAwJAIAAQxAFFBEAgAiADaiECIAAgAxDTASIAQfS+wAAoAgBHDQEgASgCBEEDcUEDRw0CQey+wAAgAjYCACAAIAIgARCDAQ8LIAIgA2pBEGohAAwCCyADQYACTwRAIAAQFwwBCyAAQQxqKAIAIgQgAEEIaigCACIFRwRAIAUgBDYCDCAEIAU2AggMAQtB3LvAAEHcu8AAKAIAQX4gA0EDdndxNgIACwJAIAEQvAEEQCAAIAIgARCDAQwBCwJAAkACQEH4vsAAKAIAIAFHBEAgAUH0vsAAKAIARw0BQfS+wAAgADYCAEHsvsAAQey+wAAoAgAgAmoiATYCACAAIAEQoAEPC0H4vsAAIAA2AgBB8L7AAEHwvsAAKAIAIAJqIgE2AgAgACABQQFyNgIEIABB9L7AACgCAEYNAQwCCyABEMsBIgMgAmohAgJAIANBgAJPBEAgARAXDAELIAFBDGooAgAiBCABQQhqKAIAIgFHBEAgASAENgIMIAQgATYCCAwBC0Hcu8AAQdy7wAAoAgBBfiADQQN2d3E2AgALIAAgAhCgASAAQfS+wAAoAgBHDQJB7L7AACACNgIADAMLQey+wABBADYCAEH0vsAAQQA2AgALQZS/wAAoAgAgAU8NAUGAgHxBCEEIEKMBQRRBCBCjAWpBEEEIEKMBamtBd3FBA2siAEEAQRBBCBCjAUECdGsiASAAIAFJG0UNAUH4vsAAKAIARQ0BQQhBCBCjASEAQRRBCBCjASEBQRBBCBCjASECQQACQEHwvsAAKAIAIgQgAiABIABBCGtqaiICTQ0AQfi+wAAoAgAhAUGEv8AAIQACQANAIAEgACgCAE8EQCAAEMYBIAFLDQILIAAoAggiAA0AC0EAIQALIAAQzQENACAAQQxqKAIAGgwAC0EAEBlrRw0BQfC+wAAoAgBBlL/AACgCAE0NAUGUv8AAQX82AgAPCyACQYACSQ0BIAAgAhAWQZy/wABBnL/AACgCAEEBayIANgIAIAANABAZGg8LDwsgAkEDdiIDQQN0QeS7wABqIQECf0Hcu8AAKAIAIgJBASADdCIDcQRAIAEoAggMAQtB3LvAACACIANyNgIAIAELIQMgASAANgIIIAMgADYCDCAAIAE2AgwgACADNgIIC4kHAgV+EH8jAEGQAmsiCSQAIABB6AAQ0AEhEiAJQTBqIgBB4AEQ0AEaA0AgCEE4RgRAIAFBCGohFCACQQhqIRUgAiENIAEhE0EBIQsgCSkDMCIDIQYgCUE4aikDACIEIQcFIAlBIGogAiAIaikDACIDIANCP4cgASAIaikDACIDIANCP4cQLyAAIAlBKGopAwA3AwggACAJKQMgNwMAIABBEGohACAIQQhqIQgMAQsLA0AgEiAQQQN0aiADQv//////////A4M3AwAgBEIGhiADQjqIhCEDIARCOochBAJAAkACQCALQQdGBEBBByEKQQAhDkEGIQsMAQsgECALQQF2IgBrIQwgDSAAQQN0IhFrIRYgEyARayEXIAQgCUEwaiALQQR0aiIKQQhqKQMAIAd8IAopAwAiBCAGfCIGIARUrXwiB3wgAyAGfCIDIAZUrXwhBCALQQFqIQ9BMCEIIBQhCiAVIQ4DQCAAIAtPDQMgCCARRg0CIAxBB0kEQCAJQRBqIAggFmpBMGspAwAgDiARaikDAH0iBSAFQj+HIAogEWopAwAgCCAXakEwaykDAH0iBSAFQj+HEC8gCSkDECIFIAN8IgMgBVStIAlBGGopAwAgBHx8IQQgAEEBaiEAIAxBAWshDCAKQQhqIQogDkEIaiEOIAhBCGshCAwBCwsgDEEHQdSbwAAQOwALA0ACQCAKQQ1HBEAgCyAKQQF2Ig1rIQwgDiANQQN0IgBrIQggAEEIaiEAIAQgByAKQQR0IAlqQUBqIg9BCGopAwB9IAYgDykDACIEVK19Igd8IAYgBH0iBiADfCIDIAZUrXwhBCAKQQFqIQ8DQCANQQVLDQIgDEEGTQRAIAkgAiAIakEwaikDACAAIAJqKQMAfSIFIAVCP4cgACABaikDACABIAhqQTBqKQMAfSIFIAVCP4cQLyAJKQMAIgUgA3wiAyAFVK0gCUEIaikDACAEfHwhBCANQQFqIQ0gCEEIayEIIAxBAWshDCAAQQhqIQAMAQsLIAxBB0Hkm8AAEDsACyASIAM3A2ggCUGQAmokAA8LIBIgCkEDdGogA0L//////////wODNwMAIARCBoYgA0I6iIQhAyAOQQhqIQ4gC0EBaiELIARCOochBCAPIQoMAAsAC0EHQQdBxJvAABA7AAsgDUEIaiENIBNBCGohEyAQQQFqIRAgDyELDAALAAuqAwEBfyMAQdAGayIGJAAgBkHAABDQASIGQUBrQagCENABEEQDQCABBEAgBkFAa0EAEDwgAUEBayEBDAEFIAIEQCAGQUBrIAIgAxB0CwsLIAQEQCAGQUBrIAQgBRB0CyAGQZAGaiIDQgA3AAAgA0EYakIANwAAIANBEGpCADcAACADQQhqQgA3AAAgBkFAayIBKAIEIQQgASgCACEFQYABIQIDQCABIAIQPEEAIQIgASgCAEH/A3FBwANHDQALIAFB5ABqIAU2AgAgAUHgAGogBDYCACABEA9BACEEA0AgAkEgRgRAIAEQRAUgAiADaiABIAJBfHFqQQhqKAIAIARBf3NBGHF2OgAAIARBCGohBCACQQFqIQIMAQsLQQAhAQNAIAFBIEcEQCABIAZqIAZBkAZqIAFqLQAAOgAAIAFBAWohAQwBCwtBACEBAkACQANAAkAgAUEgRg0DIAFBwABGDQAgAUHAAEYNAiAAIAFqIAEgBmotAAA6AAAgAUEBaiEBDAELC0HAAEHAAEH8qsAAEDsAC0HAAEHAAEGMq8AAEDsACyAGQdAGaiQAC74EAQl/IwBBgAxrIgIkACACIAAQjAEgAkGAAmoiCUE4ENABGiACQQE2ArgCIAJBwAJqQTgQ0AEaIAJB+AJqQQE2AgAgAkGAA2pBOBDQARogAkG4A2pBATYCACACQcADakE4ENABGiACQfgDakEBNgIAIAJBgARqIgYgAEGAAmoiBxCMASACQYAGaiIFQTgQ0AEaIAJBATYCuAYgAkHABmpBOBDQARogAkH4BmpBATYCACACQYAHakE4ENABGiACQbgHakEBNgIAIAJBwAdqQTgQ0AEaIAJB+AdqQQE2AgAgAkGACGoiAyAAEIwBIAJBgApqIgQgARCMASACIAEQGCAGIAFBgAJqIggQGCADIAcQlwEgBCAIEJcBIAMQsAEgBBCwASAJIAMQlgEgCSAEEBggAyAHEJYBIAMgAEGABGoiChCXASAEIAgQlgEgBCABQYAEaiIIEJcBIAMQsAEgBBCwASAFIAMQlgEgBSAEEBggAyACEJYBIAMQKyAEIAYQlgEgBBArIAkgAxCXASAHIAkQlgEgByAEEJcBIAUgBBCXASAGIAMQlwEgAyAAEJYBIAMgChCXASADELABIAQgARCWASAEIAgQlwEgBBCwASADIAQQGCAGIAMQlwEgAyAKEJYBIAMgCBAYIAQgAxCWASAEECsgCiAGEJYBIAogBBCXASAFIAQQlwEgAxBkIAcgAxCXASAFELABIAUQZCAAIAIQlgEgACAFEJcBIABBBTYCgAYgABCdASACQYAMaiQAC4oEAQp/IwBBgAhrIgIkACACIAAQXiACIAEQESACQYABaiIHIABBgAFqIgkQXiAHIAFBgAFqIgQQESACQYACaiIGIABBgAJqIgoQXiAGIAFBgAJqIgsQESACQYADaiIIIAAQXiAIIAkQmgEgCBCpASACQYAEaiIFIAEQXiAFIAQQmgEgBRCpASAIIAUQESAFIAIQmQEgBSAHEJoBIAggBRB7IAgQqQEgBSAJEJkBIAUgChCaASAFEKkBIAJBgAVqIgMgBBBeIAMgCxCaASADEKkBIAUgAxARIAMgBxCZASADIAYQmgEgBSADEHsgBRCpASADIAAQmQEgAyAKEJoBIAMQqQEgAkGABmoiBCABEF4gBCALEJoBIAQQqQEgAyAEEBEgBCACEJkBIAQgBhCaASAEIAMQvwEgBBCpASADIAIQmQEgAyACEJoBIAIgAxCaASACEKkBIAZBDBCrASAGEHwgBhCpASACQYAHaiIBIAcQXiABIAYQmgEgARCpASAHIAYQeyAHEKkBIARBDBCrASAEEHwgBBCpASADIAQQmQEgAyAFEBEgBiAIEJkBIAYgBxARIAMgBhC/ASAEIAIQESAHIAEQESAEIAcQmgEgAiAIEBEgASAFEBEgASACEJoBIAAgAxCZASAAEKkBIAkgBBCZASAJEKkBIAogARCZASAKEKkBIAJBgAhqJAAL8gMBCn8jAEGABGsiAiQAIAIgABCQASACIAEQSiACQUBrIgYgAEFAayIJEJABIAYgAUFAayIEEEogAkGAAWoiByAAQYABaiIKEJABIAcgAUGAAWoiCxBKIAJBwAFqIgggABCQASAIIAkQdyAIEEIgAkGAAmoiBSABEJABIAUgBBB3IAUQQiAIIAUQSiAFIAIQrgEgBSAGEHcgCCAFEH4gAkHAAWoQQiAFIAkQrgEgBSAKEHcgAkGAAmoQQiACQcACaiIDIAQQkAEgAyALEHcgAxBCIAUgAxBKIAMgBhCuASADIAcQdyAFIAMQfiACQYACahBCIAMgABCuASADIAoQdyACQcACahBCIAJBgANqIgQgARCQASAEIAsQdyAEEEIgAyAEEEogBCACEK4BIAQgBxB3IAQgAxDCASACQYADahBCIAMgAhCuASADIAIQdyACIAMQdyACEEIgB0EMEDQgAkHAA2oiASAGEJABIAEgBxB3IAEQQiAGIAcQfiAGEEIgBEEMEDQgAyAEEK4BIAMgBRBKIAcgCBCuASAHIAYQSiADIAcQwgEgBCACEEogBiABEEogBCAGEHcgAiAIEEogASAFEEogASACEHcgACADEK4BIAAQQiAJIAQQrgEgCRBCIAogARCuASAKEEIgAkGABGokAAu/BQEJfyMAQYALayIHJAAgB0E4ENABIgVBATYCOCAFQUBrQTgQ0AEaIAVB+ABqQQE2AgAgBUGAAWpBOBDQARogBUG4AWpBATYCACAFQcABakE4ENABGiAFQfgBakEBNgIAIAVBgAJqIg1BOBDQARogBUEBNgK4AiAFQcACakE4ENABGiAFQfgCakEBNgIAIAVBgANqQTgQ0AEaIAVBuANqQQE2AgAgBUHAA2pBOBDQARogBUH4A2pBATYCACAFQYAEaiILQTgQ0AEaIAVBATYCuAQgBUHABGpBOBDQARogBUH4BGpBATYCACAFQYAFakE4ENABGiAFQbgFakEBNgIAIAVBwAVqQTgQ0AEaIAVB+AVqQQE2AgAgBUGABmoiCEE4ENABGiAFQQE2ArgGIAVBwAZqQTgQ0AEaIAVB+AZqQQE2AgAgBUGAB2oiCUE4ENABGiAFQQE2ArgHIAVBwAdqQTgQ0AEaIAVB+AdqQQE2AgAgBUGACGoiB0E4ENABGiAFQQE2ArgIIAVBwAhqQTgQ0AEaIAVB+AhqQQE2AgAjAEGAAmsiCiQAIApBgAFqIgYgARBeIAggBhCZASAGIAFBgAFqEF4gByAGEJkBIAYgAUGAAmoiDBBeIAogBhBeIAYgDBBeIAkgBhCZASAGIAJBgAFqIgwQXiAKIAYQESAGIAIQXiAJIAYQESAIIAkQeyAIEKkBIAcgChB7IAcQqQEgCiAIEJkBIAgQfCAIEKkBIAYgDBBeIAogBhARIAkgBxCZASAGIAIQXiAJIAYQESAJIAoQeyAJEKkBIAcQNiAHEKkBIAEgAhAIIApBgAJqJAAgByADEKoBIAggBBCqASAFQYAJaiIBIAggCRCVASAFIAEQlgEgASAHEKEBIAsgARCWASALEGQgACAFIA0gCxB1IABBAzYCgAYgBUGAC2okAAuJBQEIfyMAQYALayIFJAAgBUE4ENABIgRBATYCOCAEQUBrQTgQ0AEaIARB+ABqQQE2AgAgBEGAAWpBOBDQARogBEG4AWpBATYCACAEQcABakE4ENABGiAEQfgBakEBNgIAIARBgAJqIgtBOBDQARogBEEBNgK4AiAEQcACakE4ENABGiAEQfgCakEBNgIAIARBgANqQTgQ0AEaIARBuANqQQE2AgAgBEHAA2pBOBDQARogBEH4A2pBATYCACAEQYAEaiIKQTgQ0AEaIARBATYCuAQgBEHABGpBOBDQARogBEH4BGpBATYCACAEQYAFakE4ENABGiAEQbgFakEBNgIAIARBwAVqQTgQ0AEaIARB+AVqQQE2AgAgBEGABmoiBkE4ENABGiAEQQE2ArgGIARBwAZqQTgQ0AEaIARB+AZqQQE2AgAgBEGAB2oiBUE4ENABGiAEQQE2ArgHIARBwAdqQTgQ0AEaIARB+AdqQQE2AgAgBEGACGoiCEE4ENABGiAEQQE2ArgIIARBwAhqQTgQ0AEaIARB+AhqQQE2AgAjAEGAAmsiByQAIAdBgAFqIgkgARBeIAggCRCZASAJIAFBgAFqEF4gByAJEF4gCSABQYACahBeIAUgCRCZASAGIAcQmQEgBiAFEBEgCBAtIAcQLSAFEC0gBhC4ASAGEDYgBhCpASAGEHwgBhCpASAFQQwQqwEgCEEDEKsBIAUQfCAFEKkBIAUgBxB7IAUQqQEgARASIAdBgAJqJAAgCCACEKoBIAYgAxCqASAEQYAJaiIBIAYgBRCVASAEIAEQlgEgASAIEKEBIAogARCWASAKEGQgACAEIAsgChB1IABBAzYCgAYgBEGAC2okAAuBBQELfyMAQTBrIgIkACACQSRqQai1wAA2AgAgAkEDOgAoIAJCgICAgIAENwMIIAIgADYCICACQQA2AhggAkEANgIQAkACQAJAIAEoAggiCkUEQCABQRRqKAIAIgRFDQEgASgCACEDIAEoAhAhACAEQQFrQf////8BcUEBaiIHIQUDQCADQQRqKAIAIgQEQCACKAIgIAMoAgAgBCACKAIkKAIMEQUADQQLIAAoAgAgAkEIaiAAQQRqKAIAEQQADQMgAEEIaiEAIANBCGohAyAFQQFrIgUNAAsMAQsgAUEMaigCACIARQ0AIABBBXQhCyAAQQFrQf///z9xQQFqIQcgASgCACEDA0AgA0EEaigCACIABEAgAigCICADKAIAIAAgAigCJCgCDBEFAA0DCyACIAUgCmoiBEEcai0AADoAKCACIARBBGopAgBCIIk3AwggBEEYaigCACEGIAEoAhAhCEEAIQlBACEAAkACQAJAIARBFGooAgBBAWsOAgACAQsgBkEDdCAIaiIMKAIEQQ9HDQEgDCgCACgCACEGC0EBIQALIAIgBjYCFCACIAA2AhAgBEEQaigCACEAAkACQAJAIARBDGooAgBBAWsOAgACAQsgAEEDdCAIaiIGKAIEQQ9HDQEgBigCACgCACEAC0EBIQkLIAIgADYCHCACIAk2AhggCCAEKAIAQQN0aiIAKAIAIAJBCGogACgCBBEEAA0CIANBCGohAyALIAVBIGoiBUcNAAsLQQAhACAHIAEoAgRJIgNFDQEgAigCICABKAIAIAdBA3RqQQAgAxsiASgCACABKAIEIAIoAiQoAgwRBQBFDQELQQEhAAsgAkEwaiQAIAAL1wQBBH8gACABENIBIQICQAJAAkAgABDMAQ0AIAAoAgAhAwJAIAAQxAFFBEAgASADaiEBIAAgAxDTASIAQfS+wAAoAgBHDQEgAigCBEEDcUEDRw0CQey+wAAgATYCACAAIAEgAhCDAQ8LIAEgA2pBEGohAAwCCyADQYACTwRAIAAQFwwBCyAAQQxqKAIAIgQgAEEIaigCACIFRwRAIAUgBDYCDCAEIAU2AggMAQtB3LvAAEHcu8AAKAIAQX4gA0EDdndxNgIACyACELwBBEAgACABIAIQgwEMAgsCQEH4vsAAKAIAIAJHBEAgAkH0vsAAKAIARw0BQfS+wAAgADYCAEHsvsAAQey+wAAoAgAgAWoiATYCACAAIAEQoAEPC0H4vsAAIAA2AgBB8L7AAEHwvsAAKAIAIAFqIgE2AgAgACABQQFyNgIEIABB9L7AACgCAEcNAUHsvsAAQQA2AgBB9L7AAEEANgIADwsgAhDLASIDIAFqIQECQCADQYACTwRAIAIQFwwBCyACQQxqKAIAIgQgAkEIaigCACICRwRAIAIgBDYCDCAEIAI2AggMAQtB3LvAAEHcu8AAKAIAQX4gA0EDdndxNgIACyAAIAEQoAEgAEH0vsAAKAIARw0BQey+wAAgATYCAAsPCyABQYACTwRAIAAgARAWDwsgAUEDdiICQQN0QeS7wABqIQECf0Hcu8AAKAIAIgNBASACdCICcQRAIAEoAggMAQtB3LvAACACIANyNgIAIAELIQIgASAANgIIIAIgADYCDCAAIAE2AgwgACACNgIIC+UDAQN/IwBB0CJrIgMkACADQcAWaiIEQcitwAAQSSADQcgcaiIFQYCuwAAQSSADQQhqIAQgBRBLIANBiAFqQTgQ0AEaIANBwAFqQTgQ0AEaIANB+AFqED0CQCACEIYBBEAgABBVDAELIANB+ARqIgQQPSAEIAEQfSAEEEcgA0H4B2oiARBnIAEgAhB4IAEQRiADQcgcaiICIAEQkAEgA0G4CWogAhCQASACIANBuAhqEJABIANB+AlqIAIQkAEgA0G4CmoiARA9IANBuA1qEFUgASAEEH0gA0HAE2oiARA9IAEgBBB9IAEQogEgA0HAAWogA0GIAWoQUEECayECA0AgAkEBakEBTQRAIANBuA1qIgEQngEgACABQYgGENEBGgUgA0G4DWoQGiADQcAWaiADQbgKaiADQbgJaiADQfgJahALAkACQAJAIANBwAFqIAIQUyADQYgBaiACEFNrQQFqDgMBAgACCyADQcgcaiIBIANBuApqIANB+ARqIANBuAlqIANB+AlqEAogA0HAFmogARADDAELIANByBxqIgEgA0G4CmogA0HAE2ogA0G4CWogA0H4CWoQCiADQcAWaiABEAMLIAJBAWshAiADQbgNaiADQcAWahABDAELCwsgA0HQImokAAvBAwEVfwNAIANBwAFGBEACQCAAQShqIQsgAEEUaigCACIMIQggAEEQaigCACINIQIgAEEMaigCACIOIQEgACgCCCIPIQMgAEEYaigCACIQIQogAEEcaigCACIRIQQgAEEgaigCACISIQcgAEEkaigCACITIQYDQCAHIQkgBCEHIAohBCAFQYACRg0BIAEgAnEhFCABIAJzIRUgBSALaigCACAFQcCiwABqKAIAIAkgBEF/c3EgBCAHcXIgBmogBEEadyAEQRV3cyAEQQd3c2pqaiIGIAhqIQogBUEEaiEFIAIhCCABIQIgAyIBQR53IAFBE3dzIAFBCndzIBQgASAVcXNqIAZqIQMgCSEGDAALAAsFIAAgA2oiAkHoAGogAkEoaigCACACQcwAaigCACACQeAAaigCACIBQQ93IAFBDXdzIAFBCnZzamogAkEsaigCACIBQRl3IAFBDndzIAFBA3ZzajYCACADQQRqIQMMAQsLIAAgBiATajYCJCAAIAkgEmo2AiAgACAHIBFqNgIcIAAgBCAQajYCGCAAIAggDGo2AhQgACACIA1qNgIQIAAgASAOajYCDCAAIAMgD2o2AggL5AEBAn8jAEGAA2siAyQAIAMQPSAAIAEgAkEfdSIEIAJzIARBf3NqQQJtIgJBAWtBH3YQbyAAIAFBgANqIAJBAXNBAWtBH3YQbyAAIAFBgAZqIAJBAnNBAWtBH3YQbyAAIAFBgAlqIAJBA3NBAWtBH3YQbyAAIAFBgAxqIAJBBHNBAWtBH3YQbyAAIAFBgA9qIAJBBXNBAWtBH3YQbyAAIAFBgBJqIAJBBnNBAWtBH3YQbyAAIAFBgBVqIAJBB3NBAWtBH3YQbyADIAAQfSADEKIBIAAgAyAEQQFxEG8gA0GAA2okAAvlAwEIfyMAQZAGayICJAAgAEFAayEIAkAgAUH4AGooAgAgASgCOGqsIABB+ABqKAIAIgcgACgCOCIEaqx+Qv///w9XDQAgBEEBSgR/IAAQHiAAKAJ4BSAHC0EBTA0AIAgQHgsgAkHYpMAAEEkgAkE4aiIHQfAAENABGiACIQNBACECA0AgAkE4RgRAAkAgB0E4aiEEQQAhAgNAIAJBOEYNASACIARqIAIgA2opAwA3AwAgAkEIaiECDAALAAsFIAIgB2pCADcDACACQQhqIQIMAQsLIANBqAFqIgYgABBdIANB4AFqIgUgARBdIANBmAJqIgIgACABEAUgA0GIA2oiBCAIIAFBQGsiARAFIAYgCBBgIAYQQiAFIAEQYCAFEEIgA0H4A2oiCSAGIAUQBUEAIQEgA0HoBGoiBkHwABDQASEFA0AgAUHwAEcEQCABIAVqIAEgAmopAwA3AwAgAUEIaiEBDAELCyAGIAQQYkEAIQEDQCABQfAARwRAIAEgBGoiBSABIAdqKQMAIAUpAwB9NwMAIAFBCGohAQwBCwsgAiAEEGIgAhBIIAkgBhBjIAkQSCADQdgFaiIBIAIQayAAIAEQaiAAQQM2AjggASAJEGsgCCABEGogAEECNgJ4IANBkAZqJAALowIBCH8jAEGABmsiAiQAIAIgAEGAAWoiBxBeIAJBgAFqIgQgBxBeIAQQLSACQYACaiIFIAIQXiAFIABBgAJqIgMQESACQYADaiIBIAMQXiABEC0gAyAEEJkBIAMgBBCaASADEKkBIAMQuAEgAxC4ASADEKkBIAFBDBCrASABEHwgARCpASACQYAEaiIIIAEQXiAIIAMQESACQYAFaiIGIAQQXiAGIAEQmgEgBhCpASADIAUQESAFIAEQmQEgBSABEJoBIAEgBRCaASABEKkBIAQgARB7IAQQqQEgBiAEEBEgBiAIEJoBIAUgABCZASAFIAIQESAAIAQQmQEgABCpASAAIAUQESAAELgBIAAQqQEgByAGEJkBIAcQqQEgAkGABmokAAu8AgEGfyMAQYAIayIBJAAgASAAEIwBIAFBgAJqIgMgAEGABGoiBRCMASABQYAEaiIEIABBgAJqIgYQjAEgAUGABmoiAkE4ENABGiABQQE2ArgGIAFBwAZqQTgQ0AEaIAFB+AZqQQE2AgAgAUGAB2pBOBDQARogAUG4B2pBATYCACABQcAHakE4ENABGiABQfgHakEBNgIAIAAQISACIAAQlgEgAiAAEJcBIAAgAhCXASAAELABIAEQyQEgARCzASAAIAEQlwEgAxAhIAMQZCACIAMQlgEgAiADEJcBIAMgAhCXASADELABIAQQISACIAQQlgEgAiAEEJcBIAQgAhCXASAEELABIAYQsgEgBhCzASAFEMkBIAUQswEgBiADEJcBIAUgBBCXASAAQQU2AoAGIAAQnAEgAUGACGokAAv/AQEHfyMAQcACayIBJAAgASAAQUBrIgYQkAEgARBMIAFBQGsiAyAGEJABIAMgAEGAAWoiAhBKIAFBgAFqIgQgAhCQASAEEEwgAiABEK4BIAIgARB3IAIQQiACEIIBIAIQggEgAhBCIARBDBA0IAFBwAFqIgcgBBCQASAHIAIQSiABQYACaiIFIAEQkAEgBSAEEHcgBRBCIAIgAxBKIAMgBBCuASADIAQQdyAEIAMQdyABIAQQfiABEEIgBSABEEogBSAHEHcgAyAAEK4BIAMgBhBKIAAgARCuASAAEEIgACADEEogABCCASAAEEIgBiAFEK4BIAYQQiABQcACaiQAC84CAgd/An4CQAJAAkBBDSABQTpuIgJrIgRBDU0EQEEMIAJrIgNBDk8NASAAIAAgA0EDdGopAwBBOiABIAJBOmxrIgNrrSIKhyAAIARBA3RqKQMAIAOtIgmGhDcDaCAEQQ1rIQUgAEHgAGohBCACQQFqIQZBACACQQN0ayEHQQshAwNAAkAgA0ECaiAGTQRAIAFBrAZPDQEgACACQQN0aiAAKQMAIAmGQv//////////A4M3AwADQCACRQ0HIABCADcDACACQQFrIQIgAEEIaiEADAALAAsgAyAFakEOTw0EIAQgBCAHaiIIQQhrKQMAIAqHIAgpAwAgCYZC//////////8Dg4Q3AwAgA0EBayEDIARBCGshBAwBCwsgAkEOQYCywAAQOwALIARBDkHQscAAEDsACyADQQ5B4LHAABA7AAtBf0EOQfCxwAAQOwALC6cCAQR/IABCADcCECAAAn9BACABQYACSQ0AGkEfIAFB////B0sNABogAUEGIAFBCHZnIgNrdkEBcSADQQF0a0E+agsiBDYCHCAEQQJ0Qey9wABqIQMgACECAkACQAJAAkBB4LvAACgCACIAQQEgBHQiBXEEQCADKAIAIQMgBBCfASEAIAMQywEgAUcNASADIQAMAgtB4LvAACAAIAVyNgIAIAMgAjYCAAwDCyABIAB0IQQDQCADIARBHXZBBHFqQRBqIgUoAgAiAEUNAiAEQQF0IQQgACIDEMsBIAFHDQALCyAAKAIIIgEgAjYCDCAAIAI2AgggAiAANgIMIAIgATYCCCACQQA2AhgPCyAFIAI2AgALIAIgAzYCGCACIAI2AgggAiACNgIMC7YCAQV/IAAoAhghBAJAAkAgACAAKAIMRgRAIABBFEEQIABBFGoiASgCACIDG2ooAgAiAg0BQQAhAQwCCyAAKAIIIgIgACgCDCIBNgIMIAEgAjYCCAwBCyABIABBEGogAxshAwNAIAMhBSACIgFBFGoiAygCACICRQRAIAFBEGohAyABKAIQIQILIAINAAsgBUEANgIACwJAIARFDQACQCAAIAAoAhxBAnRB7L3AAGoiAigCAEcEQCAEQRBBFCAEKAIQIABGG2ogATYCACABDQEMAgsgAiABNgIAIAENAEHgu8AAQeC7wAAoAgBBfiAAKAIcd3E2AgAPCyABIAQ2AhggACgCECICBEAgASACNgIQIAIgATYCGAsgAEEUaigCACIARQ0AIAFBFGogADYCACAAIAE2AhgLC+UBAQZ/IwBBgARrIgIkACACIAAQXiACQYABaiIFIABBgAFqIgYQXiACQYACaiIDQTgQ0AEaIAJBATYCuAIgAkHAAmpBOBDQARogAkH4AmpBATYCACACQYADaiIEIAYQXiACIAEQESAFIAFBgAFqIgcQESADIAcQmQEgAyABEJoBIAQgABCaASADEKkBIAQQqQEgBCADEBEgAyACEJkBIAMQNiAEIAMQmgEgBBCpASADIAUQmQEgAxA2IAYgBBCZASAGIAMQmgEgBRB8IAAgBRCZASAAIAIQmgEgABCwASACQYAEaiQAC28BDH9BjL/AACgCACICRQRAQZy/wABB/x82AgBBAA8LQYS/wAAhBgNAIAIiASgCCCECIAEoAgQhAyABKAIAIQQgAUEMaigCABogASEGIAVBAWohBSACDQALQZy/wAAgBUH/HyAFQf8fSxs2AgBBAAuAAgEGfyMAQYAIayIBJAAgACgCgAZBAUcEQCABIAAQjAEgAUGAAmoiAiAAQYACaiIEEIwBIAFBgARqIgUgAEGABGoiAxCMASABQYAGaiIGIAAQjAEgARAhIAIgAxAYIAIQswEgAhCwASAFECEgBiAEEBggBhCzASADIAAQlwEgAyAEEJcBIAMQsAEgAxAhIAAgARCWASABIAIQlwEgARCwASABIAUQlwEgASAGEJcBIAEQsAEgARArIAIQZCAFEGQgACACEJcBIAQgBRCWASAEIAYQlwEgAyABEJcBIABBBEEFIAAoAoAGQX5xQQJGGzYCgAYgABCdAQsgAUGACGokAAuZAgEBfyMAQYANayIDJAAgAyABEGkgAxCdASADQYgGaiIBIAIQXSABEEIgA0HABmoiAiABEF0gAkEDECkaIAIQQiADQfgGaiADEGkCQCACEFdFBEAgA0HABmoQKkECayECA0AgAkEBakEBTQRAIANB+AZqIgEQnAEMAwUgA0H4BmoQEwJAAkACQCADQcAGaiACEFMgA0GIBmogAhBTa0EBag4DAQIAAgsgA0H4BmogAxAHDAELIAMQngEgA0H4BmogAxAHIAMQngELIAJBAWshAgwBCwALAAsgA0H4BmoiARC3ASABQYABahC2ASABQYACahCxASABQYAEahCxASABQQE2AoAGCyAAIAFBiAYQ0QEaIANBgA1qJAALhgICBH8BfiMAQTBrIgIkACABQQRqIQQgASgCBEUEQCABKAIAIQMgAkEQaiIFQQA2AgAgAkIBNwMIIAIgAkEIajYCFCACQShqIANBEGopAgA3AwAgAkEgaiADQQhqKQIANwMAIAIgAykCADcDGCACQRRqIAJBGGoQDBogBEEIaiAFKAIANgIAIAQgAikDCDcCAAsgAkEgaiIDIARBCGooAgA2AgAgAUEMakEANgIAIAQpAgAhBiABQgE3AgQgAiAGNwMYQQxBBBC5ASIBRQRAQQxBBBDPAQALIAEgAikDGDcCACABQQhqIAMoAgA2AgAgAEGEt8AANgIEIAAgATYCACACQTBqJAAL5AEBAn8jAEHAAWsiAyQAIAMQZyAAIAEgAkEfdSIEIAJzIARBf3NqQQJtIgJBAWtBH3YQbiAAIAFBwAFqIAJBAXNBAWtBH3YQbiAAIAFBgANqIAJBAnNBAWtBH3YQbiAAIAFBwARqIAJBA3NBAWtBH3YQbiAAIAFBgAZqIAJBBHNBAWtBH3YQbiAAIAFBwAdqIAJBBXNBAWtBH3YQbiAAIAFBgAlqIAJBBnNBAWtBH3YQbiAAIAFBwApqIAJBB3NBAWtBH3YQbiADIAAQeCADEKQBIAAgAyAEQQFxEG4gA0HAAWokAAvDAwIGfwN+IwBB8ABrIgEkACABQcCywAAQSSABQThqIAEQXSAAEEICQAJAAkAgAQJ/IAAoAjgiAkEQTARAIAJBAWsQNQwBCyABKQMwIghCAXwiByAIVA0BIAApAzAiCEKAgICAgICAgIB/USAHQn9RcQ0CIAFBOGoiAiAIIAd/pxApIQcgASABKQNoIAdCOoZ8NwNoIAAgAhBhIAAQQkECCyIEECgDQCAERQ0DQQAhAyABIAEpAwgiCEI5hkKAgICAgICAgAKDIAEpAwBCAYeEIgc3AwAgACkDACAHfSEHIABBCGohBSAAIAFBOGoiAkEBA38gAiADaiAHQv//////////A4M3AwAgB0I6hyEHIANBKEYEfyABIAEpAzBCAYciCDcDMCACIAApAzAgCH0gB3wiBzcDMCAHQj+IpwUgASADaiIGQQhqIAhCAYcgBkEQaikDACIIQjmGQoCAgICAgICAAoOEIgk3AwAgAyAFaikDACAHfCAJfSEHIANBCGohAwwBCwtrEDAgBEEBayEEDAALAAtB4LPAAEEZQcSzwAAQWQALQYC0wABBH0HEs8AAEFkACyAAQQE2AjggAUHwAGokAAvuAQECfyMAQbABayIDJAAgA0EwENABIQMCQAJAA0AgAkEwRgRAIANBMGogAxBwIAFBMGohAUEAIQIDQCACQTBGDQMgAkEwRg0EIAIgA2ogASACai0AADoAACACQQFqIQIMAAsACyACQeAARwRAIAIgA2ogASACai0AADoAACACQQFqIQIMAQsLQeAAQeAAQYCmwAAQOwALIANB8ABqIgEgAxBwIABBOBDQASIAQQE2AjggAEFAa0E4ENABIABB+ABqQQE2AgAgACABEK4BIANBMGoQrgEgA0GwAWokAA8LIAJBMGpB4ABBkKbAABA7AAuPAgEDfyMAQSBrIgUkAEEBIQZB2LvAAEHYu8AAKAIAIgdBAWo2AgACQEGgv8AALQAABEBBpL/AACgCAEEBaiEGDAELQaC/wABBAToAAAtBpL/AACAGNgIAAkACQCAHQQBIIAZBAktyDQAgBSAEOgAYIAUgAzYCFCAFIAI2AhBBzLvAACgCACICQQBIDQBBzLvAACACQQFqIgI2AgBBzLvAAEHUu8AAKAIAIgMEf0HQu8AAKAIAIAUgACABKAIQEQAAIAUgBSkDADcDCCAFQQhqIAMoAhQRAABBzLvAACgCAAUgAgtBAWs2AgAgBkEBSw0AIAQNAQsACyMAQRBrIgIkACACIAE2AgwgAiAANgIIAAucAQEEfyMAQYADayICJAAgAiAAEF4gAkGAAWoiASAAQYABaiIEEF4gAkGAAmoiAyAAEF4gAyAEEBEgAiAEEJoBIAEQfCABIAAQmgEgAhCpASABEKkBIAAgAhCZASAAIAEQESABIAMQmQEgARB8IAEgAxCaASABEKkBIAEQNiAAIAEQmgEgAxC4ASAEIAMQmQEgABCwASACQYADaiQAC7kBAQJ/IwBBIGsiAyQAAkAgASABIAJqIgFLDQAgAEEEaigCACICQQF0IgQgASABIARJGyIBQQggAUEISxshAQJAIAIEQCADQRhqQQE2AgAgAyACNgIUIAMgACgCADYCEAwBCyADQQA2AhALIAMgASADQRBqECYgAygCAARAIANBCGooAgAiAEUNASADKAIEIAAQzwEACyADKAIEIQIgAEEEaiABNgIAIAAgAjYCACADQSBqJAAPCxBlAAusAQECfyMAQYADayIDJAAgA0EIaiABEJABAkAgAgRAIANBCGogAhCuAQwBCyADQQhqEDoLIANByABqIgJB8LTAABBJIANBgAFqIAIQjgEgA0HAAWoiAiADQQhqIgQQkAEgAhBMIAIgARBKIAAgARCQASAAIAQQSiADQYACaiACEJABIAAQViEBIANBwAJqIgIgABCQASACEEMgAhBCIAAgAiABEHIgA0GAA2okAAueAQEFfyMAQYABayICJAAgAkE4ENABIgJBATYCOCACQUBrIgNBOBDQARogAkEBNgJ4IAIgABCuASACIAFBgAFqIgUQSiADIAEQrgEgAyAAQYABaiIGEEoCQCACIAMQWEUNACACIABBQGsQrgEgAiAFEEogAkFAayIAIAFBQGsQrgEgACAGEEogAiAAEFhFDQBBASEECyACQYABaiQAIAQLpwEBA38jAEEwayICJAAgAUEEaiEDIAEoAgRFBEAgASgCACEBIAJBEGoiBEEANgIAIAJCATcDCCACIAJBCGo2AhQgAkEoaiABQRBqKQIANwMAIAJBIGogAUEIaikCADcDACACIAEpAgA3AxggAkEUaiACQRhqEAwaIANBCGogBCgCADYCACADIAIpAwg3AgALIABBhLfAADYCBCAAIAM2AgAgAkEwaiQAC5UBAQJ/AkACQAJAAkACfwJAAkACf0EBIgMgAUEASA0AGiACKAIAIgRFDQEgAigCBCICDQQgAQ0CQQEMAwshA0EAIQEMBgsgAQ0AQQEMAQsgAUEBELkBCyICRQ0BDAILIAQgARCsASICDQELIAAgATYCBEEBIQEMAQsgACACNgIEQQAhAwsgACADNgIAIABBCGogATYCAAvvMwISfwV+IwBBMGsiDiQAIA5BEGogACABEFsgDiAOKAIUIgA2AhwgDiAOKAIQIgg2AhggDkEIaiACIAMQWyAOIA4oAgwiATYCJCAOIA4oAggiAzYCICAOIAQgBRBbIA4gDigCBCIFNgIsIA4gDigCACINNgIoIAAhBCMAQZAVayICJAAjAEGwBmsiCiQAIApBEGpBOBDQARogCkHQAGpBOBDQASEVIApBiAFqQQE2AgAgCkEBNgJIIApBkAFqIgBB2KTAABBJIAAQKiEPIApByAFqIhNBgAIQ0AEaIApB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ABBJAkACQAJAAkADQAJAIAxBMEYEQCAAIAAtAABBH3E6AAAgAEHoAGogABC+ASAEDQFBAEEAQZiBwAAQOwALIAQgDEYNAiAAIAxqIAggDGotAAA6AAAgDEEBaiEMDAELC0EAIQwgCCwAACIJQQBIDQIgCEEwaiEDIARBMCAEQTBLG0EwayEIA0AgDEEwRgRAIABBoAFqIgQgABC+ASMAQYABayIDJAAgARBnIAEgAEHoAGoQwAEgAUFAayIIIAQQwAEgAUGAAWoQygEgARBCIAMgARBPIANBQGsiBCAIEJABIAQQTCAEIAMQWEUEQCABEJIBCyADQYABaiQADAULIAggDEYNAiAAIAxqIAMgDGotAAA6AAAgDEEBaiEMDAALAAsgBCAEQYiBwAAQOwALIAxBMGogBEGogcAAEDsACyMAQcABayIDJAAgAEGgAWoiBBBnIANBOBDQASIDQQE2AjggBCAAQegAahDAASAEEEIgBEGAAWoQygEgA0FAayIIIAQQTwJAAkACQCAIIAMQWkEBRgRAIANBgAFqIgggA0FAayADECMgCBBWDQEMAgsgBBCSAQwCCyADQYABaiIIEEMgCBBCCyAEQUBrIANBgAFqEK4BCyADQcABaiQAIAlBIHEiA0EAIABB4AFqEE0iBEEBRxtBASADIARBAUdyGwRAIABBoAFqEKQBCyABIABBoAFqQcABENEBGgsgAEHgAmokAAJ/QQAhAyMAQcAFayIAJAACQCABEIYBDQAgAEEIaiIIQZCtwAAQSSAAQYAEaiIEQbiuwAAQSSAAQUBrIgkgBBCOASAAQYABaiIEEGcgBCABEHggBCAJEEogAEHAAmoiBCABIAgQvQEgASAEECQNACAAQYAEaiIEIABBwAJqIgEgAEEIahC9ASABIARBwAEQ0QEaIAEQpAEgAEGAAWogARAkRQ0AQQEhAwsgAEHABWokAEF/IANFDQAaIAJBwAFqEKQBIAJBgANqIQhBACEAIwBB4ARrIgEkACABQeAAENABIQECQCAFBEADQCAAQeAARgRAIAEgAS0AAEEfcToAACABQeAAaiABEB9BACEAAkAgDSwAACILQQBOBEAgDUHgAGohAyAFQeAAIAVB4ABLG0HgAGshBANAIABB4ABGBEAgAUHgAWoiACABEB8gCCABQeAAaiAAED8MAwsgACAERwRA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AWoQmQEgACAEEBEgAEGAAWoiASAFQYABahCZASABIAgQESAAIAEQeg0BC0EADAELQQELIQEgAEGAAmokACANQcAHaiQAQX8gAUUNABojAEHgA2siACQAIABBgAFqIgFBwKjAABBJIABBuAFqIgNB+KjAABBJIAAgASADEEsgAEHwAmoiAUGwqcAAEEkgAEGoA2oiA0HoqcAAEEkgAEHwAWoiBCABIAMQSyACQYAGaiIBIAAgBBA/IABB4ANqJAAgAkGACWohByACQYADaiEIIwBBkDRrIgAkACAAQYAoaiIDQcitwAAQSSAAQYguaiIEQYCuwAAQSSAAIAMgBBBLIABBgAFqQTgQ0AEaIABBuAFqQTgQ0AEaIABB8AFqED0CQCACQcABaiIEEIYBRQRAIAIQhgEEQCAHIAEgBBAODAILIABB8ARqIgMQPSADIAEQfSADEEcgAEHwB2oiBRBnIAUgBBB4IAUQRiAAQbAJaiIEED0gBCAIEH0gBBBHIABBsAxqIggQZyAIIAIQeCAIEEYgAEGILmoiASAFEJABIABB8A1qIAEQkAEgASAAQbAIahCQASAAQbAOaiABEJABIAEgCBCQASAAQfAOaiABEJABIAEgAEHwDGoQkAEgAEGwD2ogARCQASAAQfAPaiIBED0gAEHwEmoiBRA9IABB8BVqEFUgASADEH0gBSAEEH0gAEH4G2oiARA9IAEgAxB9IAEQogEgAEH4HmoiARA9IAEgBBB9IAEQogEgAEG4AWogAEGAAWoQUEECayEBA0AgAUEBakEBTQRAIABB8BVqIgEQngEgByABQYgGENEBGgwDBSAAQfAVaiIEEBogAEH4IWoiAyAAQfAPaiAAQfANaiAAQbAOahALIABBgChqIgUgAEHwEmogAEHwDmogAEGwD2oQCyADIAUQAyAEIAMQAQJAAkACQCAAQbgBaiABEFMgAEGAAWogARBTa0EBag4DAQIAAgsgAEGILmoiAyAAQfAPaiAAQfAEaiAAQfANaiAAQbAOahAKIABB+CFqIgQgA0GIBhDRARogAyAAQfASaiAAQbAJaiAAQfAOaiAAQbAPahAKIAQgAxADIABB8BVqIAQQAQwBCyAAQYguaiIDIABB8A9qIABB+BtqIABB8A1qIABBsA5qEAogAEH4IWoiBCADQYgGENEBGiADIABB8BJqIABB+B5qIABB8A5qIABBsA9qEAogBCADEAMgAEHwFWogBBABCyABQQFrIQEMAQsACwALIAcgCCACEA4LIABBkDRqJAAjAEHgH2siCCQAIAhB0BNqIgFByK3AABBJIAhB2BlqIg1BgK7AABBJIAggASANEEsgCEGAAWoiC0GQrcAAEEkgAkGID2oiACAHEGkgCEG4AWoiBSAAEGkjAEGACGsiAyQAIAMgBRCMASADQYACaiIJIAVBgAJqIg8QjAEgA0GABGoiCiAFEIwBIANBgAZqIgRBOBDQARogA0EBNgK4BiADQcAGakE4ENABGiADQfgGakEBNgIAIANBgAdqQTgQ0AEaIANBuAdqQQE2AgAgA0HAB2pBOBDQARogA0H4B2pBATYCACAFEJ0BIAMQISAJIAVBgARqIgwQGCAJEGQgAyAJEHkgAxCwASAJIAwQlgEgCRAhIAkQZCAKIA8QGCAJIAoQeSAJELABIAogDxCWASAKECEgBCAFEJYBIAQgDBAYIAogBBB5IAoQsAEgBCAPEJYBIAQgChAYIAQQZCAFIAMQGCAEIAUQlwEgDCAJEBggDBBkIAQgDBCXASAEELABIwBBgAJrIgYkACAGIAQQXiAGQYABaiIQIARBgAFqIhIQXiAGEC0gEBAtIBAQfCAQEKkBIAYgEBB7IAYQPiAEIAYQESAGEDYgBhCpASASIAYQESAGQYACaiQAIAUgAxCWASAFIAQQGCAPIAkQlgEgDyAEEBggDCAKEJYBIAwgBBAYIAVBBTYCgAYgA0GACGokACAAEJ4BIAAgBRAHIAUgABBtIAAgCBAyIAAgCBAyIAAgBRAHIAhBwAdqIgQgABBpIAQQEyAEIAAQByANIAAgCxAbIAhByA1qIgMgDRBpIAMQngEgASAAEGkgARCeASAAIAMQbSAAIAEQByANIAAgCxAbIAMgDRBtIAMQngEgASAAEG0gARCeASAAIAMQbSAAIAEQByANIAAgCxAbIAMgDRBtIAMQngEgASAAEG0gASAIEDIgACADEG0gACABEAcgDSAAIAsQGyADIA0QbSANIAMgCxAbIAMgDRBtIAEgABBtIAEgCBAyIAEgCBAyIAMgARAHIAEgABBtIAEQngEgACADEG0gACABEAcgACAEEAcgABCcASAIQeAfaiQAIAcgAEGIBhDRARpBACEAIwBBgAJrIgEkACABEGwCQCAHIAEQegR/IAdBgAFqIAFBgAFqEHoFQQALRQ0AIAdBgAJqEIcBRQ0AIAdBgARqEIcBIQALIAFBgAJqJABBACAADQAaQX8LIAJBkBVqJAAgDkEoahC0ASAOQSBqELQBIA5BGGoQtAEgDkEwaiQAC58BAgJ/BX4gAEEwaiICKQMAIAFBP3GtIgSGIQUgACkDKCIGQTogAWtBP3GtIgiHIQdBBiEBA38gAiAFIAeENwMAIAFBAU0EfyAAIAApAwAgBIZC//////////8DgzcDACAAKQMwQiSHpwUgAUEBayEBIAJBEGsiA0EIaiECIAYgBIZC//////////8DgyEHIAMpAwAiBiAIhyEFDAELCxoLiAECA34DfyMAQRBrIgUkAAN+IAZBOEYEfiAFQRBqJAAgAwUgBSAAIAZqIgcpAwAiAiACQj+HIAGsIgIgAkI/hxAvIAcgBSkDACIEIAN8IgJC//////////8DgzcDACACIARUrSAFQQhqKQMAIANCP4d8fEIGhiACQjqIhCEDIAZBCGohBgwBCwsLigECA38BfiMAQUBqIgIkACACQQhqIgEgABBdIAEQQiACQThqIQFBBiEDQdwCIQACQAJAA0AgA0EATgRAIAEpAwAiBEIAUg0CIAFBCGshASAAQTprIQAgA0EBayEDDAELC0EAIQAMAQsDQCAEUA0BIABBAWohACAEQgJ/IQQMAAsACyACQUBrJAAgAAuHAQEDfyMAQYACayIBJAAgABCwASABIAAQXiABQYABaiICQTgQ0AEaIAFBATYCuAEgAUHAAWpBOBDQARogAUH4AWpBATYCACABIABBgAFqIgMQmgEgARA2IAIgARCZASACIAMQmgEgAyABEJkBIAMgABCaASAAIAIQmQEgABCwASABQYACaiQAC30CBH4BfyABQT9xrSECQTogAWtBP3GtIQRBACEBIAApAwAiBSEDA38gAUEwRgR/IAAgACkDMCAChzcDMCAFQn8gAoZCf4WDpwUgACABaiIGIAMgAocgBkEIaikDACIDIASGQv//////////A4OENwMAIAFBCGohAQwBCwsaC2kBBH8jAEHAAWsiASQAIAEgABCQASABQUBrIgIgABCQASABQYABaiIDIABBQGsiBBCQASABIAQQdyACIAAQdyACEEIgBCACEEogAxBDIAAgAxB3IAEQQiAAEEIgACABEEogAUHAAWokAAuCAQIBfwF+IABB8AAQ0AEhAANAIAJBOEYEQAJAIAAgASkDMCIDQjqHNwM4IAAgA0L//////////wODNwMwIABBQGshAEEAIQIDQCACQTBGDQEgACACakIANwMAIAJBCGohAgwACwALBSAAIAJqIAEgAmopAwA3AwAgAkEIaiECDAELCwtuAQZ+IAAgA0L/////D4MiBSABQv////8PgyIGfiIHIAUgAUIgiCIIfiIJIAYgA0IgiCIGfnwiBUIghnwiCjcDACAAIAcgClatIAYgCH4gBSAJVK1CIIYgBUIgiIR8fCABIAR+IAIgA358fDcDCAtqAgF/BX4gASkDCCAAKQMAhSIGQgGGQgGHIQdBACACa6whCAN+IANBOEYEfiAFBSAAIANqIgIgAikDACIEIAaFIAEgA2opAwAgBIUgCIOFIgQgB4U3AwAgBCAFhSEFIANBCGohAwwBCwsaC18CAX8EfkIBIQNBMCECA38gAkF4RgR/IARCAYYgA3ynQQFrBSABIAJqKQMAIgUgACACaikDACIGfUI6hyADgyAEhCEEIAJBCGshAiAFIAaFQgF9QjqHIAODIQMMAQsLC2kBBH8jAEGAAmsiAiQAIAIgARBeIAJBgAFqIgMgARBeIAIQLSADIAIQESAAIAMQmAEgAEGAAmoiBCADEJgBIABBgARqIgUgAxCYASAEIAEQpgEgBSACEKYBIABBBTYCgAYgAkGAAmokAAtiAQJ/IwBBQGoiAiQAIAAQQiACIAAQkAECQCABBEAgACABEK4BDAELIAAQOgtBACEBA0AgA0UEQCAAEExBASABQQFqIAFBAUYiAxshAQwBCwsgACACEEogABAeIAJBQGskAAtnAQJ/IwBBQGoiAyQAAkAgASABQR91IgJqIAJzIgIgACgCOGxBgICAEE4EQCADIAIQOSAAIAMQSgwBCyAAIAIQKRogACAAKAI4IAJsNgI4CyABQQBIBEAgABBDIAAQQgsgA0FAayQAC2cAIABBAXYgAHIiAEECdiAAciIAQQR2IAByIgBBCHYgAHIiAEEQdiAAciIAIABBAXZB1arVqgVxayIAQQJ2QbPmzJkDcSAAQbPmzJkDcWoiAEEEdiAAakGPnrz4AHFBgYKECGxBGHYLYQEDfyMAQYABayIBJAAgASAAEJABIAFBQGsiAkE4ENABGiABQQE2AnggASAAQUBrIgMQdyABEEMgAiABEK4BIAIgAxB3IAMgARCuASADIAAQdyAAIAIQrgEgAUGAAWokAAtVAgJ/AX4jAEHwAGsiASQAIAFBwLLAABBJIAApAwAhAyABQThqIgIgABBdIABBARAsIAIgARBgIAIQQiACQQEQLCAAIAIgA0ICgacQMCABQfAAaiQAC5gBAQZ/IwBBwAFrIgMkACAAIAEQXiAAEC0gA0GIAWoiBkHop8AAEEkjAEFAaiIEJAAgA0EIaiICQTgQ0AEiBUEBNgI4IAVBQGtBOBDQASAFQfgAakEBNgIAIAQgBhCOASAFIAQQrgEQwQEgBEFAayQAIAIQqQEgAhB8IAIQqQEgACABEBEgACACEJoBIAAQtQEgA0HAAWokAAtZAQJ/IwBBQGoiAyQAIABBOBDQASIAQQE2AjgCQCABQQBOBEAgACABEJMBDAELIANBCGoiAkHAssAAEEkgAiABEJMBIAIQQiAAIAIQagsgABBUIANBQGskAAu9CAEKfyMAQYABayIHJAAgB0EIaiIDQcCywAAQSSADQQEQlAECQAJAA0AgAUEwRgRAIANBMGogAykDMEIBhzcDACADQThqIQEDQCACRQ0EIAFCADcDACACQQFrIQIgAUEIaiEBDAALAAsgAUE4Rg0BIAFBOEcEQCABIANqIAEgA2oiBEEIaikDAEI5hkL//////////wODIAQpAwBCAYeENwMAIAVBAWohBSABQQhqIQEMAQsLQQdBB0GEm8AAEDsACyAFQQdB9JrAABA7AAsgA0EBEJQBIANBARAsIAdBQGshBUEAIQIjAEGgCmsiASQAIAFBOBDQASIBQUBrQTgQ0AEhBiABQYABakE4ENABGiABQcABakE4ENABGiABQYACakE4ENABGiABQcACakE4ENABGiABQYADakE4ENABGiABQcADakE4ENABGiABQYAEakE4ENABGiABQcAEakE4ENABGiABQYAFakE4ENABGiABQcAFakE4ENABGiABQYAGakE4ENABGiABQcAGakE4ENABGiABQYAHakE4ENABGiABQcAHakE4ENABGiABQfgHakEBNgIAIAFBuAdqQQE2AgAgAUH4BmpBATYCACABQbgGakEBNgIAIAFB+AVqQQE2AgAgAUG4BWpBATYCACABQfgEakEBNgIAIAFBuARqQQE2AgAgAUH4A2pBATYCACABQbgDakEBNgIAIAFB+AJqQQE2AgAgAUG4AmpBATYCACABQfgBakEBNgIAIAFBuAFqQQE2AgAgAUH4AGpBATYCACABQQE2AjggAUGBCGpB5wAQ0AEaIAFB6AhqIgQgABCQASAEEEIgAUGoCWoiBCADEF0gBBBCIAQQKkEDaiIIQQJ2IgNBAWohCQJAA0AgAiAJRgRAIAEQygEgBiABQegIahCuASABQeAJakE4ENABGiABQQE2ApgKQYB5IQIMAgsgAUGoCWoiBCAEQQQQjwEiChCUASAEEEIgAkHnAEcEQCABQYEIaiACaiAKOgAAIAFBqAlqQQQQLCACQQFqIQIMAQsLQecAQecAQaC0wAAQOwALA0AgAgRAIAFB4AlqIgQgASACaiIGQcAHahCuASAGQYAIaiIGIAQQrgEgBiABQegIahBKIAJBQGshAgwBCwsCQAJAAkACQCAIQZwDSQRAIAFBgQhqIANqLAAAIgJBEE8NASAFIAEgAkEGdGoQkAEgA0EBayICQeYASyEEA0AgAkF/Rg0DIAUQTCAFEEwgBRBMIAUQTCAEDQQgAUGBCGogAmotAAAiA0EQSQRAIAUgASADQQZ0ahBKIAJBAWshAgwBCwsgA0EYdEEYdUEQQeC0wAAQOwALIANB5wBBsLTAABA7AAsgAkEQQcC0wAAQOwALIAUQHiABQaAKaiQADAELIAJB5wBB0LTAABA7AAsgACAFEK4BIAdBgAFqJAALbAEBfyMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBHGpBAjYCACADQSxqQQE2AgAgA0ICNwIMIANB2LjAADYCCCADQQE2AiQgAyADQSBqNgIYIAMgAzYCKCADIANBBGo2AiAgA0EIaiACEGYAC2UBAn8gACAAKAIAIgJBCGoiAzYCACAAIAJBA3ZBPHFqQShqIgIgAUH/AXEgAigCAEEIdHI2AgACQAJAIANFBEAgAEEANgIAIAAgACgCBEEBajYCBAwBCyADQf8DcQ0BCyAAEA8LC1wAIABBOBDQASIAQQE2AjggAEFAa0E4ENABGiAAQfgAakEBNgIAIABBgAFqEFEgAEGAAmpBOBDQARogAEG4AmpBATYCACAAQcACakE4ENABGiAAQfgCakEBNgIAC1sBA38jAEGAAWsiASQAIAAQqQEgASAAEJABIAFBQGsiAiAAQUBrIgMQkAEgARBMIAIQTCABIAIQdyABQQAQMyAAIAEQSiABEEMgARBCIAMgARBKIAFBgAFqJAALYQEBfyMAQYACayIDJAAgABA9IAAgARCZASAAQYABaiIBIAIQmQEgAEGAAmoQtwEgABCpASADIAAQOCADQYABaiICIAEQXiACEC0gAiADEHpFBEAgABCbAQsgA0GAAmokAAtUAQF/IwBBIGsiAiQAIAIgACgCADYCBCACQRhqIAFBEGopAgA3AwAgAkEQaiABQQhqKQIANwMAIAIgASkCADcDCCACQQRqIAJBCGoQDCACQSBqJAALZwAjAEEwayIBJABBpLvAAC0AAARAIAFBHGpBATYCACABQgI3AgwgAUGQtsAANgIIIAFBATYCJCABIAA2AiwgASABQSBqNgIYIAEgAUEsajYCICABQQhqQbi2wAAQZgALIAFBMGokAAtiAgF+An8gACkDACEBA34gACACaiIDIAFC//////////8DgzcDACABQjqHIQEgAkEoRgR+IAAgACkDMCABfCIBNwMwIAFCJIcFIAJBCGohAiADQQhqKQMAIAF8IQEMAQsLGgt8AQV/IwBBQGoiAyQAIANBCGoiAkHAssAAEEkgAiAAKAI4QQFrEDUiBBAoA0AgAUE4RwRAIAAgAWoiBSABIAJqKQMAIAUpAwB9NwMAIAFBCGohAQwBCwsgAEEBIARBAWp0IgI2AjggAkH///8PSgRAIAAQHgsgA0FAayQAC3sBAn8gAEEoaiECA0AgAUGAAkYEQCAAQufMp9DW0Ouzu383AgggAEIANwIAIABBIGpCq7OP/JGjs/DbADcCACAAQRhqQv+kuYjFkdqCm383AgAgAEEQakLy5rvjo6f9p6V/NwIABSABIAJqQQA2AgAgAUEEaiEBDAELCwtUACAAQTgQ0AEiAEEBNgI4IABBQGtBOBDQARogAEH4AGpBATYCACAAQYABakE4ENABGiAAQbgBakEBNgIAIABBwAFqQTgQ0AEaIABB+AFqQQE2AgALWAECfyMAQUBqIgEkAAJAIAAQhgENACABQQEQOSAAQYABaiICIAEQWA0AIAJBABAzIAAgAhBKIAAQHiAAQUBrIgAgAhBKIAAQHiACIAEQrgELIAFBQGskAAtZAQJ/IwBBgAFrIgEkAAJAIAAQigENACABEFEgAEGAAmoiAiABEHoNACACED4gACACEBEgABC1ASAAQYABaiIAIAIQESAAELUBIAIgARCZAQsgAUGAAWokAAtbAgF+An8gACkDACEBA0AgACACaiIDIAFC//////////8DgzcDACABQjqHIQEgAkHgAEYEQCAAIAApA2ggAXw3A2gFIAJBCGohAiADQQhqKQMAIAF8IQEMAQsLC08BAX8gAEE4ENABGgJAA0AgAkEHRwRAIAJBB0YNAiAAIAEpAwA3AwAgAEEIaiEAIAFBCGohASACQQFqIQIMAQsLDwtBB0EHQeSawAAQOwALVAECfyMAQbABayICJAAgATQCOCAANAI4fkL///8PVQRAIAAQHgsgAkEIaiIDIAAgARAFIAJB+ABqIgEgAxBrIAAgARBqIABBAjYCOCACQbABaiQAC1EBAn8jAEFAaiIDJAAgAEE4ENABIgBBATYCOCAAQUBrQTgQ0AEgAEH4AGpBATYCACADIAEQjgEgACADEK4BIAMgAhCOASADEK4BIANBQGskAAvwDAIRfwh+IwBBsAFrIg8kACAANAI4IhIgEn5C////D1YEQCAAEB4LIwBB0AFrIgEkACAPQQhqIgZBCGpB0AAQ0AEaIAFBwAFqIAApAwAiFyAXQj+HIhYgFyAWEC8gBiABKQPAASISQv//////////A4M3AwAgAUHIAWopAwAiFUIGhiASQjqIhCETIBVCOoghGCAAQQhqIgwhDSAAIQlBASEKQQEhBwJAA0AgCkEERgRAIABBGGohCiAAQRBqIQkgAEEoaiEMIAApAzAhF0EHIQUgAUHIAGohCwNAIAVBC0kEQCABQUBrIAVBA3QiCCAAakEwaykDACISIBJCP4cgFyAXQj+HIhYQLyAFQQFqIg1BAXYhByALKQMAIRUgASkDQCESIAkhAiAMIQQgBUEFayIOIQMDQCADIAdJBEAgASACKQMAIhQgFEI/hyAEKQMAIhQgFEI/hxAvIAEpAwAiFCASfCISIBRUrSABQQhqKQMAIBV8fCEVIAJBCGohAiAEQQhrIQQgA0EBaiEDDAELCyAGIAhqIBJCAYYiFCATfCITQv//////////A4M3AwAgAUEwaiAAIA5BA3RqKQMAIhkgGUI/hyAXIBYQLyATIBRU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aikDADcDACACQQhqIQIMAQsLC4QJAg1/Cn4jAEFAaiILJAAgC0EIaiIJQcCywAAQSSMAQZACayICJAAgAEEwENABIQogAkHoAGpB8AAQ0AEaIAJB4AFqQTAQ0AEaIAoQcSACIAEiDCkDACIQQv3/8//P///5AX5C//////////8DgyISNwPYASACQdgAaiASQgAgCSkDACIXIBdCP4ciGBAvIBAgAikDWCIPfCITIA9UrSACQeAAaikDACAQQj+HfHwiEEI6hyABKQMIIg9CP4d8IA8gEEIGhiATQjqIhCITfCIQIBNUrXwhD0EBIQBCACETAkACQANAAkAgAEEHRgRAQQYhB0EAIQhBByEADAELIABBAXYiAUEBaiEGIAggAWshAyABQQN0IgFBCGohBCAHIAFrIQUgAkHIAGogCSAAQQN0Ig1qKQMAIhUgFUI/hyIWIBJCABAvIAJB0ABqKQMAIBAgECATfCIRVq0gDyAUfHx8IBEgAikDSHwiDyARVK18IRAgAEEBaiEBA0AgACAGTQRAIAJB2AFqIA1qIA9C/f/z/8////kBfkL//////////wODIhE3AwAgAkE4aiARQgAgFyAYEC8gAkEoaiARQgAgFSAWEC8gAkHoAGogAEEEdGoiACACQTBqKQMAIhE3AwggACACKQMoIhU3AwAgDyACKQM4IhZ8Ig8gFlStIAJBQGspAwAgEHx8IhBCOocgDCABQQN0aikDACIWQj+HfCAWIBBCBoYgD0I6iIQiD3wiECAPVK18IQ8gEyAVfCITIBVUrSARIBR8fCEUIAdBCGohByAIQQFqIQggASEADAMLIANBB08NAyACQRhqIAQgCWopAwAgBSAJaikDAH0iESARQj+HIAJB2AFqIg4gBWopAwAgBCAOaikDAH0iESARQj+HEC8gAikDGCIRIA98Ig8gEVStIAJBIGopAwAgEHx8IRAgBkEBaiEGIARBCGohBCAFQQhrIQUgA0EBayEDDAALAAsLA0ACQAJAIABBDUcEQCAHIABBAXYiBmshAyAIIAZBA3QiAWshBCABQQhqIQUgDyAUfCAQIBN8Ig8gEFStfCEQIABBAWohAQNAIAZBBUsNAyADQQdPDQIgAkEIaiAFIAlqKQMAIAQgCWpBMGopAwB9IhIgEkI/hyACIARqQYgCaikDACACQdgBaiAFaikDAH0iEiASQj+HEC8gAikDCCISIA98Ig8gElStIAJBEGopAwAgEHx8IRAgBkEBaiEGIARBCGshBCADQQFrIQMgBUEIaiEFDAALAAsgCiAQQv//////////A4M3AzAgAkGQAmokAAwECyADQQdBpJzAABA7AAsgAEEDdCAKakE4ayAPQv//////////A4M3AwAgEEI6hyAMIAFBA3RqKQMAIhJCP4d8IBIgEEIGhiAPQjqIhCIPfCIQIA9UrXwhDyAUIABBBHQgAmpBCGoiAEEIaikDAH0gEyAAKQMAIhJUrX0hFCAIQQhqIQggB0EBaiEHIBMgEn0hEyABIQAMAAsACyADQQdBlJzAABA7AAsgC0FAayQACy4BAX8jAEGAAWsiASQAIAAQRSABEFEgACABEJkBIABBgAFqELYBIAFBgAFqJAALMwAgACABEJYBIABBgAJqIAFBgAJqEJYBIABBgARqIAFBgARqEJYBIAAgASgCgAY2AoAGCygAIAAgASACEHIgAEFAayABQUBrIAIQciAAQYABaiABQYABaiACEHILLQAgACABIAIQjQEgAEGAAWogAUGAAWogAhCNASAAQYACaiABQYACaiACEI0BCycBAn8jAEFAaiICJAAgAkEIaiIDIAEQvgEgACADEI4BIAJBQGskAAsiAQF/A0AgAUE4RwRAIAAgAWpCADcDACABQQhqIQEMAQsLCyUAIAAgASACEDAgAEEAIAJrIAAoAjgiACABKAI4c3EgAHM2AjgLJwAgACAAKAIEQQFxIAFyQQJyNgIEIAAgAWoiACAAKAIEQQFyNgIECyMAA0AgAgRAIAAgAS0AABA8IAJBAWshAiABQQFqIQEMAQsLCywAIAAQiwEgACABEJYBIABBgAJqIAIQlgEgAEGABGogAxCWASAAQQU2AoAGCyMBAX8jAEFAaiIBJAAgASAAEJABIAEQHiABEFcgAUFAayQACykAIAAgARBgIAAgACgCOCABKAI4aiIBNgI4IAFB////D0oEQCAAEB4LCyUAIAAgARCuASAAQUBrIAFBQGsQrgEgAEGAAWogAUGAAWoQrgELKAEBfyMAQYACayICJAAgAiABEIwBIAIQKyAAIAIQlwEgAkGAAmokAAscAQF/IAAgARBYBH8gAEFAayABQUBrEFgFQQALCycBAX8jAEGAAWsiAiQAIAIg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DCELDQALCyAMpyICQeMASwRAIABBAmsiACAGQQlqaiAMpyICIAJB//8DcUHkAG4iAkHkAGxrQf//A3FBAXRB6LjAAGovAAA7AAALAkAgAkEKTwRAIABBAmsiACAGQQlqaiACQQF0Qei4wABqLwAAOwAADAELIABBAWsiACAGQQlqaiACQTBqOgAACwJ/IAZBCWogAGohCEErQYCAxAAgASgCACIDQQFxIgIbIQQgAkEnIABrIglqIQJBlLjAAEEAIANBBHEbIQUCQAJAIAEoAghFBEBBASEAIAEgBCAFEFINAQwCCwJAAkACQAJAIAIgAUEMaigCACIDSQRAIAEtAABBCHENBEEAIQAgAyACayICIQNBASABLQAgIgcgB0EDRhtBA3FBAWsOAgECAwtBASEAIAEgBCAFEFINBAwFC0EAIQMgAiEADAELIAJBAXYhACACQQFqQQF2IQMLIABBAWohACABQRxqKAIAIQcgASgCBCECIAEoAhghCgJAA0AgAEEBayIARQ0BIAogAiAHKAIQEQQARQ0AC0EBDAQLQQEhACACQYCAxABGDQEgASAEIAUQUg0BIAEoAhggCCAJIAEoAhwoAgwRBQANASABKAIcIQQgASgCGCEBQQAhAAJ/A0AgAyAAIANGDQEaIABBAWohACABIAIgBCgCEBEEAEUNAAsgAEEBawsgA0khAAwBCyABKAIEIQcgAUEwNgIEIAEtACAhCkEBIQAgAUEBOgAgIAEgBCAFEFINAEEAIQAgAyACayICIQMCQAJAAkBBASABLQAgIgQgBEEDRhtBA3FBAWsOAgABAgtBACEDIAIhAAwBCyACQQF2IQAgAkEBakEBdiEDCyAAQQFqIQAgAUEcaigCACECIAEoAgQhBCABKAIYIQUCQANAIABBAWsiAEUNASAFIAQgAigCEBEEAEUNAAtBAQwDC0EBIQAgBEGAgMQARg0AIAEoAhggCCAJIAEoAhwoAgwRBQANACABKAIcIQAgASgCGCEFQQAhAgJAA0AgAiADRg0BIAJBAWohAiAFIAQgACgCEBEEAEUNAAtBASEAIAJBAWsgA0kNAQsgASAKOgAgIAEgBzYCBEEADAILIAAMAQsgASgCGCAIIAkgAUEcaigCACgCDBEFAAsgBkEwaiQACwsAIAAQNiAAELABCysCAX8BfkIBIQIDQCAAIAFq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AAANAEHgs8AAC8EHYXR0ZW1wdCB0byBkaXZpZGUgYnkgemVybwAAAAAAAABhdHRlbXB0IHRvIGRpdmlkZSB3aXRoIG92ZXJmbG93ALAZEAASAAAADAIAAA0AAACwGRAAEgAAABgCAAAmAAAAsBkQABIAAAAYAgAAIwAAALAZEAASAAAAHgIAABcAAACwGRAAEgAAAB4CAAAUAAAAqqr//////gHu//9UrP//AupBYg9rDyoBw5z9ShTOEwJLd2TXrEtDAu3pxpKm+V8Cox4RoAEAAAADAAAABAAAAAQAAAAEAAAABQAAAAYAAABjYWxsZWQgYE9wdGlvbjo6dW53cmFwKClgIG9uIGEgYE5vbmVgIHZhbHVlbWVtb3J5IGFsbG9jYXRpb24gb2YgIGJ5dGVzIGZhaWxlZAoAAOsaEAAVAAAAABsQAA4AAABsaWJyYXJ5L3N0ZC9zcmMvYWxsb2MucnMgGxAAGAAAAEkBAAAJAAAAbGlicmFyeS9zdGQvc3JjL3Bhbmlja2luZy5yc0gbEAAcAAAARgIAAB8AAABIGxAAHAAAAEcCAAAeAAAABwAAAAwAAAAEAAAACAAAAAMAAAAIAAAABAAAAAkAAAAKAAAAEAAAAAQAAAALAAAADAAAAAMAAAAIAAAABAAAAA0AAAAOAAAAbGlicmFyeS9hbGxvYy9zcmMvcmF3X3ZlYy5yc2NhcGFjaXR5IG92ZXJmbG93AAAA6BsQABEAAADMGxAAHAAAAAUCAAAFAAAAEAAAAAAAAAABAAAAEQAAAGluZGV4IG91dCBvZiBib3VuZHM6IHRoZSBsZW4gaXMgIGJ1dCB0aGUgaW5kZXggaXMgAAAkHBAAIAAAAEQcEAASAAAAMDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTkgb3V0IG9mIHJhbmdlIGZvciBzbGljZSBvZiBsZW5ndGggbGlicmFyeS9jb3JlL3NyYy9zbGljZS9pbmRleC5yc3JhbmdlIGVuZCBpbmRleCAAAABxHRAAEAAAADAdEAAiAAAAUh0QAB8AAABJAAAABQB7CXByb2R1Y2VycwIIbGFuZ3VhZ2UBBFJ1c3QADHByb2Nlc3NlZC1ieQMFcnVzdGMdMS42MS4wIChmZTViMTNkNjggMjAyMi0wNS0xOCkGd2FscnVzBjAuMTkuMAx3YXNtLWJpbmRnZW4SMC4yLjgxICgwNjJhYTVmNzAp';
Xi(nB);
Qr(
  '308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100',
);
var $r;
(function (t) {
  (t.Install = 'install'), (t.Reinstall = 'reinstall'), (t.Upgrade = 'upgrade');
})($r || ($r = {}));
var gB = ((t) => (
  (t[(t.FractionalMoreThan8Decimals = 0)] = 'FractionalMoreThan8Decimals'),
  (t[(t.InvalidFormat = 1)] = 'InvalidFormat'),
  t
))(gB || {});
BigInt(1e8);
var Ai = 'abcdefghijklmnopqrstuvwxyz234567',
  lt = Object.create(null);
for (let t = 0; t < Ai.length; t++) lt[Ai[t]] = t;
lt[0] = lt.o;
lt[1] = lt.i;
var BB = (t) => t == null,
  BI = (t) => !BB(t);
/*! @license DOMPurify 3.0.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.6/LICENSE */ const {
  entries: $i,
  setPrototypeOf: ei,
  isFrozen: IB,
  getPrototypeOf: aB,
  getOwnPropertyDescriptor: An,
} = Object;
let { freeze: Ne, seal: Te, create: en } = Object,
  { apply: cr, construct: Cr } = typeof Reflect < 'u' && Reflect;
Ne ||
  (Ne = function (A) {
    return A;
  });
Te ||
  (Te = function (A) {
    return A;
  });
cr ||
  (cr = function (A, e, g) {
    return A.apply(e, g);
  });
Cr ||
  (Cr = function (A, e) {
    return new A(...e);
  });
const St = Ue(Array.prototype.forEach),
  ti = Ue(Array.prototype.pop),
  ct = Ue(Array.prototype.push),
  Mt = Ue(String.prototype.toLowerCase),
  zt = Ue(String.prototype.toString),
  sB = Ue(String.prototype.match),
  Ct = Ue(String.prototype.replace),
  EB = Ue(String.prototype.indexOf),
  oB = Ue(String.prototype.trim),
  Ge = Ue(RegExp.prototype.test),
  ut = fB(TypeError);
function Ue(t) {
  return function (A) {
    for (
      var e = arguments.length, g = new Array(e > 1 ? e - 1 : 0), s = 1;
      s < e;
      s++
    )
      g[s - 1] = arguments[s];
    return cr(t, A, g);
  };
}
function fB(t) {
  return function () {
    for (var A = arguments.length, e = new Array(A), g = 0; g < A; g++)
      e[g] = arguments[g];
    return Cr(t, e);
  };
}
function FA(t, A) {
  let e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Mt;
  ei && ei(t, null);
  let g = A.length;
  for (; g--; ) {
    let s = A[g];
    if (typeof s == 'string') {
      const l = e(s);
      l !== s && (IB(A) || (A[g] = l), (s = l));
    }
    t[s] = !0;
  }
  return t;
}
function at(t) {
  const A = en(null);
  for (const [e, g] of $i(t)) An(t, e) !== void 0 && (A[e] = g);
  return A;
}
function Nt(t, A) {
  for (; t !== null; ) {
    const g = An(t, A);
    if (g) {
      if (g.get) return Ue(g.get);
      if (typeof g.value == 'function') return Ue(g.value);
    }
    t = aB(t);
  }
  function e(g) {
    return console.warn('fallback value for', g), null;
  }
  return e;
}
const ri = Ne([
    'a',
    'abbr',
    'acronym',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'bdi',
    'bdo',
    'big',
    'blink',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'center',
    'cite',
    'code',
    'col',
    'colgroup',
    'content',
    'data',
    'datalist',
    'dd',
    'decorator',
    'del',
    'details',
    'dfn',
    'dialog',
    'dir',
    'div',
    'dl',
    'dt',
    'element',
    'em',
    'fieldset',
    'figcaption',
    'figure',
    'font',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'main',
    'map',
    'mark',
    'marquee',
    'menu',
    'menuitem',
    'meter',
    'nav',
    'nobr',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'picture',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'section',
    'select',
    'shadow',
    'small',
    'source',
    'spacer',
    'span',
    'strike',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'tr',
    'track',
    'tt',
    'u',
    'ul',
    'var',
    'video',
    'wbr',
  ]),
  Zt = Ne([
    'svg',
    'a',
    'altglyph',
    'altglyphdef',
    'altglyphitem',
    'animatecolor',
    'animatemotion',
    'animatetransform',
    'circle',
    'clippath',
    'defs',
    'desc',
    'ellipse',
    'filter',
    'font',
    'g',
    'glyph',
    'glyphref',
    'hkern',
    'image',
    'line',
    'lineargradient',
    'marker',
    'mask',
    'metadata',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialgradient',
    'rect',
    'stop',
    'style',
    'switch',
    'symbol',
    'text',
    'textpath',
    'title',
    'tref',
    'tspan',
    'view',
    'vkern',
  ]),
  Vt = Ne([
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feDropShadow',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
  ]),
  QB = Ne([
    'animate',
    'color-profile',
    'cursor',
    'discard',
    'font-face',
    'font-face-format',
    'font-face-name',
    'font-face-src',
    'font-face-uri',
    'foreignobject',
    'hatch',
    'hatchpath',
    'mesh',
    'meshgradient',
    'meshpatch',
    'meshrow',
    'missing-glyph',
    'script',
    'set',
    'solidcolor',
    'unknown',
    'use',
  ]),
  Xt = Ne([
    'math',
    'menclose',
    'merror',
    'mfenced',
    'mfrac',
    'mglyph',
    'mi',
    'mlabeledtr',
    'mmultiscripts',
    'mn',
    'mo',
    'mover',
    'mpadded',
    'mphantom',
    'mroot',
    'mrow',
    'ms',
    'mspace',
    'msqrt',
    'mstyle',
    'msub',
    'msup',
    'msubsup',
    'mtable',
    'mtd',
    'mtext',
    'mtr',
    'munder',
    'munderover',
    'mprescripts',
  ]),
  cB = Ne([
    'maction',
    'maligngroup',
    'malignmark',
    'mlongdiv',
    'mscarries',
    'mscarry',
    'msgroup',
    'mstack',
    'msline',
    'msrow',
    'semantics',
    'annotation',
    'annotation-xml',
    'mprescripts',
    'none',
  ]),
  ii = Ne(['#text']),
  ni = Ne([
    'accept',
    'action',
    'align',
    'alt',
    'autocapitalize',
    'autocomplete',
    'autopictureinpicture',
    'autoplay',
    'background',
    'bgcolor',
    'border',
    'capture',
    'cellpadding',
    'cellspacing',
    'checked',
    'cite',
    'class',
    'clear',
    'color',
    'cols',
    'colspan',
    'controls',
    'controlslist',
    'coords',
    'crossorigin',
    'datetime',
    'decoding',
    'default',
    'dir',
    'disabled',
    'disablepictureinpicture',
    'disableremoteplayback',
    'download',
    'draggable',
    'enctype',
    'enterkeyhint',
    'face',
    'for',
    'headers',
    'height',
    'hidden',
    'high',
    'href',
    'hreflang',
    'id',
    'inputmode',
    'integrity',
    'ismap',
    'kind',
    'label',
    'lang',
    'list',
    'loading',
    'loop',
    'low',
    'max',
    'maxlength',
    'media',
    'method',
    'min',
    'minlength',
    'multiple',
    'muted',
    'name',
    'nonce',
    'noshade',
    'novalidate',
    'nowrap',
    'open',
    'optimum',
    'pattern',
    'placeholder',
    'playsinline',
    'poster',
    'preload',
    'pubdate',
    'radiogroup',
    'readonly',
    'rel',
    'required',
    'rev',
    'reversed',
    'role',
    'rows',
    'rowspan',
    'spellcheck',
    'scope',
    'selected',
    'shape',
    'size',
    'sizes',
    'span',
    'srclang',
    'start',
    'src',
    'srcset',
    'step',
    'style',
    'summary',
    'tabindex',
    'title',
    'translate',
    'type',
    'usemap',
    'valign',
    'value',
    'width',
    'xmlns',
    'slot',
  ]),
  $t = Ne([
    'accent-height',
    'accumulate',
    'additive',
    'alignment-baseline',
    'ascent',
    'attributename',
    'attributetype',
    'azimuth',
    'basefrequency',
    'baseline-shift',
    'begin',
    'bias',
    'by',
    'class',
    'clip',
    'clippathunits',
    'clip-path',
    'clip-rule',
    'color',
    'color-interpolation',
    'color-interpolation-filters',
    'color-profile',
    'color-rendering',
    'cx',
    'cy',
    'd',
    'dx',
    'dy',
    'diffuseconstant',
    'direction',
    'display',
    'divisor',
    'dur',
    'edgemode',
    'elevation',
    'end',
    'fill',
    'fill-opacity',
    'fill-rule',
    'filter',
    'filterunits',
    'flood-color',
    'flood-opacity',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-weight',
    'fx',
    'fy',
    'g1',
    'g2',
    'glyph-name',
    'glyphref',
    'gradientunits',
    'gradienttransform',
    'height',
    'href',
    'id',
    'image-rendering',
    'in',
    'in2',
    'k',
    'k1',
    'k2',
    'k3',
    'k4',
    'kerning',
    'keypoints',
    'keysplines',
    'keytimes',
    'lang',
    'lengthadjust',
    'letter-spacing',
    'kernelmatrix',
    'kernelunitlength',
    'lighting-color',
    'local',
    'marker-end',
    'marker-mid',
    'marker-start',
    'markerheight',
    'markerunits',
    'markerwidth',
    'maskcontentunits',
    'maskunits',
    'max',
    'mask',
    'media',
    'method',
    'mode',
    'min',
    'name',
    'numoctaves',
    'offset',
    'operator',
    'opacity',
    'order',
    'orient',
    'orientation',
    'origin',
    'overflow',
    'paint-order',
    'path',
    'pathlength',
    'patterncontentunits',
    'patterntransform',
    'patternunits',
    'points',
    'preservealpha',
    'preserveaspectratio',
    'primitiveunits',
    'r',
    'rx',
    'ry',
    'radius',
    'refx',
    'refy',
    'repeatcount',
    'repeatdur',
    'restart',
    'result',
    'rotate',
    'scale',
    'seed',
    'shape-rendering',
    'specularconstant',
    'specularexponent',
    'spreadmethod',
    'startoffset',
    'stddeviation',
    'stitchtiles',
    'stop-color',
    'stop-opacity',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke',
    'stroke-width',
    'style',
    'surfacescale',
    'systemlanguage',
    'tabindex',
    'targetx',
    'targety',
    'transform',
    'transform-origin',
    'text-anchor',
    'text-decoration',
    'text-rendering',
    'textlength',
    'type',
    'u1',
    'u2',
    'unicode',
    'values',
    'viewbox',
    'visibility',
    'version',
    'vert-adv-y',
    'vert-origin-x',
    'vert-origin-y',
    'width',
    'word-spacing',
    'wrap',
    'writing-mode',
    'xchannelselector',
    'ychannelselector',
    'x',
    'x1',
    'x2',
    'xmlns',
    'y',
    'y1',
    'y2',
    'z',
    'zoomandpan',
  ]),
  gi = Ne([
    'accent',
    'accentunder',
    'align',
    'bevelled',
    'close',
    'columnsalign',
    'columnlines',
    'columnspan',
    'denomalign',
    'depth',
    'dir',
    'display',
    'displaystyle',
    'encoding',
    'fence',
    'frame',
    'height',
    'href',
    'id',
    'largeop',
    'length',
    'linethickness',
    'lspace',
    'lquote',
    'mathbackground',
    'mathcolor',
    'mathsize',
    'mathvariant',
    'maxsize',
    'minsize',
    'movablelimits',
    'notation',
    'numalign',
    'open',
    'rowalign',
    'rowlines',
    'rowspacing',
    'rowspan',
    'rspace',
    'rquote',
    'scriptlevel',
    'scriptminsize',
    'scriptsizemultiplier',
    'selection',
    'separator',
    'separators',
    'stretchy',
    'subscriptshift',
    'supscriptshift',
    'symmetric',
    'voffset',
    'width',
    'xmlns',
  ]),
  Ft = Ne(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']),
  CB = Te(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
  uB = Te(/<%[\w\W]*|[\w\W]*%>/gm),
  hB = Te(/\${[\w\W]*}/gm),
  lB = Te(/^data-[\-\w.\u00B7-\uFFFF]/),
  wB = Te(/^aria-[\-\w]+$/),
  tn = Te(
    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  ),
  pB = Te(/^(?:\w+script|data):/i),
  yB = Te(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
  rn = Te(/^html$/i);
var Bi = Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: CB,
  ERB_EXPR: uB,
  TMPLIT_EXPR: hB,
  DATA_ATTR: lB,
  ARIA_ATTR: wB,
  IS_ALLOWED_URI: tn,
  IS_SCRIPT_OR_DATA: pB,
  ATTR_WHITESPACE: yB,
  DOCTYPE_NAME: rn,
});
const xB = function () {
    return typeof window > 'u' ? null : window;
  },
  dB = function (A, e) {
    if (typeof A != 'object' || typeof A.createPolicy != 'function')
      return null;
    let g = null;
    const s = 'data-tt-policy-suffix';
    e && e.hasAttribute(s) && (g = e.getAttribute(s));
    const l = 'dompurify' + (g ? '#' + g : '');
    try {
      return A.createPolicy(l, {
        createHTML(y) {
          return y;
        },
        createScriptURL(y) {
          return y;
        },
      });
    } catch {
      return (
        console.warn('TrustedTypes policy ' + l + ' could not be created.'),
        null
      );
    }
  };
function nn() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : xB();
  const A = (T) => nn(T);
  if (
    ((A.version = '3.0.6'),
    (A.removed = []),
    !t || !t.document || t.document.nodeType !== 9)
  )
    return (A.isSupported = !1), A;
  let { document: e } = t;
  const g = e,
    s = g.currentScript,
    {
      DocumentFragment: l,
      HTMLTemplateElement: y,
      Node: u,
      Element: M,
      NodeFilter: b,
      NamedNodeMap: $ = t.NamedNodeMap || t.MozNamedAttrMap,
      HTMLFormElement: J,
      DOMParser: nA,
      trustedTypes: AA,
    } = t,
    vA = M.prototype,
    RA = Nt(vA, 'cloneNode'),
    ae = Nt(vA, 'nextSibling'),
    Ee = Nt(vA, 'childNodes'),
    kA = Nt(vA, 'parentNode');
  if (typeof y == 'function') {
    const T = e.createElement('template');
    T.content && T.content.ownerDocument && (e = T.content.ownerDocument);
  }
  let XA,
    oe = '';
  const {
      implementation: zA,
      createNodeIterator: oA,
      createDocumentFragment: cA,
      getElementsByTagName: YA,
    } = e,
    { importNode: PA } = g;
  let z = {};
  A.isSupported =
    typeof $i == 'function' &&
    typeof kA == 'function' &&
    zA &&
    zA.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: HA,
    ERB_EXPR: GA,
    TMPLIT_EXPR: MA,
    DATA_ATTR: ee,
    ARIA_ATTR: $A,
    IS_SCRIPT_OR_DATA: re,
    ATTR_WHITESPACE: ie,
  } = Bi;
  let { IS_ALLOWED_URI: JA } = Bi,
    bA = null;
  const Ce = FA({}, [...ri, ...Zt, ...Vt, ...Xt, ...ii]);
  let wA = null;
  const qA = FA({}, [...ni, ...$t, ...gi, ...Ft]);
  let yA = Object.seal(
      en(null, {
        tagNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null,
        },
        attributeNameCheck: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: null,
        },
        allowCustomizedBuiltInElements: {
          writable: !0,
          configurable: !1,
          enumerable: !0,
          value: !1,
        },
      }),
    ),
    C = null,
    uA = null,
    te = !0,
    Fe = !0,
    IA = !1,
    fA = !0,
    c = !1,
    h = !1,
    D = !1,
    m = !1,
    N = !1,
    F = !1,
    I = !1,
    r = !0,
    n = !1;
  const a = 'user-content-';
  let f = !0,
    x = !1,
    R = {},
    K = null;
  const iA = FA({}, [
    'annotation-xml',
    'audio',
    'colgroup',
    'desc',
    'foreignobject',
    'head',
    'iframe',
    'math',
    'mi',
    'mn',
    'mo',
    'ms',
    'mtext',
    'noembed',
    'noframes',
    'noscript',
    'plaintext',
    'script',
    'style',
    'svg',
    'template',
    'thead',
    'title',
    'video',
    'xmp',
  ]);
  let QA = null;
  const lA = FA({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
  let V = null;
  const xA = FA({}, [
      'alt',
      'class',
      'for',
      'id',
      'label',
      'name',
      'pattern',
      'placeholder',
      'role',
      'summary',
      'title',
      'value',
      'style',
      'xmlns',
    ]),
    WA = 'http://www.w3.org/1998/Math/MathML',
    we = 'http://www.w3.org/2000/svg',
    fe = 'http://www.w3.org/1999/xhtml';
  let pe = fe,
    pA = !1,
    he = null;
  const ne = FA({}, [WA, we, fe], zt);
  let OA = null;
  const KA = ['application/xhtml+xml', 'text/html'],
    Je = 'text/html';
  let hA = null,
    be = null;
  const rt = e.createElement('form'),
    it = function (p) {
      return p instanceof RegExp || p instanceof Function;
    },
    At = function () {
      let p =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (!(be && be === p)) {
        if (
          ((!p || typeof p != 'object') && (p = {}),
          (p = at(p)),
          (OA =
            KA.indexOf(p.PARSER_MEDIA_TYPE) === -1
              ? (OA = Je)
              : (OA = p.PARSER_MEDIA_TYPE)),
          (hA = OA === 'application/xhtml+xml' ? zt : Mt),
          (bA = 'ALLOWED_TAGS' in p ? FA({}, p.ALLOWED_TAGS, hA) : Ce),
          (wA = 'ALLOWED_ATTR' in p ? FA({}, p.ALLOWED_ATTR, hA) : qA),
          (he =
            'ALLOWED_NAMESPACES' in p ? FA({}, p.ALLOWED_NAMESPACES, zt) : ne),
          (V =
            'ADD_URI_SAFE_ATTR' in p
              ? FA(at(xA), p.ADD_URI_SAFE_ATTR, hA)
              : xA),
          (QA =
            'ADD_DATA_URI_TAGS' in p
              ? FA(at(lA), p.ADD_DATA_URI_TAGS, hA)
              : lA),
          (K = 'FORBID_CONTENTS' in p ? FA({}, p.FORBID_CONTENTS, hA) : iA),
          (C = 'FORBID_TAGS' in p ? FA({}, p.FORBID_TAGS, hA) : {}),
          (uA = 'FORBID_ATTR' in p ? FA({}, p.FORBID_ATTR, hA) : {}),
          (R = 'USE_PROFILES' in p ? p.USE_PROFILES : !1),
          (te = p.ALLOW_ARIA_ATTR !== !1),
          (Fe = p.ALLOW_DATA_ATTR !== !1),
          (IA = p.ALLOW_UNKNOWN_PROTOCOLS || !1),
          (fA = p.ALLOW_SELF_CLOSE_IN_ATTR !== !1),
          (c = p.SAFE_FOR_TEMPLATES || !1),
          (h = p.WHOLE_DOCUMENT || !1),
          (N = p.RETURN_DOM || !1),
          (F = p.RETURN_DOM_FRAGMENT || !1),
          (I = p.RETURN_TRUSTED_TYPE || !1),
          (m = p.FORCE_BODY || !1),
          (r = p.SANITIZE_DOM !== !1),
          (n = p.SANITIZE_NAMED_PROPS || !1),
          (f = p.KEEP_CONTENT !== !1),
          (x = p.IN_PLACE || !1),
          (JA = p.ALLOWED_URI_REGEXP || tn),
          (pe = p.NAMESPACE || fe),
          (yA = p.CUSTOM_ELEMENT_HANDLING || {}),
          p.CUSTOM_ELEMENT_HANDLING &&
            it(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
            (yA.tagNameCheck = p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
          p.CUSTOM_ELEMENT_HANDLING &&
            it(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
            (yA.attributeNameCheck =
              p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
          p.CUSTOM_ELEMENT_HANDLING &&
            typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements ==
              'boolean' &&
            (yA.allowCustomizedBuiltInElements =
              p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
          c && (Fe = !1),
          F && (N = !0),
          R &&
            ((bA = FA({}, [...ii])),
            (wA = []),
            R.html === !0 && (FA(bA, ri), FA(wA, ni)),
            R.svg === !0 && (FA(bA, Zt), FA(wA, $t), FA(wA, Ft)),
            R.svgFilters === !0 && (FA(bA, Vt), FA(wA, $t), FA(wA, Ft)),
            R.mathMl === !0 && (FA(bA, Xt), FA(wA, gi), FA(wA, Ft))),
          p.ADD_TAGS && (bA === Ce && (bA = at(bA)), FA(bA, p.ADD_TAGS, hA)),
          p.ADD_ATTR && (wA === qA && (wA = at(wA)), FA(wA, p.ADD_ATTR, hA)),
          p.ADD_URI_SAFE_ATTR && FA(V, p.ADD_URI_SAFE_ATTR, hA),
          p.FORBID_CONTENTS &&
            (K === iA && (K = at(K)), FA(K, p.FORBID_CONTENTS, hA)),
          f && (bA['#text'] = !0),
          h && FA(bA, ['html', 'head', 'body']),
          bA.table && (FA(bA, ['tbody']), delete C.tbody),
          p.TRUSTED_TYPES_POLICY)
        ) {
          if (typeof p.TRUSTED_TYPES_POLICY.createHTML != 'function')
            throw ut(
              'TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.',
            );
          if (typeof p.TRUSTED_TYPES_POLICY.createScriptURL != 'function')
            throw ut(
              'TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.',
            );
          (XA = p.TRUSTED_TYPES_POLICY), (oe = XA.createHTML(''));
        } else
          XA === void 0 && (XA = dB(AA, s)),
            XA !== null && typeof oe == 'string' && (oe = XA.createHTML(''));
        Ne && Ne(p), (be = p);
      }
    },
    me = FA({}, ['mi', 'mo', 'mn', 'ms', 'mtext']),
    le = FA({}, ['foreignobject', 'desc', 'title', 'annotation-xml']),
    qe = FA({}, ['title', 'style', 'font', 'a', 'script']),
    Oe = FA({}, Zt);
  FA(Oe, Vt), FA(Oe, QB);
  const We = FA({}, Xt);
  FA(We, cB);
  const Qt = function (p) {
      let L = kA(p);
      (!L || !L.tagName) && (L = { namespaceURI: pe, tagName: 'template' });
      const k = Mt(p.tagName),
        eA = Mt(L.tagName);
      return he[p.namespaceURI]
        ? p.namespaceURI === we
          ? L.namespaceURI === fe
            ? k === 'svg'
            : L.namespaceURI === WA
            ? k === 'svg' && (eA === 'annotation-xml' || me[eA])
            : !!Oe[k]
          : p.namespaceURI === WA
          ? L.namespaceURI === fe
            ? k === 'math'
            : L.namespaceURI === we
            ? k === 'math' && le[eA]
            : !!We[k]
          : p.namespaceURI === fe
          ? (L.namespaceURI === we && !le[eA]) ||
            (L.namespaceURI === WA && !me[eA])
            ? !1
            : !We[k] && (qe[k] || !Oe[k])
          : !!(OA === 'application/xhtml+xml' && he[p.namespaceURI])
        : !1;
    },
    ZA = function (p) {
      ct(A.removed, { element: p });
      try {
        p.parentNode.removeChild(p);
      } catch {
        p.remove();
      }
    },
    ue = function (p, L) {
      try {
        ct(A.removed, { attribute: L.getAttributeNode(p), from: L });
      } catch {
        ct(A.removed, { attribute: null, from: L });
      }
      if ((L.removeAttribute(p), p === 'is' && !wA[p]))
        if (N || F)
          try {
            ZA(L);
          } catch {}
        else
          try {
            L.setAttribute(p, '');
          } catch {}
    },
    nt = function (p) {
      let L = null,
        k = null;
      if (m) p = '<remove></remove>' + p;
      else {
        const sA = sB(p, /^[\r\n\t ]+/);
        k = sA && sA[0];
      }
      OA === 'application/xhtml+xml' &&
        pe === fe &&
        (p =
          '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
          p +
          '</body></html>');
      const eA = XA ? XA.createHTML(p) : p;
      if (pe === fe)
        try {
          L = new nA().parseFromString(eA, OA);
        } catch {}
      if (!L || !L.documentElement) {
        L = zA.createDocument(pe, 'template', null);
        try {
          L.documentElement.innerHTML = pA ? oe : eA;
        } catch {}
      }
      const Z = L.body || L.documentElement;
      return (
        p && k && Z.insertBefore(e.createTextNode(k), Z.childNodes[0] || null),
        pe === fe
          ? YA.call(L, h ? 'html' : 'body')[0]
          : h
          ? L.documentElement
          : Z
      );
    },
    B = function (p) {
      return oA.call(
        p.ownerDocument || p,
        p,
        b.SHOW_ELEMENT | b.SHOW_COMMENT | b.SHOW_TEXT,
        null,
      );
    },
    o = function (p) {
      return (
        p instanceof J &&
        (typeof p.nodeName != 'string' ||
          typeof p.textContent != 'string' ||
          typeof p.removeChild != 'function' ||
          !(p.attributes instanceof $) ||
          typeof p.removeAttribute != 'function' ||
          typeof p.setAttribute != 'function' ||
          typeof p.namespaceURI != 'string' ||
          typeof p.insertBefore != 'function' ||
          typeof p.hasChildNodes != 'function')
      );
    },
    E = function (p) {
      return typeof u == 'function' && p instanceof u;
    },
    i = function (p, L, k) {
      z[p] &&
        St(z[p], (eA) => {
          eA.call(A, L, k, be);
        });
    },
    Q = function (p) {
      let L = null;
      if ((i('beforeSanitizeElements', p, null), o(p))) return ZA(p), !0;
      const k = hA(p.nodeName);
      if (
        (i('uponSanitizeElement', p, { tagName: k, allowedTags: bA }),
        p.hasChildNodes() &&
          !E(p.firstElementChild) &&
          Ge(/<[/\w]/g, p.innerHTML) &&
          Ge(/<[/\w]/g, p.textContent))
      )
        return ZA(p), !0;
      if (!bA[k] || C[k]) {
        if (
          !C[k] &&
          G(k) &&
          ((yA.tagNameCheck instanceof RegExp && Ge(yA.tagNameCheck, k)) ||
            (yA.tagNameCheck instanceof Function && yA.tagNameCheck(k)))
        )
          return !1;
        if (f && !K[k]) {
          const eA = kA(p) || p.parentNode,
            Z = Ee(p) || p.childNodes;
          if (Z && eA) {
            const sA = Z.length;
            for (let EA = sA - 1; EA >= 0; --EA)
              eA.insertBefore(RA(Z[EA], !0), ae(p));
          }
        }
        return ZA(p), !0;
      }
      return (p instanceof M && !Qt(p)) ||
        ((k === 'noscript' || k === 'noembed' || k === 'noframes') &&
          Ge(/<\/no(script|embed|frames)/i, p.innerHTML))
        ? (ZA(p), !0)
        : (c &&
            p.nodeType === 3 &&
            ((L = p.textContent),
            St([HA, GA, MA], (eA) => {
              L = Ct(L, eA, ' ');
            }),
            p.textContent !== L &&
              (ct(A.removed, { element: p.cloneNode() }), (p.textContent = L))),
          i('afterSanitizeElements', p, null),
          !1);
    },
    S = function (p, L, k) {
      if (r && (L === 'id' || L === 'name') && (k in e || k in rt)) return !1;
      if (!(Fe && !uA[L] && Ge(ee, L))) {
        if (!(te && Ge($A, L))) {
          if (!wA[L] || uA[L]) {
            if (
              !(
                (G(p) &&
                  ((yA.tagNameCheck instanceof RegExp &&
                    Ge(yA.tagNameCheck, p)) ||
                    (yA.tagNameCheck instanceof Function &&
                      yA.tagNameCheck(p))) &&
                  ((yA.attributeNameCheck instanceof RegExp &&
                    Ge(yA.attributeNameCheck, L)) ||
                    (yA.attributeNameCheck instanceof Function &&
                      yA.attributeNameCheck(L)))) ||
                (L === 'is' &&
                  yA.allowCustomizedBuiltInElements &&
                  ((yA.tagNameCheck instanceof RegExp &&
                    Ge(yA.tagNameCheck, k)) ||
                    (yA.tagNameCheck instanceof Function &&
                      yA.tagNameCheck(k))))
              )
            )
              return !1;
          } else if (!V[L]) {
            if (!Ge(JA, Ct(k, ie, ''))) {
              if (
                !(
                  (L === 'src' || L === 'xlink:href' || L === 'href') &&
                  p !== 'script' &&
                  EB(k, 'data:') === 0 &&
                  QA[p]
                )
              ) {
                if (!(IA && !Ge(re, Ct(k, ie, '')))) {
                  if (k) return !1;
                }
              }
            }
          }
        }
      }
      return !0;
    },
    G = function (p) {
      return p.indexOf('-') > 0;
    },
    v = function (p) {
      i('beforeSanitizeAttributes', p, null);
      const { attributes: L } = p;
      if (!L) return;
      const k = {
        attrName: '',
        attrValue: '',
        keepAttr: !0,
        allowedAttributes: wA,
      };
      let eA = L.length;
      for (; eA--; ) {
        const Z = L[eA],
          { name: sA, namespaceURI: EA, value: w } = Z,
          X = hA(sA);
        let P = sA === 'value' ? w : oB(w);
        if (
          ((k.attrName = X),
          (k.attrValue = P),
          (k.keepAttr = !0),
          (k.forceKeepAttr = void 0),
          i('uponSanitizeAttribute', p, k),
          (P = k.attrValue),
          k.forceKeepAttr || (ue(sA, p), !k.keepAttr))
        )
          continue;
        if (!fA && Ge(/\/>/i, P)) {
          ue(sA, p);
          continue;
        }
        c &&
          St([HA, GA, MA], (gA) => {
            P = Ct(P, gA, ' ');
          });
        const q = hA(p.nodeName);
        if (S(q, X, P)) {
          if (
            (n && (X === 'id' || X === 'name') && (ue(sA, p), (P = a + P)),
            XA &&
              typeof AA == 'object' &&
              typeof AA.getAttributeType == 'function' &&
              !EA)
          )
            switch (AA.getAttributeType(q, X)) {
              case 'TrustedHTML': {
                P = XA.createHTML(P);
                break;
              }
              case 'TrustedScriptURL': {
                P = XA.createScriptURL(P);
                break;
              }
            }
          try {
            EA ? p.setAttributeNS(EA, sA, P) : p.setAttribute(sA, P),
              ti(A.removed);
          } catch {}
        }
      }
      i('afterSanitizeAttributes', p, null);
    },
    j = function T(p) {
      let L = null;
      const k = B(p);
      for (i('beforeSanitizeShadowDOM', p, null); (L = k.nextNode()); )
        i('uponSanitizeShadowNode', L, null),
          !Q(L) && (L.content instanceof l && T(L.content), v(L));
      i('afterSanitizeShadowDOM', p, null);
    };
  return (
    (A.sanitize = function (T) {
      let p =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        L = null,
        k = null,
        eA = null,
        Z = null;
      if (((pA = !T), pA && (T = '<!-->'), typeof T != 'string' && !E(T)))
        if (typeof T.toString == 'function') {
          if (((T = T.toString()), typeof T != 'string'))
            throw ut('dirty is not a string, aborting');
        } else throw ut('toString is not a function');
      if (!A.isSupported) return T;
      if ((D || At(p), (A.removed = []), typeof T == 'string' && (x = !1), x)) {
        if (T.nodeName) {
          const w = hA(T.nodeName);
          if (!bA[w] || C[w])
            throw ut('root node is forbidden and cannot be sanitized in-place');
        }
      } else if (T instanceof u)
        (L = nt('<!---->')),
          (k = L.ownerDocument.importNode(T, !0)),
          (k.nodeType === 1 && k.nodeName === 'BODY') || k.nodeName === 'HTML'
            ? (L = k)
            : L.appendChild(k);
      else {
        if (!N && !c && !h && T.indexOf('<') === -1)
          return XA && I ? XA.createHTML(T) : T;
        if (((L = nt(T)), !L)) return N ? null : I ? oe : '';
      }
      L && m && ZA(L.firstChild);
      const sA = B(x ? T : L);
      for (; (eA = sA.nextNode()); )
        Q(eA) || (eA.content instanceof l && j(eA.content), v(eA));
      if (x) return T;
      if (N) {
        if (F)
          for (Z = cA.call(L.ownerDocument); L.firstChild; )
            Z.appendChild(L.firstChild);
        else Z = L;
        return (
          (wA.shadowroot || wA.shadowrootmode) && (Z = PA.call(g, Z, !0)), Z
        );
      }
      let EA = h ? L.outerHTML : L.innerHTML;
      return (
        h &&
          bA['!doctype'] &&
          L.ownerDocument &&
          L.ownerDocument.doctype &&
          L.ownerDocument.doctype.name &&
          Ge(rn, L.ownerDocument.doctype.name) &&
          (EA =
            '<!DOCTYPE ' +
            L.ownerDocument.doctype.name +
            `>
` +
            EA),
        c &&
          St([HA, GA, MA], (w) => {
            EA = Ct(EA, w, ' ');
          }),
        XA && I ? XA.createHTML(EA) : EA
      );
    }),
    (A.setConfig = function () {
      let T =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      At(T), (D = !0);
    }),
    (A.clearConfig = function () {
      (be = null), (D = !1);
    }),
    (A.isValidAttribute = function (T, p, L) {
      be || At({});
      const k = hA(T),
        eA = hA(p);
      return S(k, eA, L);
    }),
    (A.addHook = function (T, p) {
      typeof p == 'function' && ((z[T] = z[T] || []), ct(z[T], p));
    }),
    (A.removeHook = function (T) {
      if (z[T]) return ti(z[T]);
    }),
    (A.removeHooks = function (T) {
      z[T] && (z[T] = []);
    }),
    (A.removeAllHooks = function () {
      z = {};
    }),
    A
  );
}
nn();
var gn = { exports: {} };
(function (t) {
  (function (A) {
    var e = function (B) {
        var o,
          E = new Float64Array(16);
        if (B) for (o = 0; o < B.length; o++) E[o] = B[o];
        return E;
      },
      g = function () {
        throw new Error('no PRNG');
      },
      s = new Uint8Array(16),
      l = new Uint8Array(32);
    l[0] = 9;
    var y = e(),
      u = e([1]),
      M = e([56129, 1]),
      b = e([
        30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505,
        36039, 65139, 11119, 27886, 20995,
      ]),
      $ = e([
        61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010,
        6542, 64743, 22239, 55772, 9222,
      ]),
      J = e([
        54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982,
        57905, 49316, 21502, 52590, 14035, 8553,
      ]),
      nA = e([
        26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214,
        26214, 26214, 26214, 26214, 26214, 26214,
      ]),
      AA = e([
        41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153,
        11085, 57099, 20417, 9344, 11139,
      ]);
    function vA(B, o, E, i) {
      (B[o] = (E >> 24) & 255),
        (B[o + 1] = (E >> 16) & 255),
        (B[o + 2] = (E >> 8) & 255),
        (B[o + 3] = E & 255),
        (B[o + 4] = (i >> 24) & 255),
        (B[o + 5] = (i >> 16) & 255),
        (B[o + 6] = (i >> 8) & 255),
        (B[o + 7] = i & 255);
    }
    function RA(B, o, E, i, Q) {
      var S,
        G = 0;
      for (S = 0; S < Q; S++) G |= B[o + S] ^ E[i + S];
      return (1 & ((G - 1) >>> 8)) - 1;
    }
    function ae(B, o, E, i) {
      return RA(B, o, E, i, 16);
    }
    function Ee(B, o, E, i) {
      return RA(B, o, E, i, 32);
    }
    function kA(B, o, E, i) {
      for (
        var Q =
            (i[0] & 255) |
            ((i[1] & 255) << 8) |
            ((i[2] & 255) << 16) |
            ((i[3] & 255) << 24),
          S =
            (E[0] & 255) |
            ((E[1] & 255) << 8) |
            ((E[2] & 255) << 16) |
            ((E[3] & 255) << 24),
          G =
            (E[4] & 255) |
            ((E[5] & 255) << 8) |
            ((E[6] & 255) << 16) |
            ((E[7] & 255) << 24),
          v =
            (E[8] & 255) |
            ((E[9] & 255) << 8) |
            ((E[10] & 255) << 16) |
            ((E[11] & 255) << 24),
          j =
            (E[12] & 255) |
            ((E[13] & 255) << 8) |
            ((E[14] & 255) << 16) |
            ((E[15] & 255) << 24),
          T =
            (i[4] & 255) |
            ((i[5] & 255) << 8) |
            ((i[6] & 255) << 16) |
            ((i[7] & 255) << 24),
          p =
            (o[0] & 255) |
            ((o[1] & 255) << 8) |
            ((o[2] & 255) << 16) |
            ((o[3] & 255) << 24),
          L =
            (o[4] & 255) |
            ((o[5] & 255) << 8) |
            ((o[6] & 255) << 16) |
            ((o[7] & 255) << 24),
          k =
            (o[8] & 255) |
            ((o[9] & 255) << 8) |
            ((o[10] & 255) << 16) |
            ((o[11] & 255) << 24),
          eA =
            (o[12] & 255) |
            ((o[13] & 255) << 8) |
            ((o[14] & 255) << 16) |
            ((o[15] & 255) << 24),
          Z =
            (i[8] & 255) |
            ((i[9] & 255) << 8) |
            ((i[10] & 255) << 16) |
            ((i[11] & 255) << 24),
          sA =
            (E[16] & 255) |
            ((E[17] & 255) << 8) |
            ((E[18] & 255) << 16) |
            ((E[19] & 255) << 24),
          EA =
            (E[20] & 255) |
            ((E[21] & 255) << 8) |
            ((E[22] & 255) << 16) |
            ((E[23] & 255) << 24),
          w =
            (E[24] & 255) |
            ((E[25] & 255) << 8) |
            ((E[26] & 255) << 16) |
            ((E[27] & 255) << 24),
          X =
            (E[28] & 255) |
            ((E[29] & 255) << 8) |
            ((E[30] & 255) << 16) |
            ((E[31] & 255) << 24),
          P =
            (i[12] & 255) |
            ((i[13] & 255) << 8) |
            ((i[14] & 255) << 16) |
            ((i[15] & 255) << 24),
          q = Q,
          gA = S,
          tA = G,
          BA = v,
          aA = j,
          rA = T,
          U = p,
          _ = L,
          O = k,
          Y = eA,
          H = Z,
          W = sA,
          CA = EA,
          dA = w,
          SA = X,
          DA = P,
          d,
          mA = 0;
        mA < 20;
        mA += 2
      )
        (d = (q + CA) | 0),
          (aA ^= (d << 7) | (d >>> (32 - 7))),
          (d = (aA + q) | 0),
          (O ^= (d << 9) | (d >>> (32 - 9))),
          (d = (O + aA) | 0),
          (CA ^= (d << 13) | (d >>> (32 - 13))),
          (d = (CA + O) | 0),
          (q ^= (d << 18) | (d >>> (32 - 18))),
          (d = (rA + gA) | 0),
          (Y ^= (d << 7) | (d >>> (32 - 7))),
          (d = (Y + rA) | 0),
          (dA ^= (d << 9) | (d >>> (32 - 9))),
          (d = (dA + Y) | 0),
          (gA ^= (d << 13) | (d >>> (32 - 13))),
          (d = (gA + dA) | 0),
          (rA ^= (d << 18) | (d >>> (32 - 18))),
          (d = (H + U) | 0),
          (SA ^= (d << 7) | (d >>> (32 - 7))),
          (d = (SA + H) | 0),
          (tA ^= (d << 9) | (d >>> (32 - 9))),
          (d = (tA + SA) | 0),
          (U ^= (d << 13) | (d >>> (32 - 13))),
          (d = (U + tA) | 0),
          (H ^= (d << 18) | (d >>> (32 - 18))),
          (d = (DA + W) | 0),
          (BA ^= (d << 7) | (d >>> (32 - 7))),
          (d = (BA + DA) | 0),
          (_ ^= (d << 9) | (d >>> (32 - 9))),
          (d = (_ + BA) | 0),
          (W ^= (d << 13) | (d >>> (32 - 13))),
          (d = (W + _) | 0),
          (DA ^= (d << 18) | (d >>> (32 - 18))),
          (d = (q + BA) | 0),
          (gA ^= (d << 7) | (d >>> (32 - 7))),
          (d = (gA + q) | 0),
          (tA ^= (d << 9) | (d >>> (32 - 9))),
          (d = (tA + gA) | 0),
          (BA ^= (d << 13) | (d >>> (32 - 13))),
          (d = (BA + tA) | 0),
          (q ^= (d << 18) | (d >>> (32 - 18))),
          (d = (rA + aA) | 0),
          (U ^= (d << 7) | (d >>> (32 - 7))),
          (d = (U + rA) | 0),
          (_ ^= (d << 9) | (d >>> (32 - 9))),
          (d = (_ + U) | 0),
          (aA ^= (d << 13) | (d >>> (32 - 13))),
          (d = (aA + _) | 0),
          (rA ^= (d << 18) | (d >>> (32 - 18))),
          (d = (H + Y) | 0),
          (W ^= (d << 7) | (d >>> (32 - 7))),
          (d = (W + H) | 0),
          (O ^= (d << 9) | (d >>> (32 - 9))),
          (d = (O + W) | 0),
          (Y ^= (d << 13) | (d >>> (32 - 13))),
          (d = (Y + O) | 0),
          (H ^= (d << 18) | (d >>> (32 - 18))),
          (d = (DA + SA) | 0),
          (CA ^= (d << 7) | (d >>> (32 - 7))),
          (d = (CA + DA) | 0),
          (dA ^= (d << 9) | (d >>> (32 - 9))),
          (d = (dA + CA) | 0),
          (SA ^= (d << 13) | (d >>> (32 - 13))),
          (d = (SA + dA) | 0),
          (DA ^= (d << 18) | (d >>> (32 - 18)));
      (q = (q + Q) | 0),
        (gA = (gA + S) | 0),
        (tA = (tA + G) | 0),
        (BA = (BA + v) | 0),
        (aA = (aA + j) | 0),
        (rA = (rA + T) | 0),
        (U = (U + p) | 0),
        (_ = (_ + L) | 0),
        (O = (O + k) | 0),
        (Y = (Y + eA) | 0),
        (H = (H + Z) | 0),
        (W = (W + sA) | 0),
        (CA = (CA + EA) | 0),
        (dA = (dA + w) | 0),
        (SA = (SA + X) | 0),
        (DA = (DA + P) | 0),
        (B[0] = (q >>> 0) & 255),
        (B[1] = (q >>> 8) & 255),
        (B[2] = (q >>> 16) & 255),
        (B[3] = (q >>> 24) & 255),
        (B[4] = (gA >>> 0) & 255),
        (B[5] = (gA >>> 8) & 255),
        (B[6] = (gA >>> 16) & 255),
        (B[7] = (gA >>> 24) & 255),
        (B[8] = (tA >>> 0) & 255),
        (B[9] = (tA >>> 8) & 255),
        (B[10] = (tA >>> 16) & 255),
        (B[11] = (tA >>> 24) & 255),
        (B[12] = (BA >>> 0) & 255),
        (B[13] = (BA >>> 8) & 255),
        (B[14] = (BA >>> 16) & 255),
        (B[15] = (BA >>> 24) & 255),
        (B[16] = (aA >>> 0) & 255),
        (B[17] = (aA >>> 8) & 255),
        (B[18] = (aA >>> 16) & 255),
        (B[19] = (aA >>> 24) & 255),
        (B[20] = (rA >>> 0) & 255),
        (B[21] = (rA >>> 8) & 255),
        (B[22] = (rA >>> 16) & 255),
        (B[23] = (rA >>> 24) & 255),
        (B[24] = (U >>> 0) & 255),
        (B[25] = (U >>> 8) & 255),
        (B[26] = (U >>> 16) & 255),
        (B[27] = (U >>> 24) & 255),
        (B[28] = (_ >>> 0) & 255),
        (B[29] = (_ >>> 8) & 255),
        (B[30] = (_ >>> 16) & 255),
        (B[31] = (_ >>> 24) & 255),
        (B[32] = (O >>> 0) & 255),
        (B[33] = (O >>> 8) & 255),
        (B[34] = (O >>> 16) & 255),
        (B[35] = (O >>> 24) & 255),
        (B[36] = (Y >>> 0) & 255),
        (B[37] = (Y >>> 8) & 255),
        (B[38] = (Y >>> 16) & 255),
        (B[39] = (Y >>> 24) & 255),
        (B[40] = (H >>> 0) & 255),
        (B[41] = (H >>> 8) & 255),
        (B[42] = (H >>> 16) & 255),
        (B[43] = (H >>> 24) & 255),
        (B[44] = (W >>> 0) & 255),
        (B[45] = (W >>> 8) & 255),
        (B[46] = (W >>> 16) & 255),
        (B[47] = (W >>> 24) & 255),
        (B[48] = (CA >>> 0) & 255),
        (B[49] = (CA >>> 8) & 255),
        (B[50] = (CA >>> 16) & 255),
        (B[51] = (CA >>> 24) & 255),
        (B[52] = (dA >>> 0) & 255),
        (B[53] = (dA >>> 8) & 255),
        (B[54] = (dA >>> 16) & 255),
        (B[55] = (dA >>> 24) & 255),
        (B[56] = (SA >>> 0) & 255),
        (B[57] = (SA >>> 8) & 255),
        (B[58] = (SA >>> 16) & 255),
        (B[59] = (SA >>> 24) & 255),
        (B[60] = (DA >>> 0) & 255),
        (B[61] = (DA >>> 8) & 255),
        (B[62] = (DA >>> 16) & 255),
        (B[63] = (DA >>> 24) & 255);
    }
    function XA(B, o, E, i) {
      for (
        var Q =
            (i[0] & 255) |
            ((i[1] & 255) << 8) |
            ((i[2] & 255) << 16) |
            ((i[3] & 255) << 24),
          S =
            (E[0] & 255) |
            ((E[1] & 255) << 8) |
            ((E[2] & 255) << 16) |
            ((E[3] & 255) << 24),
          G =
            (E[4] & 255) |
            ((E[5] & 255) << 8) |
            ((E[6] & 255) << 16) |
            ((E[7] & 255) << 24),
          v =
            (E[8] & 255) |
            ((E[9] & 255) << 8) |
            ((E[10] & 255) << 16) |
            ((E[11] & 255) << 24),
          j =
            (E[12] & 255) |
            ((E[13] & 255) << 8) |
            ((E[14] & 255) << 16) |
            ((E[15] & 255) << 24),
          T =
            (i[4] & 255) |
            ((i[5] & 255) << 8) |
            ((i[6] & 255) << 16) |
            ((i[7] & 255) << 24),
          p =
            (o[0] & 255) |
            ((o[1] & 255) << 8) |
            ((o[2] & 255) << 16) |
            ((o[3] & 255) << 24),
          L =
            (o[4] & 255) |
            ((o[5] & 255) << 8) |
            ((o[6] & 255) << 16) |
            ((o[7] & 255) << 24),
          k =
            (o[8] & 255) |
            ((o[9] & 255) << 8) |
            ((o[10] & 255) << 16) |
            ((o[11] & 255) << 24),
          eA =
            (o[12] & 255) |
            ((o[13] & 255) << 8) |
            ((o[14] & 255) << 16) |
            ((o[15] & 255) << 24),
          Z =
            (i[8] & 255) |
            ((i[9] & 255) << 8) |
            ((i[10] & 255) << 16) |
            ((i[11] & 255) << 24),
          sA =
            (E[16] & 255) |
            ((E[17] & 255) << 8) |
            ((E[18] & 255) << 16) |
            ((E[19] & 255) << 24),
          EA =
            (E[20] & 255) |
            ((E[21] & 255) << 8) |
            ((E[22] & 255) << 16) |
            ((E[23] & 255) << 24),
          w =
            (E[24] & 255) |
            ((E[25] & 255) << 8) |
            ((E[26] & 255) << 16) |
            ((E[27] & 255) << 24),
          X =
            (E[28] & 255) |
            ((E[29] & 255) << 8) |
            ((E[30] & 255) << 16) |
            ((E[31] & 255) << 24),
          P =
            (i[12] & 255) |
            ((i[13] & 255) << 8) |
            ((i[14] & 255) << 16) |
            ((i[15] & 255) << 24),
          q = Q,
          gA = S,
          tA = G,
          BA = v,
          aA = j,
          rA = T,
          U = p,
          _ = L,
          O = k,
          Y = eA,
          H = Z,
          W = sA,
          CA = EA,
          dA = w,
          SA = X,
          DA = P,
          d,
          mA = 0;
        mA < 20;
        mA += 2
      )
        (d = (q + CA) | 0),
          (aA ^= (d << 7) | (d >>> (32 - 7))),
          (d = (aA + q) | 0),
          (O ^= (d << 9) | (d >>> (32 - 9))),
          (d = (O + aA) | 0),
          (CA ^= (d << 13) | (d >>> (32 - 13))),
          (d = (CA + O) | 0),
          (q ^= (d << 18) | (d >>> (32 - 18))),
          (d = (rA + gA) | 0),
          (Y ^= (d << 7) | (d >>> (32 - 7))),
          (d = (Y + rA) | 0),
          (dA ^= (d << 9) | (d >>> (32 - 9))),
          (d = (dA + Y) | 0),
          (gA ^= (d << 13) | (d >>> (32 - 13))),
          (d = (gA + dA) | 0),
          (rA ^= (d << 18) | (d >>> (32 - 18))),
          (d = (H + U) | 0),
          (SA ^= (d << 7) | (d >>> (32 - 7))),
          (d = (SA + H) | 0),
          (tA ^= (d << 9) | (d >>> (32 - 9))),
          (d = (tA + SA) | 0),
          (U ^= (d << 13) | (d >>> (32 - 13))),
          (d = (U + tA) | 0),
          (H ^= (d << 18) | (d >>> (32 - 18))),
          (d = (DA + W) | 0),
          (BA ^= (d << 7) | (d >>> (32 - 7))),
          (d = (BA + DA) | 0),
          (_ ^= (d << 9) | (d >>> (32 - 9))),
          (d = (_ + BA) | 0),
          (W ^= (d << 13) | (d >>> (32 - 13))),
          (d = (W + _) | 0),
          (DA ^= (d << 18) | (d >>> (32 - 18))),
          (d = (q + BA) | 0),
          (gA ^= (d << 7) | (d >>> (32 - 7))),
          (d = (gA + q) | 0),
          (tA ^= (d << 9) | (d >>> (32 - 9))),
          (d = (tA + gA) | 0),
          (BA ^= (d << 13) | (d >>> (32 - 13))),
          (d = (BA + tA) | 0),
          (q ^= (d << 18) | (d >>> (32 - 18))),
          (d = (rA + aA) | 0),
          (U ^= (d << 7) | (d >>> (32 - 7))),
          (d = (U + rA) | 0),
          (_ ^= (d << 9) | (d >>> (32 - 9))),
          (d = (_ + U) | 0),
          (aA ^= (d << 13) | (d >>> (32 - 13))),
          (d = (aA + _) | 0),
          (rA ^= (d << 18) | (d >>> (32 - 18))),
          (d = (H + Y) | 0),
          (W ^= (d << 7) | (d >>> (32 - 7))),
          (d = (W + H) | 0),
          (O ^= (d << 9) | (d >>> (32 - 9))),
          (d = (O + W) | 0),
          (Y ^= (d << 13) | (d >>> (32 - 13))),
          (d = (Y + O) | 0),
          (H ^= (d << 18) | (d >>> (32 - 18))),
          (d = (DA + SA) | 0),
          (CA ^= (d << 7) | (d >>> (32 - 7))),
          (d = (CA + DA) | 0),
          (dA ^= (d << 9) | (d >>> (32 - 9))),
          (d = (dA + CA) | 0),
          (SA ^= (d << 13) | (d >>> (32 - 13))),
          (d = (SA + dA) | 0),
          (DA ^= (d << 18) | (d >>> (32 - 18)));
      (B[0] = (q >>> 0) & 255),
        (B[1] = (q >>> 8) & 255),
        (B[2] = (q >>> 16) & 255),
        (B[3] = (q >>> 24) & 255),
        (B[4] = (rA >>> 0) & 255),
        (B[5] = (rA >>> 8) & 255),
        (B[6] = (rA >>> 16) & 255),
        (B[7] = (rA >>> 24) & 255),
        (B[8] = (H >>> 0) & 255),
        (B[9] = (H >>> 8) & 255),
        (B[10] = (H >>> 16) & 255),
        (B[11] = (H >>> 24) & 255),
        (B[12] = (DA >>> 0) & 255),
        (B[13] = (DA >>> 8) & 255),
        (B[14] = (DA >>> 16) & 255),
        (B[15] = (DA >>> 24) & 255),
        (B[16] = (U >>> 0) & 255),
        (B[17] = (U >>> 8) & 255),
        (B[18] = (U >>> 16) & 255),
        (B[19] = (U >>> 24) & 255),
        (B[20] = (_ >>> 0) & 255),
        (B[21] = (_ >>> 8) & 255),
        (B[22] = (_ >>> 16) & 255),
        (B[23] = (_ >>> 24) & 255),
        (B[24] = (O >>> 0) & 255),
        (B[25] = (O >>> 8) & 255),
        (B[26] = (O >>> 16) & 255),
        (B[27] = (O >>> 24) & 255),
        (B[28] = (Y >>> 0) & 255),
        (B[29] = (Y >>> 8) & 255),
        (B[30] = (Y >>> 16) & 255),
        (B[31] = (Y >>> 24) & 255);
    }
    function oe(B, o, E, i) {
      kA(B, o, E, i);
    }
    function zA(B, o, E, i) {
      XA(B, o, E, i);
    }
    var oA = new Uint8Array([
      101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107,
    ]);
    function cA(B, o, E, i, Q, S, G) {
      var v = new Uint8Array(16),
        j = new Uint8Array(64),
        T,
        p;
      for (p = 0; p < 16; p++) v[p] = 0;
      for (p = 0; p < 8; p++) v[p] = S[p];
      for (; Q >= 64; ) {
        for (oe(j, v, G, oA), p = 0; p < 64; p++) B[o + p] = E[i + p] ^ j[p];
        for (T = 1, p = 8; p < 16; p++)
          (T = (T + (v[p] & 255)) | 0), (v[p] = T & 255), (T >>>= 8);
        (Q -= 64), (o += 64), (i += 64);
      }
      if (Q > 0)
        for (oe(j, v, G, oA), p = 0; p < Q; p++) B[o + p] = E[i + p] ^ j[p];
      return 0;
    }
    function YA(B, o, E, i, Q) {
      var S = new Uint8Array(16),
        G = new Uint8Array(64),
        v,
        j;
      for (j = 0; j < 16; j++) S[j] = 0;
      for (j = 0; j < 8; j++) S[j] = i[j];
      for (; E >= 64; ) {
        for (oe(G, S, Q, oA), j = 0; j < 64; j++) B[o + j] = G[j];
        for (v = 1, j = 8; j < 16; j++)
          (v = (v + (S[j] & 255)) | 0), (S[j] = v & 255), (v >>>= 8);
        (E -= 64), (o += 64);
      }
      if (E > 0) for (oe(G, S, Q, oA), j = 0; j < E; j++) B[o + j] = G[j];
      return 0;
    }
    function PA(B, o, E, i, Q) {
      var S = new Uint8Array(32);
      zA(S, i, Q, oA);
      for (var G = new Uint8Array(8), v = 0; v < 8; v++) G[v] = i[v + 16];
      return YA(B, o, E, G, S);
    }
    function z(B, o, E, i, Q, S, G) {
      var v = new Uint8Array(32);
      zA(v, S, G, oA);
      for (var j = new Uint8Array(8), T = 0; T < 8; T++) j[T] = S[T + 16];
      return cA(B, o, E, i, Q, j, v);
    }
    var HA = function (B) {
      (this.buffer = new Uint8Array(16)),
        (this.r = new Uint16Array(10)),
        (this.h = new Uint16Array(10)),
        (this.pad = new Uint16Array(8)),
        (this.leftover = 0),
        (this.fin = 0);
      var o, E, i, Q, S, G, v, j;
      (o = (B[0] & 255) | ((B[1] & 255) << 8)),
        (this.r[0] = o & 8191),
        (E = (B[2] & 255) | ((B[3] & 255) << 8)),
        (this.r[1] = ((o >>> 13) | (E << 3)) & 8191),
        (i = (B[4] & 255) | ((B[5] & 255) << 8)),
        (this.r[2] = ((E >>> 10) | (i << 6)) & 7939),
        (Q = (B[6] & 255) | ((B[7] & 255) << 8)),
        (this.r[3] = ((i >>> 7) | (Q << 9)) & 8191),
        (S = (B[8] & 255) | ((B[9] & 255) << 8)),
        (this.r[4] = ((Q >>> 4) | (S << 12)) & 255),
        (this.r[5] = (S >>> 1) & 8190),
        (G = (B[10] & 255) | ((B[11] & 255) << 8)),
        (this.r[6] = ((S >>> 14) | (G << 2)) & 8191),
        (v = (B[12] & 255) | ((B[13] & 255) << 8)),
        (this.r[7] = ((G >>> 11) | (v << 5)) & 8065),
        (j = (B[14] & 255) | ((B[15] & 255) << 8)),
        (this.r[8] = ((v >>> 8) | (j << 8)) & 8191),
        (this.r[9] = (j >>> 5) & 127),
        (this.pad[0] = (B[16] & 255) | ((B[17] & 255) << 8)),
        (this.pad[1] = (B[18] & 255) | ((B[19] & 255) << 8)),
        (this.pad[2] = (B[20] & 255) | ((B[21] & 255) << 8)),
        (this.pad[3] = (B[22] & 255) | ((B[23] & 255) << 8)),
        (this.pad[4] = (B[24] & 255) | ((B[25] & 255) << 8)),
        (this.pad[5] = (B[26] & 255) | ((B[27] & 255) << 8)),
        (this.pad[6] = (B[28] & 255) | ((B[29] & 255) << 8)),
        (this.pad[7] = (B[30] & 255) | ((B[31] & 255) << 8));
    };
    (HA.prototype.blocks = function (B, o, E) {
      for (
        var i = this.fin ? 0 : 2048,
          Q,
          S,
          G,
          v,
          j,
          T,
          p,
          L,
          k,
          eA,
          Z,
          sA,
          EA,
          w,
          X,
          P,
          q,
          gA,
          tA,
          BA = this.h[0],
          aA = this.h[1],
          rA = this.h[2],
          U = this.h[3],
          _ = this.h[4],
          O = this.h[5],
          Y = this.h[6],
          H = this.h[7],
          W = this.h[8],
          CA = this.h[9],
          dA = this.r[0],
          SA = this.r[1],
          DA = this.r[2],
          d = this.r[3],
          mA = this.r[4],
          LA = this.r[5],
          TA = this.r[6],
          NA = this.r[7],
          UA = this.r[8],
          _A = this.r[9];
        E >= 16;

      )
        (Q = (B[o + 0] & 255) | ((B[o + 1] & 255) << 8)),
          (BA += Q & 8191),
          (S = (B[o + 2] & 255) | ((B[o + 3] & 255) << 8)),
          (aA += ((Q >>> 13) | (S << 3)) & 8191),
          (G = (B[o + 4] & 255) | ((B[o + 5] & 255) << 8)),
          (rA += ((S >>> 10) | (G << 6)) & 8191),
          (v = (B[o + 6] & 255) | ((B[o + 7] & 255) << 8)),
          (U += ((G >>> 7) | (v << 9)) & 8191),
          (j = (B[o + 8] & 255) | ((B[o + 9] & 255) << 8)),
          (_ += ((v >>> 4) | (j << 12)) & 8191),
          (O += (j >>> 1) & 8191),
          (T = (B[o + 10] & 255) | ((B[o + 11] & 255) << 8)),
          (Y += ((j >>> 14) | (T << 2)) & 8191),
          (p = (B[o + 12] & 255) | ((B[o + 13] & 255) << 8)),
          (H += ((T >>> 11) | (p << 5)) & 8191),
          (L = (B[o + 14] & 255) | ((B[o + 15] & 255) << 8)),
          (W += ((p >>> 8) | (L << 8)) & 8191),
          (CA += (L >>> 5) | i),
          (k = 0),
          (eA = k),
          (eA += BA * dA),
          (eA += aA * (5 * _A)),
          (eA += rA * (5 * UA)),
          (eA += U * (5 * NA)),
          (eA += _ * (5 * TA)),
          (k = eA >>> 13),
          (eA &= 8191),
          (eA += O * (5 * LA)),
          (eA += Y * (5 * mA)),
          (eA += H * (5 * d)),
          (eA += W * (5 * DA)),
          (eA += CA * (5 * SA)),
          (k += eA >>> 13),
          (eA &= 8191),
          (Z = k),
          (Z += BA * SA),
          (Z += aA * dA),
          (Z += rA * (5 * _A)),
          (Z += U * (5 * UA)),
          (Z += _ * (5 * NA)),
          (k = Z >>> 13),
          (Z &= 8191),
          (Z += O * (5 * TA)),
          (Z += Y * (5 * LA)),
          (Z += H * (5 * mA)),
          (Z += W * (5 * d)),
          (Z += CA * (5 * DA)),
          (k += Z >>> 13),
          (Z &= 8191),
          (sA = k),
          (sA += BA * DA),
          (sA += aA * SA),
          (sA += rA * dA),
          (sA += U * (5 * _A)),
          (sA += _ * (5 * UA)),
          (k = sA >>> 13),
          (sA &= 8191),
          (sA += O * (5 * NA)),
          (sA += Y * (5 * TA)),
          (sA += H * (5 * LA)),
          (sA += W * (5 * mA)),
          (sA += CA * (5 * d)),
          (k += sA >>> 13),
          (sA &= 8191),
          (EA = k),
          (EA += BA * d),
          (EA += aA * DA),
          (EA += rA * SA),
          (EA += U * dA),
          (EA += _ * (5 * _A)),
          (k = EA >>> 13),
          (EA &= 8191),
          (EA += O * (5 * UA)),
          (EA += Y * (5 * NA)),
          (EA += H * (5 * TA)),
          (EA += W * (5 * LA)),
          (EA += CA * (5 * mA)),
          (k += EA >>> 13),
          (EA &= 8191),
          (w = k),
          (w += BA * mA),
          (w += aA * d),
          (w += rA * DA),
          (w += U * SA),
          (w += _ * dA),
          (k = w >>> 13),
          (w &= 8191),
          (w += O * (5 * _A)),
          (w += Y * (5 * UA)),
          (w += H * (5 * NA)),
          (w += W * (5 * TA)),
          (w += CA * (5 * LA)),
          (k += w >>> 13),
          (w &= 8191),
          (X = k),
          (X += BA * LA),
          (X += aA * mA),
          (X += rA * d),
          (X += U * DA),
          (X += _ * SA),
          (k = X >>> 13),
          (X &= 8191),
          (X += O * dA),
          (X += Y * (5 * _A)),
          (X += H * (5 * UA)),
          (X += W * (5 * NA)),
          (X += CA * (5 * TA)),
          (k += X >>> 13),
          (X &= 8191),
          (P = k),
          (P += BA * TA),
          (P += aA * LA),
          (P += rA * mA),
          (P += U * d),
          (P += _ * DA),
          (k = P >>> 13),
          (P &= 8191),
          (P += O * SA),
          (P += Y * dA),
          (P += H * (5 * _A)),
          (P += W * (5 * UA)),
          (P += CA * (5 * NA)),
          (k += P >>> 13),
          (P &= 8191),
          (q = k),
          (q += BA * NA),
          (q += aA * TA),
          (q += rA * LA),
          (q += U * mA),
          (q += _ * d),
          (k = q >>> 13),
          (q &= 8191),
          (q += O * DA),
          (q += Y * SA),
          (q += H * dA),
          (q += W * (5 * _A)),
          (q += CA * (5 * UA)),
          (k += q >>> 13),
          (q &= 8191),
          (gA = k),
          (gA += BA * UA),
          (gA += aA * NA),
          (gA += rA * TA),
          (gA += U * LA),
          (gA += _ * mA),
          (k = gA >>> 13),
          (gA &= 8191),
          (gA += O * d),
          (gA += Y * DA),
          (gA += H * SA),
          (gA += W * dA),
          (gA += CA * (5 * _A)),
          (k += gA >>> 13),
          (gA &= 8191),
          (tA = k),
          (tA += BA * _A),
          (tA += aA * UA),
          (tA += rA * NA),
          (tA += U * TA),
          (tA += _ * LA),
          (k = tA >>> 13),
          (tA &= 8191),
          (tA += O * mA),
          (tA += Y * d),
          (tA += H * DA),
          (tA += W * SA),
          (tA += CA * dA),
          (k += tA >>> 13),
          (tA &= 8191),
          (k = ((k << 2) + k) | 0),
          (k = (k + eA) | 0),
          (eA = k & 8191),
          (k = k >>> 13),
          (Z += k),
          (BA = eA),
          (aA = Z),
          (rA = sA),
          (U = EA),
          (_ = w),
          (O = X),
          (Y = P),
          (H = q),
          (W = gA),
          (CA = tA),
          (o += 16),
          (E -= 16);
      (this.h[0] = BA),
        (this.h[1] = aA),
        (this.h[2] = rA),
        (this.h[3] = U),
        (this.h[4] = _),
        (this.h[5] = O),
        (this.h[6] = Y),
        (this.h[7] = H),
        (this.h[8] = W),
        (this.h[9] = CA);
    }),
      (HA.prototype.finish = function (B, o) {
        var E = new Uint16Array(10),
          i,
          Q,
          S,
          G;
        if (this.leftover) {
          for (G = this.leftover, this.buffer[G++] = 1; G < 16; G++)
            this.buffer[G] = 0;
          (this.fin = 1), this.blocks(this.buffer, 0, 16);
        }
        for (i = this.h[1] >>> 13, this.h[1] &= 8191, G = 2; G < 10; G++)
          (this.h[G] += i), (i = this.h[G] >>> 13), (this.h[G] &= 8191);
        for (
          this.h[0] += i * 5,
            i = this.h[0] >>> 13,
            this.h[0] &= 8191,
            this.h[1] += i,
            i = this.h[1] >>> 13,
            this.h[1] &= 8191,
            this.h[2] += i,
            E[0] = this.h[0] + 5,
            i = E[0] >>> 13,
            E[0] &= 8191,
            G = 1;
          G < 10;
          G++
        )
          (E[G] = this.h[G] + i), (i = E[G] >>> 13), (E[G] &= 8191);
        for (E[9] -= 8192, Q = (i ^ 1) - 1, G = 0; G < 10; G++) E[G] &= Q;
        for (Q = ~Q, G = 0; G < 10; G++) this.h[G] = (this.h[G] & Q) | E[G];
        for (
          this.h[0] = (this.h[0] | (this.h[1] << 13)) & 65535,
            this.h[1] = ((this.h[1] >>> 3) | (this.h[2] << 10)) & 65535,
            this.h[2] = ((this.h[2] >>> 6) | (this.h[3] << 7)) & 65535,
            this.h[3] = ((this.h[3] >>> 9) | (this.h[4] << 4)) & 65535,
            this.h[4] =
              ((this.h[4] >>> 12) | (this.h[5] << 1) | (this.h[6] << 14)) &
              65535,
            this.h[5] = ((this.h[6] >>> 2) | (this.h[7] << 11)) & 65535,
            this.h[6] = ((this.h[7] >>> 5) | (this.h[8] << 8)) & 65535,
            this.h[7] = ((this.h[8] >>> 8) | (this.h[9] << 5)) & 65535,
            S = this.h[0] + this.pad[0],
            this.h[0] = S & 65535,
            G = 1;
          G < 8;
          G++
        )
          (S = (((this.h[G] + this.pad[G]) | 0) + (S >>> 16)) | 0),
            (this.h[G] = S & 65535);
        (B[o + 0] = (this.h[0] >>> 0) & 255),
          (B[o + 1] = (this.h[0] >>> 8) & 255),
          (B[o + 2] = (this.h[1] >>> 0) & 255),
          (B[o + 3] = (this.h[1] >>> 8) & 255),
          (B[o + 4] = (this.h[2] >>> 0) & 255),
          (B[o + 5] = (this.h[2] >>> 8) & 255),
          (B[o + 6] = (this.h[3] >>> 0) & 255),
          (B[o + 7] = (this.h[3] >>> 8) & 255),
          (B[o + 8] = (this.h[4] >>> 0) & 255),
          (B[o + 9] = (this.h[4] >>> 8) & 255),
          (B[o + 10] = (this.h[5] >>> 0) & 255),
          (B[o + 11] = (this.h[5] >>> 8) & 255),
          (B[o + 12] = (this.h[6] >>> 0) & 255),
          (B[o + 13] = (this.h[6] >>> 8) & 255),
          (B[o + 14] = (this.h[7] >>> 0) & 255),
          (B[o + 15] = (this.h[7] >>> 8) & 255);
      }),
      (HA.prototype.update = function (B, o, E) {
        var i, Q;
        if (this.leftover) {
          for (Q = 16 - this.leftover, Q > E && (Q = E), i = 0; i < Q; i++)
            this.buffer[this.leftover + i] = B[o + i];
          if (((E -= Q), (o += Q), (this.leftover += Q), this.leftover < 16))
            return;
          this.blocks(this.buffer, 0, 16), (this.leftover = 0);
        }
        if (
          (E >= 16 &&
            ((Q = E - (E % 16)), this.blocks(B, o, Q), (o += Q), (E -= Q)),
          E)
        ) {
          for (i = 0; i < E; i++) this.buffer[this.leftover + i] = B[o + i];
          this.leftover += E;
        }
      });
    function GA(B, o, E, i, Q, S) {
      var G = new HA(S);
      return G.update(E, i, Q), G.finish(B, o), 0;
    }
    function MA(B, o, E, i, Q, S) {
      var G = new Uint8Array(16);
      return GA(G, 0, E, i, Q, S), ae(B, o, G, 0);
    }
    function ee(B, o, E, i, Q) {
      var S;
      if (E < 32) return -1;
      for (
        z(B, 0, o, 0, E, i, Q), GA(B, 16, B, 32, E - 32, B), S = 0;
        S < 16;
        S++
      )
        B[S] = 0;
      return 0;
    }
    function $A(B, o, E, i, Q) {
      var S,
        G = new Uint8Array(32);
      if (E < 32 || (PA(G, 0, 32, i, Q), MA(o, 16, o, 32, E - 32, G) !== 0))
        return -1;
      for (z(B, 0, o, 0, E, i, Q), S = 0; S < 32; S++) B[S] = 0;
      return 0;
    }
    function re(B, o) {
      var E;
      for (E = 0; E < 16; E++) B[E] = o[E] | 0;
    }
    function ie(B) {
      var o,
        E,
        i = 1;
      for (o = 0; o < 16; o++)
        (E = B[o] + i + 65535),
          (i = Math.floor(E / 65536)),
          (B[o] = E - i * 65536);
      B[0] += i - 1 + 37 * (i - 1);
    }
    function JA(B, o, E) {
      for (var i, Q = ~(E - 1), S = 0; S < 16; S++)
        (i = Q & (B[S] ^ o[S])), (B[S] ^= i), (o[S] ^= i);
    }
    function bA(B, o) {
      var E,
        i,
        Q,
        S = e(),
        G = e();
      for (E = 0; E < 16; E++) G[E] = o[E];
      for (ie(G), ie(G), ie(G), i = 0; i < 2; i++) {
        for (S[0] = G[0] - 65517, E = 1; E < 15; E++)
          (S[E] = G[E] - 65535 - ((S[E - 1] >> 16) & 1)), (S[E - 1] &= 65535);
        (S[15] = G[15] - 32767 - ((S[14] >> 16) & 1)),
          (Q = (S[15] >> 16) & 1),
          (S[14] &= 65535),
          JA(G, S, 1 - Q);
      }
      for (E = 0; E < 16; E++)
        (B[2 * E] = G[E] & 255), (B[2 * E + 1] = G[E] >> 8);
    }
    function Ce(B, o) {
      var E = new Uint8Array(32),
        i = new Uint8Array(32);
      return bA(E, B), bA(i, o), Ee(E, 0, i, 0);
    }
    function wA(B) {
      var o = new Uint8Array(32);
      return bA(o, B), o[0] & 1;
    }
    function qA(B, o) {
      var E;
      for (E = 0; E < 16; E++) B[E] = o[2 * E] + (o[2 * E + 1] << 8);
      B[15] &= 32767;
    }
    function yA(B, o, E) {
      for (var i = 0; i < 16; i++) B[i] = o[i] + E[i];
    }
    function C(B, o, E) {
      for (var i = 0; i < 16; i++) B[i] = o[i] - E[i];
    }
    function uA(B, o, E) {
      var i,
        Q,
        S = 0,
        G = 0,
        v = 0,
        j = 0,
        T = 0,
        p = 0,
        L = 0,
        k = 0,
        eA = 0,
        Z = 0,
        sA = 0,
        EA = 0,
        w = 0,
        X = 0,
        P = 0,
        q = 0,
        gA = 0,
        tA = 0,
        BA = 0,
        aA = 0,
        rA = 0,
        U = 0,
        _ = 0,
        O = 0,
        Y = 0,
        H = 0,
        W = 0,
        CA = 0,
        dA = 0,
        SA = 0,
        DA = 0,
        d = E[0],
        mA = E[1],
        LA = E[2],
        TA = E[3],
        NA = E[4],
        UA = E[5],
        _A = E[6],
        se = E[7],
        jA = E[8],
        ge = E[9],
        Be = E[10],
        Ie = E[11],
        Qe = E[12],
        ye = E[13],
        xe = E[14],
        de = E[15];
      (i = o[0]),
        (S += i * d),
        (G += i * mA),
        (v += i * LA),
        (j += i * TA),
        (T += i * NA),
        (p += i * UA),
        (L += i * _A),
        (k += i * se),
        (eA += i * jA),
        (Z += i * ge),
        (sA += i * Be),
        (EA += i * Ie),
        (w += i * Qe),
        (X += i * ye),
        (P += i * xe),
        (q += i * de),
        (i = o[1]),
        (G += i * d),
        (v += i * mA),
        (j += i * LA),
        (T += i * TA),
        (p += i * NA),
        (L += i * UA),
        (k += i * _A),
        (eA += i * se),
        (Z += i * jA),
        (sA += i * ge),
        (EA += i * Be),
        (w += i * Ie),
        (X += i * Qe),
        (P += i * ye),
        (q += i * xe),
        (gA += i * de),
        (i = o[2]),
        (v += i * d),
        (j += i * mA),
        (T += i * LA),
        (p += i * TA),
        (L += i * NA),
        (k += i * UA),
        (eA += i * _A),
        (Z += i * se),
        (sA += i * jA),
        (EA += i * ge),
        (w += i * Be),
        (X += i * Ie),
        (P += i * Qe),
        (q += i * ye),
        (gA += i * xe),
        (tA += i * de),
        (i = o[3]),
        (j += i * d),
        (T += i * mA),
        (p += i * LA),
        (L += i * TA),
        (k += i * NA),
        (eA += i * UA),
        (Z += i * _A),
        (sA += i * se),
        (EA += i * jA),
        (w += i * ge),
        (X += i * Be),
        (P += i * Ie),
        (q += i * Qe),
        (gA += i * ye),
        (tA += i * xe),
        (BA += i * de),
        (i = o[4]),
        (T += i * d),
        (p += i * mA),
        (L += i * LA),
        (k += i * TA),
        (eA += i * NA),
        (Z += i * UA),
        (sA += i * _A),
        (EA += i * se),
        (w += i * jA),
        (X += i * ge),
        (P += i * Be),
        (q += i * Ie),
        (gA += i * Qe),
        (tA += i * ye),
        (BA += i * xe),
        (aA += i * de),
        (i = o[5]),
        (p += i * d),
        (L += i * mA),
        (k += i * LA),
        (eA += i * TA),
        (Z += i * NA),
        (sA += i * UA),
        (EA += i * _A),
        (w += i * se),
        (X += i * jA),
        (P += i * ge),
        (q += i * Be),
        (gA += i * Ie),
        (tA += i * Qe),
        (BA += i * ye),
        (aA += i * xe),
        (rA += i * de),
        (i = o[6]),
        (L += i * d),
        (k += i * mA),
        (eA += i * LA),
        (Z += i * TA),
        (sA += i * NA),
        (EA += i * UA),
        (w += i * _A),
        (X += i * se),
        (P += i * jA),
        (q += i * ge),
        (gA += i * Be),
        (tA += i * Ie),
        (BA += i * Qe),
        (aA += i * ye),
        (rA += i * xe),
        (U += i * de),
        (i = o[7]),
        (k += i * d),
        (eA += i * mA),
        (Z += i * LA),
        (sA += i * TA),
        (EA += i * NA),
        (w += i * UA),
        (X += i * _A),
        (P += i * se),
        (q += i * jA),
        (gA += i * ge),
        (tA += i * Be),
        (BA += i * Ie),
        (aA += i * Qe),
        (rA += i * ye),
        (U += i * xe),
        (_ += i * de),
        (i = o[8]),
        (eA += i * d),
        (Z += i * mA),
        (sA += i * LA),
        (EA += i * TA),
        (w += i * NA),
        (X += i * UA),
        (P += i * _A),
        (q += i * se),
        (gA += i * jA),
        (tA += i * ge),
        (BA += i * Be),
        (aA += i * Ie),
        (rA += i * Qe),
        (U += i * ye),
        (_ += i * xe),
        (O += i * de),
        (i = o[9]),
        (Z += i * d),
        (sA += i * mA),
        (EA += i * LA),
        (w += i * TA),
        (X += i * NA),
        (P += i * UA),
        (q += i * _A),
        (gA += i * se),
        (tA += i * jA),
        (BA += i * ge),
        (aA += i * Be),
        (rA += i * Ie),
        (U += i * Qe),
        (_ += i * ye),
        (O += i * xe),
        (Y += i * de),
        (i = o[10]),
        (sA += i * d),
        (EA += i * mA),
        (w += i * LA),
        (X += i * TA),
        (P += i * NA),
        (q += i * UA),
        (gA += i * _A),
        (tA += i * se),
        (BA += i * jA),
        (aA += i * ge),
        (rA += i * Be),
        (U += i * Ie),
        (_ += i * Qe),
        (O += i * ye),
        (Y += i * xe),
        (H += i * de),
        (i = o[11]),
        (EA += i * d),
        (w += i * mA),
        (X += i * LA),
        (P += i * TA),
        (q += i * NA),
        (gA += i * UA),
        (tA += i * _A),
        (BA += i * se),
        (aA += i * jA),
        (rA += i * ge),
        (U += i * Be),
        (_ += i * Ie),
        (O += i * Qe),
        (Y += i * ye),
        (H += i * xe),
        (W += i * de),
        (i = o[12]),
        (w += i * d),
        (X += i * mA),
        (P += i * LA),
        (q += i * TA),
        (gA += i * NA),
        (tA += i * UA),
        (BA += i * _A),
        (aA += i * se),
        (rA += i * jA),
        (U += i * ge),
        (_ += i * Be),
        (O += i * Ie),
        (Y += i * Qe),
        (H += i * ye),
        (W += i * xe),
        (CA += i * de),
        (i = o[13]),
        (X += i * d),
        (P += i * mA),
        (q += i * LA),
        (gA += i * TA),
        (tA += i * NA),
        (BA += i * UA),
        (aA += i * _A),
        (rA += i * se),
        (U += i * jA),
        (_ += i * ge),
        (O += i * Be),
        (Y += i * Ie),
        (H += i * Qe),
        (W += i * ye),
        (CA += i * xe),
        (dA += i * de),
        (i = o[14]),
        (P += i * d),
        (q += i * mA),
        (gA += i * LA),
        (tA += i * TA),
        (BA += i * NA),
        (aA += i * UA),
        (rA += i * _A),
        (U += i * se),
        (_ += i * jA),
        (O += i * ge),
        (Y += i * Be),
        (H += i * Ie),
        (W += i * Qe),
        (CA += i * ye),
        (dA += i * xe),
        (SA += i * de),
        (i = o[15]),
        (q += i * d),
        (gA += i * mA),
        (tA += i * LA),
        (BA += i * TA),
        (aA += i * NA),
        (rA += i * UA),
        (U += i * _A),
        (_ += i * se),
        (O += i * jA),
        (Y += i * ge),
        (H += i * Be),
        (W += i * Ie),
        (CA += i * Qe),
        (dA += i * ye),
        (SA += i * xe),
        (DA += i * de),
        (S += 38 * gA),
        (G += 38 * tA),
        (v += 38 * BA),
        (j += 38 * aA),
        (T += 38 * rA),
        (p += 38 * U),
        (L += 38 * _),
        (k += 38 * O),
        (eA += 38 * Y),
        (Z += 38 * H),
        (sA += 38 * W),
        (EA += 38 * CA),
        (w += 38 * dA),
        (X += 38 * SA),
        (P += 38 * DA),
        (Q = 1),
        (i = S + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (S = i - Q * 65536),
        (i = G + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (G = i - Q * 65536),
        (i = v + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (v = i - Q * 65536),
        (i = j + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (j = i - Q * 65536),
        (i = T + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (T = i - Q * 65536),
        (i = p + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (p = i - Q * 65536),
        (i = L + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (L = i - Q * 65536),
        (i = k + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (k = i - Q * 65536),
        (i = eA + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (eA = i - Q * 65536),
        (i = Z + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (Z = i - Q * 65536),
        (i = sA + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (sA = i - Q * 65536),
        (i = EA + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (EA = i - Q * 65536),
        (i = w + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (w = i - Q * 65536),
        (i = X + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (X = i - Q * 65536),
        (i = P + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (P = i - Q * 65536),
        (i = q + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (q = i - Q * 65536),
        (S += Q - 1 + 37 * (Q - 1)),
        (Q = 1),
        (i = S + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (S = i - Q * 65536),
        (i = G + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (G = i - Q * 65536),
        (i = v + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (v = i - Q * 65536),
        (i = j + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (j = i - Q * 65536),
        (i = T + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (T = i - Q * 65536),
        (i = p + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (p = i - Q * 65536),
        (i = L + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (L = i - Q * 65536),
        (i = k + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (k = i - Q * 65536),
        (i = eA + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (eA = i - Q * 65536),
        (i = Z + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (Z = i - Q * 65536),
        (i = sA + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (sA = i - Q * 65536),
        (i = EA + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (EA = i - Q * 65536),
        (i = w + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (w = i - Q * 65536),
        (i = X + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (X = i - Q * 65536),
        (i = P + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (P = i - Q * 65536),
        (i = q + Q + 65535),
        (Q = Math.floor(i / 65536)),
        (q = i - Q * 65536),
        (S += Q - 1 + 37 * (Q - 1)),
        (B[0] = S),
        (B[1] = G),
        (B[2] = v),
        (B[3] = j),
        (B[4] = T),
        (B[5] = p),
        (B[6] = L),
        (B[7] = k),
        (B[8] = eA),
        (B[9] = Z),
        (B[10] = sA),
        (B[11] = EA),
        (B[12] = w),
        (B[13] = X),
        (B[14] = P),
        (B[15] = q);
    }
    function te(B, o) {
      uA(B, o, o);
    }
    function Fe(B, o) {
      var E = e(),
        i;
      for (i = 0; i < 16; i++) E[i] = o[i];
      for (i = 253; i >= 0; i--) te(E, E), i !== 2 && i !== 4 && uA(E, E, o);
      for (i = 0; i < 16; i++) B[i] = E[i];
    }
    function IA(B, o) {
      var E = e(),
        i;
      for (i = 0; i < 16; i++) E[i] = o[i];
      for (i = 250; i >= 0; i--) te(E, E), i !== 1 && uA(E, E, o);
      for (i = 0; i < 16; i++) B[i] = E[i];
    }
    function fA(B, o, E) {
      var i = new Uint8Array(32),
        Q = new Float64Array(80),
        S,
        G,
        v = e(),
        j = e(),
        T = e(),
        p = e(),
        L = e(),
        k = e();
      for (G = 0; G < 31; G++) i[G] = o[G];
      for (
        i[31] = (o[31] & 127) | 64, i[0] &= 248, qA(Q, E), G = 0;
        G < 16;
        G++
      )
        (j[G] = Q[G]), (p[G] = v[G] = T[G] = 0);
      for (v[0] = p[0] = 1, G = 254; G >= 0; --G)
        (S = (i[G >>> 3] >>> (G & 7)) & 1),
          JA(v, j, S),
          JA(T, p, S),
          yA(L, v, T),
          C(v, v, T),
          yA(T, j, p),
          C(j, j, p),
          te(p, L),
          te(k, v),
          uA(v, T, v),
          uA(T, j, L),
          yA(L, v, T),
          C(v, v, T),
          te(j, v),
          C(T, p, k),
          uA(v, T, M),
          yA(v, v, p),
          uA(T, T, v),
          uA(v, p, k),
          uA(p, j, Q),
          te(j, L),
          JA(v, j, S),
          JA(T, p, S);
      for (G = 0; G < 16; G++)
        (Q[G + 16] = v[G]),
          (Q[G + 32] = T[G]),
          (Q[G + 48] = j[G]),
          (Q[G + 64] = p[G]);
      var eA = Q.subarray(32),
        Z = Q.subarray(16);
      return Fe(eA, eA), uA(Z, Z, eA), bA(B, Z), 0;
    }
    function c(B, o) {
      return fA(B, o, l);
    }
    function h(B, o) {
      return g(o, 32), c(B, o);
    }
    function D(B, o, E) {
      var i = new Uint8Array(32);
      return fA(i, E, o), zA(B, s, i, oA);
    }
    var m = ee,
      N = $A;
    function F(B, o, E, i, Q, S) {
      var G = new Uint8Array(32);
      return D(G, Q, S), m(B, o, E, i, G);
    }
    function I(B, o, E, i, Q, S) {
      var G = new Uint8Array(32);
      return D(G, Q, S), N(B, o, E, i, G);
    }
    var r = [
      1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
      3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
      2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
      310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
      1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317,
      3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139,
      264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
      1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
      2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879,
      3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901,
      113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
      773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
      1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142,
      2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
      3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
      3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
      430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593,
      883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403,
      1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
      2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
      2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
      3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
      3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
      174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
      685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
      1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866,
      1607167915, 987167468, 1816402316, 1246189591,
    ];
    function n(B, o, E, i) {
      for (
        var Q = new Int32Array(16),
          S = new Int32Array(16),
          G,
          v,
          j,
          T,
          p,
          L,
          k,
          eA,
          Z,
          sA,
          EA,
          w,
          X,
          P,
          q,
          gA,
          tA,
          BA,
          aA,
          rA,
          U,
          _,
          O,
          Y,
          H,
          W,
          CA = B[0],
          dA = B[1],
          SA = B[2],
          DA = B[3],
          d = B[4],
          mA = B[5],
          LA = B[6],
          TA = B[7],
          NA = o[0],
          UA = o[1],
          _A = o[2],
          se = o[3],
          jA = o[4],
          ge = o[5],
          Be = o[6],
          Ie = o[7],
          Qe = 0;
        i >= 128;

      ) {
        for (aA = 0; aA < 16; aA++)
          (rA = 8 * aA + Qe),
            (Q[aA] =
              (E[rA + 0] << 24) |
              (E[rA + 1] << 16) |
              (E[rA + 2] << 8) |
              E[rA + 3]),
            (S[aA] =
              (E[rA + 4] << 24) |
              (E[rA + 5] << 16) |
              (E[rA + 6] << 8) |
              E[rA + 7]);
        for (aA = 0; aA < 80; aA++)
          if (
            ((G = CA),
            (v = dA),
            (j = SA),
            (T = DA),
            (p = d),
            (L = mA),
            (k = LA),
            (eA = TA),
            (Z = NA),
            (sA = UA),
            (EA = _A),
            (w = se),
            (X = jA),
            (P = ge),
            (q = Be),
            (gA = Ie),
            (U = TA),
            (_ = Ie),
            (O = _ & 65535),
            (Y = _ >>> 16),
            (H = U & 65535),
            (W = U >>> 16),
            (U =
              ((d >>> 14) | (jA << (32 - 14))) ^
              ((d >>> 18) | (jA << (32 - 18))) ^
              ((jA >>> (41 - 32)) | (d << (32 - (41 - 32))))),
            (_ =
              ((jA >>> 14) | (d << (32 - 14))) ^
              ((jA >>> 18) | (d << (32 - 18))) ^
              ((d >>> (41 - 32)) | (jA << (32 - (41 - 32))))),
            (O += _ & 65535),
            (Y += _ >>> 16),
            (H += U & 65535),
            (W += U >>> 16),
            (U = (d & mA) ^ (~d & LA)),
            (_ = (jA & ge) ^ (~jA & Be)),
            (O += _ & 65535),
            (Y += _ >>> 16),
            (H += U & 65535),
            (W += U >>> 16),
            (U = r[aA * 2]),
            (_ = r[aA * 2 + 1]),
            (O += _ & 65535),
            (Y += _ >>> 16),
            (H += U & 65535),
            (W += U >>> 16),
            (U = Q[aA % 16]),
            (_ = S[aA % 16]),
            (O += _ & 65535),
            (Y += _ >>> 16),
            (H += U & 65535),
            (W += U >>> 16),
            (Y += O >>> 16),
            (H += Y >>> 16),
            (W += H >>> 16),
            (tA = (H & 65535) | (W << 16)),
            (BA = (O & 65535) | (Y << 16)),
            (U = tA),
            (_ = BA),
            (O = _ & 65535),
            (Y = _ >>> 16),
            (H = U & 65535),
            (W = U >>> 16),
            (U =
              ((CA >>> 28) | (NA << (32 - 28))) ^
              ((NA >>> (34 - 32)) | (CA << (32 - (34 - 32)))) ^
              ((NA >>> (39 - 32)) | (CA << (32 - (39 - 32))))),
            (_ =
              ((NA >>> 28) | (CA << (32 - 28))) ^
              ((CA >>> (34 - 32)) | (NA << (32 - (34 - 32)))) ^
              ((CA >>> (39 - 32)) | (NA << (32 - (39 - 32))))),
            (O += _ & 65535),
            (Y += _ >>> 16),
            (H += U & 65535),
            (W += U >>> 16),
            (U = (CA & dA) ^ (CA & SA) ^ (dA & SA)),
            (_ = (NA & UA) ^ (NA & _A) ^ (UA & _A)),
            (O += _ & 65535),
            (Y += _ >>> 16),
            (H += U & 65535),
            (W += U >>> 16),
            (Y += O >>> 16),
            (H += Y >>> 16),
            (W += H >>> 16),
            (eA = (H & 65535) | (W << 16)),
            (gA = (O & 65535) | (Y << 16)),
            (U = T),
            (_ = w),
            (O = _ & 65535),
            (Y = _ >>> 16),
            (H = U & 65535),
            (W = U >>> 16),
            (U = tA),
            (_ = BA),
            (O += _ & 65535),
            (Y += _ >>> 16),
            (H += U & 65535),
            (W += U >>> 16),
            (Y += O >>> 16),
            (H += Y >>> 16),
            (W += H >>> 16),
            (T = (H & 65535) | (W << 16)),
            (w = (O & 65535) | (Y << 16)),
            (dA = G),
            (SA = v),
            (DA = j),
            (d = T),
            (mA = p),
            (LA = L),
            (TA = k),
            (CA = eA),
            (UA = Z),
            (_A = sA),
            (se = EA),
            (jA = w),
            (ge = X),
            (Be = P),
            (Ie = q),
            (NA = gA),
            aA % 16 === 15)
          )
            for (rA = 0; rA < 16; rA++)
              (U = Q[rA]),
                (_ = S[rA]),
                (O = _ & 65535),
                (Y = _ >>> 16),
                (H = U & 65535),
                (W = U >>> 16),
                (U = Q[(rA + 9) % 16]),
                (_ = S[(rA + 9) % 16]),
                (O += _ & 65535),
                (Y += _ >>> 16),
                (H += U & 65535),
                (W += U >>> 16),
                (tA = Q[(rA + 1) % 16]),
                (BA = S[(rA + 1) % 16]),
                (U =
                  ((tA >>> 1) | (BA << (32 - 1))) ^
                  ((tA >>> 8) | (BA << (32 - 8))) ^
                  (tA >>> 7)),
                (_ =
                  ((BA >>> 1) | (tA << (32 - 1))) ^
                  ((BA >>> 8) | (tA << (32 - 8))) ^
                  ((BA >>> 7) | (tA << (32 - 7)))),
                (O += _ & 65535),
                (Y += _ >>> 16),
                (H += U & 65535),
                (W += U >>> 16),
                (tA = Q[(rA + 14) % 16]),
                (BA = S[(rA + 14) % 16]),
                (U =
                  ((tA >>> 19) | (BA << (32 - 19))) ^
                  ((BA >>> (61 - 32)) | (tA << (32 - (61 - 32)))) ^
                  (tA >>> 6)),
                (_ =
                  ((BA >>> 19) | (tA << (32 - 19))) ^
                  ((tA >>> (61 - 32)) | (BA << (32 - (61 - 32)))) ^
                  ((BA >>> 6) | (tA << (32 - 6)))),
                (O += _ & 65535),
                (Y += _ >>> 16),
                (H += U & 65535),
                (W += U >>> 16),
                (Y += O >>> 16),
                (H += Y >>> 16),
                (W += H >>> 16),
                (Q[rA] = (H & 65535) | (W << 16)),
                (S[rA] = (O & 65535) | (Y << 16));
        (U = CA),
          (_ = NA),
          (O = _ & 65535),
          (Y = _ >>> 16),
          (H = U & 65535),
          (W = U >>> 16),
          (U = B[0]),
          (_ = o[0]),
          (O += _ & 65535),
          (Y += _ >>> 16),
          (H += U & 65535),
          (W += U >>> 16),
          (Y += O >>> 16),
          (H += Y >>> 16),
          (W += H >>> 16),
          (B[0] = CA = (H & 65535) | (W << 16)),
          (o[0] = NA = (O & 65535) | (Y << 16)),
          (U = dA),
          (_ = UA),
          (O = _ & 65535),
          (Y = _ >>> 16),
          (H = U & 65535),
          (W = U >>> 16),
          (U = B[1]),
          (_ = o[1]),
          (O += _ & 65535),
          (Y += _ >>> 16),
          (H += U & 65535),
          (W += U >>> 16),
          (Y += O >>> 16),
          (H += Y >>> 16),
          (W += H >>> 16),
          (B[1] = dA = (H & 65535) | (W << 16)),
          (o[1] = UA = (O & 65535) | (Y << 16)),
          (U = SA),
          (_ = _A),
          (O = _ & 65535),
          (Y = _ >>> 16),
          (H = U & 65535),
          (W = U >>> 16),
          (U = B[2]),
          (_ = o[2]),
          (O += _ & 65535),
          (Y += _ >>> 16),
          (H += U & 65535),
          (W += U >>> 16),
          (Y += O >>> 16),
          (H += Y >>> 16),
          (W += H >>> 16),
          (B[2] = SA = (H & 65535) | (W << 16)),
          (o[2] = _A = (O & 65535) | (Y << 16)),
          (U = DA),
          (_ = se),
          (O = _ & 65535),
          (Y = _ >>> 16),
          (H = U & 65535),
          (W = U >>> 16),
          (U = B[3]),
          (_ = o[3]),
          (O += _ & 65535),
          (Y += _ >>> 16),
          (H += U & 65535),
          (W += U >>> 16),
          (Y += O >>> 16),
          (H += Y >>> 16),
          (W += H >>> 16),
          (B[3] = DA = (H & 65535) | (W << 16)),
          (o[3] = se = (O & 65535) | (Y << 16)),
          (U = d),
          (_ = jA),
          (O = _ & 65535),
          (Y = _ >>> 16),
          (H = U & 65535),
          (W = U >>> 16),
          (U = B[4]),
          (_ = o[4]),
          (O += _ & 65535),
          (Y += _ >>> 16),
          (H += U & 65535),
          (W += U >>> 16),
          (Y += O >>> 16),
          (H += Y >>> 16),
          (W += H >>> 16),
          (B[4] = d = (H & 65535) | (W << 16)),
          (o[4] = jA = (O & 65535) | (Y << 16)),
          (U = mA),
          (_ = ge),
          (O = _ & 65535),
          (Y = _ >>> 16),
          (H = U & 65535),
          (W = U >>> 16),
          (U = B[5]),
          (_ = o[5]),
          (O += _ & 65535),
          (Y += _ >>> 16),
          (H += U & 65535),
          (W += U >>> 16),
          (Y += O >>> 16),
          (H += Y >>> 16),
          (W += H >>> 16),
          (B[5] = mA = (H & 65535) | (W << 16)),
          (o[5] = ge = (O & 65535) | (Y << 16)),
          (U = LA),
          (_ = Be),
          (O = _ & 65535),
          (Y = _ >>> 16),
          (H = U & 65535),
          (W = U >>> 16),
          (U = B[6]),
          (_ = o[6]),
          (O += _ & 65535),
          (Y += _ >>> 16),
          (H += U & 65535),
          (W += U >>> 16),
          (Y += O >>> 16),
          (H += Y >>> 16),
          (W += H >>> 16),
          (B[6] = LA = (H & 65535) | (W << 16)),
          (o[6] = Be = (O & 65535) | (Y << 16)),
          (U = TA),
          (_ = Ie),
          (O = _ & 65535),
          (Y = _ >>> 16),
          (H = U & 65535),
          (W = U >>> 16),
          (U = B[7]),
          (_ = o[7]),
          (O += _ & 65535),
          (Y += _ >>> 16),
          (H += U & 65535),
          (W += U >>> 16),
          (Y += O >>> 16),
          (H += Y >>> 16),
          (W += H >>> 16),
          (B[7] = TA = (H & 65535) | (W << 16)),
          (o[7] = Ie = (O & 65535) | (Y << 16)),
          (Qe += 128),
          (i -= 128);
      }
      return i;
    }
    function a(B, o, E) {
      var i = new Int32Array(8),
        Q = new Int32Array(8),
        S = new Uint8Array(256),
        G,
        v = E;
      for (
        i[0] = 1779033703,
          i[1] = 3144134277,
          i[2] = 1013904242,
          i[3] = 2773480762,
          i[4] = 1359893119,
          i[5] = 2600822924,
          i[6] = 528734635,
          i[7] = 1541459225,
          Q[0] = 4089235720,
          Q[1] = 2227873595,
          Q[2] = 4271175723,
          Q[3] = 1595750129,
          Q[4] = 2917565137,
          Q[5] = 725511199,
          Q[6] = 4215389547,
          Q[7] = 327033209,
          n(i, Q, o, E),
          E %= 128,
          G = 0;
        G < E;
        G++
      )
        S[G] = o[v - E + G];
      for (
        S[E] = 128,
          E = 256 - 128 * (E < 112 ? 1 : 0),
          S[E - 9] = 0,
          vA(S, E - 8, (v / 536870912) | 0, v << 3),
          n(i, Q, S, E),
          G = 0;
        G < 8;
        G++
      )
        vA(B, 8 * G, i[G], Q[G]);
      return 0;
    }
    function f(B, o) {
      var E = e(),
        i = e(),
        Q = e(),
        S = e(),
        G = e(),
        v = e(),
        j = e(),
        T = e(),
        p = e();
      C(E, B[1], B[0]),
        C(p, o[1], o[0]),
        uA(E, E, p),
        yA(i, B[0], B[1]),
        yA(p, o[0], o[1]),
        uA(i, i, p),
        uA(Q, B[3], o[3]),
        uA(Q, Q, $),
        uA(S, B[2], o[2]),
        yA(S, S, S),
        C(G, i, E),
        C(v, S, Q),
        yA(j, S, Q),
        yA(T, i, E),
        uA(B[0], G, v),
        uA(B[1], T, j),
        uA(B[2], j, v),
        uA(B[3], G, T);
    }
    function x(B, o, E) {
      var i;
      for (i = 0; i < 4; i++) JA(B[i], o[i], E);
    }
    function R(B, o) {
      var E = e(),
        i = e(),
        Q = e();
      Fe(Q, o[2]),
        uA(E, o[0], Q),
        uA(i, o[1], Q),
        bA(B, i),
        (B[31] ^= wA(E) << 7);
    }
    function K(B, o, E) {
      var i, Q;
      for (
        re(B[0], y), re(B[1], u), re(B[2], u), re(B[3], y), Q = 255;
        Q >= 0;
        --Q
      )
        (i = (E[(Q / 8) | 0] >> (Q & 7)) & 1),
          x(B, o, i),
          f(o, B),
          f(B, B),
          x(B, o, i);
    }
    function iA(B, o) {
      var E = [e(), e(), e(), e()];
      re(E[0], J), re(E[1], nA), re(E[2], u), uA(E[3], J, nA), K(B, E, o);
    }
    function QA(B, o, E) {
      var i = new Uint8Array(64),
        Q = [e(), e(), e(), e()],
        S;
      for (
        E || g(o, 32),
          a(i, o, 32),
          i[0] &= 248,
          i[31] &= 127,
          i[31] |= 64,
          iA(Q, i),
          R(B, Q),
          S = 0;
        S < 32;
        S++
      )
        o[S + 32] = B[S];
      return 0;
    }
    var lA = new Float64Array([
      237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16,
    ]);
    function V(B, o) {
      var E, i, Q, S;
      for (i = 63; i >= 32; --i) {
        for (E = 0, Q = i - 32, S = i - 12; Q < S; ++Q)
          (o[Q] += E - 16 * o[i] * lA[Q - (i - 32)]),
            (E = Math.floor((o[Q] + 128) / 256)),
            (o[Q] -= E * 256);
        (o[Q] += E), (o[i] = 0);
      }
      for (E = 0, Q = 0; Q < 32; Q++)
        (o[Q] += E - (o[31] >> 4) * lA[Q]), (E = o[Q] >> 8), (o[Q] &= 255);
      for (Q = 0; Q < 32; Q++) o[Q] -= E * lA[Q];
      for (i = 0; i < 32; i++) (o[i + 1] += o[i] >> 8), (B[i] = o[i] & 255);
    }
    function xA(B) {
      var o = new Float64Array(64),
        E;
      for (E = 0; E < 64; E++) o[E] = B[E];
      for (E = 0; E < 64; E++) B[E] = 0;
      V(B, o);
    }
    function WA(B, o, E, i) {
      var Q = new Uint8Array(64),
        S = new Uint8Array(64),
        G = new Uint8Array(64),
        v,
        j,
        T = new Float64Array(64),
        p = [e(), e(), e(), e()];
      a(Q, i, 32), (Q[0] &= 248), (Q[31] &= 127), (Q[31] |= 64);
      var L = E + 64;
      for (v = 0; v < E; v++) B[64 + v] = o[v];
      for (v = 0; v < 32; v++) B[32 + v] = Q[32 + v];
      for (
        a(G, B.subarray(32), E + 32), xA(G), iA(p, G), R(B, p), v = 32;
        v < 64;
        v++
      )
        B[v] = i[v];
      for (a(S, B, E + 64), xA(S), v = 0; v < 64; v++) T[v] = 0;
      for (v = 0; v < 32; v++) T[v] = G[v];
      for (v = 0; v < 32; v++) for (j = 0; j < 32; j++) T[v + j] += S[v] * Q[j];
      return V(B.subarray(32), T), L;
    }
    function we(B, o) {
      var E = e(),
        i = e(),
        Q = e(),
        S = e(),
        G = e(),
        v = e(),
        j = e();
      return (
        re(B[2], u),
        qA(B[1], o),
        te(Q, B[1]),
        uA(S, Q, b),
        C(Q, Q, B[2]),
        yA(S, B[2], S),
        te(G, S),
        te(v, G),
        uA(j, v, G),
        uA(E, j, Q),
        uA(E, E, S),
        IA(E, E),
        uA(E, E, Q),
        uA(E, E, S),
        uA(E, E, S),
        uA(B[0], E, S),
        te(i, B[0]),
        uA(i, i, S),
        Ce(i, Q) && uA(B[0], B[0], AA),
        te(i, B[0]),
        uA(i, i, S),
        Ce(i, Q)
          ? -1
          : (wA(B[0]) === o[31] >> 7 && C(B[0], y, B[0]),
            uA(B[3], B[0], B[1]),
            0)
      );
    }
    function fe(B, o, E, i) {
      var Q,
        S = new Uint8Array(32),
        G = new Uint8Array(64),
        v = [e(), e(), e(), e()],
        j = [e(), e(), e(), e()];
      if (E < 64 || we(j, i)) return -1;
      for (Q = 0; Q < E; Q++) B[Q] = o[Q];
      for (Q = 0; Q < 32; Q++) B[Q + 32] = i[Q];
      if (
        (a(G, B, E),
        xA(G),
        K(v, j, G),
        iA(j, o.subarray(32)),
        f(v, j),
        R(S, v),
        (E -= 64),
        Ee(o, 0, S, 0))
      ) {
        for (Q = 0; Q < E; Q++) B[Q] = 0;
        return -1;
      }
      for (Q = 0; Q < E; Q++) B[Q] = o[Q + 64];
      return E;
    }
    var pe = 32,
      pA = 24,
      he = 32,
      ne = 16,
      OA = 32,
      KA = 32,
      Je = 32,
      hA = 32,
      be = 32,
      rt = pA,
      it = he,
      At = ne,
      me = 64,
      le = 32,
      qe = 64,
      Oe = 32,
      We = 64;
    A.lowlevel = {
      crypto_core_hsalsa20: zA,
      crypto_stream_xor: z,
      crypto_stream: PA,
      crypto_stream_salsa20_xor: cA,
      crypto_stream_salsa20: YA,
      crypto_onetimeauth: GA,
      crypto_onetimeauth_verify: MA,
      crypto_verify_16: ae,
      crypto_verify_32: Ee,
      crypto_secretbox: ee,
      crypto_secretbox_open: $A,
      crypto_scalarmult: fA,
      crypto_scalarmult_base: c,
      crypto_box_beforenm: D,
      crypto_box_afternm: m,
      crypto_box: F,
      crypto_box_open: I,
      crypto_box_keypair: h,
      crypto_hash: a,
      crypto_sign: WA,
      crypto_sign_keypair: QA,
      crypto_sign_open: fe,
      crypto_secretbox_KEYBYTES: pe,
      crypto_secretbox_NONCEBYTES: pA,
      crypto_secretbox_ZEROBYTES: he,
      crypto_secretbox_BOXZEROBYTES: ne,
      crypto_scalarmult_BYTES: OA,
      crypto_scalarmult_SCALARBYTES: KA,
      crypto_box_PUBLICKEYBYTES: Je,
      crypto_box_SECRETKEYBYTES: hA,
      crypto_box_BEFORENMBYTES: be,
      crypto_box_NONCEBYTES: rt,
      crypto_box_ZEROBYTES: it,
      crypto_box_BOXZEROBYTES: At,
      crypto_sign_BYTES: me,
      crypto_sign_PUBLICKEYBYTES: le,
      crypto_sign_SECRETKEYBYTES: qe,
      crypto_sign_SEEDBYTES: Oe,
      crypto_hash_BYTES: We,
      gf: e,
      D: b,
      L: lA,
      pack25519: bA,
      unpack25519: qA,
      M: uA,
      A: yA,
      S: te,
      Z: C,
      pow2523: IA,
      add: f,
      set25519: re,
      modL: V,
      scalarmult: K,
      scalarbase: iA,
    };
    function Qt(B, o) {
      if (B.length !== pe) throw new Error('bad key size');
      if (o.length !== pA) throw new Error('bad nonce size');
    }
    function ZA(B, o) {
      if (B.length !== Je) throw new Error('bad public key size');
      if (o.length !== hA) throw new Error('bad secret key size');
    }
    function ue() {
      for (var B = 0; B < arguments.length; B++)
        if (!(arguments[B] instanceof Uint8Array))
          throw new TypeError('unexpected type, use Uint8Array');
    }
    function nt(B) {
      for (var o = 0; o < B.length; o++) B[o] = 0;
    }
    (A.randomBytes = function (B) {
      var o = new Uint8Array(B);
      return g(o, B), o;
    }),
      (A.secretbox = function (B, o, E) {
        ue(B, o, E), Qt(E, o);
        for (
          var i = new Uint8Array(he + B.length),
            Q = new Uint8Array(i.length),
            S = 0;
          S < B.length;
          S++
        )
          i[S + he] = B[S];
        return ee(Q, i, i.length, o, E), Q.subarray(ne);
      }),
      (A.secretbox.open = function (B, o, E) {
        ue(B, o, E), Qt(E, o);
        for (
          var i = new Uint8Array(ne + B.length),
            Q = new Uint8Array(i.length),
            S = 0;
          S < B.length;
          S++
        )
          i[S + ne] = B[S];
        return i.length < 32 || $A(Q, i, i.length, o, E) !== 0
          ? null
          : Q.subarray(he);
      }),
      (A.secretbox.keyLength = pe),
      (A.secretbox.nonceLength = pA),
      (A.secretbox.overheadLength = ne),
      (A.scalarMult = function (B, o) {
        if ((ue(B, o), B.length !== KA)) throw new Error('bad n size');
        if (o.length !== OA) throw new Error('bad p size');
        var E = new Uint8Array(OA);
        return fA(E, B, o), E;
      }),
      (A.scalarMult.base = function (B) {
        if ((ue(B), B.length !== KA)) throw new Error('bad n size');
        var o = new Uint8Array(OA);
        return c(o, B), o;
      }),
      (A.scalarMult.scalarLength = KA),
      (A.scalarMult.groupElementLength = OA),
      (A.box = function (B, o, E, i) {
        var Q = A.box.before(E, i);
        return A.secretbox(B, o, Q);
      }),
      (A.box.before = function (B, o) {
        ue(B, o), ZA(B, o);
        var E = new Uint8Array(be);
        return D(E, B, o), E;
      }),
      (A.box.after = A.secretbox),
      (A.box.open = function (B, o, E, i) {
        var Q = A.box.before(E, i);
        return A.secretbox.open(B, o, Q);
      }),
      (A.box.open.after = A.secretbox.open),
      (A.box.keyPair = function () {
        var B = new Uint8Array(Je),
          o = new Uint8Array(hA);
        return h(B, o), { publicKey: B, secretKey: o };
      }),
      (A.box.keyPair.fromSecretKey = function (B) {
        if ((ue(B), B.length !== hA)) throw new Error('bad secret key size');
        var o = new Uint8Array(Je);
        return c(o, B), { publicKey: o, secretKey: new Uint8Array(B) };
      }),
      (A.box.publicKeyLength = Je),
      (A.box.secretKeyLength = hA),
      (A.box.sharedKeyLength = be),
      (A.box.nonceLength = rt),
      (A.box.overheadLength = A.secretbox.overheadLength),
      (A.sign = function (B, o) {
        if ((ue(B, o), o.length !== qe)) throw new Error('bad secret key size');
        var E = new Uint8Array(me + B.length);
        return WA(E, B, B.length, o), E;
      }),
      (A.sign.open = function (B, o) {
        if ((ue(B, o), o.length !== le)) throw new Error('bad public key size');
        var E = new Uint8Array(B.length),
          i = fe(E, B, B.length, o);
        if (i < 0) return null;
        for (var Q = new Uint8Array(i), S = 0; S < Q.length; S++) Q[S] = E[S];
        return Q;
      }),
      (A.sign.detached = function (B, o) {
        for (
          var E = A.sign(B, o), i = new Uint8Array(me), Q = 0;
          Q < i.length;
          Q++
        )
          i[Q] = E[Q];
        return i;
      }),
      (A.sign.detached.verify = function (B, o, E) {
        if ((ue(B, o, E), o.length !== me))
          throw new Error('bad signature size');
        if (E.length !== le) throw new Error('bad public key size');
        var i = new Uint8Array(me + B.length),
          Q = new Uint8Array(me + B.length),
          S;
        for (S = 0; S < me; S++) i[S] = o[S];
        for (S = 0; S < B.length; S++) i[S + me] = B[S];
        return fe(Q, i, i.length, E) >= 0;
      }),
      (A.sign.keyPair = function () {
        var B = new Uint8Array(le),
          o = new Uint8Array(qe);
        return QA(B, o), { publicKey: B, secretKey: o };
      }),
      (A.sign.keyPair.fromSecretKey = function (B) {
        if ((ue(B), B.length !== qe)) throw new Error('bad secret key size');
        for (var o = new Uint8Array(le), E = 0; E < o.length; E++)
          o[E] = B[32 + E];
        return { publicKey: o, secretKey: new Uint8Array(B) };
      }),
      (A.sign.keyPair.fromSeed = function (B) {
        if ((ue(B), B.length !== Oe)) throw new Error('bad seed size');
        for (
          var o = new Uint8Array(le), E = new Uint8Array(qe), i = 0;
          i < 32;
          i++
        )
          E[i] = B[i];
        return QA(o, E, !0), { publicKey: o, secretKey: E };
      }),
      (A.sign.publicKeyLength = le),
      (A.sign.secretKeyLength = qe),
      (A.sign.seedLength = Oe),
      (A.sign.signatureLength = me),
      (A.hash = function (B) {
        ue(B);
        var o = new Uint8Array(We);
        return a(o, B, B.length), o;
      }),
      (A.hash.hashLength = We),
      (A.verify = function (B, o) {
        return (
          ue(B, o),
          B.length === 0 || o.length === 0 || B.length !== o.length
            ? !1
            : RA(B, 0, o, 0, B.length) === 0
        );
      }),
      (A.setPRNG = function (B) {
        g = B;
      }),
      (function () {
        var B = typeof self < 'u' ? self.crypto || self.msCrypto : null;
        if (B && B.getRandomValues) {
          var o = 65536;
          A.setPRNG(function (E, i) {
            var Q,
              S = new Uint8Array(i);
            for (Q = 0; Q < i; Q += o)
              B.getRandomValues(S.subarray(Q, Q + Math.min(i - Q, o)));
            for (Q = 0; Q < i; Q++) E[Q] = S[Q];
            nt(S);
          });
        } else
          typeof fn < 'u' &&
            ((B = Qn),
            B &&
              B.randomBytes &&
              A.setPRNG(function (E, i) {
                var Q,
                  S = B.randomBytes(i);
                for (Q = 0; Q < i; Q++) E[Q] = S[Q];
                nt(S);
              }));
      })();
  })(t.exports ? t.exports : (self.nacl = self.nacl || {}));
})(gn);
var mt = gn.exports;
function ur(t) {
  var A;
  return new Uint8Array(
    ((A = t.match(/.{1,2}/g)) !== null && A !== void 0 ? A : []).map((e) =>
      parseInt(e, 16),
    ),
  ).buffer;
}
function st(t) {
  return new Uint8Array(t).reduce(
    (A, e) => A + e.toString(16).padStart(2, '0'),
    '',
  );
}
const DB = (t, A) => {
    if (t.byteLength !== A.byteLength) return !1;
    const e = new Uint8Array(t),
      g = new Uint8Array(A);
    for (let s = 0; s < e.length; s++) if (e[s] !== g[s]) return !1;
    return !0;
  },
  Ii = (t) => {
    if (t <= 127) return 1;
    if (t <= 255) return 2;
    if (t <= 65535) return 3;
    if (t <= 16777215) return 4;
    throw new Error('Length too long (> 4 bytes)');
  },
  ai = (t, A, e) => {
    if (e <= 127) return (t[A] = e), 1;
    if (e <= 255) return (t[A] = 129), (t[A + 1] = e), 2;
    if (e <= 65535) return (t[A] = 130), (t[A + 1] = e >> 8), (t[A + 2] = e), 3;
    if (e <= 16777215)
      return (
        (t[A] = 131),
        (t[A + 1] = e >> 16),
        (t[A + 2] = e >> 8),
        (t[A + 3] = e),
        4
      );
    throw new Error('Length too long (> 4 bytes)');
  },
  hr = (t, A) => {
    if (t[A] < 128) return 1;
    if (t[A] === 128) throw new Error('Invalid length 0');
    if (t[A] === 129) return 2;
    if (t[A] === 130) return 3;
    if (t[A] === 131) return 4;
    throw new Error('Length too long (> 4 bytes)');
  },
  SB = (t, A) => {
    const e = hr(t, A);
    if (e === 1) return t[A];
    if (e === 2) return t[A + 1];
    if (e === 3) return (t[A + 1] << 8) + t[A + 2];
    if (e === 4) return (t[A + 1] << 16) + (t[A + 2] << 8) + t[A + 3];
    throw new Error('Length too long (> 4 bytes)');
  };
Uint8Array.from([48, 12, 6, 10, 43, 6, 1, 4, 1, 131, 184, 67, 1, 1]);
const si = Uint8Array.from([48, 5, 6, 3, 43, 101, 112]);
Uint8Array.from([
  48, 16, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 5, 43, 129, 4, 0, 10,
]);
function NB(t, A) {
  const e = 2 + Ii(t.byteLength + 1),
    g = A.byteLength + e + t.byteLength;
  let s = 0;
  const l = new Uint8Array(1 + Ii(g) + g);
  return (
    (l[s++] = 48),
    (s += ai(l, s, g)),
    l.set(A, s),
    (s += A.byteLength),
    (l[s++] = 3),
    (s += ai(l, s, t.byteLength + 1)),
    (l[s++] = 0),
    l.set(new Uint8Array(t), s),
    l
  );
}
const FB = (t, A) => {
  let e = 0;
  const g = (u, M) => {
      if (s[e++] !== u) throw new Error('Expected: ' + M);
    },
    s = new Uint8Array(t);
  if (
    (g(48, 'sequence'), (e += hr(s, e)), !DB(s.slice(e, e + A.byteLength), A))
  )
    throw new Error('Not the expected OID.');
  (e += A.byteLength), g(3, 'bit string');
  const l = SB(s, e) - 1;
  (e += hr(s, e)), g(0, '0 padding');
  const y = s.slice(e);
  if (l !== y.length)
    throw new Error(
      `DER payload mismatch: Expected length ${l} actual length ${y.length}`,
    );
  return y;
};
class Ke {
  constructor(A) {
    (this.rawKey = A), (this.derKey = Ke.derEncode(A));
  }
  static from(A) {
    return this.fromDer(A.toDer());
  }
  static fromRaw(A) {
    return new Ke(A);
  }
  static fromDer(A) {
    return new Ke(this.derDecode(A));
  }
  static derEncode(A) {
    return NB(A, si).buffer;
  }
  static derDecode(A) {
    const e = FB(A, si);
    if (e.length !== this.RAW_KEY_LENGTH)
      throw new Error('An Ed25519 public key must be exactly 32bytes long');
    return e;
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
}
Ke.RAW_KEY_LENGTH = 32;
class tt extends Fr {
  constructor(A, e) {
    super(), (this._privateKey = e), (this._publicKey = Ke.from(A));
  }
  static generate(A) {
    if (A && A.length !== 32)
      throw new Error('Ed25519 Seed needs to be 32 bytes long.');
    const { publicKey: e, secretKey: g } =
      A === void 0 ? mt.sign.keyPair() : mt.sign.keyPair.fromSeed(A);
    return new this(Ke.fromRaw(e), g);
  }
  static fromParsedJson(A) {
    const [e, g] = A;
    return new tt(Ke.fromDer(ur(e)), ur(g));
  }
  static fromJSON(A) {
    const e = JSON.parse(A);
    if (Array.isArray(e)) {
      if (typeof e[0] == 'string' && typeof e[1] == 'string')
        return this.fromParsedJson([e[0], e[1]]);
      throw new Error(
        'Deserialization error: JSON must have at least 2 items.',
      );
    }
    throw new Error(
      `Deserialization error: Invalid JSON type for string: ${JSON.stringify(
        A,
      )}`,
    );
  }
  static fromKeyPair(A, e) {
    return new tt(Ke.fromRaw(A), e);
  }
  static fromSecretKey(A) {
    const e = mt.sign.keyPair.fromSecretKey(new Uint8Array(A));
    return tt.fromKeyPair(e.publicKey, e.secretKey);
  }
  toJSON() {
    return [st(this._publicKey.toDer()), st(this._privateKey)];
  }
  getKeyPair() {
    return { secretKey: this._privateKey, publicKey: this._publicKey };
  }
  getPublicKey() {
    return this._publicKey;
  }
  async sign(A) {
    const e = new Uint8Array(A);
    return mt.sign.detached(e, new Uint8Array(this._privateKey)).buffer;
  }
}
class br extends Error {
  constructor(A) {
    super(A), (this.message = A), Object.setPrototypeOf(this, br.prototype);
  }
}
function Ei(t) {
  if (t) return t;
  if (typeof crypto < 'u' && crypto.subtle) return crypto.subtle;
  throw new br(
    'Global crypto was not available and none was provided. Please inlcude a SubtleCrypto implementation. See https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto',
  );
}
class Ut extends Fr {
  constructor(A, e, g) {
    super(), (this._keyPair = A), (this._derKey = e), (this._subtleCrypto = g);
  }
  static async generate(A) {
    const {
        extractable: e = !1,
        keyUsages: g = ['sign', 'verify'],
        subtleCrypto: s,
      } = A ?? {},
      l = Ei(s),
      y = await l.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, e, g),
      u = await l.exportKey('spki', y.publicKey);
    return new this(y, u, l);
  }
  static async fromKeyPair(A, e) {
    const g = Ei(e),
      s = await g.exportKey('spki', A.publicKey);
    return new Ut(A, s, g);
  }
  getKeyPair() {
    return this._keyPair;
  }
  getPublicKey() {
    const A = this._derKey,
      e = Object.create(this._keyPair.publicKey);
    return (
      (e.toDer = function () {
        return A;
      }),
      e
    );
  }
  async sign(A) {
    const e = { name: 'ECDSA', hash: { name: 'SHA-256' } };
    return (
      this._keyPair.privateKey,
      await this._subtleCrypto.sign(e, this._keyPair.privateKey, A)
    );
  }
}
var mB =
  (globalThis && globalThis.__rest) ||
  function (t, A) {
    var e = {};
    for (var g in t)
      Object.prototype.hasOwnProperty.call(t, g) &&
        A.indexOf(g) < 0 &&
        (e[g] = t[g]);
    if (t != null && typeof Object.getOwnPropertySymbols == 'function')
      for (var s = 0, g = Object.getOwnPropertySymbols(t); s < g.length; s++)
        A.indexOf(g[s]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(t, g[s]) &&
          (e[g[s]] = t[g[s]]);
    return e;
  };
const GB = new TextEncoder().encode('ic-request-auth-delegation'),
  MB = new TextEncoder().encode(`
ic-request`);
function Ar(t) {
  if (typeof t != 'string' || t.length < 64)
    throw new Error('Invalid public key.');
  return ur(t);
}
class Rr {
  constructor(A, e, g) {
    (this.pubkey = A), (this.expiration = e), (this.targets = g);
  }
  toCBOR() {
    return Me.value.map(
      Object.assign(
        {
          pubkey: Me.value.bytes(this.pubkey),
          expiration: Me.value.u64(this.expiration.toString(16), 16),
        },
        this.targets && {
          targets: Me.value.array(
            this.targets.map((A) => Me.value.bytes(A.toUint8Array())),
          ),
        },
      ),
    );
  }
  toJSON() {
    return Object.assign(
      { expiration: this.expiration.toString(16), pubkey: st(this.pubkey) },
      this.targets && { targets: this.targets.map((A) => A.toHex()) },
    );
  }
}
async function bB(t, A, e, g) {
  const s = new Rr(A.toDer(), BigInt(+e) * BigInt(1e6), g),
    l = new Uint8Array([...GB, ...new Uint8Array(Nr(s))]),
    y = await t.sign(l);
  return { delegation: s, signature: y };
}
class _t {
  constructor(A, e) {
    (this.delegations = A), (this.publicKey = e);
  }
  static async create(A, e, g = new Date(Date.now() + 15 * 60 * 1e3), s = {}) {
    var l, y;
    const u = await bB(A, e, g, s.targets);
    return new _t(
      [
        ...(((l = s.previous) === null || l === void 0
          ? void 0
          : l.delegations) || []),
        u,
      ],
      ((y = s.previous) === null || y === void 0 ? void 0 : y.publicKey) ||
        A.getPublicKey().toDer(),
    );
  }
  static fromJSON(A) {
    const { publicKey: e, delegations: g } =
      typeof A == 'string' ? JSON.parse(A) : A;
    if (!Array.isArray(g)) throw new Error('Invalid delegations.');
    const s = g.map((l) => {
      const { delegation: y, signature: u } = l,
        { pubkey: M, expiration: b, targets: $ } = y;
      if ($ !== void 0 && !Array.isArray($))
        throw new Error('Invalid targets.');
      return {
        delegation: new Rr(
          Ar(M),
          BigInt(`0x${b}`),
          $ &&
            $.map((J) => {
              if (typeof J != 'string') throw new Error('Invalid target.');
              return $e.fromHex(J);
            }),
        ),
        signature: Ar(u),
      };
    });
    return new this(s, Ar(e));
  }
  static fromDelegations(A, e) {
    return new this(A, e);
  }
  toJSON() {
    return {
      delegations: this.delegations.map((A) => {
        const { delegation: e, signature: g } = A,
          { targets: s } = e;
        return {
          delegation: Object.assign(
            { expiration: e.expiration.toString(16), pubkey: st(e.pubkey) },
            s && { targets: s.map((l) => l.toHex()) },
          ),
          signature: st(g),
        };
      }),
      publicKey: st(this.publicKey),
    };
  }
}
class oi extends Fr {
  constructor(A, e) {
    super(), (this._inner = A), (this._delegation = e);
  }
  static fromDelegation(A, e) {
    return new this(A, e);
  }
  getDelegation() {
    return this._delegation;
  }
  getPublicKey() {
    return { toDer: () => this._delegation.publicKey };
  }
  sign(A) {
    return this._inner.sign(A);
  }
  async transformRequest(A) {
    const { body: e } = A,
      g = mB(A, ['body']),
      s = await Nr(e);
    return Object.assign(Object.assign({}, g), {
      body: {
        content: e,
        sender_sig: await this.sign(
          new Uint8Array([...MB, ...new Uint8Array(s)]),
        ),
        sender_delegation: this._delegation.delegations,
        sender_pubkey: this._delegation.publicKey,
      },
    });
  }
}
function RB(t, A) {
  for (const { delegation: s } of t.delegations)
    if (+new Date(Number(s.expiration / BigInt(1e6))) <= +Date.now()) return !1;
  const e = [],
    g = A?.scope;
  g &&
    (Array.isArray(g)
      ? e.push(...g.map((s) => (typeof s == 'string' ? $e.fromText(s) : s)))
      : e.push(typeof g == 'string' ? $e.fromText(g) : g));
  for (const s of e) {
    const l = s.toText();
    for (const { delegation: y } of t.delegations) {
      if (y.targets === void 0) continue;
      let u = !0;
      for (const M of y.targets)
        if (M.toText() === l) {
          u = !1;
          break;
        }
      if (u) return !1;
    }
  }
  return !0;
}
var fi;
(function (t) {
  t[(t.ECDSA_WITH_SHA256 = -7)] = 'ECDSA_WITH_SHA256';
})(fi || (fi = {}));
const Qi = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'wheel'];
class ci {
  constructor(A = {}) {
    var e;
    (this.callbacks = []),
      (this.idleTimeout = 10 * 60 * 1e3),
      (this.timeoutID = void 0);
    const { onIdle: g, idleTimeout: s = 10 * 60 * 1e3 } = A || {};
    (this.callbacks = g ? [g] : []), (this.idleTimeout = s);
    const l = this._resetTimer.bind(this);
    window.addEventListener('load', l, !0),
      Qi.forEach(function (u) {
        document.addEventListener(u, l, !0);
      });
    const y = (u, M) => {
      let b;
      return (...$) => {
        const J = this,
          nA = function () {
            (b = void 0), u.apply(J, $);
          };
        clearTimeout(b), (b = window.setTimeout(nA, M));
      };
    };
    if (A?.captureScroll) {
      const u = y(
        l,
        (e = A?.scrollDebounce) !== null && e !== void 0 ? e : 100,
      );
      window.addEventListener('scroll', u, !0);
    }
    l();
  }
  static create(A = {}) {
    return new this(A);
  }
  registerCallback(A) {
    this.callbacks.push(A);
  }
  exit() {
    clearTimeout(this.timeoutID),
      window.removeEventListener('load', this._resetTimer, !0);
    const A = this._resetTimer.bind(this);
    Qi.forEach(function (e) {
      document.removeEventListener(e, A, !0);
    }),
      this.callbacks.forEach((e) => e());
  }
  _resetTimer() {
    const A = this.exit.bind(this);
    window.clearTimeout(this.timeoutID),
      (this.timeoutID = window.setTimeout(A, this.idleTimeout));
  }
}
const UB = (t, A) => A.some((e) => t instanceof e);
let Ci, ui;
function _B() {
  return (
    Ci ||
    (Ci = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function kB() {
  return (
    ui ||
    (ui = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const Bn = new WeakMap(),
  lr = new WeakMap(),
  In = new WeakMap(),
  er = new WeakMap(),
  Ur = new WeakMap();
function LB(t) {
  const A = new Promise((e, g) => {
    const s = () => {
        t.removeEventListener('success', l), t.removeEventListener('error', y);
      },
      l = () => {
        e(Xe(t.result)), s();
      },
      y = () => {
        g(t.error), s();
      };
    t.addEventListener('success', l), t.addEventListener('error', y);
  });
  return (
    A.then((e) => {
      e instanceof IDBCursor && Bn.set(e, t);
    }).catch(() => {}),
    Ur.set(A, t),
    A
  );
}
function TB(t) {
  if (lr.has(t)) return;
  const A = new Promise((e, g) => {
    const s = () => {
        t.removeEventListener('complete', l),
          t.removeEventListener('error', y),
          t.removeEventListener('abort', y);
      },
      l = () => {
        e(), s();
      },
      y = () => {
        g(t.error || new DOMException('AbortError', 'AbortError')), s();
      };
    t.addEventListener('complete', l),
      t.addEventListener('error', y),
      t.addEventListener('abort', y);
  });
  lr.set(t, A);
}
let wr = {
  get(t, A, e) {
    if (t instanceof IDBTransaction) {
      if (A === 'done') return lr.get(t);
      if (A === 'objectStoreNames') return t.objectStoreNames || In.get(t);
      if (A === 'store')
        return e.objectStoreNames[1]
          ? void 0
          : e.objectStore(e.objectStoreNames[0]);
    }
    return Xe(t[A]);
  },
  set(t, A, e) {
    return (t[A] = e), !0;
  },
  has(t, A) {
    return t instanceof IDBTransaction && (A === 'done' || A === 'store')
      ? !0
      : A in t;
  },
};
function vB(t) {
  wr = t(wr);
}
function YB(t) {
  return t === IDBDatabase.prototype.transaction &&
    !('objectStoreNames' in IDBTransaction.prototype)
    ? function (A, ...e) {
        const g = t.call(tr(this), A, ...e);
        return In.set(g, A.sort ? A.sort() : [A]), Xe(g);
      }
    : kB().includes(t)
    ? function (...A) {
        return t.apply(tr(this), A), Xe(Bn.get(this));
      }
    : function (...A) {
        return Xe(t.apply(tr(this), A));
      };
}
function HB(t) {
  return typeof t == 'function'
    ? YB(t)
    : (t instanceof IDBTransaction && TB(t),
      UB(t, _B()) ? new Proxy(t, wr) : t);
}
function Xe(t) {
  if (t instanceof IDBRequest) return LB(t);
  if (er.has(t)) return er.get(t);
  const A = HB(t);
  return A !== t && (er.set(t, A), Ur.set(A, t)), A;
}
const tr = (t) => Ur.get(t);
function JB(t, A, { blocked: e, upgrade: g, blocking: s, terminated: l } = {}) {
  const y = indexedDB.open(t, A),
    u = Xe(y);
  return (
    g &&
      y.addEventListener('upgradeneeded', (M) => {
        g(Xe(y.result), M.oldVersion, M.newVersion, Xe(y.transaction), M);
      }),
    e && y.addEventListener('blocked', (M) => e(M.oldVersion, M.newVersion, M)),
    u
      .then((M) => {
        l && M.addEventListener('close', () => l()),
          s &&
            M.addEventListener('versionchange', (b) =>
              s(b.oldVersion, b.newVersion, b),
            );
      })
      .catch(() => {}),
    u
  );
}
const qB = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
  OB = ['put', 'add', 'delete', 'clear'],
  rr = new Map();
function hi(t, A) {
  if (!(t instanceof IDBDatabase && !(A in t) && typeof A == 'string')) return;
  if (rr.get(A)) return rr.get(A);
  const e = A.replace(/FromIndex$/, ''),
    g = A !== e,
    s = OB.includes(e);
  if (
    !(e in (g ? IDBIndex : IDBObjectStore).prototype) ||
    !(s || qB.includes(e))
  )
    return;
  const l = async function (y, ...u) {
    const M = this.transaction(y, s ? 'readwrite' : 'readonly');
    let b = M.store;
    return (
      g && (b = b.index(u.shift())),
      (await Promise.all([b[e](...u), s && M.done]))[0]
    );
  };
  return rr.set(A, l), l;
}
vB((t) => ({
  ...t,
  get: (A, e, g) => hi(A, e) || t.get(A, e, g),
  has: (A, e) => !!hi(A, e) || t.has(A, e),
}));
const an = 'auth-client-db',
  sn = 'ic-keyval',
  KB = async (t = an, A = sn, e) => (
    En &&
      localStorage != null &&
      localStorage.getItem(Ve) &&
      (localStorage.removeItem(Ve), localStorage.removeItem(Ze)),
    await JB(t, e, {
      upgrade: (g) => {
        g.objectStoreNames,
          g.objectStoreNames.contains(A) && g.clear(A),
          g.createObjectStore(A);
      },
    })
  );
async function PB(t, A, e) {
  return await t.get(A, e);
}
async function WB(t, A, e, g) {
  return await t.put(A, g, e);
}
async function jB(t, A, e) {
  return await t.delete(A, e);
}
class _r {
  constructor(A, e) {
    (this._db = A), (this._storeName = e);
  }
  static async create(A) {
    const { dbName: e = an, storeName: g = sn, version: s = 1 } = A ?? {},
      l = await KB(e, g, s);
    return new _r(l, g);
  }
  async set(A, e) {
    return await WB(this._db, this._storeName, A, e);
  }
  async get(A) {
    var e;
    return (e = await PB(this._db, this._storeName, A)) !== null && e !== void 0
      ? e
      : null;
  }
  async remove(A) {
    return await jB(this._db, this._storeName, A);
  }
}
const Ze = 'identity',
  Ve = 'delegation',
  zB = 'iv',
  ZB = 1,
  En = typeof window < 'u';
class VB {
  constructor(A = 'ic-', e) {
    (this.prefix = A), (this._localStorage = e);
  }
  get(A) {
    return Promise.resolve(this._getLocalStorage().getItem(this.prefix + A));
  }
  set(A, e) {
    return (
      this._getLocalStorage().setItem(this.prefix + A, e), Promise.resolve()
    );
  }
  remove(A) {
    return (
      this._getLocalStorage().removeItem(this.prefix + A), Promise.resolve()
    );
  }
  _getLocalStorage() {
    if (this._localStorage) return this._localStorage;
    const A =
      typeof window > 'u'
        ? typeof global > 'u'
          ? typeof self > 'u'
            ? void 0
            : self.localStorage
          : global.localStorage
        : window.localStorage;
    if (!A) throw new Error('Could not find local storage.');
    return A;
  }
}
class XB {
  get _db() {
    return new Promise((A) => {
      if (this.initializedDb) {
        A(this.initializedDb);
        return;
      }
      _r.create({ version: ZB }).then((e) => {
        (this.initializedDb = e), A(e);
      });
    });
  }
  async get(A) {
    return await (await this._db).get(A);
  }
  async set(A, e) {
    await (await this._db).set(A, e);
  }
  async remove(A) {
    await (await this._db).remove(A);
  }
}
const $B = 'https://identity.ic0.app',
  AI = '#authorize',
  ir = 'ECDSA',
  nr = 'Ed25519',
  eI = 500,
  tI = 'UserInterrupt';
class II {
  constructor(A, e, g, s, l, y, u, M) {
    var b;
    (this._identity = A),
      (this._key = e),
      (this._chain = g),
      (this._storage = s),
      (this.idleManager = l),
      (this._createOptions = y),
      (this._idpWindow = u),
      (this._eventHandler = M);
    const $ = this.logout.bind(this),
      J = y?.idleOptions;
    !J?.onIdle &&
      !J?.disableDefaultIdleCallback &&
      ((b = this.idleManager) === null ||
        b === void 0 ||
        b.registerCallback(() => {
          $(), location.reload();
        }));
  }
  static async create(A = {}) {
    var e, g, s;
    const l = (e = A.storage) !== null && e !== void 0 ? e : new XB(),
      y = (g = A.keyType) !== null && g !== void 0 ? g : ir;
    let u = null;
    if (A.identity) u = A.identity;
    else {
      let J = await l.get(Ze);
      if (!J && En)
        try {
          const nA = new VB(),
            AA = await nA.get(Ve),
            vA = await nA.get(Ze);
          AA &&
            vA &&
            y === ir &&
            (console.log(
              'Discovered an identity stored in localstorage. Migrating to IndexedDB',
            ),
            await l.set(Ve, AA),
            await l.set(Ze, vA),
            (J = AA),
            await nA.remove(Ve),
            await nA.remove(Ze));
        } catch (nA) {
          console.error(
            'error while attempting to recover localstorage: ' + nA,
          );
        }
      if (J)
        try {
          typeof J == 'object'
            ? y === nr && typeof J == 'string'
              ? (u = await tt.fromJSON(J))
              : (u = await Ut.fromKeyPair(J))
            : typeof J == 'string' && (u = tt.fromJSON(J));
        } catch {}
    }
    let M = new jr(),
      b = null;
    if (u)
      try {
        const J = await l.get(Ve);
        if (typeof J == 'object' && J !== null)
          throw new Error(
            'Delegation chain is incorrectly stored. A delegation chain should be stored as a string.',
          );
        A.identity
          ? (M = A.identity)
          : J &&
            ((b = _t.fromJSON(J)),
            RB(b) ? (M = oi.fromDelegation(u, b)) : (await gr(l), (u = null)));
      } catch (J) {
        console.error(J), await gr(l), (u = null);
      }
    let $;
    return (
      !((s = A.idleOptions) === null || s === void 0) && s.disableIdle
        ? ($ = void 0)
        : (b || A.identity) && ($ = ci.create(A.idleOptions)),
      u ||
        (y === nr
          ? ((u = await tt.generate()),
            await l.set(Ze, JSON.stringify(u.toJSON())))
          : (A.storage &&
              y === ir &&
              console.warn(
                `You are using a custom storage provider that may not support CryptoKey storage. If you are using a custom storage provider that does not support CryptoKey storage, you should use '${nr}' as the key type, as it can serialize to a string`,
              ),
            (u = await Ut.generate()),
            await l.set(Ze, u.getKeyPair()))),
      new this(M, u, b, l, $, A)
    );
  }
  async _handleSuccess(A, e) {
    var g, s, l;
    const y = A.delegations.map((b) => ({
        delegation: new Rr(
          b.delegation.pubkey,
          b.delegation.expiration,
          b.delegation.targets,
        ),
        signature: b.signature.buffer,
      })),
      u = _t.fromDelegations(y, A.userPublicKey.buffer),
      M = this._key;
    if (M) {
      if (
        ((this._chain = u),
        (this._identity = oi.fromDelegation(M, this._chain)),
        (g = this._idpWindow) === null || g === void 0 || g.close(),
        !this.idleManager)
      ) {
        const b =
          (s = this._createOptions) === null || s === void 0
            ? void 0
            : s.idleOptions;
        (this.idleManager = ci.create(b)),
          !b?.onIdle &&
            !b?.disableDefaultIdleCallback &&
            ((l = this.idleManager) === null ||
              l === void 0 ||
              l.registerCallback(() => {
                this.logout(), location.reload();
              }));
      }
      this._removeEventListener(),
        delete this._idpWindow,
        this._chain &&
          (await this._storage.set(Ve, JSON.stringify(this._chain.toJSON()))),
        e?.();
    }
  }
  getIdentity() {
    return this._identity;
  }
  async isAuthenticated() {
    return (
      !this.getIdentity().getPrincipal().isAnonymous() && this._chain !== null
    );
  }
  async login(A) {
    var e, g, s, l;
    const y = BigInt(8) * BigInt(36e11),
      u = new URL(
        ((e = A?.identityProvider) === null || e === void 0
          ? void 0
          : e.toString()) || $B,
      );
    (u.hash = AI),
      (g = this._idpWindow) === null || g === void 0 || g.close(),
      this._removeEventListener(),
      (this._eventHandler = this._getEventHandler(
        u,
        Object.assign(
          {
            maxTimeToLive:
              (s = A?.maxTimeToLive) !== null && s !== void 0 ? s : y,
          },
          A,
        ),
      )),
      window.addEventListener('message', this._eventHandler),
      (this._idpWindow =
        (l = window.open(
          u.toString(),
          'idpWindow',
          A?.windowOpenerFeatures,
        )) !== null && l !== void 0
          ? l
          : void 0);
    const M = () => {
      this._idpWindow &&
        (this._idpWindow.closed
          ? this._handleFailure(tI, A?.onError)
          : setTimeout(M, eI));
    };
    M();
  }
  _getEventHandler(A, e) {
    return async (g) => {
      var s, l, y;
      if (g.origin !== A.origin) {
        console.warn(
          `WARNING: expected origin '${A.origin}', got '${g.origin}' (ignoring)`,
        );
        return;
      }
      const u = g.data;
      switch (u.kind) {
        case 'authorize-ready': {
          const M = {
            kind: 'authorize-client',
            sessionPublicKey: new Uint8Array(
              (s = this._key) === null || s === void 0
                ? void 0
                : s.getPublicKey().toDer(),
            ),
            maxTimeToLive: e?.maxTimeToLive,
            derivationOrigin:
              (l = e?.derivationOrigin) === null || l === void 0
                ? void 0
                : l.toString(),
          };
          (y = this._idpWindow) === null ||
            y === void 0 ||
            y.postMessage(M, A.origin);
          break;
        }
        case 'authorize-client-success':
          try {
            await this._handleSuccess(u, e?.onSuccess);
          } catch (M) {
            this._handleFailure(M.message, e?.onError);
          }
          break;
        case 'authorize-client-failure':
          this._handleFailure(u.text, e?.onError);
          break;
      }
    };
  }
  _handleFailure(A, e) {
    var g;
    (g = this._idpWindow) === null || g === void 0 || g.close(),
      e?.(A),
      this._removeEventListener(),
      delete this._idpWindow;
  }
  _removeEventListener() {
    this._eventHandler &&
      window.removeEventListener('message', this._eventHandler),
      (this._eventHandler = void 0);
  }
  async logout(A = {}) {
    if (
      (await gr(this._storage),
      (this._identity = new jr()),
      (this._chain = null),
      A.returnTo)
    )
      try {
        window.history.pushState({}, '', A.returnTo);
      } catch {
        window.location.href = A.returnTo;
      }
  }
}
async function gr(t) {
  await t.remove(Ze), await t.remove(Ve), await t.remove(zB);
}
export { II as A, BB as Y, BI as c, iI as u };
