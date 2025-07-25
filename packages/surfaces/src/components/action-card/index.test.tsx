import { render, screen } from '@testing-library/react';
import ActionCard from '.';
import Button from '@blueshift-ui/core/dist/components/button';
import React from 'react';

const svgStar = (
  <svg data-testid="svg-star">
    <polygon points="100,10 40,198 190,78 10,78 160,198" style={{ fill: 'black' }} />
  </svg>
);

jest.mock('./index.css', () => ({
  actions: 'actions',
  actionArea: 'actionArea',
  content: 'content',
  contentContainer: 'contentContainer',
  headlineContainer: 'headlineContainer',
  image: 'image',
  imageContainer: 'imageContainer',
  actionCardVariants: {
    accent01: 'actionCard-amethyst',
    accent02: 'actionCard-coral',
    accent03: 'actionCard-default',
    accent04: 'actionCard-gold',
    accent05: 'actionCard-green',
  },
  headline: 'headline',
  description: 'description',
}));

describe('<ActionCard />', () => {
  const commonProps = {
    action: <Button name="browse">browse</Button>,
    headline: 'Excepteur sint occaecat cupidatat',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  const renderActionCard = (props = {}) => render(<ActionCard {...commonProps} {...props} />);

  it('renders action', () => {
    renderActionCard();

    const actionButton = screen.getByRole('button', { name: 'browse' });

    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toBeVisible();
  });

  it('renders headline', async () => {
    renderActionCard();

    const cardHeadline = await screen.findByText(commonProps.headline);

    expect(cardHeadline).toBeInTheDocument();
    expect(cardHeadline).toBeVisible();
  });

  it('renders svg for image prop', () => {
    renderActionCard({ image: svgStar });

    const svg = screen.getByTestId('svg-star');
    expect(svg).toBeInTheDocument();
    expect(svg).toContainHTML(
      '<polygon points="100,10 40,198 190,78 10,78 160,198" style="fill: black;" />'
    );
  });

  it('renders image', () => {
    renderActionCard({ image: 'robot.png' });

    const cardImage = screen.getByRole('img');

    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toBeVisible();
  });

  it('renders simple text pitch', async () => {
    renderActionCard();

    const cardDescription = await screen.findByText(commonProps.description);

    expect(cardDescription).toBeInTheDocument();
    expect(cardDescription).toBeVisible();
  });

  it('renders without description', () => {
    renderActionCard({
      description: '',
    });

    const cardDescription = screen.queryByText(/./i, { selector: 'p.MuiTypography-bodySmall' });
    expect(cardDescription).not.toBeInTheDocument();
  });

  it('renders rich text pitch', async () => {
    renderActionCard({
      description: {
        value: {
          schema: 'dast',
          document: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'span',
                    value: 'Lorem ipsum dolor sit amet, ',
                  },
                  {
                    type: 'span',
                    marks: ['strong'],
                    value: 'consectetur adipiscing elit',
                  },
                  {
                    type: 'span',
                    value: '. Nunc vulputate libero et velit.',
                  },
                ],
              },
            ],
          },
        },
      },
    });

    const cardDescription = await screen.findByText((text) =>
      text.startsWith('Lorem ipsum dolor sit amet, ')
    );

    expect(cardDescription).toBeInTheDocument();
    expect(cardDescription).toBeVisible();
    expect(cardDescription).toContainHTML(
      '<p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Nunc vulputate libero et velit.</p>'
    );
  });
});
