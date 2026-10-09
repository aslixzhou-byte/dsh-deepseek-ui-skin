/**
 * DeepSeek-brand whale artwork using the OFFICIAL whale glyph extracted from
 * the DeepSeek Harness frontend (the `FishLogo` brand component, viewBox
 * "0 0 23.16 17.04"). The official glyph is a single-color outline whale, so
 * it is re-inked in the brand blues for the skin surfaces. No redrawn
 * substitute — this is the real DeepSeek whale.
 *
 * The conversation-pane backdrop and the centered wordmark lockup were removed
 * from the skin, so this module now supplies only the favicon and the
 * frameless title-bar brand.
 */
import { OFFICIAL_WHALE_PATH } from './official-path.generated.ts'

/** Encode an SVG document into a browser-safe data URI for img src / CSS url(). */
function svgDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/** The official whale glyph as a <path> filled with a given paint. */
function officialWhale(paint: string): string {
  return `<path d="${OFFICIAL_WHALE_PATH}" fill="${paint}"/>`
}

/** Favicon: official whale on the deep navy brand tile. */
const WHALE_FAVICON = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.16 17.04">
  <rect x="-2.4" y="-3.2" width="28" height="23.4" rx="4.5" fill="#0b1437"/>
  <defs>
    <linearGradient id="f" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a8baff"/>
      <stop offset="1" stop-color="#6e8bff"/>
    </linearGradient>
  </defs>
  ${officialWhale('url(#f)')}
</svg>
`)

/** Frameless title-bar brand: official whale glyph + DeepSeek wordmark. */
const TITLEBAR_BRAND = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 44">
  <defs>
    <linearGradient id="t" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a8baff"/>
      <stop offset="1" stop-color="#6e8bff"/>
    </linearGradient>
  </defs>
  <g transform="translate(6 8) scale(1.5)">${officialWhale('url(#t)')}</g>
  <text x="46" y="33" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"
        font-size="24" font-weight="700" letter-spacing="0.5" fill="#e7ecf7">DeepSeek Harness</text>
</svg>
`)

export {
  TITLEBAR_BRAND,
  WHALE_FAVICON,
}
