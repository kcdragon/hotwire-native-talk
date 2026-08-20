<script setup>
// Fills its parent's height and centers whatever is slotted into it, both
// vertically and horizontally — handy for balancing a code block, image, or
// video against text in the other column of a `two-cols` slide.
//
//   ::right::
//
//   <Center>
//
//   <CodeCaption caption="SceneDelegate.swift" size="xs">
//   ...
//   </CodeCaption>
//
//   </Center>
//
// Note that horizontal centering makes block-level children (code blocks)
// shrink to fit their content rather than filling the column.
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center">
    <slot />
  </div>
</template>
