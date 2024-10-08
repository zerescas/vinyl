<script setup lang="ts"></script>

<template>
  <div class="sm:max-w-80">
    <div class="flex h-16 flex-col justify-around">
      <slot name="headerContent" />
    </div>

    <form class="mt-8 flex flex-col gap-6">
      <slot name="formContent" />
    </form>
  </div>
</template>
