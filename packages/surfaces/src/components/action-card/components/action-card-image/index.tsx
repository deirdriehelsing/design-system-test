import type { ReactNode } from 'react';

import * as styles from './index.css';

interface ActionCardImageProps {
  alt?: string;
  image?: string | ReactNode;
}

function ActionCardImage({ image, alt }: ActionCardImageProps) {
  if (typeof image === 'string') {
    return <img alt={alt} className={styles.image} src={image} />;
  }
  return <div className={styles.image}>{image}</div>;
}

export default ActionCardImage;
