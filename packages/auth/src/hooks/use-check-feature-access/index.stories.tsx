import type { Meta, StoryObj } from '@storybook/react';
import type { UserProductState, UserRoleArg } from '../../types';

import React, { useEffect, useState } from 'react';
import ConfigProvider from '@blueshift-ui/core/dist/providers/config-provider';
import useCheckFeatureAccess from '.';

interface UseCheckFeatureAccessDemoProps {
  enablement: string;
  flag: string;
  productState: UserProductState;
  role: UserRoleArg;
}

function UseCheckFeatureAccessDemo({
  enablement,
  flag,
  productState,
  role,
}: UseCheckFeatureAccessDemoProps) {
  const { checkAccess, isLoading } = useCheckFeatureAccess();
  const [result, setResult] = useState<boolean | string>('click "Check Access" to calculate');

  // Reset result when criteria changes
  useEffect(() => {
    setResult('click "Check Access" to calculate');
  }, [enablement, flag, productState, role]);

  function handleCheckAccess() {
    setResult(
      Boolean(
        checkAccess({
          criteria: {
            every: [{ enablement }, { flag }, { productState }, { role }],
          },
        })
      )
    );
  }
  return (
    <ConfigProvider config={{ allowFeatureFlagOverride: 'true' }}>
      <article>
        <button onClick={handleCheckAccess}>Check Access</button>
        <div>
          <b>Access Check Result: </b>
          <span>{result.toString()}</span>
        </div>
        <div>
          <b>Loading: </b>
          <span>{isLoading.toString()}</span>
        </div>
      </article>
    </ConfigProvider>
  );
}

const meta: Meta<typeof UseCheckFeatureAccessDemo> = {
  title: 'Auth/Hooks/useCheckFeatureAccess',
  component: UseCheckFeatureAccessDemo,
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

type Story = StoryObj<typeof UseCheckFeatureAccessDemo>;

const Default: Story = {
  args: {
    flag: 'engage-611-freemium-experience',
    enablement: 'active_membership',
    productState: 'one_on_one_membership',
    role: 'client',
  },
};

export { Default };

export default meta;
