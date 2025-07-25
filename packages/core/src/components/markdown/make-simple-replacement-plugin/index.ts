import type { Remarkable } from 'remarkable';

function makeSimpleReplacementPlugin(name: string, code: string, replacement: string) {
  const parse: Remarkable.InlineParsingRule = (state, silent) => {
    const { pos, src } = state;

    if (src.slice(pos, pos + code.length) !== code) {
      return false;
    }
    state.pos += code.length;

    if (!silent) {
      const token: Remarkable.ContentToken = {
        type: name,
        level: state.level,
        content: code,
      };

      state.push(token);
    }

    return true;
  };

  const render: Remarkable.Rule = (_tokens, _index, _options) => {
    return replacement;
  };

  const plugin: Remarkable.Plugin = (md) => {
    md.inline.ruler.push(name, parse, {});
    md.renderer.rules[name] = render;
  };

  return plugin;
}

export default makeSimpleReplacementPlugin;
