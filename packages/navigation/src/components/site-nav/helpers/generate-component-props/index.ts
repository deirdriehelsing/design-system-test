import type { AllOrNoneSiteNavApplicationProps, NavContentItem } from '../../../../types';

/**
 * Builds props for a nav item component, merging base onClick/target props with application-specific link props
 * when the item's application_id matches, otherwise including its href.
 */
const generateComponentProps = <TApplicationProps>(
  item: NavContentItem,
  applicationProps: AllOrNoneSiteNavApplicationProps<TApplicationProps>
): Record<string, any> => {
  const { applicationId, getApplicationLinkComponentProps } = applicationProps;
  const isApplicationLink = item.application_id === applicationId;

  const baseProps = {
    onClick: item.onClick,
    target: item.target,
  };

  if (isApplicationLink && getApplicationLinkComponentProps) {
    return {
      ...baseProps,
      ...getApplicationLinkComponentProps(item),
    };
  }

  return {
    ...baseProps,
    href: item.href,
  };
};

export default generateComponentProps;
