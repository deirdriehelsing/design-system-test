import { Remarkable } from 'remarkable';
import makeSimpleReplacementPlugin from '.';

describe('makeSimpleReplacementPlugin', () => {
  it('should return a plugin', () => {
    const plugin = makeSimpleReplacementPlugin('name', ':code:', 'replacement');
    expect(plugin).toBeDefined();
  });

  it('replaces all instances of the code with the replacement', () => {
    const plugin = makeSimpleReplacementPlugin('name', ':code:', 'replacement');

    const md = new Remarkable();
    md.use(plugin);

    expect(md.renderInline('The :code: is :code: a :code:')).toBe(
      'The replacement is replacement a replacement'
    );
  });
});
