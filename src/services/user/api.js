import qs from 'querystring';
import request from '../../utils/request';

export async function userGet() {
  return request('/admin/user/get');
}

export async function userLogin(params) {
  return request('/admin/user/login', {
    method: 'POST',
    body: params,
  });
}

export async function userLogout() {
  return request('/admin/user/logout', {
    method: 'POST',
  });
}
