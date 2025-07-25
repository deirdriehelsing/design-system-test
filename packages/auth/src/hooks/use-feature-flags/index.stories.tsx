import type { Meta, StoryObj } from '@storybook/react';
import type { UseFeatureFlagClientParams } from '../../types';

import ConfigProvider from '@blueshift-ui/core/dist/providers/config-provider';
import React from 'react';
import useFeatureFlags from '.';

function UseFeatureFlagsDemo(hookParams: UseFeatureFlagClientParams) {
  const { flags, isLoading } = useFeatureFlags(hookParams);
  const flagsCount = flags ? Object.keys(flags).length : 0;

  return (
    <ConfigProvider config={{ allowFeatureFlagOverride: 'true' }}>
      <article>
        <h2>Flags:</h2>

        {isLoading ? <div>Loading…</div> : flagsCount ? null : <div>No flags</div>}

        {Object.entries(flags).map(([key, value]) => (
          <div key={key}>{`${key}: ${value}`}</div>
        ))}
      </article>
    </ConfigProvider>
  );
}

const meta: Meta<typeof UseFeatureFlagsDemo> = {
  component: UseFeatureFlagsDemo,
  title: 'Auth/Hooks/useFeatureFlags',
};

type Story = StoryObj<typeof UseFeatureFlagsDemo>;

const Default: Story = {};

export { Default };

export default meta;
