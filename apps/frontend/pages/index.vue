<script setup lang="ts">
const userStore = useUserStore();
</script>

<template>
  <div>
    <h1 class="">Home</h1>

    <p class="flex gap-2">
      Welcome,
      <ClientOnly>
        <span class="text-accent-950 font-bold drop-shadow-accent-md">
          {{ userStore.user.username || "Stranger" }}
        </span>

        <template #fallback>
          <span
            class="w-36 animate-pulse rounded-xl bg-zinc-700 align-middle"
          ></span>
        </template>
      </ClientOnly>
    </p>
  </div>
</template>
