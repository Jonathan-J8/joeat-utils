var Me = Object.defineProperty;
var pe = (i) => {
  throw TypeError(i);
};
var xe = (i, e, t) => e in i ? Me(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var a = (i, e, t) => xe(i, typeof e != "symbol" ? e + "" : e, t), ve = (i, e, t) => e.has(i) || pe("Cannot " + t);
var s = (i, e, t) => (ve(i, e, "read from private field"), t ? t.call(i) : e.get(i)), c = (i, e, t) => e.has(i) ? pe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), o = (i, e, t, n) => (ve(i, e, "write to private field"), n ? n.call(i, t) : e.set(i, t), t);
const ze = (i) => {
  const e = (t) => {
    const n = t.target;
    i && !i.contains(n) && !t.defaultPrevented && i.dispatchEvent(new CustomEvent("clickout", { detail: { node: i } }));
  };
  return window.addEventListener("click", e), () => window.removeEventListener("click", e);
}, Se = (i) => {
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
}, Ee = (i) => new i(new Uint8Array(1), 1, 1), Ie = (i) => -1 * Math.cos(i * (Math.PI / 2)) + 1, Fe = (i) => Math.sin(i * (Math.PI / 2)), Oe = (i) => -0.5 * (Math.cos(Math.PI * i) - 1), Le = (i) => i * i, Ce = (i) => i * (2 - i), De = (i) => i < 0.5 ? 2 * i * i : -1 + (4 - 2 * i) * i, We = (i) => i * i * i, ke = (i) => {
  const e = i - 1;
  return e * e * e + 1;
}, Re = (i) => i < 0.5 ? 4 * i * i * i : (i - 1) * (2 * i - 2) * (2 * i - 2) + 1, Qe = (i) => i * i * i * i, Ae = (i) => {
  const e = i - 1;
  return 1 - e * e * e * e;
}, $e = (i) => {
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
  const n = i / 1 - 1, r = 1 - e, h = r / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * n) * Math.sin((n - h) * (2 * Math.PI) / r));
}, _e = (i, e = 0.7) => {
  if (i === 0 || i === 1) return i;
  const t = 1 - e, n = i * 2, r = t / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * n) * Math.sin((n - r) * (2 * Math.PI) / t) + 1;
}, et = (i, e = 0.65) => {
  if (i === 0 || i === 1) return i;
  const t = 1 - e, n = i * 2, r = n - 1, h = t / (2 * Math.PI) * Math.asin(1);
  return n < 1 ? -0.5 * (Math.pow(2, 10 * r) * Math.sin((r - h) * (2 * Math.PI) / t)) : Math.pow(2, -10 * r) * Math.sin((r - h) * (2 * Math.PI) / t) * 0.5 + 1;
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
}, Pe = (i) => 1 - we(1 - i), tt = (i) => i < 0.5 ? Pe(i * 2) * 0.5 : we(i * 2 - 1) * 0.5 + 0.5, ce = (i, e, t) => Math.max(e, Math.min(t, i)), it = (i, e, t) => i >= e - t && i <= e + t, ge = (i, e, t) => (1 - t) * i + t * e, H = (i, e, t, n, r = 1e-4) => i <= e + r && i >= e - r ? i : ge(i, e, 1 - Math.exp(-t * n)), st = (i, e, t, n, r = 1e-4) => {
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
    c(this, z);
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
var Q, A, Y, $, G;
class rt extends ne {
  constructor() {
    super();
    c(this, Q);
    c(this, A, !0);
    c(this, Y, 0);
    c(this, $);
    a(this, "uniforms", Object.freeze({
      uTime: { value: 0 },
      uDeltaTime: { value: 0 },
      uDeltaMs: { value: 0 }
    }));
    c(this, G, (t) => {
      const { uTime: n, uDeltaTime: r, uDeltaMs: h } = this.uniforms;
      n.value = t, h.value = Math.abs(t - s(this, Y)), r.value = h.value * 1e-3, o(this, Y, t), super.fire({ time: t, deltaTime: r.value, deltaMs: h.value }), !s(this, $) && o(this, Q, requestAnimationFrame(s(this, G)));
    });
    a(this, "play", (t) => {
      o(this, $, t), s(this, A) && (o(this, A, !1), o(this, Y, me()), t ? t.setAnimationLoop(s(this, G)) : o(this, Q, requestAnimationFrame(s(this, G))));
    });
    a(this, "pause", (t) => {
      o(this, A, !0), t ? t.setAnimationLoop(null) : typeof s(this, Q) == "number" && cancelAnimationFrame(s(this, Q));
    });
    a(this, "debug", (t) => {
      t.add({ paused: this.paused }, "paused").onChange((n) => {
        n ? this.pause(s(this, $)) : this.play(s(this, $));
      });
    });
    a(this, "interpolate", ({
      from: t = 0,
      to: n = 1,
      onStart: r,
      onUpdate: h,
      onComplete: u
    }) => {
      const d = Math.abs(t), v = Math.abs(n), f = t < n ? 1 : -1;
      let l = d;
      const P = (w) => {
        l += w.deltaTime, l = ce(l, d, v), typeof h == "function" && h({ value: l * f, ...w }), l === v && (typeof u == "function" && u({ value: l * f, ...w }), this.removeListener(P));
      }, { uDeltaMs: g, uDeltaTime: x, uTime: y } = this.uniforms;
      typeof r == "function" && r({
        value: t,
        time: y.value,
        deltaTime: x.value,
        deltaMs: g.value
      }), this.addListener(P);
    });
    a(this, "animate", ({
      steps: t = 0,
      duration: n = 400,
      delay: r = 0,
      iterations: h = 0,
      onStart: u,
      onUpdate: d,
      onComplete: v
    }) => {
      let f, l = 0, P = 0, g = 0;
      const x = ({ time: w }) => {
        const ae = Math.abs(w - l);
        if (t > 0) {
          const fe = Math.min(Math.floor(ae / n * t), t - 1);
          fe !== P && (P = fe, X(d));
        } else X(d);
        ae >= n && (this.removeListener(x), X(d), X(v), g++, (h < 0 || h === 1 / 0 || g < h) && (typeof f == "number" && clearTimeout(f), r > 0 ? f = setTimeout(() => {
          l = me(), X(u), this.addListener(x);
        }, r) : y()));
      }, y = () => {
        l = me(), X(u), this.addListener(x);
      };
      return typeof f == "number" && clearTimeout(f), r > 0 ? f = setTimeout(y, r) : y(), () => this.removeListener(x);
    });
  }
  get paused() {
    return s(this, A);
  }
}
Q = new WeakMap(), A = new WeakMap(), Y = new WeakMap(), $ = new WeakMap(), G = new WeakMap();
var m;
class ot {
  constructor({
    instance: e,
    controls: t,
    Vector3: n,
    Quaternion: r
  }) {
    a(this, "uniforms");
    a(this, "direction");
    a(this, "instance");
    c(this, m);
    a(this, "resize", ({ width: e, height: t }) => {
      const { instance: n } = this;
      n != null && n.aspect && (n.aspect = e / t), this.instance.updateProjectionMatrix();
    });
    a(this, "update", ({ deltaTime: e }) => {
      this.instance.getWorldDirection(this.uniforms.cameraDirection.value), this.instance.getWorldScale(this.uniforms.cameraScale.value), this.instance.getWorldQuaternion(this.uniforms.cameraQuaternion.value), s(this, m) && s(this, m).update(e);
    });
    a(this, "clear", () => {
      this.instance.clear(), s(this, m) && (s(this, m).disconnect(), s(this, m).dispose());
    });
    a(this, "debug", (e) => {
      s(this, m) && e.add({ enabled: s(this, m).enabled }, "enabled").name("camera controls").onChange((n) => {
        s(this, m) && (s(this, m).enabled = n);
      });
      const { instance: t } = this;
      e.add(t.position, "x").name("camera position x").listen(), e.add(t.position, "y").name("camera position y").listen(), e.add(t.position, "z").name("camera position z").listen(), e.add(this.uniforms.cameraDirection.value, "x").name("camera direction x").disable().listen(), e.add(this.uniforms.cameraDirection.value, "y").name("camera direction y").disable().listen(), e.add(this.uniforms.cameraDirection.value, "z").name("camera direction z").disable().listen();
    });
    this.uniforms = Object.freeze({
      cameraDirection: { value: new n() },
      cameraScale: { value: new n() },
      cameraQuaternion: { value: new r() }
    }), this.instance = e, t && o(this, m, t);
  }
  get controls() {
    if (!s(this, m)) throw new Error("Controls not initialized");
    return s(this, m);
  }
}
m = new WeakMap();
var re, U, J, K, B, S, E, oe, Z, _, M, V, q, j, ee, he, ue, le;
class at {
  constructor({
    Plane: e,
    Raycaster: t,
    Vector2: n,
    Vector3: r,
    camera: h
  }) {
    a(this, "uniforms");
    c(this, re);
    c(this, U);
    c(this, J);
    c(this, K);
    c(this, B);
    c(this, S);
    c(this, E);
    c(this, oe, 20);
    c(this, Z);
    c(this, _);
    c(this, M);
    c(this, V, new ne());
    c(this, q, new ne());
    c(this, j, new ne());
    c(this, ee, () => {
      if (!s(this, M)) return;
      const e = () => `
			Pointer position x ${this.uniforms.uPointerPosition.value.x.toFixed(2)} y ${this.uniforms.uPointerPosition.value.y.toFixed(2)}
			Pointer world position x ${this.uniforms.uPointerWorldPosition.value.x.toFixed(2)} y ${this.uniforms.uPointerWorldPosition.value.y.toFixed(2)} z ${this.uniforms.uPointerWorldPosition.value.z.toFixed(2)}
			Pointer velocity x ${this.uniforms.uPointerPositionVelocity.value.x.toFixed(2)} y ${this.uniforms.uPointerPositionVelocity.value.y.toFixed(2)}
			Pointer press ${this.uniforms.uPointerPress.value}
			Scroll x ${this.uniforms.uPointerScroll.value.x.toFixed(2)} y ${this.uniforms.uPointerScroll.value.y.toFixed(2)}
			Scroll velocity x ${this.uniforms.uPointerScrollVelocity.value.x.toFixed(2)} y ${this.uniforms.uPointerScrollVelocity.value.y.toFixed(2)}
		`;
      s(this, M).innerText = e(), typeof s(this, E) == "number" && clearTimeout(s(this, E)), o(this, E, setTimeout(() => {
        s(this, M) && (s(this, M).innerText = e());
      }, s(this, oe)));
    });
    c(this, he, (e) => {
      const t = e, n = t.target;
      let r = 0, h = 0;
      if (n instanceof HTMLCanvasElement)
        r = n.width, h = n.height;
      else if (n instanceof HTMLElement) {
        const { width: d, height: v } = n.getBoundingClientRect();
        r = d, h = v;
      } else
        r = window.innerWidth, h = window.innerHeight;
      const { uPointerPosition: u } = this.uniforms;
      u.value.x = t.clientX / r * 2 - 1, u.value.y = -(t.clientY / h) * 2 + 1;
    });
    c(this, ue, (e) => {
      const t = e, { uPointerPositionVelocity: n } = this.uniforms, r = t.pageX, h = t.pageY, u = s(this, B).x, d = s(this, B).y;
      n.value.x = Math.abs(r - u), n.value.y = Math.abs(h - d), s(this, B).set(r, h), typeof s(this, S) == "number" && clearTimeout(s(this, S)), o(this, S, setTimeout(() => {
        n.value.set(0, 0);
      }, s(this, oe)));
    });
    c(this, le, () => {
      const { uPointerWorldPosition: e, uPointerPosition: t } = this.uniforms;
      s(this, Z).getWorldDirection(s(this, _)), s(this, J).setFromCamera(t.value, s(this, Z)), s(this, U).setFromNormalAndCoplanarPoint(s(this, _), s(this, re)), s(this, J).ray.intersectPlane(s(this, U), e.value);
    });
    a(this, "onMove", (e) => {
      s(this, he).call(this, e), s(this, le).call(this), s(this, ue).call(this, e), s(this, ee).call(this), s(this, V).fire();
    });
    a(this, "onScroll", (e) => {
      const { uPointerScroll: t, uPointerScrollVelocity: n } = this.uniforms;
      s(this, K).copy(t.value);
      const r = window.scrollX / (document.body.scrollWidth - window.innerWidth), h = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      t.value.x = r, t.value.y = h, e.type === "scroll" ? n.value.subVectors(t.value, s(this, K)) : n.value.set(0, 0), s(this, ee).call(this), s(this, j).fire();
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
      s(this, V).clear(), s(this, q).clear(), s(this, j).clear(), s(this, S) && clearTimeout(s(this, S)), o(this, S, void 0), s(this, E) && clearTimeout(s(this, E)), o(this, E, void 0), (e = s(this, M)) == null || e.remove(), o(this, M, void 0);
    });
    a(this, "debug", (e) => {
      o(this, M, document.createElement("div")), s(this, M).style.padding = "4px", e.domElement.appendChild(s(this, M));
    });
    this.uniforms = Object.freeze({
      uPointerScroll: { value: new n() },
      uPointerScrollVelocity: { value: new n() },
      uPointerPress: { value: 0 },
      uPointerPosition: { value: new n() },
      uPointerWorldPosition: { value: new r() },
      uPointerPositionVelocity: { value: new n() }
    }), o(this, re, new r()), o(this, U, new e()), o(this, J, new t()), o(this, K, new n()), o(this, B, new n()), o(this, Z, h), o(this, _, new r());
  }
}
re = new WeakMap(), U = new WeakMap(), J = new WeakMap(), K = new WeakMap(), B = new WeakMap(), S = new WeakMap(), E = new WeakMap(), oe = new WeakMap(), Z = new WeakMap(), _ = new WeakMap(), M = new WeakMap(), V = new WeakMap(), q = new WeakMap(), j = new WeakMap(), ee = new WeakMap(), he = new WeakMap(), ue = new WeakMap(), le = new WeakMap();
const Te = function(i, e, t, n) {
  const r = function(h, u, d) {
    var l, P;
    const v = (l = h.getShaderInfoLog(u)) == null ? void 0 : l.trim(), f = "Errors in " + d + `:

` + v;
    if (v !== "") {
      const g = (P = h.getShaderSource(u)) == null ? void 0 : P.replace(/\t/g, "  "), x = g == null ? void 0 : g.split(`
`);
      let y = "", w = 1;
      if (!x) return;
      for (const ae of x)
        y += (w < 10 ? " " : "") + w + ":		" + ae + `
`, w++;
      console.error(f + `
` + y);
    }
  };
  r(i, t, "Vertex Shader"), r(i, n, "Fragment Shader");
};
class ct {
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
    a(this, "update", (e) => {
      this.instance && (this.composer ? this.composer.render(e.deltaTime || 0.016) : this.instance.render(e.scene, e.camera));
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
var I, D, W, te, F, k, ie;
class ht extends ne {
  constructor(t) {
    super();
    c(this, I, 7680);
    // 4k
    c(this, D, 1280);
    c(this, W, 720);
    c(this, te, 1);
    c(this, F, 1);
    c(this, k);
    a(this, "fire", () => {
      let t = s(this, D), n = s(this, W);
      if (s(this, D) > s(this, I) || s(this, W) > s(this, I))
        if (t > n) {
          const h = n / t;
          t = ce(t, 0, s(this, I)), n = t * h;
        } else {
          const h = t / n;
          n = ce(n, 0, s(this, I)), t = n * h;
        }
      t *= s(this, F), n *= s(this, F);
      const r = s(this, te);
      super.fire({ width: t, height: n, pixelRatio: r });
    });
    c(this, ie, new ResizeObserver((t) => {
      const n = t[0].contentBoxSize[0], { inlineSize: r, blockSize: h } = n;
      s(this, D) === r && s(this, W) === h || (o(this, D, r), o(this, W, h), this.fire());
    }));
    a(this, "debug", (t) => {
      t.add({ maxSize: this.maxSize }, "maxSize", 0, 7680).name("max resolution").onChange((n) => {
        this.maxSize = n;
      }), t.add({ resolutionFactor: this.resolutionFactor }, "resolutionFactor", 0, 1).name("resolution factor").onChange((n) => {
        this.resolutionFactor = n;
      });
    });
    o(this, te, Math.min(window.devicePixelRatio, 2)), o(this, k, t), s(this, ie).observe(s(this, k)), this.fire();
  }
  get width() {
    return s(this, D) * s(this, F);
  }
  get height() {
    return s(this, W) * s(this, F);
  }
  get element() {
    return s(this, k);
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
    o(this, F, ce(t, 0.01, 1)), this.fire();
  }
  set maxSize(t) {
    o(this, I, t < 32 ? 32 : t), this.fire();
  }
  clear() {
    super.clear(), s(this, k) && s(this, ie).unobserve(s(this, k)), s(this, ie).disconnect();
  }
}
I = new WeakMap(), D = new WeakMap(), W = new WeakMap(), te = new WeakMap(), F = new WeakMap(), k = new WeakMap(), ie = new WeakMap();
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
let ye = C;
var T, O, se, p, N, L;
class ut {
  constructor(e, t) {
    c(this, T, {
      mass: 0.5,
      tension: 0.5,
      friction: 0.5,
      threshold: 0.1,
      onUpdate: void 0,
      onComplete: void 0
    });
    c(this, O, 0);
    c(this, se, 0);
    c(this, p, 0);
    c(this, N, 0);
    c(this, L, !1);
    a(this, "from", (e) => (o(this, se, e), o(this, p, e), this));
    a(this, "to", (e, t) => (o(this, O, e), Math.abs(s(this, N)) < s(this, T).threshold && Math.abs(s(this, O) - s(this, p)) < s(this, T).threshold ? this : (t && o(this, T, { ...s(this, T), ...t }), o(this, L, !1), this)));
    a(this, "update", (e = 0.016) => {
      if (s(this, L)) return;
      const { mass: t, tension: n, friction: r, threshold: h, onComplete: u, onUpdate: d } = s(this, T), v = Math.min(e, 0.06), f = s(this, N) ?? 0, l = typeof s(this, p) == "number" ? s(this, p) : s(this, se), P = -1 * n * (l - s(this, O)), g = -1 * f * r, x = (P + g) / t, y = f + x * v, w = l + y * v;
      o(this, L, Math.abs(y) < h && Math.abs(w - s(this, O)) < h), o(this, p, s(this, L) ? s(this, O) : w), o(this, N, y), s(this, L) ? (o(this, p, s(this, O)), u && u(s(this, p))) : d && d(s(this, p));
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
var R, b, de;
class lt {
  constructor() {
    c(this, R, []);
    c(this, b, !1);
    c(this, de, async () => {
      if (!s(this, b)) {
        for (o(this, b, !0); s(this, R).length > 0 && s(this, b); ) {
          const e = s(this, R).shift();
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
      s(this, R).push(...e);
    });
    a(this, "play", async () => {
      o(this, b, !1), await s(this, de).call(this);
    });
    a(this, "stop", () => {
      o(this, b, !1);
    });
    a(this, "clear", () => {
      this.stop(), o(this, R, []);
    });
  }
  get isPlaying() {
    return s(this, b);
  }
  get size() {
    return s(this, R).length;
  }
}
R = new WeakMap(), b = new WeakMap(), de = new WeakMap();
export {
  rt as Animator,
  ot as CameraWrapper,
  ne as MonoEventEmitter,
  at as PointerTracker,
  ct as RendererWrapper,
  ht as Resizer,
  ye as SceneWrapper,
  ut as Spring,
  lt as TaskQueue,
  ce as clamp,
  ze as clickout,
  Se as createDebugTexture,
  Ee as createEmpytTexture,
  H as dampThreshold,
  st as dampThresholdVec,
  Ue as easeInBack,
  Pe as easeInBounce,
  Xe as easeInCirc,
  We as easeInCubic,
  Ze as easeInElastic,
  je as easeInExpo,
  Ke as easeInOutBack,
  tt as easeInOutBounce,
  Ge as easeInOutCirc,
  Re as easeInOutCubic,
  et as easeInOutElastic,
  He as easeInOutExpo,
  De as easeInOutQuad,
  $e as easeInOutQuart,
  qe as easeInOutQuint,
  Oe as easeInOutSine,
  Le as easeInQuad,
  Qe as easeInQuart,
  Be as easeInQuint,
  Ie as easeInSine,
  Je as easeOutBack,
  we as easeOutBounce,
  Ye as easeOutCirc,
  ke as easeOutCubic,
  _e as easeOutElastic,
  Ne as easeOutExpo,
  Ce as easeOutQuad,
  Ae as easeOutQuart,
  Ve as easeOutQuint,
  Fe as easeOutSine,
  it as isBetween,
  ge as lerp,
  me as now,
  nt as wait
};
