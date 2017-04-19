import * as hljs from 'highlight.js'

const cssBaseUrl = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.10.0/styles/'
const theme = 'agate'

document.addEventListener('DOMContentLoaded', e => {
  Array.prototype.slice
    .call(document.querySelectorAll('pre'))
    .forEach((el: HTMLElement) => {
      el.innerHTML = el.innerHTML.trim()
    })

  // Wrap All code's with pre's
  Array.prototype.slice
    .call(document.querySelectorAll('code'))
    .forEach((el: HTMLElement) => {
      if (el.parentElement.tagName !== 'PRE') {
        const parent = el.parentElement
        const cloned = el.cloneNode() as HTMLElement
        cloned.innerHTML = el.innerHTML
        const wrapped = document.createElement('pre')
        wrapped.appendChild(cloned)
        parent.replaceChild(wrapped, el)
      }
    })

  const style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = `${cssBaseUrl}${theme}.min.css`
  document.head.appendChild(style)

  setTimeout(() => hljs.initHighlighting(), 1)
})