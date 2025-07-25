import type { ElementType } from 'react';
import type { NavContentItem } from '../../../../../../types';

import * as styles from './index.css';
import { ChatText } from '@phosphor-icons/react';
import IconButton from '@blueshift-ui/core/dist/components/icon-button';
import { NavLinks } from '../../../../../../constants';

interface MessagesProps<TApplicationLinkProps> {
  applicationLinkComponent?: ElementType<TApplicationLinkProps>;
  getApplicationLinkComponentProps?: (item: NavContentItem) => TApplicationLinkProps;
  messageNavItem?: NavContentItem;
  unreadMessagesCount?: number;
}

const defaultProps = {
  href: NavLinks.UNREAD_MESSAGES,
  slug: 'message',
};

function Messages<TApplicationLinkProps>({
  applicationLinkComponent,
  getApplicationLinkComponentProps,
  messageNavItem,
  unreadMessagesCount,
}: MessagesProps<TApplicationLinkProps>) {
  const LinkComponent = applicationLinkComponent ?? 'a';
  const navItem = messageNavItem ?? defaultProps;
  const props = getApplicationLinkComponentProps?.(navItem) ?? navItem;

  return (
    <IconButton className={styles.button} LinkComponent={LinkComponent} {...props}>
      <ChatText weight="duotone" />
      {unreadMessagesCount ? <span className={styles.unreadMessages} /> : null}
    </IconButton>
  );
}

export default Messages;
