import { roleDelete } from '../services/role/api';

export default class {
  id = '';
  name = '';
  key = '';

  constructor(payload) {
    ['name', 'key', 'id'].forEach((item) => {
      this[item] = payload[item];
    });
  }

  async delete() {
    await roleDelete({
      id: this.id,
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      key: this.key,
    };
  }
}
