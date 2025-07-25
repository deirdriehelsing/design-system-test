import { parseFilters } from '../../helpers';

interface GetClassSearchQueryOptions {
  isVt4sUser?: boolean;
}

function getClassSearchQuery(
  searchString: string,
  filters: Record<string, any> = {},
  { isVt4sUser = false }: GetClassSearchQueryOptions = {}
) {
  const currentTime = new Date();
  return {
    function_score: {
      query: {
        bool: {
          must: [
            {
              bool: {
                must: [
                  {
                    bool: {
                      should: [
                        {
                          multi_match: {
                            query: searchString,
                            fields: [
                              'description^0.7',
                              'description.delimiter^0.28',
                              'description.joined^0.525',
                              'description.prefix^0.07',
                              'description.stem^0.665',
                              'slug^1.0',
                              'slug.delimiter^0.4',
                              'slug.joined^0.75',
                              'slug.prefix^0.1',
                              'slug.stem^0.95',
                              'subjects^1.0',
                              'subjects.delimiter^0.4',
                              'subjects.joined^0.75',
                              'subjects.prefix^0.1',
                              'subjects.stem^0.95',
                              'title^1.5',
                              'title.delimiter^0.6',
                              'title.joined^1.125',
                              'title.prefix^0.15',
                              'title.stem^1.425',
                              'instructor_names^1.5',
                              'instructor_names.delimiter^0.6',
                              'instructor_names.joined^1.125',
                              'instructor_names.prefix^0.15',
                              'instructor_names.stem^1.425',
                            ],
                            type: 'cross_fields',
                            minimum_should_match: '1<-1 3<49%',
                          },
                        },
                        {
                          constant_score: {
                            filter: {
                              multi_match: {
                                query: searchString,
                                fields: ['description.intragram^0.07'],
                                type: 'best_fields',
                                minimum_should_match: '35%',
                              },
                            },
                            boost: 0.07,
                          },
                        },
                        {
                          constant_score: {
                            filter: {
                              multi_match: {
                                query: searchString,
                                fields: ['title.intragram^0.15', 'instructor_names.intragram^0.15'],
                                type: 'best_fields',
                                minimum_should_match: '35%',
                              },
                            },
                            boost: 0.15,
                          },
                        },
                        {
                          constant_score: {
                            filter: {
                              multi_match: {
                                query: searchString,
                                fields: ['slug.intragram^0.1', 'subjects.intragram^0.1'],
                                type: 'best_fields',
                                minimum_should_match: '35%',
                              },
                            },
                            boost: 0.1,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
          filter: [
            {
              bool: {
                must: [
                  {
                    terms: isVt4sUser
                      ? { parent_tags: ['vt4s_webinar_offering'] }
                      : { business_units: ['VSD', 'Camps', 'Courses'] },
                  },
                  {
                    term: {
                      e_commerce: true,
                    },
                  },
                  ...parseFilters(filters),
                ],
                must_not: [
                  {
                    exists: {
                      field: 'topic_ids',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      functions: [
        {
          filter: {
            match_all: {},
          },
          script_score: {
            script: {
              source:
                "Math.max(_score * ((3.0 * (doc['in_stock'].empty ? 1 : doc['in_stock'].value))) + (((doc.containsKey('business_units') && !doc['business_units'].empty && ((doc['business_units'].length > 1) ? new HashSet(doc['business_units']).removeAll(['Celebrity']) : ['Celebrity'].contains(doc['business_units'].value))) ? 2.5 : 0)) - _score, 0)",
              lang: 'painless',
            },
          },
        },
        {
          filter: {
            match_all: {},
          },
          weight: 0.2,
          exp: {
            start_dates: {
              origin: currentTime.toISOString(),
              scale: '1d',
            },
            multi_value_mode: 'MIN',
          },
        },
      ],
      score_mode: 'sum',
      boost_mode: 'sum',
    },
  };
}

export default getClassSearchQuery;
