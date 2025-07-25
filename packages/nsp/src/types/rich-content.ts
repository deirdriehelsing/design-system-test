import type {
  StructuredTextGraphQlResponse,
  StructuredTextGraphQlResponseRecord,
} from 'react-datocms/structured-text';

type RichContent<
  TBlocks extends StructuredTextGraphQlResponseRecord = StructuredTextGraphQlResponseRecord,
  TLinks extends StructuredTextGraphQlResponseRecord = TBlocks,
> = StructuredTextGraphQlResponse<TBlocks, TLinks>;

export type { RichContent };
