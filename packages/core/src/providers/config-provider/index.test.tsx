import { render, screen } from '@testing-library/react';
import ConfigProvider from '.';
import React from 'react';
import useConfigValue from '../../hooks/use-config-value';

describe('<ConfigProvider />', () => {
  const config = {
    apiHost: 'https://api.example.com',
  };

  function ComponentThatUsesConfig() {
    const baseApiPath = useConfigValue('apiHost');
    return <div>{baseApiPath}</div>;
  }

  it('hydrates config state', async () => {
    render(
      <ConfigProvider config={config}>
        <ComponentThatUsesConfig />
      </ConfigProvider>
    );

    const path = await screen.findByText(config.apiHost);

    expect(path).toBeInTheDocument();
  });
});
