import logHandledError from '.';

const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});

describe('logHandledError()', () => {
  describe('when NewRelic agent is not present', () => {
    it('calls console.info with the message and customAttributes', () => {
      global.newrelic = undefined as any;

      logHandledError('test', { test: 'test' });

      expect(consoleInfoSpy).toHaveBeenCalledWith('test', {
        customAttributes: { test: 'test' },
        level: 'debug',
      });
    });
  });

  describe('when NewRelic agent is present', () => {
    it('calls New Relic logger with the message and customAttributes', () => {
      const logger = jest.fn();

      global.newrelic = { log: logger } as any;

      logHandledError('test', { test: 'test' });

      expect(logger).toHaveBeenCalledWith('test', {
        customAttributes: { test: 'test' },
        level: 'debug',
      });
      expect(consoleInfoSpy).not.toHaveBeenCalled();
    });
  });
});
