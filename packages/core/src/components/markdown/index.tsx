import type { HTMLAttributes, PropsWithChildren } from 'react';

import * as styles from './index.css';
import { Remarkable } from 'remarkable';
import classNames from 'clsx';
import reactNodeToString from 'react-node-to-string';

const REMARKABLE_INSTANCE = new Remarkable();

type MarkdownProps = PropsWithChildren<unknown> & HTMLAttributes<HTMLDivElement>;

function Markdown({ children, className, ...containerProps }: MarkdownProps) {
  return (
    <div
      {...containerProps}
      className={classNames(styles.root, className)}
      dangerouslySetInnerHTML={{
        __html: REMARKABLE_INSTANCE.render(reactNodeToString(children))
          // <pre> elements are scrollable and should be focusable for keyboard access.
          // See: https://dequeuniversity.com/rules/axe/4.8/scrollable-region-focusable?application=axeAPI
          .replace('<pre', '<pre tabindex="0"'),
      }}
    />
  );
}

export default Markdown;
