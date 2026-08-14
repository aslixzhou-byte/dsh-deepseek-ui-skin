/**
 * DeepSeek-style whale skin. The client entry keeps the brand whale backdrop,
 * the permanent centered brand lockup, and the DeepSeek-blue glass chrome as
 * independent layers. The sidebar keeps the product's native vector
 * wordmark; every skin-owned write is restored by the Cordis effect disposer.
 */
import type { Context } from '@deepseek-ai/cordis'
import {
  DARK_BACKDROP,
  LIGHT_BACKDROP,
  TITLEBAR_BRAND,
  WHALE_FAVICON,
  WHALE_LOCKUP_GLYPH,
} from './whale-art.ts'
import './deepseek-whale.module.css'

const SKIN_TITLE = 'DeepSeek 蓝鲸 · DeepSeek Harness'
const SKIN_OWNER = 'deepseek-whale'
const SKIN_SYSTEM_CHROME_COLOR = '#0b1437'
const SIDEBAR_COLUMN_SELECTOR = ":is([data-pane='sidebar'], [class*='sidebarCol'])"

const BACKDROP_PROPERTIES = [
  'background-image',
  'background-position',
  'background-size',
  'background-attachment',
  'background-repeat',
  '--ds-whale-favicon-art',
  '--ds-whale-backdrop-art',
] as const

/**
 * Place the whale wordmark at the left of the frameless title bar
 * (Web-app overlay / desktop shell), mirroring the sidebar brand.
 */
function decorateTitlebarBrand(ownedNodes: Set<Element>): void {
  const titlebar = document.querySelector<HTMLElement>("[class*='titlebar']")
  if (!titlebar) return
  if (titlebar.querySelector("[data-skin-chrome='titlebar-brand']")) return
  const brand = document.createElement('span')
  brand.dataset.skinChrome = 'titlebar-brand'
  brand.dataset.skinOwner = SKIN_OWNER
  brand.setAttribute('aria-hidden', 'true')
  const img = document.createElement('img')
  img.alt = ''
  img.src = TITLEBAR_BRAND
  brand.append(img)
  ownedNodes.add(brand)
  titlebar.prepend(brand)
}

/** The sidebar keeps the product's native brand; no skin-owned mascot. */
function decorateSidebar(): void {}

/**
 * Centered brand lockup for the conversation pane: the official whale +
 * DeepSeek wordmark (one combined glyph), seated at the middle of the
 * right-hand pane and given an edge glow plus a hover motion (scale + bloom)
 * by the stylesheet.
 */
function createBrandLockup(): HTMLDivElement {
  const lockup = document.createElement('div')
  lockup.dataset.skinChrome = 'brand-lockup'
  lockup.dataset.skinOwner = SKIN_OWNER
  lockup.setAttribute('aria-hidden', 'true')

  const glyph = document.createElement('img')
  glyph.dataset.brandGlyph = 'lockup'
  glyph.alt = ''
  glyph.src = WHALE_LOCKUP_GLYPH

  lockup.append(glyph)
  return lockup
}

/**
 * Particle waterline: a band of blue light motes pinned to the viewport
 * floor, each drifting from the left edge to the right on its own delay,
 * duration, height, and size — a continuous left-to-right particle flow
 * instead of a wave.
 */
function createBottomWaves(): HTMLDivElement {
  const waves = document.createElement('div')
  waves.dataset.skinChrome = 'bottom-waves'
  waves.dataset.skinOwner = SKIN_OWNER
  waves.setAttribute('aria-hidden', 'true')

  // Deterministic pseudo-random spread so the shower is stable per load.
  const seeded = (index: number): number => {
    const x = Math.sin(index * 127.1 + 311.7) * 43758.5453
    return x - Math.floor(x)
  }
  const COUNT = 18
  for (let i = 0; i < COUNT; i++) {
    const mote = document.createElement('span')
    mote.dataset.skinParticle = ''
    const size = 2 + seeded(i) * 3.5
    const duration = 5.5 + seeded(i + 7) * 7
    const delay = -seeded(i + 13) * duration
    const top = 2 + seeded(i + 3) * 40
    const opacity = 0.25 + seeded(i + 17) * 0.55
    mote.style.setProperty('--ds-mote-size', `${size.toFixed(2)}px`)
    mote.style.setProperty('--ds-mote-duration', `${duration.toFixed(2)}s`)
    mote.style.setProperty('--ds-mote-delay', `${delay.toFixed(2)}s`)
    mote.style.setProperty('--ds-mote-top', `${top.toFixed(1)}px`)
    mote.style.setProperty('--ds-mote-opacity', opacity.toFixed(2))
    waves.append(mote)
  }
  return waves
}

/**
 * Apply the skin-owned background and chrome.
 * @param ctx - owning context whose effect retracts every DOM and CSS write.
 */
