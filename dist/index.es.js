var ye = Object.defineProperty;
var fe = (i) => {
  throw TypeError(i);
};
var Me = (i, e, t) => e in i ? ye(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var r = (i, e, t) => Me(i, typeof e != "symbol" ? e + "" : e, t), ve = (i, e, t) => e.has(i) || fe("Cannot " + t);
var s = (i, e, t) => (ve(i, e, "read from private field"), t ? t.call(i) : e.get(i)), a = (i, e, t) => e.has(i) ? fe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), c = (i, e, t, n) => (ve(i, e, "write to private field"), n ? n.call(i, t) : e.set(i, t), t);
const Ee = (i) => {
  const e = (t) => {
    const n = t.target;
    i && !i.contains(n) && !t.defaultPrevented && i.dispatchEvent(new CustomEvent("clickout", { detail: { node: i } }));
  };
  return window.addEventListener("click", e), () => window.removeEventListener("click", e);
}, be = (i) => {
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
}, Ie = (i) => new i(new Uint8Array(1), 1, 1), Se = (i) => -1 * Math.cos(i * (Math.PI / 2)) + 1, De = (i) => Math.sin(i * (Math.PI / 2)), Le = (i) => -0.5 * (Math.cos(Math.PI * i) - 1), Ce = (i) => i * i, Fe = (i) => i * (2 - i), Oe = (i) => i < 0.5 ? 2 * i * i : -1 + (4 - 2 * i) * i, Ne = (i) => i * i * i, ke = (i) => {
  const e = i - 1;
  return e * e * e + 1;
}, je = (i) => i < 0.5 ? 4 * i * i * i : (i - 1) * (2 * i - 2) * (2 * i - 2) + 1, We = (i) => i * i * i * i, Ae = (i) => {
  const e = i - 1;
  return 1 - e * e * e * e;
}, Re = (i) => {
  const e = i - 1;
  return i < 0.5 ? 8 * i * i * i * i : 1 - 8 * e * e * e * e;
}, qe = (i) => i * i * i * i * i, Qe = (i) => {
  const e = i - 1;
  return 1 + e * e * e * e * e;
}, $e = (i) => {
  const e = i - 1;
  return i < 0.5 ? 16 * i * i * i * i * i : 1 + 16 * e * e * e * e * e;
}, Be = (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)), Xe = (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1, Ye = (i) => {
  if (i === 0 || i === 1)
    return i;
  const e = i * 2, t = e - 1;
  return e < 1 ? 0.5 * Math.pow(2, 10 * t) : 0.5 * (-Math.pow(2, -10 * t) + 2);
}, Ve = (i) => {
  const e = i / 1;
  return -1 * (Math.sqrt(1 - e * i) - 1);
}, He = (i) => {
  const e = i - 1;
  return Math.sqrt(1 - e * e);
}, Ze = (i) => {
  const e = i * 2, t = e - 2;
  return e < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - t * t) + 1);
}, Ue = (i, e = 1.70158) => i * i * ((e + 1) * i - e), Ge = (i, e = 1.70158) => {
  const t = i / 1 - 1;
  return t * t * ((e + 1) * t + e) + 1;
}, Je = (i, e = 1.70158) => {
  const t = i * 2, n = t - 2, o = e * 1.525;
  return t < 1 ? 0.5 * t * t * ((o + 1) * t - o) : 0.5 * (n * n * ((o + 1) * n + o) + 2);
}, Ke = (i, e = 0.7) => {
  if (i === 0 || i === 1)
    return i;
  const n = i / 1 - 1, o = 1 - e, u = o / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * n) * Math.sin((n - u) * (2 * Math.PI) / o));
}, _e = (i, e = 0.7) => {
  if (i === 0 || i === 1) return i;
  const t = 1 - e, n = i * 2, o = t / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * n) * Math.sin((n - o) * (2 * Math.PI) / t) + 1;
}, et = (i, e = 0.65) => {
  if (i === 0 || i === 1) return i;
  const t = 1 - e, n = i * 2, o = n - 1, u = t / (2 * Math.PI) * Math.asin(1);
  return n < 1 ? -0.5 * (Math.pow(2, 10 * o) * Math.sin((o - u) * (2 * Math.PI) / t)) : Math.pow(2, -10 * o) * Math.sin((o - u) * (2 * Math.PI) / t) * 0.5 + 1;
}, we = (i) => {
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
}, ze = (i) => 1 - we(1 - i), tt = (i) => i < 0.5 ? ze(i * 2) * 0.5 : we(i * 2 - 1) * 0.5 + 0.5, ce = (i, e, t) => Math.max(e, Math.min(t, i)), it = (i, e, t) => i >= e - t && i <= e + t, ge = (i, e, t) => (1 - t) * i + t * e, $ = (i, e, t, n, o = 1e-4) => i <= e + o && i >= e - o ? i : ge(i, e, 1 - Math.exp(-t * n)), st = (i, e, t, n, o = 1e-4) => {
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
}, me = () => (typeof performance > "u" ? Date : performance).now(), nt = (i) => new Promise((e) => setTimeout(e, i));
var T;
class se {
  constructor() {
    a(this, T);
    c(this, T, /* @__PURE__ */ new Set());
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
class ot extends se {
  constructor() {
    super();
    a(this, N);
    a(this, k, !0);
    a(this, X, 0);
    a(this, j);
    r(this, "uniforms", Object.freeze({
      uTime: { value: 0 },
      uDeltaTime: { value: 0 },
      uDeltaMs: { value: 0 }
    }));
    a(this, Y, (t) => {
      const { uTime: n, uDeltaTime: o, uDeltaMs: u } = this.uniforms;
      n.value = t, u.value = Math.abs(t - s(this, X)), o.value = u.value * 1e-3, c(this, X, t), super.fire({ time: t, deltaTime: o.value, deltaMs: u.value }), !s(this, j) && c(this, N, requestAnimationFrame(s(this, Y)));
    });
    r(this, "play", (t) => {
      c(this, j, t), s(this, k) && (c(this, k, !1), c(this, X, me()), t ? t.setAnimationLoop(s(this, Y)) : c(this, N, requestAnimationFrame(s(this, Y))));
    });
    r(this, "pause", (t) => {
      c(this, k, !0), t ? t.setAnimationLoop(null) : typeof s(this, N) == "number" && cancelAnimationFrame(s(this, N));
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
      onUpdate: u,
      onComplete: l
    }) => {
      const p = Math.abs(t), f = Math.abs(n), m = t < n ? 1 : -1;
      let h = p;
      const y = (x) => {
        h += x.deltaTime, h = ce(h, p, f), typeof u == "function" && u({ value: h * m, ...x }), h === f && (typeof l == "function" && l({ value: h * m, ...x }), this.removeListener(y));
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
      iterations: u = 0,
      onStart: l,
      onUpdate: p,
      onComplete: f
    }) => {
      let m, h = 0, y = 0, M = 0;
      const w = ({ time: x }) => {
        const ae = Math.abs(x - h);
        if (t > 0) {
          const de = Math.min(Math.floor(ae / n * t), t - 1);
          de !== y && (y = de, B(p));
        } else B(p);
        ae >= n && (this.removeListener(w), B(p), B(f), M++, (u < 0 || u === 1 / 0 || M < u) && (typeof m == "number" && clearTimeout(m), o > 0 ? m = setTimeout(() => {
          h = me(), B(l), this.addListener(w);
        }, o) : v()));
      }, v = () => {
        h = me(), B(l), this.addListener(w);
      };
      return typeof m == "number" && clearTimeout(m), o > 0 ? m = setTimeout(v, o) : v(), () => this.removeListener(w);
    });
  }
  get paused() {
    return s(this, k);
  }
}
N = new WeakMap(), k = new WeakMap(), X = new WeakMap(), j = new WeakMap(), Y = new WeakMap();
class rt {
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
var ne, V, H, Z, W, U, G, J, D, K, oe, re, _, ue, le, he, A, R, q;
class at {
  constructor({
    Plane: e,
    Raycaster: t,
    Vector2: n,
    Vector3: o,
    camera: u
  }) {
    r(this, "uniforms");
    a(this, ne);
    a(this, V);
    a(this, H);
    a(this, Z);
    a(this, W);
    a(this, U);
    a(this, G);
    a(this, J);
    a(this, D);
    a(this, K, new se());
    a(this, oe, new se());
    a(this, re, new se());
    a(this, _, () => {
      s(this, D) && (s(this, D).innerHTML = `
			<p>Mouse position x ${this.uniforms.uMousePosition.value.x.toFixed(2)} y ${this.uniforms.uMousePosition.value.y.toFixed(2)}</p>
			<p>Mouse world position x ${this.uniforms.uMouseWorldPosition.value.x.toFixed(2)} y ${this.uniforms.uMouseWorldPosition.value.y.toFixed(2)} z ${this.uniforms.uMouseWorldPosition.value.z.toFixed(2)}</p>
			<p>Mouse velocity x ${this.uniforms.uMouseVelocity.value.x.toFixed(2)} y ${this.uniforms.uMouseVelocity.value.y.toFixed(2)}</p>
			<p>Mouse press ${this.uniforms.uMousePress.value}</p>
			<p>Scroll x ${this.uniforms.uScroll.value.x.toFixed(2)} y ${this.uniforms.uScroll.value.y.toFixed(2)}</p>
		
		`);
    });
    a(this, ue, (e) => {
      const t = e, n = t.target;
      let o = 0, u = 0;
      if (n instanceof HTMLCanvasElement)
        o = n.width, u = n.height;
      else if (n instanceof HTMLElement) {
        const { width: p, height: f } = n.getBoundingClientRect();
        o = p, u = f;
      } else
        o = window.innerWidth, u = window.innerHeight;
      const { uMousePosition: l } = this.uniforms;
      l.value.x = t.clientX / o * 2 - 1, l.value.y = -(t.clientY / u) * 2 + 1;
    });
    a(this, le, (e) => {
      const t = e, { uMouseVelocity: n } = this.uniforms, o = t.pageX, u = t.pageY, l = s(this, W).x, p = s(this, W).y;
      n.value.x = Math.abs(o - l), n.value.y = Math.abs(u - p), s(this, W).set(o, u), typeof s(this, U) == "number" && clearTimeout(s(this, U)), c(this, U, setTimeout(() => {
        n.value.set(0, 0);
      }, 200));
    });
    a(this, he, () => {
      const { uMouseWorldPosition: e, uMousePosition: t } = this.uniforms;
      s(this, G).getWorldDirection(s(this, J)), s(this, H).setFromCamera(t.value, s(this, G)), s(this, V).setFromNormalAndCoplanarPoint(s(this, J), s(this, ne)), s(this, H).ray.intersectPlane(s(this, V), e.value);
    });
    a(this, A, (e) => {
      s(this, ue).call(this, e), s(this, he).call(this), s(this, le).call(this, e), s(this, _).call(this), s(this, K).fire();
    });
    a(this, R, (e) => {
      const { uScroll: t, uScrollVelocity: n } = this.uniforms;
      s(this, Z).copy(t.value);
      const o = window.scrollX / (document.body.scrollWidth - window.innerWidth), u = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      t.value.x = o, t.value.y = u, e.type === "scroll" ? n.value.subVectors(t.value, s(this, Z)) : n.value.set(0, 0), s(this, _).call(this), s(this, re).fire();
    });
    a(this, q, (e) => {
      const t = e, { uMousePress: n } = this.uniforms;
      t.pointerType === "mouse" ? n.value = t.pressure ? 1 : 0 : n.value = t.pressure, s(this, _).call(this), s(this, oe).fire();
    });
    r(this, "onMove", (...e) => {
      s(this, K).addListener(...e);
    });
    r(this, "onPress", (...e) => {
      s(this, oe).addListener(...e);
    });
    r(this, "onScroll", (...e) => {
      s(this, re).addListener(...e);
    });
    r(this, "init", (e) => {
      e.addEventListener("pointermove", s(this, A), !1), e.addEventListener("pointerout", s(this, A), !1), e.addEventListener("pointerdown", s(this, q), !1), e.addEventListener("pointerup", s(this, q), !1), window.addEventListener("scroll", s(this, R), !1), window.addEventListener("scrollend", s(this, R), !1);
    });
    r(this, "clear", (e) => {
      s(this, K).clear(), e.removeEventListener("pointermove", s(this, A), !1), e.removeEventListener("pointerout", s(this, A), !1), e.removeEventListener("pointerdown", s(this, q), !1), e.removeEventListener("pointerup", s(this, q), !1), window.removeEventListener("scroll", s(this, R), !1), window.removeEventListener("scrollend", s(this, R), !1);
    });
    r(this, "debug", (e) => {
      c(this, D, document.createElement("div")), s(this, D).style.padding = "3px", e.domElement.appendChild(s(this, D));
    });
    this.uniforms = Object.freeze({
      uScroll: { value: new n() },
      uScrollVelocity: { value: new n() },
      uMousePress: { value: 0 },
      uMousePosition: { value: new n() },
      uMouseWorldPosition: { value: new o() },
      uMouseVelocity: { value: new n() }
    }), c(this, ne, new o()), c(this, V, new e()), c(this, H, new t()), c(this, Z, new n()), c(this, W, new n()), c(this, G, u), c(this, J, new o());
  }
}
ne = new WeakMap(), V = new WeakMap(), H = new WeakMap(), Z = new WeakMap(), W = new WeakMap(), U = new WeakMap(), G = new WeakMap(), J = new WeakMap(), D = new WeakMap(), K = new WeakMap(), oe = new WeakMap(), re = new WeakMap(), _ = new WeakMap(), ue = new WeakMap(), le = new WeakMap(), he = new WeakMap(), A = new WeakMap(), R = new WeakMap(), q = new WeakMap();
const Te = function(i, e, t, n) {
  const o = function(u, l, p) {
    var h, y;
    const f = (h = u.getShaderInfoLog(l)) == null ? void 0 : h.trim(), m = "Errors in " + p + `:

` + f;
    if (f !== "") {
      const M = (y = u.getShaderSource(l)) == null ? void 0 : y.replace(/\t/g, "  "), w = M == null ? void 0 : M.split(`
`);
      let v = "", x = 1;
      if (!w) return;
      for (const ae of w)
        v += (x < 10 ? " " : "") + x + ":		" + ae + `
`, x++;
      console.error(m + `
` + v);
    }
  };
  o(i, t, "Vertex Shader"), o(i, n, "Fragment Shader");
};
class ct {
  constructor({
    instance: e,
    Vector2: t,
    EffectComposer: n
  }) {
    r(this, "uniforms");
    r(this, "instance");
    r(this, "composer");
    r(this, "addEffect", (...e) => {
      e.forEach((t) => {
        if (!this.composer || !this.instance) return console.warn("EffectComposer not initialized");
        this.composer.addPass(t);
      });
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
      t && (t.debug.checkShaderErrors = !0, t.debug.onShaderError = Te, e.add(t, "toneMapping", {
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
var P, L, C, ee, E, F, te;
class ut extends se {
  constructor(t) {
    super();
    a(this, P, 7680);
    // 4k
    a(this, L, 1280);
    a(this, C, 720);
    a(this, ee, 1);
    a(this, E, 1);
    a(this, F);
    r(this, "fire", () => {
      let t = s(this, L), n = s(this, C);
      if (s(this, L) > s(this, P) || s(this, C) > s(this, P))
        if (t > n) {
          const u = n / t;
          t = ce(t, 0, s(this, P)), n = t * u;
        } else {
          const u = t / n;
          n = ce(n, 0, s(this, P)), t = n * u;
        }
      t *= s(this, E), n *= s(this, E);
      const o = s(this, ee);
      super.fire({ width: t, height: n, pixelRatio: o });
    });
    a(this, te, new ResizeObserver((t) => {
      const n = t[0].contentBoxSize[0], { inlineSize: o, blockSize: u } = n;
      s(this, L) === o && s(this, C) === u || (c(this, L, o), c(this, C, u), this.fire());
    }));
    r(this, "debug", (t) => {
      t.add({ maxSize: this.maxSize }, "maxSize", 0, 7680).name("max resolution").onChange((n) => {
        this.maxSize = n;
      }), t.add({ resolutionFactor: this.resolutionFactor }, "resolutionFactor", 0, 1).name("resolution factor").onChange((n) => {
        this.resolutionFactor = n;
      });
    });
    c(this, ee, Math.min(window.devicePixelRatio, 2)), c(this, F, t), s(this, te).observe(s(this, F)), this.fire();
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
    return s(this, ee);
  }
  get maxSize() {
    return s(this, P);
  }
  get resolutionFactor() {
    return s(this, E);
  }
  set resolutionFactor(t) {
    c(this, E, ce(t, 0.01, 1)), this.fire();
  }
  set maxSize(t) {
    c(this, P, t < 32 ? 32 : t), this.fire();
  }
  clear() {
    super.clear(), s(this, F) && s(this, te).unobserve(s(this, F)), s(this, te).disconnect();
  }
}
P = new WeakMap(), L = new WeakMap(), C = new WeakMap(), ee = new WeakMap(), E = new WeakMap(), F = new WeakMap(), te = new WeakMap();
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
let xe = S;
var z, b, ie, d, Q, I;
class lt {
  constructor(e, t) {
    a(this, z, {
      mass: 0.5,
      tension: 0.5,
      friction: 0.5,
      threshold: 0.1,
      onUpdate: void 0,
      onComplete: void 0
    });
    a(this, b, 0);
    a(this, ie, 0);
    a(this, d, 0);
    a(this, Q, 0);
    a(this, I, !1);
    r(this, "from", (e) => (c(this, ie, e), c(this, d, e), this));
    r(this, "to", (e, t) => (c(this, b, e), Math.abs(s(this, Q)) < s(this, z).threshold && Math.abs(s(this, b) - s(this, d)) < s(this, z).threshold ? this : (t && c(this, z, { ...s(this, z), ...t }), c(this, I, !1), this)));
    r(this, "update", (e = 0.016) => {
      if (s(this, I)) return;
      const { mass: t, tension: n, friction: o, threshold: u, onComplete: l, onUpdate: p } = s(this, z), f = Math.min(e, 0.06), m = s(this, Q) ?? 0, h = typeof s(this, d) == "number" ? s(this, d) : s(this, ie), y = -1 * n * (h - s(this, b)), M = -1 * m * o, w = (y + M) / t, v = m + w * f, x = h + v * f;
      c(this, I, Math.abs(v) < u && Math.abs(x - s(this, b)) < u), c(this, d, s(this, I) ? s(this, b) : x), c(this, Q, v), s(this, I) ? (c(this, d, s(this, b)), l && l(s(this, d))) : p && p(s(this, d));
    });
    c(this, d, e || 0), c(this, ie, e || 0), c(this, z, { ...s(this, z), ...t });
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
z = new WeakMap(), b = new WeakMap(), ie = new WeakMap(), d = new WeakMap(), Q = new WeakMap(), I = new WeakMap();
var O, g, pe;
class ht {
  constructor() {
    a(this, O, []);
    a(this, g, !1);
    a(this, pe, async () => {
      if (!s(this, g)) {
        for (c(this, g, !0); s(this, O).length > 0 && s(this, g); ) {
          const e = s(this, O).shift();
          if (e)
            try {
              await e();
            } catch (t) {
              console.error("Timeline error:", t);
            }
        }
        c(this, g, !1);
      }
    });
    r(this, "add", (...e) => {
      s(this, O).push(...e);
    });
    r(this, "play", async () => {
      c(this, g, !1), await s(this, pe).call(this);
    });
    r(this, "stop", () => {
      c(this, g, !1);
    });
    r(this, "clear", () => {
      this.stop(), c(this, O, []);
    });
  }
  get isPlaying() {
    return s(this, g);
  }
  get size() {
    return s(this, O).length;
  }
}
O = new WeakMap(), g = new WeakMap(), pe = new WeakMap();
var pt = `vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v+dot(v,vec4(F4)));vec4 x0=v-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec3 curl(in vec3 p,in float noiseTime,in float persistence){vec4 xNoisePotentialDerivatives=vec4(0.0);vec4 yNoisePotentialDerivatives=vec4(0.0);vec4 zNoisePotentialDerivatives=vec4(0.0);for(int i=0;i<3;++i){float twoPowI=pow(2.0,float(i));float scale=0.5*twoPowI*pow(persistence,float(i));xNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4(p*twoPowI,noiseTime))*scale;yNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(123.4,129845.6,-1239.1))*twoPowI,noiseTime))*scale;zNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(-9519.0,9051.0,-123.0))*twoPowI,noiseTime))*scale;}return vec3(zNoisePotentialDerivatives[1]-yNoisePotentialDerivatives[2],xNoisePotentialDerivatives[2]-zNoisePotentialDerivatives[0],yNoisePotentialDerivatives[0]-xNoisePotentialDerivatives[1]);}`, mt = "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";
export {
  ot as Animator,
  rt as CameraWrapper,
  se as MonoEventEmitter,
  at as MousePointer,
  ct as RendererWrapper,
  ut as Resizer,
  xe as SceneWrapper,
  lt as Spring,
  ht as TaskQueue,
  ce as clamp,
  Ee as clickout,
  be as createDebugTexture,
  Ie as createEmpytTexture,
  pt as curl,
  $ as dampThreshold,
  st as dampThresholdVec,
  Ue as easeInBack,
  ze as easeInBounce,
  Ve as easeInCirc,
  Ne as easeInCubic,
  Ke as easeInElastic,
  Be as easeInExpo,
  Je as easeInOutBack,
  tt as easeInOutBounce,
  Ze as easeInOutCirc,
  je as easeInOutCubic,
  et as easeInOutElastic,
  Ye as easeInOutExpo,
  Oe as easeInOutQuad,
  Re as easeInOutQuart,
  $e as easeInOutQuint,
  Le as easeInOutSine,
  Ce as easeInQuad,
  We as easeInQuart,
  qe as easeInQuint,
  Se as easeInSine,
  Ge as easeOutBack,
  we as easeOutBounce,
  He as easeOutCirc,
  ke as easeOutCubic,
  _e as easeOutElastic,
  Xe as easeOutExpo,
  Fe as easeOutQuad,
  Ae as easeOutQuart,
  Qe as easeOutQuint,
  De as easeOutSine,
  it as isBetween,
  ge as lerp,
  me as now,
  mt as vsfx,
  nt as wait
};
