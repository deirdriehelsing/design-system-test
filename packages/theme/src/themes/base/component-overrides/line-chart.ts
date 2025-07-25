import type { ComponentOverride, Tokens } from '../../../types';

function lineChartAxis(tokens: Tokens): ComponentOverride<'MuiChartsAxis'> {
  return {
    MuiChartsAxis: {
      styleOverrides: {
        root: () => ({
          // We have to use these specificity selectors instead of the styleOverrides
          // props because MUI does not properly override the css rules for the
          // line, tick and tickLabel elements without the use of important keyword
          '& .MuiChartsAxis-line': {
            fill: tokens.sys.color.accent01.main,
            stroke: tokens.sys.color.accent01.main,
          },
          '& .MuiChartsAxis-tick': {
            fill: tokens.sys.color.accent01.main,
            stroke: tokens.sys.color.accent01.main,
          },
          '& .MuiChartsAxis-tickLabel': {
            fill: tokens.sys.color.accent01.main,
            fontWeight: 400,
          },
        }),
      },
    },
  };
}

function lineChartAxisHighlight(tokens: Tokens): ComponentOverride<'MuiChartsTooltip'> {
  return {
    MuiChartsTooltip: {
      styleOverrides: {
        root: () => ({
          '& .MuiBox-root': {
            borderColor: tokens.sys.color.accent01.dark,
            color: tokens.sys.color.text.default,
          },
        }),
      },
    },
  };
}

function lineChartMarkElement(tokens: Tokens): ComponentOverride<'MuiMarkElement'> {
  return {
    MuiMarkElement: {
      styleOverrides: {
        root: () => ({
          // This specificity selector was required for the
          // same reason mentioned in the comment above
          '&.MuiMarkElement-highlighted': {
            strokeWidth: '5px',
            stroke: tokens.sys.color.accent01.dark,
          },
        }),
      },
    },
  };
}

function lineChartOverrides(tokens: Tokens) {
  return {
    ...lineChartAxis(tokens),
    ...lineChartMarkElement(tokens),
    ...lineChartAxisHighlight(tokens),
  };
}

export default lineChartOverrides;
