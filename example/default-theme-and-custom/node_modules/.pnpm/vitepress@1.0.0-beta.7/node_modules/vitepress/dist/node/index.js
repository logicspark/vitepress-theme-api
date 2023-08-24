import { g as glob, c as createMarkdownRenderer, f as fs, m as matter } from './serve-bbb8fb22.js';
export { S as ScaffoldThemeType, k as build, j as createServer, a as defineConfig, b as defineConfigWithTheme, d as defineLoader, l as init, r as resolveConfig, i as resolvePages, h as resolveSiteData, e as resolveUserConfig, n as scaffold, s as serve } from './serve-bbb8fb22.js';
import path from 'path';
import { normalizePath } from 'vite';
export { loadEnv } from 'vite';
import 'dns';
import 'crypto';
import 'module';
import 'node:path';
import 'node:url';
import 'node:process';
import 'node:fs';
import 'util';
import 'url';
import 'fs';
import 'fs/promises';
import 'node:events';
import 'node:stream';
import 'node:string_decoder';
import 'os';
import 'assert';
import 'events';
import 'node:readline';
import 'stream';
import 'buffer';
import 'shiki';
import 'child_process';
import 'minisearch';
import 'readline';
import 'string_decoder';
import 'zlib';
import 'tty';
import 'net';
import 'http';
import 'querystring';
import 'node:tty';
import 'constants';

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
  pattern = pattern.map((p) => normalizePath(path.join(config.root, p)));
  let md;
  const cache = /* @__PURE__ */ new Map();
  return {
    watch: pattern,
    async load(files) {
      if (!files) {
        files = (await glob(pattern, {
          ignore: ["**/node_modules/**", "**/dist/**"]
        })).sort();
      }
      md = md || await createMarkdownRenderer(
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
        const timestamp = fs.statSync(file).mtimeMs;
        const cached = cache.get(file);
        if (cached && timestamp === cached.timestamp) {
          raw.push(cached.data);
        } else {
          const src = fs.readFileSync(file, "utf-8");
          const { data: frontmatter, excerpt } = matter(
            src,
            // @ts-expect-error gray-matter types are wrong
            typeof renderExcerpt === "string" ? { excerpt_separator: renderExcerpt } : { excerpt: renderExcerpt }
          );
          const url = "/" + normalizePath(path.relative(config.srcDir, file)).replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, config.cleanUrls ? "" : ".html");
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

export { createContentLoader, createMarkdownRenderer };
