/**
 * DeepSeek-style whale skin. The client entry keeps the DeepSeek-blue glass
 * chrome as the only visual layer: the conversation pane stays clean, with no
 * whale artwork on the page itself. The sidebar keeps the product's native
 * vector wordmark; every skin-owned write is restored by the Cordis effect
 * disposer.
 */
import type { Context } from '@deepseek-ai/cordis'
import {
  TITLEBAR_BRAND,
  WHALE_FAVICON,
} from './whale-art.ts'
import './deepseek-whale.module.css'

const SKIN_TITLE = 'DeepSeek 蓝鲸 · DeepSeek Harness'
const SKIN_OWNER = 'deepseek-whale'
const SKIN_SYSTEM_CHROME_COLOR = '#0b1437'
const SIDEBAR_COLUMN_SELECTOR = ":is([data-pane='sidebar'], [class*='sidebarCol'])"

/** Body inline styles the skin writes and must restore verbatim on dispose. */
const BACKDROP_PROPERTIES = [
  'background-image',
  'background-position',
  'background-size',
  'background-attachment',
  'background-repeat',
  '--ds-whale-favicon-art',
] as const

/**
 * Depth bands for the particle field, cycled across the motes. Each band is a
 * distinct size/blur/brightness treatment in the stylesheet; the near band is
 * the largest and crispest, the far band the smallest and softest.
 */
const DEPTH_BANDS = ['far', 'mid', 'near'] as const

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
 * Remove the stock WhaleMark brand artwork the shell renders inside the
 * conversation pane (the large whale above the composer), so the pane reads
 * clean while the skin is active. The node carries no stable class of its own,
 * so it is identified by the two things only it has: an inline `--dsh-bg-whale`
 * custom property whose `url()` points at a raw shell logo .svg asset (a
 * URL-shape test, not a build-time package id), and the project's own
 * `whale-mark` class hook. Hidden nodes are recorded so the disposer restores
 * them, and the class hook is also killed in CSS for determinism.
 */
