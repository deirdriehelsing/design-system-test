import type { Meta, StoryObj } from '@storybook/react';

import React, { useCallback, useState } from 'react';
import AutocompleteWithExternalTags from '.';
import Box from '@blueshift-ui/core/dist/components/box';

const meta: Meta<typeof AutocompleteWithExternalTags> = {
  title: 'Inputs/AutocompleteWithExternalTags',
  component: AutocompleteWithExternalTags,
  argTypes: {
    onChange: {
      control: 'function',
      description: 'Callback fired when the value changes.',
      table: {
        type: { summary: 'function' },
      },
    },
    onOpen: {
      control: 'function',
      description: 'Callback fired when the select options box is open.',
      table: {
        type: { summary: 'function' },
      },
    },
    onClose: {
      control: 'function',
      description: 'Callback fired when the select options box is closed.',
      table: {
        type: { summary: 'function' },
      },
    },
    onReachEnd: {
      control: 'function',
      description: 'Callback fired when the user scrolls to the end of the select options box.',
      table: {
        type: { summary: 'function' },
      },
    },
    options: {
      control: 'object',
      description: 'The options to display in the dropdown',
      table: {
        type: { summary: 'object' },
      },
    },
    label: {
      control: 'text',
      description: 'The label text',
      table: {
        type: { summary: 'text' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text',
      table: {
        type: { summary: 'text' },
      },
    },
    value: {
      control: 'object',
      description: 'The value of the input',
      table: {
        type: { summary: 'object' },
      },
    },
    loading: {
      control: 'boolean',
      description:
        'If true, the component is in a loading state. This shows a loader on the right side of the input, typically used when loading data through the server-side.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

type Story = StoryObj<typeof AutocompleteWithExternalTags>;

interface Option {
  title: string;
  year: number;
}

const id = 'title';
const options = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
];

function AutocompleteWrapper() {
  const [value, setValue] = useState<Option[]>([]);

  return (
    <Box width={300}>
      <AutocompleteWithExternalTags
        id={id}
        label="Movies"
        onChange={(newValue) => setValue(newValue)}
        options={options}
        value={value}
      />
    </Box>
  );
}

function ServerSideWrapper() {
  const [inputOptions, setInputOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<Option[]>([]);
  const [search, setSearch] = useState<string>('');

  const loadOptions = useCallback((filter = '') => {
    setLoading(true);

    setTimeout(() => {
      setInputOptions(
        filter
          ? options.filter((option) => option.title?.toLowerCase().includes(filter?.toLowerCase()))
          : (prev) => [...prev, ...options]
      );
      setLoading(false);
    }, 1000);
  }, []);

  const onSearch = (searchValue: string) => {
    setSearch(searchValue);
    setInputOptions([]);
    loadOptions(searchValue);
  };

  return (
    <Box width={300}>
      <AutocompleteWithExternalTags
        id={id}
        label="Movies"
        loading={loading}
        onChange={(newValue) => setValue(newValue)}
        onChangeSearch={onSearch}
        onOpen={loadOptions}
        options={inputOptions}
        searchValue={search}
        value={value}
      />
    </Box>
  );
}

function ServerSideWithInfiniteScrollWrapper() {
  const [inputOptions, setInputOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<Option[]>([]);
  const [search, setSearch] = useState<string>('');

  const loadOptions = useCallback((filter = '') => {
    setLoading(true);

    setTimeout(() => {
      setInputOptions(
        filter
          ? options.filter((option) => option.title?.toLowerCase().includes(filter?.toLowerCase()))
          : (prev) => [...prev, ...options]
      );
      setLoading(false);
    }, 1000);
  }, []);

  const onSearch = (searchValue: string) => {
    setSearch(searchValue);
    setInputOptions([]);
    loadOptions(searchValue);
  };

  return (
    <Box width={300}>
      <AutocompleteWithExternalTags
        id={id}
        label="Movies"
        loading={loading}
        onChange={(newValue) => setValue(newValue)}
        onChangeSearch={onSearch}
        onOpen={loadOptions}
        onReachEnd={loadOptions}
        options={inputOptions}
        searchValue={search}
        value={value}
      />
    </Box>
  );
}

const Default: Story = {
  render: () => <AutocompleteWrapper />,
};

const WithServerSide: Story = {
  render: () => <ServerSideWrapper />,
};

const WithInfiniteScroll: Story = {
  render: () => <ServerSideWithInfiniteScrollWrapper />,
};

export { Default, WithServerSide, WithInfiniteScroll };

export default meta;
