import * as ReactHookForm from 'react-hook-form';
import { renderHook, waitFor } from '@testing-library/react';
import useForm from '.';

const mockedGetDefaultFormProps = jest.fn(() => ({}));

jest.mock('../../helpers/get-default-form-props', () => () => mockedGetDefaultFormProps());

const mockedGetDirtyFieldValues = jest.fn();

jest.mock('../../helpers/get-dirty-field-values', () => () => mockedGetDirtyFieldValues());

describe('useForm()', () => {
  beforeEach(() => {
    mockedGetDefaultFormProps.mockClear();
    mockedGetDirtyFieldValues.mockClear();
  });

  it('loads defaults', () => {
    mockedGetDefaultFormProps.mockReturnValueOnce({
      defaultValues: {
        mock: true,
      },
    });

    const { result } = renderHook(() => useForm());

    const values = result.current.getValues();

    expect(mockedGetDefaultFormProps).toHaveBeenCalledTimes(1);
    expect(values.mock).toBe(true);
  });

  it('filters dirty fields', async () => {
    const mockedOnValid = jest.fn();
    mockedGetDirtyFieldValues.mockReturnValueOnce({ mock: true });

    const { result } = renderHook(() =>
      useForm({
        shouldSubmitDirtyFieldsOnly: true,
      })
    );

    result.current.handleSubmit(mockedOnValid)();

    await waitFor(() => {
      expect(mockedOnValid).toHaveBeenCalledTimes(1);
    });

    expect(mockedOnValid.mock.calls[0][0]).toStrictEqual({ mock: true });
  });

  it('returns original form object', () => {
    const { result: rhfResult } = renderHook(() => ReactHookForm.useForm());
    const rhfUseFormSpy = jest.spyOn(ReactHookForm, 'useForm');
    rhfUseFormSpy.mockReturnValueOnce(rhfResult.current);

    const { result } = renderHook(() => useForm());

    expect(result.current).toBe(rhfResult.current);

    rhfUseFormSpy.mockRestore();
  });
});
