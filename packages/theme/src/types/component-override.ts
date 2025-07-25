import type { Components, Theme } from '@mui/material';
import type { ChartsComponents } from '@mui/x-charts/themeAugmentation/';
import type { DataGridProComponents } from '@mui/x-data-grid-pro/themeAugmentation';
import type { PickerComponents } from '@mui/x-date-pickers/themeAugmentation';
import type { PickerComponents as PickerProComponents } from '@mui/x-date-pickers-pro/themeAugmentation';
import type { TreeViewComponents } from '@mui/x-tree-view/themeAugmentation';

type ComponentOverride<
  TComponent extends
    | keyof ChartsComponents
    | keyof Components<Theme>
    | keyof DataGridProComponents<Theme>
    | keyof PickerComponents<Theme>
    | keyof PickerProComponents<Theme>
    | keyof TreeViewComponents<Theme>,
> = Record<TComponent, Components<Theme>[TComponent]>;

export type { ComponentOverride };
