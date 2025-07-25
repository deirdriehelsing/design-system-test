type NR = typeof newrelic;

interface NewRelic extends NR {
  log: (
    message: string,
    options: {
      customAttributes?: Record<string, any>;
      level: 'debug' | 'error' | 'info' | 'trace' | 'warn';
    }
  ) => void;
}

export type { NewRelic };
