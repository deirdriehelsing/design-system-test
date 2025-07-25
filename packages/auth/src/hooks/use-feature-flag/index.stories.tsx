import type { Meta, StoryObj } from '@storybook/react';
import type { UseFeatureFlagClientParams } from '../../types';

import { AnalyticsProvider } from '@blueshift-ui/analytics';
import ConfigProvider from '@blueshift-ui/core/dist/providers/config-provider';
import React from 'react';
import useFeatureFlag from '.';

interface UseFeatureFlagDemoProps {
  flag: string;
  hookParams: UseFeatureFlagClientParams;
}

function UseFeatureFlagDemo({ flag, hookParams }: UseFeatureFlagDemoProps) {
  const { value, isLoading } = useFeatureFlag(flag, hookParams);

  return (
    <ConfigProvider config={{ allowFeatureFlagOverride: 'true' }}>
      <AnalyticsProvider writeKey="ISLJkAolzlBY1eydJA2Z8TJN1lOjQtCa">
        <article>
          <h2>Flag:</h2>

          {isLoading ? <div>Loading…</div> : null}

          <div>{`${flag}: ${value}`}</div>
        </article>
      </AnalyticsProvider>
    </ConfigProvider>
  );
}

const meta: Meta<typeof UseFeatureFlagDemo> = {
  title: 'Auth/Hooks/useFeatureFlag',
  component: UseFeatureFlagDemo,
  argTypes: {
    flag: {
      control: 'text',
      description: 'The flag name',
    },
  },
};

type Story = StoryObj<typeof UseFeatureFlagDemo>;

const Default: Story = {
  args: {
    flag: 'engage-611-freemium-experience',
  },
};

export { Default };

export default meta;
