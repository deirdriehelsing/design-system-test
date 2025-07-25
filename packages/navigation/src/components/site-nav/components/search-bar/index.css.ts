import { globalStyle, style } from '@vanilla-extract/css';

const group = style({ padding: 0 });

// extended padding styling on desktop for dropdown items, titles and expand links
const desktopExtendedPadding = style({
  '@media': {
    [`(min-width: 768px)`]: {
      selectors: {
        '&&': {
          // increased specificity to override MuiAutocomplete-option
          paddingLeft: '2rem',
          paddingRight: '2rem',
        },
      },
    },
  },
});

// "See all X results for query in subjects"
const expandSearch = style([
  {
    color: 'var(--sys-color-text-link)',
    fontSize: 'var(--sys-typescale-body-small-size)',
    marginBottom: '0.5rem',
  },
  desktopExtendedPadding,
]);

globalStyle(`${expandSearch}.Mui-focused > a`, {
  color: 'var(--sys-color-text-default)',
});

const heading = style({
  padding: '1.25rem 0 0',

  selectors: {
    '&:not(:first-child)': {
      borderTop: '1px solid var(--sys-color-neutral-light)',
    },
  },
});

const listItem = style([desktopExtendedPadding]);

globalStyle(`${listItem} > a`, {
  color: 'var(--sys-color-text-default)',
});

const linkItem = style({ width: '100%' });

const listTitle = style([
  {
    alignItems: 'center',
    display: 'flex',
    fontSize: 'var(--sys-typescale-body-medium-size)',
    fontWeight: 'var(--ref-typeface-weight-bold)',
    gap: '.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  desktopExtendedPadding,
]);

const noResultCta = style({
  borderTop: '1px solid var(--sys-color-neutral-light)',
  padding: '1rem',
});

const paper = style({
  // allows the search results dropdown to stretch wider than the text box
  // which is helpful for mobile devices and when the desktop view is too squashed
  minWidth: 'min(400px, 100vw - 4rem)',
});

const resultTitle = style({
  // ensures that titles of results don't overflow the dropdown and instead show an ellipsis
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'block',
  fontSize: 'var(--sys-typescale-body-small-size)',
  '@media': {
    [`(min-width: 768px)`]: {
      // allows the title to be truncated to 2 lines on desktop
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      display: '-webkit-box',
      lineClamp: 2,
      maxHeight: '6rem',
      whiteSpace: 'normal',
    },
  },
});

const resultLabel = style({
  fontSize: 'var(--sys-typescale-meta-small-size)',
  fontWeight: 'var(--ref-typeface-weight-regular)',
});

globalStyle(`${resultLabel} > p`, { margin: 0 });

const emptyResultsText = style([
  resultLabel,
  {
    color: 'var(--sys-color-text-default)',
    padding: '1rem 2rem',
  },
]);

export {
  emptyResultsText,
  expandSearch,
  group,
  heading,
  linkItem,
  listItem,
  listTitle,
  noResultCta,
  paper,
  resultLabel,
  resultTitle,
};
