import { style } from '@vanilla-extract/css';

const actions = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  '@media': {
    [`(min-width: 768px)`]: {
      flexDirection: 'row',
    },
  },
});

const container = style({
  padding: '0.625rem 0',
  width: '100%',
});

const errorFeedback = style({
  marginTop: '1.5rem',
  color: 'var(--sys-color-error-main)',
});

const linkButton = style({
  selectors: {
    [`${actions} &`]: {
      marginLeft: '0',
      paddingTop: '1rem',

      '@media': {
        [`(min-width: 768px)`]: {
          marginLeft: '1rem',
          paddingTop: '0',
        },
      },
    },
  },
});

const submitButton = style({
  width: '100%',
  '@media': {
    [`(min-width: 768px)`]: {
      width: 'auto',
    },
  },
});

export { actions, container, errorFeedback, linkButton, submitButton };
