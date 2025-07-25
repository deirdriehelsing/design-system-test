import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import SearchView from '.';
import useClassesSearch from '@blueshift-ui/search/dist/hooks/use-classes-search';
import useSubjectsSearch from '@blueshift-ui/search/dist/hooks/use-subjects-search';
import userEvent from '@testing-library/user-event';

const onCloseMock = jest.fn();

jest.mock('@blueshift-ui/i18n/dist/hooks/use-translation', () => () => ({
  translate: (key: string) => key,
}));
jest.mock('@blueshift-ui/search/dist/hooks/use-subjects-search');
jest.mock('@blueshift-ui/search/dist/hooks/use-classes-search');
jest.mock('../search-bar', () => () => <div>SearchBar</div>);
const useClassesSearchMock = useClassesSearch as jest.MockedFunction<typeof useClassesSearch>;
const mockuseSubjectsSearch = useSubjectsSearch as jest.MockedFunction<typeof useSubjectsSearch>;

describe('SearchView', () => {
  mockuseSubjectsSearch.mockReturnValue({
    results: [] as any,
    setSearchString: jest.fn(),
    isLoading: false,
    isPreviousData: false,
    searchString: '',
    currentPage: 1,
    filters: {},
    setPage: jest.fn(),
    nextPage: jest.fn(),
    prevPage: jest.fn(),
    setFilters: jest.fn(),
  });
  useClassesSearchMock.mockReturnValue({
    results: [] as any,
    setSearchString: jest.fn(),
    isLoading: false,
    searchString: '',
    currentPage: 1,
    filters: {},
    setPage: jest.fn(),
    nextPage: jest.fn(),
    prevPage: jest.fn(),
    setFilters: jest.fn(),
  });

  it('renders SearchBar', () => {
    render(<SearchView onClose={() => {}} />);
    expect(screen.getByText('SearchBar')).toBeInTheDocument();
  });

  it('calls onClose when clicking Cancel button', async () => {
    const user = userEvent.setup();
    render(<SearchView onClose={onCloseMock} />);

    user.click(screen.getByText('cancel'));

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });
});
