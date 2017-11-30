import { routerRedux } from 'dva/router';
import { access } from '../services/access';

export default {
  namespace: 'login',
  state: {},
  effects: {
    *accountSubmit({ payload }, { put }) {
      console.log(payload);
      yield access.signIn({
        username: payload.userName,
        password: payload.password,
      });
      yield put(routerRedux.push('/'));
    },
    *logout(_, { put }) {
      console.log(222);
      yield access.signOut();
      yield put(routerRedux.push('/user/login'));
    },
  },
  reducers: {},
};

