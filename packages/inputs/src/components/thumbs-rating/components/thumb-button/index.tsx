import type { ThumbsRatingValue } from '../../../../types/thumbs-rating-value';
import type { ThumbsRatingVariant } from '../../../../types/thumbs-rating-variant';

import * as styles from './index.css';
import { ThumbsDown as ThumbsDownIcon, ThumbsUp as ThumbsUpIcon } from '@phosphor-icons/react';
import RoundButton from '@blueshift-ui/core/dist/components/round-button';
import useTranslation from '@blueshift-ui/i18n/dist/hooks/use-translation';

interface ThumbButtonProps {
  disabled?: boolean;
  error?: boolean;
  onClick?: (variant: ThumbsRatingVariant) => void;
  value?: ThumbsRatingValue;
  variant?: ThumbsRatingVariant;
}

function ThumbButton({
  disabled,
  error,
  variant = 'up',
  value,
  onClick,
  ...props
}: ThumbButtonProps) {
  const { translate } = useTranslation('inputs', { ns: 'blueshift-ui' });
  const Icon = variant === 'up' ? ThumbsUpIcon : ThumbsDownIcon;

  function handleClick() {
    onClick?.(variant);
  }

  function getIconStyleVariant() {
    switch (true) {
      case value === variant:
        return 'selected';
      case disabled:
        return 'disabled';
      case error:
        return 'error';
      default:
        return 'default';
    }
  }

  return (
    <RoundButton
      aria-label={translate('thumbs_button_label', { context: variant })}
      className={styles.button}
      color={error ? 'error' : 'secondary'}
      disabled={disabled}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      variant={value === variant ? 'contained' : 'outlined'}
      {...props}
    >
      <Icon className={styles.icon?.[getIconStyleVariant()]} size={24} weight="duotone" />
    </RoundButton>
  );
}

export default ThumbButton;
