import type { CatalogItem, ClassItem, SubjectItem } from '@blueshift-ui/search';
import type { ComponentType, FormEvent, HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import type { AutocompleteRenderGroupParams } from '@mui/material';
import type RESULT_TYPE from '@blueshift-ui/search/dist/constants/result-type';
import type { TextFieldProps } from '@blueshift-ui/inputs';

type ExpandLinkOptionClass = {
  _source: { name: 'classLink' };
  type: typeof RESULT_TYPE.class;
};

type ExpandLinkOptionSubject = {
  _source: { name: 'subjectLink' };
  type: typeof RESULT_TYPE.subject;
};

type ExpandLinkOptions = ExpandLinkOptionClass | ExpandLinkOptionSubject;

interface ExpandLinkBase {
  isEmptyStateOption: false;
  isExpandLink: true;
}

type ExpandLink = ExpandLinkOptions & ExpandLinkBase;

interface EmptyStateOptionBase {
  isEmptyStateOption: true;
  isExpandLink: false;
}

type EmptyStateOptionsClass = {
  _source: { name: 'classEmpty' };
  type: typeof RESULT_TYPE.class;
};

type EmptyStateOptionsSubject = {
  _source: { name: 'subjectEmpty' };
  type: typeof RESULT_TYPE.subject;
};

type EmptyStateOptions = EmptyStateOptionsClass | EmptyStateOptionsSubject;

type EmptyStateOption = EmptyStateOptionBase & EmptyStateOptions;

type ConditionalCatalogItemType<T> = T extends ClassItem
  ? typeof RESULT_TYPE.class
  : T extends SubjectItem
    ? typeof RESULT_TYPE.subject
    : (typeof RESULT_TYPE)[keyof typeof RESULT_TYPE];

interface CatalogItemWithType<T = ClassItem | SubjectItem> extends CatalogItem<T> {
  isEmptyStateOption: false;
  isExpandLink: false;
  type: ConditionalCatalogItemType<T>;
}

type SearchbarAutocompleteItem =
  | CatalogItemWithType<ClassItem>
  | CatalogItemWithType<SubjectItem>
  | ExpandLink
  | EmptyStateOption;

type SearchAutocompleteProps<OptionType> = {
  PaperComponent?: ComponentType<HTMLAttributes<HTMLDivElement>>;
  clearInput?: () => void;
  getOptionLabel?: (option: string | OptionType) => string;
  groupBy?: (option: string | OptionType) => string;
  handleOptionSelection?: (event: SyntheticEvent, value: string | OptionType) => void;
  inputLabel?: string;
  inputValue?: string;
  isLoading?: boolean;
  noOptionsText?: string;
  onInputBlur?: (event: SyntheticEvent) => void;
  onInputChange?: (event: SyntheticEvent<Element, Event>, value: string) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement | HTMLDivElement>) => void;
  options?: OptionType[];
  placeholder?: string;
  renderGroup?: ((params: AutocompleteRenderGroupParams) => ReactNode) | undefined;
  renderOption?: (props: HTMLAttributes<HTMLLIElement>, option: OptionType) => ReactNode;
  searchInputProps?: TextFieldProps;
  withBackdrop?: boolean;
};

export type {
  CatalogItemWithType,
  EmptyStateOption,
  ExpandLink,
  SearchAutocompleteProps,
  SearchbarAutocompleteItem,
};
