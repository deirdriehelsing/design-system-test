# @blueshift-ui/telemetry


## TrackInteractionProvider

This component is used for interaction event tracking.

Example usage:

```jsx
import { TrackInteractionProvider } from '@blueshift-ui/telemetry';

function Component() {
  return (
    <TrackInteractionProvider applicationId='APPLICATION_ID'>
      App Content
    </TrackInteractionProvider>
  );
}
```

Example usage with Segment:

```jsx
import { TrackInteractionProvider } from '@blueshift-ui/telemetry';

function Component() {
  return (
    <TrackInteractionProvider applicationId='APPLICATION_ID' segmentDisabled={false} segmentWriteKey="SEGMENT_KEY" >
      App Content
    </TrackInteractionProvider>
  );
}
```

## How to track events 

After setting up the provider, you can track events using the useInteractionTracker hook. Here's how:

```ts
  import { useInteractionTracker } from '@blueshift-ui/telemetry';

  const { trackEvent } = useInteractionTracker();

  trackEvent({
    action: '<action>',
    category: '<category>',
    label: `<id>`,
  });
```

## How to identify users on Segment 

```ts
  import { useInteractionTracker } from '@blueshift-ui/telemetry';

  const { identify } = useInteractionTracker();

  identify({
    userId: <user_id>,
    traits: {
      // all traits go here, such as email, subjects, firstName...
    },
  });
```

## Segment Key

Deciding how to share the Segment key between repositories is up to your team and how you want to track events. For new services, it's necessary to generate a new key.

To obtain the Segment write key:

1. Go to Segment Sources (you need to request access to the Varsity Tutors workspace).
2. Navigate to the desired source.
3. Copy the write key from Source -> Settings -> API Keys -> Write Key.