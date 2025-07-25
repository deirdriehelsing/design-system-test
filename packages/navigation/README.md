# @blueshift-ui/navigation

This package contains components and helpers to assist app navigation

## Components
### BackToTopButton

Example usage:
```jsx
import { BackToTopButton } from "@blueshift-ui/navigation";

function Component() {
  return (
    <BackToTopButton>Back to top</BackToTopButton>
  );
}

```

### Menu
This is a a VT styled MaterialUI Menu component

Expected props:
It expects the MenuProps for the MuiMenu and adds the TriggerCTA & triggerprops
for the trigger handler of the manu.

```ts
  trigger: typeof MuiButton;
  triggerProps: MuiButtonProps;
  items: MenuItem[];
}
```

Example usage:
```jsx
      <Menu
        items={[{ role: 'action', text: 'test' }]}
        open={false}
        trigger={Button}
        triggerProps={{ children: 'test 1', onClick: mockOnClick }}
      />
```

### Drawer
This is the VT styled MaterialUI Drawer Component

expected props:
This component expects Drawer props from MaterialUI and adds the trigger & triggerprops for the drawer trigger.

```ts
  trigger: typeof MuiButton;
  triggerProps: MuiButtonProps;
  children: React.ReactNode;
```

example usage:
```jsx
  <Drawer trigger={MuiButton} triggerProps={{ children: 'Button Text' }}>
    <MuiList>
      {[
        'Switch or manage profiles',
        'Membership',
        'Activity',
        'Payment',
        'Account Settings',
        'Support & FAQ',
        'How your membership works',
      ].map((text) => (
        <MuiListItem disablePadding key={text}>
          <MuiListItemButton>
            <MuiListItemText primary={text} />
          </MuiListItemButton>
        </MuiListItem>
      ))}
    </MuiList>
  </Drawer>
```

## Hooks
### useNavData
This hooks is to retrieve navigation data from NSP. It maps to the navigation model (found in nsp) and uses the slug to retrieve the data.

#### *Requirement:* Any component that uses this hook must be wrapped in the [FetchProvider](../packages/fetch/src/components/fetch-provider) that is provided by the `@blueshift-ui/fetch` lib.
```jsx
import FetchProvider from '@blueshift-ui/fetch/dist/components/fetch-provider';

...

<FetchProvider>
  <Component />
</FetchProvider>
```

where `Component` is the component that is using the hook.

expected props:
```ts
preview: boolean;
slug: string;
```

example usage:
```jsx
const response = useNavContentData({ baseUrl, currentApplicationId, preview: true, slug: 'vt_membership_navigation'});
```
This will return the navigation data for the slug provided.
