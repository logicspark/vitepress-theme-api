"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("./utils.js");
/**
 * Inject the CSS compiled with JS.
 *
 * @return {Plugin}
 */
function cssInjectedByJsPlugin({ cssAssetsFilterFunction, injectCode, injectCodeFunction, jsAssetsFilterFunction, preRenderCSSCode, relativeCSSInjection, styleId, suppressUnusedCssWarning, topExecutionPriority, useStrictCSP, } = {}) {
    let config;
    const topExecutionPriorityFlag = typeof topExecutionPriority == 'boolean' ? topExecutionPriority : true;
    return {
        apply: 'build',
        enforce: 'post',
        name: 'vite-plugin-css-injected-by-js',
        config(config, env) {
            if (env.command === 'build') {
                if (!config.build) {
                    config.build = {};
                }
                if (relativeCSSInjection == true) {
                    if (config.build.cssCodeSplit == false) {
                        config.build.cssCodeSplit = true;
                        (0, utils_js_1.warnLog)(`[vite-plugin-css-injected-by-js] Override of 'build.cssCodeSplit' option to true, it must be true when 'relativeCSSInjection' is enabled.`);
                    }
                }
            }
        },
        configResolved(_config) {
            config = _config;
        },
        generateBundle(opts, bundle) {
            return __awaiter(this, void 0, void 0, function* () {
                if (config.build.ssr) {
                    return;
                }
                const buildCssCode = (cssToInject) => (0, utils_js_1.buildCSSInjectionCode)({
                    cssToInject: typeof preRenderCSSCode == 'function' ? preRenderCSSCode(cssToInject) : cssToInject,
                    styleId,
                    injectCode,
                    injectCodeFunction,
                    useStrictCSP,
                    buildOptions: config.build
                });
                const cssAssetsFilter = (asset) => {
                    return typeof cssAssetsFilterFunction == 'function' ? cssAssetsFilterFunction(asset) : true;
                };
                const cssAssets = Object.keys(bundle).filter((i) => bundle[i].type == 'asset' &&
                    bundle[i].fileName.endsWith('.css') &&
                    cssAssetsFilter(bundle[i]));
                let unusedCssAssets = [];
                if (relativeCSSInjection) {
                    const assetsWithCss = (0, utils_js_1.buildJsCssMap)(bundle, jsAssetsFilterFunction);
                    yield (0, utils_js_1.relativeCssInjection)(bundle, assetsWithCss, buildCssCode, topExecutionPriorityFlag);
                    unusedCssAssets = cssAssets.filter((cssAsset) => !!bundle[cssAsset]);
                    if (!suppressUnusedCssWarning) {
                        // With all used CSS assets now being removed from the bundle, navigate any that have not been linked and output
                        const unusedCssAssetsString = unusedCssAssets.join(',');
                        unusedCssAssetsString.length > 0 &&
                            (0, utils_js_1.warnLog)(`[vite-plugin-css-injected-by-js] Some CSS assets were not included in any known JS: ${unusedCssAssetsString}`);
                    }
                }
                else {
                    yield (0, utils_js_1.globalCssInjection)(bundle, cssAssets, buildCssCode, jsAssetsFilterFunction, topExecutionPriorityFlag);
                }
                (0, utils_js_1.clearImportedCssViteMetadataFromBundle)(bundle, unusedCssAssets);
                const htmlFiles = Object.keys(bundle).filter((i) => i.endsWith('.html'));
                for (const name of htmlFiles) {
                    const htmlChunk = bundle[name];
                    let replacedHtml = htmlChunk.source instanceof Uint8Array
                        ? new TextDecoder().decode(htmlChunk.source)
                        : `${htmlChunk.source}`;
                    cssAssets.forEach(function replaceLinkedStylesheetsHtml(cssName) {
                        if (!unusedCssAssets.includes(cssName)) {
                            replacedHtml = (0, utils_js_1.removeLinkStyleSheets)(replacedHtml, cssName);
                            htmlChunk.source = replacedHtml;
                        }
                    });
                }
            });
        },
    };
}
exports.default = cssInjectedByJsPlugin;
