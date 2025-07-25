import type { UseHandlerParams, UserEnteredInputEvent } from '../../types';
import type { SyntheticEvent } from 'react';

import { useAnalytics, useEventScope } from '..';
import { ANALYTICS_EVENT_NAMES } from '../../constants';
import { addCommonEventProperties } from '../../helpers';
import { useCallback } from 'react';

type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type UseEnteredInputHandlerParams<
  InputEnteredEvent extends SyntheticEvent = SyntheticEvent<InputElement>,
> = UseHandlerParams<UserEnteredInputEvent> & {
  /**
   * The action that that triggered the event. Defaults to `blur`.
   */
  actionType?: 'blur' | 'change' | 'focus';
  /**
   * Whether the input is masked (e.g., credit cards and other PII). Passwords are always masked
   * regardless of this value.
   */
  isMasked?: boolean;
  /**
   * A callback handler function, called when input is entered.
   *
   * @note When set, this must always be a stable function reference. Use useCallback or define it
   * at a higher scope than the component that uses it.
   */
  onEntered?: (event: InputEnteredEvent) => void;
};

/**
 * A hook that can be used to track when a user enters input into a form field. This hook can be
 * used for:
 * - Text input fields, including `textarea`
 * - Checkboxes
 * - Radio buttons
 * - Select fields
 */
function useEnteredInputHandler<
  InputEnteredEvent extends SyntheticEvent = SyntheticEvent<InputElement>,
>({
  actionType = 'blur',
  isMasked = false,
  onEntered,
  trackedProperties,
  trackingDisabled = false,
}: UseEnteredInputHandlerParams<InputEnteredEvent> = {}) {
  const analytics = useAnalytics();
  const eventScope = useEventScope();

  const handleEnteredInput = useCallback(
    (event: InputEnteredEvent, eventTrackedProperties?: Partial<UserEnteredInputEvent>) => {
      if (!trackingDisabled) {
        const element = event.currentTarget as InputElement;
        const tagName = element.tagName.toLowerCase();
        const isCheckable = ['checkbox', 'radio'].includes(element.type);
        const hasValue = isCheckable
          ? // We have to cast to `HTMLInputElement` because TypeScript can't infer the element type.
            // We're verifying the element type with `isCheckable`, so this is safe.
            (element as HTMLInputElement).checked
          : element.value;
        const inputState = hasValue ? 'filled' : 'empty';

        const eventProperties: Partial<UserEnteredInputEvent> = {
          element_id: element.id,
          element_type: tagName,
          input_action: actionType,
          input_state: inputState,
          input_type: element.type ?? 'text',
          ...addCommonEventProperties({
            eventScope,
            trackedProperties: [trackedProperties, eventTrackedProperties],
          }),
          is_input_masked: element.type === 'password' ? true : isMasked,
        };

        analytics.track(ANALYTICS_EVENT_NAMES.userEnteredInput, eventProperties);
      }

      // 1. If tracking is disabled, we still want to call the passed in handler if provided.
      // 2. This needs to be called last so we can guarantee that the tracked analytic properties
      //    are correct.
      onEntered?.(event);
    },
    [actionType, analytics, eventScope, isMasked, onEntered, trackedProperties, trackingDisabled]
  );

  return handleEnteredInput;
}

export default useEnteredInputHandler;
