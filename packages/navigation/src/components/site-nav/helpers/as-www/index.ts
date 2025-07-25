/**
 * Converts internal domains to use www subdomain with specific exceptions:
 * - Preserves relative URLs (starting with /)
 * - Preserves external domains (non-varsitytutors.com and non-vtstaging.com)
 * - Preserves ephemeral URLs (*.ephemeral.vtstaging.com)
 * - Preserves account subdomain (account.*.com)
 * - Converts other internal subdomains (like api.*) to www
 */

interface ParsedUrl {
  domain: string;
  path: string;
  protocol: string;
}

const PRESERVED_SUBDOMAINS = ['account', 'ai'];
const INTERNAL_DOMAINS = ['varsitytutors.com', 'vtstaging.com'];
const EPHEMERAL_PATTERN = '.ephemeral.vtstaging.com';

const PROTOCOL_PATTERN = /^https?:\/\//;
const PRESERVED_SUBDOMAIN_PATTERN = new RegExp(`\\/\\/(${PRESERVED_SUBDOMAINS.join('|')})\\.`);
const URL_PARSE_PATTERN = /^(https?:\/\/)([^/]+)(\/.*)?$/;

const isRelativeUrl = (url: string): boolean => {
  return url.startsWith('/');
};

const hasProtocol = (url: string): boolean => {
  return PROTOCOL_PATTERN.test(url);
};

const isEphemeralUrl = (url: string): boolean => {
  return url.includes(EPHEMERAL_PATTERN);
};

const hasPreservedSubdomain = (url: string): boolean => {
  return PRESERVED_SUBDOMAIN_PATTERN.test(url);
};

const parseUrl = (url: string): ParsedUrl | null => {
  const match = url.match(URL_PARSE_PATTERN);
  if (!match) {
    return null;
  }

  const [, protocol, domain, path = ''] = match;
  return { protocol, domain, path };
};

const isInternalDomain = (domain: string): boolean => {
  return INTERNAL_DOMAINS.some((internalDomain) => domain.includes(internalDomain));
};

const hasWwwSubdomain = (domain: string): boolean => {
  return domain.split('.')[0] === 'www';
};

const convertToWwwDomain = (domain: string): string => {
  const domainParts = domain.split('.');

  if (domainParts.length > 2) {
    // Replace existing subdomain with www
    domainParts[0] = 'www';
    return domainParts.join('.');
  }

  // Add www subdomain to domain without subdomain
  return `www.${domain}`;
};

const asWww = (url: string): string => {
  // Return relative URLs unchanged
  if (isRelativeUrl(url)) {
    return url;
  }

  // Preserve URLs that don't have a protocol
  if (!hasProtocol(url)) {
    return url;
  }

  // Preserve ephemeral URLs
  if (isEphemeralUrl(url)) {
    return url;
  }

  // Preserve known subdomains
  if (hasPreservedSubdomain(url)) {
    return url;
  }

  // Parse the URL
  const parsedUrl = parseUrl(url);
  if (!parsedUrl) {
    return url; // Return original if pattern doesn't match
  }

  const { protocol, domain, path } = parsedUrl;

  // Preserve external domains
  if (!isInternalDomain(domain)) {
    return url;
  }

  // If domain already has www subdomain, return as is
  if (hasWwwSubdomain(domain)) {
    return url;
  }

  // Convert domain to use www subdomain
  const wwwDomain = convertToWwwDomain(domain);
  return `${protocol}${wwwDomain}${path}`;
};

export default asWww;
