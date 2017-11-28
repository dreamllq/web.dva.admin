import UsersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    items: [],
    total: 0,
    page: 1,
    pageSize: 10,
  },
  effects: {
    *fetch({ page = 1 }, { put, select }) {
      const { pageSize } = yield select(state => state.users);
      const result = yield UsersService.gets({ offset: (page - 1) * pageSize, limit: pageSize });
      let { items } = result;
      const { total } = result;
      items = items.map(item => item.toJSON());
      yield put({ type: 'payload', payload: { items, total, page } });
    },
    *userAdd({ payload }, { put, select }) {
      __DEV__ && console.log(payload);
      const { page } = yield select(state => state.users);
      yield UsersService.add(payload);
      yield put({ type: 'fetch', page });
    },
    *delete({ id }, { put, select }) {
      const { page } = yield select(state => state.users);
      const users = yield UsersService.get(id);
      yield users.delete();
      yield put({ type: 'fetch', page });
    },
    *resetPassword({ payload }, { put, select }) {
      const { newPassword, id } = payload;
      const users = yield UsersService.get(id);
      yield users.resetPassword({ newPassword });
    },
    *update({ payload }, { put, select }) {
      const { id } = payload;
      const { page } = yield select(state => state.users);
      const users = yield UsersService.get(id);
      users.email = payload.email;
      users.phone = payload.phone;
      yield users.update();
      yield put({ type: 'fetch', page });
    },
  },
  reducers: {
    payload(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

