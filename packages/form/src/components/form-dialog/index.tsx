import type { FieldErrors, FieldValues, FormDialogProps } from '../../types';

import * as styles from './index.css';
import React, { Suspense } from 'react';
import AsyncActionButton from '@blueshift-ui/inputs/dist/components/async-action-button';
import Box from '@blueshift-ui/core/dist/components/box';
import Dialog from '@blueshift-ui/feedback/dist/components/dialog';
import Link from '@blueshift-ui/core/dist/components/link';
import Snackbar from '@blueshift-ui/feedback/dist/components/snackbar';
import Stack from '@blueshift-ui/core/dist/components/stack';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import useTranslation from '@blueshift-ui/i18n/dist/hooks/use-translation';

function FormDialog<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  cancelText,
  children,
  disableErrorMessage,
  disableSuccessMessage,
  disabled,
  errorMessage,
  form,
  onRejected,
  onResolved,
  onSubmit,
  submitText,
  successMessage,
  ...dialogProps
}: FormDialogProps<TFieldValues, TContext, TTransformedValues>) {
  const { onClose, open } = dialogProps;
  const { translate } = useTranslation('forms', { ns: 'blueshift-ui' });

  const [isSuccessFeedbackShown, setIsSuccessFeedbackShown] = React.useState(false);
  const [isErrorFeedbackShown, setIsErrorFeedbackShown] = React.useState(false);

  // Resets the form when dialog is (re)opened
  React.useEffect(() => {
    if (open) {
      form.reset();
      setIsSuccessFeedbackShown(false);
      setIsErrorFeedbackShown(false);
    }
  }, [open, form]);

  function handleClose() {
    onClose?.();
  }

  function handleAction() {
    return new Promise<ReturnType<typeof onSubmit>>((resolve, reject) => {
      async function onValid(data: TFieldValues, event?: React.BaseSyntheticEvent) {
        try {
          resolve(await onSubmit(data, event));
        } catch (error) {
          console.error(error);
          reject(error);
        }
      }

      function onInvalid(errors: FieldErrors<TFieldValues>) {
        console.error(`Validation Error: ${JSON.stringify(errors, null, 2)}`);
        reject('Validation Error');
      }

      form.handleSubmit(onValid, onInvalid)();
    });
  }

  function handleRejected(error: unknown) {
    // Don't show error feedback if it's a validation error
    // Validation errors are shown in the form itself
    if (error !== 'Validation Error') {
      setIsErrorFeedbackShown(true);
    }

    onRejected?.(error);
  }

  function handleResolved(result: Awaited<ReturnType<typeof onSubmit>>) {
    setIsSuccessFeedbackShown(true);
    onResolved?.(result);
  }

  function handleSuccessSnackbarClose() {
    setIsSuccessFeedbackShown(false);
  }

  return (
    <>
      <Dialog
        actions={
          <Stack className={styles.actions} direction="row" spacing={2}>
            <AsyncActionButton
              // Submit handler needs to be added here as well
              // Buttons render separately from the form element in the Dialog component
              action={handleAction}
              className={styles.submitButton}
              disabled={disabled}
              onRejected={handleRejected}
              onResolved={handleResolved}
            >
              {submitText ?? translate('submit', '')}
            </AsyncActionButton>
            <Link
              className={styles.linkButton}
              component="button"
              onClick={handleClose}
              variant="labelMedium"
            >
              {cancelText ?? translate('cancel', '')}
            </Link>
          </Stack>
        }
        fullWidth
        withCloseButton
        {...dialogProps}
      >
        <Box className={styles.container}>
          {/* Form Content. Needs suspense to handle i18n loading */}
          <Suspense>{children}</Suspense>

          {/* Error Feedback */}
          {isErrorFeedbackShown && !disableErrorMessage && (
            <Typography className={styles.errorFeedback} variant="bodySmall">
              <b>{errorMessage ?? translate('error_message', '')}</b>
            </Typography>
          )}
        </Box>
      </Dialog>

      {/* Success Feedback */}
      <Snackbar
        message={successMessage ?? translate('success_message', '')}
        onClose={handleSuccessSnackbarClose}
        open={isSuccessFeedbackShown && !disableSuccessMessage}
        severity="success"
      />
    </>
  );
}

export default FormDialog;
