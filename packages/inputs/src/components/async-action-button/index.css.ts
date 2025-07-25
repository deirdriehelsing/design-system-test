import { keyframes, style } from '@vanilla-extract/css';

const shake = keyframes({
  '0%': { transform: 'translateX(0)' },
  '10%': { transform: 'translateX(-5px)' },
  '20%': { transform: 'translateX(5px)' },
  '30%': { transform: 'translateX(-5px)' },
  '40%': { transform: 'translateX(5px)' },
  '50%': { transform: 'translateX(-5px)' },
  '60%': { transform: 'translateX(5px)' },
  '70%': { transform: 'translateX(-5px)' },
  '80%': { transform: 'translateX(5px)' },
  '90%': { transform: 'translateX(-5px)' },
  '100%': { transform: 'translateX(0)' },
});

const root = style({
  position: 'relative',
});

const buttonText = style({
  selectors: {
    [`${root}:disabled &`]: {
      opacity: 0.5,
    },
  },
});

const loadingIndicator = style({
  left: 'calc(50% - 12px)',
  position: 'absolute',
});

const rejected = style({
  animation: `${shake} var(--sys-motion.duration.long02)ms var(--sys-motion-easing-ease-in-out))`,
});

export { buttonText, loadingIndicator, rejected, root, shake };
