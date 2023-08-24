'use strict';

var init = require('./serve-bfd60bc9.cjs');
var path = require('path');
var vite = require('vite');
require('dns');
require('crypto');
require('module');
require('node:path');
require('node:url');
require('node:process');
require('node:fs');
require('util');
require('url');
require('fs');
require('fs/promises');
require('node:events');
require('node:stream');
require('node:string_decoder');
require('os');
require('assert');
require('events');
require('node:readline');
require('stream');
require('buffer');
require('shiki');
require('child_process');
require('minisearch');
require('readline');
require('string_decoder');
require('zlib');
require('tty');
require('net');
require('http');
require('querystring');
require('node:tty');
require('constants');

function createContentLoader(pattern, {
  includeSrc,
  render,
  excerpt: renderExcerpt,
  transform
} = {}) {
  const config = global.VITEPRESS_CONFIG;
  if (!config) {
    throw new Error(
      "content loader invoked without an active vitepress process, or before vitepress config is resolved."
    );
  }
  if (typeof pattern === "string")
    pattern = [pattern];
  pattern = pattern.map((p) => vite.normalizePath(path.join(config.root, p)));
  let md;
  const cache = /* @__PURE__ */ new Map();
  return {
    watch: pattern,
    async load(files) {
      if (!files) {
        files = (await init.glob(pattern, {
          ignore: ["**/node_modules/**", "**/dist/**"]
        })).sort();
      }
      md = md || await init.createMarkdownRenderer(
        config.srcDir,
        config.markdown,
        config.site.base,
        config.logger
      );
      const raw = [];
      for (const file of files) {
        if (!file.endsWith(".md")) {
          continue;
        }
        const timestamp = init.fs.statSync(file).mtimeMs;
        const cached = cache.get(file);
        if (cached && timestamp === cached.timestamp) {
          raw.push(cached.data);
        } else {
          const src = init.fs.readFileSync(file, "utf-8");
          const { data: frontmatter, excerpt } = init.matter(
            src,
            // @ts-expect-error gray-matter types are wrong
            typeof renderExcerpt === "string" ? { excerpt_separator: renderExcerpt } : { excerpt: renderExcerpt }
          );
          const url = "/" + vite.normalizePath(path.relative(config.srcDir, file)).replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, config.cleanUrls ? "" : ".html");
          const html = render ? md.render(src) : void 0;
          const renderedExcerpt = renderExcerpt ? excerpt && md.render(excerpt) : void 0;
          const data = {
            src: includeSrc ? src : void 0,
            html,
            frontmatter,
            excerpt: renderedExcerpt,
            url
          };
          cache.set(file, { data, timestamp });
          raw.push(data);
        }
      }
      return transform ? transform(raw) : raw;
    }
  };
}

exports.ScaffoldThemeType = init.ScaffoldThemeType;
exports.build = init.build;
exports.createMarkdownRenderer = init.createMarkdownRenderer;
exports.createServer = init.createServer;
exports.defineConfig = init.defineConfig;
exports.defineConfigWithTheme = init.defineConfigWithTheme;
exports.defineLoader = init.defineLoader;
exports.init = init.init;
exports.resolveConfig = init.resolveConfig;
exports.resolvePages = init.resolvePages;
exports.resolveSiteData = init.resolveSiteData;
exports.resolveUserConfig = init.resolveUserConfig;
exports.scaffold = init.scaffold;
exports.serve = init.serve;
Object.defineProperty(exports, 'loadEnv', {
  enumerable: true,
  get: function () { return vite.loadEnv; }
});
exports.createContentLoader = createContentLoader;
