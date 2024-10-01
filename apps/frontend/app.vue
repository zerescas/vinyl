<script setup lang="ts">
useHead({
  title: "Vinyl",
  bodyAttrs: {
    class: "bg-zinc-950 text-zinc-200",
  },
});

onMounted(() => {
  defineColorShadesFromSongImage("placeholder");
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
