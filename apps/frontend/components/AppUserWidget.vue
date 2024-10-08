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
            class="hover:text-accent-800 transition-colors duration-300"
            @click="logout"
          >
            Logout
          </button>
        </div>

        <div v-else>
          <NuxtLink
            class="hover:text-accent-800 transition-colors duration-300"
            to="/auth/sign-up"
            >Sign Up
          </NuxtLink>
          |
          <NuxtLink
            class="hover:text-accent-800 transition-colors duration-300"
            to="/auth/sign-in"
            >Sign In
          </NuxtLink>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
