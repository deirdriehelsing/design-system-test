import type { ClientAdapter } from '../../types';

import FetchProvider from '.';
import { Provider as JotaiProvider } from 'jotai';
import { QueryClient } from '@tanstack/react-query';
import React from 'react';
import { render } from '@testing-library/react';

jest.mock('@tanstack/react-query');

const MockedQueryClient = QueryClient as jest.Mock;

class MockClient implements ClientAdapter {
  public readonly instance = global.fetch;

  public makeRequest(options: any): Promise<any> {
    return this.instance(options.url, options);
  }
}

describe('<FetchProvider />', () => {
  beforeEach(() => {
    MockedQueryClient.mockClear();
  });

  it('renders', () => {
    render(<FetchProvider>children</FetchProvider>);
  });

  it('accepts a query client', () => {
    const client = new MockClient();

    render(<FetchProvider client={client}>children</FetchProvider>, {
      wrapper: JotaiProvider,
    });

    expect(MockedQueryClient).toHaveBeenCalledTimes(1);
    expect(MockedQueryClient).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultOptions: expect.objectContaining({
          queries: expect.objectContaining({
            meta: {
              client,
            },
          }),
        }),
      })
    );
  });

  it('accepts default query client configs', () => {
    render(
      <FetchProvider
        config={{
          defaultOptions: {
            queries: {
              meta: {
                mock: true,
                client: new MockClient(),
              },
            },
          },
        }}
      >
        children
      </FetchProvider>,
      { wrapper: JotaiProvider }
    );

    expect(MockedQueryClient).toHaveBeenCalledTimes(1);
    expect(MockedQueryClient).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultOptions: expect.objectContaining({
          queries: expect.objectContaining({
            meta: expect.objectContaining({
              mock: true,
            }),
          }),
        }),
      })
    );
  });
});
