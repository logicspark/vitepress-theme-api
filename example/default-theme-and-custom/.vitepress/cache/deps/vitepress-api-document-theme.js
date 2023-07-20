import {
  __commonJS,
  __toCommonJS,
  init_vue_runtime_esm_bundler,
  vue_runtime_esm_bundler_exports
} from "./chunk-IBICWNXB.js";

// node_modules/vitepress-api-document-theme/dist/vitepress-api-document-theme.umd.js
var require_vitepress_api_document_theme_umd = __commonJS({
  "node_modules/vitepress-api-document-theme/dist/vitepress-api-document-theme.umd.js"(exports, module) {
    (function(t, e) {
      typeof exports == "object" && typeof module < "u" ? e(exports, (init_vue_runtime_esm_bundler(), __toCommonJS(vue_runtime_esm_bundler_exports))) : typeof define == "function" && define.amd ? define(["exports", "vue"], e) : (t = typeof globalThis < "u" ? globalThis : t || self, e(t.VitePressApiDocumentTheme = {}, t.Vue));
    })(exports, function(t, e) {
      "use strict";
      const c = { class: "container-content" }, r = { class: "left" }, d = e.defineComponent({ __name: "PageDivision", props: { top: {} }, setup(n) {
        const s = n;
        return (o, i) => (e.openBlock(), e.createElementBlock("div", c, [e.createElementVNode("div", r, [e.renderSlot(o.$slots, "left", {}, void 0, true)]), e.createElementVNode("div", { class: "right", style: e.normalizeStyle({ top: s.top ? `${s.top}px` : "0px" }) }, [e.renderSlot(o.$slots, "right", {}, void 0, true)], 4)]));
      } }), l = "", p = ((n, s) => {
        const o = n.__vccOpts || n;
        for (const [i, _] of s)
          o[i] = _;
        return o;
      })(d, [["__scopeId", "data-v-ac06b912"]]);
      t.PageDivision = p, Object.defineProperty(t, Symbol.toStringTag, { value: "Module" });
    });
  }
});
export default require_vitepress_api_document_theme_umd();
//# sourceMappingURL=vitepress-api-document-theme.js.map
