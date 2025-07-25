import { style, styleVariants } from '@vanilla-extract/css';

const containerBase = style({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: '0px',
  justifyContent: 'flex-start',
  transition: 'gap 300ms linear',
});

const container = styleVariants({
  collapsed: [containerBase],
  expanded: [
    containerBase,
    {
      gap: '8px',
    },
  ],
});

const expandableContent = styleVariants({
  bottom: {
    order: 1,
  },
  top: {
    order: 2,
  },
});

const trigger = styleVariants({
  bottom: {
    order: 2,
  },
  top: {
    order: 1,
  },
});

export { container, expandableContent, trigger };
