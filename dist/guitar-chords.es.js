var C = (h) => {
  throw TypeError(h);
};
var W = (h, t, i) => t.has(h) || C("Cannot " + i);
var n = (h, t, i) => (W(h, t, "read from private field"), i ? i.call(h) : t.get(h)), u = (h, t, i) => t.has(h) ? C("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(h) : t.set(h, i), p = (h, t, i, e) => (W(h, t, "write to private field"), e ? e.call(h, i) : t.set(h, i), i), m = (h, t, i) => (W(h, t, "access private method"), i);
const F = {
  name: "",
  spacing: 10,
  lineWidth: 4,
  lineSpacing: {
    x: 30,
    y: 50
  },
  color: "#000",
  stringCount: 6,
  fingerRadius: 15,
  startFrets: 0,
  matrix: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ],
  devicePixelRatio: window.devicePixelRatio || 1
};
var l, x, f, c, d, P, T, v, z;
class N {
  constructor(t = {}) {
    u(this, d);
    u(this, l);
    u(this, x);
    u(this, f);
    u(this, c);
    p(this, l, {
      ...F,
      ...t
    });
    const { lineSpacing: i } = n(this, l);
    p(this, x, document.createElement("canvas")), p(this, f, n(this, x).getContext("2d")), p(this, c, i.y);
  }
  get element() {
    return n(this, x);
  }
  get width() {
    const { stringCount: t, lineSpacing: i, lineWidth: e } = n(this, l);
    return i.x * (t + 1) + e * t;
  }
  get height() {
    const { lineSpacing: t, lineWidth: i, matrix: e, spacing: o } = n(this, l);
    return t.y * e.length + i * (e.length + 1) + n(this, c) + o;
  }
  /**
   * 网格尺寸
   */
  get gridSize() {
    const { lineSpacing: t, lineWidth: i, stringCount: e, matrix: o, spacing: r } = n(this, l);
    return {
      width: t.x * (e - 1) + i * e,
      height: t.y * o.length + i * (o.length + 1),
      left: t.x,
      top: n(this, c) + r,
      right: this.width - t.x,
      bottom: this.height
    };
  }
  get info() {
    return {};
  }
  draw() {
    n(this, x).setAttribute("width", this.width.toString()), n(this, x).setAttribute("height", this.height.toString());
    const { startFrets: t, matrix: i } = n(this, l);
    return m(this, d, z).call(this), m(this, d, v).call(this, t), m(this, d, T).call(this, i), m(this, d, P).call(this), this;
  }
}
l = new WeakMap(), x = new WeakMap(), f = new WeakMap(), c = new WeakMap(), d = new WeakSet(), P = function() {
  const { name: t, color: i } = n(this, l), e = n(this, f);
  e.fillStyle = i, e.font = `${n(this, c)}px Arial`, e.textAlign = "center", e.textBaseline = "middle", e.fillText(t, this.width / 2, n(this, c) / 2);
}, T = function(t) {
  const { lineSpacing: i, color: e, lineWidth: o, fingerRadius: r, spacing: S } = n(this, l), s = n(this, f);
  s.fillStyle = e;
  const w = r * 1.5;
  let g = 0;
  for (let a = 0; a < t.length; a++)
    for (let y = 0; y < t[a].length; y++)
      if (g = t[a][y], g > 0) {
        const b = y * (i.x + o) + o / 2 + i.x, A = (a + 0.5) * (i.y + o) + o / 2 + n(this, c) + S;
        s.fillStyle = e, s.beginPath(), s.arc(b, A, r, 0, Math.PI * 2), s.fill(), s.fillStyle = "#ffffff", s.font = `${w}px Arial`, s.textAlign = "center", s.textBaseline = "middle", s.fillText(
          g.toString(),
          b,
          A + o / 2
        );
      }
}, /**
 * 绘制品位数
 * @param startFrets 起始品位
 */
v = function(t) {
  if (!t) return;
  const { color: i, lineWidth: e, lineSpacing: o } = n(this, l), r = n(this, f), S = n(this, c) / 2;
  r.fillStyle = i, r.font = `italic ${S}px Arial`, r.textAlign = "left", r.textBaseline = "middle", r.fillText(
    t.toString(),
    0,
    this.gridSize.top + o.y / 2 + e * 1.5
  );
}, z = function() {
  const { matrix: t, lineWidth: i, lineSpacing: e, color: o, stringCount: r, spacing: S } = n(this, l), s = n(this, f), w = t.length;
  for (let g = 0; g < r; g++) {
    const a = g * (e.x + i) + i / 2 + e.x;
    s.beginPath(), s.moveTo(a, n(this, c) + S), s.lineTo(a, this.height), s.strokeStyle = o, s.lineWidth = i, s.stroke();
  }
  for (let g = 0; g <= w; g++) {
    const a = g * (e.y + i) + i / 2 + n(this, c) + S;
    s.beginPath(), s.moveTo(e.x, a), s.lineTo(this.width - e.x, a), s.strokeStyle = o, s.lineWidth = i, s.stroke();
  }
};
export {
  N as GuitarChords
};
