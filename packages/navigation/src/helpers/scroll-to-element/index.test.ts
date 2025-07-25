import scrollToElement from '.';

describe('scrollToElement', () => {
  const originalScrollTo = window.scrollTo;
  const originalScrollIntoView = Element.prototype.scrollIntoView;
  const originalQuerySelector = document.querySelector;

  beforeEach(() => {
    window.scrollTo = jest.fn();
    Element.prototype.scrollIntoView = jest.fn();
    document.querySelector = jest.fn();
    Object.defineProperty(window, 'scrollY', { value: 50 });
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    Element.prototype.scrollIntoView = originalScrollIntoView;
    document.querySelector = originalQuerySelector;
    jest.clearAllMocks();
  });

  it('does not scroll if element is not found', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    scrollToElement({ selector: '#non-existent' });

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith('Element not found: #non-existent');

    consoleWarnSpy.mockRestore();
  });

  it('uses scrollIntoView when no offsetTop is provided (selector)', () => {
    const element = document.createElement('div');
    (document.querySelector as jest.Mock).mockReturnValue(element);

    scrollToElement({ selector: '#myElement' });

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  });

  it('uses scrollIntoView when no offsetTop is provided (element)', () => {
    const element = document.createElement('div');

    scrollToElement({ element });

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  });

  it('uses scrollTo when offsetTop is provided (selector)', () => {
    const element = document.createElement('div');
    Object.defineProperty(element, 'getBoundingClientRect', {
      value: jest.fn(() => ({ top: 100 })),
    });
    (document.querySelector as jest.Mock).mockReturnValue(element);

    scrollToElement({ selector: '#myElement', offsetTop: 20 });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 130, // 100 (getBoundingClientRect().top) + 50 (window.scrollY) - 20 (offsetTop)
      behavior: 'smooth',
    });
  });

  it('uses scrollTo when offsetTop is provided (element)', () => {
    const element = document.createElement('div');
    Object.defineProperty(element, 'getBoundingClientRect', {
      value: jest.fn(() => ({ top: 100 })),
    });

    scrollToElement({ element, offsetTop: 20 });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 130, // 100 (getBoundingClientRect().top) + 50 (window.scrollY) - 20 (offsetTop)
      behavior: 'smooth',
    });
  });

  it('uses provided behavior, block, and inline options', () => {
    const element = document.createElement('div');

    scrollToElement({
      element,
      behavior: 'auto',
      block: 'start',
      inline: 'center',
    });

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'start',
      inline: 'center',
    });
  });
});
