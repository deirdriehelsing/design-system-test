import type { FormEvent, ReactNode } from 'react';
import type { TextFieldProps } from '@blueshift-ui/inputs';

type SearchInputProps = {
  isLoading?: boolean;
  onSubmit?: (event: FormEvent<HTMLFormElement | HTMLDivElement>) => void;
  result?: ReactNode;
  withBackdrop?: boolean;
} & Omit<TextFieldProps, 'onSubmit'>;

export type { SearchInputProps };
