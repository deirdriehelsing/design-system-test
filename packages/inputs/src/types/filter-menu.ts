import type { SetStateAction } from 'react';

type FilterMenuMultiSelectOptionsOnChange = (
  value: SetStateAction<FilterMenuMultiSelectOptionsValue>
) => void;

type FilterMenuMultiSelectOptionsValue = string[] | undefined;

type FilterMenuSingleSelectOptionsOnChange = (value: FilterMenuSingleSelectOptionsValue) => void;

type FilterMenuSingleSelectOptionsValue = string | undefined;

export type {
  FilterMenuMultiSelectOptionsOnChange,
  FilterMenuMultiSelectOptionsValue,
  FilterMenuSingleSelectOptionsOnChange,
  FilterMenuSingleSelectOptionsValue,
};
