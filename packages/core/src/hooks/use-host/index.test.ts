import useConfigValue from '../use-config-value';
import useHost from '.';

jest.mock('../use-config-value');

describe('useHost', () => {
  it('returns the host with the given subdomain', () => {
    (useConfigValue as jest.Mock).mockReturnValue('https://api.example.com');

    expect(useHost('www')).toBe('https://www.example.com');
    expect(useHost('api')).toBe('https://api.example.com');
  });

  it('returns the host if no subdomain is given', () => {
    (useConfigValue as jest.Mock).mockReturnValue('https://api.example.com');
    expect(useHost()).toBe('https://api.example.com');

    (useConfigValue as jest.Mock).mockReturnValue('https://www.example.com');
    expect(useHost()).toBe('https://www.example.com');
  });

  it('works with long ephemeral subdomains', () => {
    (useConfigValue as jest.Mock).mockReturnValue(
      'https://blueshift-v4-upgrade.ephemeral.vtstaging.com'
    );

    expect(useHost()).toBe('https://blueshift-v4-upgrade.ephemeral.vtstaging.com');
    expect(useHost('api')).toBe('https://api.vtstaging.com');
  });
});
