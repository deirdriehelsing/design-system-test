import getElementText from '.';

describe('getElementText()', () => {
  it('returns aria-label attribute value when present', () => {
    const element = document.createElement('button');
    element.setAttribute('aria-label', 'Test Label');

    const result = getElementText(element);

    expect(result).toBe('Test Label');
  });

  it('returns innerText when aria-label is not present', () => {
    const element = document.createElement('button');
    element.innerText = 'Button Text';

    const result = getElementText(element);

    expect(result).toBe('Button Text');
  });

  it('returns undefined when neither aria-label nor innerText are present', () => {
    const element = document.createElement('button');
    const result = getElementText(element);

    expect(result).toBeUndefined();
  });

  it('prioritizes aria-label over innerText when both are present', () => {
    const element = document.createElement('button');
    element.setAttribute('aria-label', 'Label');
    element.innerText = 'Button Text';

    const result = getElementText(element);

    expect(result).toBe('Label');
  });
});
