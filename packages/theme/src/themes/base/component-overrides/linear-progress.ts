import type { ComponentOverride, Tokens } from '../../../types';
import type { PaletteColor } from '../../../types';

type AccentColor = 'accent01' | 'accent02' | 'accent03' | 'accent04' | 'primary' | 'neutral';
type ColorOptions = PaletteColor | 'inherit';
interface ColorConfig {
  backgroundColor?: string;
  barBufferColor?: string;
  barColor: string;
  border?: string;
}

const COLOR_CONFIGS: Record<AccentColor, ColorConfig> = {
  accent01: {
    barColor: 'var(--ref-palette-accent01-shade40)',
    barBufferColor: 'var(--ref-palette-accent01-shade70)',
  },
  accent02: {
    barColor: 'var(--ref-palette-accent02-shade60)',
    barBufferColor: 'var(--ref-palette-accent02-shade80)',
  },
  accent03: {
    barColor: 'var(--ref-palette-accent03-shade60)',
    barBufferColor: 'var(--ref-palette-accent03-shade80)',
  },
  accent04: {
    barColor: 'var(--ref-palette-accent04-shade50)',
    barBufferColor: 'var(--ref-palette-accent04-shade90)',
  },
  primary: {
    barColor: 'var(--sys-color-action-active)',
    barBufferColor: 'var(--ref-palette-primary-shade60)',
  },
  neutral: {
    backgroundColor: 'var(--sys-color-neutral-light)',
    barColor: 'var(--sys-color-success-light)',
    border: 'none',
  },
};

function getColorValues(color: ColorOptions): ColorConfig {
  const DEFAULT_COLOR_CONFIG: ColorConfig = {
    barColor: `var(--ref-palette-${color}-shade30)`,
    barBufferColor: `var(--ref-palette-${color}-shade60)`,
    backgroundColor: 'var(--ref-palette-surface-shade100)',
    border: 'solid 1px var(--activity-progress-bar-color)',
  };

  const colorConfig = COLOR_CONFIGS[color as AccentColor] || {};
  return { ...DEFAULT_COLOR_CONFIG, ...colorConfig };
}

function linearProgressOverrides(tokens: Tokens): ComponentOverride<'MuiLinearProgress'> {
  return {
    MuiLinearProgress: {
      styleOverrides: {
        root({ ownerState: { size = 'small', color = 'primary' } }) {
          const sz = size as 'medium' | 'small' | 'xsmall';
          const { barColor, barBufferColor, backgroundColor, border } = getColorValues(color);

          return {
            '--activity-progress-bar-color': barColor,
            '--activity-progress-bar-buffer-color': barBufferColor,
            backgroundColor,
            border,
            borderRadius: 'var(--sys-shape-corner-full)',
            height: {
              medium: '1rem',
              small: '0.375rem',
              xsmall: '0.25rem',
            }[sz],
            '&::before': {
              border: {
                medium: 'solid 1px var(--sys-color-background-default)',
                small: '',
                xsmall: '',
              }[sz],
              borderRadius: 'var(--sys-shape-corner-full)',
              content: '""',
              height: '100%',
              position: 'absolute',
              width: '100%',
              zIndex: 3,
            },
          };
        },
        bar: {
          background: 'var(--activity-progress-bar-color)',
          borderRadius: 'var(--sys-shape-corner-full)',
        },
        bar2Buffer: {
          backgroundColor: 'var(--activity-progress-bar-buffer-color)',
        },
        dashed: {
          boxShadow: 'none',
          backgroundImage: 'none',
          animation: 'none',
        },
      },
    },
  };
}

export default linearProgressOverrides;
