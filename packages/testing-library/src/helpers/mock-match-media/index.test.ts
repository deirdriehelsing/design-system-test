import mockMatchMedia from '.';

const matchMediaMock = jest.fn();
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: matchMediaMock,
});

const originalMatchMedia = window.matchMedia;
describe('mockMatchMedia()', () => {
  it('sets the mode to MOBILE', () => {
    mockMatchMedia('MOBILE');

    const isMobile = window.matchMedia('(pointer: coarse)');
    const isDesktop = window.matchMedia('(pointer: fine)');

    expect(window.matchMedia).not.toBe(originalMatchMedia);
    expect(isMobile.matches).toBe(true);
    expect(isDesktop.matches).toBe(false);
  });

  it('sets the mode to DESKTOP', () => {
    mockMatchMedia('DESKTOP');

    const isMobile = window.matchMedia('(pointer: coarse)');
    const isDesktop = window.matchMedia('(pointer: fine)');

    expect(window.matchMedia).not.toBe(originalMatchMedia);
    expect(isMobile.matches).toBe(false);
    expect(isDesktop.matches).toBe(true);
  });

  it('Resets to original matchMedia', () => {
    mockMatchMedia('RESET');

    expect(window.matchMedia).toBe(originalMatchMedia);
  });

  it('calls original matchMedia when query is not (pointer: coarse) or (pointer: fine)', () => {
    mockMatchMedia('MOBILE');

    window.matchMedia('(max-width: 768px)');

    expect(matchMediaMock).toHaveBeenCalledTimes(1);
    expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 768px)');
  });

  it('honors custom mock', () => {
    mockMatchMedia('MOBILE', { matches: true });

    const isMobile = window.matchMedia('(pointer: coarse)');
    const isDesktop = window.matchMedia('(pointer: fine)');

    expect(isMobile.matches).toBe(true);
    expect(isDesktop.matches).toBe(true);
  });
});
