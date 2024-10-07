<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    type?: "text" | "password";
  }>(),
  {
    type: "text",
  },
);

const modelValue = defineModel<string>();
</script>

<template>
  <div class="flex flex-col gap-1">
    <label class="mr-4 font-semibold">{{ label }}</label>
    <input
      class="rounded-md bg-transparent px-2 py-1 outline outline-1 outline-zinc-500 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-zinc-200"
      :type
      v-model="modelValue"
    />
  </div>
</template>
