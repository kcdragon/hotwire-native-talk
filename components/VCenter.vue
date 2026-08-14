<script setup>
// Fills its parent's height and vertically centers whatever is slotted
// into it — handy for balancing a code block or image against text in
// the other column of a `two-cols` slide.
//
//   ::right::
//
//   <VCenter>
//
//   <CodeCaption caption="SceneDelegate.swift" size="xs">
//   ...
//   </CodeCaption>
//
//   </VCenter>
</script>

<template>
  <div class="h-full flex flex-col justify-center">
    <slot />
  </div>
</template>
