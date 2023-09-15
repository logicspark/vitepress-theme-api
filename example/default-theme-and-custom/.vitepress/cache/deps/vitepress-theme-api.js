import {
  createBaseVNode,
  createElementBlock,
  defineComponent,
  normalizeStyle,
  openBlock,
  renderSlot
} from "./chunk-B4FRGKU2.js";

// node_modules/.pnpm/vitepress-theme-api@0.1.3-0_vite@4.4.9/node_modules/vitepress-theme-api/dist/vitepress-theme-api.es.js
var a = { class: "container-content" };
var l = { class: "left" };
var v = defineComponent({
  __name: "DividePage",
  props: {
    top: {}
  },
  setup(t) {
    const o = t;
    return (e, s) => (openBlock(), createElementBlock("div", a, [
      createBaseVNode("div", l, [
        renderSlot(e.$slots, "left", {}, void 0, true)
      ]),
      createBaseVNode("div", {
        class: "right",
        style: normalizeStyle({ top: o.top ? `${o.top}px` : "0px" })
      }, [
        renderSlot(e.$slots, "right", {}, void 0, true)
      ], 4)
    ]));
  }
});
var f = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [s, r] of o)
    e[s] = r;
  return e;
};
var u = f(v, [["__scopeId", "data-v-fdece32b"]]);
export {
  u as DividePage
};
//# sourceMappingURL=vitepress-theme-api.js.map
