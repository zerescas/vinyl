<script setup lang="ts"></script>

<template>
  <h1>Sign Up</h1>

  <form class="mt-8 flex flex-col gap-6">
    <AppInputGroup>
      <AppInput label="Username" />
      <AppInput label="Email" />
      <AppInput label="Password" type="password" />
    </AppInputGroup>

    <button
      class="mt-4 self-start rounded-md bg-zinc-200 px-8 py-1.5 font-semibold text-zinc-950 hover:bg-zinc-100"
      type="submit"
    >
      Sign Up
    </button>
  </form>
</template>
