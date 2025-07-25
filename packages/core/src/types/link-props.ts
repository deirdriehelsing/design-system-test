import type { ElementType } from 'react';
import type { LinkTypeMap as MuiLinkTypeMap } from '@mui/material/Link';
import type { OverrideProps as MuiOverrideProps } from '@mui/material/OverridableComponent';

type LinkProps<
  RootComponent extends ElementType = MuiLinkTypeMap['defaultComponent'],
  AdditionalProps = object,
> = MuiOverrideProps<
  Omit<MuiLinkTypeMap<AdditionalProps, RootComponent>, 'color'>,
  RootComponent
> & {
  /**
   * @deprecated This prop has no effect on the rendered link and will be removed in a future release.
   * @see: {@link https://github.com/blueshift-ui/blueshift-ui/blob/main/packages/theme/src/themes/base/component-overrides/link.ts}
   */
  color?: string;
  component?: React.ElementType;
};

export type { LinkProps };
