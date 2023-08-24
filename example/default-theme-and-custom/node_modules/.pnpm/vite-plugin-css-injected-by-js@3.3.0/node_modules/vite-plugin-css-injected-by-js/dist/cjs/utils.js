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
exports.clearImportedCssViteMetadataFromBundle = exports.buildOutputChunkWithCssInjectionCode = exports.globalCssInjection = exports.relativeCssInjection = exports.getJsTargetBundleKeys = exports.buildJsCssMap = exports.concatCssAndDeleteFromBundle = exports.extractCss = exports.debugLog = exports.warnLog = exports.removeLinkStyleSheets = exports.buildCSSInjectionCode = void 0;
const vite_1 = require("vite");
const cssInjectedByJsId = '\0vite/all-css';
const defaultInjectCode = (cssCode, { styleId, useStrictCSP }) => `try{if(typeof document != 'undefined'){var elementStyle = document.createElement('style');${typeof styleId == 'string' && styleId.length > 0 ? `elementStyle.id = '${styleId}';` : ''}${useStrictCSP ? `elementStyle.nonce = document.head.querySelector('meta[property=csp-nonce]')?.content;` : ''}elementStyle.appendChild(document.createTextNode(${cssCode}));document.head.appendChild(elementStyle);}}catch(e){console.error('vite-plugin-css-injected-by-js', e);}`;
function buildCSSInjectionCode({ cssToInject, styleId, injectCode, injectCodeFunction, useStrictCSP, buildOptions, }) {
    return __awaiter(this, void 0, void 0, function* () {
        let { minify, target } = buildOptions;
        const generatedStyleId = typeof styleId === 'function' ? styleId() : styleId;
        const res = yield (0, vite_1.build)({
            root: '',
            configFile: false,
            logLevel: 'error',
            plugins: [injectionCSSCodePlugin({
                    cssToInject,
                    styleId: generatedStyleId,
                    injectCode,
                    injectCodeFunction,
                    useStrictCSP
                })],
            build: {
                write: false,
                target,
                minify,
                assetsDir: '',
                rollupOptions: {
                    input: {
                        ['all-css']: cssInjectedByJsId,
                    },
                    output: {
                        format: 'iife',
                        manualChunks: undefined,
                    },
                },
            },
        });
        const _cssChunk = Array.isArray(res) ? res[0] : res;
        if (!('output' in _cssChunk))
            return null;
        return _cssChunk.output[0];
    });
}
exports.buildCSSInjectionCode = buildCSSInjectionCode;
function injectionCSSCodePlugin({ cssToInject, injectCode, injectCodeFunction, styleId, useStrictCSP, }) {
    return {
        name: 'vite:injection-css-code-plugin',
        resolveId(id) {
            if (id == cssInjectedByJsId) {
                return id;
            }
        },
        load(id) {
            if (id == cssInjectedByJsId) {
                const cssCode = JSON.stringify(cssToInject.trim());
                if (injectCodeFunction) {
                    return `(${injectCodeFunction})(${cssCode}, ${JSON.stringify({ styleId, useStrictCSP })})`;
                }
                const injectFunction = injectCode || defaultInjectCode;
                return injectFunction(cssCode, { styleId, useStrictCSP });
            }
        },
    };
}
function removeLinkStyleSheets(html, cssFileName) {
    const removeCSS = new RegExp(`<link rel=".*"[^>]*?href=".*/?${cssFileName}"[^>]*?>`);
    return html.replace(removeCSS, '');
}
exports.removeLinkStyleSheets = removeLinkStyleSheets;
/* istanbul ignore next -- @preserve */
function warnLog(msg) {
    console.warn(`\x1b[33m \n${msg} \x1b[39m`);
}
exports.warnLog = warnLog;
/* istanbul ignore next -- @preserve */
function debugLog(msg) {
    console.debug(`\x1b[34m \n${msg} \x1b[39m`);
}
exports.debugLog = debugLog;
function isJsOutputChunk(chunk) {
    return chunk.type == 'chunk' && chunk.fileName.match(/.[cm]?js(?:\?.+)?$/) != null;
}
function defaultJsAssetsFilter(chunk) {
    return chunk.isEntry && !chunk.fileName.includes('polyfill');
}
// The cache must be global since execution context is different every entry
const cssSourceCache = {};
function extractCss(bundle, cssName) {
    var _a;
    const cssAsset = bundle[cssName];
    if (cssAsset !== undefined && cssAsset.source) {
        const cssSource = cssAsset.source;
        // We treat these as strings and coerce them implicitly to strings, explicitly handle conversion
        cssSourceCache[cssName] =
            cssSource instanceof Uint8Array ? new TextDecoder().decode(cssSource) : `${cssSource}`;
    }
    return (_a = cssSourceCache[cssName]) !== null && _a !== void 0 ? _a : '';
}
exports.extractCss = extractCss;
function concatCssAndDeleteFromBundle(bundle, cssAssets) {
    return cssAssets.reduce(function extractCssAndDeleteFromBundle(previous, cssName) {
        const cssSource = extractCss(bundle, cssName);
        delete bundle[cssName];
        return previous + cssSource;
    }, '');
}
exports.concatCssAndDeleteFromBundle = concatCssAndDeleteFromBundle;
function buildJsCssMap(bundle, jsAssetsFilterFunction) {
    const chunksWithCss = {};
    const bundleKeys = getJsTargetBundleKeys(bundle, typeof jsAssetsFilterFunction == 'function' ? jsAssetsFilterFunction : () => true);
    if (bundleKeys.length === 0) {
        throw new Error('Unable to locate the JavaScript asset for adding the CSS injection code. It is recommended to review your configurations.');
    }
    for (const key of bundleKeys) {
        const chunk = bundle[key];
        if (chunk.type === 'asset' || !chunk.viteMetadata || chunk.viteMetadata.importedCss.size === 0) {
            continue;
        }
        const chunkStyles = chunksWithCss[key] || [];
        chunkStyles.push(...chunk.viteMetadata.importedCss.values());
        chunksWithCss[key] = chunkStyles;
    }
    return chunksWithCss;
}
exports.buildJsCssMap = buildJsCssMap;
function getJsTargetBundleKeys(bundle, jsAssetsFilterFunction) {
    if (typeof jsAssetsFilterFunction != 'function') {
        const jsAssets = Object.keys(bundle).filter((i) => {
            const asset = bundle[i];
            return isJsOutputChunk(asset) && defaultJsAssetsFilter(asset);
        });
        if (jsAssets.length == 0) {
            return [];
        }
        const jsTargetFileName = jsAssets[jsAssets.length - 1];
        if (jsAssets.length > 1) {
            warnLog(`[vite-plugin-css-injected-by-js] has identified "${jsTargetFileName}" as one of the multiple output files marked as "entry" to put the CSS injection code.` +
                'However, if this is not the intended file to add the CSS injection code, you can use the "jsAssetsFilterFunction" parameter to specify the desired output file (read docs).');
            if (process.env.VITE_CSS_INJECTED_BY_JS_DEBUG) {
                const jsAssetsStr = jsAssets.join(', ');
                debugLog(`[vite-plugin-css-injected-by-js] identified js file targets: ${jsAssetsStr}. Selected "${jsTargetFileName}".\n`);
            }
        }
        // This should be always the root of the application
        return [jsTargetFileName];
    }
    const chunkFilter = ([_key, chunk]) => isJsOutputChunk(chunk) && jsAssetsFilterFunction(chunk);
    return Object.entries(bundle)
        .filter(chunkFilter)
        .map(function extractAssetKeyFromBundleEntry([key]) {
        return key;
    });
}
exports.getJsTargetBundleKeys = getJsTargetBundleKeys;
function relativeCssInjection(bundle, assetsWithCss, buildCssCode, topExecutionPriorityFlag) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        for (const [jsAssetName, cssAssets] of Object.entries(assetsWithCss)) {
            process.env.VITE_CSS_INJECTED_BY_JS_DEBUG &&
                debugLog(`[vite-plugin-css-injected-by-js] Relative CSS: ${jsAssetName}: [ ${cssAssets.join(',')} ]`);
            const assetCss = concatCssAndDeleteFromBundle(bundle, cssAssets);
            const cssInjectionCode = assetCss.length > 0 ? (_a = (yield buildCssCode(assetCss))) === null || _a === void 0 ? void 0 : _a.code : '';
            // We have already filtered these chunks to be RenderedChunks
            const jsAsset = bundle[jsAssetName];
            jsAsset.code = buildOutputChunkWithCssInjectionCode(jsAsset.code, cssInjectionCode !== null && cssInjectionCode !== void 0 ? cssInjectionCode : '', topExecutionPriorityFlag);
        }
    });
}
exports.relativeCssInjection = relativeCssInjection;
const globalCSSCodeEntryCache = new Map();
let previousFacadeModuleId = '';
function globalCssInjection(bundle, cssAssets, buildCssCode, jsAssetsFilterFunction, topExecutionPriorityFlag) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const jsTargetBundleKeys = getJsTargetBundleKeys(bundle, jsAssetsFilterFunction);
        if (jsTargetBundleKeys.length == 0) {
            throw new Error('Unable to locate the JavaScript asset for adding the CSS injection code. It is recommended to review your configurations.');
        }
        process.env.VITE_CSS_INJECTED_BY_JS_DEBUG &&
            debugLog(`[vite-plugin-css-injected-by-js] Global CSS Assets: [${cssAssets.join(',')}]`);
        const allCssCode = concatCssAndDeleteFromBundle(bundle, cssAssets);
        let cssInjectionCode = '';
        if (allCssCode.length > 0) {
            const cssCode = (_a = (yield buildCssCode(allCssCode))) === null || _a === void 0 ? void 0 : _a.code;
            if (typeof cssCode == 'string') {
                cssInjectionCode = cssCode;
            }
        }
        for (const jsTargetKey of jsTargetBundleKeys) {
            const jsAsset = bundle[jsTargetKey];
            /**
             * Since it creates the assets once sequential builds for the same entry point
             * (for example when multiple formats of same entry point are built),
             * we need to reuse the same CSS created the first time.
             */
            if (jsAsset.facadeModuleId != null && jsAsset.isEntry && cssInjectionCode != '') {
                if (jsAsset.facadeModuleId != previousFacadeModuleId) {
                    globalCSSCodeEntryCache.clear();
                }
                previousFacadeModuleId = jsAsset.facadeModuleId;
                globalCSSCodeEntryCache.set(jsAsset.facadeModuleId, cssInjectionCode);
            }
            if (cssInjectionCode == '' &&
                jsAsset.isEntry &&
                jsAsset.facadeModuleId != null &&
                typeof globalCSSCodeEntryCache.get(jsAsset.facadeModuleId) == 'string') {
                cssInjectionCode = globalCSSCodeEntryCache.get(jsAsset.facadeModuleId);
            }
            process.env.VITE_CSS_INJECTED_BY_JS_DEBUG &&
                debugLog(`[vite-plugin-css-injected-by-js] Global CSS inject: ${jsAsset.fileName}`);
            jsAsset.code = buildOutputChunkWithCssInjectionCode(jsAsset.code, cssInjectionCode !== null && cssInjectionCode !== void 0 ? cssInjectionCode : '', topExecutionPriorityFlag);
        }
    });
}
exports.globalCssInjection = globalCssInjection;
function buildOutputChunkWithCssInjectionCode(jsAssetCode, cssInjectionCode, topExecutionPriorityFlag) {
    const appCode = jsAssetCode.replace(/\/\*.*empty css.*\*\//, '');
    jsAssetCode = topExecutionPriorityFlag ? '' : appCode;
    jsAssetCode += cssInjectionCode;
    jsAssetCode += !topExecutionPriorityFlag ? '' : appCode;
    return jsAssetCode;
}
exports.buildOutputChunkWithCssInjectionCode = buildOutputChunkWithCssInjectionCode;
function clearImportedCssViteMetadataFromBundle(bundle, unusedCssAssets) {
    // Required to exclude removed files from manifest.json
    for (const key in bundle) {
        const chunk = bundle[key];
        if (chunk.viteMetadata && chunk.viteMetadata.importedCss.size > 0) {
            const importedCssFileNames = chunk.viteMetadata.importedCss;
            importedCssFileNames.forEach((importedCssFileName) => {
                if (!unusedCssAssets.includes(importedCssFileName) && chunk.viteMetadata) {
                    chunk.viteMetadata.importedCss = new Set();
                }
            });
        }
    }
}
exports.clearImportedCssViteMetadataFromBundle = clearImportedCssViteMetadataFromBundle;
