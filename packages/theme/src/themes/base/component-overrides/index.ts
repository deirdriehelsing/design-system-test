import type { Tokens } from '../../../types/tokens';

import accordionOverrides from './accordion';
import alertOverrides from './alert';
import appBarOverrides from './app-bar';
import autocompleteOverrides from './autocomplete';
import backdropOverrides from './backdrop';
import badgeOverrides from './badge';
import baselineOverrides from './baseline';
import breadcrumbsOverrides from './breadcrumbs';
import buttonOverrides from './button';
import cardOverrides from './card';
import checkboxOverrides from './checkbox';
import chipOverrides from './chip';
import circularProgressOverrides from './circular-progress';
import dataGridOverrides from './data-grid';
import datePickerOverrides from './date-picker';
import dateRangePickerOverrides from './date-range-picker';
import dialogOverrides from './dialog';
import fabOverrides from './fab';
import formHelperTextOverrides from './form-helper-text';
import formLabelOverrides from './form-label';
import iconButtonOverrides from './icon-button';
import inputAdornmentOverrides from './input-adornment';
import inputBaseOverrides from './input-base';
import lineChartOverrides from './line-chart';
import linearProgressOverrides from './linear-progress';
import linkOverrides from './link';
import listOverrides from './list';
import menuOverrides from './menu';
import nativeSelectOverrides from './native-select';
import paginationItemOverrides from './pagination-item';
import paginationOverrides from './pagination';
import paperOverrides from './paper';
import radioOverrides from './radio';
import ratingOverrides from './rating';
import selectOverrides from './select';
import skeletonOverrides from './skeleton';
import snackbarOverrides from './snackbar';
import stackOverrides from './stack';
import stepLabelOverrides from './step-label';
import stepOverrides from './step';
import stepperOverrides from './stepper';
import textFieldOverrides from './text-field';
import toolbarOverrides from './toolbar';
import tooltipOverrides from './tooltip';
import treeItemViewOverrides from './tree-item';
import typographyOverrides from './typography';

function componentOverrides(tokens: Tokens) {
  return {
    ...accordionOverrides(tokens),
    ...alertOverrides(tokens),
    ...appBarOverrides(tokens),
    ...autocompleteOverrides(tokens),
    ...backdropOverrides(tokens),
    ...badgeOverrides(tokens),
    ...baselineOverrides(tokens),
    ...breadcrumbsOverrides(tokens),
    ...buttonOverrides(tokens),
    ...cardOverrides(tokens),
    ...checkboxOverrides(tokens),
    ...chipOverrides(tokens),
    ...circularProgressOverrides(tokens),
    ...dataGridOverrides(tokens),
    ...datePickerOverrides(tokens),
    ...dateRangePickerOverrides(tokens),
    ...dialogOverrides(tokens),
    ...fabOverrides(tokens),
    ...formHelperTextOverrides(tokens),
    ...formLabelOverrides(tokens),
    ...iconButtonOverrides(tokens),
    ...inputAdornmentOverrides(tokens),
    ...inputBaseOverrides(tokens),
    ...lineChartOverrides(tokens),
    ...linearProgressOverrides(tokens),
    ...linkOverrides(tokens),
    ...listOverrides(tokens),
    ...menuOverrides(tokens),
    ...nativeSelectOverrides(tokens),
    ...paginationItemOverrides(tokens),
    ...paginationOverrides(),
    ...paperOverrides(tokens),
    ...radioOverrides(tokens),
    ...ratingOverrides(tokens),
    ...selectOverrides(tokens),
    ...skeletonOverrides(),
    ...snackbarOverrides(tokens),
    ...stackOverrides(tokens),
    ...stepOverrides(),
    ...stepLabelOverrides(tokens),
    ...stepperOverrides(),
    ...textFieldOverrides(tokens),
    ...toolbarOverrides(tokens),
    ...treeItemViewOverrides(tokens),
    ...tooltipOverrides(tokens),
    ...typographyOverrides(tokens),
  };
}

export default componentOverrides;
