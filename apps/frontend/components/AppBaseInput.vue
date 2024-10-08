<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    type?: "text" | "password";
    isError?: boolean;
    error?: string;
  }>(),
  {
    type: "text",
    isError: false,
    error: "",
  },
);

const modelValue = defineModel<string>();
</script>

<template>
  <div class="group flex flex-col gap-1" :class="{ 'is-error': isError }">
    <label class="mr-4 font-semibold">{{ label }}</label>

    <div class="relative">
      <input
        class="w-full rounded-md bg-transparent px-2 py-1 outline outline-1 outline-zinc-500 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-zinc-200 group-[.is-error]:outline-red-500"
        :type
        v-model="modelValue"
      />

      <slot name="button" />
    </div>

    <AppBaseInputError>
      {{ error }}
    </AppBaseInputError>
  </div>
</template>
