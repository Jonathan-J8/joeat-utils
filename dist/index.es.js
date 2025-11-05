var Pe = Object.defineProperty;
var de = (t) => {
  throw TypeError(t);
};
var we = (t, e, i) => e in t ? Pe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var a = (t, e, i) => we(t, typeof e != "symbol" ? e + "" : e, i), fe = (t, e, i) => e.has(t) || de("Cannot " + i);
var s = (t, e, i) => (fe(t, e, "read from private field"), i ? i.call(t) : e.get(t)), h = (t, e, i) => e.has(t) ? de("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), o = (t, e, i, n) => (fe(t, e, "write to private field"), n ? n.call(t, i) : e.set(t, i), i);
const Se = (t) => {
  const e = (i) => {
    const n = i.target;
    t && !t.contains(n) && !i.defaultPrevented && t.dispatchEvent(new CustomEvent("clickout", { detail: { node: t } }));
  };
  return window.addEventListener("click", e), () => window.removeEventListener("click", e);
}, ze = (t) => {
  const e = new t.Mesh(
    new t.PlaneGeometry(2, 2),
    new t.MeshLambertMaterial({
      map: t.textureCallback(),
      side: t.DoubleSide,
      color: 16777215,
      transparent: !1
    })
  );
  return { mesh: e, update: () => {
    e.material.map = t.textureCallback();
  }, dispose: () => {
    e.geometry.dispose(), e.material.dispose();
  } };
}, Ce = (t) => new t(new Uint8Array(1), 1, 1), Ee = (t) => -1 * Math.cos(t * (Math.PI / 2)) + 1, Ie = (t) => Math.sin(t * (Math.PI / 2)), Fe = (t) => -0.5 * (Math.cos(Math.PI * t) - 1), Oe = (t) => t * t, Le = (t) => t * (2 - t), De = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, ke = (t) => t * t * t, We = (t) => {
  const e = t - 1;
  return e * e * e + 1;
}, Re = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1, Qe = (t) => t * t * t * t, Ae = (t) => {
  const e = t - 1;
  return 1 - e * e * e * e;
}, $e = (t) => {
  const e = t - 1;
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * e * e * e * e;
}, je = (t) => t * t * t * t * t, Be = (t) => {
  const e = t - 1;
  return 1 + e * e * e * e * e;
}, Ve = (t) => {
  const e = t - 1;
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * e * e * e * e * e;
}, qe = (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)), He = (t) => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1, Ne = (t) => {
  if (t === 0 || t === 1)
    return t;
  const e = t * 2, i = e - 1;
  return e < 1 ? 0.5 * Math.pow(2, 10 * i) : 0.5 * (-Math.pow(2, -10 * i) + 2);
}, Xe = (t) => {
  const e = t / 1;
  return -1 * (Math.sqrt(1 - e * t) - 1);
}, Ye = (t) => {
  const e = t - 1;
  return Math.sqrt(1 - e * e);
}, _e = (t) => {
  const e = t * 2, i = e - 2;
  return e < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - i * i) + 1);
}, Ge = (t, e = 1.70158) => t * t * ((e + 1) * t - e), Ue = (t, e = 1.70158) => {
  const i = t / 1 - 1;
  return i * i * ((e + 1) * i + e) + 1;
}, Je = (t, e = 1.70158) => {
  const i = t * 2, n = i - 2, r = e * 1.525;
  return i < 1 ? 0.5 * i * i * ((r + 1) * i - r) : 0.5 * (n * n * ((r + 1) * n + r) + 2);
}, Ke = (t, e = 0.7) => {
  if (t === 0 || t === 1)
    return t;
  const n = t / 1 - 1, r = 1 - e, c = r / (2 * Math.PI) * Math.asin(1);
  return -(Math.pow(2, 10 * n) * Math.sin((n - c) * (2 * Math.PI) / r));
}, Ze = (t, e = 0.7) => {
  if (t === 0 || t === 1) return t;
  const i = 1 - e, n = t * 2, r = i / (2 * Math.PI) * Math.asin(1);
  return Math.pow(2, -10 * n) * Math.sin((n - r) * (2 * Math.PI) / i) + 1;
}, et = (t, e = 0.65) => {
  if (t === 0 || t === 1) return t;
  const i = 1 - e, n = t * 2, r = n - 1, c = i / (2 * Math.PI) * Math.asin(1);
  return n < 1 ? -0.5 * (Math.pow(2, 10 * r) * Math.sin((r - c) * (2 * Math.PI) / i)) : Math.pow(2, -10 * r) * Math.sin((r - c) * (2 * Math.PI) / i) * 0.5 + 1;
}, ve = (t) => {
  const e = t / 1;
  if (e < 0.36363636363636365)
    return 7.5625 * e * e;
  if (e < 0.7272727272727273) {
    const i = e - 0.5454545454545454;
    return 7.5625 * i * i + 0.75;
  } else if (e < 0.9090909090909091) {
    const i = e - 0.8181818181818182;
    return 7.5625 * i * i + 0.9375;
  } else {
    const i = e - 0.9545454545454546;
    return 7.5625 * i * i + 0.984375;
  }
}, Me = (t) => 1 - ve(1 - t), tt = (t) => t < 0.5 ? Me(t * 2) * 0.5 : ve(t * 2 - 1) * 0.5 + 0.5, ae = (t, e, i) => Math.max(e, Math.min(i, t)), it = (t, e, i) => t >= e - i && t <= e + i, xe = (t, e, i) => (1 - i) * t + i * e, H = (t, e, i, n, r = 1e-4) => t <= e + r && t >= e - r ? t : xe(t, e, 1 - Math.exp(-i * n)), st = (t, e, i, n, r = 1e-4) => {
  t.x = H(t.x, e.x, i, n, r), t.y = H(t.y, e.y, i, n, r), t.x = H(t.x, e.x, i, n, r), t.y = H(t.y, e.y, i, n, r), typeof t.z == "number" && typeof e.z == "number" && (t.z = H(
    t.z,
    e.z,
    i,
    n,
    r
  )), typeof t.w == "number" && typeof e.w == "number" && (t.w = H(
    t.w,
    e.w,
    i,
    n,
    r
  ));
}, me = () => (typeof performance > "u" ? Date : performance).now(), nt = (t) => new Promise((e) => setTimeout(e, t));
var S;
class se {
  constructor() {
    h(this, S);
    o(this, S, /* @__PURE__ */ new Set());
  }
  get size() {
    return s(this, S).size;
  }
  addListener(...e) {
    for (let i = 0, n = e.length; i < n; i++)
      s(this, S).add(e[i]);
  }
  removeListener(...e) {
    for (let i = 0, n = e.length; i < n; i++)
      s(this, S).delete(e[i]);
  }
  fire(...e) {
    s(this, S).forEach((i) => {
      i(...e);
    });
  }
  clear() {
    s(this, S).clear();
  }
}
S = new WeakMap();
const N = (t) => t && t();
var R, Q, X, A, Y;
class rt extends se {
  constructor() {
    super();
    h(this, R);
    h(this, Q, !0);
    h(this, X, 0);
    h(this, A);
    a(this, "uniforms", Object.freeze({
      uTime: { value: 0 },
      uDeltaTime: { value: 0 },
      uDeltaMs: { value: 0 }
    }));
    h(this, Y, (i) => {
      const { uTime: n, uDeltaTime: r, uDeltaMs: c } = this.uniforms;
      n.value = i, c.value = Math.abs(i - s(this, X)), r.value = c.value * 1e-3, o(this, X, i), super.fire({ time: i, deltaTime: r.value, deltaMs: c.value }), !s(this, A) && o(this, R, requestAnimationFrame(s(this, Y)));
    });
    a(this, "play", (i) => {
      o(this, A, i), s(this, Q) && (o(this, Q, !1), o(this, X, me()), i ? i.setAnimationLoop(s(this, Y)) : o(this, R, requestAnimationFrame(s(this, Y))));
    });
    a(this, "pause", (i) => {
      o(this, Q, !0), i ? i.setAnimationLoop(null) : typeof s(this, R) == "number" && cancelAnimationFrame(s(this, R));
    });
    a(this, "debug", (i) => {
      i.add({ paused: this.paused }, "paused").onChange((n) => {
        n ? this.pause(s(this, A)) : this.play(s(this, A));
      });
    });
    a(this, "interpolate", ({
      from: i = 0,
      to: n = 1,
      onStart: r,
      onUpdate: c,
      onComplete: l
    }) => {
      const p = Math.abs(i), g = Math.abs(n), d = i < n ? 1 : -1;
      let m = p;
      const M = (y) => {
        m += y.deltaTime, m = ae(m, p, g), typeof c == "function" && c({ value: m * d, ...y }), m === g && (typeof l == "function" && l({ value: m * d, ...y }), this.removeListener(M));
      }, { uDeltaMs: x, uDeltaTime: w, uTime: v } = this.uniforms;
      typeof r == "function" && r({
        value: i,
        time: v.value,
        deltaTime: w.value,
        deltaMs: x.value
      }), this.addListener(M);
    });
    a(this, "animate", ({
      steps: i = 0,
      duration: n = 400,
      delay: r = 0,
      iterations: c = 0,
      onStart: l,
      onUpdate: p,
      onComplete: g
    }) => {
      let d, m = 0, M = 0, x = 0;
      const w = ({ time: y }) => {
        const oe = Math.abs(y - m);
        if (i > 0) {
          const pe = Math.min(Math.floor(oe / n * i), i - 1);
          pe !== M && (M = pe, N(p));
        } else N(p);
        oe >= n && (this.removeListener(w), N(p), N(g), x++, (c < 0 || c === 1 / 0 || x < c) && (typeof d == "number" && clearTimeout(d), r > 0 ? d = setTimeout(() => {
          m = me(), N(l), this.addListener(w);
        }, r) : v()));
      }, v = () => {
        m = me(), N(l), this.addListener(w);
      };
      return typeof d == "number" && clearTimeout(d), r > 0 ? d = setTimeout(v, r) : v(), () => this.removeListener(w);
    });
  }
  get paused() {
    return s(this, Q);
  }
}
R = new WeakMap(), Q = new WeakMap(), X = new WeakMap(), A = new WeakMap(), Y = new WeakMap();
var u;
class ot {
  constructor({
    perspective: e,
    orthographic: i,
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
    a(this, "resize", ({ width: e, height: i }) => {
      this.perspective.aspect = e / i, this.perspective.updateProjectionMatrix();
      const n = this.orthographic.top - this.orthographic.bottom;
      this.orthographic.left = n * e / i / -2, this.orthographic.right = n * e / i / 2, this.orthographic.updateProjectionMatrix();
    });
    a(this, "update", ({ deltaTime: e }) => {
      s(this, u).getWorldDirection(this.uniforms.cameraDirection.value), s(this, u).getWorldScale(this.uniforms.cameraScale.value), s(this, u).getWorldQuaternion(this.uniforms.cameraQuaternion.value), this.controls && this.controls.enabled && this.controls.update(e);
    });
    a(this, "clear", () => {
      this.perspective.clear(), this.orthographic.clear(), this.instance.clear(), this.controls.disconnect(), this.controls.dispose();
    });
    a(this, "debug", (e) => {
      e.add({ enabled: this.controls.enabled }, "enabled").name("controls enabled").onChange((i) => {
        this.controls.enabled = i;
      }), "enableDamping" in this.controls && e.add({ enableDamping: this.controls.enableDamping }, "enableDamping").name("controls damping").onChange((i) => {
        "enableDamping" in this.controls && (this.controls.enableDamping = i);
      }), "dampingFactor" in this.controls && e.add({ dampingFactor: this.controls.dampingFactor }, "dampingFactor", 0, 1, 0.01).name("controls damping factor").onChange((i) => {
        "dampingFactor" in this.controls && (this.controls.dampingFactor = i);
      }), e.add({ orthographic: s(this, u).type === "OrthographicCamera" }, "orthographic").name("orthographic camera").onChange((i) => {
        this.instance = i ? "OrthographicCamera" : "PerspectiveCamera";
      }), e.add(s(this, u).position, "x").name("camera position x").listen(), e.add(s(this, u).position, "y").name("camera position y").listen(), e.add(s(this, u).position, "z").name("camera position z").listen(), e.add(this.uniforms.cameraDirection.value, "x").name("camera direction x").disable().listen(), e.add(this.uniforms.cameraDirection.value, "y").name("camera direction y").disable().listen(), e.add(this.uniforms.cameraDirection.value, "z").name("camera direction z").disable().listen();
    });
    this.uniforms = Object.freeze({
      cameraDirection: { value: new r() },
      cameraScale: { value: new r() },
      cameraQuaternion: { value: new c() }
    }), this.controls = n, this.perspective = e, this.orthographic = i, o(this, u, n.object.type === "OrthographicCamera" ? this.orthographic : this.perspective);
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
var ne, _, G, U, $, z, C, re, J, K, P, j, B, V, Z, ce, he, ue;
class at {
  constructor({
    Plane: e,
    Raycaster: i,
    Vector2: n,
    Vector3: r,
    camera: c
  }) {
    a(this, "uniforms");
    h(this, ne);
    h(this, _);
    h(this, G);
    h(this, U);
    h(this, $);
    h(this, z);
    h(this, C);
    h(this, re, 20);
    h(this, J);
    h(this, K);
    h(this, P);
    h(this, j, new se());
    h(this, B, new se());
    h(this, V, new se());
    h(this, Z, () => {
      if (!s(this, P)) return;
      const e = () => `
			Pointer position x ${this.uniforms.uPointerPosition.value.x.toFixed(2)} y ${this.uniforms.uPointerPosition.value.y.toFixed(2)}
			Pointer world position x ${this.uniforms.uPointerWorldPosition.value.x.toFixed(2)} y ${this.uniforms.uPointerWorldPosition.value.y.toFixed(2)} z ${this.uniforms.uPointerWorldPosition.value.z.toFixed(2)}
			Pointer velocity x ${this.uniforms.uPointerPositionVelocity.value.x.toFixed(2)} y ${this.uniforms.uPointerPositionVelocity.value.y.toFixed(2)}
			Pointer press ${this.uniforms.uPointerPress.value}
			Scroll x ${this.uniforms.uPointerScroll.value.x.toFixed(2)} y ${this.uniforms.uPointerScroll.value.y.toFixed(2)}
			Scroll velocity x ${this.uniforms.uPointerScrollVelocity.value.x.toFixed(2)} y ${this.uniforms.uPointerScrollVelocity.value.y.toFixed(2)}
		`;
      s(this, P).innerText = e(), typeof s(this, C) == "number" && clearTimeout(s(this, C)), o(this, C, setTimeout(() => {
        s(this, P) && (s(this, P).innerText = e());
      }, s(this, re)));
    });
    h(this, ce, (e) => {
      const i = e, n = i.target;
      let r = 0, c = 0;
      if (n instanceof HTMLCanvasElement)
        r = n.width, c = n.height;
      else if (n instanceof HTMLElement) {
        const { width: p, height: g } = n.getBoundingClientRect();
        r = p, c = g;
      } else
        r = window.innerWidth, c = window.innerHeight;
      const { uPointerPosition: l } = this.uniforms;
      l.value.x = i.clientX / r * 2 - 1, l.value.y = -(i.clientY / c) * 2 + 1;
    });
    h(this, he, (e) => {
      const i = e, { uPointerPositionVelocity: n } = this.uniforms, r = i.pageX, c = i.pageY, l = s(this, $).x, p = s(this, $).y;
      n.value.x = Math.abs(r - l), n.value.y = Math.abs(c - p), s(this, $).set(r, c), typeof s(this, z) == "number" && clearTimeout(s(this, z)), o(this, z, setTimeout(() => {
        n.value.set(0, 0);
      }, s(this, re)));
    });
    h(this, ue, () => {
      const { uPointerWorldPosition: e, uPointerPosition: i } = this.uniforms;
      s(this, J).getWorldDirection(s(this, K)), s(this, G).setFromCamera(i.value, s(this, J)), s(this, _).setFromNormalAndCoplanarPoint(s(this, K), s(this, ne)), s(this, G).ray.intersectPlane(s(this, _), e.value);
    });
    a(this, "onMove", (e) => {
      s(this, ce).call(this, e), s(this, ue).call(this), s(this, he).call(this, e), s(this, Z).call(this), s(this, j).fire();
    });
    a(this, "onScroll", (e) => {
      const { uPointerScroll: i, uPointerScrollVelocity: n } = this.uniforms;
      s(this, U).copy(i.value);
      const r = window.scrollX / (document.body.scrollWidth - window.innerWidth), c = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      i.value.x = r, i.value.y = c, e.type === "scroll" ? n.value.subVectors(i.value, s(this, U)) : n.value.set(0, 0), s(this, Z).call(this), s(this, V).fire();
    });
    a(this, "onPress", (e) => {
      const i = e, { uPointerPress: n } = this.uniforms;
      i.pointerType === "mouse" ? n.value = i.pressure ? 1 : 0 : n.value = i.pressure, s(this, Z).call(this), s(this, B).fire();
    });
    a(this, "addMoveListener", (...e) => (s(this, j).addListener(...e), () => s(this, j).removeListener(...e)));
    a(this, "addPressListener", (...e) => (s(this, B).addListener(...e), () => s(this, B).removeListener(...e)));
    a(this, "addScrollListener", (...e) => (s(this, V).addListener(...e), () => s(this, V).removeListener(...e)));
    a(this, "clear", () => {
      var e;
      s(this, j).clear(), s(this, B).clear(), s(this, V).clear(), s(this, z) && clearTimeout(s(this, z)), o(this, z, void 0), s(this, C) && clearTimeout(s(this, C)), o(this, C, void 0), (e = s(this, P)) == null || e.remove(), o(this, P, void 0);
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
    }), o(this, ne, new r()), o(this, _, new e()), o(this, G, new i()), o(this, U, new n()), o(this, $, new n()), o(this, J, c), o(this, K, new r());
  }
}
ne = new WeakMap(), _ = new WeakMap(), G = new WeakMap(), U = new WeakMap(), $ = new WeakMap(), z = new WeakMap(), C = new WeakMap(), re = new WeakMap(), J = new WeakMap(), K = new WeakMap(), P = new WeakMap(), j = new WeakMap(), B = new WeakMap(), V = new WeakMap(), Z = new WeakMap(), ce = new WeakMap(), he = new WeakMap(), ue = new WeakMap();
const Te = function(t, e, i, n) {
  const r = function(c, l, p) {
    var m, M;
    const g = (m = c.getShaderInfoLog(l)) == null ? void 0 : m.trim(), d = "Errors in " + p + `:

` + g;
    if (g !== "") {
      const x = (M = c.getShaderSource(l)) == null ? void 0 : M.replace(/\t/g, "  "), w = x == null ? void 0 : x.split(`
`);
      let v = "", y = 1;
      if (!w) return;
      for (const oe of w)
        v += (y < 10 ? " " : "") + y + ":		" + oe + `
`, y++;
      console.error(d + `
` + v);
    }
  };
  r(t, i, "Vertex Shader"), r(t, n, "Fragment Shader");
};
class ct {
  constructor({
    instance: e,
    Vector2: i,
    EffectComposer: n
  }) {
    a(this, "uniforms");
    a(this, "instance");
    a(this, "composer");
    a(this, "addEffect", (...e) => {
      e.forEach((i) => {
        if (!this.composer || !this.instance) return console.warn("EffectComposer not initialized");
        this.composer.addPass(i);
      });
    });
    a(this, "removeEffect", (...e) => {
      e.forEach((i) => {
        var n;
        i.dispose(), (n = this.composer) == null || n.removePass(i);
      });
    });
    a(this, "update", (e) => {
      this.instance && (this.composer ? this.composer.render(e.deltaTime || 0.016) : this.instance.render(e.scene, e.camera));
    });
    a(this, "resize", (e) => {
      const { width: i, height: n, pixelRatio: r } = e;
      this.instance && (this.instance.setSize(i, n, !1), this.instance.setPixelRatio(r), this.uniforms.uResolution.value.set(i, n), this.composer && (this.composer.setSize(i, n), this.composer.setPixelRatio(r)));
    });
    a(this, "clear", () => {
      this.instance.dispose(), this.composer && this.removeEffect(...this.composer.passes);
    });
    a(this, "debug", (e) => {
      const { instance: i } = this;
      i && (i.debug.checkShaderErrors = !0, i.debug.onShaderError = Te, e.add(i, "toneMapping", {
        NoToneMapping: 0,
        LinearToneMapping: 1,
        ReinhardToneMapping: 2,
        CineonToneMapping: 3,
        ACESFilmicToneMapping: 4,
        CustomToneMapping: 5,
        AgXToneMapping: 6,
        NeutralToneMapping: 7
      }).name("tone mapping"), e.add(i, "toneMappingExposure", 0, 1).name("tone mapping exposure"));
    });
    this.uniforms = Object.freeze({
      uResolution: { value: new i() }
    }), this.instance = e, this.instance.debug.checkShaderErrors = !1, n && (this.composer = new n(this.instance));
  }
}
var E, L, D, ee, I, k, te;
class ht extends se {
  constructor(i) {
    super();
    h(this, E, 7680);
    // 4k
    h(this, L, 1280);
    h(this, D, 720);
    h(this, ee, 1);
    h(this, I, 1);
    h(this, k);
    a(this, "fire", () => {
      let i = s(this, L), n = s(this, D);
      if (s(this, L) > s(this, E) || s(this, D) > s(this, E))
        if (i > n) {
          const c = n / i;
          i = ae(i, 0, s(this, E)), n = i * c;
        } else {
          const c = i / n;
          n = ae(n, 0, s(this, E)), i = n * c;
        }
      i *= s(this, I), n *= s(this, I);
      const r = s(this, ee);
      super.fire({ width: i, height: n, pixelRatio: r });
    });
    h(this, te, new ResizeObserver((i) => {
      const n = i[0].contentBoxSize[0], { inlineSize: r, blockSize: c } = n;
      s(this, L) === r && s(this, D) === c || (o(this, L, r), o(this, D, c), this.fire());
    }));
    a(this, "debug", (i) => {
      i.add({ maxSize: this.maxSize }, "maxSize", 0, 7680).name("max resolution").onChange((n) => {
        this.maxSize = n;
      }), i.add({ resolutionFactor: this.resolutionFactor }, "resolutionFactor", 0, 1).name("resolution factor").onChange((n) => {
        this.resolutionFactor = n;
      });
    });
    o(this, ee, Math.min(window.devicePixelRatio, 2)), o(this, k, i), s(this, te).observe(s(this, k)), this.fire();
  }
  get width() {
    return s(this, L) * s(this, I);
  }
  get height() {
    return s(this, D) * s(this, I);
  }
  get element() {
    return s(this, k);
  }
  get pixelRatio() {
    return s(this, ee);
  }
  get maxSize() {
    return s(this, E);
  }
  get resolutionFactor() {
    return s(this, I);
  }
  set resolutionFactor(i) {
    o(this, I, ae(i, 0.01, 1)), this.fire();
  }
  set maxSize(i) {
    o(this, E, i < 32 ? 32 : i), this.fire();
  }
  clear() {
    super.clear(), s(this, k) && s(this, te).unobserve(s(this, k)), s(this, te).disconnect();
  }
}
E = new WeakMap(), L = new WeakMap(), D = new WeakMap(), ee = new WeakMap(), I = new WeakMap(), k = new WeakMap(), te = new WeakMap();
const ge = (t) => {
  Object.values(t).forEach((e) => {
    typeof (e == null ? void 0 : e.dispose) == "function" && e.dispose();
  });
}, ye = (t) => {
  if (!t) return;
  const e = t;
  e != null && e.geometry && e.geometry.dispose(), e != null && e.material && (Array.isArray(e.material) ? e.material.forEach((i) => {
    ge(i), i.dispose();
  }) : (ge(e.material), e.material.dispose())), e.children.forEach((i) => ye(i));
};
class ut {
  constructor({ instance: e }) {
    a(this, "instance");
    a(this, "clear", () => {
      ye(this.instance), this.instance.clear();
    });
    this.instance = e;
  }
}
var T, F, ie, f, q, O;
class lt {
  constructor(e, i) {
    h(this, T, {
      mass: 0.5,
      tension: 0.5,
      friction: 0.5,
      threshold: 0.1,
      onUpdate: void 0,
      onComplete: void 0
    });
    h(this, F, 0);
    h(this, ie, 0);
    h(this, f, 0);
    h(this, q, 0);
    h(this, O, !1);
    a(this, "from", (e) => (o(this, ie, e), o(this, f, e), this));
    a(this, "to", (e, i) => (o(this, F, e), Math.abs(s(this, q)) < s(this, T).threshold && Math.abs(s(this, F) - s(this, f)) < s(this, T).threshold ? this : (i && o(this, T, { ...s(this, T), ...i }), o(this, O, !1), this)));
    a(this, "update", (e = 0.016) => {
      if (s(this, O)) return;
      const { mass: i, tension: n, friction: r, threshold: c, onComplete: l, onUpdate: p } = s(this, T), g = Math.min(e, 0.06), d = s(this, q) ?? 0, m = typeof s(this, f) == "number" ? s(this, f) : s(this, ie), M = -1 * n * (m - s(this, F)), x = -1 * d * r, w = (M + x) / i, v = d + w * g, y = m + v * g;
      o(this, O, Math.abs(v) < c && Math.abs(y - s(this, F)) < c), o(this, f, s(this, O) ? s(this, F) : y), o(this, q, v), s(this, O) ? (o(this, f, s(this, F)), l && l(s(this, f))) : p && p(s(this, f));
    });
    o(this, f, e || 0), o(this, ie, e || 0), o(this, T, { ...s(this, T), ...i });
  }
  get value() {
    return s(this, f);
  }
  get velocity() {
    return s(this, q);
  }
  get finished() {
    return s(this, O);
  }
}
T = new WeakMap(), F = new WeakMap(), ie = new WeakMap(), f = new WeakMap(), q = new WeakMap(), O = new WeakMap();
var W, b, le;
class mt {
  constructor() {
    h(this, W, []);
    h(this, b, !1);
    h(this, le, async () => {
      if (!s(this, b)) {
        for (o(this, b, !0); s(this, W).length > 0 && s(this, b); ) {
          const e = s(this, W).shift();
          if (e)
            try {
              await e();
            } catch (i) {
              console.error("Timeline error:", i);
            }
        }
        o(this, b, !1);
      }
    });
    a(this, "add", (...e) => {
      s(this, W).push(...e);
    });
    a(this, "play", async () => {
      o(this, b, !1), await s(this, le).call(this);
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
W = new WeakMap(), b = new WeakMap(), le = new WeakMap();
export {
  rt as Animator,
  ot as CameraWrapper,
  se as MonoEventEmitter,
  at as PointerTracker,
  ct as RendererWrapper,
  ht as Resizer,
  ut as SceneWrapper,
  lt as Spring,
  mt as TaskQueue,
  ae as clamp,
  Se as clickout,
  ze as createDebugTexture,
  Ce as createEmpytTexture,
  H as dampThreshold,
  st as dampThresholdVec,
  Ge as easeInBack,
  Me as easeInBounce,
  Xe as easeInCirc,
  ke as easeInCubic,
  Ke as easeInElastic,
  qe as easeInExpo,
  Je as easeInOutBack,
  tt as easeInOutBounce,
  _e as easeInOutCirc,
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
  Ee as easeInSine,
  Ue as easeOutBack,
  ve as easeOutBounce,
  Ye as easeOutCirc,
  We as easeOutCubic,
  Ze as easeOutElastic,
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
