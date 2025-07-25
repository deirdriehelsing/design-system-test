import { render, screen, waitFor } from '@testing-library/react';
import FormDialog from '.';
import React from 'react';
import { renderHook } from '@testing-library/react';
import { useForm } from '../../hooks';
import userEvent from '@testing-library/user-event';

jest.mock('@blueshift-ui/i18n/dist/hooks/use-translation', () => () => ({
  translate: (key: string) => key,
}));

const props = {
  cancelText: 'Cancel',
  errorMessage: 'Error',
  form: renderHook(() => jest.mocked(useForm())).result.current,
  onClose: jest.fn(),
  onSubmit: jest.fn(),
  open: true,
  submitText: 'Submit',
  successMessage: 'Success',
  title: 'Title',
  children: <div>Content</div>,
};

describe('<FormDialog />', () => {
  beforeEach(() => {
    props.onClose.mockClear();
    props.onSubmit.mockClear();
  });

  it('renders', () => {
    render(<FormDialog {...props} />);
  });

  it('renders a cancel button', () => {
    render(<FormDialog {...props} />);

    const cancelButton = screen.getByRole('button', { name: props.cancelText });

    expect(cancelButton).toBeInTheDocument();
  });

  it('calls the onClose prop when the cancel button is clicked', async () => {
    const user = userEvent.setup();

    render(<FormDialog {...props} />);

    const cancelButton = screen.getByRole('button', { name: props.cancelText });

    await user.click(cancelButton);

    await waitFor(() => {
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('renders a submit button', () => {
    render(<FormDialog {...props} />);

    const submitButton = screen.getByRole('button', { name: props.submitText });

    expect(submitButton).toBeInTheDocument();
  });

  it('calls the onSubmit prop when the submit button is clicked', async () => {
    const user = userEvent.setup();

    render(<FormDialog {...props} />);

    const submitButton = screen.getByRole('button', { name: props.submitText });

    await user.click(submitButton);

    await waitFor(() => {
      expect(props.onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('shows a success message when the onSubmit call is successful', async () => {
    const user = userEvent.setup();
    props.onSubmit.mockResolvedValueOnce(undefined);

    render(<FormDialog {...props} />);

    const submitButton = screen.getByRole('button', { name: props.submitText });

    await user.click(submitButton);

    const successFeedback = await screen.findByText(props.successMessage);
    expect(successFeedback).toBeInTheDocument();
  });

  it('shows an error message when the onSubmit call fails', async () => {
    const user = userEvent.setup();
    jest.spyOn(console, 'error').mockImplementationOnce(() => {}); // Silence log
    props.onSubmit.mockRejectedValueOnce(new Error('mock'));

    render(<FormDialog {...props} />);

    const submitButton = screen.getByRole('button', { name: props.submitText });

    await user.click(submitButton);

    const successFeedback = await screen.findByText(props.errorMessage);
    expect(successFeedback).toBeInTheDocument();
  });

  it('passes the resolved value to onResolved when onSubmit is resolved', async () => {
    const user = userEvent.setup();
    const mockedOnResolved = jest.fn();
    const resolvedValue = { test: 'foobar' };
    props.onSubmit.mockResolvedValueOnce(resolvedValue);

    render(<FormDialog {...props} onResolved={mockedOnResolved} />);

    const submitButton = screen.getByRole('button', { name: props.submitText });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockedOnResolved).toHaveBeenCalledWith(expect.objectContaining(resolvedValue));
    });
  });

  it('calls onResolved when onSubmit is resolved', async () => {
    const user = userEvent.setup();
    const mockedOnResolved = jest.fn();
    props.onSubmit.mockResolvedValueOnce(undefined);

    render(<FormDialog {...props} onResolved={mockedOnResolved} />);

    const submitButton = screen.getByRole('button', { name: props.submitText });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockedOnResolved).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onRejected when onSubmit is rejected', async () => {
    const user = userEvent.setup();
    const mockOnRejected = jest.fn();
    const error = new Error('mock');
    jest.spyOn(console, 'error').mockImplementationOnce(() => {}); // Silence log
    props.onSubmit.mockRejectedValueOnce(error);

    render(<FormDialog {...props} onRejected={mockOnRejected} />);

    const submitButton = screen.getByRole('button', { name: props.submitText });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnRejected).toHaveBeenCalledTimes(1);
    });

    expect(mockOnRejected).toHaveBeenCalledWith(error);
  });

  it('resets the form when the dialog is reopened', async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <FormDialog {...props} open>
        <input type="text" {...props.form.register('mock')} />
      </FormDialog>
    );

    const input = screen.getByRole('textbox');

    await user.type(input, 'mock');

    expect(props.form.getValues('mock')).toBe('mock');

    // Close by changing the open prop to false
    rerender(
      <FormDialog {...props} open={false}>
        <input type="text" {...props.form.register('mock')} />
      </FormDialog>
    );

    // Reopen by changing the open prop to true
    rerender(
      <FormDialog {...props} open>
        <input type="text" {...props.form.register('mock')} />
      </FormDialog>
    );

    expect(props.form.getValues('mock')).toBeUndefined();
  });
});
