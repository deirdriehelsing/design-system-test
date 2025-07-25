import type { Student } from '../../../../types';

import Cookie from 'js-cookie';
import setActiveLearnerCookie from '.';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

describe('setActiveLearnerCookie', () => {
  const oldLocalStorage = window.localStorage;
  const oldLocation = window.location;
  const studentUuid = '123';
  const students = [{ uuid: '123' }, { uuid: '456' }] as Student[];

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: { setItem: jest.fn(), getItem: jest.fn() },
    });
    Object.defineProperty(window, 'location', { value: { hostname: 'www.example.com' } });
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', { value: oldLocalStorage });
    Object.defineProperty(window, 'location', { value: oldLocation });
  });

  it('sets the active learner id in a long-life cookie across all subdomains', () => {
    setActiveLearnerCookie(studentUuid, students);
    expect(Cookie.set).toHaveBeenCalledWith('active_learner_id', studentUuid, {
      domain: 'example.com',
      expires: 365,
      path: '/',
      sameSite: 'Lax',
    });
  });

  it('sets the active_learner_id in localStorage (deprecated)', () => {
    setActiveLearnerCookie(studentUuid, students);
    expect(localStorage.setItem).toHaveBeenCalledWith('active_learner_id', studentUuid);
  });

  it('sets the selected_student_id in localStorage (deprecated)', () => {
    setActiveLearnerCookie(studentUuid, students);
    expect(localStorage.setItem).toHaveBeenCalledWith('selected_student_id', studentUuid);
  });

  it('returns undefined if the active learner is not found', () => {
    const learner = setActiveLearnerCookie('789', students);
    expect(learner).toBeUndefined();
  });

  it('sets active_learner_id as empty if not found', () => {
    setActiveLearnerCookie('789', students);
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
