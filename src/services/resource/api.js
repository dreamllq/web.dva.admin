import qs from 'querystring';
import request from '../../utils/request';

export async function resourceAdd(params) {
  return request('/admin/resource/add', {
    method: 'POST',
    body: params,
  });
}

export async function resourceGets() {
  return request('/admin/resource/gets');
}

export async function resourceGet(params) {
  return request(`/admin/resource/get?${qs.stringify(params)}`);
}

export async function resourceUpdate(params) {
  return request('/admin/resource/update', {
    method: 'POST',
    body: params,
  });
}

export async function resourceDelete(params) {
  return request('/admin/resource/delete', {
    method: 'POST',
    body: params,
  });
}
