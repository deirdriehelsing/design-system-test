import type { AllOrNoneSiteNavApplicationProps, NavContentItem } from '../../../../types';

/**
 * Determines the appropriate link component for a nav item.
 * Returns the application's custom link component if the item belongs to the current application,
 * otherwise returns a standard anchor tag.
 */
const selectLinkComponentType = <TApplicationProps>(
  item: NavContentItem,
  applicationProps: AllOrNoneSiteNavApplicationProps<TApplicationProps>
): string | React.ComponentType<any> => {
  const { applicationId, applicationLinkComponent } = applicationProps;
  const isApplicationLink = item.application_id === applicationId;

  return isApplicationLink && applicationLinkComponent ? applicationLinkComponent : 'a';
};

export default selectLinkComponentType;
