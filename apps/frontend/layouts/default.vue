<script setup lang="ts">
const sidebarStore = useSidebarStore();
const { isExpanded } = storeToRefs(sidebarStore);

const windowStore = useWindowStore();
const { isTopArrived } = storeToRefs(windowStore);
</script>

<template>
  <div
    class="group grid h-screen"
    :class="{
      'is-sidebar-expanded': isExpanded,
      'scroll-on-top': isTopArrived,
    }"
  >
    <AppSidebar class="fixed top-0 z-10 w-full md:w-auto" />

    <AppHeader class="fixed top-0 z-10 ml-auto w-full" />

    <AppAudioBackgroundCover class="fixed top-0 h-full w-full" />

    <!-- Content -->
    <div
      class="content ml-auto mt-8 px-[--padding-x-content] pb-48 pt-[--height-header]"
    >
      <div class="mx-auto max-w-[--max-width-content]">
        <slot />
      </div>
    </div>

    <ClientOnly>
      <AudioPlayerBottom class="fixed bottom-0 z-10 w-full" />
    </ClientOnly>
  </div>
</template>

<style scoped>
.is-sidebar-expanded {
  --width-sidebar: var(--width-sidebar-expanded);
}

.header {
  max-width: 100%;
  width: 100%;

  @media screen(md) {
    max-width: calc(100% - var(--width-sidebar));
  }
}

.content {
  max-width: 100%;
  width: 100%;

  @media screen(md) {
    max-width: calc(100% - var(--width-sidebar));
  }
}
</style>
