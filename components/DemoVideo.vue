<script setup>
// Reusable demo video. Defaults to the autoplaying, muted, looping style used
// on the Screen Navigation slides. Set :autoplay="false" for the older
// click-to-play (controls) style; override max-height with maxH.
//
//   <DemoVideo src="/videos/nav-push-pop.mp4" />
//   <DemoVideo src="/videos/turbo-frames-demo.mp4" :autoplay="false" maxH="max-h-105" />
defineProps({
  src: { type: String, required: true },
  autoplay: { type: Boolean, default: true },
  maxH: { type: String, default: 'max-h-110' },
})
</script>

<template>
  <!-- Fills the two-cols right column and centers the video vertically. -->
  <div class="h-full flex items-center justify-center">
    <!-- muted is static: required for autoplay and Vue won't bind it as a prop -->
    <video
      :src="src"
      :autoplay="autoplay"
      :controls="!autoplay"
      muted
      loop
      playsinline
      :class="[maxH, 'mx-auto rounded-lg shadow-lg']"
    />
  </div>
</template>
