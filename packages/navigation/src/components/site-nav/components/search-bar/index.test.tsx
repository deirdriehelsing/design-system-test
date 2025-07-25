import type { ClassItem, SearchResult, SubjectItem } from '@blueshift-ui/search';
import type { SearchBarProps } from '../../../../types';

import { render, screen, waitFor } from '@testing-library/react';
import RESULT_TYPE from '@blueshift-ui/search/dist/constants/result-type';
import React from 'react';
import SearchBar from './index';
import searchResultMock from 'mocks/data/search-result.json';
import useClassesSearch from '@blueshift-ui/search/dist/hooks/use-classes-search';
import useFeatureAccess from '@blueshift-ui/auth/dist/hooks/use-feature-access';
import useSubjectsSearch from '@blueshift-ui/search/dist/hooks/use-subjects-search';
import userEvent from '@testing-library/user-event';

const setSearchStringMock = jest.fn();
const onSubmitMock = jest.fn();
const trackEventMock = jest.fn();
const useClassesSearchMock = useClassesSearch as jest.MockedFunction<typeof useClassesSearch>;
const useSubjectsSearchMock = useSubjectsSearch as jest.MockedFunction<typeof useSubjectsSearch>;
const useFeatureAccessMock = useFeatureAccess as jest.Mock;

const classesResults = {
  hits: {
    hits: searchResultMock.hits.hits.filter((result) => result._source.type === RESULT_TYPE.class),
  },
} as SearchResult<ClassItem>;

const subjectResults = {
  hits: {
    hits: searchResultMock.hits.hits.filter(
      (result) => result._source.type === RESULT_TYPE.subject
    ),
  },
} as SearchResult<SubjectItem>;

const mockEmptySearchResult = {
  ...searchResultMock,
  hits: {
    ...searchResultMock.hits,
    total: {
      ...searchResultMock.hits.total,
      value: 0,
    },
    hits: [],
  },
};

const mockSubjectsSearchResult = {
  results: [] as any,
  setSearchString: setSearchStringMock,
  isLoading: false,
  isPreviousData: false,
  searchString: '',
  currentPage: 1,
  filters: {},
  nextPage: jest.fn(),
  prevPage: jest.fn(),
  setFilters: jest.fn(),
  setPage: jest.fn(),
};

const mockClassesSearchResult = {
  filters: {},
  results: [] as any,
  searchString: 'test2',
  setFilters: jest.fn(),
  setSearchString: setSearchStringMock,
  prevPage: jest.fn(),
  nextPage: jest.fn(),
  isLoading: false,
  currentPage: 1,
  setPage: jest.fn(),
};

jest.mock('@blueshift-ui/auth/dist/hooks/use-feature-access');
jest.mock('@blueshift-ui/i18n/dist/components/rich-translation', () => ({ i18nKey }) => (
  <p>{i18nKey}</p>
));
jest.mock('@blueshift-ui/i18n/dist/hooks/use-rich-translation', () => () => ({
  translate: (key: string) => key,
}));
jest.mock('@blueshift-ui/i18n/dist/hooks/use-translation', () => () => ({
  translate: (key: string) => key,
}));
jest.mock('@blueshift-ui/search/dist/hooks/use-classes-search');
jest.mock('@blueshift-ui/search/dist/hooks/use-subjects-search');
jest.mock('@blueshift-ui/telemetry/dist/hooks/use-interaction-tracker', () => () => ({
  trackEvent: trackEventMock,
}));
jest.mock('@blueshift-ui/theme/dist/hooks/use-breakpoints', () =>
  jest.fn(() => ({ isLargeViewport: true }))
);

