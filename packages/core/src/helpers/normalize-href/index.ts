interface NormalizeHrefOptions {
  /** Current origin for URL processing (injected for testability) */
  currentOrigin?: string;
  /** Whether to return the full URL instead of a relative path */
  full?: boolean;
}

const VT_DOMAIN_PATTERN = /\.v\w+\.com$/;
const VT_PRODUCTION_DOMAIN = '.varsitytutors.com';
const TRAILING_SLASH_PATTERN = /\/$/;

// Extracts the current VT environment domain suffix
function getCurrentVtDomain(origin: string): string | null {
  return origin.match(VT_DOMAIN_PATTERN)?.[0] ?? null;
}

// Translates varsitytutors.com URLs to current environment domain
function translateVtDomain(url: string, targetDomain: string): string {
  return url.replace(VT_PRODUCTION_DOMAIN, targetDomain);
}

// Converts relative path to absolute URL
function makeAbsoluteUrl(href: string, origin: string): string {
  return href.startsWith('/') ? `${origin}${href}` : href;
}

// Converts absolute URL to relative path, removing trailing slash
function makeRelativePath(url: string, origin: string): string {
  return url.replace(origin, '').replace(TRAILING_SLASH_PATTERN, '');
}

// Checks if URL belongs to the current domain
function isSameDomain(url: string, origin: string): boolean {
  return url.startsWith(origin);
}

/**
 * Normalizes URLs for VT domains across different environments (staging, dev, prod).
 *
 * This function handles several cases:
 * 1. Relative paths (/path) - keeps them as-is unless full URL is requested
 * 2. Same domain URLs - converts to relative paths unless full URL is requested
 * 3. Cross-domain VT URLs - translates between environments (e.g. varsitytutors.com → vtstaging.com)
 * 4. External URLs - keeps them as-is
 *
 * @example
 * // In staging environment (vtstaging.com):
 * normalizeHref('/path') → '/path'
 * normalizeHref('http://www.vtstaging.com/path') → '/path'
 * normalizeHref('http://account.varsitytutors.com/path') → 'http://account.vtstaging.com/path'
 * normalizeHref('http://external.com/path') → 'http://external.com/path'
 *
 * @param href - The URL to normalize
 * @param options - Configuration options
 * @param options.full - If true, always returns full URLs instead of relative paths
 * @param options.currentOrigin - Current origin (defaults to location.origin)
 * @returns The normalized URL
 */
function normalizeHref(
  href: string,
  { full, currentOrigin = location.origin }: NormalizeHrefOptions = {}
) {
  // Convert relative paths to absolute URLs for consistent processing
  let url = makeAbsoluteUrl(href, currentOrigin);

  // Extract current environment domain and translate VT production URLs if needed
  const currentVtDomain = getCurrentVtDomain(currentOrigin);
  if (currentVtDomain) {
    url = translateVtDomain(url, currentVtDomain);
  }

  // Return relative path unless full URL is requested and URL is on current domain
  if (!full && isSameDomain(url, currentOrigin)) {
    return makeRelativePath(url, currentOrigin);
  }

  return url;
}

export default normalizeHref;
