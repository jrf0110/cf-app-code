import * as hljs from 'highlight.js'
import { domready } from './domready'
import { normalizeIndentation } from './indentation-normalizer'

export interface IHighlighterOptions {
  window: Window
  cssBaseUrl?: string
  theme?: string
  wrapCodesWithoutPres?: boolean
  normalizeIndentation?: boolean
}

type kopt = keyof IHighlighterOptions

export class Highlighter {
  public static defaults: Partial<IHighlighterOptions> = {
    cssBaseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.10.0/styles/',
    theme: 'agate',
    wrapCodesWithoutPres: true,
    normalizeIndentation: true,
  }

  public options: IHighlighterOptions
  private styleElement: HTMLLinkElement

  constructor(options: IHighlighterOptions) {
    this.options = {} as any

    for (let key in options) {
      this.options[key as kopt] = this.options[key as kopt]
    }

    this.options = options

    for (let key in Highlighter.defaults) {
      if (this.options[key as kopt] === undefined) {
        this.options[key as kopt] = Highlighter.defaults[key as kopt]
      }
    }
  }

  init() {
    domready(this.options.window, () => {
      const $codes = Array.prototype.slice
        .call(document.querySelectorAll('code'))

      if (this.options.normalizeIndentation) {
        $codes.forEach((el: HTMLElement) => {
          if (el.childElementCount > 0) return
          el.innerHTML = normalizeIndentation(el.innerHTML).trim()
        })
      }

      // Wrap All code's with pre's
      if (this.options.wrapCodesWithoutPres) {
        $codes.forEach((el: HTMLElement) => {
          if (el.parentElement.tagName !== 'PRE') {
            const parent = el.parentElement
            const cloned = el.cloneNode() as HTMLElement
            cloned.innerHTML = normalizeIndentation(el.innerHTML)
            const wrapped = document.createElement('pre')
            wrapped.appendChild(cloned)
            parent.replaceChild(wrapped, el)
          }
        })
      }

      this.insertCSS()

      setTimeout(() => hljs.initHighlighting(), 1)
    })
  }

  insertCSS() {
    const href = `${this.options.cssBaseUrl}${this.options.theme}.min.css`

    if (this.styleElement && this.styleElement.href === href) return this

    const style = document.createElement('link')
    style.rel = 'stylesheet'
    style.href = href
    document.head.appendChild(style)

    if (this.styleElement) {
      document.head.removeChild(this.styleElement)
    }

    this.styleElement = style
    return this
  }

  updateOptions(options: Partial<IHighlighterOptions>) {
    let shouldUpdateCSS = false

    if (options.theme && this.options.theme !== options.theme) {
      shouldUpdateCSS = true
    }

    for (let key in options) {
      this.options[key as kopt] = options[key as kopt]
    }

    if (shouldUpdateCSS) {
      this.insertCSS()
    }
  }
}