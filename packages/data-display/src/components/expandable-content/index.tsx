import type { CollapseProps as MUICollapseProps } from '@mui/material/Collapse';

import * as styles from './index.css';
import Collapse from '@blueshift-ui/core/dist/components/collapse';
import Link from '@blueshift-ui/core/dist/components/link';
import { useState } from 'react';
import useTranslation from '@blueshift-ui/i18n/dist/hooks/use-translation';

interface ExpandableContentProps extends MUICollapseProps {
  ariaLabel: string;
  defaultExpanded?: boolean;
  id: string;
  onExpandToggle?: (expanded: boolean) => void;
  triggerPosition?: 'top' | 'bottom';
  triggerTextCollapsed?: string;
  triggerTextExpanded?: string;
}

function ExpandableContent({
  ariaLabel,
  id,
  defaultExpanded = false,
  onExpandToggle,
  triggerPosition = 'top',
  triggerTextCollapsed,
  triggerTextExpanded,
  ...expandableContentProps
}: ExpandableContentProps) {
  /* Translations */
  const { translate } = useTranslation('expandable_content', { ns: 'blueshift-ui' });

  /* Internal State */
  const [expanded, setExpanded] = useState(defaultExpanded);

  /* Functions */
  function handleControllerClick() {
    setExpanded((expanded) => {
      onExpandToggle?.(!expanded);

      return !expanded;
    });
  }

  /* Render */
  return (
    <div className={styles.container[expanded ? 'expanded' : 'collapsed']}>
      <Link
        aria-controls={id}
        aria-expanded={expanded}
        aria-label={ariaLabel}
        className={styles.trigger[triggerPosition]}
        component="a"
        onClick={handleControllerClick}
      >
        {expanded
          ? triggerTextExpanded || translate('trigger_text_expanded')
          : triggerTextCollapsed || translate('trigger_text_collapsed')}
      </Link>

      <Collapse
        {...expandableContentProps}
        className={styles.expandableContent[triggerPosition]}
        id={id}
        in={expanded}
      />
    </div>
  );
}

export default ExpandableContent;
