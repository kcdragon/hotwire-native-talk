import { defineMermaidSetup } from '@slidev/types'

// Pin the diagram font to a system stack. Mermaid measures text to place
// labels, and if it measures before the theme's webfont has loaded the
// labels end up offset from their arrows. A font that's always available
// makes the measurement match what actually renders.
export default defineMermaidSetup(() => {
  return {
    theme: 'base',
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
    themeVariables: {
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
      primaryColor: '#e6fffa',
      primaryBorderColor: '#2dd4bf',
      primaryTextColor: '#134e4a',
      lineColor: '#334155',
      actorBkg: '#e6fffa',
      actorBorder: '#2dd4bf',
      actorTextColor: '#134e4a',
      noteBkgColor: '#fef9c3',
      noteBorderColor: '#eab308',
      noteTextColor: '#713f12',
    },
    sequence: {
      actorFontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
      noteFontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
      messageFontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
    },
  }
})
