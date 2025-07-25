import type { FieldValues, UseFormProps } from '../../types';

function getDefaultFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>(): UseFormProps<TFieldValues, TContext> {
  return {
    mode: 'onTouched',
  };
}

export default getDefaultFormProps;
