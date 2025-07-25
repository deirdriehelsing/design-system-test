import type { ReactPlayerProps } from 'react-player';
import type { Ref } from 'react';
import type { VideoPlayerRef } from '../../types';

import * as styles from './index.css';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Skeleton from '@blueshift-ui/core/dist/components/skeleton';
import classNames from 'clsx';

interface VideoPlayerProps
  extends Omit<Partial<ReactPlayerProps>, 'onEnded' | 'onPause' | 'onPlay' | 'onReady' | 'onStop'> {
  className?: string;
  currentTime?: number;
  loading?: boolean;
  onEnded?: (player: VideoPlayerRef | null) => void;
  onPause?: (player: VideoPlayerRef | null) => void;
  onPlay?: (player: VideoPlayerRef | null) => void;
  onReady?: (player: VideoPlayerRef | null) => void;
  onStop?: (player: VideoPlayerRef | null) => void;
  poster?: string;
  url: string;
  variant?: 'rectangular' | 'rounded';
}

function VideoPlayer(
  {
    className,
    currentTime,
    loading,
    poster,
    onEnded,
    onPause,
    onPlay,
    onReady,
    onStop,
    variant = 'rectangular',
    url,
    ...videoPlayerProps
  }: VideoPlayerProps,
  ref: Ref<VideoPlayerRef | null>
) {
  /* Hooks */

  const [playerReady, setPlayerReady] = useState(false);
  const hasBeenPartiallyPlayed = useRef(false);
  const innerRef = useRef<VideoPlayerRef | null>(null);
  const updatePlayerPoster = useCallback(() => {
    if (!poster) {
      return;
    }

    const currentPlayer = innerRef.current;
    const internalPlayer = currentPlayer?.getInternalPlayer();
    if (internalPlayer) {
      internalPlayer.poster = poster;
    }
  }, [poster]);
  const callbackRef = useCallback(
    (ref: VideoPlayerRef | null) => {
      innerRef.current = ref;
      updatePlayerPoster();
    },
    [updatePlayerPoster]
  );

  useImperativeHandle(ref, () => innerRef.current);

  /* Event handlers */

  function handlePlay() {
    const currentPlayer = innerRef.current;
    onPlay?.(currentPlayer);
    hasBeenPartiallyPlayed.current = true;
  }

  function handlePause() {
    const currentPlayer = innerRef.current;
    onPause?.(currentPlayer);
  }

  function handleEnded() {
    const currentPlayer = innerRef.current;
    onEnded?.(currentPlayer);
    hasBeenPartiallyPlayed.current = false;
  }

  function handleReady(player: ReactPlayer) {
    updatePlayerPoster();
    setPlayerReady(true);
    onReady?.(player as VideoPlayerRef);
  }

  /**
   * On stop event is called when the video player is unmounted midway through
   * a complete reproduction.
   */
  const handleStop = useCallback(
    (player: VideoPlayerRef | null) => {
      if (hasBeenPartiallyPlayed.current) {
        onStop?.(player);
      }
    },
    [onStop]
  );

  /* Effects */

  // Cleanup player when unmounted
  useEffect(() => {
    const currentPlayer = innerRef.current;
    return () => handleStop(currentPlayer);
  }, [handleStop]);

  // Update player current time when available
  useEffect(() => {
    const currentPlayer = innerRef.current;
    if (typeof currentTime === 'number' && currentTime >= 0 && currentPlayer && playerReady) {
      currentPlayer.seekTo(currentTime, 'seconds');
    }
  }, [currentTime, innerRef, playerReady]);

  // Update player poster image when available
  useEffect(() => {
    updatePlayerPoster();
  }, [poster, updatePlayerPoster]);

  /* Render */

  const rootClassName = classNames(
    styles.player,
    {
      [styles.rounded]: variant === 'rounded',
    },
    className
  );

  if (loading) {
    return (
      <Skeleton
        className={rootClassName}
        data-testid="skeleton"
        height="100%"
        variant={variant}
        width="100%"
      />
    );
  }

  return (
    <ReactPlayer
      className={rootClassName}
      controls={true}
      height="100%"
      ref={callbackRef}
      width="100%"
      {...videoPlayerProps}
      onEnded={handleEnded}
      onPause={handlePause}
      onPlay={handlePlay}
      onReady={handleReady}
      url={url}
    />
  );
}

export default forwardRef(VideoPlayer);
