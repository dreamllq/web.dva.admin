import qs from 'querystring';
import request from '../../utils/request';

export async function roleAdd(params) {
  return request('/admin/role/add', {
    method: 'POST',
    body: params,
  });
}

export async function roleGets(params) {
  return request(`/admin/role/gets?${qs.stringify(params)}`);
}

export async function roleGet(params) {
  return request(`/admin/role/get?${qs.stringify(params)}`);
}

export async function roleDelete(params) {
  return request('/admin/role/delete', {
    method: 'POST',
    body: params,
  });
}
