import type { PageDataType } from '@/types';

export interface PolicyListParamsType {
  page?: number;
  per_page?: number;
  policy_no?: string;
  alias_name?: string;
  apply_user_info?: string;
  insured_user_info?: string;
  orders_status?: number;
}

export interface PolicyItemType {
  orders_id: number;
  user_id: number;
  reg_id: number;
  reg_name: string;
  org_id: number;
  org_name: string;
  plan_id: number;
  plan_name: string;
  alias_name: string;
  order_uniqid: string;
  orders_type: number;
  policy_no: string;
  policy_url: string;
  product_code: string;
  product_name: string;
  company_name: string;
  apply_name: string;
  apply_mobile: string;
  apply_card_no: string;
  insured_name: string;
  insured_mobile: string;
  insured_card_no: string;
  orders_status: number;
  total_premium: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export type PolicyListDataType = PageDataType<PolicyItemType>;
