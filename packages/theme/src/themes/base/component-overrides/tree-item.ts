import type { ComponentOverride, Tokens } from '../../../types';

function treeItemViewOverrides(tokens: Tokens): ComponentOverride<'MuiTreeItem'> {
  return {
    MuiTreeItem: {
      styleOverrides: {
        root: {
          display: 'block',

          '& .MuiTreeItem-content.Mui-focused, & .MuiTreeItem-content:hover': {
            backgroundColor: tokens.ref.palette.primary.shade80,
          },
        },
      },
    },
  };
}

export default treeItemViewOverrides;
