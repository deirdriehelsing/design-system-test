import type {
  BaseSelectOptionComponentProps,
  SelectOption,
  SelectOptionComponentProps,
} from '../../../../types';

import React from 'react';

interface SelectOptionContentProps<
  TOptionComponentProps extends BaseSelectOptionComponentProps = BaseSelectOptionComponentProps,
> {
  option: SelectOption;
  optionComponent: React.ElementType;
  optionComponentProps?: SelectOptionComponentProps<TOptionComponentProps>;
  selected: boolean;
}

function SelectOptionContent<
  TOptionComponentProps extends BaseSelectOptionComponentProps = BaseSelectOptionComponentProps,
>({
  option,
  optionComponent: OptionComponent,
  optionComponentProps,
  selected,
}: SelectOptionContentProps<TOptionComponentProps>) {
  const selectOptionComponentProps =
    // Check this issue for reason on why instanceof instead of typeof https://github.com/microsoft/TypeScript/issues/37663
    optionComponentProps instanceof Function
      ? optionComponentProps(option, selected)
      : (optionComponentProps ?? { option, selected });

  return <OptionComponent {...selectOptionComponentProps} />;
}

export type { SelectOptionContentProps };

export default SelectOptionContent;
