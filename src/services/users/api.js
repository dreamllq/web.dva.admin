import request from '../../utils/request';
import qs from 'querystring';

export async function userAdd(params) {
  return request('/admin/users/add', {
    method: 'POST',
    body: params,
  });
}

export async function usersGets(params) {
  return request(`/admin/users/gets?${qs.stringify(params)}`);
}
