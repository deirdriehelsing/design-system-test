import type {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormProps,
  UseFormReturn,
} from '../../types';

import { getDefaultFormProps, getDirtyFieldValues } from '../../helpers';
import { useForm as rhfUseForm } from 'react-hook-form';
import { useCallback } from 'react';

function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  props?: UseFormProps<TFieldValues, TContext>
): UseFormReturn<TFieldValues, TContext, TTransformedValues | undefined> {
  // It's a good idea to remove any custom properties, otherwise RHF may behave unexpectedly
  const { shouldSubmitDirtyFieldsOnly, ...rhfProps } = props ?? {};

  const form = rhfUseForm<TFieldValues, TContext, TTransformedValues>({
    ...getDefaultFormProps<TFieldValues, TContext>(),
    ...rhfProps,
  });

  // Keep a reference to the original handleSubmit function
  // We'll use it as a closure in our own handleSubmit implementation.
  const originalHandleSubmit = form.handleSubmit;

  const handleSubmit = useCallback<UseFormHandleSubmit<TFieldValues, TTransformedValues>>(
    (onValid, onInvalid) => {
      if (!shouldSubmitDirtyFieldsOnly) {
        return (event) => originalHandleSubmit(onValid, onInvalid)(event);
      }

      function onValidWithDirtyFields(
        values: TFieldValues | undefined,
        event?: React.BaseSyntheticEvent
      ) {
        const dirtyFieldValues = getDirtyFieldValues<TFieldValues>(
          form.formState.dirtyFields,
          values
        );

        return onValid(dirtyFieldValues, event);
      }

      return (event) =>
        originalHandleSubmit(
          // This is needed to satisfy type checking
          onValidWithDirtyFields as TTransformedValues extends undefined
            ? SubmitHandler<TFieldValues>
            : TTransformedValues extends FieldValues
              ? SubmitHandler<TTransformedValues>
              : never,
          onInvalid
        )(event);
    },
    [form, originalHandleSubmit, shouldSubmitDirtyFieldsOnly]
  );

  // We need to return the original form object and not a copy of it, otherwise RHF may behave unexpectedly.
  return Object.assign(form, { handleSubmit });
}

export default useForm;
