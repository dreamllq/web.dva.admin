import { userAdd, usersGets, usersGet, usersUpdate, usersDelete, usersResetPassword } from './api';
import User from '../../entities/User';


export default class {
  static async add(params) {
    await userAdd(params);
  }

  static async gets(params) {
    let { data: { items, total } } = await usersGets(params);
    items = items.map(userData => new User(userData));
    return { items, total };
  }

  static async get(id) {
    const { data } = await usersGet({ id });
    return new User(data);
  }
}

