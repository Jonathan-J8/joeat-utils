var ve = Object.defineProperty;
var he = (i) => {
  throw TypeError(i);
};
var xe = (i, e, t) => e in i ? ve(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var r = (i, e, t) => xe(i, typeof e != "symbol" ? e + "" : e, t), pe = (i, e, t) => e.has(i) || he("Cannot " + t);
var s = (i, e, t) => (pe(i, e, "read from private field"), t ? t.call(i) : e.get(i)), u = (i, e, t) => e.has(i) ? he("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), a = (i, e, t, n) => (pe(i, e, "write to private field"), n ? n.call(i, t) : e.set(i, t), t);
const ge = (i) => {
  const e = (t) => {
    const n = t.target;
    i && !i.contains(n) && !t.defaultPrevented && i.dispatchEvent(new CustomEvent("clickout", { detail: { node: i } }));
  };
  return window.addEventListener("click", e), () => window.removeEventListener("click", e);
}, Te = (i) => {
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
}, Pe = (i) => new i(new Uint8Array(1), 1, 1), Ee = (i) => -1 * Math.cos(i * (Math.PI / 2)) + 1, be = (i) => Math.sin(i * (Math.PI / 2)), Ie = (i) => -0.5 * (Math.cos(Math.PI * i) - 1), Se = (i) => i * i, De = (i) => i * (2 - i), Le = (i) => i < 0.5 ? 2 * i * i : -1 + (4 - 2 * i) * i, Ce = (i) => i * i * i, Fe = (i) => {
  const e = i - 1;
  return e * e * e + 1;
}, Oe = (i) => i < 0.5 ? 4 * i * i * i : (i - 1) * (2 * i - 2) * (2 * i - 2) + 1, Ne = (i) => i * i * i * i, ke = (i) => {
  const e = i - 1;
  return 1 - e * e * e * e;
}, je = (i) => {
  const e = i - 1;
  return i < 0.5 ? 8 * i * i * i * i : 1 - 8 * e * e * e * e;
}, We = (i) => i * i * i * i * i, Ae = (i) => {
  const e = i - 1;
  return 1 + e * e * e * e * e;
}, Re = (i) => {
  const e = i - 1;
  return i < 0.5 ? 16 * i * i * i * i * i : 1 + 16 * e * e * e * e * e;
}, qe = (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)), Qe = (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1, $e = (i) => {
  if (i === 0 || i === 1)
    return i;
  const e = i * 2, t = e - 1;
  return e < 1 ? 0.5 * Math.pow(2, 10 * t) : 0.5 * (-Math.pow(2, -10 * t) + 2);
}, Be = (i) => {
  const e = i / 1;
  return -1 * (Math.sqrt(1 - e * i) - 1);
}, Xe = (i) => {
  const e = i - 1;
  return Math.sqrt(1 - e * e);
}, Ye = (i) => {
  const e = i * 2, t = e - 2;
  return e < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - t * t) + 1);
}, Ve = (i, e = 1.70158) => i * i * ((e + 1) * i - e), He = (i, e = 1.70158) => {
  const t = i / 1 - 1;
  return t * t * ((e + 1) * t + e) + 1;
}, Ze = (i, e = 1.70158) => {
  const t = i * 2, n = t - 2, o = e * 1.525;
  return t < 1 ? 0.5 * t * t * ((o + 1) * t - o) : 0.5 * (n * n * ((o + 1) * n + o) + 2);
}, Ue = (i, e = 0.7) => {
  if (i === 0 || i === 1)
    return i;
  const n = i / 1 - 1, o = 1 - e, c = o / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * n) * Math.sin((n - c) * (2 * Math.PI) / o));
}, Ge = (i, e = 0.7) => {
  if (i === 0 || i === 1) return i;
  const t = 1 - e, n = i * 2, o = t / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * n) * Math.sin((n - o) * (2 * Math.PI) / t) + 1;
}, Je = (i, e = 0.65) => {
  if (i === 0 || i === 1) return i;
  const t = 1 - e, n = i * 2, o = n - 1, c = t / (2 * Math.PI) * Math.asin(1);
  return n < 1 ? -0.5 * (Math.pow(2, 10 * o) * Math.sin((o - c) * (2 * Math.PI) / t)) : Math.pow(2, -10 * o) * Math.sin((o - c) * (2 * Math.PI) / t) * 0.5 + 1;
}, de = (i) => {
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
}, we = (i) => 1 - de(1 - i), Ke = (i) => i < 0.5 ? we(i * 2) * 0.5 : de(i * 2 - 1) * 0.5 + 0.5, ne = (i, e, t) => Math.max(e, Math.min(t, i)), _e = (i, e, t) => i >= e - t && i <= e + t, ye = (i, e, t) => (1 - t) * i + t * e, $ = (i, e, t, n, o = 1e-4) => i <= e + o && i >= e - o ? i : ye(i, e, 1 - Math.exp(-t * n)), et = (i, e, t, n, o = 1e-4) => {
  i.x = $(i.x, e.x, t, n, o), i.y = $(i.y, e.y, t, n, o), i.x = $(i.x, e.x, t, n, o), i.y = $(i.y, e.y, t, n, o), typeof i.z == "number" && typeof e.z == "number" && (i.z = $(
    i.z,
    e.z,
    t,
    n,
    o
  )), typeof i.w == "number" && typeof e.w == "number" && (i.w = $(
    i.w,
    e.w,
    t,
    n,
    o
  ));
}, ue = () => (typeof performance > "u" ? Date : performance).now(), tt = (i) => new Promise((e) => setTimeout(e, i));
var T;
class fe {
  constructor() {
    u(this, T);
    a(this, T, /* @__PURE__ */ new Set());
  }
  get size() {
    return s(this, T).size;
  }
  addListener(...e) {
    for (let t = 0, n = e.length; t < n; t++)
      s(this, T).add(e[t]);
  }
  removeListener(...e) {
    for (let t = 0, n = e.length; t < n; t++)
      s(this, T).delete(e[t]);
  }
  fire(...e) {
    s(this, T).forEach((t) => {
      t(...e);
    });
  }
  clear() {
    s(this, T).clear();
  }
}
T = new WeakMap();
const B = (i) => i && i();
var N, k, X, j, Y;
class it extends fe {
  constructor() {
    super();
    u(this, N);
    u(this, k, !0);
    u(this, X, 0);
    u(this, j);
    r(this, "uniforms", Object.freeze({
      uTime: { value: 0 },
      uDeltaTime: { value: 0 },
      uDeltaMs: { value: 0 }
    }));
    u(this, Y, (t) => {
      const { uTime: n, uDeltaTime: o, uDeltaMs: c } = this.uniforms;
      n.value = t, c.value = Math.abs(t - s(this, X)), o.value = c.value * 1e-3, a(this, X, t), super.fire({ time: t, deltaTime: o.value, deltaMs: c.value }), !s(this, j) && a(this, N, requestAnimationFrame(s(this, Y)));
    });
    r(this, "play", (t) => {
      a(this, j, t), s(this, k) && (a(this, k, !1), a(this, X, ue()), t ? t.setAnimationLoop(s(this, Y)) : a(this, N, requestAnimationFrame(s(this, Y))));
    });
    r(this, "pause", (t) => {
      a(this, k, !0), t ? t.setAnimationLoop(null) : typeof s(this, N) == "number" && cancelAnimationFrame(s(this, N));
    });
    r(this, "debug", (t) => {
      t.add({ paused: this.paused }, "paused").onChange((n) => {
        n ? this.pause(s(this, j)) : this.play(s(this, j));
      });
    });
    r(this, "interpolate", ({
      from: t = 0,
      to: n = 1,
      onStart: o,
      onUpdate: c,
      onComplete: l
    }) => {
      const p = Math.abs(t), f = Math.abs(n), m = t < n ? 1 : -1;
      let h = p;
      const y = (x) => {
        h += x.deltaTime, h = ne(h, p, f), typeof c == "function" && c({ value: h * m, ...x }), h === f && (typeof l == "function" && l({ value: h * m, ...x }), this.removeListener(y));
      }, { uDeltaMs: M, uDeltaTime: w, uTime: v } = this.uniforms;
      typeof o == "function" && o({
        value: t,
        time: v.value,
        deltaTime: w.value,
        deltaMs: M.value
      }), this.addListener(y);
    });
    r(this, "animate", ({
      steps: t = 0,
      duration: n = 400,
      delay: o = 0,
      iterations: c = 0,
      onStart: l,
      onUpdate: p,
      onComplete: f
    }) => {
      let m, h = 0, y = 0, M = 0;
      const w = ({ time: x }) => {
        const se = Math.abs(x - h);
        if (t > 0) {
          const le = Math.min(Math.floor(se / n * t), t - 1);
          le !== y && (y = le, B(p));
        } else B(p);
        se >= n && (this.removeListener(w), B(p), B(f), M++, (c < 0 || c === 1 / 0 || M < c) && (typeof m == "number" && clearTimeout(m), o > 0 ? m = setTimeout(() => {
          h = ue(), B(l), this.addListener(w);
        }, o) : v()));
      }, v = () => {
        h = ue(), B(l), this.addListener(w);
      };
      return typeof m == "number" && clearTimeout(m), o > 0 ? m = setTimeout(v, o) : v(), () => this.removeListener(w);
    });
  }
  get paused() {
    return s(this, k);
  }
}
N = new WeakMap(), k = new WeakMap(), X = new WeakMap(), j = new WeakMap(), Y = new WeakMap();
class st {
  constructor({
    instance: e,
    controls: t,
    Vector3: n
  }) {
    r(this, "uniforms");
    r(this, "direction");
    r(this, "instance");
    r(this, "controls");
    r(this, "resize", ({ width: e, height: t }) => {
      const { instance: n } = this;
      n != null && n.aspect && (n.aspect = e / t), this.instance.updateProjectionMatrix();
    });
    r(this, "update", ({ deltaTime: e }) => {
      this.instance.getWorldDirection(this.uniforms.uDirection.value), this.controls && this.controls.update(e);
    });
    r(this, "clear", () => {
      const { controls: e, instance: t } = this;
      t.clear(), e && (e.disconnect(), e.dispose());
    });
    r(this, "debug", (e) => {
      const { instance: t, controls: n, direction: o } = this;
      n && e.add(n, "enabled").name("camera controls"), e.add(t.position, "x").name("camera position x").listen(), e.add(t.position, "y").name("camera position y").listen(), e.add(t.position, "z").name("camera position z").listen(), o && (e.add(o, "x").name("camera direction x").onChange(() => {
        t.lookAt(o);
      }).listen(), e.add(o, "y").name("camera direction y").onChange(() => {
        t.lookAt(o);
      }).listen(), e.add(o, "z").name("camera direction z").onChange(() => {
        t.lookAt(o);
      }).listen());
    });
    this.uniforms = Object.freeze({
      uDirection: { value: new n() }
    }), this.instance = e, this.controls = t, this.controls && this.controls.addEventListener("change", () => {
      const { uDirection: o } = this.uniforms;
      this.instance.getWorldDirection(o.value);
    });
  }
}
var ie, V, H, Z, W, U, G, J, D, K, oe, re, ae, A, R, q;
class nt {
  constructor({
    Plane: e,
    Raycaster: t,
    Vector2: n,
    Vector3: o,
    camera: c
  }) {
    r(this, "uniforms");
    u(this, ie);
    u(this, V);
    u(this, H);
    u(this, Z);
    u(this, W);
    u(this, U);
    u(this, G);
    u(this, J);
    u(this, D);
    u(this, K, () => {
      s(this, D) && (s(this, D).innerHTML = `
			<p>Mouse position x ${this.uniforms.uMousePosition.value.x.toFixed(2)} y ${this.uniforms.uMousePosition.value.y.toFixed(2)}</p>
			<p>Mouse world position x ${this.uniforms.uMouseWorldPosition.value.x.toFixed(2)} y ${this.uniforms.uMouseWorldPosition.value.y.toFixed(2)} z ${this.uniforms.uMouseWorldPosition.value.z.toFixed(2)}</p>
			<p>Mouse velocity x ${this.uniforms.uMouseVelocity.value.x.toFixed(2)} y ${this.uniforms.uMouseVelocity.value.y.toFixed(2)}</p>
			<p>Mouse press ${this.uniforms.uMousePress.value}</p>
			<p>Scroll x ${this.uniforms.uScroll.value.x.toFixed(2)} y ${this.uniforms.uScroll.value.y.toFixed(2)}</p>
		
		`);
    });
    u(this, oe, (e) => {
      const t = e, n = t.target;
      let o = 0, c = 0;
      if (n instanceof HTMLCanvasElement)
        o = n.width, c = n.height;
      else if (n instanceof HTMLElement) {
        const { width: p, height: f } = n.getBoundingClientRect();
        o = p, c = f;
      } else
        o = window.innerWidth, c = window.innerHeight;
      const { uMousePosition: l } = this.uniforms;
      l.value.x = t.clientX / o * 2 - 1, l.value.y = -(t.clientY / c) * 2 + 1;
    });
    u(this, re, (e) => {
      const t = e, { uMouseVelocity: n } = this.uniforms, o = t.pageX, c = t.pageY, l = s(this, W).x, p = s(this, W).y;
      n.value.x = Math.abs(o - l), n.value.y = Math.abs(c - p), s(this, W).set(o, c), typeof s(this, U) == "number" && clearTimeout(s(this, U)), a(this, U, setTimeout(() => {
        n.value.set(0, 0);
      }, 200));
    });
    u(this, ae, () => {
      const { uMouseWorldPosition: e, uMousePosition: t } = this.uniforms;
      s(this, G).getWorldDirection(s(this, J)), s(this, H).setFromCamera(t.value, s(this, G)), s(this, V).setFromNormalAndCoplanarPoint(s(this, J), s(this, ie)), s(this, H).ray.intersectPlane(s(this, V), e.value);
    });
    u(this, A, (e) => {
      s(this, oe).call(this, e), s(this, ae).call(this), s(this, re).call(this, e), s(this, K).call(this);
    });
    u(this, R, (e) => {
      const { uScroll: t, uScrollVelocity: n } = this.uniforms;
      s(this, Z).copy(t.value);
      const o = window.scrollX / (document.body.scrollWidth - window.innerWidth), c = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      t.value.x = o, t.value.y = c, e.type === "scroll" ? n.value.subVectors(t.value, s(this, Z)) : n.value.set(0, 0), s(this, K).call(this);
    });
    u(this, q, (e) => {
      const t = e, { uMousePress: n } = this.uniforms;
      t.pointerType === "mouse" ? n.value = t.pressure ? 1 : 0 : n.value = t.pressure, s(this, K).call(this);
    });
    r(this, "init", (e) => {
      e.addEventListener("pointermove", s(this, A), !1), e.addEventListener("pointerout", s(this, A), !1), e.addEventListener("pointerdown", s(this, q), !1), e.addEventListener("pointerup", s(this, q), !1), window.addEventListener("scroll", s(this, R), !1), window.addEventListener("scrollend", s(this, R), !1);
    });
    r(this, "clear", (e) => {
      e.removeEventListener("pointermove", s(this, A), !1), e.removeEventListener("pointerout", s(this, A), !1), e.removeEventListener("pointerdown", s(this, q), !1), e.removeEventListener("pointerup", s(this, q), !1), window.removeEventListener("scroll", s(this, R), !1), window.removeEventListener("scrollend", s(this, R), !1);
    });
    r(this, "debug", (e) => {
      a(this, D, document.createElement("div")), s(this, D).style.padding = "3px", e.domElement.appendChild(s(this, D));
    });
    this.uniforms = Object.freeze({
      uScroll: { value: new n() },
      uScrollVelocity: { value: new n() },
      uMousePress: { value: 0 },
      uMousePosition: { value: new n() },
      uMouseWorldPosition: { value: new o() },
      uMouseVelocity: { value: new n() }
    }), a(this, ie, new o()), a(this, V, new e()), a(this, H, new t()), a(this, Z, new n()), a(this, W, new n()), a(this, G, c), a(this, J, new o());
  }
}
ie = new WeakMap(), V = new WeakMap(), H = new WeakMap(), Z = new WeakMap(), W = new WeakMap(), U = new WeakMap(), G = new WeakMap(), J = new WeakMap(), D = new WeakMap(), K = new WeakMap(), oe = new WeakMap(), re = new WeakMap(), ae = new WeakMap(), A = new WeakMap(), R = new WeakMap(), q = new WeakMap();
const Me = function(i, e, t, n) {
  const o = function(c, l, p) {
    var h, y;
    const f = (h = c.getShaderInfoLog(l)) == null ? void 0 : h.trim(), m = "Errors in " + p + `:

` + f;
    if (f !== "") {
      const M = (y = c.getShaderSource(l)) == null ? void 0 : y.replace(/\t/g, "  "), w = M == null ? void 0 : M.split(`
`);
      let v = "", x = 1;
      if (!w) return;
      for (const se of w)
        v += (x < 10 ? " " : "") + x + ":		" + se + `
`, x++;
      console.error(m + `
` + v);
    }
  };
  o(i, t, "Vertex Shader"), o(i, n, "Fragment Shader");
};
class ot {
  constructor({
    instance: e,
    Vector2: t,
    EffectComposer: n
  }) {
    r(this, "uniforms");
    r(this, "instance");
    r(this, "composer");
    r(this, "addEffect", (e) => {
      !this.composer || !this.instance || this.composer.addPass(e);
    });
    r(this, "removeEffect", (...e) => {
      e.forEach((t) => {
        var n;
        t.dispose(), (n = this.composer) == null || n.removePass(t);
      });
    });
    r(this, "update", (e, t, n = 0.16) => {
      this.instance && (this.composer ? this.composer.render(n) : this.instance.render(e, t));
    });
    r(this, "resize", (e) => {
      const { width: t, height: n, pixelRatio: o } = e;
      this.instance && (this.instance.setSize(t, n, !1), this.instance.setPixelRatio(o), this.uniforms.uResolution.value.set(t, n), this.composer && this.composer.setSize(t, n));
    });
    r(this, "clear", () => {
      this.instance && this.instance.dispose(), this.composer && this.removeEffect(...this.composer.passes);
    });
    r(this, "debug", (e) => {
      const { instance: t } = this;
      t && (t.debug.checkShaderErrors = !0, t.debug.onShaderError = Me, e.add(t, "toneMapping", {
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
    }), this.instance = e, this.instance.debug.checkShaderErrors = !1, n && (this.composer = new n(this.instance));
  }
}
var P, L, C, _, E, F, ee;
class rt extends fe {
  constructor(t) {
    super();
    u(this, P, 7680);
    // 4k
    u(this, L, 1280);
    u(this, C, 720);
    u(this, _, 1);
    u(this, E, 1);
    u(this, F);
    r(this, "fire", () => {
      let t = s(this, L), n = s(this, C);
      if (s(this, L) > s(this, P) || s(this, C) > s(this, P))
        if (t > n) {
          const c = n / t;
          t = ne(t, 0, s(this, P)), n = t * c;
        } else {
          const c = t / n;
          n = ne(n, 0, s(this, P)), t = n * c;
        }
      t *= s(this, E), n *= s(this, E);
      const o = s(this, _);
      super.fire({ width: t, height: n, pixelRatio: o });
    });
    u(this, ee, new ResizeObserver((t) => {
      const n = t[0].contentBoxSize[0], { inlineSize: o, blockSize: c } = n;
      s(this, L) === o && s(this, C) === c || (a(this, L, o), a(this, C, c), this.fire());
    }));
    r(this, "debug", (t) => {
      t.add({ maxSize: this.maxSize }, "maxSize", 0, 7680).name("max resolution").onChange((n) => {
        this.maxSize = n;
      }), t.add({ resolutionFactor: this.resolutionFactor }, "resolutionFactor", 0, 1).name("resolution factor").onChange((n) => {
        this.resolutionFactor = n;
      });
    });
    a(this, _, Math.min(window.devicePixelRatio, 2)), a(this, F, t), s(this, ee).observe(s(this, F)), this.fire();
  }
  get width() {
    return s(this, L) * s(this, E);
  }
  get height() {
    return s(this, C) * s(this, E);
  }
  get element() {
    return s(this, F);
  }
  get pixelRatio() {
    return s(this, _);
  }
  get maxSize() {
    return s(this, P);
  }
  get resolutionFactor() {
    return s(this, E);
  }
  set resolutionFactor(t) {
    a(this, E, ne(t, 0.01, 1)), this.fire();
  }
  set maxSize(t) {
    a(this, P, t < 32 ? 32 : t), this.fire();
  }
  clear() {
    super.clear(), s(this, F) && s(this, ee).unobserve(s(this, F)), s(this, ee).disconnect();
  }
}
P = new WeakMap(), L = new WeakMap(), C = new WeakMap(), _ = new WeakMap(), E = new WeakMap(), F = new WeakMap(), ee = new WeakMap();
const S = class S {
  constructor({ instance: e }) {
    r(this, "instance");
    r(this, "clear", () => {
      this.instance.children.forEach((e) => S.disposeNode(e)), this.instance.clear();
    });
    this.instance = e;
  }
};
r(S, "disposeMaterial", (e) => {
  Object.values(e).forEach((t) => {
    typeof (t == null ? void 0 : t.dispose) == "function" && t.dispose();
  });
}), r(S, "disposeNode", (e) => {
  if (!e) return;
  const t = e;
  t != null && t.geometry && t.geometry.dispose(), t != null && t.material && (Array.isArray(t.material) ? t.material.forEach((n) => {
    S.disposeMaterial(n), n.dispose();
  }) : (S.disposeMaterial(t.material), t.material.dispose())), t.children.forEach((n) => S.disposeNode(n));
});
let me = S;
var z, b, te, d, Q, I;
class at {
  constructor(e, t) {
    u(this, z, {
      mass: 0.5,
      tension: 0.5,
      friction: 0.5,
      threshold: 0.1,
      onUpdate: void 0,
      onComplete: void 0
    });
    u(this, b, 0);
    u(this, te, 0);
    u(this, d, 0);
    u(this, Q, 0);
    u(this, I, !1);
    r(this, "from", (e) => (a(this, te, e), a(this, d, e), this));
    r(this, "to", (e, t) => (a(this, b, e), Math.abs(s(this, Q)) < s(this, z).threshold && Math.abs(s(this, b) - s(this, d)) < s(this, z).threshold ? this : (t && a(this, z, { ...s(this, z), ...t }), a(this, I, !1), this)));
    r(this, "update", (e = 0.016) => {
      if (s(this, I)) return;
      const { mass: t, tension: n, friction: o, threshold: c, onComplete: l, onUpdate: p } = s(this, z), f = Math.min(e, 0.06), m = s(this, Q) ?? 0, h = typeof s(this, d) == "number" ? s(this, d) : s(this, te), y = -1 * n * (h - s(this, b)), M = -1 * m * o, w = (y + M) / t, v = m + w * f, x = h + v * f;
      a(this, I, Math.abs(v) < c && Math.abs(x - s(this, b)) < c), a(this, d, s(this, I) ? s(this, b) : x), a(this, Q, v), s(this, I) ? (a(this, d, s(this, b)), l && l(s(this, d))) : p && p(s(this, d));
    });
    a(this, d, e || 0), a(this, te, e || 0), a(this, z, { ...s(this, z), ...t });
  }
  get value() {
    return s(this, d);
  }
  get velocity() {
    return s(this, Q);
  }
  get finished() {
    return s(this, I);
  }
}
z = new WeakMap(), b = new WeakMap(), te = new WeakMap(), d = new WeakMap(), Q = new WeakMap(), I = new WeakMap();
var O, g, ce;
class ct {
  constructor() {
    u(this, O, []);
    u(this, g, !1);
    u(this, ce, async () => {
      if (!s(this, g)) {
        for (a(this, g, !0); s(this, O).length > 0 && s(this, g); ) {
          const e = s(this, O).shift();
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
      s(this, O).push(...e);
    });
    r(this, "play", async () => {
      a(this, g, !1), await s(this, ce).call(this);
    });
    r(this, "stop", () => {
      a(this, g, !1);
    });
    r(this, "clear", () => {
      this.stop(), a(this, O, []);
    });
  }
  get isPlaying() {
    return s(this, g);
  }
  get size() {
    return s(this, O).length;
  }
}
O = new WeakMap(), g = new WeakMap(), ce = new WeakMap();
var ut = `vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v+dot(v,vec4(F4)));vec4 x0=v-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec3 curl(in vec3 p,in float noiseTime,in float persistence){vec4 xNoisePotentialDerivatives=vec4(0.0);vec4 yNoisePotentialDerivatives=vec4(0.0);vec4 zNoisePotentialDerivatives=vec4(0.0);for(int i=0;i<3;++i){float twoPowI=pow(2.0,float(i));float scale=0.5*twoPowI*pow(persistence,float(i));xNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4(p*twoPowI,noiseTime))*scale;yNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(123.4,129845.6,-1239.1))*twoPowI,noiseTime))*scale;zNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(-9519.0,9051.0,-123.0))*twoPowI,noiseTime))*scale;}return vec3(zNoisePotentialDerivatives[1]-yNoisePotentialDerivatives[2],xNoisePotentialDerivatives[2]-zNoisePotentialDerivatives[0],yNoisePotentialDerivatives[0]-xNoisePotentialDerivatives[1]);}`, lt = "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";
export {
  it as Animator,
  st as CameraWrapper,
  fe as MonoEventEmitter,
  nt as MousePointer,
  ot as RendererWrapper,
  rt as Resizer,
  me as SceneWrapper,
  at as Spring,
  ct as TaskQueue,
  ne as clamp,
  ge as clickout,
  Te as createDebugTexture,
  Pe as createEmpytTexture,
  ut as curl,
  $ as dampThreshold,
  et as dampThresholdVec,
  Ve as easeInBack,
  we as easeInBounce,
  Be as easeInCirc,
  Ce as easeInCubic,
  Ue as easeInElastic,
  qe as easeInExpo,
  Ze as easeInOutBack,
  Ke as easeInOutBounce,
  Ye as easeInOutCirc,
  Oe as easeInOutCubic,
  Je as easeInOutElastic,
  $e as easeInOutExpo,
  Le as easeInOutQuad,
  je as easeInOutQuart,
  Re as easeInOutQuint,
  Ie as easeInOutSine,
  Se as easeInQuad,
  Ne as easeInQuart,
  We as easeInQuint,
  Ee as easeInSine,
  He as easeOutBack,
  de as easeOutBounce,
  Xe as easeOutCirc,
  Fe as easeOutCubic,
  Ge as easeOutElastic,
  Qe as easeOutExpo,
  De as easeOutQuad,
  ke as easeOutQuart,
  Ae as easeOutQuint,
  be as easeOutSine,
  _e as isBetween,
  ye as lerp,
  ue as now,
  lt as vsfx,
  tt as wait
};
