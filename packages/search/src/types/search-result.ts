import type { RESULT_TYPE } from '../constants';

interface BaseSource {
  description: string;
  display_name?: string;
  grade_full_range: string;
  grade_range?: string[];
  has_detail_page?: boolean;
  id: string;
  images: Images;
  name: string;
  slug: string;
  title: string;
  title_formatted: string;
  type: string;
}

interface CatalogItem<T = ClassItem | SubjectItem> {
  _id: string;
  _index: string;
  _score: number;
  _source: T;
  _type: string;
}

interface ChildItem {
  available_quantity: number;
  capacity: number;
  days_of_week: string[];
  duration_seconds: number;
  end_date: string;
  end_times: string[];
  id: string;
  in_stock: boolean;
  instructor_name: string;
  name: string;
  start_date: string;
  start_times: string[];
}

interface ClassItem extends BaseSource {
  business_units: string[];
  child_items: ChildItem[];
  class_duration: string;
  class_size: string[];
  days_of_week: string[];
  description_formatted: string;
  details_page: string;
  e_commerce: boolean;
  grade_ranges: string[];
  grades: string[];
  in_stock: number;
  instructor_names: string[];
  next_class_date: string;
  next_start_date: string;
  parent_group: string[];
  parent_tags: string[];
  price_cents: number;
  price_formatted: string;
  product_type: string;
  related_subjects: string[];
  sales_info_nugget: string;
  session_count: number;
  session_length_minutes: number;
  session_per_week: number;
  start_dates: string[];
  start_times: string[];
  subjects: string[];
  type: typeof RESULT_TYPE.class;
  week_count: number;
}

interface ImageOptions {
  options?: any;
  path: string;
  properties?: any;
  responsive_paths: {
    [key: string]: string;
  } | null;
}

interface Images {
  hero: ImageOptions;
  hero_mobile: ImageOptions;
  product: ImageOptions;
}

interface SearchResult<SearchResultCategory = ClassItem | SubjectItem> {
  _shards: {
    failed: number;
    skipped: number;
    successful: number;
    total: number;
  };
  hits: {
    hits: CatalogItem<SearchResultCategory>[];
    max_score: number;
    total: {
      relation: string;
      value: number;
    };
  };
  timed_out: boolean;
  took: number;
}

interface SubjectItem extends BaseSource {
  category: string;
  instant_tutoring_enabled: boolean;
  parent: string;
  type: typeof RESULT_TYPE.subject;
}

export type {
  BaseSource,
  CatalogItem,
  ChildItem,
  ClassItem,
  ImageOptions,
  Images,
  SearchResult,
  SubjectItem,
};
