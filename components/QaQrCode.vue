<script setup>
// The session Q&A QR code with its caption. Encapsulates the repeated markup
// shown on the cover, intro, and section slides. Position it with Slidev's
// `v-drag` on the tag (preferred over `absolute`, per CLAUDE.md):
//
//   <QaQrCode v-drag="[800,400,140,150]" />
//
// Override the caption if a slide needs different wording:
//
//   <QaQrCode v-drag="[800,400,140,150]" caption="Ask me anything" />
const props = defineProps({
  caption: { type: String, default: 'Questions? · Session Q&A' },
})
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <img src="/images/qr-qa.png" class="w-full rounded shadow-lg bg-white p-2" />
    <div class="text-xs opacity-80">{{ caption }}</div>
  </div>
</template>
