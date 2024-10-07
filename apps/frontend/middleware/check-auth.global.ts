export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  if (userStore.isLogged && to.path.includes("/auth")) {
    return navigateTo("/");
  }
});
