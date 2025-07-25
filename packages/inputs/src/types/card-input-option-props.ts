import type { BaseCardProps } from '@blueshift-ui/surfaces';
import type { InputOption } from './input-option';
import type { ReactNode } from 'react';

interface CardInputOptionProps
  extends Omit<InputOption, 'control' | 'label'>,
    Omit<BaseCardProps, 'ref'> {
  description?: string;
  image?: string | ReactNode;
  label: string;
  selected?: boolean;
}

export type { CardInputOptionProps };
