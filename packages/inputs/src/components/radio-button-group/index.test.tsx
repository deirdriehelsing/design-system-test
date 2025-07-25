import { render, screen, waitFor } from '@testing-library/react';
import RadioButtonGroup from '.';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('<RadioButtonGroup />', () => {
  const inputOptions = [
    { label: 'Dogs', value: 'dogs' },
    { label: 'Cats', value: 'cats' },
    { label: 'Birds', value: 'birds' },
  ];

  const cardInputOptions = [
    {
      children: <div>Children</div>,
      description:
        "Your personal study buddy for any subject, 24/7 - Let's chat and set you up for success!",
      image: '/ai-tutor-chat-icon.svg',
      label: 'Chat with an AI Tutor',
      value: 'ai-tutor-chat',
    },
    {
      description: 'Collaborate face-to-face with a subject expert in our interactive workspace.',
      image: '1-on-1-video-session-icon.svg',
      label: '1-on-1 video session',
      value: '1-on-1-video-session',
    },
  ];

  it('renders a label when provided', () => {
    render(<RadioButtonGroup inputOptions={inputOptions} label="foo" />);
    expect(screen.getByLabelText('foo')).toBeInTheDocument();
  });

  it('renders a label when provided with labelVariant inline', () => {
    render(<RadioButtonGroup inputOptions={inputOptions} label="foo" labelVariant="inline" />);
    expect(screen.getByLabelText('foo')).toBeInTheDocument();
  });

  it('does not render a label when none is provided', () => {
    render(<RadioButtonGroup inputOptions={inputOptions} />);
    expect(screen.queryByLabelText('foo')).toBeNull();
  });

  it('renders a control input option when provided', () => {
    render(
      <RadioButtonGroup
        inputOptions={[
          { control: <input type="checkbox" />, label: 'Dogs', value: 'dogs' },
          { label: 'Cats', value: 'cats' },
          { label: 'Birds', value: 'birds' },
        ]}
      />
    );
    expect(screen.getByRole('checkbox', { hidden: true })).toBeInTheDocument();
  });

  it('renders within a carousel when renderAsCarousel is true', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <RadioButtonGroup inputOptions={inputOptions} onChange={handleChange} renderAsCarousel />
    );

    const swiper = screen.getByRole('radiogroup').firstChild;
    expect(swiper).toHaveClass('swiper');
    expect(screen.getAllByRole('radio', { hidden: true })).toHaveLength(3);

    await user.click(screen.getAllByRole('radio', { hidden: true })[1]);
    await waitFor(() => expect(handleChange).toHaveBeenCalledWith(expect.anything(), 'cats'));
  });

  it('renders the control input option within a carousel when provided', () => {
    render(
      <RadioButtonGroup
        inputOptions={[
          { control: <input type="checkbox" />, label: 'Dogs', value: 'dogs' },
          { label: 'Cats', value: 'cats' },
          { label: 'Birds', value: 'birds' },
        ]}
        renderAsCarousel
      />
    );

    const swiper = screen.getByRole('radiogroup').firstChild;
    expect(swiper).toHaveClass('swiper');
    expect(screen.getByRole('checkbox', { hidden: true })).toBeInTheDocument();
  });

  it('renders as chips when variant is chips', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <RadioButtonGroup inputOptions={inputOptions} onChange={handleChange} variant="chips" />
    );

    expect(screen.getAllByRole('button')).toHaveLength(3);
    await user.click(screen.getAllByRole('button')[1]);
    await waitFor(() => expect(handleChange).toHaveBeenCalledWith(expect.anything(), 'cats'));
  });

  it('renders as chips within a carousel when variant is chips and renderAsCarousel is true', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <RadioButtonGroup
        inputOptions={inputOptions}
        onChange={handleChange}
        renderAsCarousel
        variant="chips"
      />
    );

    const swiper = screen.getByRole('radiogroup').firstChild;
    expect(swiper).toHaveClass('swiper');
    expect(screen.getAllByRole('radio', { hidden: true })).toHaveLength(3);
    await user.click(screen.getAllByRole('radio', { hidden: true })[1]);
    await waitFor(() => expect(handleChange).toHaveBeenCalledWith(expect.anything(), 'cats'));
  });

  it('renders a label for cards variant when provided', () => {
    render(<RadioButtonGroup inputOptions={cardInputOptions} label="foo" variant="cards" />);
    expect(screen.getByLabelText('foo')).toBeInTheDocument();
  });

  it('does not render a label for cards variant when none is provided', () => {
    render(<RadioButtonGroup inputOptions={cardInputOptions} variant="cards" />);
    expect(screen.queryByLabelText('foo')).toBeNull();
  });

  it('renders children for cards when provided', () => {
    render(<RadioButtonGroup inputOptions={cardInputOptions} label="foo" variant="cards" />);
    expect(screen.getAllByText('Children')).toHaveLength(1);
  });

  it('renders within a carousel for cards variant when renderAsCarousel is true', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <RadioButtonGroup
        inputOptions={cardInputOptions}
        onChange={handleChange}
        renderAsCarousel
        variant="cards"
      />
    );

    const swiper = screen.getByRole('radiogroup').firstChild;
    expect(swiper).toHaveClass('swiper');
    expect(screen.getAllByRole('radio', { hidden: true })).toHaveLength(2);
    await user.click(screen.getAllByRole('radio', { hidden: true })[1]);
    await waitFor(() =>
      expect(handleChange).toHaveBeenCalledWith(expect.anything(), '1-on-1-video-session')
    );
  });
});
