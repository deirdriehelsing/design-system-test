import { globalStyle, style } from '@vanilla-extract/css';

const emojiMenu = style({});

globalStyle(`${emojiMenu} .EmojiPickerReact .epr-search-container input.epr-search`, {
  backgroundColor: 'var(--ref-palette-secondary-shade100)',
  borderColor: 'var(--ref-palette-secondary-shade50)',
  color: 'var(--ref-palette-secondary-shade10)',
});

export { emojiMenu };
