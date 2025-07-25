import scrollToBottom from '.';

describe('scrollToBottom', () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = jest.fn();
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000 });
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    jest.clearAllMocks();
  });

  it('scrolls to bottom with default smooth behavior', () => {
    scrollToBottom();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 1000, behavior: 'smooth' });
  });

  it('scrolls to bottom with specified behavior', () => {
    scrollToBottom({ behavior: 'auto' });
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 1000, behavior: 'auto' });
  });
});
