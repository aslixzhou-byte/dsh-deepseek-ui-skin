// @vitest-environment jsdom
/**
 * DeepSeek Leviathan skin apply spec — the template contract: the body
 * attribute the stylesheet is scoped on is set on apply and retracted on
 * dispose, and every injected chrome element (marked data-skin-chrome) is
 * removed.
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Context, type Fiber } from '@deepseek-ai/cordis'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { apply } from '../src/client/index.ts'

const CSS = readFileSync(resolve(process.cwd(), 'src/client/deepseek-whale.module.css'), 'utf8')

let fiber: Fiber | undefined

async function mount(): Promise<Fiber> {
  const f = new Context().plugin({ apply })
  await f.await()
  return f
}

/** Let jsdom deliver the current MutationObserver checkpoint. */
async function flushMutations(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 0))
}

afterEach(async () => {
  await fiber?.dispose()
  fiber = undefined
  vi.unstubAllGlobals()
  document.body.innerHTML = ''
  document.title = ''
})

describe('DeepSeek Leviathan skin apply', () => {
  it('declares only the public web client manifest', () => {
    const manifest = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'))
    expect(manifest.dsh.client).toEqual({ inject: [], platform: 'web' })
    expect(manifest).not.toHaveProperty('dshClient')
    expect(manifest.peerDependencies).toHaveProperty('@deepseek-ai/cordis', '^4.0.1')
  })

  it('sets the body attribute and retracts it on dispose', async () => {
    fiber = await mount()
    expect(document.body.hasAttribute('data-dsh-deepseek-whale')).toBe(true)
    await fiber.dispose()
    expect(document.body.hasAttribute('data-dsh-deepseek-whale')).toBe(false)
  })

  it('registers cleanup before a later initialization failure', () => {
    let dispose: (() => void) | undefined
    const ctx = {
      effect(factory: () => () => void): void {
        dispose = factory()
      },
    } as unknown as Context
    const mutationObserver = vi.spyOn(globalThis, 'MutationObserver')
      .mockImplementationOnce(() => {
        throw new Error('fixture observer failure')
      })

    expect(() => apply(ctx)).toThrow('fixture observer failure')
    expect(dispose).toBeTypeOf('function')
    dispose?.()

    expect(document.body.hasAttribute('data-dsh-deepseek-whale')).toBe(false)
    expect(document.querySelector("[data-skin-owner='deepseek-whale']")).toBeNull()
    mutationObserver.mockRestore()
  })

  it('colors the installed Web-app system controls deep navy and restores the presenter color', async () => {
    const meta = document.createElement('meta')
    meta.name = 'theme-color'
    meta.content = '#ffffff'
    document.head.append(meta)

    fiber = await mount()
    expect(meta.content).toBe('#0b1437')

    await fiber.dispose()
    expect(meta.content).toBe('#ffffff')
    meta.remove()
  })

  it('injects chrome and retracts every element on dispose', async () => {
    fiber = await mount()
    expect(document.body.querySelectorAll('[data-skin-chrome]').length).toBeGreaterThan(0)
    await fiber.dispose()
    expect(document.body.querySelectorAll('[data-skin-chrome]').length).toBe(0)
  })

  it('does not remove a foreign node that happens to reuse the owner marker', async () => {
    fiber = await mount()
    const foreign = document.createElement('div')
    foreign.dataset.skinOwner = 'deepseek-whale'
    document.body.append(foreign)

    await fiber.dispose()
    expect(foreign.isConnected).toBe(true)
    foreign.remove()
  })

  it('leaves the conversation pane clean: no backdrop art at all', async () => {
    fiber = await mount()
    expect(document.body.style.backgroundImage).toBe('')

    document.body.setAttribute('data-ds-dark-theme', '')
    await flushMutations()
    expect(document.body.style.backgroundImage).toBe('')

    await fiber.dispose()
    expect(document.body.style.backgroundImage).toBe('')
  })

  it('keeps the native sidebar brand intact and mounts no lockup', async () => {
    document.body.innerHTML = `
      <div data-pane="sidebar">
        <div>
          <div class="fixture_logoRow">
            <button class="fixture_brand"><svg aria-hidden="true"></svg></button>
          </div>
        </div>
      </div>
    `
    fiber = await mount()

    expect(document.querySelector("[data-skin-chrome='brand-lockup']")).toBeNull()
    const brand = document.querySelector("button[class*='brand'] > svg")
    expect(brand).not.toBeNull()

    await fiber.dispose()
    expect(document.querySelector("[data-skin-owner='deepseek-whale']")).toBeNull()
  })

  it('hides the shell pane brand art and restores it on dispose', async () => {
    const shellMark = document.createElement('div')
    shellMark.className = 'fixture_whaleMark'
    document.body.append(shellMark)
    const paneArt = document.createElement('div')
    paneArt.style.setProperty('--dsh-bg-whale', 'url(/assets/logo-abc123.svg)')
    document.body.append(paneArt)

    fiber = await mount()

    expect(shellMark.style.display).toBe('none')
    expect(paneArt.style.display).toBe('none')

    await fiber.dispose()
    expect(shellMark.style.display).toBe('')
    expect(paneArt.style.display).toBe('')
    expect(document.querySelector('[data-skin-hidden-whale]')).toBeNull()
  })

  it('pins the skin title and restores the original on dispose', async () => {
    document.title = 'original'
    fiber = await mount()
    expect(document.title).not.toBe('original')
    await fiber.dispose()
    expect(document.title).toBe('original')
  })

  it('installs the whale favicon and removes it on dispose', async () => {
    fiber = await mount()
    const favicon = document.querySelector<HTMLLinkElement>("link[data-skin-chrome='favicon']")
    expect(favicon?.getAttribute('href')).toContain('data:image/svg+xml')
    await fiber.dispose()
    expect(document.querySelector("link[data-skin-chrome='favicon']")).toBeNull()
  })

  it('styles the brand blue accent, transparent sidebar, and clean pane', () => {
    expect(CSS).toContain('--dsw-alias-brand-primary: #4d6bfe')
    // The sidebar shares the pane surface: no skin-owned background.
    expect(CSS).toMatch(
      /\[data-pane='sidebar'\][^{]*\{[\s\S]*?background: transparent/,
    )
    // The pane carries no skin-owned whale art any more.
    expect(CSS).not.toContain("brand-lockup")
    expect(CSS).not.toContain('--ds-whale-backdrop-art')
    // The shell's own pane brand is suppressed deterministically.
    expect(CSS).toMatch(/\[class\*='whale-mark'\][^{]*\{[\s\S]*?display: none !important/)
    expect(CSS).toMatch(/\[data-ds-dark-theme\]\s*\{[\s\S]*?--dsw-alias-bg-layer-1: rgba\(19, 32, 84, 0\.88\)/)
  })

  it('lays on the DeepSeek-blue ornament layer (glow strip, glass composer, bubbles)', () => {
    // Top glow strip.
    expect(CSS).toMatch(/body\[data-dsh-deepseek-whale\]::after\s*\{[\s\S]*?height: 2px/)
    // Composer focus bloom.
    expect(CSS).toMatch(/\[data-composer-card\]:focus-within\s*\{[\s\S]*?box-shadow: var\(--ds-shadow\)/)
    // Selected-session left indicator.
    expect(CSS).toMatch(
      /\[role='treeitem'\]\[aria-selected='true'\]::before\s*\{[\s\S]*?width: 3px/,
    )
    // User bubbles in the brand gradient; assistant porcelain with a blue edge.
    expect(CSS).toMatch(/\[data-chat-flow-kind='user'\][\s\S]*?linear-gradient\(145deg, #6e8bff, #2e4de6\)/)
    expect(CSS).toMatch(/\[data-chat-flow-kind='assistant-step'\][\s\S]*?inset 3px 0 0 rgba\(77, 107, 254, 0\.35\)/)
    // Primary action glow.
    expect(CSS).toMatch(/\[class\*='primary'\]:hover:not\(:disabled\)\s*\{[\s\S]*?0 0 18px rgba\(77, 107, 254, 0\.4\)/)
    // Slim scrollbars.
    expect(CSS).toMatch(/::-webkit-scrollbar-thumb\s*\{[\s\S]*?rgba\(77, 107, 254, 0\.35\)/)
    // Hero headline rule.
    expect(CSS).toMatch(/\[data-phase='hero'\] \[class\*='headline'\]::after\s*\{[\s\S]*?height: 2px/)
    // Mirrored edge waterlines: bottom flows left-to-right, top right-to-left.
    expect(CSS).toMatch(/\[data-skin-chrome='bottom-waves'\],\s*body\[data-dsh-deepseek-whale\] \[data-skin-chrome='top-waves'\]\s*\{[\s\S]*?height: 56px/)
    expect(CSS).toMatch(/\[data-skin-chrome='bottom-waves'\]\s*\{[\s\S]*?bottom: 0/)
    expect(CSS).toMatch(/\[data-skin-chrome='top-waves'\]\s*\{[\s\S]*?top: 0/)
    expect(CSS).toMatch(/\[data-skin-chrome='bottom-waves'\] \[data-skin-particle\]\s*\{[\s\S]*?left: -12px/)
    expect(CSS).toMatch(/\[data-skin-chrome='top-waves'\] \[data-skin-particle\]\s*\{[\s\S]*?right: -12px/)
    expect(CSS).toMatch(/\[data-skin-chrome='top-waves'\] \[data-skin-particle\]\s*\{[\s\S]*?animation-direction: reverse/)
    expect(CSS).toContain('@keyframes ds-mote-stream')
    // Layered above it: a full-viewport, depth-banded free-drift field.
    expect(CSS).toMatch(/\[data-skin-chrome='particle-field'\]\s*\{[\s\S]*?position: fixed/)
    expect(CSS).toMatch(/\[data-skin-chrome='particle-field'\]\s*\{[\s\S]*?inset: 0/)
    expect(CSS).toMatch(/\[data-skin-chrome='particle-field'\]\s*\{[\s\S]*?pointer-events: none/)
    expect(CSS).toMatch(/\[data-skin-depth='far'\]\s*\{[\s\S]*?blur/)
    expect(CSS).toMatch(/\[data-skin-depth='near'\]\s*\{[\s\S]*?width: 8px/)
    // The field is pointer-driven by JS, so it must carry no competing CSS
    // animation (a keyframe on transform would fight the RAF writer).
    expect(CSS).not.toContain('ds-mote-float')
    expect(CSS).toMatch(/\[data-skin-chrome='particle-field'\] \[data-skin-particle\]\s*\{[\s\S]*?will-change: transform/)
    expect(CSS).not.toContain("sidebarCol']) > div::after")
    expect(CSS).not.toContain('ds-whale-swell-right')
  })
})
