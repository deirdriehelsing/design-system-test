import type { ComponentOverride, Tokens } from '../../../types';

import baseButtonOverrides from '../../base/component-overrides/button';

function buttonOverrides(tokens: Tokens): ComponentOverride<'MuiButton'> {
  const base = baseButtonOverrides(tokens);
  const root = base.MuiButton?.styleOverrides?.root as any;

  return {
    ...base,
    MuiButton: {
      ...base.MuiButton,
      styleOverrides: {
        ...base.MuiButton?.styleOverrides,
        root(props) {
          const baseRoot = root?.(props);

          return {
            ...baseRoot,
            // Override background-color transition.
            // As colors are defined today, the base theme transition causes the button
            // to go past a weird in-between color that makes it look like it's flashing.
            transition: baseRoot.transition
              ? `${baseRoot.transition},${props.theme.transitions.create(['background-color'], {
                  duration: props.theme.transitions.duration.standard,
                  easing: tokens.sys.motion.easing.standardDecelerate,
                })}`
              : undefined,
          };
        },
      },
    },
  };
}

export default buttonOverrides;