describe('<SearchBar />', () => {
  const user = userEvent.setup();

  const renderSearchBar = (props?: SearchBarProps) => {
    render(<SearchBar applicationId="my-learning" {...props} />);
  };

  beforeEach(() => {
    useFeatureAccessMock.mockReturnValue({
      hasAccess: true,
      isLoading: false,
    });

    useFeatureAccessMock.mockImplementation(({ criteria }) => {
      if (criteria.enablement === 'live_classes') {
        return { hasAccess: true };
      }

      return { hasAccess: false }; // isVt4sUser == false
    });
  });

  it('calls handleSearch when input changes', async () => {
    useSubjectsSearchMock.mockReturnValue(mockSubjectsSearchResult);
    useClassesSearchMock.mockReturnValue(mockClassesSearchResult);

    renderSearchBar();

    const searchInput = screen.getByRole('combobox', { name: 'input_aria_label' });

    await user.type(searchInput, 'new query');

    await waitFor(() => {
      expect(setSearchStringMock).toHaveBeenCalledWith('new query');
    });
  });

  it('renders subject content without classes', async () => {
    useSubjectsSearchMock.mockReturnValue({
      ...mockSubjectsSearchResult,
      results: subjectResults as any,
    });

    useClassesSearchMock.mockReturnValue(mockClassesSearchResult);

    renderSearchBar();

    const searchInput = screen.getByRole('combobox', { name: 'input_aria_label' });

    await user.type(searchInput, classesResults.hits.hits[0]._source.name);

    expect((await screen.findAllByText(subjectResults.hits.hits[0]._source.name))[0]).toBeVisible();
    expect((await screen.findAllByText('expand_search'))[0]).toBeVisible();
    expect(await screen.findByText('no_results')).toBeVisible();
  });

  it('renders classes content without subjects', async () => {
    useSubjectsSearchMock.mockReturnValue(mockSubjectsSearchResult);
    useClassesSearchMock.mockReturnValue({
      ...mockClassesSearchResult,
      results: classesResults as any,
    });

    renderSearchBar();

    const searchInput = screen.getByRole('combobox', { name: 'input_aria_label' });

    await user.type(searchInput, classesResults.hits.hits[0]._source.title_formatted);

    expect(
      (await screen.findAllByText(classesResults.hits.hits[0]._source.title_formatted))[0]
    ).toBeVisible();
    expect((await screen.findAllByText('expand_search'))[0]).toBeVisible();
    expect(await screen.findByText('no_results')).toBeVisible();
  });

  it('renders both content', async () => {
    useSubjectsSearchMock.mockReturnValue({
      ...mockSubjectsSearchResult,
      results: searchResultMock as SearchResult<SubjectItem>,
    });
    useClassesSearchMock.mockReturnValue({
      ...mockClassesSearchResult,
      results: classesResults as any,
    });

    renderSearchBar();

    const searchInput = screen.getByRole('combobox', { name: 'input_aria_label' });

    await user.type(searchInput, 'a');

    // classes
    expect((await screen.findAllByText(classesResults.hits.hits[0]._source.name))[0]).toBeVisible();
    // subjects
    expect((await screen.findAllByText(subjectResults.hits.hits[0]._source.name))[0]).toBeVisible();

    expect((await screen.findAllByText('expand_search'))[0]).toBeVisible();
    expect(screen.queryByText('no_results')).not.toBeInTheDocument();
  });

  it('renders no content', async () => {
    useSubjectsSearchMock.mockReturnValue({
      ...mockSubjectsSearchResult,
      results: {
        hits: {
          hits: [],
        },
      } as any,
    });
    useClassesSearchMock.mockReturnValue({
      ...mockClassesSearchResult,
      results: {
        hits: {
          hits: [],
        },
      } as any,
    });

    renderSearchBar();

    const searchInput = screen.getByRole('combobox', { name: 'input_aria_label' });

    await user.type(searchInput, 'example query');

    expect(await screen.findAllByText('no_results')).toHaveLength(2);
    expect(await screen.findByText('no_content_title')).toBeVisible();
    expect(await screen.findByText('contact_us')).toBeVisible();

    // classes
    expect(screen.queryByText(classesResults.hits.hits[0]._source.name)).not.toBeInTheDocument();
    expect(screen.queryByText(classesResults.hits.hits[0]._source.name)).not.toBeInTheDocument();
    // subjects
    expect(screen.queryByText(subjectResults.hits.hits[0]._source.name)).not.toBeInTheDocument();
    expect(
      screen.queryByText((subjectResults.hits.hits[0]._source as SubjectItem).name)
    ).not.toBeInTheDocument();
    expect(screen.queryByText('expand_search')).not.toBeInTheDocument();
  });

  it('fires handleSubmit callback', async () => {
    useSubjectsSearchMock.mockReturnValue({
      ...mockSubjectsSearchResult,
      results: searchResultMock as SearchResult<SubjectItem>,
    });

    useClassesSearchMock.mockReturnValue({
      ...mockClassesSearchResult,
      results: classesResults,
    });

    renderSearchBar({ onSubmit: onSubmitMock });

    const searchInput = screen.getByRole('combobox', { name: 'input_aria_label' });

    await user.type(searchInput, 'testing{enter}');

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('when user has active membership', () => {
    beforeEach(() => {
      useFeatureAccessMock.mockImplementation(() => ({ hasAccess: true }));
    });

    it('renders correct href', async () => {
      useSubjectsSearchMock.mockReturnValue({
        ...mockSubjectsSearchResult,
        results: searchResultMock as SearchResult<SubjectItem>,
      });
      useClassesSearchMock.mockReturnValue({
        ...mockClassesSearchResult,
        results: classesResults,
      });

      renderSearchBar();

      const searchInput = screen.getByRole('combobox', { name: 'input_aria_label' });

      await user.type(searchInput, '2nd Grade Math');

      expect(
        await screen.findByRole('link', { name: '2nd Grade Math Subject Guide' })
      ).toHaveAttribute(
        'href',
        '/my-learning/subjects/elementary-school-math?vtintref=search-suggestion'
      );
      expect(
        await screen.findByRole('link', { name: 'Test StarCourse Subscription Item Tutor Request' })
      ).toHaveAttribute(
        'href',
        '/my-learning/tutors/new?vtintref=search-suggestion&subject=star-subscription-first-month&subject_id=8e70e060-fff1-463e-80d7-fa6a320a63ee'
      );
      expect(
        await screen.findByRole('link', { name: 'test subscription starcourses Star Course' })
      ).toHaveAttribute(
        'href',
        'https://www.vtstaging.com/courses/star-subscription-first-month/dp/8e70e060-fff1-463e-80d7-fa6a320a63ee?vtintref=search-suggestion'
      );
    });
  });

  describe('when user does not have active membership', () => {
    beforeEach(() => {
      useFeatureAccessMock.mockImplementation(({ criteria }) => {
        if (criteria.enablement === 'active_membership') {
          return { hasAccess: false };
        }

        return { hasAccess: true };
      });
    });

    it('renders correct href', async () => {
      useSubjectsSearchMock.mockReturnValue({
        ...mockSubjectsSearchResult,
        results: searchResultMock as SearchResult<SubjectItem>,
      });
      useClassesSearchMock.mockReturnValue({
        ...mockClassesSearchResult,
        results: classesResults,
      });

      renderSearchBar();

      const searchInput = screen.getByRole('combobox', { name: 'input_aria_label' });

      await user.type(searchInput, '2nd Grade Math');

      expect(
        await screen.findByRole('link', { name: '2nd Grade Math Subject Guide' })
      ).toHaveAttribute(
        'href',
        '/my-learning/subjects/elementary-school-math?vtintref=search-suggestion'
      );
      expect(
        await screen.findByRole('link', { name: 'Test StarCourse Subscription Item Tutor Request' })
      ).toHaveAttribute(
        'href',
        '/memberships?vtintref=search-suggestion&returnurl=%2Fmy-learning%2Ftutors%2Fnew%3Fvtintref%3Dsearch-suggestion%26subject%3Dstar-subscription-first-month%26subject_id%3D8e70e060-fff1-463e-80d7-fa6a320a63ee'
      );
      expect(
        await screen.findByRole('link', { name: 'test subscription starcourses Star Course' })
      ).toHaveAttribute(
        'href',
        'https://www.vtstaging.com/courses/star-subscription-first-month/dp/8e70e060-fff1-463e-80d7-fa6a320a63ee?vtintref=search-suggestion'
      );
    });
  });

  describe('when user does not have access to classes', () => {
    it('does not render classes content', async () => {
      useFeatureAccessMock.mockImplementation(({ criteria }) => {
        if (criteria.enablement === 'live_classes') {
          return { hasAccess: false };
        }

        return { hasAccess: true }; // isVt4sUser == true
      });

      useSubjectsSearchMock.mockReturnValue({
        ...mockSubjectsSearchResult,
        results: searchResultMock as SearchResult<SubjectItem>,
      });

      useClassesSearchMock.mockReturnValue({
        ...mockClassesSearchResult,

        results: mockEmptySearchResult as SearchResult<ClassItem>,
      });

      renderSearchBar();

      const searchInput = screen.getByRole('combobox', { name: 'input_aria_label' });

      await user.type(searchInput, 'a');

      expect(
        (await screen.findAllByText(subjectResults.hits.hits[0]._source.name))[0]
      ).toBeVisible();
      expect(screen.queryByText('no_results')).not.toBeInTheDocument();
    });
  });

  describe('interaction', () => {
    describe('when search results are blurred', () => {
      it('closes the search results', async () => {
        useSubjectsSearchMock.mockReturnValue({
          ...mockSubjectsSearchResult,
          results: mockEmptySearchResult as SearchResult<SubjectItem>,
        });
        useClassesSearchMock.mockReturnValue({
          ...mockClassesSearchResult,
          results: mockEmptySearchResult as SearchResult<ClassItem>,
        });

        renderSearchBar();

        const searchInput = screen.getByRole('combobox', { name: 'input_aria_label' });

        await user.click(searchInput);

        expect(await screen.findByText('empty_query_option')).toBeInTheDocument();

        await user.keyboard('{Tab}');

        await waitFor(() => {
          expect(trackEventMock).toHaveBeenCalledWith({
            action: 'search-blur',
            category: 'search-and-browse',
            label: '',
          });
        });

        expect(screen.queryByText('empty_query_option')).not.toBeInTheDocument();
      });
    });
  });

  describe('expand search links', () => {
    it('renders correctly when vt4s product state is true', async () => {
      useFeatureAccessMock.mockReturnValue({
        hasAccess: false,
        isLoading: false,
      });
      useSubjectsSearchMock.mockReturnValue({
        ...mockSubjectsSearchResult,
        results: {
          hits: {
            hits: [],
          },
        } as any,
      });
      useClassesSearchMock.mockReturnValue({
        ...mockClassesSearchResult,
        results: classesResults as any,
      });

      renderSearchBar();

      const searchInput = screen.getByRole('combobox', { name: 'input_aria_label' });

      await user.type(searchInput, 'new query');

      expect((await screen.findAllByText('expand_search'))[0]).toBeVisible();
    });

    it('renders correctly when vt4s product state is false', async () => {
      useFeatureAccessMock.mockReturnValue({
        hasAccess: true,
        isLoading: false,
      });
      useSubjectsSearchMock.mockReturnValue({
        ...mockSubjectsSearchResult,
        results: {
          hits: {
            hits: [],
          },
        } as any,
      });
      useClassesSearchMock.mockReturnValue({
        ...mockClassesSearchResult,
        results: classesResults as any,
      });

      renderSearchBar();

      const searchInput = screen.getByRole('combobox', { name: 'input_aria_label' });

      await user.type(searchInput, 'new query');

      await waitFor(() => {
        expect(screen.queryByText('expand_search')).not.toBeInTheDocument();
      });
    });
  });
});
