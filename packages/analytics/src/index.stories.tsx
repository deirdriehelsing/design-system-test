import type { Meta, StoryObj } from '@storybook/react';

import { AnalyticsProvider, useElementClickedHandler } from '.';
import React from 'react';

function AmplitudeSurvey() {
  const trackWithHook = useElementClickedHandler();

  return (
    <button id="track-with-hook-button" onClick={trackWithHook}>
      Track with hook
    </button>
  );
}

const meta: Meta<typeof AmplitudeSurvey> = {
  title: 'Analytics/Amplitude Survey',
  component: AmplitudeSurvey,
  decorators: [
    (Story) => (
      <AnalyticsProvider
        guidesAndSurveysKey="db46873b7bf16f72f1ad5e270817b20a"
        writeKey="ISLJkAolzlBY1eydJA2Z8TJN1lOjQtCa"
      >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Story />
        </div>
      </AnalyticsProvider>
    ),
  ],
};

type Story = StoryObj<typeof AmplitudeSurvey>;

const Default: Story = {};

export { Default };

export default meta;
