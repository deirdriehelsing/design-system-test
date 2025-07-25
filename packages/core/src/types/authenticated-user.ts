import type { Student, UserProductState, UserRole } from '.';

// TODO: Disambiguate user_type from role. There is overlap between the two.
type AuthenticatedUserType = 'lead' | 'learningTools' | 'client' | 'other' | 'employee' | 'student';

interface AuthenticatedUser {
  client_id: number;
  client_uuid: string;
  email?: string;
  first_name: string;
  id: number;
  is_anonymous?: boolean;
  jurisdiction_id: number;
  lab_user_type?: number;
  last_name: string;
  login: string;
  pending_tos_url?: string;
  product_state: UserProductState;
  role: UserRole;
  sales_group_list?: string[];
  students?: Student[];
  tutor_id?: number;
  tutor_uuid?: string;
  user_id?: string;
  user_type?: AuthenticatedUserType;
  zendesk_jwt?: string;
}

export type { AuthenticatedUser, AuthenticatedUserType };
