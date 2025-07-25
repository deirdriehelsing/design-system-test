import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import I18nProvider from '../provider';
import React from 'react';
import RichTranslation from '.';
import { useTranslation } from '../../hooks';

(RichTranslation as React.FunctionComponent).displayName = 'RichTranslation';

type Props = ComponentProps<typeof RichTranslation> & { category: string };

const meta: Meta<Props> = {
  title: 'I18n/Rich Translation',
  component: RichTranslation,
  args: {
    category: 'search',
    i18nKey: 'contact_us',
  },
  render: function Story({ category, ...args }) {
    return (
      <I18nProvider namespace="blueshift-ui">
        <RichTranslation
          {...args}
          translator={useTranslation(category, { rich: true }).translate}
        />
      </I18nProvider>
    );
  },
};

type Story = StoryObj<Props>;
const Default: Story = {};

export { Default };

export default meta;
