import { resourceAdd, resourceGets, resourceGet } from './api';
import Resource from '../../entities/Resource';

export default class {
  static async add(params) {
    await resourceAdd(params);
  }

  static async gets(params) {
    let { data: { items, total } } = await resourceGets(params);
    items = items.map(item => new Resource(item));
    return { items, total };
  }

  static async get(id) {
    const { data } = await resourceGet({ id });
    return new Resource(data);
  }
}
