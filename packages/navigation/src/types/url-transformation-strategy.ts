import type { SiteNavApplicationId } from './site-nav-props';

interface UrlTransformationStrategyArgs {
  baseURL?: string;
  currentApplicationId?: SiteNavApplicationId;
}

type UrlTransformationStrategyReturn = (href: string, applicationId?: string) => string;

export type { UrlTransformationStrategyArgs, UrlTransformationStrategyReturn };
