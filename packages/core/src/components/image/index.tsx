import type { ImgHTMLAttributes } from 'react';

import * as styles from './index.css';
import React, { useEffect, useRef, useState } from 'react';
import Skeleton from '../skeleton';
import classNames from 'clsx';

const invisiblePlaceholderImg =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  height: string | number;
  loading?: 'lazy' | 'eager';
  width: string | number;
}

function Image({
  alt,
  className,
  height,
  loading = 'lazy',
  onLoad,
  src,
  width,
  style,
  ...props
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(loading === 'eager');
  const [shouldApplySources, setShouldApplySources] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const { backgroundImage, ...otherStyles } = style ?? {};

  useEffect(() => {
    if (shouldApplySources) {
      return;
    }

    const currentImgRef = imgRef.current;

    if (!currentImgRef) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(currentImgRef);

    return () => {
      observer.unobserve(currentImgRef);
    };
  }, [shouldApplySources]);

  useEffect(() => {
    if (isIntersecting) {
      setShouldApplySources(true);
    }

    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [isIntersecting]);

  function handleImageLoad(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    setIsLoaded(true);
    onLoad?.(event);
  }

  return (
    <div
      className={classNames(styles.container, className)}
      style={
        {
          '--container-height': height,
          '--container-width': width,
        } as React.CSSProperties
      }
    >
      {!isLoaded && <Skeleton className={classNames(styles.skeleton, className)} component="div" />}
      <img
        alt={alt}
        className={classNames(styles.image, className, {
          [styles.loadedImage]: isLoaded,
        })}
        height={height}
        onLoad={handleImageLoad}
        ref={imgRef}
        // source should always be provided, not providing a src causes the img element to show a grey border around it
        src={(shouldApplySources ? src : undefined) ?? invisiblePlaceholderImg}
        style={{ ...otherStyles, ...(shouldApplySources ? { backgroundImage } : undefined) }}
        width={width}
        {...props}
      />
    </div>
  );
}

export default Image;
