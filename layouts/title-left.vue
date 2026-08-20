<script setup>
// Title block pinned to the left and vertically centered, with the slide's
// content (a video, a Mermaid diagram, an image) filling the space to its
// right.
//
// The heading and subheading are written as ordinary markdown `#` / `##` in
// the `title` slot, so they pick up the theme's normal heading styles — the
// same as every other slide in the deck:
//
//   ---
//   layout: title-left
//   title: Supporting OAuth - Web
//   ---
//
//   ::title::
//
//   # Supporting OAuth
//
//   ## Web
//
//   ::default::
//
//   ```mermaid {scale: 0.5}
//   ...
//   ```
defineProps({
  // Width of the left title column. Widen it for longer headings.
  titleWidth: { type: String, default: 'w-64' },
})
</script>

<template>
  <div class="slidev-layout title-left h-full flex flex-row items-center gap-8 px-14">
    <div :class="[titleWidth, 'shrink-0 text-left']">
      <slot name="title" />
    </div>
    <!-- min-w-0 lets wide content (diagrams, code) shrink instead of overflowing -->
    <div class="flex-1 min-w-0 h-full flex flex-col items-center justify-center">
      <slot />
    </div>
  </div>
</template>
