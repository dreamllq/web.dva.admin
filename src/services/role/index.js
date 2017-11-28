import { roleAdd, roleGets, roleGet } from './api';
import Role from '../../entities/Role';

export default class {
  static async add(params) {
    await roleAdd(params);
  }

  static async gets(params) {
    let { data: { items, total } } = await roleGets(params);
    items = items.map(item => new Role(item));
    return { items, total };
  }

  static async get(id) {
    const { data } = await roleGet({ id });
    return new Role(data);
  }
}
