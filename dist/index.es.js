var Me = Object.defineProperty;
var le = (s) => {
  throw TypeError(s);
};
var ve = (s, e, t) => e in s ? Me(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var r = (s, e, t) => ve(s, typeof e != "symbol" ? e + "" : e, t), de = (s, e, t) => e.has(s) || le("Cannot " + t);
var i = (s, e, t) => (de(s, e, "read from private field"), t ? t.call(s) : e.get(s)), c = (s, e, t) => e.has(s) ? le("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(s) : e.set(s, t), a = (s, e, t, n) => (de(s, e, "write to private field"), n ? n.call(s, t) : e.set(s, t), t);
const Te = (s) => {
  const e = (t) => {
    const n = t.target;
    s && !s.contains(n) && !t.defaultPrevented && s.dispatchEvent(new CustomEvent("clickout", { detail: { node: s } }));
  };
  return window.addEventListener("click", e), () => window.removeEventListener("click", e);
}, Ee = (s) => {
  const e = new s.Mesh(
    new s.PlaneGeometry(2, 2),
    new s.MeshLambertMaterial({
      map: s.textureCallback(),
      side: s.DoubleSide,
      color: 16777215,
      transparent: !1
    })
  );
  return { mesh: e, update: () => {
    e.material.map = s.textureCallback();
  }, dispose: () => {
    e.geometry.dispose(), e.material.dispose();
  } };
}, be = (s) => new s(new Uint8Array(1), 1, 1), ze = (s) => -1 * Math.cos(s * (Math.PI / 2)) + 1, Pe = (s) => Math.sin(s * (Math.PI / 2)), Ie = (s) => -0.5 * (Math.cos(Math.PI * s) - 1), Se = (s) => s * s, Le = (s) => s * (2 - s), Oe = (s) => s < 0.5 ? 2 * s * s : -1 + (4 - 2 * s) * s, Fe = (s) => s * s * s, Ce = (s) => {
  const e = s - 1;
  return e * e * e + 1;
}, ke = (s) => s < 0.5 ? 4 * s * s * s : (s - 1) * (2 * s - 2) * (2 * s - 2) + 1, De = (s) => s * s * s * s, We = (s) => {
  const e = s - 1;
  return 1 - e * e * e * e;
}, Ae = (s) => {
  const e = s - 1;
  return s < 0.5 ? 8 * s * s * s * s : 1 - 8 * e * e * e * e;
}, Re = (s) => s * s * s * s * s, Qe = (s) => {
  const e = s - 1;
  return 1 + e * e * e * e * e;
}, $e = (s) => {
  const e = s - 1;
  return s < 0.5 ? 16 * s * s * s * s * s : 1 + 16 * e * e * e * e * e;
}, Be = (s) => s === 0 ? 0 : Math.pow(2, 10 * (s - 1)), qe = (s) => s === 1 ? 1 : -Math.pow(2, -10 * s) + 1, Ve = (s) => {
  if (s === 0 || s === 1)
    return s;
  const e = s * 2, t = e - 1;
  return e < 1 ? 0.5 * Math.pow(2, 10 * t) : 0.5 * (-Math.pow(2, -10 * t) + 2);
}, je = (s) => {
  const e = s / 1;
  return -1 * (Math.sqrt(1 - e * s) - 1);
}, He = (s) => {
  const e = s - 1;
  return Math.sqrt(1 - e * e);
}, Ne = (s) => {
  const e = s * 2, t = e - 2;
  return e < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - t * t) + 1);
}, Xe = (s, e = 1.70158) => s * s * ((e + 1) * s - e), Ye = (s, e = 1.70158) => {
  const t = s / 1 - 1;
  return t * t * ((e + 1) * t + e) + 1;
}, Ge = (s, e = 1.70158) => {
  const t = s * 2, n = t - 2, o = e * 1.525;
  return t < 1 ? 0.5 * t * t * ((o + 1) * t - o) : 0.5 * (n * n * ((o + 1) * n + o) + 2);
}, Ue = (s, e = 0.7) => {
  if (s === 0 || s === 1)
    return s;
  const n = s / 1 - 1, o = 1 - e, u = o / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * n) * Math.sin((n - u) * (2 * Math.PI) / o));
}, Je = (s, e = 0.7) => {
  if (s === 0 || s === 1) return s;
  const t = 1 - e, n = s * 2, o = t / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * n) * Math.sin((n - o) * (2 * Math.PI) / t) + 1;
}, Ke = (s, e = 0.65) => {
  if (s === 0 || s === 1) return s;
  const t = 1 - e, n = s * 2, o = n - 1, u = t / (2 * Math.PI) * Math.asin(1);
  return n < 1 ? -0.5 * (Math.pow(2, 10 * o) * Math.sin((o - u) * (2 * Math.PI) / t)) : Math.pow(2, -10 * o) * Math.sin((o - u) * (2 * Math.PI) / t) * 0.5 + 1;
}, fe = (s) => {
  const e = s / 1;
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
}, we = (s) => 1 - fe(1 - s), Ze = (s) => s < 0.5 ? we(s * 2) * 0.5 : fe(s * 2 - 1) * 0.5 + 0.5, ne = (s, e, t) => Math.max(e, Math.min(t, s)), _e = (s, e, t) => s >= e - t && s <= e + t, ye = (s, e, t) => (1 - t) * s + t * e, V = (s, e, t, n, o = 1e-4) => s <= e + o && s >= e - o ? s : ye(s, e, 1 - Math.exp(-t * n)), et = (s, e, t, n, o = 1e-4) => {
  s.x = V(s.x, e.x, t, n, o), s.y = V(s.y, e.y, t, n, o), s.x = V(s.x, e.x, t, n, o), s.y = V(s.y, e.y, t, n, o), typeof s.z == "number" && typeof e.z == "number" && (s.z = V(
    s.z,
    e.z,
    t,
    n,
    o
  )), typeof s.w == "number" && typeof e.w == "number" && (s.w = V(
    s.w,
    e.w,
    t,
    n,
    o
  ));
}, ce = () => (typeof performance > "u" ? Date : performance).now(), tt = (s) => new Promise((e) => setTimeout(e, s));
var E;
class me {
  constructor() {
    c(this, E);
    a(this, E, /* @__PURE__ */ new Set());
  }
  get size() {
    return i(this, E).size;
  }
  addListener(...e) {
    for (let t = 0, n = e.length; t < n; t++)
      i(this, E).add(e[t]);
  }
  removeListener(...e) {
    for (let t = 0, n = e.length; t < n; t++)
      i(this, E).delete(e[t]);
  }
  fire(...e) {
    i(this, E).forEach((t) => {
      t(...e);
    });
  }
  clear() {
    i(this, E).clear();
  }
}
E = new WeakMap();
const j = (s) => s && s();
var D, W, H, A, N;
class st extends me {
  constructor() {
    super();
    c(this, D);
    c(this, W, !0);
    c(this, H, 0);
    c(this, A);
    r(this, "uniforms", Object.freeze({
      uTime: { value: 0 },
      uDeltaTime: { value: 0 },
      uDeltaMs: { value: 0 }
    }));
    c(this, N, (t) => {
      const { uTime: n, uDeltaTime: o, uDeltaMs: u } = this.uniforms;
      n.value = t, u.value = Math.abs(t - i(this, H)), o.value = u.value * 1e-3, a(this, H, t), super.fire({ time: t, deltaTime: o.value, deltaMs: u.value }), !i(this, A) && a(this, D, requestAnimationFrame(i(this, N)));
    });
    r(this, "play", (t) => {
      a(this, A, t), i(this, W) && (a(this, W, !1), a(this, H, ce()), t ? t.setAnimationLoop(i(this, N)) : a(this, D, requestAnimationFrame(i(this, N))));
    });
    r(this, "pause", (t) => {
      a(this, W, !0), t ? t.setAnimationLoop(null) : typeof i(this, D) == "number" && cancelAnimationFrame(i(this, D));
    });
    r(this, "debug", (t) => {
      t.add({ paused: this.paused }, "paused").onChange((n) => {
        n ? this.pause(i(this, A)) : this.play(i(this, A));
      });
    });
    r(this, "interpolate", ({
      from: t = 0,
      to: n = 1,
      onStart: o,
      onUpdate: u,
      onComplete: h
    }) => {
      const d = Math.abs(t), m = Math.abs(n), p = t < n ? 1 : -1;
      let l = d;
      const y = (v) => {
        l += v.deltaTime, l = ne(l, d, m), typeof u == "function" && u({ value: l * p, ...v }), l === m && (typeof h == "function" && h({ value: l * p, ...v }), this.removeListener(y));
      }, { uDeltaMs: g, uDeltaTime: w, uTime: M } = this.uniforms;
      typeof o == "function" && o({
        value: t,
        time: M.value,
        deltaTime: w.value,
        deltaMs: g.value
      }), this.addListener(y);
    });
    r(this, "animate", ({
      steps: t = 0,
      duration: n = 400,
      delay: o = 0,
      iterations: u = 0,
      onStart: h,
      onUpdate: d,
      onComplete: m
    }) => {
      let p, l = 0, y = 0, g = 0;
      const w = ({ time: v }) => {
        const ie = Math.abs(v - l);
        if (t > 0) {
          const he = Math.min(Math.floor(ie / n * t), t - 1);
          he !== y && (y = he, j(d));
        } else j(d);
        ie >= n && (this.removeListener(w), j(d), j(m), g++, (u < 0 || u === 1 / 0 || g < u) && (typeof p == "number" && clearTimeout(p), o > 0 ? p = setTimeout(() => {
          l = ce(), j(h), this.addListener(w);
        }, o) : M()));
      }, M = () => {
        l = ce(), j(h), this.addListener(w);
      };
      return typeof p == "number" && clearTimeout(p), o > 0 ? p = setTimeout(M, o) : M(), () => this.removeListener(w);
    });
  }
  get paused() {
    return i(this, W);
  }
}
D = new WeakMap(), W = new WeakMap(), H = new WeakMap(), A = new WeakMap(), N = new WeakMap();
class it {
  constructor({
    camera: e,
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
var se, X, Y, G, R, U, J, K, L, Z, oe, re, ae, Q, $, B;
class nt {
  constructor({
    Plane: e,
    Raycaster: t,
    Vector2: n,
    Vector3: o,
    camera: u
  }) {
    r(this, "uniforms");
    c(this, se);
    c(this, X);
    c(this, Y);
    c(this, G);
    c(this, R);
    c(this, U);
    c(this, J);
    c(this, K);
    c(this, L);
    c(this, Z, () => {
      i(this, L) && (i(this, L).innerHTML = `
			<p>Mouse position x ${this.uniforms.uMousePosition.value.x.toFixed(2)} y ${this.uniforms.uMousePosition.value.y.toFixed(2)}</p>
			<p>Mouse world position x ${this.uniforms.uMouseWorldPosition.value.x.toFixed(2)} y ${this.uniforms.uMouseWorldPosition.value.y.toFixed(2)} z ${this.uniforms.uMouseWorldPosition.value.z.toFixed(2)}</p>
			<p>Mouse velocity x ${this.uniforms.uMouseVelocity.value.x.toFixed(2)} y ${this.uniforms.uMouseVelocity.value.y.toFixed(2)}</p>
			<p>Mouse press ${this.uniforms.uMousePress.value}</p>
			<p>Scroll x ${this.uniforms.uScroll.value.x.toFixed(2)} y ${this.uniforms.uScroll.value.y.toFixed(2)}</p>
		
		`);
    });
    c(this, oe, (e) => {
      const t = e, n = t.target;
      let o = 0, u = 0;
      if (n instanceof HTMLCanvasElement)
        o = n.width, u = n.height;
      else if (n instanceof HTMLElement) {
        const { width: d, height: m } = n.getBoundingClientRect();
        o = d, u = m;
      } else
        o = window.innerWidth, u = window.innerHeight;
      const { uMousePosition: h } = this.uniforms;
      h.value.x = t.clientX / o * 2 - 1, h.value.y = -(t.clientY / u) * 2 + 1;
    });
    c(this, re, (e) => {
      const t = e, { uMouseVelocity: n } = this.uniforms, o = t.pageX, u = t.pageY, h = i(this, R).x, d = i(this, R).y;
      n.value.x = Math.abs(o - h), n.value.y = Math.abs(u - d), i(this, R).set(o, u), typeof i(this, U) == "number" && clearTimeout(i(this, U)), a(this, U, setTimeout(() => {
        n.value.set(0, 0);
      }, 200));
    });
    c(this, ae, () => {
      const { uMouseWorldPosition: e, uMousePosition: t } = this.uniforms;
      i(this, J).getWorldDirection(i(this, K)), i(this, Y).setFromCamera(t.value, i(this, J)), i(this, X).setFromNormalAndCoplanarPoint(i(this, K), i(this, se)), i(this, Y).ray.intersectPlane(i(this, X), e.value);
    });
    c(this, Q, (e) => {
      i(this, oe).call(this, e), i(this, ae).call(this), i(this, re).call(this, e), i(this, Z).call(this);
    });
    c(this, $, (e) => {
      const { uScroll: t, uScrollVelocity: n } = this.uniforms;
      i(this, G).copy(t.value);
      const o = window.scrollX / (document.body.scrollWidth - window.innerWidth), u = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      t.value.x = o, t.value.y = u, e.type === "scroll" ? n.value.subVectors(t.value, i(this, G)) : n.value.set(0, 0), i(this, Z).call(this);
    });
    c(this, B, (e) => {
      const t = e, { uMousePress: n } = this.uniforms;
      t.pointerType === "mouse" ? n.value = t.pressure ? 1 : 0 : n.value = t.pressure, i(this, Z).call(this);
    });
    r(this, "init", (e) => {
      e.addEventListener("pointermove", i(this, Q), !1), e.addEventListener("pointerout", i(this, Q), !1), e.addEventListener("pointerdown", i(this, B), !1), e.addEventListener("pointerup", i(this, B), !1), window.addEventListener("scroll", i(this, $), !1), window.addEventListener("scrollend", i(this, $), !1);
    });
    r(this, "clear", (e) => {
      e.removeEventListener("pointermove", i(this, Q), !1), e.removeEventListener("pointerout", i(this, Q), !1), e.removeEventListener("pointerdown", i(this, B), !1), e.removeEventListener("pointerup", i(this, B), !1), window.removeEventListener("scroll", i(this, $), !1), window.removeEventListener("scrollend", i(this, $), !1);
    });
    r(this, "debug", (e) => {
      a(this, L, document.createElement("div")), i(this, L).style.padding = "3px", e.domElement.appendChild(i(this, L));
    });
    this.uniforms = Object.freeze({
      uScroll: { value: new n() },
      uScrollVelocity: { value: new n() },
      uMousePress: { value: 0 },
      uMousePosition: { value: new n() },
      uMouseWorldPosition: { value: new o() },
      uMouseVelocity: { value: new n() }
    }), a(this, se, new o()), a(this, X, new e()), a(this, Y, new t()), a(this, G, new n()), a(this, R, new n()), a(this, J, u), a(this, K, new o());
  }
}
se = new WeakMap(), X = new WeakMap(), Y = new WeakMap(), G = new WeakMap(), R = new WeakMap(), U = new WeakMap(), J = new WeakMap(), K = new WeakMap(), L = new WeakMap(), Z = new WeakMap(), oe = new WeakMap(), re = new WeakMap(), ae = new WeakMap(), Q = new WeakMap(), $ = new WeakMap(), B = new WeakMap();
const ge = function(s, e, t, n) {
  const o = function(u, h, d) {
    var l, y;
    const m = (l = u.getShaderInfoLog(h)) == null ? void 0 : l.trim(), p = "Errors in " + d + `:

` + m;
    if (m !== "") {
      const g = (y = u.getShaderSource(h)) == null ? void 0 : y.replace(/\t/g, "  "), w = g == null ? void 0 : g.split(`
`);
      let M = "", v = 1;
      if (!w) return;
      for (const ie of w)
        M += (v < 10 ? " " : "") + v + ":		" + ie + `
`, v++;
      console.error(p + `
` + M);
    }
  };
  o(s, t, "Vertex Shader"), o(s, n, "Fragment Shader");
};
class ot {
  constructor({
    renderer: e,
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
      t && (t.debug.checkShaderErrors = !0, t.debug.onShaderError = ge, e.add(t, "toneMapping", {
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
var b, O, F, _, z, C, ee;
class rt extends me {
  constructor(t) {
    super();
    c(this, b, 7680);
    // 4k
    c(this, O, 1280);
    c(this, F, 720);
    c(this, _, 1);
    c(this, z, 1);
    c(this, C);
    r(this, "fire", () => {
      let t = i(this, O), n = i(this, F);
      if (i(this, O) > i(this, b) || i(this, F) > i(this, b))
        if (t > n) {
          const u = n / t;
          t = ne(t, 0, i(this, b)), n = t * u;
        } else {
          const u = t / n;
          n = ne(n, 0, i(this, b)), t = n * u;
        }
      t *= i(this, z), n *= i(this, z);
      const o = i(this, _);
      super.fire({ width: t, height: n, pixelRatio: o });
    });
    c(this, ee, new ResizeObserver((t) => {
      const n = t[0].contentBoxSize[0], { inlineSize: o, blockSize: u } = n;
      i(this, O) === o && i(this, F) === u || (a(this, O, o), a(this, F, u), this.fire());
    }));
    r(this, "debug", (t) => {
      t.add({ maxSize: this.maxSize }, "maxSize", 0, 7680).name("max resolution").onChange((n) => {
        this.maxSize = n;
      }), t.add({ resolutionFactor: this.resolutionFactor }, "resolutionFactor", 0, 1).name("resolution factor").onChange((n) => {
        this.resolutionFactor = n;
      });
    });
    a(this, _, Math.min(window.devicePixelRatio, 2)), a(this, C, t), i(this, ee).observe(i(this, C)), this.fire();
  }
  get width() {
    return i(this, O) * i(this, z);
  }
  get height() {
    return i(this, F) * i(this, z);
  }
  get element() {
    return i(this, C);
  }
  get pixelRatio() {
    return i(this, _);
  }
  get maxSize() {
    return i(this, b);
  }
  get resolutionFactor() {
    return i(this, z);
  }
  set resolutionFactor(t) {
    a(this, z, ne(t, 0.01, 1)), this.fire();
  }
  set maxSize(t) {
    a(this, b, t < 32 ? 32 : t), this.fire();
  }
  clear() {
    super.clear(), i(this, C) && i(this, ee).unobserve(i(this, C)), i(this, ee).disconnect();
  }
}
b = new WeakMap(), O = new WeakMap(), F = new WeakMap(), _ = new WeakMap(), z = new WeakMap(), C = new WeakMap(), ee = new WeakMap();
const S = class S {
  constructor({ scene: e }) {
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
let pe = S;
var x, P, te, f, q, I;
class at {
  constructor(e, t) {
    c(this, x, {
      mass: 0.5,
      tension: 0.5,
      friction: 0.5,
      threshold: 0.1,
      onUpdate: void 0,
      onComplete: void 0
    });
    c(this, P, 0);
    c(this, te, 0);
    c(this, f, 0);
    c(this, q, 0);
    c(this, I, !1);
    r(this, "from", (e) => (a(this, te, e), a(this, f, e), this));
    r(this, "to", (e, t) => (a(this, P, e), Math.abs(i(this, q)) < i(this, x).threshold && Math.abs(i(this, P) - i(this, f)) < i(this, x).threshold ? this : (t && a(this, x, { ...i(this, x), ...t }), a(this, I, !1), this)));
    r(this, "update", (e = 0.016) => {
      if (i(this, I)) return;
      const { mass: t, tension: n, friction: o, threshold: u, onComplete: h, onUpdate: d } = i(this, x), m = Math.min(e, 0.06), p = i(this, q) ?? 0, l = typeof i(this, f) == "number" ? i(this, f) : i(this, te), y = -1 * n * (l - i(this, P)), g = -1 * p * o, w = (y + g) / t, M = p + w * m, v = l + M * m;
      a(this, I, Math.abs(M) < u && Math.abs(v - i(this, P)) < u), a(this, f, i(this, I) ? i(this, P) : v), a(this, q, M), i(this, I) ? (a(this, f, i(this, P)), h && h(i(this, f))) : d && d(i(this, f));
    });
    a(this, f, e || 0), a(this, te, e || 0), a(this, x, { ...i(this, x), ...t });
  }
  get value() {
    return i(this, f);
  }
  get velocity() {
    return i(this, q);
  }
  get finished() {
    return i(this, I);
  }
}
x = new WeakMap(), P = new WeakMap(), te = new WeakMap(), f = new WeakMap(), q = new WeakMap(), I = new WeakMap();
var k, T, ue;
class ut {
  constructor() {
    c(this, k, []);
    c(this, T, !1);
    c(this, ue, async () => {
      if (!i(this, T)) {
        for (a(this, T, !0); i(this, k).length > 0 && i(this, T); ) {
          const e = i(this, k).shift();
          if (e)
            try {
              await e();
            } catch (t) {
              console.error("Timeline error:", t);
            }
        }
        a(this, T, !1);
      }
    });
    r(this, "add", (...e) => {
      i(this, k).push(...e);
    });
    r(this, "play", async () => {
      a(this, T, !1), await i(this, ue).call(this);
    });
    r(this, "stop", () => {
      a(this, T, !1);
    });
    r(this, "clear", () => {
      this.stop(), a(this, k, []);
    });
  }
  get isPlaying() {
    return i(this, T);
  }
  get size() {
    return i(this, k).length;
  }
}
k = new WeakMap(), T = new WeakMap(), ue = new WeakMap();
export {
  st as Animator,
  it as CameraWrapper,
  me as MonoEventEmitter,
  nt as MousePointer,
  ot as RendererWrapper,
  rt as Resizer,
  pe as SceneWrapper,
  at as Spring,
  ut as TaskQueue,
  ne as clamp,
  Te as clickout,
  Ee as createDebugTexture,
  be as createEmpytTexture,
  V as dampThreshold,
  et as dampThresholdVec,
  Xe as easeInBack,
  we as easeInBounce,
  je as easeInCirc,
  Fe as easeInCubic,
  Ue as easeInElastic,
  Be as easeInExpo,
  Ge as easeInOutBack,
  Ze as easeInOutBounce,
  Ne as easeInOutCirc,
  ke as easeInOutCubic,
  Ke as easeInOutElastic,
  Ve as easeInOutExpo,
  Oe as easeInOutQuad,
  Ae as easeInOutQuart,
  $e as easeInOutQuint,
  Ie as easeInOutSine,
  Se as easeInQuad,
  De as easeInQuart,
  Re as easeInQuint,
  ze as easeInSine,
  Ye as easeOutBack,
  fe as easeOutBounce,
  He as easeOutCirc,
  Ce as easeOutCubic,
  Je as easeOutElastic,
  qe as easeOutExpo,
  Le as easeOutQuad,
  We as easeOutQuart,
  Qe as easeOutQuint,
  Pe as easeOutSine,
  _e as isBetween,
  ye as lerp,
  ce as now,
  tt as wait
};
