import type { ChangeEvent } from 'react';
import type { TextFieldProps } from '../../types';

import * as styles from './index.css';
import { Suspense, lazy, useCallback, useState } from 'react';
import CircularProgress from '@blueshift-ui/core/dist/components/circular-progress';
import InputAdornment from '@mui/material/InputAdornment';
import MuiTextField from '@mui/material/TextField';
import TextFieldClearButton from './clear-button';
import classNames from 'clsx';
import useControlledState from '@blueshift-ui/core/dist/hooks/use-controlled-state';

const TextFieldEmojiMenu = lazy(() => import('./emoji-menu'));

function TextField({
  clearable,
  gradient,
  InputProps,
  onChange,
  onClear,
  onEmojiSelection,
  value,
  withEmojiMenu,
  ...muiTextFieldProps
}: TextFieldProps) {
  const [controlledValue, setControlledValue] = useControlledState<string>(value ?? '');

  const [isClearButtonVisible, setIsClearButtonVisible] = useState(false);

  /* Event Handlers */

  const handleClear = useCallback(() => {
    onClear?.();
    setControlledValue('');
  }, [onClear, setControlledValue]);

  const handleEmojiSelection = useCallback(
    (emoji: string) => {
      onEmojiSelection?.(emoji);
      setControlledValue((value: string) => `${value ?? ''}${emoji}`);
    },
    [onEmojiSelection, setControlledValue]
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      setControlledValue(event.currentTarget.value ?? '');
    },
    [onChange, setControlledValue]
  );

  /* Render */

  return (
    <MuiTextField
      {...muiTextFieldProps}
      InputProps={{
        ...InputProps,
        classes: {
          ...InputProps?.classes,
          root: classNames(InputProps?.classes?.root, {
            'Blueshift-gradient': gradient,
          }),
        },
        endAdornment:
          clearable || withEmojiMenu ? (
            <div
              className={isClearButtonVisible ? styles.endAdornment : styles.endAdornmentReverse}
            >
              {withEmojiMenu && (
                <InputAdornment position="end">
                  <Suspense fallback={<CircularProgress className={styles.loading} size={16} />}>
                    <TextFieldEmojiMenu
                      disabled={muiTextFieldProps.disabled}
                      edge="end"
                      onEmojiSelection={handleEmojiSelection}
                    />
                  </Suspense>
                </InputAdornment>
              )}

              {clearable && (
                <InputAdornment position="end">
                  <TextFieldClearButton
                    disabled={muiTextFieldProps.disabled}
                    edge="end"
                    onClear={handleClear}
                    onVisibilityChange={setIsClearButtonVisible}
                    value={controlledValue}
                  />
                </InputAdornment>
              )}
            </div>
          ) : (
            InputProps?.endAdornment
          ),
      }}
      onChange={handleInputChange}
      value={controlledValue}
      variant="outlined"
    />
  );
}

export default TextField;
