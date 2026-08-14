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

  it('swaps the whale backdrop when the dark theme attribute flips', async () => {
    fiber = await mount()
    const light = document.body.style.backgroundImage
    expect(light).toContain('data:image/svg+xml')
    expect(light).not.toContain('linear-gradient')

    document.body.setAttribute('data-ds-dark-theme', '')
    await flushMutations()
    expect(document.body.style.backgroundImage).toContain('data:image/svg+xml')
    expect(document.body.style.backgroundImage).not.toBe(light)

    await fiber.dispose()
    expect(document.body.style.backgroundImage).toBe('')
  })

  it('mounts the permanent brand lockup and keeps the native brand intact', async () => {
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

    const lockup = document.querySelector<HTMLElement>("[data-skin-chrome='brand-lockup']")
    expect(lockup).not.toBeNull()
    const glyph = lockup?.querySelector<HTMLImageElement>("[data-brand-glyph='lockup']")
    expect(glyph?.src).toContain('data:image/svg+xml')
    const brand = document.querySelector("button[class*='brand'] > svg")
    expect(brand).not.toBeNull()

    await fiber.dispose()
    expect(document.querySelector("[data-skin-owner='deepseek-whale']")).toBeNull()
  })

  it('keeps the brand lockup mounted when the sidebar mounts later', async () => {
    fiber = await mount()
    document.body.insertAdjacentHTML(
      'beforeend',
      '<div data-pane="sidebar"><div><button class="fixture_brand"><svg></svg></button></div></div>',
    )
    await flushMutations()

    expect(document.querySelector("[data-skin-chrome='brand-lockup']")).not.toBeNull()
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

  it('styles the brand blue accent, transparent sidebar, and backdrop-layer lockup', () => {
    expect(CSS).toContain('--dsw-alias-brand-primary: #4d6bfe')
    // The sidebar shares the pane surface: no skin-owned background.
    expect(CSS).toMatch(
      /\[data-pane='sidebar'\][^{]*\{[\s\S]*?background: transparent/,
    )
    // The brand lockup is a pure backdrop layer: below content, click-through.
    expect(CSS).toMatch(
      /\[data-skin-chrome='brand-lockup'\][^{]*\{[\s\S]*?z-index: -1/,
    )
    expect(CSS).toMatch(
      /\[data-skin-chrome='brand-lockup'\][^{]*\{[\s\S]*?pointer-events: none/,
    )
    expect(CSS).not.toContain("brand-lockup']:hover")
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
    // The bottom waterline is a continuous left-to-right particle stream.
    expect(CSS).toMatch(/\[data-skin-chrome='bottom-waves'\]\s*\{[\s\S]*?overflow: hidden/)
    expect(CSS).toMatch(/\[data-skin-particle\]\s*\{[\s\S]*?animation: ds-mote-stream/)
    expect(CSS).toContain('@keyframes ds-mote-stream')
    expect(CSS).not.toContain('ds-waterline-flow')
    expect(CSS).not.toContain("sidebarCol']) > div::after")
    expect(CSS).not.toContain('ds-whale-swell-right')
  })
})
