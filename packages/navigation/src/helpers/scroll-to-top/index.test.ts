import scrollToTop from '.';

describe('scrollToTop', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    jest.clearAllMocks();
  });

  it('scrolls to top with default smooth behavior', () => {
    scrollToTop();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('scrolls to top with specified behavior', () => {
    scrollToTop({ behavior: 'auto' });
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });
});
