import { act, render, screen, waitFor } from '@testing-library/react';
import Box from '@blueshift-ui/core/dist/components/box';
import Button from '@blueshift-ui/core/dist/components/button';
import Carousel from '.';
import Link from '@blueshift-ui/core/dist/components/link';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import userEvent from '@testing-library/user-event';

const images = [
  {
    label: 'In orbit',
    imgPath:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Earth as night',
    imgPath:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'The moon',
    imgPath:
      'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Astronaut',
    imgPath:
      'https://images.unsplash.com/photo-1541873676-a18131494184?auto=format&fit=crop&w=400&h=250&q=60',
  },
];
const mockOnChange = jest.fn();

jest.mock('@blueshift-ui/theme/dist/hooks/use-breakpoints', () =>
  jest.fn(() => ({ isLargeViewport: true }))
);
jest.mock('./index.css', () => ({
  description: 'description',
  header: {
    large: 'header-large',
    small: 'header-small',
  },
  heading: 'heading',
  headingWrapper: 'headingWrapper',
  swiper: 'swiper',
  swiperSlide: 'swiperSlide',
}));

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(() => ({ ref: jest.fn() })),
}));
const mockUseInView = useInView as jest.MockedFunction<typeof useInView>;

describe('<Carousel />', () => {
  describe('large viewports/containers', () => {
    const renderCarousel = () =>
      render(
        <Carousel
          description="Carousel Description"
          items={images.map((item) => (
            <Box
              alt={item.label}
              component="img"
              key={item.label}
              src={item.imgPath}
              sx={{
                height: 255,
                display: 'block',
                maxWidth: 400,
                overflow: 'hidden',
                width: 400,
              }}
            />
          ))}
          spaceBetween={30}
          title="Carousel Title"
        />
      );

    it('renders correctly', async () => {
      renderCarousel();
      expect(await screen.findByText('Carousel Title')).toBeVisible();
      expect(await screen.getAllByRole('button')[0]).toBeInTheDocument();
    });
  });

  describe('small viewports/containers', () => {
    const renderCarousel = () =>
      render(
        <Carousel
          description="Carousel Description"
          items={images.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <Box
              alt={item.label}
              component="img"
              src={item.imgPath}
              sx={{
                height: 255,
                display: 'block',
                maxWidth: 400,
                overflow: 'hidden',
                width: 400,
              }}
            />
          ))}
          size="small"
          spaceBetween={30}
          title="Carousel Title"
        />
      );

    it('renders correctly', async () => {
      renderCarousel();
      expect(await screen.findByText('Carousel Title')).toBeVisible();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('arrow controls', () => {
    it('renders correctly', async () => {
      render(
        <Carousel
          controlsVariant="sideArrows"
          items={images.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <Box
              alt={item.label}
              component="img"
              src={item.imgPath}
              sx={{
                height: 255,
                display: 'block',
                maxWidth: 400,
                overflow: 'hidden',
                width: 400,
              }}
            />
          ))}
          spaceBetween={30}
          title="Carousel Title"
        />
      );

      expect(await screen.findByText('Carousel Title')).toBeVisible();
      expect(screen.getByText('CaretLeft Icon')).toBeInTheDocument();
      expect(screen.getByText('CaretRight Icon')).toBeInTheDocument();
    });
  });

  describe('interaction', () => {
    describe('on swipe', () => {
      describe('when no onChange is present', () => {
        const renderCarousel = () =>
          render(
            <Carousel
              description="Carousel Description"
              items={images.map((item) => (
                <Box
                  alt={item.label}
                  component="img"
                  key={item.label}
                  src={item.imgPath}
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: 400,
                  }}
                />
              ))}
              onChange={mockOnChange}
              spaceBetween={30}
              title="Carousel Title"
            />
          );

        it('it does not call onChange prop when button is disabled', async () => {
          const user = userEvent.setup({ pointerEventsCheck: 0 });

          renderCarousel();

          await act(() => user.click(screen.getAllByRole('button')[0]));

          expect(mockOnChange).not.toHaveBeenCalled();
        });

        it('it does call onChange prop when button is enabled', async () => {
          const user = userEvent.setup();

          renderCarousel();

          await act(() => user.click(screen.getAllByRole('button')[1]));

          expect(mockOnChange).toHaveBeenCalledTimes(1);

          await act(() => user.click(screen.getAllByRole('button')[0]));

          expect(mockOnChange).toHaveBeenCalledTimes(2);
        });
      });

      describe('when no onChange prop is present', () => {
        const renderCarousel = () =>
          render(
            <Carousel
              description="Carousel Description"
              items={images.map((item) => (
                <Box
                  alt={item.label}
                  component="img"
                  key={item.label}
                  src={item.imgPath}
                  sx={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: 400,
                  }}
                />
              ))}
              spaceBetween={30}
              title="Carousel Title"
            />
          );

        it('enabled button calls nothing', async () => {
          const user = userEvent.setup();

          renderCarousel();

          await act(() => user.click(screen.getAllByRole('button')[1]));

          expect(mockOnChange).toHaveBeenCalledTimes(0);
        });
      });
    });
  });

  describe('tabbing order', () => {
    it('tabs in the correct order', async () => {
      const user = userEvent.setup();

      render(
        <Carousel
          items={[<Button key="item-1">Item 1</Button>, <Button key="item-2">Item 2</Button>]}
          title={<Link>Carousel Title</Link>}
        />
      );

      const carouselTitle = screen.getByRole('heading');
      expect(carouselTitle).toHaveTextContent('Carousel Title');

      await user.tab();

      // The Previous button starts disabled because it's the start of the carousel, so Next has focus
      const nextButton = screen.getByRole('button', { name: 'Next' });
      expect(nextButton).toHaveFocus();

      // After clicking Next, we can then Shift+Tab to the Previous button
      await user.click(nextButton);
      await user.tab({
        shift: true,
      });
      const previousButton = screen.getByRole('button', { name: 'Previous' });
      expect(previousButton).toHaveFocus();

      // We can then tab to the Next button
      await user.tab();
      expect(nextButton).toHaveFocus();

      // And then to the carousel items
      await user.tab();
      const item1Button = screen.getByRole('button', { name: 'Item 1' });
      expect(item1Button).toHaveFocus();

      await user.tab();
      const item2Button = screen.getByRole('button', { name: 'Item 2' });
      expect(item2Button).toHaveFocus();
    });
  });
});

describe('<Carousel disableOutOfView />', () => {
  it('hides items that are not in view', async () => {
    let onChange = undefined as
      | ((inView: boolean, entry: IntersectionObserverEntry) => void)
      | undefined;

    // mock useInView hook so that we can grab its onChange event and call it
    // when we are ready and with the elements that we want
    mockUseInView.mockImplementation((args) => {
      onChange = args?.onChange;
      return { ref: (_node?: Element | null | undefined) => {} } as any;
    });

    render(
      <Carousel
        disableOutOfView
        items={[<div key="hidden">Hidden</div>, <div key="visible">Visible</div>]}
      />
    );

    const hidden = screen.getByText('Hidden');
    const visible = screen.getByText('Visible');
    await waitFor(() => expect(onChange).toBeDefined());
    await waitFor(() => expect(mockUseInView).toHaveBeenCalledTimes(2));

    onChange?.(false, { target: hidden } as any);
    onChange?.(true, { target: visible } as any);

    expect(hidden).toHaveAttribute('aria-hidden', 'true');
    expect(hidden).toHaveAttribute('inert');

    expect(visible).not.toHaveAttribute('aria-hidden');
    expect(visible).not.toHaveAttribute('inert');
  });
});
