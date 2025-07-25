import type { TextFieldProps } from '../../types/text-field-props';

import * as styles from './index.css';
import TextField from '../text-field';
import classNames from 'clsx';

function TextArea({ className, minRows = 3, ...textareaProps }: Omit<TextFieldProps, 'multiline'>) {
  return (
    <TextField
      {...textareaProps}
      className={classNames(styles.textArea, className)}
      minRows={minRows}
      multiline={true}
    />
  );
}

export default TextArea;
