import type { ChangeEvent, ReactNode } from 'react';
import type { SearchInputProps } from '../../types/search-input-props';

import * as styles from './index.css';
import { MagnifyingGlass as MagnifyingGlassIcon, X as XIcon } from '@phosphor-icons/react';
import Backdrop from '@mui/material/Backdrop';
import FormControl from '@mui/material/FormControl';
import IconButton from '@blueshift-ui/core/dist/components/icon-button';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@blueshift-ui/core/dist/components/skeleton';
import { Suspense } from 'react';
import TextField from '@blueshift-ui/inputs/dist/components/text-field';
import classNames from 'clsx';

function _SearchSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton className={styles.skeleton} key={index} variant="rectangular" />
      )).map((item) => item)}
    </>
  );
}

function SearchInput({
  isLoading = false,
  onChange,
  onSubmit,
  result = [] as ReactNode,
  value,
  withBackdrop,
  ...textFieldProps
}: SearchInputProps) {
  function handleCloseClick() {
    const simulatedEvent = {
      target: {
        value: '',
      },
    } as ChangeEvent<HTMLInputElement>;

    onChange?.(simulatedEvent);
  }

  return (
    <form onSubmit={onSubmit}>
      <FormControl className={styles.formContainer} variant="outlined">
        <TextField
          {...textFieldProps}
          className={classNames(styles.input, textFieldProps.className)}
          InputProps={{
            endAdornment: value ? (
              <InputAdornment position="end">
                <IconButton className="close-search-bar" onClick={handleCloseClick} size="small">
                  <XIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
            startAdornment: (
              <InputAdornment position="start">
                <MagnifyingGlassIcon />
              </InputAdornment>
            ),
          }}
          onChange={onChange}
          value={value}
        />

        {isLoading || result ? (
          <>
            {withBackdrop ? <Backdrop className={styles.backdrop} open /> : null}

            <div aria-live="polite" className={styles.searchResultContainer} role="region">
              <Suspense fallback={<_SearchSkeleton />}>
                {isLoading ? <_SearchSkeleton /> : result}
              </Suspense>
            </div>
          </>
        ) : null}
      </FormControl>
    </form>
  );
}
export type { SearchInputProps };

export default SearchInput;
