import type { FieldValues, UseFormProps as RHFUseFormProps } from 'react-hook-form';

interface UseFormProps<TFieldValues extends FieldValues = FieldValues, TContext = any>
  extends RHFUseFormProps<TFieldValues, TContext> {
  shouldSubmitDirtyFieldsOnly?: boolean;
}

export type { UseFormProps };
