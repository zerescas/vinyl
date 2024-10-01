type Mode = "normal" | "nightcore" | "vaporwave";

/**
 * Implementation of Audio Player
 */
export function useAudioPlayer() {
  const { $audioContext } = useNuxtApp();
  let mediaElement: HTMLAudioElement;
  let sourceNode = ref<MediaElementAudioSourceNode>();
  let gainNode = ref<GainNode>();

  const isPlaying = ref(false);

  onMounted(() => {
    mediaElement = new Audio();
    mediaElement.preservesPitch = preservesPitch.value;

    mediaElement.addEventListener("durationchange", (e) => {
      rawInfo.duration = (e.target as HTMLAudioElement).duration;
    });

    mediaElement.addEventListener("timeupdate", (e) => {
      rawInfo.currentTime = (e.target as HTMLAudioElement).currentTime;
    });

    mediaElement.addEventListener("ended", (e) => {
      isPlaying.value = false;
    });

    sourceNode.value = $audioContext.createMediaElementSource(mediaElement);

    gainNode.value = $audioContext.createGain();
    gainNode.value.gain.value = volume.value;

    createNodeChain();
  });

  /**
   * Create audio node chain
   *
   * SourceNode => GainNode => Destination (speakers)
   */
  function createNodeChain(): void {
    if (!sourceNode.value)
      throw new Error("Cannot create audio node chain - sourceNode is empty");
    if (!gainNode.value)
      throw new Error("Cannot create audio node chain - gainNode is empty");

    sourceNode.value.connect(gainNode.value);
    gainNode.value.connect($audioContext.destination);
  }

  function play(): void {
    if (isPlaying.value) return;

    mediaElement.play();
    $audioContext.resume();
    isPlaying.value = true;
  }

  function pause(): void {
    if (!isPlaying.value) return;

    mediaElement.pause();
    isPlaying.value = false;
  }

  function stop(): void {
    pause();
    mediaElement.currentTime = 0;
  }

  // TODO: seek by percent / seek by raw time
  function seek(percent: number): void {
    mediaElement.currentTime = rawInfo.duration * percent;
  }

  const srcUrl = ref("");
  watch(srcUrl, (newUrl) => {
    mediaElement.src = newUrl;
  });

  const playbackRate = ref(1);
  watch(playbackRate, (newRate) => {
    mediaElement.playbackRate = newRate;
  });

  const preservesPitch = ref(true);
  watch(preservesPitch, (newValue) => {
    mediaElement.preservesPitch = newValue;
  });

  const volume = ref(1);
  watch(volume, (newVolume) => {
    if (!gainNode.value)
      throw new Error("Cannot change volume - gainNode is empty");

    gainNode.value.gain.value = newVolume;
  });

  const mode = ref<Mode>();
  watch(mode, (newMode) => {
    if (newMode === "normal") {
      mediaElement.preservesPitch = true;
      mediaElement.playbackRate = 1;
      return;
    }

    let playbackRate = 1;
    mediaElement.preservesPitch = false;

    if (newMode === "nightcore") playbackRate = 1.3;
    else playbackRate = 0.6;

    mediaElement.playbackRate = playbackRate;
  });

  const rawInfo = reactive({
    currentTime: 0,
    duration: 0,
    progress: computed((): number => {
      if (rawInfo.duration === 0) return 0;
      return rawInfo.currentTime / rawInfo.duration;
    }),
  });

  const info = reactive({
    currentTime: computed(() => formatTime(rawInfo.currentTime)),
    duration: computed(() => formatTime(rawInfo.duration)),
    progress: computed((): string => {
      return `${rawInfo.progress * 100}%`;
    }),
  });

  function formatTime(rawSeconds: number) {
    let minutes: string | number = Math.floor(rawSeconds / 60);
    let seconds: string | number = Math.floor(rawSeconds % 60);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
  }

  return {
    srcUrl,
    isPlaying,
    playbackRate,
    preservesPitch,
    volume,
    mode,
    info,
    rawInfo,
    play,
    pause,
    stop,
    seek,
  };
}
