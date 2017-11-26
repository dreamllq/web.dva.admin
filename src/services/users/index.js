import { userAdd, usersGets } from './api';
import User from '../../entities/User'


export default class {
  static async add(params) {
    await userAdd(params);
  }

  static async gets(params) {
    let { data: { items, total } } = await usersGets(params);
    items = items.map(userData => new User(userData));
    return { items, total };
  }
}
