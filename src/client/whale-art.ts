/**
 * DeepSeek-brand whale artwork using the OFFICIAL whale glyph extracted from
 * the DeepSeek Harness frontend (the `FishLogo` brand component, viewBox
 * "0 0 23.16 17.04"). The official glyph is a single-color outline whale, so
 * it is re-inked in the brand blues for the skin surfaces; light and dark
 * backdrops share the same official silhouette with different sky, glow, and
 * accent treatment. No redrawn substitute — this is the real DeepSeek whale.
 */
import { OFFICIAL_WHALE_PATH } from './official-path.generated.ts'
import { OFFICIAL_WORDMARK_LETTERS, OFFICIAL_WORDMARK_WHALE } from './official-wordmark.generated.ts'

/** Encode an SVG document into a browser-safe data URI for img src / CSS url(). */
function svgDataUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/** The official whale glyph as a <path> filled with a given paint. */
function officialWhale(paint: string): string {
  return `<path d="${OFFICIAL_WHALE_PATH}" fill="${paint}"/>`
}

/** A scaled official whale group. viewBox is 23.16 x 17.04; scale ~ 1 unit = 1px. */
function officialWhaleGroup(paint: string, scale: number, cx: number, cy: number): string {
  const x = cx - (23.16 * scale) / 2
  const y = cy - (17.04 * scale) / 2
  return `<g transform="translate(${x} ${y}) scale(${scale})">${officialWhale(paint)}</g>`
}

/** Full-viewport light backdrop: pale sky, soft glow, official whale at the horizon. */
const LIGHT_BACKDROP = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f2f6ff"/>
      <stop offset="0.55" stop-color="#e3ecff"/>
      <stop offset="1" stop-color="#d6e4ff"/>
    </linearGradient>
    <linearGradient id="whale" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6e8bff"/>
      <stop offset="1" stop-color="#2e4de6"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.42" r="0.5">
      <stop offset="0" stop-color="#4d6bfe" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#4d6bfe" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1440" height="900" fill="url(#sky)"/>
  <rect width="1440" height="900" fill="url(#glow)"/>
  <g fill="#4d6bfe" opacity="0.5">
    <circle cx="180" cy="180" r="3"/><circle cx="260" cy="120" r="2"/>
    <circle cx="1180" cy="200" r="4"/><circle cx="1280" cy="140" r="2.5"/>
    <circle cx="200" cy="620" r="2"/><circle cx="1220" cy="560" r="3"/>
  </g>
</svg>
`)

/** Full-viewport dark backdrop: deep navy sea, glowing official whale, star specks. */
const DARK_BACKDROP = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#070d24"/>
      <stop offset="0.55" stop-color="#0b1437"/>
      <stop offset="1" stop-color="#101d4d"/>
    </linearGradient>
    <linearGradient id="whale" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8fa6ff"/>
      <stop offset="1" stop-color="#3b5bff"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.42" r="0.55">
      <stop offset="0" stop-color="#4d6bfe" stop-opacity="0.34"/>
      <stop offset="1" stop-color="#4d6bfe" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1440" height="900" fill="url(#sky)"/>
  <rect width="1440" height="900" fill="url(#glow)"/>
  <g fill="#ffffff" opacity="0.55">
    <circle cx="120" cy="120" r="2"/><circle cx="320" cy="80" r="1.5"/>
    <circle cx="520" cy="200" r="2.5"/><circle cx="900" cy="110" r="2"/>
    <circle cx="1100" cy="240" r="1.5"/><circle cx="1330" cy="90" r="2.5"/>
    <circle cx="150" cy="420" r="1.5"/><circle cx="1310" cy="380" r="2"/>
  </g>
</svg>
`)

/** Small sidebar mascot: the official whale in brand blue on transparent canvas. */
const WHALE_MASCOT = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.16 17.04">
  <defs>
    <linearGradient id="m" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6e8bff"/>
      <stop offset="1" stop-color="#2e4de6"/>
    </linearGradient>
  </defs>
  ${officialWhale('url(#m)')}
</svg>
`)

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

/** Large centered brand lockup: the official whale glyph + official DeepSeek
 *  letterforms, laid out exactly as the frontend wordmark (whale left, letters
 *  right), re-inked in the brand-blue gradient. */
const WHALE_LOCKUP_GLYPH = svgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 24">
  <defs>
    <linearGradient id="l" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8fa6ff"/>
      <stop offset="1" stop-color="#4d6bfe"/>
    </linearGradient>
    <clipPath id="wm-whale-clip"><rect width="23.16" height="17.0435" transform="translate(0.141602 3.52185)"/></clipPath>
  </defs>
  <g clip-path="url(#wm-whale-clip)"><path d="${OFFICIAL_WORDMARK_WHALE}" fill="url(#l)"/></g>
  ${OFFICIAL_WORDMARK_LETTERS.map(d => `<path d="${d}" fill="url(#l)"/>`).join('')}
</svg>
`)

export {
  DARK_BACKDROP,
  LIGHT_BACKDROP,
  TITLEBAR_BRAND,
  WHALE_FAVICON,
  WHALE_LOCKUP_GLYPH,
  WHALE_MASCOT,
}
