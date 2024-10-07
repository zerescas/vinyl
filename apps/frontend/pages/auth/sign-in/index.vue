<script setup lang="ts">
const username = ref("");
const password = ref("");

const { signIn } = useAuth();
</script>

<template>
  <h1>Sign In</h1>
  <p>Welcome back</p>

  <form
    class="mt-8 flex flex-col gap-6"
    @submit.prevent="signIn(username, password)"
  >
    <AppInputGroup>
      <AppInput label="Username" v-model="username" />
      <AppInput label="Password" type="password" v-model="password" />
    </AppInputGroup>

    <button
      class="mt-4 self-start rounded-md bg-zinc-200 px-8 py-1.5 font-semibold text-zinc-950 hover:bg-zinc-100"
      type="submit"
    >
      Sign In
    </button>
  </form>
</template>
