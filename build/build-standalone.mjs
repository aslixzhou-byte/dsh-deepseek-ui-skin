/**
 * Standalone offline bundle builder for the deepseek-whale skin.
 *
 * The official pipeline is `pnpm build` (tsdown + lightningcss), which needs
 * the npm registry. This script reproduces the exact artifact shape with only
 * Node's built-in `node:module.stripTypeScriptTypes` (Node >= 22.7):
 *
 *   lib/index.js  閳?host-side ESM entry (empty apply).
 *   lib/client.js 閳?the `window.__ModuleLoader__.load({ id, factory })`
 *                   closure bundle the web shell fetches from
 *                   /plugins/<id>/client.js; the module CSS is inlined as a
 *                   <style data-plugin> injection, matching tsdown's output.
 *
 * Run: node build/build-standalone.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { stripTypeScriptTypes } from 'node:module'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const PKG_ID = '@dsh-external/dsh-client-ui-skin-deepseek-whale'
const CSS_FILENAME = 'deepseek-whale.module.css'

/** Strip TS and remove ESM import/export statements so the body is embeddable in the CJS factory. */
function toEmbeddableJs(file, { dropImports = false } = {}) {
  let js = stripTypeScriptTypes(readFileSync(file, 'utf8'), { mode: 'transform' })
  if (dropImports) {
    // Drop import statements and bare export-list statements (`export { a, b }`)
    // but KEEP `export const X = ...` declarations (their value lives on the
    // same line); the export prefix is stripped below.
    js = js
      .split('\n')
      .filter((line) => {
        const trimmed = line.trimStart()
        if (/^import\b/.test(trimmed)) return false
        if (/^export\s*\{/.test(trimmed)) return false
        return true
      })
      .join('\n')
  }
  // Keep local const/function declarations; drop only top-level export markers.
  js = js.replace(/^export\s+/gm, '')
  return js
}

/** Escape a JS string literal body (safe inside double quotes). */
function jsString(value) {
  return JSON.stringify(value)
}

// --- host entry ---
const hostEntry = `//#region src/index.ts
/** Host loader entry for the browser-only skin plugin. */
/** Provides no host-side behavior. */
function apply() {}
//#endregion
export { apply };
`
mkdirSync(join(ROOT, 'lib'), { recursive: true })
writeFileSync(join(ROOT, 'lib/index.js'), hostEntry)

// --- client bundle ---
// official-path.generated.ts and official-wordmark.generated.ts hold the
// official whale glyph and wordmark; whale-art.ts imports both, so all three
// must be inlined (imports are erased by dropImports). The whale backdrop and
// wordmark lockup art were removed from the skin's visible surface, but
// whale-art.ts still supplies the favicon and title-bar brand.
const officialPathJs = toEmbeddableJs(join(ROOT, 'src/client/official-path.generated.ts'), { dropImports: true })
const artJs = toEmbeddableJs(join(ROOT, 'src/client/whale-art.ts'), { dropImports: true })

// The wallpaper is a real raster asset, inlined as a data URI because the
// client bundle is loaded on its own from /plugins/<id>/client.js: a relative
// url() inside this CSS would resolve against that script URL, not against a
// directory the host serves, so a sibling file reference would 404. Inlining
// keeps the skin a single self-contained artifact with no extra route.
//
// Source is WebP q82 at full resolution: the original PNG was 2.55 MB, which
// base64-encodes to ~3.4 MB and would dominate every page load, while the WebP
// is visually indistinguishable at 164 KB. The CSS carries a placeholder token
// that is substituted here, so the stylesheet stays readable in source form.
const BACKGROUND_ASSET = 'src/client/assets/ui-background.webp'
const BACKGROUND_TOKEN = '__DS_UI_BACKGROUND__'
const backgroundDataUri = `data:image/webp;base64,${readFileSync(join(ROOT, BACKGROUND_ASSET)).toString('base64')}`
const cssRaw = readFileSync(join(ROOT, `src/client/${CSS_FILENAME}`), 'utf8')
if (!cssRaw.includes(BACKGROUND_TOKEN)) {
  throw new Error(`build: ${CSS_FILENAME} no longer contains the ${BACKGROUND_TOKEN} placeholder — the wallpaper would silently not be applied`)
}
const cssText = cssRaw.replaceAll(BACKGROUND_TOKEN, backgroundDataUri)

// index.ts: strip TS, inline the art module by removing its import line, and
// swap the CSS side-effect import for the style injection block.
const indexRaw = stripTypeScriptTypes(readFileSync(join(ROOT, 'src/client/index.ts'), 'utf8'), { mode: 'transform' })
const indexLines = indexRaw.split('\n').filter((line) => {
  if (/^import\s+type\s/.test(line)) return false
  if (/from\s+['"]\.\/whale-art\.ts['"]/.test(line)) return false
  return true
})
const indexJs = indexLines
  .map((line) => line.replace(/^import\s+['"]\.\/deepseek-whale\.module\.css['"];\s*$/, '/* css injected below */'))
  .join('\n')
  .replace(/^export\s+/gm, '')

const cssInject = `const css = ${jsString(cssText)};
const tagId = ${jsString(`${PKG_ID}/${CSS_FILENAME}`)};
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
\tconst tag = document.createElement("style");
\ttag.dataset.plugin = ${jsString(PKG_ID)};
\ttag.dataset.pluginCss = tagId;
\ttag.textContent = css;
\tdocument.head.appendChild(tag);
}`

const clientBundle = `window.__ModuleLoader__.load({
\tid: ${jsString(PKG_ID)},
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;
\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region src/client/official-path.generated.ts
${officialPathJs}
		//#endregion
		//#region src/client/whale-art.ts
${artJs}
\t\t//#endregion
\t\t//#region src/client/deepseek-whale.module.css
${cssInject}
\t\t//#endregion
\t\t//#region src/client/index.ts
${indexJs}
\t\t//#endregion
\t\texports.apply = apply;
\t\treturn module.exports;
\t}
});
`
writeFileSync(join(ROOT, 'lib/client.js'), clientBundle)
console.log(`wrote lib/index.js (${hostEntry.length} B) and lib/client.js (${clientBundle.length} B)`)
