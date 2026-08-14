<script setup>
import { computed } from 'vue'

// Wraps a code block and renders a file-path caption underneath it.
// Usage (leave blank lines so the fenced code is parsed as markdown):
//
//   <CodeCaption caption="app/views/feeds/_card.html.erb">
//
//   ```erb
//   <%= link_to "View", feed_path(feed) %>
//   ```
//
//   </CodeCaption>
//
// Pass `size` to shrink the code block ("xs" or "sm"); omit for the
// theme default:
//
//   <CodeCaption caption="SceneDelegate.swift" size="xs">
const props = defineProps({
  caption: { type: String, default: '' },
  size: { type: String, default: '' },
})

// Override Slidev's code font-size variable, which the theme's code
// blocks read via `font-size: var(--slidev-code-font-size)`. Cascades
// to the fenced code in the slot; no !important needed. The theme
// default is 12px / 18px, so sizes must go below that to read smaller.
const sizes = {
  xs: { fontSize: '9px', lineHeight: '13px' },
  sm: { fontSize: '10px', lineHeight: '15px' },
}

const codeStyle = computed(() => {
  const s = sizes[props.size]
  if (!s) return {}
  return {
    '--slidev-code-font-size': s.fontSize,
    '--slidev-code-line-height': s.lineHeight,
  }
})
</script>

<template>
  <div :style="codeStyle">
    <slot />
    <div class="text-xs opacity-60 text-center">{{ caption }}</div>
  </div>
</template>
