import type { FocusEvent, Ref } from 'react';
import type { UseHandlerParams, UserEnteredInputEvent } from '../../types';
import type { TextFieldProps } from '@blueshift-ui/inputs/dist/types';

import TextField from '@blueshift-ui/inputs/dist/components/text-field';
import { forwardRef } from 'react';
import { useEnteredInputHandler } from '../../hooks';

type TrackedTextFieldProps = TextFieldProps &
  UseHandlerParams<UserEnteredInputEvent> & {
    /**
     * Whether the input is masked (e.g., credit cards and other PII). Passwords are always masked
     * regardless of this value.
     */
    isMasked?: boolean;
  };

/**
 * @deprecated this component will be removed in v5. Use the event handler hooks instead.
 */
function TrackedTextField(
  {
    id,
    onBlur,
    isMasked = false,
    trackedProperties,
    type = 'text',
    ...textFieldProps
  }: TrackedTextFieldProps,
  ref: Ref<HTMLDivElement>
) {
  const isForceMasked = type === 'password';

  const handleEnteredInput = useEnteredInputHandler<FocusEvent<HTMLInputElement>>({
    actionType: 'blur',
    isMasked: isForceMasked || isMasked,
    // We're hijacking the `onBlur` handler to track the input entered event, so be sure to pass
    // along the incoming `onBlur`, if it exists.
    onEntered: onBlur,
    trackedProperties,
  });

  return (
    <TextField {...textFieldProps} id={id} onBlur={handleEnteredInput} ref={ref} type={type} />
  );
}

export default forwardRef(TrackedTextField);
