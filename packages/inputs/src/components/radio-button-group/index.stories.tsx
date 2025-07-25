import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { Controller, useForm } from 'react-hook-form';
import RadioButtonGroup from '.';
import React from 'react';
import Stack from '@blueshift-ui/core/dist/components/stack';
import { Typography } from '@mui/material';

RadioButtonGroup.displayName = 'RadioButtonGroup';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Inputs/Radio Button Group',
  component: RadioButtonGroup,
  argTypes: {
    defaultValue: {
      description: 'The default value.',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      description: 'The form label.',
      table: {
        type: { summary: 'node' },
      },
    },
    inputOptions: {
      description: 'The input options.',
      table: {
        type: { summary: 'array' },
      },
    },
    variant: {
      control: 'select',
      description: 'The variant of the radio button group.',
      options: ['cards', 'chips', 'default'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
  },
};

type Story = StoryObj<typeof RadioButtonGroup>;

const Default: Story = {
  args: {
    defaultValue: 'dogs',
    label: 'Pets',
    inputOptions: [
      {
        label: 'Dogs',
        value: 'dogs',
      },
      {
        label: 'Cats',
        value: 'cats',
      },
      {
        label: 'Birds',
        value: 'birds',
      },
    ],
  },
};

const Cards: Story = {
  args: {
    defaultValue: 'ai-tutor-chat',
    label: 'Learning Modality',
    inputOptions: [
      {
        description: 'Your personal study buddy for any subject, 24/7.',
        image: '/ai-tutor-chat-icon.svg',
        label: 'Chat with an AI Tutor',
        value: 'ai-tutor-chat',
      },
      {
        description: 'Collaborate with a subject expert in our online workspace.',
        image: '/1-on-1-video-session-icon.svg',
        label: '1-on-1 video session',
        value: '1-on-1-video-session',
      },
    ],
    variant: 'cards',
  },
};

const CardsWithChildren: Story = {
  args: {
    defaultValue: 'ai-tutor-chat',
    label: 'Learning Modality',
    inputOptions: [
      {
        children: (
          <div>
            <h2>This is an ai title</h2>
            <p>Lets do ai stuff</p>
          </div>
        ),
        description: 'Your personal study buddy for any subject, 24/7.',
        image: '/ai-tutor-chat-icon.svg',
        label: 'Chat with an AI Tutor',
        value: 'ai-tutor-chat',
      },
      {
        children: (
          <div>
            <h2>This is tutor title</h2>
            <p>Lets do some tutoring</p>
          </div>
        ),
        description: 'Collaborate with a subject expert in our online workspace.',
        image: '/1-on-1-video-session-icon.svg',
        label: '1-on-1 video session',
        value: '1-on-1-video-session',
      },
    ],
    variant: 'cards',
  },
};

const CardsWithNoImage: Story = {
  args: {
    defaultValue: 'ai-tutor-chat',
    label: 'Learning Modality',
    inputOptions: [
      {
        description: 'Your personal study buddy for any subject, 24/7.',
        label: 'Chat with an AI Tutor',
        value: 'ai-tutor-chat',
      },
      {
        description: 'Collaborate with a subject expert in our online workspace.',
        label: '1-on-1 video session',
        value: '1-on-1-video-session',
      },
    ],
    variant: 'cards',
  },
};

const CarouselCards: Story = {
  args: {
    defaultValue: 'ai-tutor-chat',
    label: 'Learning Modality',
    inputOptions: [
      {
        description: 'Your personal study buddy for any subject, 24/7.',
        image: '/ai-tutor-chat-icon.svg',
        label: 'Chat with an AI Tutor',
        value: 'ai-tutor-chat',
      },
      {
        description: 'Collaborate with a subject expert in our online workspace.',
        image: '/1-on-1-video-session-icon.svg',
        label: '1-on-1 video session',
        value: '1-on-1-video-session',
      },
      {
        description: 'Your personal study buddy for any subject, 24/7.',
        image: '/ai-tutor-chat-icon.svg',
        label: 'Chat with an AI Tutor (2)',
        value: 'ai-tutor-chat-duplicate',
      },
      {
        description: 'Collaborate with a subject expert in our online workspace.',
        image: '/1-on-1-video-session-icon.svg',
        label: '1-on-1 video session (2)',
        value: '1-on-1-video-session-duplicate',
      },
    ],
    renderAsCarousel: true,
    style: { maxWidth: '384px' },
    variant: 'cards',
  },
};

const Carousel: Story = {
  args: {
    defaultValue: 'dogs',
    label: 'Pets',
    inputOptions: [
      {
        label: 'Owls',
        value: 'owls',
      },
      {
        label: 'Dogs',
        value: 'dogs',
      },
      {
        label: 'Cats',
        value: 'cats',
      },
      {
        label: 'Butterflies',
        value: 'butterflies',
      },
      {
        label: 'Birds',
        value: 'birds',
      },
    ],
    renderAsCarousel: true,
    style: { maxWidth: '256px' },
  },
};

const Chips: Story = {
  args: {
    defaultValue: 'dogs',
    inputOptions: [
      {
        label: 'Dogs',
        value: 'dogs',
      },
      {
        label: 'Cats',
        value: 'cats',
      },
      {
        label: 'Birds',
        value: 'birds',
      },
    ],
    radioGroupProps: {
      sx: { gap: 2 },
    },
    variant: 'chips',
  },
};

const CarouselChips: Story = {
  args: {
    inputOptions: [
      {
        label: 'Owls',
        value: 'owls',
      },
      {
        label: 'Dogs',
        value: 'dogs',
      },
      {
        label: 'Cats',
        value: 'cats',
      },
      {
        label: 'Butterflies',
        value: 'butterflies',
      },
      {
        label: 'Birds',
        value: 'birds',
      },
    ],
    radioGroupProps: {
      sx: { gap: 2 },
    },
    renderAsCarousel: true,
    style: { maxWidth: '256px' },
    variant: 'chips',
  },
};

function ControlledRenderer(args: ComponentProps<typeof RadioButtonGroup>) {
  const { control, watch } = useForm({
    defaultValues: { pet: 'dogs' },
  });

  const pet = watch('pet');

  return (
    <Stack>
      <Typography fontSize="2rem" marginBottom="1rem" textAlign="center">
        Pet is {pet}
      </Typography>

      <Controller
        control={control}
        name="pet"
        render={({ field }) => <RadioButtonGroup {...args} {...field} />}
      />
    </Stack>
  );
}

const Controlled: Story = {
  args: {
    inputOptions: [
      {
        label: 'Dogs',
        value: 'dogs',
      },
      {
        label: 'Cats',
        value: 'cats',
      },
      {
        label: 'Birds',
        value: 'birds',
      },
    ],
    radioGroupProps: {
      sx: { gap: 2 },
    },
    variant: 'chips',
  },
  render: (args) => <ControlledRenderer {...args} />,
};

const WithLabelInline: Story = {
  args: {
    inputOptions: [
      {
        label: 'Owls',
        value: 'owls',
      },
      {
        label: 'Dogs',
        value: 'dogs',
      },
      {
        label: 'Cats',
        value: 'cats',
      },
      {
        label: 'Butterflies',
        value: 'butterflies',
      },
    ],
    label: <Typography variant="subtitle1">Pet:</Typography>,
    labelVariant: 'inline',
    radioGroupProps: {
      sx: { gap: 2 },
    },
    style: { maxWidth: '256px' },
    variant: 'chips',
  },
  render: (args) => <ControlledRenderer {...args} />,
};

export {
  Default,
  Carousel,
  Cards,
  CardsWithChildren,
  CardsWithNoImage,
  CarouselCards,
  Chips,
  CarouselChips,
  Controlled,
  WithLabelInline,
};

export default meta;