export function apply(ctx: Context): void {
  const body = document.body
  const originalTitle = document.title
  const previous = new Map<string, string>()
  for (const property of BACKDROP_PROPERTIES) {
    previous.set(property, body.style.getPropertyValue(property))
  }

  const ownedNodes = new Set<Element>()
  let themeColorMeta: HTMLMetaElement | null = null
  let previousThemeColor: string | undefined
  let themeColorObserver: MutationObserver | undefined
  let observer: MutationObserver | undefined
  let syncBackdrop: (() => void) | undefined

  ctx.effect(() => () => {
    delete body.dataset.dshDeepseekWhale
    observer?.disconnect()
    themeColorObserver?.disconnect()
    for (const [property, value] of previous) {
      body.style.setProperty(property, value)
    }
    ownedNodes.forEach(element => element.remove())
    if (themeColorMeta?.isConnected && themeColorMeta.content === SKIN_SYSTEM_CHROME_COLOR) {
      themeColorMeta.content = previousThemeColor ?? ''
    }
    if (document.title === SKIN_TITLE) document.title = originalTitle
  }, 'ui-skin-deepseek-whale: whale backdrop and glass chrome')

  const syncSystemChrome = (): void => {
    const meta = document.head.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (meta === null) return
    if (meta !== themeColorMeta) {
      themeColorMeta = meta
      previousThemeColor = meta.content
    }
    if (meta.content !== SKIN_SYSTEM_CHROME_COLOR) meta.content = SKIN_SYSTEM_CHROME_COLOR
  }
  themeColorObserver = new MutationObserver(syncSystemChrome)
  themeColorObserver.observe(document.head, {
    attributes: true,
    attributeFilter: ['content'],
    childList: true,
    subtree: true,
  })
  syncSystemChrome()

  body.dataset.dshDeepseekWhale = ''
  body.style.setProperty('--ds-whale-favicon-art', `url(${WHALE_FAVICON})`)

  syncBackdrop = (): void => {
    const source = body.hasAttribute('data-ds-dark-theme') ? DARK_BACKDROP : LIGHT_BACKDROP
    body.style.setProperty('background-image', `url(${source})`)
    body.style.setProperty('--ds-whale-backdrop-art', `url(${source})`)
  }
  syncBackdrop()
  body.style.setProperty('background-position', 'center')
  body.style.setProperty('background-size', 'cover')
  body.style.setProperty('background-attachment', 'fixed')
  body.style.setProperty('background-repeat', 'no-repeat')

  decorateTitlebarBrand(ownedNodes)
  decorateSidebar()

  // The centered brand lockup lives on the page background; the stylesheet
  // shows it in the hero phase and hides it once a conversation is active
  // (via :has([data-phase='active'])), so the JS only seats it once.
  let brandLockup: HTMLDivElement | undefined
  const ensureBrandLockup = (): void => {
    if (brandLockup !== undefined) return
    brandLockup = createBrandLockup()
    ownedNodes.add(brandLockup)
    body.append(brandLockup)
  }
  const syncBrandLockup = (): void => {
    ensureBrandLockup()
  }
  ensureBrandLockup()

  // The animated waterline: pinned to the viewport floor, above the backdrop
  // art and below the conversation content.
  const bottomWaves = createBottomWaves()
  ownedNodes.add(bottomWaves)
  body.append(bottomWaves)

  const syncDecorations = (): void => {
    decorateTitlebarBrand(ownedNodes)
    decorateSidebar()
  }

  const isSkinChrome = (node: Node): boolean => (
    node instanceof Element && node.getAttribute('data-skin-owner') === SKIN_OWNER
  )
  const nodeTouches = (node: Node, selector: string): boolean => (
    node instanceof Element && (node.matches(selector) || node.querySelector(selector) !== null)
  )
  const sidebarChromeSelector = `${SIDEBAR_COLUMN_SELECTOR}, [class*='titlebar']`

  observer = new MutationObserver((records) => {
    let sidebarStructureChanged = false
    let backdropChanged = false
    let phaseChanged = false
    for (const record of records) {
      if (record.type === 'attributes') {
        if (record.attributeName === 'data-ds-dark-theme' && record.target === body) {
          backdropChanged = true
        } else if (record.attributeName === 'data-phase' && record.target instanceof Element) {
          phaseChanged = true
        }
        continue
      }
      const appNodes = [...record.addedNodes, ...record.removedNodes]
        .filter(node => node instanceof Element && !isSkinChrome(node))
      const target = record.target instanceof Element ? record.target : undefined
      if (appNodes.length > 0 && (appNodes.some(node => nodeTouches(node, sidebarChromeSelector))
        || (target !== undefined && target.closest(SIDEBAR_COLUMN_SELECTOR) !== null))) {
        sidebarStructureChanged = true
      }
      if (appNodes.length > 0 && appNodes.some(node => nodeTouches(node, "[data-phase='hero'], [data-phase='active']"))) {
        phaseChanged = true
      }
    }
    if (sidebarStructureChanged) syncDecorations()
    if (backdropChanged) syncBackdrop?.()
    if (phaseChanged) syncBrandLockup()
  })
  observer.observe(body, {
    attributes: true,
    attributeFilter: ['data-ds-dark-theme', 'data-phase'],
    childList: true,
    subtree: true,
  })

  const favicon = document.createElement('link')
  favicon.rel = 'icon'
  favicon.type = 'image/svg+xml'
  favicon.href = WHALE_FAVICON
  favicon.dataset.skinChrome = 'favicon'
  favicon.dataset.skinOwner = SKIN_OWNER
  ownedNodes.add(favicon)
  document.head.append(favicon)

  document.title = SKIN_TITLE
}
