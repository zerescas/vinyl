export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;

  const { refresh } = useAuth();
  await refresh();
});
