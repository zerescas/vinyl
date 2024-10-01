<template>
  <div
    class="grid h-screen grid-cols-1 grid-rows-[auto_1fr_auto] md:grid-cols-[auto_1fr]"
  >
    <div class="col-start-2 row-span-2 row-start-1"></div>

    <AppSidebar class="col-start-1 row-span-2 row-start-1" />

    <AppHeader class="col-span-2 col-start-1 row-start-1" />

    <div class="col-start-1 row-start-2 p-6 md:col-start-2">
      <slot />
    </div>

    <ClientOnly>
      <AudioPlayerBottom class="col-span-full row-start-3" />
    </ClientOnly>
  </div>
</template>
