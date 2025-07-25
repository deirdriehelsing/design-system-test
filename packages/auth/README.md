# @blueshift-ui/auth

## Usage

Example:

```jsx
import UserAccessBoundary from "@blueshift-ui/auth/dist/components/user-access-boundary";
import useAuthenticatedUser from "@blueshift-ui/auth/dist/hooks/use-authenticated-user";

function Component() {
  const { loading: loadingUser, data: user } = useAuthenticatedUser();
  return (
    <UserAccessBoundary>
      <OtherComponent user={user} />
    </UserAccessBoundary>
  );
}
```

## Changelog

All notable changes to this package are documented in [CHANGELOG.md](./CHANGELOG.md)