function sweepPaneBrandArt(ownedNodes: Set<Element>): void {
  const byInlineArt = '[style*="--dsh-bg-whale"]'
  const candidates = document.querySelectorAll<HTMLElement>(`${byInlineArt}, [class*='whale-mark']`)
  for (const node of candidates) {
    if (node.closest('[data-skin-owner]') !== null) continue
    const inlineArt = node.style.getPropertyValue('--dsh-bg-whale')
    const paintsShellLogo = /\/assets\/[^"')]*\.svg/.test(inlineArt)
    const isBrandMark = node.matches("[class*='whale-mark']")
    if (!paintsShellLogo && !isBrandMark) continue
    node.dataset.skinHiddenWhale = ''
    node.setAttribute('aria-hidden', 'true')
    node.style.setProperty('display', 'none', 'important')
    ownedNodes.add(node)
  }
}

/**
 * Edge waterline: a band of blue light motes pinned to one horizontal edge of
 * the viewport, each streaming sideways on its own delay, duration, height and
 * size. The bottom band flows left-to-right and the top band right-to-left, so
 * the two edges read as a mirrored pair framing the pane.
 *
 * @param edge - which edge to pin the band to, and thus its flow direction.
 * @returns the band element, filled with its seeded motes.
 */
function createEdgeWaves(edge: 'bottom' | 'top'): HTMLDivElement {
  const waves = document.createElement('div')
  waves.dataset.skinChrome = edge === 'top' ? 'top-waves' : 'bottom-waves'
  waves.dataset.skinOwner = SKIN_OWNER
  waves.setAttribute('aria-hidden', 'true')

  const seeded = (index: number): number => {
    const x = Math.sin(index * 127.1 + 311.7) * 43758.5453
    return x - Math.floor(x)
  }
  // Offset the seed stream per edge so the two bands never mirror mote-for-mote.
  const salt = edge === 'top' ? 97 : 0
  const COUNT = 26
  for (let i = 0; i < COUNT; i++) {
    const k = i + salt
    const mote = document.createElement('span')
    mote.dataset.skinParticle = ''
    const size = 2 + seeded(k) * 3.5
    const duration = 5.5 + seeded(k + 7) * 7
    const delay = -seeded(k + 13) * duration
    const top = 2 + seeded(k + 3) * 40
    const opacity = 0.25 + seeded(k + 17) * 0.55
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
 * Live state of one drifting mote: its home position (viewport fractions), the
 * slow ambient wander around that home, and the pointer-repulsion offset that
 * springs back to zero, which is what produces the push-then-settle behaviour.
 */
interface MoteState {
  readonly node: HTMLSpanElement
  /** Home position as viewport fractions (0..1). */
  readonly hx: number
  readonly hy: number
  /** Ambient wander radius as viewport fractions, per axis. */
  readonly driftX: number
  readonly driftY: number
  /** Phase offsets so motes never wander in lockstep. */
  readonly phaseX: number
  readonly phaseY: number
  /** Wander speed multiplier (also the depth cue: far motes move slowest). */
  readonly speed: number
  /** Current displacement from the pointer force, in pixels. */
  readonly push: { x: number; y: number }
  /** Current push velocity, in px per second (drives the inertial return). */
  readonly vel: { x: number; y: number }
}

/**
 * Full-screen particle field: blue light motes scattered across the whole
 * viewport, each wandering slowly around its own home position. The motes are
 * split into three depth bands (far / mid / near) that differ in size,
 * brightness, blur and wander speed, which is what reads as depth: far motes
 * are small, dim, softly blurred and slowest; near motes are larger, brighter,
 * crisp and quickest.
 *
 * On top of the ambient wander the field is pointer-reactive: a mote inside the
 * pointer's radius is pushed away along the radial vector with a falloff, and
 * springs back with inertia once the pointer moves on. That physics runs in one
 * requestAnimationFrame loop writing only `transform` — a compositor-only
 * property — so it never triggers layout or style recalculation.
 *
 * The wander is deliberately slow and small. A mote travelling visibly would
 * compete with the text it sits behind; the point is a field that is quietly in
 * motion rather than one you watch.
 *
 * @returns the field element, already wired to its own animation loop.
 */
function createParticleField(): HTMLDivElement {
  const field = document.createElement('div')
  field.dataset.skinChrome = 'particle-field'
  field.dataset.skinOwner = SKIN_OWNER
  field.setAttribute('aria-hidden', 'true')

  // Deterministic pseudo-random spread so the field is stable per load.
  const seeded = (index: number): number => {
    const x = Math.sin(index * 127.1 + 311.7) * 43758.5453
    return x - Math.floor(x)
  }

  // Sparse enough that the pane never competes with the text on it, dense
  // enough that the field reads as alive across a large viewport. The two edge
  // bands add their own motes on top of this.
  const COUNT = 44
  const motes: MoteState[] = []
  for (let i = 0; i < COUNT; i++) {
    const node = document.createElement('span')
    node.dataset.skinParticle = ''
    const band = i % DEPTH_BANDS.length
    node.dataset.skinDepth = DEPTH_BANDS[band]

    // Depth reads through pace as well as size: the far band wanders slowest and
    // the near band quickest, on top of the size and blur difference.
    const pace = band === 0 ? 0.55 : band === 1 ? 0.85 : 1.2

    motes.push({
      node,
      hx: seeded(i + 1),
      hy: seeded(i + 41),
      // Wander radius as a viewport share: roughly 1%..3% of the screen. Kept
      // small on purpose — a mote that visibly travels pulls the eye away from
      // the text above it.
      driftX: 0.01 + seeded(i + 7) * 0.02,
      driftY: 0.01 + seeded(i + 23) * 0.02,
      phaseX: seeded(i + 3) * Math.PI * 2,
      phaseY: seeded(i + 29) * Math.PI * 2,
      speed: pace * (0.35 + seeded(i + 13) * 0.5),
      push: { x: 0, y: 0 },
      vel: { x: 0, y: 0 },
    })
    node.style.setProperty('--ds-mote-opacity', (0.3 + seeded(i + 17) * 0.55).toFixed(2))
    field.append(node)
  }

  // --- pointer force -------------------------------------------------------
  // The pointer is tracked in viewport pixels; -1 means "not over the window",
  // which lets every mote spring home instead of freezing mid-push.
  let pointerX = -1
  let pointerY = -1
  /** Repulsion radius in px; motes further away than this are untouched. */
  const RADIUS = 190
  const RADIUS_SQ = RADIUS * RADIUS
  /** Peak repulsion acceleration at zero distance, in px/s^2. */
  const FORCE = 2600
  /** Spring constant pulling a displaced mote home, in 1/s^2. */
  const SPRING = 34
  /**
   * Velocity damping, expressed as the time for a free mote to lose half its
   * speed. This must be a frame-rate-independent exponential decay: the
   * naive `vel *= 1 - DAMPING * dt` form silently zeroes velocity outright
   * once `DAMPING * dt >= 1` (at 60fps that is DAMPING >= 60), which welds
   * every mote in place instead of damping it.
   */
  const VELOCITY_HALF_LIFE = 0.3
  /**
   * Below this offset (px) the pointer push is snapped to exactly zero. Without
   * it a returning mote approaches zero asymptotically and never quite arrives,
   * leaving a permanent sub-pixel offset on every mote that was ever pushed.
   */
  const REST_OFFSET = 0.3

  let rafId = 0
  let last = performance.now()
  let width = window.innerWidth
  let height = window.innerHeight

  // The loop now runs continuously: ambient wander means the field is always
  // moving, so there is no settled state to park in. Pointer handlers only
  // record the position.
  const onPointerMove = (event: PointerEvent): void => {
    pointerX = event.clientX
    pointerY = event.clientY
  }
  const onPointerLeave = (): void => {
    // -1 means "not over the window", which stops new pushes and lets every
    // displaced mote spring back home from wherever the pointer left it.
    pointerX = -1
    pointerY = -1
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerleave', onPointerLeave, { passive: true })
  window.addEventListener('blur', onPointerLeave)

  // Honour the OS reduced-motion preference: paint one static frame and never
  // start the loop, so a motion-sensitive user gets the field's atmosphere
  // without any animation at all.
  const reducedMotion = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const measure = (): void => {
    width = window.innerWidth
    height = window.innerHeight
  }
  window.addEventListener('resize', measure, { passive: true })

  const step = (now: number): void => {
    // Clamp dt so a backgrounded tab (or a long GC pause) cannot fling every
    // mote across the screen when the loop resumes.
    const dt = Math.min((now - last) / 1000, 0.05)
    last = now
    const t = now / 1000

    for (const mote of motes) {
      // Pointer repulsion, accumulated as a velocity so the push carries
      // inertia instead of snapping the mote to a fixed offset.
      if (pointerX >= 0) {
        const cx = mote.hx * width + mote.push.x
        const cy = mote.hy * height + mote.push.y
        const dx = cx - pointerX
        const dy = cy - pointerY
        const distSq = dx * dx + dy * dy
        if (distSq < RADIUS_SQ) {
          const dist = Math.sqrt(distSq) || 0.0001
          // Quadratic falloff: strong up close, gentle at the rim.
          const falloff = 1 - dist / RADIUS
          const accel = FORCE * falloff * falloff
          mote.vel.x += (dx / dist) * accel * dt
          mote.vel.y += (dy / dist) * accel * dt
        }
      }

      // Spring back home plus damping — the "inertial return".
      mote.vel.x += -SPRING * mote.push.x * dt
      mote.vel.y += -SPRING * mote.push.y * dt
      const decay = Math.pow(0.5, dt / VELOCITY_HALF_LIFE)
      mote.vel.x *= decay
      mote.vel.y *= decay
      mote.push.x += mote.vel.x * dt
      mote.push.y += mote.vel.y * dt

      // Snap the pointer offset to zero once it is imperceptible, so a returning
      // mote reaches rest rather than creeping by sub-pixel amounts.
      if (mote.push.x < REST_OFFSET && mote.push.x > -REST_OFFSET
        && mote.push.y < REST_OFFSET && mote.push.y > -REST_OFFSET) {
        mote.push.x = 0
        mote.push.y = 0
        mote.vel.x = 0
        mote.vel.y = 0
      }

      // Ambient wander: a slow Lissajous around the home position, giving the
      // field continuous life of its own. The two axes run at slightly different
      // rates (0.83) so the path drifts instead of retracing an ellipse.
      const driftPxX = Math.sin(t * mote.speed + mote.phaseX) * mote.driftX * width
      const driftPxY = Math.cos(t * mote.speed * 0.83 + mote.phaseY) * mote.driftY * height

      const x = mote.hx * width + driftPxX + mote.push.x
      const y = mote.hy * height + driftPxY + mote.push.y
      mote.node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
    }

    rafId = requestAnimationFrame(step)
  }

  // Paint one frame synchronously so motes are placed before the first
  // animation frame, rather than all appearing stacked at the origin.
  measure()
  const t0 = performance.now() / 1000
  for (const mote of motes) {
    const x = mote.hx * width + Math.sin(t0 * mote.speed + mote.phaseX) * mote.driftX * width
    const y = mote.hy * height + Math.cos(t0 * mote.speed * 0.83 + mote.phaseY) * mote.driftY * height
    mote.node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
  }

  // Reduced motion gets the static placement above and nothing more: the loop
  // never starts, so the pointer cannot move a mote either.
  if (!reducedMotion) rafId = requestAnimationFrame(step)

  /** Stop the loop and detach every listener (called from the effect disposer). */
  field.addEventListener('skin:teardown', () => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerleave', onPointerLeave)
    window.removeEventListener('blur', onPointerLeave)
    window.removeEventListener('resize', measure)
  }, { once: true })

  return field
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

  ctx.effect(() => () => {
    delete body.dataset.dshDeepseekWhale
    observer?.disconnect()
    themeColorObserver?.disconnect()
    for (const [property, value] of previous) {
      body.style.setProperty(property, value)
    }
    // Swept shell nodes are restored in place; skin-owned nodes are removed.
    // The particle field owns a RAF loop and window listeners, so it is asked
    // to tear itself down before its element leaves the document.
    for (const element of ownedNodes) {
      element.dispatchEvent(new CustomEvent('skin:teardown'))
      if (!(element instanceof HTMLElement) || !element.hasAttribute('data-skin-hidden-whale')) {
        element.remove()
        continue
      }
      delete element.dataset.skinHiddenWhale
      element.removeAttribute('aria-hidden')
      element.style.removeProperty('display')
    }
    if (themeColorMeta?.isConnected && themeColorMeta.content === SKIN_SYSTEM_CHROME_COLOR) {
      themeColorMeta.content = previousThemeColor ?? ''
    }
    if (document.title === SKIN_TITLE) document.title = originalTitle
  }, 'ui-skin-deepseek-whale: clean pane and glass chrome')

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

  // No backdrop art: the pane keeps only the skin's own flat surface colors
  // from the stylesheet, so the conversation area stays clean.
  decorateTitlebarBrand(ownedNodes)
  decorateSidebar()
  sweepPaneBrandArt(ownedNodes)

  // Three skin-owned particle layers. The sparse full-screen field sits between
  // the two waterlines; the bottom band flows left-to-right and the top band
  // right-to-left, framing the pane as a mirrored pair.
  const particleField = createParticleField()
  ownedNodes.add(particleField)
  body.append(particleField)

  const topWaves = createEdgeWaves('top')
  ownedNodes.add(topWaves)
  body.append(topWaves)

  const bottomWaves = createEdgeWaves('bottom')
  ownedNodes.add(bottomWaves)
  body.append(bottomWaves)

  const syncDecorations = (): void => {
    decorateTitlebarBrand(ownedNodes)
    decorateSidebar()
    sweepPaneBrandArt(ownedNodes)
  }

  const isSkinChrome = (node: Node): boolean => (
    node instanceof Element && node.getAttribute('data-skin-owner') === SKIN_OWNER
  )
  const nodeTouches = (node: Node, selector: string): boolean => (
    node instanceof Element && (node.matches(selector) || node.querySelector(selector) !== null)
  )
  const sidebarChromeSelector = `${SIDEBAR_COLUMN_SELECTOR}, [class*='titlebar']`
  const paneBrandSelector = "[style*='--dsh-bg-whale'], [class*='whale-mark']"

  observer = new MutationObserver((records) => {
    let sidebarStructureChanged = false
    let paneBrandAppeared = false
    for (const record of records) {
      if (record.type === 'attributes') continue
      const appNodes = [...record.addedNodes, ...record.removedNodes]
        .filter(node => node instanceof Element && !isSkinChrome(node))
      const target = record.target instanceof Element ? record.target : undefined
      if (appNodes.length > 0 && (appNodes.some(node => nodeTouches(node, sidebarChromeSelector))
        || (target !== undefined && target.closest(SIDEBAR_COLUMN_SELECTOR) !== null))) {
        sidebarStructureChanged = true
      }
      // The shell re-renders its pane brand on navigation; each fresh mount
      // must be swept again, so any insertion into the pane is a trigger.
      if (appNodes.length > 0 && (appNodes.some(node => nodeTouches(node, paneBrandSelector))
        || appNodes.some(node => nodeTouches(node, "[data-phase='hero'], [data-phase='active']")))) {
        paneBrandAppeared = true
      }
    }
    if (sidebarStructureChanged || paneBrandAppeared) syncDecorations()
  })
  observer.observe(body, {
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
