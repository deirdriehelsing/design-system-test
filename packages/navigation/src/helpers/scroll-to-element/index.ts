interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  offsetTop?: number;
}

interface ScrollToElementBySelector extends ScrollOptions {
  selector: string;
}

interface ScrollToElementByReference extends ScrollOptions {
  element: HTMLElement;
}

type ScrollToElementOptions = ScrollToElementBySelector | ScrollToElementByReference;

function scrollToElement(options: ScrollToElementOptions) {
  const { behavior = 'smooth', offsetTop, block = 'center', inline = 'nearest' } = options;

  const element =
    'selector' in options ? document.querySelector(options.selector) : options.element;

  if (!element) {
    console.warn(
      `Element not found: ${'selector' in options ? options.selector : 'provided element'}`
    );
    return;
  }

  if (offsetTop) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offsetTop;

    window.scrollTo({
      top: offsetPosition,
      behavior,
    });

    return;
  }

  element.scrollIntoView({
    behavior,
    block,
    inline,
  });
}

export default scrollToElement;
