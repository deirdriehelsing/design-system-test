# @blueshift-ui/fetch

BlueshiftUI fetch utilities

## Usage

### Fetch Provider

Adding a [FetchProvider](./src/components/fetch-provider/index.tsx) is the first step to start using `@blueshift-ui/fetch`.
It's responsible for providing the client used for fetching and the default configurations.

Example usage:

```tsx
import FetchProvider from '@blueshift-ui/fetch/dist/components/fetch-provider';

function App() {
  return (
    <FetchProvider>
      <Routes />
    </FetchProvider>
  );
}
```

### Clients

Clients hold fetching logic and provide default configurations to every request and response.
You can choose any of the built-in clients or create your own in case you absolutely need custom logic.

#### Using built-in clients

All you need to do is import any of the built-in clients from the [clients folder](./src/clients) and provide it to [FetchProvider](./src/components/fetch-provider/index.tsx).

Note: By default, an instance of the [AxiosClient](./src/clients/axios/index.ts) will be used.

Example usage:

```tsx
import FetchProvider from '@blueshift-ui/fetch/dist/components/fetch-provider';
import GraphQLClient from '@blueshift-ui/fetch/dist/clients/graphql';

// Adding defaults for convenience, but it's not necessary
const client = new GraphQLClient({
  url: 'https://example.com/graphql',
  headers: {
    Default: 'Value',
  },
});

function App() {
  return (
    <FetchProvider client={client}>
      <Routes />
    </FetchProvider>
  );
}
```

#### Creating custom clients

It's recommended to stick with the built-in clients, but if you absolutely need a custom one, it's possible to create it by extending the [BaseClient](./src/clients/base/index.ts). It includes basic functionality to save, provide and parse defaults, responses and errors.

Example usage:

```tsx
import type { CustomClientRequestOptions } from '@blueshift-ui/fetch';

import BaseClient from '@blueshift-ui/fetch/dist/clients/base';
import FetchProvider from '@blueshift-ui/fetch/dist/components/fetch-provider';
import customFetchingLibrary from 'custom-fetching-library';
import logger from 'custom-logger';

interface MyCustomClientOptions {
  myUrlParser: (url?: string) => string;
}

class MyCustomClient extends BaseClient<MyCustomClientOptions> {
  instance = customFetchingLibrary.createInstance();

  handleSuccess(response: unknown) {
    return response;
  }

  handleError(error: unknown) {
    logger(error);
  }

  makeRequest(options: CustomClientRequestOptions<MyCustomClientOptions>) {
    // It's recommended to wrap your makeRequest call with baseMakeRequest method to handle success, error, retries, etc.
    return this.baseMakeRequest(options, (parsedOptions) => {
      return this.instance(parsedOptions.url, parsedOptions);
    });
  }
}

const myCustomClient = new MyCustomClient({
  myUrlParser: (url) => url ?? 'https://example.com',
});

function App() {
  return (
    <FetchProvider client={myCustomClient}>
      <Routes />
    </FetchProvider>
  );
}
```

Alternatively, if you don't want to use the base implementation, you can still implement the [ClientAdapter](./src/types/client-adapter.ts) interface.

Note: Implementing the interface is absolutely necessary. It's the only way we can rest assured the correct methods are called and the proper configurations are passed.

Example usage:

```tsx
import { ClientAdapter, CustomClientRequestOptions } from '@blueshift-ui/fetch';
import FetchProvider from '@blueshift-ui/fetch/dist/components/fetch-provider';
import customFetchingLibrary from 'custom-fetching-library';

interface MyCustomClientOptions {
  myUrlParser: (url?: string) => string;
}

class MyCustomClient implements ClientAdapter<MyCustomClientOptions> {
  instance = customFetchingLibrary.createInstance();

  makeRequest(options: CustomClientRequestOptions<MyCustomClientOptions>) {
    return this.instance(options.myUrlParser(options.url), options);
  }
}

const myCustomClient = new MyCustomClient();

function App() {
  return (
    <FetchProvider client={myCustomClient}>
      <Routes />
    </FetchProvider>
  );
}
```

### Making Requests

After creating a client, you can use it to fetch anywhere in your application.

Example usage:

