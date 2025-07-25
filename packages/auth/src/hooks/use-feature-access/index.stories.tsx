import type { Meta, StoryObj } from '@storybook/react';
import type { UserProductState, UserRoleArg } from '../../types';

import ConfigProvider from '@blueshift-ui/core/dist/providers/config-provider';
import React from 'react';
import useFeatureAccess from '.';

interface UseFeatureAccessDemoProps {
  enablement: string;
  flag: string;
  productState: UserProductState;
  role: UserRoleArg;
}

function UseFeatureAccessDemo({ enablement, flag, productState, role }: UseFeatureAccessDemoProps) {
  const { hasAccess, isLoading, isLoadingAuthenticatedUser, isLoadingFlagClient } =
    useFeatureAccess({
      criteria: {
        every: [
          ...(enablement ? [{ enablement }] : []),
          ...(flag ? [{ flag }] : []),
          ...(productState ? [{ productState }] : []),
          ...(role ? [{ role }] : []),
        ],
      },
    });

  return (
    <ConfigProvider config={{ allowFeatureFlagOverride: 'true' }}>
      <article>
        <div>
          <b>Has Access: </b>
          <span>{hasAccess?.toString() ?? 'Calculating...'}</span>
        </div>
        <div>
          <b>Loading: </b>
          <span>{isLoading.toString()}</span>
        </div>
        <div>
          <b>isLoadingAuthenticatedUser: </b>
          <span>{isLoadingAuthenticatedUser.toString()}</span>
        </div>
        <div>
          <b>isLoadingFlagClient: </b>
          <span>{isLoadingFlagClient.toString()}</span>
        </div>
      </article>
    </ConfigProvider>
  );
}

const meta: Meta<typeof UseFeatureAccessDemo> = {
  title: 'Auth/Hooks/useFeatureAccess',
  component: UseFeatureAccessDemo,
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    enablement: {
      control: 'text',
      description: 'The enablement name',
    },
    flag: {
      control: 'text',
      description: 'The flag name',
    },
    productState: {
      control: 'text',
      description: 'The product state',
    },
    role: {
      control: 'text',
      description: 'The role',
    },
  },
};

type Story = StoryObj<typeof UseFeatureAccessDemo>;

const Default: Story = {
  args: {
    flag: 'engage-611-freemium-experience',
    enablement: 'active_membership',
    productState: 'one_on_one_membership',
    role: 'client',
  },
};

const FlagOnly: Story = {
  args: {
    flag: 'engage-611-freemium-experience',
  },
};

const UserDataOnly: Story = {
  args: {
    enablement: 'active_membership',
    productState: 'one_on_one_membership',
    role: 'client',
  },
};

export { Default, FlagOnly, UserDataOnly };

export default meta;
