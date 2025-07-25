import { render, screen } from '@testing-library/react';
import CardInputOption from '.';
import React from 'react';

const svgStar = (
  <svg data-testid="svg-star">
    <polygon points="100,10 40,198 190,78 10,78 160,198" style={{ fill: 'black' }} />
  </svg>
);

const CARD_INPUT_OPTION_PROPS = {
  description:
    "Your personal study buddy for any subject, 24/7 - Let's chat and set you up for success!",
  image: '/ai-tutor-chat-icon.svg',
  label: 'Chat with an AI Tutor',
  value: 'ai-tutor-chat',
};

describe('<CardInputOption />', () => {
  it('renders', () => {
    render(<CardInputOption {...CARD_INPUT_OPTION_PROPS} />);

    expect(screen.getByText(CARD_INPUT_OPTION_PROPS.label)).toBeInTheDocument();
    expect(screen.getByText(CARD_INPUT_OPTION_PROPS.description)).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', CARD_INPUT_OPTION_PROPS.image);

    const radioButton = screen.getByRole('radio', { hidden: true });
    expect(radioButton).toBeInTheDocument();
    expect(radioButton).toHaveAttribute('value', CARD_INPUT_OPTION_PROPS.value);
  });

  it('renders svg for image prop', () => {
    render(<CardInputOption {...CARD_INPUT_OPTION_PROPS} image={svgStar} />);

    expect(screen.getByText(CARD_INPUT_OPTION_PROPS.label)).toBeInTheDocument();
    expect(screen.getByText(CARD_INPUT_OPTION_PROPS.description)).toBeInTheDocument();

    const svg = screen.getByTestId('svg-star');
    expect(svg).toBeInTheDocument();
    expect(svg).toContainHTML(
      '<polygon points="100,10 40,198 190,78 10,78 160,198" style="fill: black;" />'
    );

    const radioButton = screen.getByRole('radio', { hidden: true });
    expect(radioButton).toBeInTheDocument();
    expect(radioButton).toHaveAttribute('value', CARD_INPUT_OPTION_PROPS.value);
  });
});
