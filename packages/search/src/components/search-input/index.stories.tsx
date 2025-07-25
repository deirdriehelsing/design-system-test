import type { Meta, StoryObj } from '@storybook/react';
import type { FormEvent } from 'react';

import React, { useEffect, useState } from 'react';
import SearchInput from '.';

function Container(Component: typeof SearchInput, ...props) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentString, setCurrentString] = useState('math');

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [currentString]);

  function handleSubmit(event: FormEvent<HTMLFormElement | HTMLDivElement>) {
    event.preventDefault();

    console.log(`submitted, value: ${currentString}`);
  }

  return (
    <div
      style={{
        height: '50vh',
      }}
    >
      <Component
        {...props}
        isLoading={isLoading}
        onChange={(event) => setCurrentString(event?.target.value)}
        onSubmit={handleSubmit}
        value={currentString}
      />
    </div>
  );
}

const meta: Meta = {
  title: 'Search/Search Input',
  component: () => Container(SearchInput),
  argTypes: {
    withBackdrop: {
      control: 'boolean',
      description: 'Whether the search result has a backdrop.',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
};

type Story = StoryObj<typeof SearchInput>;

const Default: Story = {
  args: {
    result: [
      <ul key={1}>
        <li>title 1</li>
        <li>item 1</li>
        <li>item 1</li>
      </ul>,
      <ul key={2}>
        <li>title 2</li>
        <li>item 2</li>
        <li>item 2</li>
      </ul>,
      <button key={3}>see all</button>,
    ],
  },
};

export { Default };

export default meta;
