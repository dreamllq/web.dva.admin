import RoleService from '../services/role';

export default {
  namespace: 'role',
  state: {
    items: [],
    total: 0,
    page: 1,
    pageSize: 10,
  },
  effects: {
    *fetch({ page = 1 }, { put, select }) {
      const { pageSize } = yield select(state => state.role);
      const result = yield RoleService.gets({ offset: (page - 1) * pageSize, limit: pageSize });
      let { items } = result;
      const { total } = result;
      items = items.map(item => item.toJSON());
      yield put({ type: 'payload', payload: { items, total, page } });
    },
    *add({ name, key }, { put }) {
      yield RoleService.add({ name, key });
      yield put({ type: 'reloadTable' });
    },
    *delete({ id }, { put }) {
      const role = yield RoleService.get(id);
      yield role.delete();
      yield put({ type: 'reloadTable' });
    },
    *reloadTable(_, { select, put }) {
      const { page } = yield select(state => state.role);
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

