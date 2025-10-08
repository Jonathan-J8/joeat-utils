var ve = Object.defineProperty;
var pe = (i) => {
  throw TypeError(i);
};
var xe = (i, e, t) => e in i ? ve(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var a = (i, e, t) => xe(i, typeof e != "symbol" ? e + "" : e, t), ye = (i, e, t) => e.has(i) || pe("Cannot " + t);
var s = (i, e, t) => (ye(i, e, "read from private field"), t ? t.call(i) : e.get(i)), h = (i, e, t) => e.has(i) ? pe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), o = (i, e, t, n) => (ye(i, e, "write to private field"), n ? n.call(i, t) : e.set(i, t), t);
const ze = (i) => {
  const e = (t) => {
    const n = t.target;
    i && !i.contains(n) && !t.defaultPrevented && i.dispatchEvent(new CustomEvent("clickout", { detail: { node: i } }));
  };
  return window.addEventListener("click", e), () => window.removeEventListener("click", e);
}, Ee = (i) => {
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
}, Se = (i) => new i(new Uint8Array(1), 1, 1), Ie = (i) => -1 * Math.cos(i * (Math.PI / 2)) + 1, Fe = (i) => Math.sin(i * (Math.PI / 2)), Oe = (i) => -0.5 * (Math.cos(Math.PI * i) - 1), Le = (i) => i * i, Ce = (i) => i * (2 - i), ke = (i) => i < 0.5 ? 2 * i * i : -1 + (4 - 2 * i) * i, De = (i) => i * i * i, Ae = (i) => {
  const e = i - 1;
  return e * e * e + 1;
}, We = (i) => i < 0.5 ? 4 * i * i * i : (i - 1) * (2 * i - 2) * (2 * i - 2) + 1, Re = (i) => i * i * i * i, $e = (i) => {
  const e = i - 1;
  return 1 - e * e * e * e;
}, Qe = (i) => {
  const e = i - 1;
  return i < 0.5 ? 8 * i * i * i * i : 1 - 8 * e * e * e * e;
}, Be = (i) => i * i * i * i * i, Ve = (i) => {
  const e = i - 1;
  return 1 + e * e * e * e * e;
}, qe = (i) => {
  const e = i - 1;
  return i < 0.5 ? 16 * i * i * i * i * i : 1 + 16 * e * e * e * e * e;
}, je = (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)), Ne = (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1, He = (i) => {
  if (i === 0 || i === 1)
    return i;
  const e = i * 2, t = e - 1;
  return e < 1 ? 0.5 * Math.pow(2, 10 * t) : 0.5 * (-Math.pow(2, -10 * t) + 2);
}, Xe = (i) => {
  const e = i / 1;
  return -1 * (Math.sqrt(1 - e * i) - 1);
}, Ye = (i) => {
  const e = i - 1;
  return Math.sqrt(1 - e * e);
}, Ge = (i) => {
  const e = i * 2, t = e - 2;
  return e < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - t * t) + 1);
}, Ue = (i, e = 1.70158) => i * i * ((e + 1) * i - e), Je = (i, e = 1.70158) => {
  const t = i / 1 - 1;
  return t * t * ((e + 1) * t + e) + 1;
}, Ke = (i, e = 1.70158) => {
  const t = i * 2, n = t - 2, r = e * 1.525;
  return t < 1 ? 0.5 * t * t * ((r + 1) * t - r) : 0.5 * (n * n * ((r + 1) * n + r) + 2);
}, Ze = (i, e = 0.7) => {
  if (i === 0 || i === 1)
    return i;
  const n = i / 1 - 1, r = 1 - e, c = r / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * n) * Math.sin((n - c) * (2 * Math.PI) / r));
}, _e = (i, e = 0.7) => {
  if (i === 0 || i === 1) return i;
  const t = 1 - e, n = i * 2, r = t / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * n) * Math.sin((n - r) * (2 * Math.PI) / t) + 1;
}, et = (i, e = 0.65) => {
  if (i === 0 || i === 1) return i;
  const t = 1 - e, n = i * 2, r = n - 1, c = t / (2 * Math.PI) * Math.asin(1);
  return n < 1 ? -0.5 * (Math.pow(2, 10 * r) * Math.sin((r - c) * (2 * Math.PI) / t)) : Math.pow(2, -10 * r) * Math.sin((r - c) * (2 * Math.PI) / t) * 0.5 + 1;
}, Me = (i) => {
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
}, Pe = (i) => 1 - Me(1 - i), tt = (i) => i < 0.5 ? Pe(i * 2) * 0.5 : Me(i * 2 - 1) * 0.5 + 0.5, he = (i, e, t) => Math.max(e, Math.min(t, i)), it = (i, e, t) => i >= e - t && i <= e + t, ge = (i, e, t) => (1 - t) * i + t * e, H = (i, e, t, n, r = 1e-4) => i <= e + r && i >= e - r ? i : ge(i, e, 1 - Math.exp(-t * n)), st = (i, e, t, n, r = 1e-4) => {
  i.x = H(i.x, e.x, t, n, r), i.y = H(i.y, e.y, t, n, r), i.x = H(i.x, e.x, t, n, r), i.y = H(i.y, e.y, t, n, r), typeof i.z == "number" && typeof e.z == "number" && (i.z = H(
    i.z,
    e.z,
    t,
    n,
    r
  )), typeof i.w == "number" && typeof e.w == "number" && (i.w = H(
    i.w,
    e.w,
    t,
    n,
    r
  ));
}, me = () => (typeof performance > "u" ? Date : performance).now(), nt = (i) => new Promise((e) => setTimeout(e, i));
var z;
class ne {
  constructor() {
    h(this, z);
    o(this, z, /* @__PURE__ */ new Set());
  }
  get size() {
    return s(this, z).size;
  }
  addListener(...e) {
    for (let t = 0, n = e.length; t < n; t++)
      s(this, z).add(e[t]);
  }
  removeListener(...e) {
    for (let t = 0, n = e.length; t < n; t++)
      s(this, z).delete(e[t]);
  }
  fire(...e) {
    s(this, z).forEach((t) => {
      t(...e);
    });
  }
  clear() {
    s(this, z).clear();
  }
}
z = new WeakMap();
const X = (i) => i && i();
var R, $, Y, Q, G;
class rt extends ne {
  constructor() {
    super();
    h(this, R);
    h(this, $, !0);
    h(this, Y, 0);
    h(this, Q);
    a(this, "uniforms", Object.freeze({
      uTime: { value: 0 },
      uDeltaTime: { value: 0 },
      uDeltaMs: { value: 0 }
    }));
    h(this, G, (t) => {
      const { uTime: n, uDeltaTime: r, uDeltaMs: c } = this.uniforms;
      n.value = t, c.value = Math.abs(t - s(this, Y)), r.value = c.value * 1e-3, o(this, Y, t), super.fire({ time: t, deltaTime: r.value, deltaMs: c.value }), !s(this, Q) && o(this, R, requestAnimationFrame(s(this, G)));
    });
    a(this, "play", (t) => {
      o(this, Q, t), s(this, $) && (o(this, $, !1), o(this, Y, me()), t ? t.setAnimationLoop(s(this, G)) : o(this, R, requestAnimationFrame(s(this, G))));
    });
    a(this, "pause", (t) => {
      o(this, $, !0), t ? t.setAnimationLoop(null) : typeof s(this, R) == "number" && cancelAnimationFrame(s(this, R));
    });
    a(this, "debug", (t) => {
      t.add({ paused: this.paused }, "paused").onChange((n) => {
        n ? this.pause(s(this, Q)) : this.play(s(this, Q));
      });
    });
    a(this, "interpolate", ({
      from: t = 0,
      to: n = 1,
      onStart: r,
      onUpdate: c,
      onComplete: u
    }) => {
      const d = Math.abs(t), y = Math.abs(n), m = t < n ? 1 : -1;
      let l = d;
      const P = (M) => {
        l += M.deltaTime, l = he(l, d, y), typeof c == "function" && c({ value: l * m, ...M }), l === y && (typeof u == "function" && u({ value: l * m, ...M }), this.removeListener(P));
      }, { uDeltaMs: g, uDeltaTime: x, uTime: w } = this.uniforms;
      typeof r == "function" && r({
        value: t,
        time: w.value,
        deltaTime: x.value,
        deltaMs: g.value
      }), this.addListener(P);
    });
    a(this, "animate", ({
      steps: t = 0,
      duration: n = 400,
      delay: r = 0,
      iterations: c = 0,
      onStart: u,
      onUpdate: d,
      onComplete: y
    }) => {
      let m, l = 0, P = 0, g = 0;
      const x = ({ time: M }) => {
        const ae = Math.abs(M - l);
        if (t > 0) {
          const fe = Math.min(Math.floor(ae / n * t), t - 1);
          fe !== P && (P = fe, X(d));
        } else X(d);
        ae >= n && (this.removeListener(x), X(d), X(y), g++, (c < 0 || c === 1 / 0 || g < c) && (typeof m == "number" && clearTimeout(m), r > 0 ? m = setTimeout(() => {
          l = me(), X(u), this.addListener(x);
        }, r) : w()));
      }, w = () => {
        l = me(), X(u), this.addListener(x);
      };
      return typeof m == "number" && clearTimeout(m), r > 0 ? m = setTimeout(w, r) : w(), () => this.removeListener(x);
    });
  }
  get paused() {
    return s(this, $);
  }
}
R = new WeakMap(), $ = new WeakMap(), Y = new WeakMap(), Q = new WeakMap(), G = new WeakMap();
var f;
class ot {
  constructor({
    instance: e,
    controls: t,
    Vector3: n
  }) {
    a(this, "uniforms");
    a(this, "direction");
    a(this, "instance");
    h(this, f);
    a(this, "resize", ({ width: e, height: t }) => {
      const { instance: n } = this;
      n != null && n.aspect && (n.aspect = e / t), this.instance.updateProjectionMatrix();
    });
    a(this, "update", ({ deltaTime: e }) => {
      this.instance.getWorldDirection(this.uniforms.uDirection.value), s(this, f) && s(this, f).update(e);
    });
    a(this, "clear", () => {
      this.instance.clear(), s(this, f) && (s(this, f).disconnect(), s(this, f).dispose());
    });
    a(this, "debug", (e) => {
      s(this, f) && e.add(s(this, f), "enabled").name("camera controls");
      const { instance: t, direction: n } = this;
      e.add(t.position, "x").name("camera position x").listen(), e.add(t.position, "y").name("camera position y").listen(), e.add(t.position, "z").name("camera position z").listen(), n && (e.add(n, "x").name("camera direction x").onChange(() => {
        t.lookAt(n);
      }).listen(), e.add(n, "y").name("camera direction y").onChange(() => {
        t.lookAt(n);
      }).listen(), e.add(n, "z").name("camera direction z").onChange(() => {
        t.lookAt(n);
      }).listen());
    });
    this.uniforms = Object.freeze({
      uDirection: { value: new n() }
    }), this.instance = e, o(this, f, t);
  }
  get controls() {
    if (!s(this, f)) throw new Error("Controls not initialized");
    return s(this, f);
  }
}
f = new WeakMap();
var re, U, J, K, B, E, S, oe, Z, _, v, V, q, j, ee, ce, ue, le;
class at {
  constructor({
    Plane: e,
    Raycaster: t,
    Vector2: n,
    Vector3: r,
    camera: c
  }) {
    a(this, "uniforms");
    h(this, re);
    h(this, U);
    h(this, J);
    h(this, K);
    h(this, B);
    h(this, E);
    h(this, S);
    h(this, oe, 20);
    h(this, Z);
    h(this, _);
    h(this, v);
    h(this, V, new ne());
    h(this, q, new ne());
    h(this, j, new ne());
    h(this, ee, () => {
      if (!s(this, v)) return;
      const e = () => `
			Pointer position x ${this.uniforms.uPointerPosition.value.x.toFixed(2)} y ${this.uniforms.uPointerPosition.value.y.toFixed(2)}
			Pointer world position x ${this.uniforms.uPointerWorldPosition.value.x.toFixed(2)} y ${this.uniforms.uPointerWorldPosition.value.y.toFixed(2)} z ${this.uniforms.uPointerWorldPosition.value.z.toFixed(2)}
			Pointer velocity x ${this.uniforms.uPointerPositionVelocity.value.x.toFixed(2)} y ${this.uniforms.uPointerPositionVelocity.value.y.toFixed(2)}
			Pointer press ${this.uniforms.uPointerPress.value}
			Scroll x ${this.uniforms.uPointerScroll.value.x.toFixed(2)} y ${this.uniforms.uPointerScroll.value.y.toFixed(2)}
			Scroll velocity x ${this.uniforms.uPointerScrollVelocity.value.x.toFixed(2)} y ${this.uniforms.uPointerScrollVelocity.value.y.toFixed(2)}
		`;
      s(this, v).innerText = e(), typeof s(this, S) == "number" && clearTimeout(s(this, S)), o(this, S, setTimeout(() => {
        s(this, v) && (s(this, v).innerText = e());
      }, s(this, oe)));
    });
    h(this, ce, (e) => {
      const t = e, n = t.target;
      let r = 0, c = 0;
      if (n instanceof HTMLCanvasElement)
        r = n.width, c = n.height;
      else if (n instanceof HTMLElement) {
        const { width: d, height: y } = n.getBoundingClientRect();
        r = d, c = y;
      } else
        r = window.innerWidth, c = window.innerHeight;
      const { uPointerPosition: u } = this.uniforms;
      u.value.x = t.clientX / r * 2 - 1, u.value.y = -(t.clientY / c) * 2 + 1;
    });
    h(this, ue, (e) => {
      const t = e, { uPointerPositionVelocity: n } = this.uniforms, r = t.pageX, c = t.pageY, u = s(this, B).x, d = s(this, B).y;
      n.value.x = Math.abs(r - u), n.value.y = Math.abs(c - d), s(this, B).set(r, c), typeof s(this, E) == "number" && clearTimeout(s(this, E)), o(this, E, setTimeout(() => {
        n.value.set(0, 0);
      }, s(this, oe)));
    });
    h(this, le, () => {
      const { uPointerWorldPosition: e, uPointerPosition: t } = this.uniforms;
      s(this, Z).getWorldDirection(s(this, _)), s(this, J).setFromCamera(t.value, s(this, Z)), s(this, U).setFromNormalAndCoplanarPoint(s(this, _), s(this, re)), s(this, J).ray.intersectPlane(s(this, U), e.value);
    });
    a(this, "onMove", (e) => {
      s(this, ce).call(this, e), s(this, le).call(this), s(this, ue).call(this, e), s(this, ee).call(this), s(this, V).fire();
    });
    a(this, "onScroll", (e) => {
      const { uPointerScroll: t, uPointerScrollVelocity: n } = this.uniforms;
      s(this, K).copy(t.value);
      const r = window.scrollX / (document.body.scrollWidth - window.innerWidth), c = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      t.value.x = r, t.value.y = c, e.type === "scroll" ? n.value.subVectors(t.value, s(this, K)) : n.value.set(0, 0), s(this, ee).call(this), s(this, j).fire();
    });
    a(this, "onPress", (e) => {
      const t = e, { uPointerPress: n } = this.uniforms;
      t.pointerType === "mouse" ? n.value = t.pressure ? 1 : 0 : n.value = t.pressure, s(this, ee).call(this), s(this, q).fire();
    });
    a(this, "addMoveListener", (...e) => (s(this, V).addListener(...e), () => s(this, V).removeListener(...e)));
    a(this, "addPressListener", (...e) => (s(this, q).addListener(...e), () => s(this, q).removeListener(...e)));
    a(this, "addScrollListener", (...e) => (s(this, j).addListener(...e), () => s(this, j).removeListener(...e)));
    // init = (element: HTMLElement | Document | Window) => {
    // 	element.addEventListener('pointermove', this.#updateMouseMove, false);
    // 	element.addEventListener('pointerout', this.#updateMouseMove, false);
    // 	element.addEventListener('pointerdown', this.#updateMousePress, false);
    // 	element.addEventListener('pointerup', this.#updateMousePress, false);
    // 	window.addEventListener('scroll', this.#updateScroll, false);
    // 	window.addEventListener('scrollend', this.#updateScroll, false);
    // return ()=>{
    // 	// element.removeEventListener('pointermove', this.#updateMouseMove, false);
    // 	// element.removeEventListener('pointerout', this.#updateMouseMove, false);
    // 	// element.removeEventListener('pointerdown', this.#updateMousePress, false);
    // 	// element.removeEventListener('pointerup', this.#updateMousePress, false);
    // 	// window.removeEventListener('scroll', this.#updateScroll, false);
    // 	// window.removeEventListener('scrollend', this.#updateScroll, false);
    // }
    // };
    a(this, "clear", () => {
      var e;
      s(this, V).clear(), s(this, q).clear(), s(this, j).clear(), s(this, E) && clearTimeout(s(this, E)), o(this, E, void 0), s(this, S) && clearTimeout(s(this, S)), o(this, S, void 0), (e = s(this, v)) == null || e.remove(), o(this, v, void 0);
    });
    a(this, "debug", (e) => {
      o(this, v, document.createElement("div")), s(this, v).style.padding = "4px", e.domElement.appendChild(s(this, v));
    });
    this.uniforms = Object.freeze({
      uPointerScroll: { value: new n() },
      uPointerScrollVelocity: { value: new n() },
      uPointerPress: { value: 0 },
      uPointerPosition: { value: new n() },
      uPointerWorldPosition: { value: new r() },
      uPointerPositionVelocity: { value: new n() }
    }), o(this, re, new r()), o(this, U, new e()), o(this, J, new t()), o(this, K, new n()), o(this, B, new n()), o(this, Z, c), o(this, _, new r());
  }
}
re = new WeakMap(), U = new WeakMap(), J = new WeakMap(), K = new WeakMap(), B = new WeakMap(), E = new WeakMap(), S = new WeakMap(), oe = new WeakMap(), Z = new WeakMap(), _ = new WeakMap(), v = new WeakMap(), V = new WeakMap(), q = new WeakMap(), j = new WeakMap(), ee = new WeakMap(), ce = new WeakMap(), ue = new WeakMap(), le = new WeakMap();
const Te = function(i, e, t, n) {
  const r = function(c, u, d) {
    var l, P;
    const y = (l = c.getShaderInfoLog(u)) == null ? void 0 : l.trim(), m = "Errors in " + d + `:

` + y;
    if (y !== "") {
      const g = (P = c.getShaderSource(u)) == null ? void 0 : P.replace(/\t/g, "  "), x = g == null ? void 0 : g.split(`
`);
      let w = "", M = 1;
      if (!x) return;
      for (const ae of x)
        w += (M < 10 ? " " : "") + M + ":		" + ae + `
`, M++;
      console.error(m + `
` + w);
    }
  };
  r(i, t, "Vertex Shader"), r(i, n, "Fragment Shader");
};
class ht {
  constructor({
    instance: e,
    Vector2: t,
    EffectComposer: n
  }) {
    a(this, "uniforms");
    a(this, "instance");
    a(this, "composer");
    a(this, "addEffect", (...e) => {
      e.forEach((t) => {
        if (!this.composer || !this.instance) return console.warn("EffectComposer not initialized");
        this.composer.addPass(t);
      });
    });
    a(this, "removeEffect", (...e) => {
      e.forEach((t) => {
        var n;
        t.dispose(), (n = this.composer) == null || n.removePass(t);
      });
    });
    a(this, "update", (e, t, n = 0.16) => {
      this.instance && (this.composer ? this.composer.render(n) : this.instance.render(e, t));
    });
    a(this, "resize", (e) => {
      const { width: t, height: n, pixelRatio: r } = e;
      this.instance && (this.instance.setSize(t, n, !1), this.instance.setPixelRatio(r), this.uniforms.uResolution.value.set(t, n), this.composer && this.composer.setSize(t, n));
    });
    a(this, "clear", () => {
      this.instance && this.instance.dispose(), this.composer && this.removeEffect(...this.composer.passes);
    });
    a(this, "debug", (e) => {
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
var I, k, D, te, F, A, ie;
class ct extends ne {
  constructor(t) {
    super();
    h(this, I, 7680);
    // 4k
    h(this, k, 1280);
    h(this, D, 720);
    h(this, te, 1);
    h(this, F, 1);
    h(this, A);
    a(this, "fire", () => {
      let t = s(this, k), n = s(this, D);
      if (s(this, k) > s(this, I) || s(this, D) > s(this, I))
        if (t > n) {
          const c = n / t;
          t = he(t, 0, s(this, I)), n = t * c;
        } else {
          const c = t / n;
          n = he(n, 0, s(this, I)), t = n * c;
        }
      t *= s(this, F), n *= s(this, F);
      const r = s(this, te);
      super.fire({ width: t, height: n, pixelRatio: r });
    });
    h(this, ie, new ResizeObserver((t) => {
      const n = t[0].contentBoxSize[0], { inlineSize: r, blockSize: c } = n;
      s(this, k) === r && s(this, D) === c || (o(this, k, r), o(this, D, c), this.fire());
    }));
    a(this, "debug", (t) => {
      t.add({ maxSize: this.maxSize }, "maxSize", 0, 7680).name("max resolution").onChange((n) => {
        this.maxSize = n;
      }), t.add({ resolutionFactor: this.resolutionFactor }, "resolutionFactor", 0, 1).name("resolution factor").onChange((n) => {
        this.resolutionFactor = n;
      });
    });
    o(this, te, Math.min(window.devicePixelRatio, 2)), o(this, A, t), s(this, ie).observe(s(this, A)), this.fire();
  }
  get width() {
    return s(this, k) * s(this, F);
  }
  get height() {
    return s(this, D) * s(this, F);
  }
  get element() {
    return s(this, A);
  }
  get pixelRatio() {
    return s(this, te);
  }
  get maxSize() {
    return s(this, I);
  }
  get resolutionFactor() {
    return s(this, F);
  }
  set resolutionFactor(t) {
    o(this, F, he(t, 0.01, 1)), this.fire();
  }
  set maxSize(t) {
    o(this, I, t < 32 ? 32 : t), this.fire();
  }
  clear() {
    super.clear(), s(this, A) && s(this, ie).unobserve(s(this, A)), s(this, ie).disconnect();
  }
}
I = new WeakMap(), k = new WeakMap(), D = new WeakMap(), te = new WeakMap(), F = new WeakMap(), A = new WeakMap(), ie = new WeakMap();
const C = class C {
  constructor({ instance: e }) {
    a(this, "instance");
    a(this, "clear", () => {
      this.instance.children.forEach((e) => C.disposeNode(e)), this.instance.clear();
    });
    this.instance = e;
  }
};
a(C, "disposeMaterial", (e) => {
  Object.values(e).forEach((t) => {
    typeof (t == null ? void 0 : t.dispose) == "function" && t.dispose();
  });
}), a(C, "disposeNode", (e) => {
  if (!e) return;
  const t = e;
  t != null && t.geometry && t.geometry.dispose(), t != null && t.material && (Array.isArray(t.material) ? t.material.forEach((n) => {
    C.disposeMaterial(n), n.dispose();
  }) : (C.disposeMaterial(t.material), t.material.dispose())), t.children.forEach((n) => C.disposeNode(n));
});
let we = C;
var T, O, se, p, N, L;
class ut {
  constructor(e, t) {
    h(this, T, {
      mass: 0.5,
      tension: 0.5,
      friction: 0.5,
      threshold: 0.1,
      onUpdate: void 0,
      onComplete: void 0
    });
    h(this, O, 0);
    h(this, se, 0);
    h(this, p, 0);
    h(this, N, 0);
    h(this, L, !1);
    a(this, "from", (e) => (o(this, se, e), o(this, p, e), this));
    a(this, "to", (e, t) => (o(this, O, e), Math.abs(s(this, N)) < s(this, T).threshold && Math.abs(s(this, O) - s(this, p)) < s(this, T).threshold ? this : (t && o(this, T, { ...s(this, T), ...t }), o(this, L, !1), this)));
    a(this, "update", (e = 0.016) => {
      if (s(this, L)) return;
      const { mass: t, tension: n, friction: r, threshold: c, onComplete: u, onUpdate: d } = s(this, T), y = Math.min(e, 0.06), m = s(this, N) ?? 0, l = typeof s(this, p) == "number" ? s(this, p) : s(this, se), P = -1 * n * (l - s(this, O)), g = -1 * m * r, x = (P + g) / t, w = m + x * y, M = l + w * y;
      o(this, L, Math.abs(w) < c && Math.abs(M - s(this, O)) < c), o(this, p, s(this, L) ? s(this, O) : M), o(this, N, w), s(this, L) ? (o(this, p, s(this, O)), u && u(s(this, p))) : d && d(s(this, p));
    });
    o(this, p, e || 0), o(this, se, e || 0), o(this, T, { ...s(this, T), ...t });
  }
  get value() {
    return s(this, p);
  }
  get velocity() {
    return s(this, N);
  }
  get finished() {
    return s(this, L);
  }
}
T = new WeakMap(), O = new WeakMap(), se = new WeakMap(), p = new WeakMap(), N = new WeakMap(), L = new WeakMap();
var W, b, de;
class lt {
  constructor() {
    h(this, W, []);
    h(this, b, !1);
    h(this, de, async () => {
      if (!s(this, b)) {
        for (o(this, b, !0); s(this, W).length > 0 && s(this, b); ) {
          const e = s(this, W).shift();
          if (e)
            try {
              await e();
            } catch (t) {
              console.error("Timeline error:", t);
            }
        }
        o(this, b, !1);
      }
    });
    a(this, "add", (...e) => {
      s(this, W).push(...e);
    });
    a(this, "play", async () => {
      o(this, b, !1), await s(this, de).call(this);
    });
    a(this, "stop", () => {
      o(this, b, !1);
    });
    a(this, "clear", () => {
      this.stop(), o(this, W, []);
    });
  }
  get isPlaying() {
    return s(this, b);
  }
  get size() {
    return s(this, W).length;
  }
}
W = new WeakMap(), b = new WeakMap(), de = new WeakMap();
export {
  rt as Animator,
  ot as CameraWrapper,
  ne as MonoEventEmitter,
  at as PointerTracker,
  ht as RendererWrapper,
  ct as Resizer,
  we as SceneWrapper,
  ut as Spring,
  lt as TaskQueue,
  he as clamp,
  ze as clickout,
  Ee as createDebugTexture,
  Se as createEmpytTexture,
  H as dampThreshold,
  st as dampThresholdVec,
  Ue as easeInBack,
  Pe as easeInBounce,
  Xe as easeInCirc,
  De as easeInCubic,
  Ze as easeInElastic,
  je as easeInExpo,
  Ke as easeInOutBack,
  tt as easeInOutBounce,
  Ge as easeInOutCirc,
  We as easeInOutCubic,
  et as easeInOutElastic,
  He as easeInOutExpo,
  ke as easeInOutQuad,
  Qe as easeInOutQuart,
  qe as easeInOutQuint,
  Oe as easeInOutSine,
  Le as easeInQuad,
  Re as easeInQuart,
  Be as easeInQuint,
  Ie as easeInSine,
  Je as easeOutBack,
  Me as easeOutBounce,
  Ye as easeOutCirc,
  Ae as easeOutCubic,
  _e as easeOutElastic,
  Ne as easeOutExpo,
  Ce as easeOutQuad,
  $e as easeOutQuart,
  Ve as easeOutQuint,
  Fe as easeOutSine,
  it as isBetween,
  ge as lerp,
  me as now,
  nt as wait
};
