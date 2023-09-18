import {
  createBaseVNode,
  createElementBlock,
  defineComponent,
  normalizeStyle,
  openBlock,
  renderSlot
} from "./chunk-B4FRGKU2.js";
import "./chunk-CQXHTUV2.js";

// node_modules/.pnpm/vitepress-api-document-theme@0.0.1/node_modules/vitepress-api-document-theme/dist/vitepress-api-document-theme.es.js
var l = { class: "container-content" };
var d = { class: "left" };
var v = defineComponent({
  __name: "PageDivision",
  props: {
    top: {}
  },
  setup(t) {
    const o = t;
    return (e, s) => (openBlock(), createElementBlock("div", l, [
      createBaseVNode("div", d, [
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
var m = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [s, i] of o)
    e[s] = i;
  return e;
};
var f = m(v, [["__scopeId", "data-v-ac06b912"]]);
export {
  f as PageDivision
};
//# sourceMappingURL=vitepress-api-document-theme.js.map
