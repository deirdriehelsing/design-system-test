interface UseRedirectParams {
  debug?: boolean;
  enabled?: boolean;
  redirector: (location: string) => void;
}

export type { UseRedirectParams };
