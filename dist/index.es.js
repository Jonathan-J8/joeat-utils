var ue = Object.defineProperty;
var ae = (a) => {
  throw TypeError(a);
};
var de = (a, t, e) => t in a ? ue(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var o = (a, t, e) => de(a, typeof t != "symbol" ? t + "" : t, e), he = (a, t, e) => t.has(a) || ae("Cannot " + e);
var i = (a, t, e) => (he(a, t, "read from private field"), e ? e.call(a) : t.get(a)), h = (a, t, e) => t.has(a) ? ae("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(a) : t.set(a, e), r = (a, t, e, s) => (he(a, t, "write to private field"), s ? s.call(a, e) : t.set(a, e), e);
const U = (a, t, e) => Math.max(t, Math.min(e, a)), oe = () => (typeof performance > "u" ? Date : performance).now();
var z;
class le {
  constructor() {
    h(this, z);
    r(this, z, /* @__PURE__ */ new Set());
  }
  get size() {
    return i(this, z).size;
  }
  addListener(...t) {
    for (let e = 0, s = t.length; e < s; e++)
      i(this, z).add(t[e]);
  }
  removeListener(...t) {
    for (let e = 0, s = t.length; e < s; e++)
      i(this, z).delete(t[e]);
  }
  fire(...t) {
    i(this, z).forEach((e) => {
      e(...t);
    });
  }
  clear() {
    i(this, z).clear();
  }
}
z = new WeakMap();
const O = (a) => a && a();
var W, k, I, C, X;
class me extends le {
  constructor() {
    super();
    h(this, W);
    h(this, k, !0);
    h(this, I, 0);
    h(this, C);
    o(this, "uniforms", Object.freeze({
      uTime: { value: 0 },
      uDeltaTime: { value: 0 },
      uDeltaMs: { value: 0 }
    }));
    h(this, X, (e) => {
      const { uTime: s, uDeltaTime: n, uDeltaMs: c } = this.uniforms;
      s.value = e, c.value = Math.abs(e - i(this, I)), n.value = c.value * 1e-3, r(this, I, e), super.fire({ time: e, deltaTime: n.value, deltaMs: c.value }), !i(this, C) && r(this, W, requestAnimationFrame(i(this, X)));
    });
    o(this, "play", (e) => {
      r(this, C, e), i(this, k) && (r(this, k, !1), r(this, I, oe()), e ? e.setAnimationLoop(i(this, X)) : r(this, W, requestAnimationFrame(i(this, X))));
    });
    o(this, "pause", (e) => {
      r(this, k, !0), e ? e.setAnimationLoop(null) : typeof i(this, W) == "number" && cancelAnimationFrame(i(this, W));
    });
    o(this, "debug", (e) => {
      e.add({ paused: this.paused }, "paused").onChange((s) => {
        s ? this.pause(i(this, C)) : this.play(i(this, C));
      });
    });
    o(this, "interpolate", ({
      from: e = 0,
      to: s = 1,
      onStart: n,
      onUpdate: c,
      onComplete: d
    }) => {
      const v = Math.abs(e), M = Math.abs(s), u = e < s ? 1 : -1;
      let l = v;
      const y = (m) => {
        l += m.deltaTime, l = U(l, v, M), typeof c == "function" && c({ value: l * u, ...m }), l === M && (typeof d == "function" && d({ value: l * u, ...m }), this.removeListener(y));
      }, { uDeltaMs: w, uDeltaTime: g, uTime: f } = this.uniforms;
      typeof n == "function" && n({
        value: e,
        time: f.value,
        deltaTime: g.value,
        deltaMs: w.value
      }), this.addListener(y);
    });
    o(this, "animate", ({
      steps: e = 0,
      duration: s = 400,
      delay: n = 0,
      iterations: c = 0,
      onStart: d,
      onUpdate: v,
      onComplete: M
    }) => {
      let u, l = 0, y = 0, w = 0;
      const g = ({ time: m }) => {
        const $ = Math.abs(m - l);
        if (e > 0) {
          const re = Math.min(Math.floor($ / s * e), e - 1);
          re !== y && (y = re, O(v));
        } else O(v);
        $ >= s && (this.removeListener(g), O(v), O(M), w++, (c < 0 || c === 1 / 0 || w < c) && (typeof u == "number" && clearTimeout(u), n > 0 ? u = setTimeout(() => {
          l = oe(), O(d), this.addListener(g);
        }, n) : f()));
      }, f = () => {
        l = oe(), O(d), this.addListener(g);
      };
      return typeof u == "number" && clearTimeout(u), n > 0 ? u = setTimeout(f, n) : f(), () => this.removeListener(g);
    });
  }
  get paused() {
    return i(this, k);
  }
}
W = new WeakMap(), k = new WeakMap(), I = new WeakMap(), C = new WeakMap(), X = new WeakMap();
class ve {
  constructor({
    camera: t,
    controls: e,
    Vector3: s
  }) {
    o(this, "uniforms");
    o(this, "direction");
    o(this, "instance");
    o(this, "controls");
    o(this, "resize", ({ width: t, height: e }) => {
      const { instance: s } = this;
      s != null && s.aspect && (s.aspect = t / e), this.instance.updateProjectionMatrix();
    });
    o(this, "update", ({ deltaTime: t }) => {
      this.instance.getWorldDirection(this.uniforms.uDirection.value), this.controls && this.controls.update(t);
    });
    o(this, "clear", () => {
      const { controls: t, instance: e } = this;
      e.clear(), t && (t.disconnect(), t.dispose());
    });
    o(this, "debug", (t) => {
      const { instance: e, controls: s, direction: n } = this;
      s && t.add(s, "enabled").name("camera controls"), t.add(e.position, "x").name("camera position x").listen(), t.add(e.position, "y").name("camera position y").listen(), t.add(e.position, "z").name("camera position z").listen(), n && (t.add(n, "x").name("camera direction x").onChange(() => {
        e.lookAt(n);
      }).listen(), t.add(n, "y").name("camera direction y").onChange(() => {
        e.lookAt(n);
      }).listen(), t.add(n, "z").name("camera direction z").onChange(() => {
        e.lookAt(n);
      }).listen());
    });
    this.uniforms = Object.freeze({
      uDirection: { value: new s() }
    }), this.instance = t, this.controls = e, this.controls && this.controls.addEventListener("change", () => {
      const { uDirection: n } = this.uniforms;
      this.instance.getWorldDirection(n.value);
    });
  }
}
var Z, q, V, Y, j, H, B, G, _, ee, te, ie, se;
class ge {
  constructor({
    Plane: t,
    Raycaster: e,
    Vector2: s,
    Vector3: n,
    camera: c
  }) {
    o(this, "uniforms");
    h(this, Z);
    h(this, q);
    h(this, V);
    h(this, Y);
    h(this, j);
    h(this, H);
    h(this, B);
    h(this, G);
    h(this, _, (t) => {
      const { uScroll: e, uScrollVelocity: s } = this.uniforms;
      i(this, Y).copy(e.value);
      const n = window.scrollX / (document.body.scrollWidth - window.innerWidth), c = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      e.value.x = n, e.value.y = c, t.type === "scroll" ? s.value.subVectors(e.value, i(this, Y)) : s.value.set(0, 0);
    });
    h(this, ee, (t) => {
      const { uMousePosition: e, uElementSize: s } = this.uniforms, n = s.value.x, c = s.value.y;
      e.value.x = t.clientX / n * 2 - 1, e.value.y = -(t.clientY / c) * 2 + 1;
    });
    h(this, te, (t) => {
      const { uMousePress: e } = this.uniforms;
      t.pointerType === "mouse" ? e.value = t.pressure ? 1 : 0 : e.value = t.pressure;
    });
    h(this, ie, (t) => {
      const { uMouseVelocity: e } = this.uniforms, s = t.pageX, n = t.pageY, c = i(this, j).x, d = i(this, j).y;
      e.value.x = Math.abs(s - c) * 0.16, e.value.y = Math.abs(n - d) * 0.16, i(this, j).set(s, n), typeof i(this, H) == "number" && clearTimeout(i(this, H)), r(this, H, setTimeout(() => {
        e.value.set(0, 0);
      }, 200));
    });
    h(this, se, () => {
      const { uMouseWorldPosition: t, uMousePosition: e } = this.uniforms;
      i(this, B).getWorldDirection(i(this, G)), i(this, V).setFromCamera(e.value, i(this, B)), i(this, q).setFromNormalAndCoplanarPoint(i(this, G), i(this, Z)), i(this, V).ray.intersectPlane(i(this, q), t.value);
    });
    // canvas or window resize
    o(this, "onResize", ({ width: t, height: e }) => {
      this.uniforms.uElementSize.value.set(t, e);
    });
    // pointer move
    o(this, "onMove", (t) => {
      i(this, ee).call(this, t), i(this, se).call(this), i(this, ie).call(this, t);
    });
    // pointer down / up / out
    o(this, "onPress", (t) => {
      i(this, te).call(this, t);
    });
    // scroll / scroll end
    o(this, "onScroll", (t) => {
      i(this, _).call(this, t);
    });
    this.uniforms = Object.freeze({
      uElementSize: { value: new s() },
      uScroll: { value: new s() },
      uScrollVelocity: { value: new s() },
      uMousePress: { value: 0 },
      uMousePosition: { value: new s() },
      uMouseWorldPosition: { value: new n() },
      uMouseVelocity: { value: new s() }
    }), r(this, Z, new n()), r(this, q, new t()), r(this, V, new e()), r(this, Y, new s()), r(this, j, new s()), r(this, B, c), r(this, G, new n());
  }
}
Z = new WeakMap(), q = new WeakMap(), V = new WeakMap(), Y = new WeakMap(), j = new WeakMap(), H = new WeakMap(), B = new WeakMap(), G = new WeakMap(), _ = new WeakMap(), ee = new WeakMap(), te = new WeakMap(), ie = new WeakMap(), se = new WeakMap();
const pe = function(a, t, e, s) {
  const n = function(c, d, v) {
    var l, y;
    const M = (l = c.getShaderInfoLog(d)) == null ? void 0 : l.trim(), u = "Errors in " + v + `:

` + M;
    if (M !== "") {
      const w = (y = c.getShaderSource(d)) == null ? void 0 : y.replace(/\t/g, "  "), g = w == null ? void 0 : w.split(`
`);
      let f = "", m = 1;
      if (!g) return;
      for (const $ of g)
        f += (m < 10 ? " " : "") + m + ":		" + $ + `
`, m++;
      console.error(u + `
` + f);
    }
  };
  n(a, e, "Vertex Shader"), n(a, s, "Fragment Shader");
};
class Me {
  constructor({
    renderer: t,
    Vector2: e,
    EffectComposer: s
  }) {
    o(this, "uniforms");
    o(this, "instance");
    o(this, "composer");
    o(this, "addEffect", (t) => {
      !this.composer || !this.instance || this.composer.addPass(t);
    });
    o(this, "removeEffect", (...t) => {
      t.forEach((e) => {
        var s;
        e.dispose(), (s = this.composer) == null || s.removePass(e);
      });
    });
    o(this, "update", (t, e, s = 0.16) => {
      this.instance && (this.composer ? this.composer.render(s) : this.instance.render(t, e));
    });
    o(this, "resize", (t) => {
      const { width: e, height: s, pixelRatio: n } = t;
      this.instance && (this.instance.setSize(e, s, !1), this.uniforms.uResolution.value.set(e, s), this.instance.setPixelRatio(n), this.composer && this.composer.setSize(e, s));
    });
    o(this, "clear", () => {
      this.instance && this.instance.dispose(), this.composer && this.removeEffect(...this.composer.passes);
    });
    o(this, "debug", (t) => {
      const { instance: e } = this;
      e && (e.debug.checkShaderErrors = !0, e.debug.onShaderError = pe, t.add(e, "toneMapping", {
        NoToneMapping: 0,
        LinearToneMapping: 1,
        ReinhardToneMapping: 2,
        CineonToneMapping: 3,
        ACESFilmicToneMapping: 4,
        CustomToneMapping: 5,
        AgXToneMapping: 6,
        NeutralToneMapping: 7
      }).name("tone mapping"), t.add(e, "toneMappingExposure", 0, 1).name("tone mapping exposure"));
    });
    this.uniforms = Object.freeze({
      uResolution: { value: new e() }
    }), this.instance = t, this.instance.debug.checkShaderErrors = !1, s && (this.composer = new s(this.instance));
  }
}
var S, F, A, Q, T, R, J;
class ye extends le {
  constructor(e) {
    super();
    h(this, S, 7680);
    h(this, F, 100);
    h(this, A, 100);
    h(this, Q, 1);
    h(this, T, 1);
    h(this, R);
    o(this, "fire", () => {
      let e = i(this, F), s = i(this, A);
      const n = i(this, Q);
      if (i(this, F) > i(this, S) || i(this, A) > i(this, S))
        if (e > s) {
          const c = s / e;
          e = U(e, 0, i(this, S)), s = e * c;
        } else {
          const c = e / s;
          s = U(s, 0, i(this, S)), e = s * c;
        }
      e *= i(this, T), s *= i(this, T), super.fire({ width: e, height: s, pixelRatio: n });
    });
    h(this, J, new ResizeObserver((e) => {
      const s = e[0].contentBoxSize[0], { inlineSize: n, blockSize: c } = s;
      i(this, F) === n && i(this, A) === c || (r(this, F, n), r(this, A, c), this.fire());
    }));
    o(this, "debug", (e) => {
      e.add({ maxSize: this.maxSize }, "maxSize", 0, 7680).name("max resolution"), e.add({ resolutionFactor: this.resolutionFactor }, "resolutionFactor", 0, 1).name("resolution factor");
    });
    r(this, Q, Math.min(window.devicePixelRatio, 2)), r(this, R, e), i(this, J).observe(i(this, R)), this.fire();
  }
  get width() {
    return i(this, F) * i(this, T);
  }
  get height() {
    return i(this, A) * i(this, T);
  }
  get element() {
    return i(this, R);
  }
  get pixelRatio() {
    return i(this, Q);
  }
  get maxSize() {
    return i(this, S);
  }
  get resolutionFactor() {
    return i(this, T);
  }
  set resolutionFactor(e) {
    r(this, T, U(e, 0.01, 1)), this.fire();
  }
  set maxSize(e) {
    r(this, S, e < 32 ? 32 : e), this.fire();
  }
  clear() {
    super.clear(), i(this, R) && i(this, J).unobserve(i(this, R)), i(this, J).disconnect();
  }
}
S = new WeakMap(), F = new WeakMap(), A = new WeakMap(), Q = new WeakMap(), T = new WeakMap(), R = new WeakMap(), J = new WeakMap();
const D = class D {
  constructor({ scene: t }) {
    o(this, "instance");
    o(this, "dispose", () => {
      this.instance.children.forEach((t) => D.disposeNode(t)), this.instance.clear();
    });
    this.instance = t;
  }
};
o(D, "disposeMaterial", (t) => {
  Object.values(t).forEach((e) => {
    typeof (e == null ? void 0 : e.dispose) == "function" && e.dispose();
  });
}), o(D, "disposeNode", (t) => {
  if (!t) return;
  const e = t;
  e != null && e.geometry && e.geometry.dispose(), e != null && e.material && (Array.isArray(e.material) ? e.material.forEach((s) => {
    D.disposeMaterial(s), s.dispose();
  }) : (D.disposeMaterial(e.material), e.material.dispose())), e.children.forEach((s) => D.disposeNode(s));
});
let ce = D;
var b, E, K, p, N, P;
class we {
  constructor(t, e) {
    h(this, b, {
      mass: 0.5,
      tension: 0.5,
      friction: 0.5,
      threshold: 0.1,
      onUpdate: void 0,
      onComplete: void 0
    });
    h(this, E, 0);
    h(this, K, 0);
    h(this, p, 0);
    h(this, N, 0);
    h(this, P, !1);
    o(this, "from", (t) => (r(this, K, t), r(this, p, t), this));
    o(this, "to", (t, e) => (r(this, E, t), Math.abs(i(this, N)) < i(this, b).threshold && Math.abs(i(this, E) - i(this, p)) < i(this, b).threshold ? this : (e && r(this, b, { ...i(this, b), ...e }), r(this, P, !1), this)));
    o(this, "update", (t = 0.016) => {
      if (i(this, P)) return;
      const { mass: e, tension: s, friction: n, threshold: c, onComplete: d, onUpdate: v } = i(this, b), M = Math.min(t, 0.06), u = i(this, N) ?? 0, l = typeof i(this, p) == "number" ? i(this, p) : i(this, K), y = -1 * s * (l - i(this, E)), w = -1 * u * n, g = (y + w) / e, f = u + g * M, m = l + f * M;
      r(this, P, Math.abs(f) < c && Math.abs(m - i(this, E)) < c), r(this, p, i(this, P) ? i(this, E) : m), r(this, N, f), i(this, P) ? (r(this, p, i(this, E)), d && d(i(this, p))) : v && v(i(this, p));
    });
    r(this, p, t || 0), r(this, K, t || 0), r(this, b, { ...i(this, b), ...e });
  }
  get value() {
    return i(this, p);
  }
  get velocity() {
    return i(this, N);
  }
  get finished() {
    return i(this, P);
  }
}
b = new WeakMap(), E = new WeakMap(), K = new WeakMap(), p = new WeakMap(), N = new WeakMap(), P = new WeakMap();
var L, x, ne;
class be {
  constructor() {
    h(this, L, []);
    h(this, x, !1);
    h(this, ne, async () => {
      if (!i(this, x)) {
        for (r(this, x, !0); i(this, L).length > 0 && i(this, x); ) {
          const t = i(this, L).shift();
          if (t)
            try {
              await t();
            } catch (e) {
              console.error("Timeline error:", e);
            }
        }
        r(this, x, !1);
      }
    });
    o(this, "add", (...t) => {
      i(this, L).push(...t);
    });
    o(this, "play", async () => {
      r(this, x, !1), await i(this, ne).call(this);
    });
    o(this, "stop", () => {
      r(this, x, !1);
    });
    o(this, "clear", () => {
      this.stop(), r(this, L, []);
    });
  }
  get isPlaying() {
    return i(this, x);
  }
  get size() {
    return i(this, L).length;
  }
}
L = new WeakMap(), x = new WeakMap(), ne = new WeakMap();
export {
  me as Animator,
  ve as CameraWrapper,
  le as MonoEventEmitter,
  ge as MousePointer,
  Me as RendererWrapper,
  ye as Resizer,
  ce as SceneWrapper,
  we as Spring,
  be as TaskQueue
};
