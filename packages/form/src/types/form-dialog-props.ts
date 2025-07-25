import type { FieldValues, UseFormReturn } from '..';
import type { DialogProps } from '@blueshift-ui/feedback';

type FormSubmitHandler<
  TFieldValues extends FieldValues = FieldValues,
  TTransformedValues extends FieldValues | undefined = undefined,
> = TTransformedValues extends FieldValues
  ? (data: TTransformedValues, event?: React.BaseSyntheticEvent) => any | Promise<any>
  : (data: TFieldValues, event?: React.BaseSyntheticEvent) => any | Promise<any>;

interface FormDialogProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
  TOnSubmit extends FormSubmitHandler<TFieldValues, TTransformedValues> = FormSubmitHandler<
    TFieldValues,
    TTransformedValues
  >,
> extends Omit<DialogProps, 'actions' | 'onSubmit'> {
  cancelText?: string;
  children: React.ReactNode;
  disableErrorMessage?: boolean;
  disableSuccessMessage?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues | undefined>;
  onRejected?: (error: unknown) => void;
  onResolved?: (resolved: Awaited<ReturnType<TOnSubmit>>) => void;
  onSubmit: TOnSubmit;
  submitText?: string;
  successMessage?: string;
}

export type { FormDialogProps };
