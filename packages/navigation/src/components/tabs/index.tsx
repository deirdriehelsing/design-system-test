import type { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import type { SyntheticEvent } from 'react';
import type { Tab } from '../../types';

import * as styles from './index.css';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import Typography from '@blueshift-ui/theme/dist/components/typography';
import classNames from 'clsx';
import useBreakpoints from '@blueshift-ui/theme/dist/hooks/use-breakpoints';
import { useState } from 'react';

interface TabsProps extends Omit<MuiTabsProps, 'onChange' | 'value'> {
  onChange?: (event: SyntheticEvent, value: number) => void;
  tabs: Tab[];
  value?: number;
}

function _extractItems(tabs: Tab[]) {
  return tabs.reduce(
    (accumulator, { component, label }) => {
      accumulator.components.push(component);
      accumulator.labels.push(label);

      return accumulator;
    },
    {
      components: [] as Tab['component'][],
      labels: [] as Tab['label'][],
    }
  );
}

function Tabs({ tabs, value, onChange, ...muiTabsProps }: TabsProps) {
  const isControlled = value !== undefined && onChange !== undefined;
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { isLargeViewport } = useBreakpoints();
  const { components, labels } = _extractItems(tabs);

  const currentTabIndex = isControlled ? value : activeTabIndex;

  function handleChangeTab(event: SyntheticEvent, newValue: number) {
    if (isControlled) {
      return onChange(event, newValue);
    }

    setActiveTabIndex(newValue);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MuiTabs
          scrollButtons={isLargeViewport}
          variant="scrollable"
          {...muiTabsProps}
          className={classNames(styles.tabs, muiTabsProps.className)}
          onChange={handleChangeTab}
          value={currentTabIndex}
        >
          {labels.map((label, index) => (
            <MuiTab
              aria-controls={`tabpanel-${index}`}
              className={styles.label}
              id={`tab-${index}`}
              key={index}
              label={<Typography variant="inherit">{label}</Typography>}
            />
          ))}
        </MuiTabs>
      </div>

      {components.map((component, index) => (
        <div
          aria-labelledby={`tab-${index}`}
          hidden={currentTabIndex !== index}
          id={`tabpanel-${index}`}
          key={index}
          role="tabpanel"
        >
          {index === currentTabIndex ? <div className={styles.content}>{component}</div> : null}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
