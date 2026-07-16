<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: { type: String, default: '' },
  image: { type: String, default: '' },
  // "before" places the image to the left of the text, "after" to the right
  position: { type: String, default: 'after' },
  imageClass: { type: String, default: 'max-h-60' },
})

const imageFirst = computed(() => props.position === 'before')
</script>

<template>
  <div class="slidev-layout inline-image flex flex-row items-center justify-center h-full gap-8">
    <img v-if="image && imageFirst" :src="image" :class="imageClass" />
    <div v-if="text" class="inline-image-text">
      <h1 class="!m-0">{{ text }}</h1>
    </div>
    <slot />
    <img v-if="image && !imageFirst" :src="image" :class="imageClass" />
  </div>
</template>
