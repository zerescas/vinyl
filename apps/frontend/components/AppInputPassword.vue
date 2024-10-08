<script setup lang="ts">
import IcRoundEye from "~icons/ic/round-remove-red-eye";

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
const isShowPassword = ref(false);
</script>

<template>
  <AppBaseInput
    :label
    :type="isShowPassword ? 'text' : 'password'"
    :isError
    :error
    v-model="modelValue"
  >
    <template #button>
      <button class="absolute right-4 top-[50%] translate-y-[-50%]">
        <IcRoundEye
          class="text-zinc-200 hover:text-zinc-50"
          :class="{ 'opacity-50': !isShowPassword }"
          @click.prevent="isShowPassword = !isShowPassword"
        />
      </button>
    </template>
  </AppBaseInput>
</template>
