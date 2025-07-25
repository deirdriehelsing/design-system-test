type SupportedModes = 'MOBILE' | 'DESKTOP' | 'RESET';

let originalMatchMedia: typeof window.matchMedia | null = null;
function mockMatchMedia(mode: SupportedModes, customMock?: Partial<MediaQueryList>) {
  if (originalMatchMedia === null) {
    originalMatchMedia = window.matchMedia;
  }

  if (mode === 'RESET') {
    window.matchMedia = originalMatchMedia;
    return;
  }

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: any) => {
      if (
        originalMatchMedia !== null &&
        !['(pointer: coarse)', '(pointer: fine)'].includes(query)
      ) {
        return { ...originalMatchMedia(query), ...customMock };
      }

      const matches =
        (mode === 'MOBILE' && query === '(pointer: coarse)') ||
        (mode === 'DESKTOP' && query === '(pointer: fine)');

      return {
        media: query,
        matches: matches,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
        ...customMock,
      };
    },
  });
}

export default mockMatchMedia;
