<script setup lang="ts">
const audioPlayerStore = useAudioPlayerStore();
const { volume, mode, srcUrl } = storeToRefs(audioPlayerStore);
const { info } = audioPlayerStore;

onMounted(() => {
  srcUrl.value = "/audio/jojo.mp3";
});
</script>

<template>
  <div class="flex flex-col bg-zinc-900 shadow-[0_0_48px_0_rgba(0,0,0,0.4)]">
    <!-- Timeline -->
    <AudioPlayerTimeline />

    <div
      class="flex items-center px-5 py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:py-4"
    >
      <!-- Left Part -->
      <div
        class="mr-auto flex w-full min-w-0 items-center gap-1 pr-0 text-zinc-300 md:col-span-1 md:flex-wrap md:pr-4"
      >
        <!-- Playing now -->
        <AudioPlayerBottomNowPlaying />

        <!-- Current time and duration of a playing track -->
        <div class="mr-auto hidden text-[14px] font-semibold sm:block">
          {{ info.currentTime }} / {{ info.duration }}
        </div>
      </div>

      <!-- Main Controls -->
      <div class="md:col-start-2 md:justify-self-center">
        <AudioPlayerBottomMainControls />
      </div>

      <!-- Rest Controls -->
      <div class="hidden justify-self-end md:col-start-3 md:block">
        <span
          class="cursor-pointer font-bold transition-colors"
          :class="{ 'text-red-500': mode === 'nightcore' }"
          @click="
            () => {
              if (mode === 'nightcore') {
                mode = 'normal';
                return;
              }

              mode = 'nightcore';
            }
          "
        >
          NC
        </span>

        <span
          class="cursor-pointer font-bold transition-colors"
          :class="{ 'text-sky-500': mode === 'vaporwave' }"
          @click="
            () => {
              if (mode === 'vaporwave') {
                mode = 'normal';
                return;
              }

              mode = 'vaporwave';
            }
          "
        >
          VP
        </span>

        <input
          type="range"
          name="volume"
          min="0"
          max="1"
          step="0.01"
          v-model="volume"
        />
      </div>
    </div>
  </div>
</template>
