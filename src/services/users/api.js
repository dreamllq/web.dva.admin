import qs from 'querystring';
import request from '../../utils/request';

export async function userAdd(params) {
  return request('/admin/users/add', {
    method: 'POST',
    body: params,
  });
}

export async function usersGets(params) {
  return request(`/admin/users/gets?${qs.stringify(params)}`);
}

export async function usersGet(params) {
  return request(`/admin/users/get?${qs.stringify(params)}`);
}

export async function usersUpdate(params) {
  return request('/admin/users/update', {
    method: 'POST',
    body: params,
  });
}

export async function usersDelete(params) {
  return request('/admin/users/delete', {
    method: 'POST',
    body: params,
  });
}

export async function usersResetPassword(params) {
  return request('/admin/users/resetPassword', {
    method: 'POST',
    body: params,
  });
}
