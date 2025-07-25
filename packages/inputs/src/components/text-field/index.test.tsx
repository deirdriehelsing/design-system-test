import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import TextField from '.';
import userEvent from '@testing-library/user-event';

jest.mock('@blueshift-ui/i18n/dist/hooks/use-translation', () => () => ({
  translate: (key: string) => key,
}));

const intersectionObserverMock = () => ({ observe: () => null });
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

describe('<TextField />', () => {
  it('renders', () => {
    render(<TextField />);
  });

  it('applies gradient styles', () => {
    render(<TextField gradient />);

    /* eslint-disable-next-line testing-library/no-node-access */
    expect(screen.getByRole('textbox').parentElement).toHaveClass('Blueshift-gradient');
  });

  describe('<TextFieldClearButton />', () => {
    describe.each([
      {
        case: 'controlled',
        props: {
          clearable: true,
          onChange: jest.fn(),
          onClear: jest.fn(),
          value: 'mock-value',
        },
      },
      {
        case: 'uncontrolled',
        props: {
          clearable: true,
          onClear: jest.fn(),
        },
      },
    ])('when $case', ({ props }) => {
      beforeEach(() => {
        props.onChange?.mockReset();
        props.onClear?.mockReset();
      });

      it('should render if clearable', async () => {
        const user = userEvent.setup();

        render(<TextField {...props} clearable />);

        const input = screen.getByRole('textbox');
        const clearButton = await screen.findByLabelText('clear button');

        // Make sure input is not empty
        if (!props.value && input) {
          user.type(input, 'mock-value');
        }

        await waitFor(() => {
          expect(clearButton).toBeVisible();
        });
      });

      it('should not render if not clearable', () => {
        render(<TextField {...props} clearable={false} />);

        const clearButton = screen.queryByLabelText('clear button');

        expect(clearButton).not.toBeInTheDocument();
      });

      it('should hide when the input is empty', async () => {
        render(<TextField {...props} value="" />);

        const clearButton = await screen.findByLabelText('clear button');

        expect(clearButton).not.toBeVisible();
      });

      it('should call onClear when pressed', async () => {
        const user = userEvent.setup();

        render(<TextField {...props} />);

        const clearButton = await screen.findByLabelText('clear button');

        user.click(clearButton);

        await waitFor(() => {
          expect(props.onClear).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('<TextFieldEmojiMenu />', () => {
    describe.each([
      {
        case: 'controlled',
        props: {
          withEmojiMenu: true,
          onChange: jest.fn(),
          onEmojiSelection: jest.fn(),
          value: 'mock-value',
        },
      },
      {
        case: 'uncontrolled',
        props: {
          withEmojiMenu: true,
          onEmojiSelection: jest.fn(),
        },
      },
    ])('when $case', ({ props }) => {
      beforeEach(() => {
        props.onChange?.mockReset();
        props.onEmojiSelection?.mockReset();
      });

      it('should render if withEmojiMenu', async () => {
        const user = userEvent.setup();

        render(<TextField {...props} withEmojiMenu={true} />);

        const input = screen.getByRole('textbox');
        const emojiPickerButton = await screen.findByLabelText('emoji menu button');

        // Make sure input is not empty
        if (!props.value && input) {
          user.type(input, 'mock-value');
        }

        await waitFor(() => {
          expect(emojiPickerButton).toBeVisible();
        });
      });

      it('should not render if not withEmojiMenu', () => {
        render(<TextField {...props} withEmojiMenu={false} />);

        const emojiPickerButton = screen.queryByLabelText('emoji menu button');

        expect(emojiPickerButton).not.toBeInTheDocument();
      });

      it('should open picker when pressed', async () => {
        const user = userEvent.setup();

        render(<TextField {...props} />);

        const emojiPickerButton = await screen.findByLabelText('emoji menu button');

        await user.click(emojiPickerButton);

        const emojiPicker = await screen.findByLabelText('emoji menu');

        expect(emojiPicker).toBeInTheDocument();
      });

      it('should close picker when clicking outside the picker', async () => {
        const user = userEvent.setup();

        render(<TextField {...props} />);

        const emojiPickerButton = await screen.findByLabelText('emoji menu button');

        await user.click(emojiPickerButton);

        const emojiPicker = await screen.findByLabelText('emoji menu');

        await waitFor(() => {
          expect(emojiPicker).toBeInTheDocument();
        });

        await user.click(document.body);

        await waitFor(() => {
          expect(emojiPicker).not.toBeInTheDocument();
        });
      });
    });
  });
});
