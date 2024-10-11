<script setup lang="ts">
import IcRoundMenu from "~icons/ic/round-menu";
import IcRoundClose from "~icons/ic/round-close";

const sidebarStore = useSidebarStore();
const { isExpanded } = storeToRefs(sidebarStore);

const windowStore = useWindowStore();
const { isTopArrived } = storeToRefs(windowStore);
</script>

<template>
  <div class="flex h-[--height-header] items-center">
    <div class="absolute z-10 flex items-center">
      <!-- Expand menu -->
      <button
        class="flex translate-y-0.5 justify-center px-[--padding-x-sidebar] pr-[--gap-sidebar-item] text-zinc-50 transition-colors hover:text-zinc-300"
        @click="isExpanded = !isExpanded"
      >
        <IcRoundMenu v-show="!isExpanded" class="size-7" />
        <IcRoundClose v-show="isExpanded" class="size-7" />
      </button>

      <!-- App Title -->
      <RouterLink
        class="ml-0 text-2xl tracking-wide transition-all md:ml-[--padding-x-content] md:pl-0 md:sidebar-expanded:ml-0"
        to="/"
      >
        <span class="font-bold text-accent-950 drop-shadow-accent">V</span>
        <span>inyl</span>
      </RouterLink>
    </div>

    <div
      class="flex h-full flex-grow items-center pr-[--padding-x-content] transition-colors duration-300 md:ml-[--width-sidebar] md:sidebar-expanded:ml-[--width-sidebar-expanded]"
      :class="{
        'bg-zinc-900 bg-opacity-50 backdrop-blur-md max-md:sidebar-expanded:bg-opacity-0 max-md:sidebar-expanded:backdrop-blur-none':
          !isTopArrived,
        '': isExpanded,
      }"
    >
      <AppUserWidget class="ml-auto" />
    </div>
  </div>
</template>
