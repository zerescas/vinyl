<script setup lang="ts">
import IcRoundShuffle from "~icons/ic/round-shuffle";
import IcRoundSkipPrevious from "~icons/ic/round-skip-previous";
import IcRoundPlayCircle from "~icons/ic/round-play-circle";
import IcRoundPlayArrow from "~icons/ic/round-play-arrow";
import IcRoundPauseCircle from "~icons/ic/round-pause-circle";
import IcRoundPause from "~icons/ic/round-pause";
import IcRoundSkipNext from "~icons/ic/round-skip-next";
import IcRoundLoop from "~icons/ic/round-loop";

const audioPlayerStore = useAudioPlayerStore();
const { isPlaying } = storeToRefs(audioPlayerStore);
const { play, pause } = audioPlayerStore;
</script>

<template>
  <div class="col-start-3 flex justify-center gap-4">
    <!-- Shuffle -->
    <button
      class="hidden text-zinc-400 transition-colors hover:text-zinc-300 sm:block"
    >
      <IcRoundShuffle class="size-6 md:size-7" />
    </button>

    <!-- Skip Previous -->
    <button
      class="hidden text-zinc-400 transition-colors hover:text-zinc-300 xs:block"
    >
      <IcRoundSkipPrevious class="size-6 md:size-7" />
    </button>

    <!-- Play / Pause -->
    <button
      class="text-zinc-200 transition-colors hover:text-zinc-50"
      @click="() => (isPlaying ? pause() : play())"
    >
      <IcRoundPauseCircle v-show="isPlaying" class="hidden size-11 md:block" />
      <IcRoundPause v-show="isPlaying" class="block size-9 md:hidden" />

      <IcRoundPlayCircle v-show="!isPlaying" class="hidden size-11 md:block" />
      <IcRoundPlayArrow v-show="!isPlaying" class="block size-9 md:hidden" />
    </button>

    <!-- Skip Next -->
    <button class="text-zinc-400 transition-colors hover:text-zinc-300">
      <IcRoundSkipNext class="size-6 md:size-7" />
    </button>

    <!-- Loop -->
    <button
      class="hidden text-[--color-accent-950] drop-shadow-accent transition-colors hover:text-[--color-accent-800] sm:block"
    >
      <IcRoundLoop class="size-6 md:size-7" />
    </button>
  </div>
</template>
