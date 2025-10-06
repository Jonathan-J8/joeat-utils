var he = Object.defineProperty;
var ce = (i) => {
  throw TypeError(i);
};
var xe = (i, e, t) => e in i ? he(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var r = (i, e, t) => xe(i, typeof e != "symbol" ? e + "" : e, t), me = (i, e, t) => e.has(i) || ce("Cannot " + t);
var o = (i, e, t) => (me(i, e, "read from private field"), t ? t.call(i) : e.get(i)), m = (i, e, t) => e.has(i) ? ce("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), a = (i, e, t, s) => (me(i, e, "write to private field"), s ? s.call(i, t) : e.set(i, t), t);
const we = (i) => {
  const e = (t) => {
    const s = t.target;
    i && !i.contains(s) && !t.defaultPrevented && i.dispatchEvent(new CustomEvent("clickout", { detail: { node: i } }));
  };
  return window.addEventListener("click", e), () => window.removeEventListener("click", e);
}, ze = (i) => {
  const e = new i.Mesh(
    new i.PlaneGeometry(2, 2),
    new i.MeshLambertMaterial({
      map: i.textureCallback(),
      side: i.DoubleSide,
      color: 16777215,
      transparent: !1
    })
  );
  return { mesh: e, update: () => {
    e.material.map = i.textureCallback();
  }, dispose: () => {
    e.geometry.dispose(), e.material.dispose();
  } };
}, Me = (i) => new i(new Uint8Array(1), 1, 1), ge = (i) => -1 * Math.cos(i * (Math.PI / 2)) + 1, Te = (i) => Math.sin(i * (Math.PI / 2)), Pe = (i) => -0.5 * (Math.cos(Math.PI * i) - 1), Ie = (i) => i * i, be = (i) => i * (2 - i), Se = (i) => i < 0.5 ? 2 * i * i : -1 + (4 - 2 * i) * i, De = (i) => i * i * i, Ee = (i) => {
  const e = i - 1;
  return e * e * e + 1;
}, Ce = (i) => i < 0.5 ? 4 * i * i * i : (i - 1) * (2 * i - 2) * (2 * i - 2) + 1, Oe = (i) => i * i * i * i, je = (i) => {
  const e = i - 1;
  return 1 - e * e * e * e;
}, Ne = (i) => {
  const e = i - 1;
  return i < 0.5 ? 8 * i * i * i * i : 1 - 8 * e * e * e * e;
}, ke = (i) => i * i * i * i * i, Fe = (i) => {
  const e = i - 1;
  return 1 + e * e * e * e * e;
}, Le = (i) => {
  const e = i - 1;
  return i < 0.5 ? 16 * i * i * i * i * i : 1 + 16 * e * e * e * e * e;
}, qe = (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)), Ae = (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1, Ye = (i) => {
  if (i === 0 || i === 1)
    return i;
  const e = i * 2, t = e - 1;
  return e < 1 ? 0.5 * Math.pow(2, 10 * t) : 0.5 * (-Math.pow(2, -10 * t) + 2);
}, Re = (i) => {
  const e = i / 1;
  return -1 * (Math.sqrt(1 - e * i) - 1);
}, Xe = (i) => {
  const e = i - 1;
  return Math.sqrt(1 - e * e);
}, We = (i) => {
  const e = i * 2, t = e - 2;
  return e < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - t * t) + 1);
}, Ze = (i, e = 1.70158) => i * i * ((e + 1) * i - e), Qe = (i, e = 1.70158) => {
  const t = i / 1 - 1;
  return t * t * ((e + 1) * t + e) + 1;
}, Be = (i, e = 1.70158) => {
  const t = i * 2, s = t - 2, n = e * 1.525;
  return t < 1 ? 0.5 * t * t * ((n + 1) * t - n) : 0.5 * (s * s * ((n + 1) * s + n) + 2);
}, Ve = (i, e = 0.7) => {
  if (i === 0 || i === 1)
    return i;
  const s = i / 1 - 1, n = 1 - e, c = n / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * s) * Math.sin((s - c) * (2 * Math.PI) / n));
}, Ge = (i, e = 0.7) => {
  if (i === 0 || i === 1) return i;
  const t = 1 - e, s = i * 2, n = t / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * s) * Math.sin((s - n) * (2 * Math.PI) / t) + 1;
}, He = (i, e = 0.65) => {
  if (i === 0 || i === 1) return i;
  const t = 1 - e, s = i * 2, n = s - 1, c = t / (2 * Math.PI) * Math.asin(1);
  return s < 1 ? -0.5 * (Math.pow(2, 10 * n) * Math.sin((n - c) * (2 * Math.PI) / t)) : Math.pow(2, -10 * n) * Math.sin((n - c) * (2 * Math.PI) / t) * 0.5 + 1;
}, ue = (i) => {
  const e = i / 1;
  if (e < 0.36363636363636365)
    return 7.5625 * e * e;
  if (e < 0.7272727272727273) {
    const t = e - 0.5454545454545454;
    return 7.5625 * t * t + 0.75;
  } else if (e < 0.9090909090909091) {
    const t = e - 0.8181818181818182;
    return 7.5625 * t * t + 0.9375;
  } else {
    const t = e - 0.9545454545454546;
    return 7.5625 * t * t + 0.984375;
  }
}, ve = (i) => 1 - ue(1 - i), Ue = (i) => i < 0.5 ? ve(i * 2) * 0.5 : ue(i * 2 - 1) * 0.5 + 0.5, $ = (i, e, t) => Math.max(e, Math.min(t, i)), Je = (i, e, t) => i >= e - t && i <= e + t, de = (i, e, t) => (1 - t) * i + t * e, A = (i, e, t, s, n = 1e-4) => i <= e + n && i >= e - n ? i : de(i, e, 1 - Math.exp(-t * s)), Ke = (i, e, t, s, n = 1e-4) => {
  i.x = A(i.x, e.x, t, s, n), i.y = A(i.y, e.y, t, s, n), i.x = A(i.x, e.x, t, s, n), i.y = A(i.y, e.y, t, s, n), typeof i.z == "number" && typeof e.z == "number" && (i.z = A(
    i.z,
    e.z,
    t,
    s,
    n
  )), typeof i.w == "number" && typeof e.w == "number" && (i.w = A(
    i.w,
    e.w,
    t,
    s,
    n
  ));
}, re = () => (typeof performance > "u" ? Date : performance).now(), _e = (i) => new Promise((e) => setTimeout(e, i));
var T;
class le {
  constructor() {
    m(this, T);
    a(this, T, /* @__PURE__ */ new Set());
  }
  get size() {
    return o(this, T).size;
  }
  addListener(...e) {
    for (let t = 0, s = e.length; t < s; t++)
      o(this, T).add(e[t]);
  }
  removeListener(...e) {
    for (let t = 0, s = e.length; t < s; t++)
      o(this, T).delete(e[t]);
  }
  fire(...e) {
    o(this, T).forEach((t) => {
      t(...e);
    });
  }
  clear() {
    o(this, T).clear();
  }
}
T = new WeakMap();
const Y = (i) => i && i();
var N, k, R, F, X;
class $e extends le {
  constructor() {
    super();
    m(this, N);
    m(this, k, !0);
    m(this, R, 0);
    m(this, F);
    r(this, "uniforms", Object.freeze({
      uTime: { value: 0 },
      uDeltaTime: { value: 0 },
      uDeltaMs: { value: 0 }
    }));
    m(this, X, (t) => {
      const { uTime: s, uDeltaTime: n, uDeltaMs: c } = this.uniforms;
      s.value = t, c.value = Math.abs(t - o(this, R)), n.value = c.value * 1e-3, a(this, R, t), super.fire({ time: t, deltaTime: n.value, deltaMs: c.value }), !o(this, F) && a(this, N, requestAnimationFrame(o(this, X)));
    });
    r(this, "play", (t) => {
      a(this, F, t), o(this, k) && (a(this, k, !1), a(this, R, re()), t ? t.setAnimationLoop(o(this, X)) : a(this, N, requestAnimationFrame(o(this, X))));
    });
    r(this, "pause", (t) => {
      a(this, k, !0), t ? t.setAnimationLoop(null) : typeof o(this, N) == "number" && cancelAnimationFrame(o(this, N));
    });
    r(this, "debug", (t) => {
      t.add({ paused: this.paused }, "paused").onChange((s) => {
        s ? this.pause(o(this, F)) : this.play(o(this, F));
      });
    });
    r(this, "interpolate", ({
      from: t = 0,
      to: s = 1,
      onStart: n,
      onUpdate: c,
      onComplete: l
    }) => {
      const d = Math.abs(t), y = Math.abs(s), u = t < s ? 1 : -1;
      let p = d;
      const w = (v) => {
        p += v.deltaTime, p = $(p, d, y), typeof c == "function" && c({ value: p * u, ...v }), p === y && (typeof l == "function" && l({ value: p * u, ...v }), this.removeListener(w));
      }, { uDeltaMs: z, uDeltaTime: f, uTime: x } = this.uniforms;
      typeof n == "function" && n({
        value: t,
        time: x.value,
        deltaTime: f.value,
        deltaMs: z.value
      }), this.addListener(w);
    });
    r(this, "animate", ({
      steps: t = 0,
      duration: s = 400,
      delay: n = 0,
      iterations: c = 0,
      onStart: l,
      onUpdate: d,
      onComplete: y
    }) => {
      let u, p = 0, w = 0, z = 0;
      const f = ({ time: v }) => {
        const _ = Math.abs(v - p);
        if (t > 0) {
          const ae = Math.min(Math.floor(_ / s * t), t - 1);
          ae !== w && (w = ae, Y(d));
        } else Y(d);
        _ >= s && (this.removeListener(f), Y(d), Y(y), z++, (c < 0 || c === 1 / 0 || z < c) && (typeof u == "number" && clearTimeout(u), n > 0 ? u = setTimeout(() => {
          p = re(), Y(l), this.addListener(f);
        }, n) : x()));
      }, x = () => {
        p = re(), Y(l), this.addListener(f);
      };
      return typeof u == "number" && clearTimeout(u), n > 0 ? u = setTimeout(x, n) : x(), () => this.removeListener(f);
    });
  }
  get paused() {
    return o(this, k);
  }
}
N = new WeakMap(), k = new WeakMap(), R = new WeakMap(), F = new WeakMap(), X = new WeakMap();
class et {
  constructor({
    camera: e,
    controls: t,
    Vector3: s
  }) {
    r(this, "uniforms");
    r(this, "direction");
    r(this, "instance");
    r(this, "controls");
    r(this, "resize", ({ width: e, height: t }) => {
      const { instance: s } = this;
      s != null && s.aspect && (s.aspect = e / t), this.instance.updateProjectionMatrix();
    });
    r(this, "update", ({ deltaTime: e }) => {
      this.instance.getWorldDirection(this.uniforms.uDirection.value), this.controls && this.controls.update(e);
    });
    r(this, "clear", () => {
      const { controls: e, instance: t } = this;
      t.clear(), e && (e.disconnect(), e.dispose());
    });
    r(this, "debug", (e) => {
      const { instance: t, controls: s, direction: n } = this;
      s && e.add(s, "enabled").name("camera controls"), e.add(t.position, "x").name("camera position x").listen(), e.add(t.position, "y").name("camera position y").listen(), e.add(t.position, "z").name("camera position z").listen(), n && (e.add(n, "x").name("camera direction x").onChange(() => {
        t.lookAt(n);
      }).listen(), e.add(n, "y").name("camera direction y").onChange(() => {
        t.lookAt(n);
      }).listen(), e.add(n, "z").name("camera direction z").onChange(() => {
        t.lookAt(n);
      }).listen());
    });
    this.uniforms = Object.freeze({
      uDirection: { value: new s() }
    }), this.instance = e, this.controls = t, this.controls && this.controls.addEventListener("change", () => {
      const { uDirection: n } = this.uniforms;
      this.instance.getWorldDirection(n.value);
    });
  }
}
var K, W, Z, Q, L, B, V, G, ee, te, ie, se, oe;
class tt {
  constructor({
    Plane: e,
    Raycaster: t,
    Vector2: s,
    Vector3: n,
    camera: c
  }) {
    r(this, "uniforms");
    m(this, K);
    m(this, W);
    m(this, Z);
    m(this, Q);
    m(this, L);
    m(this, B);
    m(this, V);
    m(this, G);
    m(this, ee, (e) => {
      const { uScroll: t, uScrollVelocity: s } = this.uniforms;
      o(this, Q).copy(t.value);
      const n = window.scrollX / (document.body.scrollWidth - window.innerWidth), c = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      t.value.x = n, t.value.y = c, e.type === "scroll" ? s.value.subVectors(t.value, o(this, Q)) : s.value.set(0, 0);
    });
    m(this, te, (e) => {
      const { uMousePosition: t, uElementSize: s } = this.uniforms, n = s.value.x, c = s.value.y;
      t.value.x = e.clientX / n * 2 - 1, t.value.y = -(e.clientY / c) * 2 + 1;
    });
    m(this, ie, (e) => {
      const { uMousePress: t } = this.uniforms;
      e.pointerType === "mouse" ? t.value = e.pressure ? 1 : 0 : t.value = e.pressure;
    });
    m(this, se, (e) => {
      const { uMouseVelocity: t } = this.uniforms, s = e.pageX, n = e.pageY, c = o(this, L).x, l = o(this, L).y;
      t.value.x = Math.abs(s - c) * 0.16, t.value.y = Math.abs(n - l) * 0.16, o(this, L).set(s, n), typeof o(this, B) == "number" && clearTimeout(o(this, B)), a(this, B, setTimeout(() => {
        t.value.set(0, 0);
      }, 200));
    });
    m(this, oe, () => {
      const { uMouseWorldPosition: e, uMousePosition: t } = this.uniforms;
      o(this, V).getWorldDirection(o(this, G)), o(this, Z).setFromCamera(t.value, o(this, V)), o(this, W).setFromNormalAndCoplanarPoint(o(this, G), o(this, K)), o(this, Z).ray.intersectPlane(o(this, W), e.value);
    });
    // canvas or window resize
    r(this, "onResize", ({ width: e, height: t }) => {
      this.uniforms.uElementSize.value.set(e, t);
    });
    // pointer move
    r(this, "onMove", (e) => {
      o(this, te).call(this, e), o(this, oe).call(this), o(this, se).call(this, e);
    });
    // pointer down / up / out
    r(this, "onPress", (e) => {
      o(this, ie).call(this, e);
    });
    // scroll / scroll end
    r(this, "onScroll", (e) => {
      o(this, ee).call(this, e);
    });
    this.uniforms = Object.freeze({
      uElementSize: { value: new s() },
      uScroll: { value: new s() },
      uScrollVelocity: { value: new s() },
      uMousePress: { value: 0 },
      uMousePosition: { value: new s() },
      uMouseWorldPosition: { value: new n() },
      uMouseVelocity: { value: new s() }
    }), a(this, K, new n()), a(this, W, new e()), a(this, Z, new t()), a(this, Q, new s()), a(this, L, new s()), a(this, V, c), a(this, G, new n());
  }
}
K = new WeakMap(), W = new WeakMap(), Z = new WeakMap(), Q = new WeakMap(), L = new WeakMap(), B = new WeakMap(), V = new WeakMap(), G = new WeakMap(), ee = new WeakMap(), te = new WeakMap(), ie = new WeakMap(), se = new WeakMap(), oe = new WeakMap();
const fe = function(i, e, t, s) {
  const n = function(c, l, d) {
    var p, w;
    const y = (p = c.getShaderInfoLog(l)) == null ? void 0 : p.trim(), u = "Errors in " + d + `:

` + y;
    if (y !== "") {
      const z = (w = c.getShaderSource(l)) == null ? void 0 : w.replace(/\t/g, "  "), f = z == null ? void 0 : z.split(`
`);
      let x = "", v = 1;
      if (!f) return;
      for (const _ of f)
        x += (v < 10 ? " " : "") + v + ":		" + _ + `
`, v++;
      console.error(u + `
` + x);
    }
  };
  n(i, t, "Vertex Shader"), n(i, s, "Fragment Shader");
};
class it {
  constructor({
    renderer: e,
    Vector2: t,
    EffectComposer: s
  }) {
    r(this, "uniforms");
    r(this, "instance");
    r(this, "composer");
    r(this, "addEffect", (e) => {
      !this.composer || !this.instance || this.composer.addPass(e);
    });
    r(this, "removeEffect", (...e) => {
      e.forEach((t) => {
        var s;
        t.dispose(), (s = this.composer) == null || s.removePass(t);
      });
    });
    r(this, "update", (e, t, s = 0.16) => {
      this.instance && (this.composer ? this.composer.render(s) : this.instance.render(e, t));
    });
    r(this, "resize", (e) => {
      const { width: t, height: s, pixelRatio: n } = e;
      this.instance && (this.instance.setSize(t, s, !1), this.uniforms.uResolution.value.set(t, s), this.instance.setPixelRatio(n), this.composer && this.composer.setSize(t, s));
    });
    r(this, "clear", () => {
      this.instance && this.instance.dispose(), this.composer && this.removeEffect(...this.composer.passes);
    });
    r(this, "debug", (e) => {
      const { instance: t } = this;
      t && (t.debug.checkShaderErrors = !0, t.debug.onShaderError = fe, e.add(t, "toneMapping", {
        NoToneMapping: 0,
        LinearToneMapping: 1,
        ReinhardToneMapping: 2,
        CineonToneMapping: 3,
        ACESFilmicToneMapping: 4,
        CustomToneMapping: 5,
        AgXToneMapping: 6,
        NeutralToneMapping: 7
      }).name("tone mapping"), e.add(t, "toneMappingExposure", 0, 1).name("tone mapping exposure"));
    });
    this.uniforms = Object.freeze({
      uResolution: { value: new t() }
    }), this.instance = e, this.instance.debug.checkShaderErrors = !1, s && (this.composer = new s(this.instance));
  }
}
var P, E, C, H, I, O, U;
class st extends le {
  constructor(t) {
    super();
    m(this, P, 7680);
    m(this, E, 100);
    m(this, C, 100);
    m(this, H, 1);
    m(this, I, 1);
    m(this, O);
    r(this, "fire", () => {
      let t = o(this, E), s = o(this, C);
      const n = o(this, H);
      if (o(this, E) > o(this, P) || o(this, C) > o(this, P))
        if (t > s) {
          const c = s / t;
          t = $(t, 0, o(this, P)), s = t * c;
        } else {
          const c = t / s;
          s = $(s, 0, o(this, P)), t = s * c;
        }
      t *= o(this, I), s *= o(this, I), super.fire({ width: t, height: s, pixelRatio: n });
    });
    m(this, U, new ResizeObserver((t) => {
      const s = t[0].contentBoxSize[0], { inlineSize: n, blockSize: c } = s;
      o(this, E) === n && o(this, C) === c || (a(this, E, n), a(this, C, c), this.fire());
    }));
    r(this, "debug", (t) => {
      t.add({ maxSize: this.maxSize }, "maxSize", 0, 7680).name("max resolution"), t.add({ resolutionFactor: this.resolutionFactor }, "resolutionFactor", 0, 1).name("resolution factor");
    });
    a(this, H, Math.min(window.devicePixelRatio, 2)), a(this, O, t), o(this, U).observe(o(this, O)), this.fire();
  }
  get width() {
    return o(this, E) * o(this, I);
  }
  get height() {
    return o(this, C) * o(this, I);
  }
  get element() {
    return o(this, O);
  }
  get pixelRatio() {
    return o(this, H);
  }
  get maxSize() {
    return o(this, P);
  }
  get resolutionFactor() {
    return o(this, I);
  }
  set resolutionFactor(t) {
    a(this, I, $(t, 0.01, 1)), this.fire();
  }
  set maxSize(t) {
    a(this, P, t < 32 ? 32 : t), this.fire();
  }
  clear() {
    super.clear(), o(this, O) && o(this, U).unobserve(o(this, O)), o(this, U).disconnect();
  }
}
P = new WeakMap(), E = new WeakMap(), C = new WeakMap(), H = new WeakMap(), I = new WeakMap(), O = new WeakMap(), U = new WeakMap();
const D = class D {
  constructor({ scene: e }) {
    r(this, "instance");
    r(this, "dispose", () => {
      this.instance.children.forEach((e) => D.disposeNode(e)), this.instance.clear();
    });
    this.instance = e;
  }
};
r(D, "disposeMaterial", (e) => {
  Object.values(e).forEach((t) => {
    typeof (t == null ? void 0 : t.dispose) == "function" && t.dispose();
  });
}), r(D, "disposeNode", (e) => {
  if (!e) return;
  const t = e;
  t != null && t.geometry && t.geometry.dispose(), t != null && t.material && (Array.isArray(t.material) ? t.material.forEach((s) => {
    D.disposeMaterial(s), s.dispose();
  }) : (D.disposeMaterial(t.material), t.material.dispose())), t.children.forEach((s) => D.disposeNode(s));
});
let pe = D;
var M, b, J, h, q, S;
class ot {
  constructor(e, t) {
    m(this, M, {
      mass: 0.5,
      tension: 0.5,
      friction: 0.5,
      threshold: 0.1,
      onUpdate: void 0,
      onComplete: void 0
    });
    m(this, b, 0);
    m(this, J, 0);
    m(this, h, 0);
    m(this, q, 0);
    m(this, S, !1);
    r(this, "from", (e) => (a(this, J, e), a(this, h, e), this));
    r(this, "to", (e, t) => (a(this, b, e), Math.abs(o(this, q)) < o(this, M).threshold && Math.abs(o(this, b) - o(this, h)) < o(this, M).threshold ? this : (t && a(this, M, { ...o(this, M), ...t }), a(this, S, !1), this)));
    r(this, "update", (e = 0.016) => {
      if (o(this, S)) return;
      const { mass: t, tension: s, friction: n, threshold: c, onComplete: l, onUpdate: d } = o(this, M), y = Math.min(e, 0.06), u = o(this, q) ?? 0, p = typeof o(this, h) == "number" ? o(this, h) : o(this, J), w = -1 * s * (p - o(this, b)), z = -1 * u * n, f = (w + z) / t, x = u + f * y, v = p + x * y;
      a(this, S, Math.abs(x) < c && Math.abs(v - o(this, b)) < c), a(this, h, o(this, S) ? o(this, b) : v), a(this, q, x), o(this, S) ? (a(this, h, o(this, b)), l && l(o(this, h))) : d && d(o(this, h));
    });
    a(this, h, e || 0), a(this, J, e || 0), a(this, M, { ...o(this, M), ...t });
  }
  get value() {
    return o(this, h);
  }
  get velocity() {
    return o(this, q);
  }
  get finished() {
    return o(this, S);
  }
}
M = new WeakMap(), b = new WeakMap(), J = new WeakMap(), h = new WeakMap(), q = new WeakMap(), S = new WeakMap();
var j, g, ne;
class nt {
  constructor() {
    m(this, j, []);
    m(this, g, !1);
    m(this, ne, async () => {
      if (!o(this, g)) {
        for (a(this, g, !0); o(this, j).length > 0 && o(this, g); ) {
          const e = o(this, j).shift();
          if (e)
            try {
              await e();
            } catch (t) {
              console.error("Timeline error:", t);
            }
        }
        a(this, g, !1);
      }
    });
    r(this, "add", (...e) => {
      o(this, j).push(...e);
    });
    r(this, "play", async () => {
      a(this, g, !1), await o(this, ne).call(this);
    });
    r(this, "stop", () => {
      a(this, g, !1);
    });
    r(this, "clear", () => {
      this.stop(), a(this, j, []);
    });
  }
  get isPlaying() {
    return o(this, g);
  }
  get size() {
    return o(this, j).length;
  }
}
j = new WeakMap(), g = new WeakMap(), ne = new WeakMap();
var rt = `vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v+dot(v,vec4(F4)));vec4 x0=v-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec3 curl(in vec3 p,in float noiseTime,in float persistence){vec4 xNoisePotentialDerivatives=vec4(0.0);vec4 yNoisePotentialDerivatives=vec4(0.0);vec4 zNoisePotentialDerivatives=vec4(0.0);for(int i=0;i<3;++i){float twoPowI=pow(2.0,float(i));float scale=0.5*twoPowI*pow(persistence,float(i));xNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4(p*twoPowI,noiseTime))*scale;yNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(123.4,129845.6,-1239.1))*twoPowI,noiseTime))*scale;zNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(-9519.0,9051.0,-123.0))*twoPowI,noiseTime))*scale;}return vec3(zNoisePotentialDerivatives[1]-yNoisePotentialDerivatives[2],xNoisePotentialDerivatives[2]-zNoisePotentialDerivatives[0],yNoisePotentialDerivatives[0]-xNoisePotentialDerivatives[1]);}`, at = `vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v+dot(v,vec4(F4)));vec4 x0=v-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}`, ct = "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";
export {
  $e as Animator,
  et as CameraWrapper,
  le as MonoEventEmitter,
  tt as MousePointer,
  it as RendererWrapper,
  st as Resizer,
  pe as SceneWrapper,
  ot as Spring,
  nt as TaskQueue,
  $ as clamp,
  we as clickout,
  ze as createDebugTexture,
  Me as createEmpytTexture,
  rt as curl,
  A as dampThreshold,
  Ke as dampThresholdVec,
  Ze as easeInBack,
  ve as easeInBounce,
  Re as easeInCirc,
  De as easeInCubic,
  Ve as easeInElastic,
  qe as easeInExpo,
  Be as easeInOutBack,
  Ue as easeInOutBounce,
  We as easeInOutCirc,
  Ce as easeInOutCubic,
  He as easeInOutElastic,
  Ye as easeInOutExpo,
  Se as easeInOutQuad,
  Ne as easeInOutQuart,
  Le as easeInOutQuint,
  Pe as easeInOutSine,
  Ie as easeInQuad,
  Oe as easeInQuart,
  ke as easeInQuint,
  ge as easeInSine,
  Qe as easeOutBack,
  ue as easeOutBounce,
  Xe as easeOutCirc,
  Ee as easeOutCubic,
  Ge as easeOutElastic,
  Ae as easeOutExpo,
  be as easeOutQuad,
  je as easeOutQuart,
  Fe as easeOutQuint,
  Te as easeOutSine,
  Je as isBetween,
  de as lerp,
  re as now,
  at as simplexNoiseDerivatives,
  ct as vsfx,
  _e as wait
};
