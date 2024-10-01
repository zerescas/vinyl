export default defineNuxtPlugin((nuxtApp) => {
  const audioContext = new AudioContext();

  return {
    provide: {
      audioContext,
    },
  };
});
