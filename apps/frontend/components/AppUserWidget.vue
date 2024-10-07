<script setup lang="ts">
import IcRoundPerson from "~icons/ic/round-person";

const userStore = useUserStore();
const { logout } = useAuth();
</script>

<template>
  <div class="flex h-10 items-center font-semibold">
    <ClientOnly>
      <div class="[&>*]:flex [&>*]:gap-4">
        <div v-if="userStore.isLogged">
          <div>
            {{ userStore.user.username }}
          </div>
          |
          <button
            class="transition-colors duration-300 hover:text-[--color-accent-800]"
            @click="logout"
          >
            Logout
          </button>
        </div>

        <div v-else>
          <NuxtLink
            class="transition-colors duration-300 hover:text-[--color-accent-800]"
            to="/auth/sign-up"
            >Sign Up
          </NuxtLink>
          |
          <NuxtLink
            class="transition-colors duration-300 hover:text-[--color-accent-800]"
            to="/auth/sign-in"
            >Sign In
          </NuxtLink>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<!-- <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-t from-[--color-accent-950] to-[--color-accent-800]"
          @click="logout"
        >
          <span class="text-lg">
            {{ userStore.user.username[0].toUpperCase() }}
          </span>
        </button> -->
