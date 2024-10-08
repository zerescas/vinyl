<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    isError?: boolean;
    error?: string;
  }>(),
  {
    isError: false,
    error: "",
  },
);

const modelValue = defineModel<string>();
</script>

<template>
  <AppBaseInput :label type="text" :isError :error v-model="modelValue" />
</template>
