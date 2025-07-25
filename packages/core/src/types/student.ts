import type { Enablement } from '.';

interface Student {
  client?: {
    id: number;
    uuid: string;
  };
  email?: string;
  enablements?: Enablement[];
  enrolled: boolean;
  first_name: string;
  grade_list_id: number;
  id: number;
  last_name: string;
  student_user_id: string;
  user_id: string;
  uuid: string;
}

export type { Student };
