import { render, renderHook, screen, waitFor } from '@testing-library/react';
import IntegrationWrapper from '../../components/integration-wrapper';
import React from 'react';
import RichTranslation from '@blueshift-ui/i18n/dist/components/rich-translation';
import mockTranslations from '.';
import nock from 'nock';
import useTranslation from '@blueshift-ui/i18n/dist/hooks/use-translation';

nock.disableNetConnect();
afterEach(() => nock.cleanAll());

const options = { wrapper: IntegrationWrapper };

describe('translation', () => {
  it('mocks translations', async () => {
    mockTranslations('blueshift', { text: 'Click me', description: 'Click me button' });

    const { result } = renderHook(() => useTranslation('blueshift'), options);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.translate('text')).toBe('Click me');
    expect(result.current.translate('description')).toBe('Click me button');
  });

  it('supports rich translations', async () => {
    mockTranslations('blueshift', { text: 'Click me' });

    function Component() {
      const { translate } = useTranslation('blueshift', { rich: true });
      return <RichTranslation i18nKey="text" translator={translate} />;
    }

    render(<Component />, { wrapper: IntegrationWrapper });

    expect(await screen.findByText('Click me')).toBeInTheDocument();
  });

  it('supports array syntax', async () => {
    mockTranslations('blueshift', ['text', 'description']);

    const { result } = renderHook(() => useTranslation('blueshift'), options);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.translate('text')).toBe('text');
    expect(result.current.translate('description')).toBe('description');
  });

  it('supports i18next interpolation', async () => {
    mockTranslations('blueshift', {
      numberOfThings: '{{count}} things',
      numberOfThings_one: '{{count}} thing',
    });

    const { result } = renderHook(() => useTranslation('blueshift'), options);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.translate('numberOfThings', { count: 5 })).toBe('5 things');
    expect(result.current.translate('numberOfThings', { count: 1 })).toBe('1 thing');
  });

  it('can mock multiple namespaces', async () => {
    mockTranslations('alpha', { title: 'Alpha' });
    mockTranslations('beta', { title: 'Beta' });

    const { result: resultA } = renderHook(() => useTranslation('alpha'), options);
    const { result: resultB } = renderHook(() => useTranslation('beta'), options);

    await waitFor(() => expect(resultA.current.loading).toBe(false));
    await waitFor(() => expect(resultB.current.loading).toBe(false));

    expect(resultA.current.translate('title')).toEqual('Alpha');
    expect(resultB.current.translate('title')).toEqual('Beta');
  });

  it('can mock multiple namespaces in the same call', async () => {
    mockTranslations({ alpha: { title: 'Alpha' }, beta: { title: 'Beta' } });

    const { result: resultA } = renderHook(() => useTranslation('alpha'), options);
    const { result: resultB } = renderHook(() => useTranslation('beta'), options);

    await waitFor(() => expect(resultA.current.translate('title')).toEqual('Alpha'));
    await waitFor(() => expect(resultB.current.translate('title')).toEqual('Beta'));
  });

  it('can mock dotted namespaces', async () => {
    mockTranslations('alpha.beta', { title: 'Alpha Beta' });

    const { result } = renderHook(() => useTranslation('alpha.beta'), options);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.translate('title')).toEqual('Alpha Beta');
  });
});
