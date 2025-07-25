import type { UserProductState, UserRole } from '.';

interface StudentResponse {
  avatar_url: string;
  client?: {
    id: number;
    uuid: string;
  };
  email: string;
  enablements?: {
    configuration: {
      product_id: string;
      subject_ids: boolean;
      subjects: {
        created_at: string;
        display_name: string;
        display_order: number;
        id: number;
        is_leaf: any;
        name: string;
        parent_id: number;
        short_name: string;
        updated_at: string;
      }[];
      tag: boolean;
      tutor_flags: boolean;
    };
    id: string;
    product: {
      default_configuration: {
        tag: string;
      };
      description: string;
      id: string;
      name: string;
      short_name: string;
      type: string;
    };
  }[];
  enrolled: boolean;
  first_name: string;
  grade_list_id: number;
  id: number;
  last_name: string;
  student_user_id: string;
  user_id: string;
  uuid: string;
}

interface AuthenticatedUserResponse {
  entity: {
    avatar_url: any;
    can_impersonate: boolean;
    client_id: number;
    client_uuid: string;
    display_name: string;
    email: string;
    first_name: string;
    id: number;
    is_anonymous: boolean;
    is_client: boolean;
    jurisdiction_id: number;
    lab_user_type: number;
    last_name: string;
    login: string;
    pending_tos_url: any;
    product_state: UserProductState;
    recruitment_link: any;
    role: UserRole;
    sales_group_list: string[];
    teacher_uuid: any;
    token: string;
    tutor_id: any;
    tutor_uuid: any;
    updated_at: string;
    zendesk_jwt?: string;
  };
  students?: StudentResponse[];
  token: {
    raw: any;
    roles: string[];
    user_id: string;
  };
}

export type { AuthenticatedUserResponse, StudentResponse };
