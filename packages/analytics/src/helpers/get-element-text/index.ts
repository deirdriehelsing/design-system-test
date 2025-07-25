function getElementText<Element extends HTMLElement>(element: Element) {
  return element.getAttribute('aria-label') ?? (element.innerText ? element.innerText : undefined);
}

export default getElementText;
