import type { Meta, StoryObj } from '@storybook/react';

import NspRichContent from '.';

const meta: Meta<typeof NspRichContent> = {
  title: 'NSP/Rich Content',
  component: NspRichContent,
};

type Story = StoryObj<typeof NspRichContent>;

const Default: Story = {
  args: {
    data: {
      value: {
        schema: 'dast',
        document: {
          type: 'root',
          children: [
            {
              type: 'heading',
              level: 1,
              children: [
                { type: 'span', value: 'This\nis a ' },
                { type: 'span', marks: ['strong'], value: 'mock' },
              ],
            },
          ],
        },
      },
    },
  },
};

export { Default };

export default meta;
