import type { RoleTraits } from './role-traits';
import type { StudentTraits } from './student-traits';

interface UserTraits extends RoleTraits {
  email?: string;
  first_name: string;
  id: number;
  jurisdiction_id: number;
  last_name: string;
  product_state: string;
  role: string;
  sales_group_ids?: string[];
  students: StudentTraits[];
  user_id?: string;
}

export type { UserTraits };
