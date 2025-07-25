import type { default as ReactPlayerVideoPlayerRef } from 'react-player';

interface VideoPlayerRef extends ReactPlayerVideoPlayerRef {
  player: {
    isPlaying: boolean;
    mounted: boolean;
  };
}

export type { VideoPlayerRef };
