# @blueshift-ui/testing-fixtures

A collection of common API responses from data hooks, such as `authenticated-user` and `nav-content-data`.

These fixtures are maintained separate from `@blueshift-ui/testing-fixtures` to avoid circular dependencies when a package is only concerned with the data passed to one of its modules vs having a hard dependency on a module that provides the data.

Example usage:
```ts
import { fixtures } from '@blueshift-ui/testing-fixtures';
const mockedVt4sUserResponse = fixtures.authenticatedUser.vt4sStudent;

// alternative more explicit import style
import { vt4sStudent } from '@blueshift-ui/testing-fixtures/dist/fixtures/authenticated-user';
```

