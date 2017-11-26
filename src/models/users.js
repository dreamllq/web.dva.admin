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
    *fetch({ page = 1 }, { call, put, select }) {
      const { pageSize } = yield select(state => state.users);
      let { items, total } = yield UsersService.gets({ offset: (page - 1) * pageSize, limit: pageSize });
      items = items.map(item => item.toJSON());
      yield put({ type: 'payload', payload: { items, total, page } });
    },
    *userAdd({ payload }, { put, select }) {
      __DEV__ && console.log(payload);
      const { page } = yield select(state => state.users);
      yield UsersService.add(payload);
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

