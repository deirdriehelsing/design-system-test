# @blueshift-ui/i18n

BlueshiftUI i18n provider and hooks

## Usage

### Provider

The `I18nProvider` is used to provide the i18n context for its underlying component tree. It takes a `namespace` prop which is used to determine which translations to load. The `namespace` value must correspond to a translation group namespace in NSP. See the [Translation Group](https://nerdy.admin.datocms.com/editor/item_types/173181/items) and [Rich Translation Group](https://nerdy.admin.datocms.com/editor/item_types/173182/items) item types in NSP for more details.

```tsx
import { I18nProvider } from '@blueshift-ui/i18n';

function SomeComponent() {
  return (
    <I18nProvider namespace="some_i18n_namespace">
      <SomeComponentTreeThatNeedsI18nTranslations />
    </I18nProvider>
  );
}
```

### Rich-Text Translations

The `useRichTranslation` hook is used to retrieve rich-text translations from NSP. It takes a `name` param which is used to determine which translation group to load. The `name` value must correspond to a rich-text translation name in NSP. See the [Rich Translation Group](https://nerdy.admin.datocms.com/editor/item_types/173182/items) item type in NSP for more details.

The `useRichTranslation` hook is used in conjunction with the `RichTranslation` component to render the resulting translation as JSX elements.

_Note: `useRichTranslation` and `RichTranslation` depend on an `I18nProvider` ancestor._

```tsx
import { RichTranslation, useRichTranslation } from '@blueshift-ui/i18n';

function SomeComponent() {
  const { loading, translate } = useRichTranslation('some_translation_group_name');

  if (loading) {
    return null;
  }

  return (
    <RichTranslation i18nKey="some_key" translator={translate} />
  );
}
```

#### Replacement Values

The `RichTranslation` component supports replacement values. Replacement values are key-value pairs used to replace placeholders in the provided translation with dynamic values.

```tsx
import { RichTranslation, useRichTranslation } from '@blueshift-ui/i18n';

function SomeComponent() {
  const { loading, translate } = useRichTranslation('some_translation_group_name');

  if (loading) {
    return null;
  }

  return (
    <RichTranslation
      i18nKey="some_key_with_placeholder_values"
      replace={{ some_placeholder: 1337 }}
      translator={translate}
    />
  );
}
```

#### NSP Record Links

The `RichTranslation` component supports rendering links to NSP records via the `renderLinkToRecord` prop.

```tsx
import { RichTranslation, useRichTranslation } from '@blueshift-ui/i18n';

function SomeComponent() {
  const { loading, translate } = useRichTranslation('some_translation_group_name');

  function handleSomeAction() {
    // do something
  }

  if (loading) {
    return null;
  }

  return (
    <RichTranslation
      i18nKey="some_key_with_record_link"
      renderLinkToRecord={
        ({ transformedMeta: actionProps, record, children }) => {
          switch (record.actionName) {
            case 'some_action_name':
              return (
                <button {...actionProps} onClick={handleSomeAction}>{children}</button>
              );
            default:
              return null;
          }
        }
      }
      translator={translate}
    />
  );
}
```