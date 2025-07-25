import type { ButtonProps } from '@mui/material';

import { scrollToElement, scrollToTop } from '../../helpers';
import Button from '@blueshift-ui/core/dist/components/button';
import React from 'react';

interface BackToTopButtonBaseProps extends ButtonProps {
  onClick?: () => void;
}

interface BackToTopButtonWithSelectorProps extends BackToTopButtonBaseProps {
  targetElement?: never;
  targetSelector?: string;
}

interface BackToTopButtonWithElementProps extends BackToTopButtonBaseProps {
  targetElement?: HTMLElement;
  targetSelector?: never;
}

type BackToTopButtonProps = BackToTopButtonWithSelectorProps | BackToTopButtonWithElementProps;

function BackToTopButton({
  children,
  onClick,
  targetSelector,
  targetElement,
  variant = 'outlined',
  ...buttonProps
}: BackToTopButtonProps) {
  function handleClick() {
    onClick?.();

    if (targetSelector) {
      scrollToElement({ selector: targetSelector });

      return;
    }

    if (targetElement) {
      scrollToElement({ element: targetElement });

      return;
    }

    scrollToTop();
  }

  return (
    <Button {...buttonProps} onClick={handleClick} variant={variant}>
      {children}
    </Button>
  );
}

export default BackToTopButton;
