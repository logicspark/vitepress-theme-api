import type { OutputBundle, OutputChunk } from 'rollup';
import type { BuildCSSInjectionConfiguration, PluginConfiguration } from './interface';
interface InjectCodeOptions {
    styleId?: string | (() => string);
    useStrictCSP?: boolean;
}
export type InjectCode = (cssCode: string, options: InjectCodeOptions) => string;
export type InjectCodeFunction = (cssCode: string, options: InjectCodeOptions) => void;
export declare function buildCSSInjectionCode({ cssToInject, styleId, injectCode, injectCodeFunction, useStrictCSP, buildOptions, }: BuildCSSInjectionConfiguration): Promise<OutputChunk | null>;
export declare function removeLinkStyleSheets(html: string, cssFileName: string): string;
export declare function warnLog(msg: string): void;
export declare function debugLog(msg: string): void;
export declare function extractCss(bundle: OutputBundle, cssName: string): string;
export declare function concatCssAndDeleteFromBundle(bundle: OutputBundle, cssAssets: string[]): string;
export declare function buildJsCssMap(bundle: OutputBundle, jsAssetsFilterFunction?: PluginConfiguration['jsAssetsFilterFunction']): Record<string, string[]>;
export declare function getJsTargetBundleKeys(bundle: OutputBundle, jsAssetsFilterFunction?: PluginConfiguration['jsAssetsFilterFunction']): string[];
export declare function relativeCssInjection(bundle: OutputBundle, assetsWithCss: Record<string, string[]>, buildCssCode: (css: string) => Promise<OutputChunk | null>, topExecutionPriorityFlag: boolean): Promise<void>;
export declare function globalCssInjection(bundle: OutputBundle, cssAssets: string[], buildCssCode: (css: string) => Promise<OutputChunk | null>, jsAssetsFilterFunction: PluginConfiguration['jsAssetsFilterFunction'], topExecutionPriorityFlag: boolean): Promise<void>;
export declare function buildOutputChunkWithCssInjectionCode(jsAssetCode: string, cssInjectionCode: string, topExecutionPriorityFlag: boolean): string;
export declare function clearImportedCssViteMetadataFromBundle(bundle: OutputBundle, unusedCssAssets: string[]): void;
export {};
