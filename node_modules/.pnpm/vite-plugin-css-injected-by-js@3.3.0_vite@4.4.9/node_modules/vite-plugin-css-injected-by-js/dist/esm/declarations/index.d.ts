import type { Plugin } from 'vite';
import type { PluginConfiguration } from './interface';
/**
 * Inject the CSS compiled with JS.
 *
 * @return {Plugin}
 */
export default function cssInjectedByJsPlugin({ cssAssetsFilterFunction, injectCode, injectCodeFunction, jsAssetsFilterFunction, preRenderCSSCode, relativeCSSInjection, styleId, suppressUnusedCssWarning, topExecutionPriority, useStrictCSP, }?: PluginConfiguration | undefined): Plugin;
