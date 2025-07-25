import type { Student } from '../../../../types';

import Cookie from 'js-cookie';
import findActiveLearner from '.';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

describe('findActiveLearner', () => {
  const oldLocalStorage = window.localStorage;
  const oldLocation = window.location;
  const students = [{ uuid: '123' }, { uuid: '456' }] as Student[];

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: { setItem: jest.fn(), getItem: jest.fn() },
    });
    Object.defineProperty(window, 'location', { value: { hostname: 'www.example.com' } });
    (Cookie.get as jest.Mock).mockReturnValue('');
    (localStorage.getItem as jest.Mock).mockReturnValue('');
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', { value: oldLocalStorage });
    Object.defineProperty(window, 'location', { value: oldLocation });
  });

  it('returns the active learner from ID set in cookie', () => {
    (Cookie.get as jest.Mock).mockReturnValue('456');
    const learner = findActiveLearner(students);
    expect(learner).toEqual({ uuid: '456' });
  });

  it('returns the active learner from ID set in localStorage', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue('456');
    const learner = findActiveLearner(students);
    expect(learner).toEqual({ uuid: '456' });
  });

  it('returns undefined if the active learner is not found', () => {
    const learner = findActiveLearner(students);
    expect(learner).toBeUndefined();
  });

  it('sets active_learner_id as empty if not found', () => {
    (Cookie.get as jest.Mock).mockReturnValue('NOT_FOUND');
    findActiveLearner(students);
    expect(Cookie.set).toHaveBeenCalledWith('active_learner_id', '', {
      domain: 'example.com',
      expires: 365,
      path: '/',
      sameSite: 'Lax',
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('active_learner_id', '');
    expect(localStorage.setItem).toHaveBeenCalledWith('selected_student_id', '');
  });
});
