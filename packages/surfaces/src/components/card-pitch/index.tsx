import type { ReactNode } from 'react';

import * as styles from './index.css';
import BaseCard from '../base-card';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import classNames from 'clsx';
import pinImg from '../../assets/components/card-pitch/pin.png';

interface CardPitchProps {
  className?: string;
  description: ReactNode;
  title: ReactNode;
}

function CardPitch({ className, description, title }: CardPitchProps): JSX.Element {
  return (
    <div className={classNames(styles.container, className)}>
      <img alt="Pin" className={styles.pin} height="64px" src={pinImg} width="48px" />
      <BaseCard className={styles.baseCard} contentProps={{ className: styles.baseCardContent }}>
        <Typography className={styles.title} component="h1" variant="headlineMedium">
          {title}
        </Typography>

        <Typography className={styles.description} component="p" variant="bodySmall">
          {description}
        </Typography>
      </BaseCard>
    </div>
  );
}

export default CardPitch;
