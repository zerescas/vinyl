<script setup lang="ts">
import IcRoundMenu from "~icons/ic/round-menu";
import IcRoundClose from "~icons/ic/round-close";

const sidebarStore = useSidebarStore();
const { isExpanded } = storeToRefs(sidebarStore);
</script>

<template>
  <div class="flex items-center px-5 py-5">
    <!-- Expand menu -->
    <button
      class="z-10 translate-y-0.5 text-zinc-50 transition-colors hover:text-zinc-300"
      @click="isExpanded = !isExpanded"
    >
      <IcRoundMenu v-show="!isExpanded" class="size-7" />
      <IcRoundClose v-show="isExpanded" class="size-7" />
    </button>

    <!-- App Title -->
    <RouterLink
      class="z-10 ml-4 text-2xl tracking-wide transition-all sidebar-expanded:ml-4 md:ml-12"
      to="/"
    >
      <span class="font-bold text-accent-950 drop-shadow-accent">V</span>
      <span>inyl</span>
    </RouterLink>

    <AppUserWidget class="ml-auto" />
  </div>
</template>
