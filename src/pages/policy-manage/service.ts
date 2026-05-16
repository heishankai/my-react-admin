import type { ApiResponse } from '@/types';
import request from '@/utils/request';
import type { PolicyListDataType, PolicyListParamsType } from './type';

/**
 * 保单分页查询
 * @param params
 * @returns
 */
export const getPolicyListService = async (params: PolicyListParamsType) => {
  return await request.get<
    ApiResponse<PolicyListDataType>,
    ApiResponse<PolicyListDataType>
  >('/admin/orders/list', { params });
};
