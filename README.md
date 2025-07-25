# blueshift-ui

blue·shift `/ˈblü-ˈshift/`<br>
_noun_<br>
the displacement of the spectrum to shorter wavelengths in the light coming from distant celestial objects moving toward the observer.

---

BlueshiftUI is the foundation of Nerdy UIs. It is a monorepo with packages that define atomic components, hooks, and helpers, enabling us to move fast and deliver consistent, first-class user experiences.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/en/) v20.15.0 via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).
   ```sh
   # Install nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   # Install Node
   nvm install 20.15.0
   # Use Node version defined in .nvmrc
   nvm use
   ```

- [Yarn](https://classic.yarnpkg.com/en/docs/install) v1.22

- A Personal [fury.io auth token](https://gemfury.com/help/tokens/) added to your env/path as `GEMFURY_TOKEN`.
   1. Visit [fury.io settings](https://manage.fury.io/manage/varsity/tokens/pull) (log in with Okta) and generate a new token for yourself.
   1. Add the token to your shell initialization script (`.bashrc`, `.zshrc`, etc.)
      ```sh
      export GEMFURY_TOKEN="your-token"
      ```

- A hosts file entry for `www.vt.local` pointing to `localhost`/`127.0.0.1`
   ```
   127.0.0.1 localhost
   255.255.255.255 broadcasthost
   ::1 localhost

   127.0.0.1         vt.local www.vt.local
   ```

### Getting started

1. Install dependencies and bootstrap packages
   ```sh
   yarn setup
   ```
1. Run Storybook
   ```sh
   yarn dev
   ```

### Known Issues

#### QuotaExceededError: Failed to execute `setItem` on `Storage`

This error might be caused by **LaunchDarkly** flag bootstrapping on consuming apps that use the **LaunchDarkly** utilities from this repo.

This is caused when impersonating multiple clients or students, as **LaunchDarkly** creates a new `localStorage` entry for each user context (e.g., students with different grades or enablements) which can quickly add up.

To resolve the issue, you can:
1. **Clear `localStorage` entirely.**

2. **Remove the LaunchDarkly-related keys.**
   Look for keys such as: `ld:asdasdasdsad:eyJrZXkiOiJ2YWxpZC1rZXkifQ==`

### Local verification in consuming apps

BlueshiftUI is built to be consumed by other applications in the Nerdy ecosystem. With this in mind, developers need a way to test and debug their changes in those consuming applications before publishing a new version of the package.
This repo is equipped with [yalc](https://github.com/wclr/yalc) to make the process of developing, debugging and testing in other appliations faster and more seamless.

With `yalc` all BlueshiftUI packages will automatically be published to your machine's local yalc repository (`~/.yalc/packages` by default).
This allows other applications to consume the local files and not be limited to versions that are already published.

In order to accomplish this, follow these steps:

1. Make your changes in your `blueshift-ui` package of preference
2. Install `yalc`

   using NPM:
   ```sh
   npm i yalc -g
   ```
   Using Yarn:
   ```sh
   yarn global add yalc
   ```
   _Note: Alternatively, you can prepend all `yalc` commands with `npx`_
3. Sync the changed files to your local `yalc` repository
   ```sh
   yarn yalc-push # (or `yarn yalc-watch` to keep watching for changes)
   ```
4. In the consuming application directory, tell `yalc` to use your local version
   ```sh
   yalc add @blueshift-ui/<package_name>
   ```
   _Note: Monorepos may need to run this command at package level e.g.: `lerna exec -- yalc add @blueshift-ui/<package_name>`_
5. [Optional]: Add yalc files to your application `.gitignore` file
6. When you're finished, remove the link with the consuming application
   ```sh
   yalc remove @blueshift-ui/<package_name>
   ```
   _Note: Monorepos may need to run this command at package level e.g.: `lerna exec -- yalc remove @blueshift-ui/<package_name>`_

### Publishing Changes

1. Run the `bump` command on your feature branch:
   ```sh
   yarn bump [major|minor|patch]
   ```

   Note: Versioning should _always_ be the last step before merging your feature branch into `master`. After approvals and all other checks have passed. This helps:
   - Ensure the generated tags accurately reflect the full set of changes
   - Avoids potential conflicts with parallel PRs

2. Merge your branch to `master`
3. Publish your updated packages:
   ```sh
   make publish
   ```

   Alternatively, create a draft release that doesn't trigger the workflow, which is helpful if you want to share the changes first with the rest of the team:
   ```sh
   make publish-draft
   ```

#### Pre-release versions

1. Branch off of your feature branch into a pre-release branch to avoid issues when eventually bumping to a release version.
1. Run the desired pre-release `bump` command on your pre-release branch. E.g.:
   ```sh
   yarn bump preminor
   ```
   See: [Lerna version doc](https://github.com/lerna/lerna/tree/main/libs/commands/version#positionals)
1. Manually run the [Publish workflow](../../actions/workflows/publish.yml) on your pre-release branch.

### CLI

#### `yarn` Commands

| Command                                          | Description |
| :----------------------------------------------- | :---------- |
| `yarn bootstrap`                                 | Installs package dependencies, links any cross-package dependencies, and transpiles code where appropriate |
| `yarn build-storybook`                           | Creates Storybook build |
| `yarn bump [major \| minor \| patch]`            | Update package versions |
| `yarn dev`                                       | Alias for `yarn storybook` |
| `yarn dev-latest`                                | Runs `yarn bootstrap` and `yarn dev` |
| `yarn lint`                                      | Runs `eslint` and `prettier` |
| `yarn lint-fix`                                  | Runs `eslint` and `prettier` in `fix` mode |
| `yarn setup`                                     | Installs root dependencies and bootstraps all packages |
| `yarn storybook`                                 | Starts storybook. See: [`start-storybook` docs](https://storybook.js.org/docs/react/api/cli-options#start-storybook) for more options |
| `yarn test`                                      | Runs lint and unit tests |
| `yarn yalc-push`                                 | Transpiles and publishes all packages to local yalc repository |
| `yarn yalc-watch`                                | Watches for changes and runs `yarn yalc-push` on the affected package/s |
| `yarn watch`                                     | Watches for changes and runs `yarn transpile` on the affected package/s |

#### `make` Commands

| Command                                       | Description |
| :-------------------------------------------- | :---------- |
| `make publish`                                | Publishes packages by creating a GitHub release which triggers the publish workflow |
| `make publish-draft`                          | Creates a draft GitHub release that doesn't trigger the publish workflow |

## Contributing

See: [contributor guidelines](https://varsity.atlassian.net/wiki/x/JwDGEg)

## Cursor Development

### Cursor Rules

If/when using the Cursor IDE, use rules to maintain consistent development practices and automate common tasks. These rules are stored in the `.cursor/rules/` directory and follow specific conventions:

- **Rule Location**: All rules are stored in `.cursor/rules/` with `.mdc` extension
- **Local Rules**: You can create local-only rules by adding `.local.mdc` suffix (these are gitignored)
- **Naming Convention**: Use kebab-case for rule filenames (e.g., `testing-standards.mdc`)

### Optimizing Cursor Usage

1. **Agent Mode**
   - Use "Agent" mode for complex tasks by selecting 'agent' in the Cursor command palette
   - Agent mode provides more context-aware assistance and can handle multi-step operations

3. **Best Practices**
   - Maintain a library of rules for common workflows and code generation
     - When CursorAI does something right, ask it to create or update a rule.
   - Create task-specific rules for repetitive operations
   - Keep rules focused and well-documented

For more information about Cursor development and rules, visit the [Cursor documentation](https://docs.cursor.com/get-started/welcome).
