import type {
  ActiveLearner,
  AuthenticatedUser,
  AuthenticatedUserResponse,
  AuthenticatedUserType,
} from '../../types';
import type { UseDataOptions, UseDataResult } from '@blueshift-ui/fetch';

import * as atoms from '../../state/atoms';
import { useCallback, useMemo } from 'react';
import findActiveLearner from './helpers/find-active-learner';
import logHandledError from '@blueshift-ui/telemetry/dist/helpers/log-handled-error';
import setActiveLearnerCookie from './helpers/set-active-learner-cookie';
import { useAtom } from 'jotai/react';
import useAxiosClient from '@blueshift-ui/fetch/dist/hooks/use-axios-client';
import useConfigValue from '@blueshift-ui/core/dist/hooks/use-config-value';
import useData from '@blueshift-ui/fetch/dist/hooks/use-data';

const USER_TYPE: ReadonlyMap<number, AuthenticatedUserType> = new Map([
  [1, 'lead'],
  [2, 'learningTools'],
  [3, 'client'],
  [4, 'other'],
  [5, 'employee'],
  [6, 'student'],
]);

interface UseAuthenticatedUserParams {
  /**
   * Whether or not the hook should bypass the cache.
   * @default false
   */
  bypassCache?: boolean;
  /**
   * Whether or not the hook should fetch user data.
   * @default true
   */
  enabled?: boolean;
  /**
   * Whether or not to include students list in the payload.
   * @default true
   */
  includeStudents?: boolean;
  /**
   * Whether or not to include zendesk data in the payload.
   * @default true
   */
  includeZendesk?: boolean;
  /**
   * Additional query options to pass to `useData`.
   */
  queryOptions?: UseDataOptions<AuthenticatedUserResponse, AuthenticatedUser>['queryOptions'];
}

type UseAuthenticatedUserResult = UseDataResult<AuthenticatedUser | undefined> & {
  activeLearner?: ActiveLearner;
  setActiveLearnerId: (studentUuid: string) => void;
};

const selectAuthenticatedUser = ({
  entity: user,
  students,
  token,
}: AuthenticatedUserResponse): AuthenticatedUser => ({
  ...user,

  // Student login info
  // Note: Student users only have 1 student, so they don't need to select a profile
  client_id:
    user.role === 'student' ? (students?.[0]?.client?.id ?? user.client_id) : user.client_id,
  client_uuid:
    user.role === 'student' ? (students?.[0]?.client?.uuid ?? user.client_uuid) : user.client_uuid,

  // Other data
  students,
  user_id: token?.user_id,
  user_type: USER_TYPE.get(user?.lab_user_type ?? 4),
});

function useAuthenticatedUser({
  bypassCache,
  includeStudents = true,
  includeZendesk = true,
  enabled = true,
  queryOptions,
}: UseAuthenticatedUserParams = {}): UseAuthenticatedUserResult {
  const [activeLearner, setActiveLearner] = useAtom(atoms.activeLearner);
  const configBypassUserCache = useConfigValue('bypassUserCache' as any, false);

  // Use the provided bypassCache value or fall back to the config value
  const shouldBypassCache = bypassCache ?? configBypassUserCache;

  // Only set refetchOnMount to 'always' if bypassCache was explicitly set to true by the user
  const refetchOnMount = bypassCache === true ? 'always' : true;

  const authenticatedUser = useData<AuthenticatedUserResponse, AuthenticatedUser>({
    queryKey: ['authenticated-user', includeStudents, includeZendesk],
    queryOptions: {
      enabled,
      meta: {
        client: useAxiosClient(),
      },
      refetchOnMount,
      retry: false,
      retryOnMount: false,
      select: selectAuthenticatedUser,
      ...queryOptions,
    },
    request: {
      attempts: 1,
      params: {
        bypass_user_cache: shouldBypassCache,
        include_entity: true,
        include_students: includeStudents || null,
        include_zendesk: includeZendesk || null,
      },
      url: '/v1/users/me',
    },
  });

  const defaultActiveLearner = useMemo(() => {
    if (authenticatedUser.isLoading) {
      return;
    }
    if (authenticatedUser.data?.role === 'student') {
      return authenticatedUser?.data.students?.[0];
    }
    return findActiveLearner(authenticatedUser.data?.students);
  }, [authenticatedUser.isLoading, authenticatedUser.data]);

  return {
    ...authenticatedUser,
    activeLearner: activeLearner ?? defaultActiveLearner,
    setActiveLearnerId: useCallback(
      (studentUuid: string) => {
        if (authenticatedUser.isLoading) {
          logHandledError(
            'Error setting active learner; Cannot set active learner while loading user data.'
          );
          return;
        }

        const learner = setActiveLearnerCookie(studentUuid, authenticatedUser.data?.students);
        setActiveLearner(learner);
      },
      [authenticatedUser.isLoading, authenticatedUser.data, setActiveLearner]
    ),
  };
}

export default useAuthenticatedUser;
