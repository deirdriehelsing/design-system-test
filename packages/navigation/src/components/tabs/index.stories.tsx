import type { Meta, StoryObj } from '@storybook/react';
import type { Tab } from '../../types';

import Box from '@blueshift-ui/core/dist/components/box';
import Button from '@blueshift-ui/core/dist/components/button';
import React from 'react';
import Tabs from '.';

(Tabs as React.FunctionComponent).displayName = 'Tabs';

const tabItems: Tab[] = [
  {
    label: 'tab one',
    component: (
      <p>
        In astronomy, a <b>blueshift</b> is a decrease in electromagnetic wavelength caused by the
        motion of a celestial object toward an observer.
      </p>
    ),
  },
  {
    label: 'tab two',
    component:
      'Doppler blueshift is caused by movement of a source towards the observer. The term applies to any decrease in wavelength caused by relative motion, even outside the visible spectrum.',
  },
  {
    label: 'Tab Three',
    component: (
      <span>
        The wavelength of any reflected or emitted photon or other particle is shortened in the
        direction of travel.
      </span>
    ),
  },
  {
    label: 'Tab four',
    component: (
      <div>
        <p>Doppler blueshift is used in astronomy to determine relative motion:</p>
        <ul>
          <li>
            The Andromeda Galaxy is moving toward our own Milky Way galaxy within the Local Group.
            When observed from earth, its light shows a blueshift.
          </li>
          <li> Components of a binary star system will be blueshifted when moving towards Earth</li>
          <li>
            When observing spiral galaxies, the side spinning toward us will have a slight blueshift
            relative to the side spinning away from us.
          </li>
          <li>
            Blazars may emit relativistic (near the speed of light) jets toward us that appear
            blueshifted.
          </li>
          <li>
            Nearby stars such as Barnard's Star are moving toward us, resulting in a very small
            blueshift.
          </li>
          <li>
            Doppler blueshift of distant objects (high z) can be got from the much larger
            cosmological redshift. This shows relative motion in the expanding universe.
          </li>
        </ul>
      </div>
    ),
  },
  {
    label: 'Tab five',
    component: `
      The reason astronomers can tell how far the light gets shifted is because certain chemical elements, like the calcium in bones or the oxygen people breathe has a unique fingerprint of light that no other chemical element has.
      They can see what colors of light are coming from a star, and see what it is made of. Once they know that, they look at the difference between where the fingerprint (called spectral lines) is and where it is supposed to be.
      When they see that, they can tell how far away the star is, whether it is moving toward us or away from us, and also how fast it is going, since the faster it goes, the farther the distance the spectral lines are from where they should be.
      `,
  },
];

const controlledTabItems: Tab[] = [
  {
    label: 'First Tab',
    component: <div>Content of First Tab</div>,
  },
  {
    label: 'Second Tab',
    component: <div>Content of Second Tab</div>,
  },
];

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    controls: {
      exclude: ['onChange'],
    },
  },
};

type Story = StoryObj<typeof Tabs>;

const Default: Story = {
  args: {
    tabs: tabItems,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '400px' }}>
        <Story />
      </Box>
    ),
  ],
};

const ControlledDemo = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  return (
    <Box sx={{ maxWidth: '400px' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Button onClick={() => setSelectedTab(0)} type="button">
          Select Tab 1
        </Button>
        <Button onClick={() => setSelectedTab(1)} type="button">
          Select Tab 2
        </Button>
      </div>
      <Tabs
        onChange={(_, index) => setSelectedTab(index)}
        tabs={controlledTabItems}
        value={selectedTab}
      />
    </Box>
  );
};

const Controlled: Story = {
  render: ControlledDemo,
};

export { Default, Controlled };

export default meta;
