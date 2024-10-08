<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import IcRoundHome from "~icons/ic/round-home";
import IcRoundLibraryMusic from "~icons/ic/round-library-music";

const sidebarStore = useSidebarStore();
const { isExpanded } = storeToRefs(sidebarStore);

const buttons = ref([
  {
    icon: IcRoundHome,
    text: "Home",
    to: "/",
  },
  {
    icon: IcRoundLibraryMusic,
    text: "Library",
    to: "/test",
  },
]);

function handleButtonClick() {
  if (isLargeScreen.value) return;
  isExpanded.value = false;
}

/* Check current screen size, and set "isMobileMode" accordingly */
const sidebarMobileModeTimer = ref(0);
const isMobileMode = ref(false);

const isLargeScreen = useMediaQuery(
  `(min-width: ${tailwindConfig.theme.screens.md})`,
);

onMounted(() => {
  watch(
    isLargeScreen,
    (newValue) => {
      // Disable "Mobile Mode"
      if (newValue) {
        clearTimeout(sidebarMobileModeTimer.value);
        isMobileMode.value = false;
        return;
      }

      // Enable "Mobile Mode" with delay, to apply classes to prevent blinking from transition from PC to Mobile screen width
      sidebarMobileModeTimer.value = window.setTimeout(() => {
        isMobileMode.value = true;
      }, 300);
    },
    { immediate: true },
  );
});
</script>

<template>
  <div
    class="[&>*]:ease pointer-events-none relative h-full md:pointer-events-auto [&.expanded]:pointer-events-auto [&>*]:z-10 [&>*]:h-full [&>*]:duration-300"
    :class="{ expanded: isExpanded }"
  >
    <!-- Background -->
    <div
      class="absolute w-full bg-zinc-950 bg-opacity-0 transition-colors [&.expanded]:bg-opacity-60 md:[&.expanded]:bg-opacity-0"
      :class="{ expanded: isExpanded }"
      @click="isExpanded = false"
    ></div>

    <!-- Sidebar -->
    <div
      class="group relative flex -translate-x-full flex-col gap-5 bg-zinc-900 bg-opacity-95 p-5 pt-20 shadow-[0_0_48px_0_rgba(0,0,0,0.4)] transition-[transform,background-color] md:translate-x-0 md:bg-opacity-50 [&.expanded]:w-full [&.expanded]:translate-x-0 2xs:[&.expanded]:w-64"
      :class="[{ expanded: isExpanded }, isMobileMode ? '2xs:w-64' : 'w-fit']"
      @click.stop=""
    >
      <NuxtLink
        v-for="button in buttons"
        :key="button.text"
        :to="button.to"
        class="ease flex items-center gap-4 transition-colors duration-300"
        :class="[
          button.to === $route.path
            ? 'text-accent-950 hover:text-accent-800 drop-shadow-accent-md'
            : 'text-zinc-200 hover:text-zinc-50',
        ]"
        @click="handleButtonClick"
      >
        <component class="size-7" :is="button.icon" />
        <span
          :class="[
            { 'hidden group-[.expanded]:block': !isMobileMode },
            'font-semibold',
          ]"
          >{{ button.text }}</span
        >
      </NuxtLink>
    </div>
  </div>
</template>
