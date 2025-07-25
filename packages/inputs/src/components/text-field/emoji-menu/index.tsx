import type { EmojiClickData } from 'emoji-picker-react';
import type { TextFieldEmojiMenuProps } from '../../../types';

import * as styles from './index.css';
import EmojiPicker, { Categories } from 'emoji-picker-react';
import { useCallback, useRef, useState } from 'react';
import ClickAwayListener from '@blueshift-ui/core/dist/components/click-away-listener';
import { Smiley as EmojiIcon } from '@phosphor-icons/react';
import IconButton from '@blueshift-ui/core/dist/components/icon-button';
import Popover from '@blueshift-ui/core/dist/components/popover';
import useTranslation from '@blueshift-ui/i18n/dist/hooks/use-translation';

function TextFieldEmojiMenu({ onEmojiSelection, ...muiIconButtonProps }: TextFieldEmojiMenuProps) {
  const { translate } = useTranslation('inputs', { ns: 'blueshift-ui' });

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const emojiPickerAnchorRef = useRef<HTMLButtonElement>(null);

  const openEmojiPicker = useCallback(() => {
    setEmojiPickerOpen(true);
  }, []);

  const closeEmojiPicker = useCallback(() => {
    setEmojiPickerOpen(false);
  }, []);

  /* Event Handlers */

  const handleEmojiClick = useCallback(
    ({ emoji }: EmojiClickData) => {
      onEmojiSelection?.(emoji);
      closeEmojiPicker();
    },
    [closeEmojiPicker, onEmojiSelection]
  );

  /* Render */

  return (
    <>
      <IconButton
        aria-label="emoji menu button"
        classes={{ root: 'BlueshiftEmojiPickerButton' }}
        onClick={openEmojiPicker}
        ref={emojiPickerAnchorRef}
        {...muiIconButtonProps}
      >
        <EmojiIcon />
      </IconButton>

      <Popover
        anchorEl={emojiPickerAnchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={styles.emojiMenu}
        onClose={closeEmojiPicker}
        open={emojiPickerOpen}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <ClickAwayListener onClickAway={closeEmojiPicker}>
          <div aria-label="emoji menu">
            <EmojiPicker
              autoFocusSearch={false}
              categories={[
                {
                  category: Categories.SMILEYS_PEOPLE,
                  name: translate('emoji_picker_category_smileys_people', 'Smileys & People'),
                },
              ]}
              lazyLoadEmojis={false}
              onEmojiClick={handleEmojiClick}
              previewConfig={{ showPreview: false }}
              searchPlaceHolder={translate('emoji_picker_search_placeholder', 'Search')}
              skinTonesDisabled={true}
              width={288}
            />
          </div>
        </ClickAwayListener>
      </Popover>
    </>
  );
}

export default TextFieldEmojiMenu;