```ts
import FetchClient from '@blueshift-ui/fetch/dist/clients/fetch';

const client = new FetchClient({
  // Setting defaults as an example
  params: {
    session: '1234',
  },
});

client.makeRequest({
  url: 'https://example.com',
  method: 'GET',
  // Params are merged with defaults and will include "session"
  params: {
    foo: 'bar',
  },
});
```

Note: It's highly recommended you use a client to make requests, but there's a helper [makeRequest](./src/helpers/make-request/index.ts) method as well. It ends up creating a client with the provided options just for making the request, however because the client dies with the request, the options won't be shared with any other requests.

### JSON:API Support

You can always implement your own logic to handle JSON:API or any other API specification patterns by adding middleware to your client instances or extending the [BaseClient](./src/clients/base/index.ts) parsers or success/error handlers. However, some of the built-in clients already provide support for JSON:API. For instance, both [AxiosClient](./src/clients/axios/index.ts) and [FetchClient](./src/clients/fetch/index.ts) accept parameters to activate JSON:API serializers and deserializers, along with options to customize how the serializetion and deserializtion are handled.

Note: The configuration options are based on [jsona](https://github.com/olosegres/jsona), so please check their documentation for details on how to implement each of the parameters.

```ts
import AxiosClient from '@blueshift-ui/fetch/dist/clients/axios';

import {
  MyDeserializeCache,
  MyJsonDeserializer,
  MyJsonPropertiesMapper,
  MyModelPropertiesMapper,
  MyModelsSerializer,
} from '...';

const client = new AxiosClient({
  isJsonApi: true,
  jsonApiOptions: {
    DeserializeCache: MyDeserializeCache,
    JsonDeserializer: MyJsonDeserializer,
    jsonPropertiesMapper: MyJsonPropertiesMapper,
    modelPropertiesMapper: MyModelPropertiesMapper,
    ModelsSerializer: MyModelsSerializer,
  },
});

```

## Hooks

### useData

This hook is used for fetching data. It needs at least the request configuration, but it's highly recommended to provide a unique query key string or array.
Other query options are also available.

Example usage:

```ts
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';

const data = useData({
  queryKey: 'my-data',
  request: {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    params: {
      id: 1,
    },
    url: 'https://example.com',
  },
});

```

### useInfiniteData

Very similar to `useData`, however it's specialized in infinite queries. It accepts and extra parameter for pages.

Example usage:

```ts
import useInfiniteData from '@blueshift-ui/fetch/dist/hooks/use-infinite-data';

const data = useInfiniteData({
  pageParamName: 'page',
  queryKey: 'my-infinite-data',
  request: {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    params: {
      id: 1,
    },
    url: 'https://example.com',
  },
});
```

### useIsFetching

Used to know if and how many queries the application is running.

Note: By default it looks for queries running in the background.

Example usage:

```ts
import useIsFetching from '@blueshift-ui/fetch/dist/hooks/use-is-fetching';

// How many queries are fetching?
const isFetching = useIsFetching()
// How many queries matching the posts prefix are fetching?
const isFetchingPosts = useIsFetching({ queryKey: ['posts'] })
```

### useMutation

Hook for mutating data in the back-end.

Example usage:

```ts
import useMutation from '@blueshift-ui/fetch/dist/hooks/use-mutation';

interface Variables {
  id: number;
}

const { makeMutation } = useMutation<Variables>({
  mutationKey: 'my-mutation',
  request: {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    params: {
      id: 1,
    },
    url: 'https://example.com',
  },
});

makeMutation({ id: 123 });
```

### useQueryClient

This hook will give you an instance of the query client (not to be confused with the client provided to [FetchProvider](./src/components/fetch-provider/index.tsx)).
Differently than the client created and provided to [FetchProvider](./src/components/fetch-provider/index.tsx), this client is used under the hood to manage cache, configurations and query states.

```ts
import useQueryClient from '@blueshift-ui/fetch/dist/hooks/use-query-client';

const queryClient = useQueryClient();

const defaultOptions = queryClient.getDefaultOptions();
const mutationCache = queryClient.getMutationCache();
...
```

## Changelog

All notable changes to this package are documented in [CHANGELOG.md](./CHANGELOG.md)