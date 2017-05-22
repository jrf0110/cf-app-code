import * as hljs from 'highlight.js'
import { Highlighter, IHighlighterOptions } from './highlighter'

const win = window as ICFAppsWindow

const options = {
  window: win,
} as IHighlighterOptions

for (let key in (win.INSTALL_OPTIONS || {})) {
  options[key as keyof IHighlighterOptions] = win.INSTALL_OPTIONS[key]
}

const highlighter = new Highlighter(options)

highlighter.init()

win.INSTALL_SCOPE = {
  setOptions: (options: any) => {
    highlighter.updateOptions(options)
  }
}