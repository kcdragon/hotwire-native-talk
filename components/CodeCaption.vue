<script setup>
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
defineProps({
  caption: { type: String, default: '' },
})
</script>

<template>
  <div>
    <slot />
    <div class="text-xs opacity-60 text-center">{{ caption }}</div>
  </div>
</template>
