import type {
  BaseSelectOptionComponentProps,
  SelectComponentProps,
  SelectOption,
} from '../../../../types';
import type { ChangeEvent, Ref } from 'react';

import * as styles from './index.css';
import { forwardRef, useState } from 'react';
import BottomDrawerSelectOption from './components/bottom-drawer-select-option';
import CustomSelect from '../custom-select';
import Drawer from '@blueshift-ui/core/dist/components/drawer';
import DrawerContent from '@blueshift-ui/core/dist/components/drawer-content';
import DrawerHeader from '@blueshift-ui/core/dist/components/drawer-header';
import MuiList from '@mui/material/List';
import MuiListItemButton from '@mui/material/ListItemButton';
import SelectOptionContent from '../select-option-content';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import { useFormControl } from '@mui/material/FormControl';

function BottomDrawerSelect<
  TOptionComponentProps extends BaseSelectOptionComponentProps = BaseSelectOptionComponentProps,
>(
  {
    label,
    onChange,
    options,
    optionComponent = BottomDrawerSelectOption,
    optionComponentProps,
    value,
    ...customSelectProps
  }: SelectComponentProps<TOptionComponentProps>,
  ref: Ref<HTMLInputElement | undefined>
) {
  const formControl = useFormControl();

  const [isActive, setIsActive] = useState(false);
  // State control to prevent an infinite loop of opening and closing the bottom drawer
  const [isClosing, setIsClosing] = useState(false);

  function handleInteraction() {
    if (!formControl?.disabled && !isClosing) {
      setIsActive(true);
    }
    setIsClosing(false);
  }

  function handleClose() {
    setIsClosing(true);
    setIsActive(false);
  }

  function handleSelect(option: SelectOption) {
    const simulatedEvent = { target: { value: option.value } } as ChangeEvent<HTMLInputElement>;
    onChange(simulatedEvent);
    handleClose();
  }

  return (
    <>
      <Drawer
        anchor="bottom"
        ariaLabel={`${label} options`}
        isOpen={isActive}
        onClose={handleClose}
        PaperProps={{ className: styles.bottomDrawer }}
      >
        {!label ? null : (
          <DrawerHeader className={styles.bottomDrawerHeader}>
            <Typography className={styles.label} variant="titleLarge">
              {label}
            </Typography>
          </DrawerHeader>
        )}

        <DrawerContent className={styles.bottomDrawerContent}>
          <MuiList classes={{ root: styles.options }}>
            {options.map((option) => {
              const selected = option.value === value;
              return (
                <MuiListItemButton
                  className={styles.option}
                  component="a"
                  disabled={option.disabled}
                  key={option.id ?? option.value}
                  onClick={() => handleSelect(option)}
                  role="option"
                  selected={selected}
                >
                  <SelectOptionContent
                    option={option}
                    optionComponent={optionComponent}
                    optionComponentProps={optionComponentProps}
                    selected={selected}
                  />
                </MuiListItemButton>
              );
            })}
          </MuiList>
        </DrawerContent>
      </Drawer>

      <CustomSelect
        {...customSelectProps}
        label={label}
        onChange={onChange}
        onClick={handleInteraction}
        onFocus={handleInteraction}
        open={false}
        optionComponent={optionComponent}
        optionComponentProps={optionComponentProps}
        options={options}
        ref={ref}
        value={value}
      />
    </>
  );
}

export default forwardRef(BottomDrawerSelect);
