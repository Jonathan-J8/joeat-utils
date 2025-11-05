var Pe = Object.defineProperty;
var fe = (i) => {
  throw TypeError(i);
};
var Me = (i, e, t) => e in i ? Pe(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var a = (i, e, t) => Me(i, typeof e != "symbol" ? e + "" : e, t), ge = (i, e, t) => e.has(i) || fe("Cannot " + t);
var s = (i, e, t) => (ge(i, e, "read from private field"), t ? t.call(i) : e.get(i)), h = (i, e, t) => e.has(i) ? fe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), o = (i, e, t, n) => (ge(i, e, "write to private field"), n ? n.call(i, t) : e.set(i, t), t);
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
}, Ee = (i) => new i(new Uint8Array(1), 1, 1), Ce = (i) => -1 * Math.cos(i * (Math.PI / 2)) + 1, Ie = (i) => Math.sin(i * (Math.PI / 2)), Fe = (i) => -0.5 * (Math.cos(Math.PI * i) - 1), Oe = (i) => i * i, Le = (i) => i * (2 - i), De = (i) => i < 0.5 ? 2 * i * i : -1 + (4 - 2 * i) * i, ke = (i) => i * i * i, We = (i) => {
  const e = i - 1;
  return e * e * e + 1;
}, Re = (i) => i < 0.5 ? 4 * i * i * i : (i - 1) * (2 * i - 2) * (2 * i - 2) + 1, Qe = (i) => i * i * i * i, Ae = (i) => {
  const e = i - 1;
  return 1 - e * e * e * e;
}, $e = (i) => {
  const e = i - 1;
  return i < 0.5 ? 8 * i * i * i * i : 1 - 8 * e * e * e * e;
}, je = (i) => i * i * i * i * i, Be = (i) => {
  const e = i - 1;
  return 1 + e * e * e * e * e;
}, Ve = (i) => {
  const e = i - 1;
  return i < 0.5 ? 16 * i * i * i * i * i : 1 + 16 * e * e * e * e * e;
}, qe = (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)), He = (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1, Ne = (i) => {
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
}, ye = (i) => {
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
}, we = (i) => 1 - ye(1 - i), tt = (i) => i < 0.5 ? we(i * 2) * 0.5 : ye(i * 2 - 1) * 0.5 + 0.5, ce = (i, e, t) => Math.max(e, Math.min(t, i)), it = (i, e, t) => i >= e - t && i <= e + t, xe = (i, e, t) => (1 - t) * i + t * e, N = (i, e, t, n, r = 1e-4) => i <= e + r && i >= e - r ? i : xe(i, e, 1 - Math.exp(-t * n)), st = (i, e, t, n, r = 1e-4) => {
  i.x = N(i.x, e.x, t, n, r), i.y = N(i.y, e.y, t, n, r), i.x = N(i.x, e.x, t, n, r), i.y = N(i.y, e.y, t, n, r), typeof i.z == "number" && typeof e.z == "number" && (i.z = N(
    i.z,
    e.z,
    t,
    n,
    r
  )), typeof i.w == "number" && typeof e.w == "number" && (i.w = N(
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
var Q, A, Y, $, G;
class rt extends ne {
  constructor() {
    super();
    h(this, Q);
    h(this, A, !0);
    h(this, Y, 0);
    h(this, $);
    a(this, "uniforms", Object.freeze({
      uTime: { value: 0 },
      uDeltaTime: { value: 0 },
      uDeltaMs: { value: 0 }
    }));
    h(this, G, (t) => {
      const { uTime: n, uDeltaTime: r, uDeltaMs: c } = this.uniforms;
      n.value = t, c.value = Math.abs(t - s(this, Y)), r.value = c.value * 1e-3, o(this, Y, t), super.fire({ time: t, deltaTime: r.value, deltaMs: c.value }), !s(this, $) && o(this, Q, requestAnimationFrame(s(this, G)));
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
      onUpdate: c,
      onComplete: l
    }) => {
      const m = Math.abs(t), g = Math.abs(n), d = t < n ? 1 : -1;
      let p = m;
      const w = (y) => {
        p += y.deltaTime, p = ce(p, m, g), typeof c == "function" && c({ value: p * d, ...y }), p === g && (typeof l == "function" && l({ value: p * d, ...y }), this.removeListener(w));
      }, { uDeltaMs: x, uDeltaTime: M, uTime: v } = this.uniforms;
      typeof r == "function" && r({
        value: t,
        time: v.value,
        deltaTime: M.value,
        deltaMs: x.value
      }), this.addListener(w);
    });
    a(this, "animate", ({
      steps: t = 0,
      duration: n = 400,
      delay: r = 0,
      iterations: c = 0,
      onStart: l,
      onUpdate: m,
      onComplete: g
    }) => {
      let d, p = 0, w = 0, x = 0;
      const M = ({ time: y }) => {
        const ae = Math.abs(y - p);
        if (t > 0) {
          const de = Math.min(Math.floor(ae / n * t), t - 1);
          de !== w && (w = de, X(m));
        } else X(m);
        ae >= n && (this.removeListener(M), X(m), X(g), x++, (c < 0 || c === 1 / 0 || x < c) && (typeof d == "number" && clearTimeout(d), r > 0 ? d = setTimeout(() => {
          p = me(), X(l), this.addListener(M);
        }, r) : v()));
      }, v = () => {
        p = me(), X(l), this.addListener(M);
      };
      return typeof d == "number" && clearTimeout(d), r > 0 ? d = setTimeout(v, r) : v(), () => this.removeListener(M);
    });
  }
  get paused() {
    return s(this, A);
  }
}
Q = new WeakMap(), A = new WeakMap(), Y = new WeakMap(), $ = new WeakMap(), G = new WeakMap();
var u;
class ot {
  constructor({
    perspective: e,
    orthographic: t,
    controls: n,
    Vector3: r,
    Quaternion: c
  }) {
    a(this, "uniforms");
    h(this, u);
    a(this, "perspective");
    a(this, "orthographic");
    a(this, "controls");
    // onInstanceChange = (...cb: (() => void)[]) => {
    // 	this.dispatcher.addListener(...cb);
    // };
    a(this, "resize", ({ width: e, height: t }) => {
      this.perspective.aspect = e / t, this.perspective.updateProjectionMatrix();
      const n = this.orthographic.top - this.orthographic.bottom;
      this.orthographic.left = n * e / t / -2, this.orthographic.right = n * e / t / 2, this.orthographic.updateProjectionMatrix();
    });
    a(this, "update", ({ deltaTime: e }) => {
      s(this, u).getWorldDirection(this.uniforms.cameraDirection.value), s(this, u).getWorldScale(this.uniforms.cameraScale.value), s(this, u).getWorldQuaternion(this.uniforms.cameraQuaternion.value), this.controls && this.controls.enabled && this.controls.update(e);
    });
    a(this, "clear", () => {
      this.perspective.clear(), this.orthographic.clear(), this.instance.clear(), this.controls.disconnect(), this.controls.dispose();
    });
    a(this, "debug", (e) => {
      e.add({ enabled: this.controls.enabled }, "enabled").name("controls enabled").onChange((t) => {
        this.controls.enabled = t;
      }), "enableDamping" in this.controls && e.add({ enableDamping: this.controls.enableDamping }, "enableDamping").name("controls damping").onChange((t) => {
        "enableDamping" in this.controls && (this.controls.enableDamping = t);
      }), "dampingFactor" in this.controls && e.add({ dampingFactor: this.controls.dampingFactor }, "dampingFactor", 0, 1, 0.01).name("controls damping factor").onChange((t) => {
        "dampingFactor" in this.controls && (this.controls.dampingFactor = t);
      }), e.add({ orthographic: s(this, u).type === "OrthographicCamera" }, "orthographic").name("orthographic camera").onChange((t) => {
        this.instance = t ? "OrthographicCamera" : "PerspectiveCamera";
      }), e.add(s(this, u).position, "x").name("camera position x").listen(), e.add(s(this, u).position, "y").name("camera position y").listen(), e.add(s(this, u).position, "z").name("camera position z").listen(), e.add(this.uniforms.cameraDirection.value, "x").name("camera direction x").disable().listen(), e.add(this.uniforms.cameraDirection.value, "y").name("camera direction y").disable().listen(), e.add(this.uniforms.cameraDirection.value, "z").name("camera direction z").disable().listen();
    });
    this.uniforms = Object.freeze({
      cameraDirection: { value: new r() },
      cameraScale: { value: new r() },
      cameraQuaternion: { value: new c() }
    }), this.controls = n, this.perspective = e, this.orthographic = t, o(this, u, n.object.type === "OrthographicCamera" ? this.orthographic : this.perspective);
  }
  set instance(e) {
    if (e === "OrthographicCamera" && s(this, u).type !== "OrthographicCamera") {
      o(this, u, this.orthographic), this.controls.object = s(this, u);
      return;
    }
    s(this, u).type !== "PerspectiveCamera" && (o(this, u, this.perspective), this.controls.object = s(this, u)), e !== "OrthographicCamera" && e !== "PerspectiveCamera" && console.warn(
      'Invalid camera type: use "OrthographicCamera" or "PerspectiveCamera". Falling back to "PerspectiveCamera"'
    );
  }
  get instance() {
    return s(this, u);
  }
}
u = new WeakMap();
var re, U, J, K, j, S, E, oe, Z, _, P, B, V, q, ee, he, ue, le;
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
    h(this, j);
    h(this, S);
    h(this, E);
    h(this, oe, 20);
    h(this, Z);
    h(this, _);
    h(this, P);
    h(this, B, new ne());
    h(this, V, new ne());
    h(this, q, new ne());
    h(this, ee, () => {
      if (!s(this, P)) return;
      const e = () => `
			Pointer position x ${this.uniforms.uPointerPosition.value.x.toFixed(2)} y ${this.uniforms.uPointerPosition.value.y.toFixed(2)}
			Pointer world position x ${this.uniforms.uPointerWorldPosition.value.x.toFixed(2)} y ${this.uniforms.uPointerWorldPosition.value.y.toFixed(2)} z ${this.uniforms.uPointerWorldPosition.value.z.toFixed(2)}
			Pointer velocity x ${this.uniforms.uPointerPositionVelocity.value.x.toFixed(2)} y ${this.uniforms.uPointerPositionVelocity.value.y.toFixed(2)}
			Pointer press ${this.uniforms.uPointerPress.value}
			Scroll x ${this.uniforms.uPointerScroll.value.x.toFixed(2)} y ${this.uniforms.uPointerScroll.value.y.toFixed(2)}
			Scroll velocity x ${this.uniforms.uPointerScrollVelocity.value.x.toFixed(2)} y ${this.uniforms.uPointerScrollVelocity.value.y.toFixed(2)}
		`;
      s(this, P).innerText = e(), typeof s(this, E) == "number" && clearTimeout(s(this, E)), o(this, E, setTimeout(() => {
        s(this, P) && (s(this, P).innerText = e());
      }, s(this, oe)));
    });
    h(this, he, (e) => {
      const t = e, n = t.target;
      let r = 0, c = 0;
      if (n instanceof HTMLCanvasElement)
        r = n.width, c = n.height;
      else if (n instanceof HTMLElement) {
        const { width: m, height: g } = n.getBoundingClientRect();
        r = m, c = g;
      } else
        r = window.innerWidth, c = window.innerHeight;
      const { uPointerPosition: l } = this.uniforms;
      l.value.x = t.clientX / r * 2 - 1, l.value.y = -(t.clientY / c) * 2 + 1;
    });
    h(this, ue, (e) => {
      const t = e, { uPointerPositionVelocity: n } = this.uniforms, r = t.pageX, c = t.pageY, l = s(this, j).x, m = s(this, j).y;
      n.value.x = Math.abs(r - l), n.value.y = Math.abs(c - m), s(this, j).set(r, c), typeof s(this, S) == "number" && clearTimeout(s(this, S)), o(this, S, setTimeout(() => {
        n.value.set(0, 0);
      }, s(this, oe)));
    });
    h(this, le, () => {
      const { uPointerWorldPosition: e, uPointerPosition: t } = this.uniforms;
      s(this, Z).getWorldDirection(s(this, _)), s(this, J).setFromCamera(t.value, s(this, Z)), s(this, U).setFromNormalAndCoplanarPoint(s(this, _), s(this, re)), s(this, J).ray.intersectPlane(s(this, U), e.value);
    });
    a(this, "onMove", (e) => {
      s(this, he).call(this, e), s(this, le).call(this), s(this, ue).call(this, e), s(this, ee).call(this), s(this, B).fire();
    });
    a(this, "onScroll", (e) => {
      const { uPointerScroll: t, uPointerScrollVelocity: n } = this.uniforms;
      s(this, K).copy(t.value);
      const r = window.scrollX / (document.body.scrollWidth - window.innerWidth), c = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      t.value.x = r, t.value.y = c, e.type === "scroll" ? n.value.subVectors(t.value, s(this, K)) : n.value.set(0, 0), s(this, ee).call(this), s(this, q).fire();
    });
    a(this, "onPress", (e) => {
      const t = e, { uPointerPress: n } = this.uniforms;
      t.pointerType === "mouse" ? n.value = t.pressure ? 1 : 0 : n.value = t.pressure, s(this, ee).call(this), s(this, V).fire();
    });
    a(this, "addMoveListener", (...e) => (s(this, B).addListener(...e), () => s(this, B).removeListener(...e)));
    a(this, "addPressListener", (...e) => (s(this, V).addListener(...e), () => s(this, V).removeListener(...e)));
    a(this, "addScrollListener", (...e) => (s(this, q).addListener(...e), () => s(this, q).removeListener(...e)));
    a(this, "clear", () => {
      var e;
      s(this, B).clear(), s(this, V).clear(), s(this, q).clear(), s(this, S) && clearTimeout(s(this, S)), o(this, S, void 0), s(this, E) && clearTimeout(s(this, E)), o(this, E, void 0), (e = s(this, P)) == null || e.remove(), o(this, P, void 0);
    });
    a(this, "debug", (e) => {
      o(this, P, document.createElement("div")), s(this, P).style.padding = "4px", e.domElement.appendChild(s(this, P));
    });
    this.uniforms = Object.freeze({
      uPointerScroll: { value: new n() },
      uPointerScrollVelocity: { value: new n() },
      uPointerPress: { value: 0 },
      uPointerPosition: { value: new n() },
      uPointerWorldPosition: { value: new r() },
      uPointerPositionVelocity: { value: new n() }
    }), o(this, re, new r()), o(this, U, new e()), o(this, J, new t()), o(this, K, new n()), o(this, j, new n()), o(this, Z, c), o(this, _, new r());
  }
}
re = new WeakMap(), U = new WeakMap(), J = new WeakMap(), K = new WeakMap(), j = new WeakMap(), S = new WeakMap(), E = new WeakMap(), oe = new WeakMap(), Z = new WeakMap(), _ = new WeakMap(), P = new WeakMap(), B = new WeakMap(), V = new WeakMap(), q = new WeakMap(), ee = new WeakMap(), he = new WeakMap(), ue = new WeakMap(), le = new WeakMap();
const Te = function(i, e, t, n) {
  const r = function(c, l, m) {
    var p, w;
    const g = (p = c.getShaderInfoLog(l)) == null ? void 0 : p.trim(), d = "Errors in " + m + `:

` + g;
    if (g !== "") {
      const x = (w = c.getShaderSource(l)) == null ? void 0 : w.replace(/\t/g, "  "), M = x == null ? void 0 : x.split(`
`);
      let v = "", y = 1;
      if (!M) return;
      for (const ae of M)
        v += (y < 10 ? " " : "") + y + ":		" + ae + `
`, y++;
      console.error(d + `
` + v);
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
      this.instance && (this.instance.setSize(t, n, !1), this.instance.setPixelRatio(r), this.uniforms.uResolution.value.set(t, n), this.composer && (this.composer.setSize(t, n), this.composer.setPixelRatio(r)));
    });
    a(this, "clear", () => {
      this.instance.dispose(), this.composer && this.removeEffect(...this.composer.passes);
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
var C, D, k, te, I, W, ie;
class ht extends ne {
  constructor(t) {
    super();
    h(this, C, 7680);
    // 4k
    h(this, D, 1280);
    h(this, k, 720);
    h(this, te, 1);
    h(this, I, 1);
    h(this, W);
    a(this, "fire", () => {
      let t = s(this, D), n = s(this, k);
      if (s(this, D) > s(this, C) || s(this, k) > s(this, C))
        if (t > n) {
          const c = n / t;
          t = ce(t, 0, s(this, C)), n = t * c;
        } else {
          const c = t / n;
          n = ce(n, 0, s(this, C)), t = n * c;
        }
      t *= s(this, I), n *= s(this, I);
      const r = s(this, te);
      super.fire({ width: t, height: n, pixelRatio: r });
    });
    h(this, ie, new ResizeObserver((t) => {
      const n = t[0].contentBoxSize[0], { inlineSize: r, blockSize: c } = n;
      s(this, D) === r && s(this, k) === c || (o(this, D, r), o(this, k, c), this.fire());
    }));
    a(this, "debug", (t) => {
      t.add({ maxSize: this.maxSize }, "maxSize", 0, 7680).name("max resolution").onChange((n) => {
        this.maxSize = n;
      }), t.add({ resolutionFactor: this.resolutionFactor }, "resolutionFactor", 0, 1).name("resolution factor").onChange((n) => {
        this.resolutionFactor = n;
      });
    });
    o(this, te, Math.min(window.devicePixelRatio, 2)), o(this, W, t), s(this, ie).observe(s(this, W)), this.fire();
  }
  get width() {
    return s(this, D) * s(this, I);
  }
  get height() {
    return s(this, k) * s(this, I);
  }
  get element() {
    return s(this, W);
  }
  get pixelRatio() {
    return s(this, te);
  }
  get maxSize() {
    return s(this, C);
  }
  get resolutionFactor() {
    return s(this, I);
  }
  set resolutionFactor(t) {
    o(this, I, ce(t, 0.01, 1)), this.fire();
  }
  set maxSize(t) {
    o(this, C, t < 32 ? 32 : t), this.fire();
  }
  clear() {
    super.clear(), s(this, W) && s(this, ie).unobserve(s(this, W)), s(this, ie).disconnect();
  }
}
C = new WeakMap(), D = new WeakMap(), k = new WeakMap(), te = new WeakMap(), I = new WeakMap(), W = new WeakMap(), ie = new WeakMap();
const L = class L {
  constructor({ instance: e }) {
    a(this, "instance");
    a(this, "clear", () => {
      this.instance.children.forEach((e) => L.disposeNode(e)), this.instance.clear();
    });
    this.instance = e;
  }
};
a(L, "disposeMaterial", (e) => {
  Object.values(e).forEach((t) => {
    typeof (t == null ? void 0 : t.dispose) == "function" && t.dispose();
  });
}), a(L, "disposeNode", (e) => {
  if (!e) return;
  const t = e;
  t != null && t.geometry && t.geometry.dispose(), t != null && t.material && (Array.isArray(t.material) ? t.material.forEach((n) => {
    L.disposeMaterial(n), n.dispose();
  }) : (L.disposeMaterial(t.material), t.material.dispose())), t.children.forEach((n) => L.disposeNode(n));
});
let ve = L;
var T, F, se, f, H, O;
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
    h(this, F, 0);
    h(this, se, 0);
    h(this, f, 0);
    h(this, H, 0);
    h(this, O, !1);
    a(this, "from", (e) => (o(this, se, e), o(this, f, e), this));
    a(this, "to", (e, t) => (o(this, F, e), Math.abs(s(this, H)) < s(this, T).threshold && Math.abs(s(this, F) - s(this, f)) < s(this, T).threshold ? this : (t && o(this, T, { ...s(this, T), ...t }), o(this, O, !1), this)));
    a(this, "update", (e = 0.016) => {
      if (s(this, O)) return;
      const { mass: t, tension: n, friction: r, threshold: c, onComplete: l, onUpdate: m } = s(this, T), g = Math.min(e, 0.06), d = s(this, H) ?? 0, p = typeof s(this, f) == "number" ? s(this, f) : s(this, se), w = -1 * n * (p - s(this, F)), x = -1 * d * r, M = (w + x) / t, v = d + M * g, y = p + v * g;
      o(this, O, Math.abs(v) < c && Math.abs(y - s(this, F)) < c), o(this, f, s(this, O) ? s(this, F) : y), o(this, H, v), s(this, O) ? (o(this, f, s(this, F)), l && l(s(this, f))) : m && m(s(this, f));
    });
    o(this, f, e || 0), o(this, se, e || 0), o(this, T, { ...s(this, T), ...t });
  }
  get value() {
    return s(this, f);
  }
  get velocity() {
    return s(this, H);
  }
  get finished() {
    return s(this, O);
  }
}
T = new WeakMap(), F = new WeakMap(), se = new WeakMap(), f = new WeakMap(), H = new WeakMap(), O = new WeakMap();
var R, b, pe;
class lt {
  constructor() {
    h(this, R, []);
    h(this, b, !1);
    h(this, pe, async () => {
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
      o(this, b, !1), await s(this, pe).call(this);
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
R = new WeakMap(), b = new WeakMap(), pe = new WeakMap();
export {
  rt as Animator,
  ot as CameraWrapper,
  ne as MonoEventEmitter,
  at as PointerTracker,
  ct as RendererWrapper,
  ht as Resizer,
  ve as SceneWrapper,
  ut as Spring,
  lt as TaskQueue,
  ce as clamp,
  ze as clickout,
  Se as createDebugTexture,
  Ee as createEmpytTexture,
  N as dampThreshold,
  st as dampThresholdVec,
  Ue as easeInBack,
  we as easeInBounce,
  Xe as easeInCirc,
  ke as easeInCubic,
  Ze as easeInElastic,
  qe as easeInExpo,
  Ke as easeInOutBack,
  tt as easeInOutBounce,
  Ge as easeInOutCirc,
  Re as easeInOutCubic,
  et as easeInOutElastic,
  Ne as easeInOutExpo,
  De as easeInOutQuad,
  $e as easeInOutQuart,
  Ve as easeInOutQuint,
  Fe as easeInOutSine,
  Oe as easeInQuad,
  Qe as easeInQuart,
  je as easeInQuint,
  Ce as easeInSine,
  Je as easeOutBack,
  ye as easeOutBounce,
  Ye as easeOutCirc,
  We as easeOutCubic,
  _e as easeOutElastic,
  He as easeOutExpo,
  Le as easeOutQuad,
  Ae as easeOutQuart,
  Be as easeOutQuint,
  Ie as easeOutSine,
  it as isBetween,
  xe as lerp,
  me as now,
  nt as wait
};
