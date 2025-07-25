import type { LinkProps } from '@mui/material';

import Link from '@blueshift-ui/core/dist/components/link';

interface SignInLinkProps extends Omit<LinkProps, 'translate'> {
  preview?: boolean;
  translate?: (key: string, fallback: any) => string;
}

const defaultTranslate = (key: string, fallback: any) => fallback ?? key;

function SignInLink({ preview, translate = defaultTranslate, ...props }: SignInLinkProps) {
  const host = `www.${preview ? 'vtstaging' : 'varsitytutors'}.com`;
  const returnTo = encodeURIComponent(window.location.href);

  return (
    <Link {...props} href={`https://${host}/login?return_to=${returnTo}`}>
      {translate('sign_in', 'Sign in')}
    </Link>
  );
}

export default SignInLink;
