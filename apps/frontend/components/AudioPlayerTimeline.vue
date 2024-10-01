<script setup lang="ts">
const timelineRef = ref<HTMLElement | null>();

const audioPlayerStore = useAudioPlayerStore();
const { seek, info } = audioPlayerStore;

const isSeeking = ref(false);

onMounted(() => {
  document.addEventListener("pointermove", handleSeeking);
  document.addEventListener("pointerup", handleEndSeek);
});

onUnmounted(() => {
  document.removeEventListener("pointermove", handleSeeking);
  document.removeEventListener("pointerup", handleEndSeek);
});

function handleStartSeek(e: PointerEvent) {
  document.body.classList.add("select-none");
  document.body.classList.add("cursor-pointer");
  isSeeking.value = true;

  handleSeeking(e);
}

function handleSeeking(e: PointerEvent) {
  if (!isSeeking.value) return;
  if (!timelineRef.value) return;

  const pointPos = e.pageX - timelineRef.value.offsetLeft;
  seek(pointPos / timelineRef.value.clientWidth);
}

function handleEndSeek(e: PointerEvent) {
  document.body.classList.remove("select-none");
  document.body.classList.remove("cursor-pointer");
  isSeeking.value = false;
}
</script>

<template>
  <div
    ref="timelineRef"
    :class="[$style.timeline, { [$style.seeking]: isSeeking }]"
    @pointerdown="handleStartSeek"
  >
    <div :class="[$style['timeline-bg']]">
      <div
        :class="$style['timeline-fg']"
        :style="{ width: info.progress }"
      ></div>
    </div>
  </div>
</template>

<style module>
.timeline {
  align-items: center;
  display: flex;
  height: theme(spacing.6);
  position: absolute;
  top: 0;
  touch-action: none;
  transform: translateY(-50%);
  width: 100%;
}

.timeline:hover {
  cursor: pointer;
}

.timeline-bg {
  background-color: theme(colors.zinc.600);
  bottom: 50%;
  height: theme(spacing[0.5]);
  position: absolute;
  transition: height theme(transitionDuration.300) ease;
  width: 100%;
}

.timeline:hover .timeline-bg,
.timeline.seeking .timeline-bg {
  height: theme(spacing.2);
}

.timeline-fg {
  background: linear-gradient(
    90deg,
    var(--color-accent-950),
    var(--color-accent-800)
  );
  height: 100%;
  pointer-events: none;
  position: relative;
}
</style>
