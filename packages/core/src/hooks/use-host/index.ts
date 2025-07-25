import useConfigValue from '../use-config-value';

function useHost(subdomain = '') {
  const domain = useConfigValue('host', window.location.origin ?? '');
  return subdomain ? domain.replace(/\/\/.+(\.\w+\.\w+)$/, `//${subdomain}$1`) : domain;
}

export default useHost;
