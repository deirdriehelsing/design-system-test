import type {
  StructuredTextGraphQlResponse,
  StructuredTextGraphQlResponseRecord,
} from 'react-datocms/structured-text';

type RichContent = StructuredTextGraphQlResponse<StructuredTextGraphQlResponseRecord>;

type TranslationResult = string | RichContent | null;

type TranslationFunction<Result extends TranslationResult> = (key: string, options?: any) => Result;

export type { RichContent, TranslationFunction, TranslationResult };
