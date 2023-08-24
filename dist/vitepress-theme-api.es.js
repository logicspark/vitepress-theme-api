import { defineComponent as _, openBlock as i, createElementBlock as p, createElementVNode as n, renderSlot as c, normalizeStyle as a } from "vue";
const l = { class: "container-content" }, d = { class: "left" }, v = /* @__PURE__ */ _({
  __name: "DividePage",
  props: {
    top: {}
  },
  setup(t) {
    const o = t;
    return (e, s) => (i(), p("div", l, [
      n("div", d, [
        c(e.$slots, "left", {}, void 0, !0)
      ]),
      n("div", {
        class: "right",
        style: a({ top: o.top ? `${o.top}px` : "0px" })
      }, [
        c(e.$slots, "right", {}, void 0, !0)
      ], 4)
    ]));
  }
});
const f = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [s, r] of o)
    e[s] = r;
  return e;
}, u = /* @__PURE__ */ f(v, [["__scopeId", "data-v-5f5eb586"]]);
export {
  u as DividePage
};
