<script setup>
import { computed } from 'vue'

// An image with a hand-drawn-style arrow pointing at something in it.
//
// The arrow overlay is sized to the image element itself, so `to`/`from` are
// percentages of the image and stay correct at any rendered size.
//
//   <AnnotatedImage
//     src="/images/oauth-sign-in-button.png"
//     :to="[72, 45]" :from="[122, 26]"
//     label="This button" />
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  imgClass: { type: String, default: 'max-h-100 rounded-lg shadow-lg' },
  // [x, y] as percentages of the image. `to` is the arrow tip, `from` its
  // tail — values outside 0–100 sit in the margin beside the image.
  to: { type: Array, default: () => [75, 45] },
  from: { type: Array, default: () => [115, 28] },
  // How far the curve bows, in viewBox units; flip the sign to arc the
  // other way.
  bow: { type: Number, default: 18 },
  label: { type: String, default: '' },
  color: { type: String, default: '#e11d48' },
  // Width:height ratio of the rendered image, used to correct the arrowhead's
  // angle for the non-uniform viewBox. Phone screenshots are ~0.46.
  aspect: { type: Number, default: 0.46 },
})

// Quadratic Bézier control point.
const ctrl = computed(() => [
  (props.from[0] + props.to[0]) / 2 + props.bow,
  (props.from[1] + props.to[1]) / 2,
])

const path = computed(
  () => `M ${props.from[0]} ${props.from[1]} Q ${ctrl.value[0]} ${ctrl.value[1]} ${props.to[0]} ${props.to[1]}`,
)

// The tangent at the curve's end runs from the control point to the endpoint.
// x is scaled by the aspect ratio to undo the viewBox's non-uniform stretch.
const headAngle = computed(() => {
  const dx = (props.to[0] - ctrl.value[0]) * props.aspect
  const dy = props.to[1] - ctrl.value[1]
  return (Math.atan2(dy, dx) * 180) / Math.PI
})
</script>

<template>
  <!--
    `w-fit h-fit leading-none` makes the wrapper hug the image exactly — with a
    plain inline-block, line-height leaves a few px of slack below the image and
    the overlay's percentages drift off target.
  -->
  <div class="relative w-fit h-fit leading-none">
    <img :src="src" :alt="alt" :class="imgClass" class="block" />

    <!-- overflow-visible lets the tail and label sit outside the image -->
    <svg
      class="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        :d="path"
        fill="none"
        :stroke="color"
        stroke-width="1"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
      />
    </svg>

    <!--
      The arrowhead is CSS-positioned rather than an SVG marker: the
      non-uniform viewBox squashes markers into a lopsided wedge.
    -->
    <div
      class="absolute pointer-events-none"
      :style="{
        left: `${to[0]}%`,
        top: `${to[1]}%`,
        transform: `translate(-50%, -50%) rotate(${headAngle}deg)`,
      }"
    >
      <svg width="20" height="20" viewBox="0 0 10 10" class="overflow-visible">
        <path d="M 0 0 L 9 5 L 0 10 L 2.5 5 Z" :fill="color" />
      </svg>
    </div>

    <div
      v-if="label"
      class="absolute text-lg font-bold whitespace-nowrap"
      :style="{ color, left: `${from[0]}%`, top: `${from[1]}%`, transform: 'translate(-50%, -170%)' }"
    >
      {{ label }}
    </div>
  </div>
</template>
