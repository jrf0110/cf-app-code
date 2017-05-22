export function normalizeIndentation(str: string) {
  const lines = str.split('\n')
  const minWidth = lines.reduce((min, line) => {
    if (isStrOnlyWhitespaceChars(line)) return min

    const width = getIndentationWidth(line)
    return width < min ? width : min
  }, Infinity)

  if (minWidth === Infinity) return str
  if (minWidth === 0) return str

  return lines
    .map(line => line.substring(minWidth))
    .join('\n')
}

export function getIndentationWidth(str: string): number {
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ' && str[i] !== '\t') return i
  }

  return 0
}

export function isStrOnlyWhitespaceChars(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ' && str[i] !== '\t') return false
  }

  return true
}